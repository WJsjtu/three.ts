import {
    LinearFilter,
    NearestFilter,
    RGBFormat,
    RGBAFormat,
    DepthFormat,
    DepthStencilFormat,
    UnsignedShortType,
    UnsignedIntType,
    UnsignedInt248Type,
    FloatType,
    HalfFloatType,
    ClampToEdgeWrapping,
    NearestMipMapLinearFilter,
    NearestMipMapNearestFilter,
} from "../../constants";
import { WebGLExtensions } from "./WebGLExtensions";
import { WebGLState } from "./WebGLState";
import {
    WebGLProperties,
    ITextureProperties,
    IRenderTargetProperties,
    IRenderTargetCubeProperties,
} from "./WebGLProperties";
import { WebGLCapabilities } from "./WebGLCapabilities";
import { WebGLUtils } from "./WebGLUtils";
import { IInfoMemory, IInfoRender } from "../WebGLRenderer";
import { HTMLTextureSource, Texture } from "../../textures/Texture";
import { MathUtil } from "../../math/Math";
import { IEventObject } from "../../core/EventDispatcher";
import { VideoTexture } from "../../textures/VideoTexture";
import { WebGLRenderTarget } from "../WebGLRenderTarget";
import { WebGLRenderTargetCube } from "../WebGLRenderTargetCube";
import { DepthTexture } from "../../textures/DepthTexture";
import { DataTexture } from "../../textures/DataTexture";
import { CompressedTexture } from "../../textures/CompressedTexture";
import { CanvasTexture } from "../../textures/CanvasTexture";
import { CubeTexture } from "../../textures/CubeTexture";
import { TypedArray } from "../../core/BufferAttribute";

declare class ImageBitmap {
    width: number;
    height: number;
    close: any;
}

function clampToMaxSize(
    image: PlainTextureImage,
    maxSize: number,
): PlainTextureImage {
    if (image.width > maxSize || image.height > maxSize) {
        const scale: number = maxSize / Math.max(image.width, image.height);
        if (
            image instanceof HTMLImageElement ||
            image instanceof HTMLCanvasElement ||
            image instanceof ImageBitmap
        ) {
            // Warning: Scaling through the canvas will only work with images that use
            // premultiplied alpha.
            const canvas: HTMLCanvasElement = document.createElementNS(
                "http://www.w3.org/1999/xhtml",
                "canvas",
            ) as HTMLCanvasElement;
            canvas.width = Math.max(Math.floor(image.width * scale), 1);
            canvas.height = Math.max(Math.floor(image.height * scale), 1);
            const context: CanvasRenderingContext2D = canvas.getContext("2d");
            context.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                canvas.width,
                canvas.height,
            );
            console.warn(
                "THREE.WebGLRenderer: image is too big (" +
                    image.width +
                    "x" +
                    image.height +
                    "). Resized to " +
                    canvas.width +
                    "x" +
                    canvas.height,
                image,
            );
            return canvas;
        } else {
            const width: number = Math.max(Math.floor(image.width * scale), 1);
            const height: number = Math.max(
                Math.floor(image.height * scale),
                1,
            );
            console.warn(
                "THREE.WebGLRenderer: image is too big (" +
                    image.width +
                    "x" +
                    image.height +
                    "). Resized to " +
                    width +
                    "x" +
                    height,
                image,
            );
            (image as any).width = width;
            (image as any).height = height;
        }
    }
    return image;
}

export type PlainTextureImage =
    | HTMLTextureSource
    | { width: number; height: number; data?: TypedArray };

function isPowerOfTwo(image: PlainTextureImage): boolean {
    return (
        MathUtil.isPowerOfTwo(image.width) &&
        MathUtil.isPowerOfTwo(image.height)
    );
}

function makePowerOfTwo(image: PlainTextureImage): PlainTextureImage {
    if (
        image instanceof HTMLImageElement ||
        image instanceof HTMLCanvasElement ||
        image instanceof ImageBitmap
    ) {
        const canvas: HTMLCanvasElement = document.createElementNS(
            "http://www.w3.org/1999/xhtml",
            "canvas",
        ) as HTMLCanvasElement;
        canvas.width = MathUtil.floorPowerOfTwo(image.width);
        canvas.height = MathUtil.floorPowerOfTwo(image.height);
        const context: CanvasRenderingContext2D = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        console.warn(
            "THREE.WebGLRenderer: image is not power of two (" +
                image.width +
                "x" +
                image.height +
                "). Resized to " +
                canvas.width +
                "x" +
                canvas.height,
            image,
        );
        return canvas;
    }
    return image;
}

function textureNeedsPowerOfTwo(texture: Texture): boolean {
    return (
        texture.wrapS !== ClampToEdgeWrapping ||
        texture.wrapT !== ClampToEdgeWrapping ||
        (texture.minFilter !== NearestFilter &&
            texture.minFilter !== LinearFilter)
    );
}

function textureNeedsGenerateMipmaps(
    texture: Texture,
    isPowerOfTwo: boolean,
): boolean {
    return (
        texture.generateMipmaps &&
        isPowerOfTwo &&
        texture.minFilter !== NearestFilter &&
        texture.minFilter !== LinearFilter
    );
}

export class WebGLTextures {
    protected context: WebGLRenderingContext;
    protected extensions: WebGLExtensions;
    protected state: WebGLState;
    protected properties: WebGLProperties;
    protected capabilities: WebGLCapabilities;
    protected utils: WebGLUtils;
    protected infoMemory: IInfoMemory;
    protected infoRender: IInfoRender;

    protected videoTextures: { [key: number]: number } = {};

    constructor(
        context: WebGLRenderingContext,
        extensions: WebGLExtensions,
        state: WebGLState,
        properties: WebGLProperties,
        capabilities: WebGLCapabilities,
        utils: WebGLUtils,
        infoMemory: IInfoMemory,
        infoRender: IInfoRender,
    ) {
        this.context = context;
        this.extensions = extensions;
        this.properties = properties;
        this.capabilities = capabilities;
        this.utils = utils;
        this.infoMemory = infoMemory;
        this.infoRender = infoRender;
    }

    protected filterFallback(f: number): number {
        if (
            f === NearestFilter ||
            f === NearestMipMapNearestFilter ||
            f === NearestMipMapLinearFilter
        ) {
            return this.context.NEAREST;
        }
        return this.context.LINEAR;
    }

    protected onTextureDispose = (event: IEventObject): void => {
        const texture: Texture = event.target as Texture;
        texture.removeEventListener("dispose", this.onTextureDispose);
        this.deallocateTexture(texture);
        if (texture instanceof VideoTexture) {
            delete this.videoTextures[texture.id];
        }
        this.infoMemory.textures--;
    };

    protected onRenderTargetDispose = (event: IEventObject): void => {
        const renderTarget: WebGLRenderTarget = event.target as WebGLRenderTarget;
        renderTarget.removeEventListener("dispose", this.onRenderTargetDispose);
        this.deallocateRenderTarget(renderTarget);
        this.infoMemory.textures--;
    };

    protected deallocateTexture(texture: Texture): void {
        const textureProperties: ITextureProperties = this.properties.get(
            texture,
        );
        if (texture.image && textureProperties.__image__webglTextureCube) {
            // cube texture
            this.context.deleteTexture(
                textureProperties.__image__webglTextureCube,
            );
        } else {
            // 2D texture
            if (textureProperties.__webglInit === undefined) return;
            this.context.deleteTexture(textureProperties.__webglTexture);
        }
        // remove all webgl properties
        this.properties.remove(texture);
    }

    protected deallocateRenderTarget(
        renderTarget: WebGLRenderTarget | WebGLRenderTargetCube,
    ): void {
        const renderTargetProperties:
            | IRenderTargetProperties
            | IRenderTargetCubeProperties = this.properties.get(
            renderTarget,
        ) as IRenderTargetProperties | IRenderTargetCubeProperties;
        const textureProperties: ITextureProperties = this.properties.get(
            renderTarget.texture,
        );
        if (!renderTarget) return;
        if (textureProperties.__webglTexture !== undefined) {
            this.context.deleteTexture(textureProperties.__webglTexture);
        }
        if (renderTarget.depthTexture) {
            renderTarget.depthTexture.dispose();
        }
        if (renderTarget instanceof WebGLRenderTargetCube) {
            for (let i: number = 0; i < 6; i++) {
                this.context.deleteFramebuffer(
                    renderTargetProperties.__webglFramebuffer[i],
                );
                if (renderTargetProperties.__webglDepthbuffer) {
                    this.context.deleteRenderbuffer(
                        renderTargetProperties.__webglDepthbuffer[i],
                    );
                }
            }
        } else {
            this.context.deleteFramebuffer(
                renderTargetProperties.__webglFramebuffer,
            );
            if (renderTargetProperties.__webglDepthbuffer) {
                this.context.deleteRenderbuffer(
                    renderTargetProperties.__webglDepthbuffer,
                );
            }
        }
        this.properties.remove(renderTarget.texture);
        this.properties.remove(renderTarget);
    }

    protected updateVideoTexture(texture: VideoTexture): void {
        const id: number = texture.id;
        const frame: number = this.infoRender.frame;
        // Check the last frame we updated the VideoTexture
        if (this.videoTextures[id] !== frame) {
            this.videoTextures[id] = frame;
            texture.update();
        }
    }

    protected uploadTexture(
        textureProperties: ITextureProperties,
        texture: CanvasTexture | VideoTexture | DataTexture,
        slot: number,
    ): void {
        const gl: WebGLRenderingContext = this.context;
        const state: WebGLState = this.state;
        const utils: WebGLUtils = this.utils;
        if (textureProperties.__webglInit === undefined) {
            textureProperties.__webglInit = true;
            texture.addEventListener("dispose", this.onTextureDispose);
            textureProperties.__webglTexture = gl.createTexture();
            this.infoMemory.textures++;
        }
        state.activeTexture(gl.TEXTURE0 + slot);
        state.bindTexture(gl.TEXTURE_2D, textureProperties.__webglTexture);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
        gl.pixelStorei(
            gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
            texture.premultiplyAlpha,
        );
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, texture.unpackAlignment);
        /**
         * 为什么 texture.image 肯定是 HTMLTextureSource?
         * Need to be fixed
         */
        let image: PlainTextureImage = clampToMaxSize(
            texture.image,
            this.capabilities.maxTextureSize,
        );
        if (textureNeedsPowerOfTwo(texture) && isPowerOfTwo(image) === false) {
            /**
             * 为什么这里的 texture.image 肯定是 HTMLTextureSource?
             * 因为在 WebGLRenderer.setProgram 中 SkinnedMesh 中的 Skeleton 的 boneTexture 被强制调整为2的幂次
             * 所以这个判断中 DataTexture 永远到不了，只能是 CanvasTexture 或者 VideoTexture
             *
             * Edited: 原本是这么认为的，但是不是
             */
            image = makePowerOfTwo(image);
        }
        const isPowerOfTwoImage: boolean = isPowerOfTwo(image);
        let glFormat: number = utils.convert(texture.format),
            glType: number = utils.convert(texture.type);
        this.setTextureParameters(gl.TEXTURE_2D, texture, isPowerOfTwoImage);
        let mipmap: { data: any; width: number; height: number },
            mipmaps: Array<{ data: any; width: number; height: number }> =
                texture.mipmaps;
        if (texture instanceof DepthTexture) {
            // populate depth texture with dummy data
            let internalFormat: number = gl.DEPTH_COMPONENT;
            /*
			if ( texture.type === FloatType ) {
				if ( ! _isWebGL2 ) throw new Error( 'Float Depth Texture only supported in WebGL2.0' );
				internalFormat = gl.DEPTH_COMPONENT32F;
			} else if ( _isWebGL2 ) {
				// WebGL 2.0 requires signed internalformat for glTexImage2D
				internalFormat = gl.DEPTH_COMPONENT16;
            }
            */
            if (
                texture.format === DepthFormat &&
                internalFormat === gl.DEPTH_COMPONENT
            ) {
                // The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
                // DEPTH_COMPONENT and type is not UNSIGNED_SHORT or UNSIGNED_INT
                // (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
                if (
                    texture.type !== UnsignedShortType &&
                    texture.type !== UnsignedIntType
                ) {
                    console.warn(
                        "THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.",
                    );
                    texture.type = UnsignedShortType;
                    glType = utils.convert(texture.type);
                }
            }
            // Depth stencil textures need the DEPTH_STENCIL internal format
            // (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
            if (texture.format === DepthStencilFormat) {
                internalFormat = gl.DEPTH_STENCIL;
                // The error INVALID_OPERATION is generated by texImage2D if format and internalformat are
                // DEPTH_STENCIL and type is not UNSIGNED_INT_24_8_WEBGL.
                // (https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/)
                if (texture.type !== UnsignedInt248Type) {
                    console.warn(
                        "THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.",
                    );
                    texture.type = UnsignedInt248Type;
                    glType = utils.convert(texture.type);
                }
            }
            state.texImage2D(
                gl.TEXTURE_2D,
                0,
                internalFormat,
                image.width,
                image.height,
                0,
                glFormat,
                glType,
                null,
            );
        } else if (texture instanceof DataTexture) {
            // use manually created mipmaps if available
            // if there are no manual mipmaps
            // set 0 level mipmap and then use GL to generate other mipmap levels
            if (mipmaps.length > 0 && isPowerOfTwoImage) {
                for (
                    let i: number = 0, il: number = mipmaps.length;
                    i < il;
                    i++
                ) {
                    mipmap = mipmaps[i];
                    state.texImage2D(
                        gl.TEXTURE_2D,
                        i,
                        glFormat,
                        mipmap.width,
                        mipmap.height,
                        0,
                        glFormat,
                        glType,
                        mipmap.data,
                    );
                }
                texture.generateMipmaps = false;
            } else {
                state.texImage2D(
                    gl.TEXTURE_2D,
                    0,
                    glFormat,
                    image.width,
                    image.height,
                    0,
                    glFormat,
                    glType,
                    (image as { data?: any; width: number; height: number })
                        .data,
                );
            }
        } else if (texture instanceof CompressedTexture) {
            for (let i: number = 0, il: number = mipmaps.length; i < il; i++) {
                mipmap = mipmaps[i];
                if (
                    texture.format !== RGBAFormat &&
                    texture.format !== RGBFormat
                ) {
                    if (
                        state.getCompressedTextureFormats().indexOf(glFormat) >
                        -1
                    ) {
                        state.compressedTexImage2D(
                            gl.TEXTURE_2D,
                            i,
                            glFormat,
                            mipmap.width,
                            mipmap.height,
                            0,
                            mipmap.data,
                        );
                    } else {
                        console.warn(
                            "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                        );
                    }
                } else {
                    state.texImage2D(
                        gl.TEXTURE_2D,
                        i,
                        glFormat,
                        mipmap.width,
                        mipmap.height,
                        0,
                        glFormat,
                        glType,
                        mipmap.data,
                    );
                }
            }
        } else {
            // regular Texture (image, video, canvas)
            // use manually created mipmaps if available
            // if there are no manual mipmaps
            // set 0 level mipmap and then use GL to generate other mipmap levels
            if (mipmaps.length > 0 && isPowerOfTwoImage) {
                for (
                    let i: number = 0, il: number = mipmaps.length;
                    i < il;
                    i++
                ) {
                    mipmap = mipmaps[i];
                    state.texImage2D(
                        gl.TEXTURE_2D,
                        i,
                        glFormat,
                        glFormat,
                        glType,
                        mipmap,
                    );
                }
                texture.generateMipmaps = false;
            } else {
                /**
                 * WHY as HTMLTextureSource ????
                 */
                state.texImage2D(
                    gl.TEXTURE_2D,
                    0,
                    glFormat,
                    glFormat,
                    glType,
                    image as HTMLTextureSource,
                );
            }
        }
        if (textureNeedsGenerateMipmaps(texture, isPowerOfTwoImage))
            gl.generateMipmap(gl.TEXTURE_2D);
        textureProperties.__version = texture.version;
        //if ( texture.onUpdate ) texture.onUpdate( texture );
    }

    public setTexture2D(texture: Texture, slot: number): void {
        const textureProperties: ITextureProperties = this.properties.get(
            texture,
        ) as ITextureProperties;
        if (texture instanceof VideoTexture) {
            this.updateVideoTexture(texture);
        }
        if (
            texture.version > 0 &&
            textureProperties.__version !== texture.version
        ) {
            /**
             * version > 0 不一样只能是needsUpdate被设为true的Texture
             * 目前Three.js中只有CanvasTexture、 VideoTexture以及Skeleton.boneTexture（DataTexture）是这样的。
             * 所以 uploadTexture 的 texture 参数必定是 CanvasTexture| VideoTexture | DataTexture 中的一个
             */
            const image: PlainTextureImage = texture.image;
            if (image === undefined) {
                console.warn(
                    "THREE.WebGLRenderer: Texture marked for update but image is undefined",
                    texture,
                );
            } else if ((image as HTMLImageElement).complete === false) {
                console.warn(
                    "THREE.WebGLRenderer: Texture marked for update but image is incomplete",
                    texture,
                );
            } else {
                this.uploadTexture(
                    textureProperties,
                    texture as CanvasTexture | VideoTexture | DataTexture,
                    slot,
                );
                return;
            }
        }
        this.state.activeTexture(this.context.TEXTURE0 + slot);
        this.state.bindTexture(
            this.context.TEXTURE_2D,
            textureProperties.__webglTexture,
        );
    }

    public setTextureCube(
        texture: CubeTexture | CompressedTexture,
        slot: number,
    ): void {
        const gl: WebGLRenderingContext = this.context;
        const state: WebGLState = this.state;
        const utils: WebGLUtils = this.utils;
        const textureProperties: ITextureProperties = this.properties.get(
            texture,
        ) as ITextureProperties;
        if ((texture.image as any[]).length === 6) {
            if (
                texture.version > 0 &&
                textureProperties.__version !== texture.version
            ) {
                if (!textureProperties.__image__webglTextureCube) {
                    texture.addEventListener("dispose", this.onTextureDispose);
                    textureProperties.__image__webglTextureCube = gl.createTexture();
                    this.infoMemory.textures++;
                }
                state.activeTexture(gl.TEXTURE0 + slot);
                state.bindTexture(
                    gl.TEXTURE_CUBE_MAP,
                    textureProperties.__image__webglTextureCube,
                );
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
                const isCompressed: boolean =
                    texture && texture instanceof CompressedTexture;
                const isDataTexture: boolean =
                    texture.image[0] && texture.image[0] instanceof DataTexture;
                const cubeImage: PlainTextureImage[] = [];
                for (let i: number = 0; i < 6; i++) {
                    if (!isCompressed && !isDataTexture) {
                        cubeImage[i] = clampToMaxSize(
                            texture.image[i],
                            this.capabilities.maxCubemapSize,
                        );
                    } else {
                        // CubeTexture with DataTexture or CompressedTexture
                        cubeImage[i] = isDataTexture
                            ? texture.image[i].image
                            : texture.image[i];
                    }
                }
                const image: PlainTextureImage = cubeImage[0],
                    isPowerOfTwoImage: boolean = isPowerOfTwo(image),
                    glFormat: number = utils.convert(texture.format),
                    glType: number = utils.convert(texture.type);
                this.setTextureParameters(
                    gl.TEXTURE_CUBE_MAP,
                    texture,
                    isPowerOfTwoImage,
                );
                for (let i: number = 0; i < 6; i++) {
                    if (!isCompressed) {
                        // CubeTexture
                        if (isDataTexture) {
                            state.texImage2D(
                                gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                                0,
                                glFormat,
                                cubeImage[i].width,
                                cubeImage[i].height,
                                0,
                                glFormat,
                                glType,
                                (cubeImage[i] as any).data, // DataTexture.image: {data: }
                            );
                        } else {
                            state.texImage2D(
                                gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                                0,
                                glFormat,
                                glFormat,
                                glType,
                                cubeImage[i] as HTMLTextureSource,
                            );
                        }
                    } else {
                        let mipmap;
                        const mipmaps = cubeImage[i].mipmaps;
                        for (
                            let j: number = 0, jl: number = mipmaps.length;
                            j < jl;
                            j++
                        ) {
                            mipmap = mipmaps[j];
                            if (
                                texture.format !== RGBAFormat &&
                                texture.format !== RGBFormat
                            ) {
                                if (
                                    state
                                        .getCompressedTextureFormats()
                                        .indexOf(glFormat) > -1
                                ) {
                                    state.compressedTexImage2D(
                                        gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                                        j,
                                        glFormat,
                                        mipmap.width,
                                        mipmap.height,
                                        0,
                                        mipmap.data,
                                    );
                                } else {
                                    console.warn(
                                        "THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()",
                                    );
                                }
                            } else {
                                state.texImage2D(
                                    gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                                    j,
                                    glFormat,
                                    mipmap.width,
                                    mipmap.height,
                                    0,
                                    glFormat,
                                    glType,
                                    mipmap.data,
                                );
                            }
                        }
                    }
                }
                if (textureNeedsGenerateMipmaps(texture, isPowerOfTwoImage)) {
                    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                }
                textureProperties.__version = texture.version;
                //if ( texture.onUpdate ) texture.onUpdate( texture );
            } else {
                state.activeTexture(gl.TEXTURE0 + slot);
                state.bindTexture(
                    gl.TEXTURE_CUBE_MAP,
                    textureProperties.__image__webglTextureCube,
                );
            }
        }
    }

    /**
     * texture from WebGLRenderTargetCube
     * @param texture
     * @param slot
     */
    public setTextureCubeDynamic(texture: Texture, slot: number): void {
        this.state.activeTexture(this.context.TEXTURE0 + slot);
        this.state.bindTexture(
            this.context.TEXTURE_CUBE_MAP,
            this.properties.get(texture).__webglTexture,
        );
    }

    protected setTextureParameters(
        textureType: number,
        texture: Texture,
        isPowerOfTwoImage: boolean,
    ): void {
        const gl: WebGLRenderingContext = this.context;
        const utils: WebGLUtils = this.utils;
        const extensions: WebGLExtensions = this.extensions;
        const properties: WebGLProperties = this.properties;
        let extension: any;
        if (isPowerOfTwoImage) {
            gl.texParameteri(
                textureType,
                gl.TEXTURE_WRAP_S,
                utils.convert(texture.wrapS),
            );
            gl.texParameteri(
                textureType,
                gl.TEXTURE_WRAP_T,
                utils.convert(texture.wrapT),
            );
            gl.texParameteri(
                textureType,
                gl.TEXTURE_MAG_FILTER,
                utils.convert(texture.magFilter),
            );
            gl.texParameteri(
                textureType,
                gl.TEXTURE_MIN_FILTER,
                utils.convert(texture.minFilter),
            );
        } else {
            gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            if (
                texture.wrapS !== ClampToEdgeWrapping ||
                texture.wrapT !== ClampToEdgeWrapping
            ) {
                console.warn(
                    "THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.",
                    texture,
                );
            }
            gl.texParameteri(
                textureType,
                gl.TEXTURE_MAG_FILTER,
                this.filterFallback(texture.magFilter),
            );
            gl.texParameteri(
                textureType,
                gl.TEXTURE_MIN_FILTER,
                this.filterFallback(texture.minFilter),
            );
            if (
                texture.minFilter !== NearestFilter &&
                texture.minFilter !== LinearFilter
            ) {
                console.warn(
                    "THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.",
                    texture,
                );
            }
        }
        extension = extensions.get("EXT_texture_filter_anisotropic");
        if (extension) {
            if (
                texture.type === FloatType &&
                extensions.get("OES_texture_float_linear") === null
            )
                return;
            if (
                texture.type === HalfFloatType &&
                extensions.get("OES_texture_half_float_linear") === null
            )
                return;
            if (
                texture.anisotropy > 1 ||
                properties.get(texture).__currentAnisotropy
            ) {
                gl.texParameterf(
                    textureType,
                    extension.TEXTURE_MAX_ANISOTROPY_EXT,
                    Math.min(
                        texture.anisotropy,
                        this.capabilities.getMaxAnisotropy(),
                    ),
                );
                properties.get(texture).__currentAnisotropy =
                    texture.anisotropy;
            }
        }
    }

    /****************************  Render targets ***********************/

    // Setup storage for target texture and bind it to correct framebuffer
    protected setupFrameBufferTexture(
        framebuffer: WebGLFramebuffer,
        renderTarget: WebGLRenderTarget,
        attachment: number,
        textureTarget: number,
    ): void {
        const glFormat: number = this.utils.convert(
            renderTarget.texture.format,
        );
        const glType: number = this.utils.convert(renderTarget.texture.type);
        this.state.texImage2D(
            textureTarget,
            0,
            glFormat,
            renderTarget.width,
            renderTarget.height,
            0,
            glFormat,
            glType,
            null,
        );
        const gl: WebGLRenderingContext = this.context;
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            attachment,
            textureTarget,
            this.properties.get(renderTarget.texture).__webglTexture,
            0,
        );
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    // Setup storage for internal depth/stencil buffers and bind to correct framebuffer
    protected setupRenderBufferStorage(
        renderbuffer: WebGLRenderbuffer,
        renderTarget: WebGLRenderTarget,
    ): void {
        const gl: WebGLRenderingContext = this.context;
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
        if (renderTarget.depthBuffer && !renderTarget.stencilBuffer) {
            gl.renderbufferStorage(
                gl.RENDERBUFFER,
                gl.DEPTH_COMPONENT16,
                renderTarget.width,
                renderTarget.height,
            );
            gl.framebufferRenderbuffer(
                gl.FRAMEBUFFER,
                gl.DEPTH_ATTACHMENT,
                gl.RENDERBUFFER,
                renderbuffer,
            );
        } else if (renderTarget.depthBuffer && renderTarget.stencilBuffer) {
            gl.renderbufferStorage(
                gl.RENDERBUFFER,
                gl.DEPTH_STENCIL,
                renderTarget.width,
                renderTarget.height,
            );
            gl.framebufferRenderbuffer(
                gl.FRAMEBUFFER,
                gl.DEPTH_STENCIL_ATTACHMENT,
                gl.RENDERBUFFER,
                renderbuffer,
            );
        } else {
            // FIXME: We don't support !depth !stencil
            gl.renderbufferStorage(
                gl.RENDERBUFFER,
                gl.RGBA4,
                renderTarget.width,
                renderTarget.height,
            );
        }
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    }

    // Setup resources for a Depth Texture for a FBO (needs an extension)
    protected setupDepthTexture(
        framebuffer: WebGLFramebuffer,
        renderTarget: WebGLRenderTarget,
    ): void {
        const gl: WebGLRenderingContext = this.context;
        const isCube: boolean =
            renderTarget && renderTarget instanceof WebGLRenderTargetCube;
        if (isCube) {
            throw new Error(
                "Depth Texture with cube render targets is not supported",
            );
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        if (
            !(
                renderTarget.depthTexture &&
                renderTarget.depthTexture instanceof DepthTexture
            )
        ) {
            throw new Error(
                "renderTarget.depthTexture must be an instance of THREE.DepthTexture",
            );
        }
        // upload an empty depth texture with framebuffer size
        if (
            !this.properties.get(renderTarget.depthTexture).__webglTexture ||
            renderTarget.depthTexture.image.width !== renderTarget.width ||
            renderTarget.depthTexture.image.height !== renderTarget.height
        ) {
            renderTarget.depthTexture.image.width = renderTarget.width;
            renderTarget.depthTexture.image.height = renderTarget.height;
            renderTarget.depthTexture.needsUpdate = true;
        }
        this.setTexture2D(renderTarget.depthTexture, 0);
        const webglDepthTexture: WebGLTexture = this.properties.get(
            renderTarget.depthTexture,
        ).__webglTexture;
        if (renderTarget.depthTexture.format === DepthFormat) {
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl.DEPTH_ATTACHMENT,
                gl.TEXTURE_2D,
                webglDepthTexture,
                0,
            );
        } else if (renderTarget.depthTexture.format === DepthStencilFormat) {
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl.DEPTH_STENCIL_ATTACHMENT,
                gl.TEXTURE_2D,
                webglDepthTexture,
                0,
            );
        } else {
            throw new Error("Unknown depthTexture format");
        }
    }

    // Setup GL resources for a non-texture depth buffer
    protected setupDepthRenderbuffer(renderTarget: WebGLRenderTarget): void {
        const gl: WebGLRenderingContext = this.context;
        const renderTargetProperties: IRenderTargetProperties = this.properties.get(
            renderTarget,
        );
        const isCube: boolean = renderTarget instanceof WebGLRenderTargetCube;
        if (renderTarget.depthTexture) {
            if (isCube)
                throw new Error(
                    "target.depthTexture not supported in Cube render targets",
                );
            this.setupDepthTexture(
                renderTargetProperties.__webglFramebuffer,
                renderTarget,
            );
        } else {
            if (isCube) {
                renderTargetProperties.__webglDepthbuffer = [];
                for (let i: number = 0; i < 6; i++) {
                    gl.bindFramebuffer(
                        gl.FRAMEBUFFER,
                        renderTargetProperties.__webglFramebuffer[i],
                    );
                    renderTargetProperties.__webglDepthbuffer[
                        i
                    ] = gl.createRenderbuffer();
                    this.setupRenderBufferStorage(
                        renderTargetProperties.__webglDepthbuffer[i],
                        renderTarget,
                    );
                }
            } else {
                gl.bindFramebuffer(
                    gl.FRAMEBUFFER,
                    renderTargetProperties.__webglFramebuffer,
                );
                renderTargetProperties.__webglDepthbuffer = gl.createRenderbuffer();
                this.setupRenderBufferStorage(
                    renderTargetProperties.__webglDepthbuffer,
                    renderTarget,
                );
            }
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    // Set up GL resources for the render target
    public setupRenderTarget(renderTarget: WebGLRenderTarget): void {
        const gl: WebGLRenderingContext = this.context;
        const state: WebGLState = this.state;
        const properties: WebGLProperties = this.properties;
        const renderTargetProperties: IRenderTargetProperties = properties.get(
            renderTarget,
        );
        const textureProperties: ITextureProperties = properties.get(
            renderTarget.texture,
        );
        renderTarget.addEventListener("dispose", this.onRenderTargetDispose);
        textureProperties.__webglTexture = gl.createTexture();
        this.infoMemory.textures++;
        const isCube: boolean = renderTarget instanceof WebGLRenderTargetCube;
        const isTargetPowerOfTwo: boolean = isPowerOfTwo(renderTarget);
        // Setup framebuffer
        if (isCube) {
            renderTargetProperties.__webglFramebuffer = [];
            for (let i: number = 0; i < 6; i++) {
                renderTargetProperties.__webglFramebuffer[
                    i
                ] = gl.createFramebuffer();
            }
        } else {
            renderTargetProperties.__webglFramebuffer = gl.createFramebuffer();
        }
        // Setup color buffer
        if (isCube) {
            state.bindTexture(
                gl.TEXTURE_CUBE_MAP,
                textureProperties.__webglTexture,
            );
            this.setTextureParameters(
                gl.TEXTURE_CUBE_MAP,
                renderTarget.texture,
                isTargetPowerOfTwo,
            );
            for (let i: number = 0; i < 6; i++) {
                this.setupFrameBufferTexture(
                    renderTargetProperties.__webglFramebuffer[i],
                    renderTarget,
                    gl.COLOR_ATTACHMENT0,
                    gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                );
            }
            if (
                textureNeedsGenerateMipmaps(
                    renderTarget.texture,
                    isTargetPowerOfTwo,
                )
            ) {
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            }
            state.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        } else {
            state.bindTexture(gl.TEXTURE_2D, textureProperties.__webglTexture);
            this.setTextureParameters(
                gl.TEXTURE_2D,
                renderTarget.texture,
                isTargetPowerOfTwo,
            );
            this.setupFrameBufferTexture(
                renderTargetProperties.__webglFramebuffer,
                renderTarget,
                gl.COLOR_ATTACHMENT0,
                gl.TEXTURE_2D,
            );
            if (
                textureNeedsGenerateMipmaps(
                    renderTarget.texture,
                    isTargetPowerOfTwo,
                )
            ) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }
            state.bindTexture(gl.TEXTURE_2D, null);
        }
        // Setup depth and stencil buffers
        if (renderTarget.depthBuffer) {
            this.setupDepthRenderbuffer(renderTarget);
        }
    }

    public updateRenderTargetMipmap(renderTarget: WebGLRenderTarget): void {
        const gl: WebGLRenderingContext = this.context;
        const state: WebGLState = this.state;
        const properties: WebGLProperties = this.properties;
        const texture: Texture = renderTarget.texture;
        const isTargetPowerOfTwo = isPowerOfTwo(renderTarget);
        if (textureNeedsGenerateMipmaps(texture, isTargetPowerOfTwo)) {
            const target: number =
                renderTarget instanceof WebGLRenderTargetCube
                    ? gl.TEXTURE_CUBE_MAP
                    : gl.TEXTURE_2D;
            const webglTexture = properties.get(texture).__webglTexture;
            state.bindTexture(target, webglTexture);
            gl.generateMipmap(target);
            state.bindTexture(target, null);
        }
    }
}
