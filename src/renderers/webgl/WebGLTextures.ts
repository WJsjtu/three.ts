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
import { WebGLProperties } from "./WebGLProperties";
import { WebGLCapabilities } from "./WebGLCapabilities";
import { WebGLUtils } from "./WebGLUtils";
import { IInfoMemory, IInfoRender } from "../WebGLRenderer";
import {
    HTMLTextureSource,
    InnerTextureSource,
    Texture,
} from "../../textures/Texture";
import { MathUtil } from "../../math/Math";

function clampToMaxSize(
    image: HTMLTextureSource,
    maxSize: number,
): HTMLTextureSource {
    if (image.width > maxSize || image.height > maxSize) {
        // Warning: Scaling through the canvas will only work with images that use
        // premultiplied alpha.
        var scale = maxSize / Math.max(image.width, image.height);
        const canvas: HTMLCanvasElement = document.createElementNS(
            "http://www.w3.org/1999/xhtml",
            "canvas",
        ) as HTMLCanvasElement;
        canvas.width = Math.floor(image.width * scale);
        canvas.height = Math.floor(image.height * scale);
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
    }
    return image;
}

function isPowerOfTwo(image: InnerTextureSource): boolean {
    return (
        MathUtil.isPowerOfTwo(image.width) &&
        MathUtil.isPowerOfTwo(image.height)
    );
}

declare class ImageBitmap {}

function makePowerOfTwo(image: HTMLTextureSource): HTMLTextureSource {
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
}
