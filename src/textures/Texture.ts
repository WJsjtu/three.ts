import {
    ClampToEdgeWrapping,
    LinearEncoding,
    LinearFilter,
    LinearMipMapLinearFilter,
    MirroredRepeatWrapping,
    RepeatWrapping,
    RGBAFormat,
    UnsignedByteType,
    UVMapping,
} from "../constants";
import { EventDispatcher } from "../core/EventDispatcher";
import { MathUtil } from "../math/Math";
import { Matrix3 } from "../math/Matrix3";
import { Vector2 } from "../math/Vector2";

let textureId: number = 0;

export type HTMLTextureSource =
    | HTMLImageElement
    | HTMLCanvasElement
    | HTMLVideoElement
    | ImageBitmap;

export type InnerTextureSource =
    | HTMLTextureSource
    | { data?: any; width: number; height: number };

export type TextureSource = InnerTextureSource | InnerTextureSource[];

export class Texture extends EventDispatcher {
    public static DEFAULT_IMAGE: HTMLImageElement;
    public static DEFAULT_MAPPING: number = UVMapping;

    public readonly id: number = textureId++;
    public readonly uuid: string = MathUtil.generateUUID();
    public name: string = "";
    public image: TextureSource = Texture.DEFAULT_IMAGE;
    public mipmaps: Array<{ data: any; width: number; height: number }> = [];
    public mapping: number = Texture.DEFAULT_MAPPING;
    public wrapS: number = ClampToEdgeWrapping;
    public wrapT: number = ClampToEdgeWrapping;
    public magFilter: number = LinearFilter;
    public minFilter: number = LinearMipMapLinearFilter;
    public anisotropy: number = 1;
    public format: number = RGBAFormat;
    public type: number = UnsignedByteType;
    public offset: Vector2 = new Vector2(0, 0);
    public repeat: Vector2 = new Vector2(1, 1);
    public center: Vector2 = new Vector2(0, 0);
    public rotation: number = 0;

    public matrix: Matrix3 = new Matrix3();
    public matrixAutoUpdate: boolean = true;
    public generateMipmaps: boolean = true;
    public premultiplyAlpha: boolean = false;
    public flipY: boolean = true;

    /**
     * valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)
     * @type {number}
     */
    public unpackAlignment: number = 4;

    /**
     * Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
     * Also changing the encoding after already used by a Material will not automatically make the Material update.
     * You need to explicitly call Material.needsUpdate to trigger it to recompile.
     */
    public encoding: number = LinearEncoding;
    public version: number = 0;

    constructor(
        image: TextureSource | null = Texture.DEFAULT_IMAGE,
        mapping: number = Texture.DEFAULT_MAPPING,
        wrapS: number = ClampToEdgeWrapping,
        wrapT: number = ClampToEdgeWrapping,
        magFilter: number = LinearFilter,
        minFilter: number = LinearMipMapLinearFilter,
        format: number = RGBAFormat,
        type: number = UnsignedByteType,
        anisotropy: number = 1,
        encoding: number = LinearEncoding,
    ) {
        super();
        this.image = image;
        this.mapping = mapping;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.magFilter = magFilter;
        this.minFilter = minFilter;
        this.format = format;
        this.type = type;
        this.anisotropy = anisotropy;
        this.encoding = encoding;
    }

    set needsUpdate(value: boolean) {
        if (value === true) this.version++;
    }

    public dispose(): void {
        this.dispatchEvent({ type: "dispose" });
    }

    public transformUv(uv: Vector2): this {
        if (this.mapping !== UVMapping) return this;
        uv.applyMatrix3(this.matrix);
        if (uv.x < 0 || uv.x > 1) {
            switch (this.wrapS) {
                case RepeatWrapping:
                    uv.x = uv.x - Math.floor(uv.x);
                    break;
                case ClampToEdgeWrapping:
                    uv.x = uv.x < 0 ? 0 : 1;
                    break;
                case MirroredRepeatWrapping:
                    if (Math.abs(Math.floor(uv.x) % 2) === 1) {
                        uv.x = Math.ceil(uv.x) - uv.x;
                    } else {
                        uv.x = uv.x - Math.floor(uv.x);
                    }
                    break;
            }
        }

        if (uv.y < 0 || uv.y > 1) {
            switch (this.wrapT) {
                case RepeatWrapping:
                    uv.y = uv.y - Math.floor(uv.y);
                    break;
                case ClampToEdgeWrapping:
                    uv.y = uv.y < 0 ? 0 : 1;
                    break;
                case MirroredRepeatWrapping:
                    if (Math.abs(Math.floor(uv.y) % 2) === 1) {
                        uv.y = Math.ceil(uv.y) - uv.y;
                    } else {
                        uv.y = uv.y - Math.floor(uv.y);
                    }
                    break;
            }
        }
        if (this.flipY) {
            uv.y = 1 - uv.y;
        }
        return this;
    }

    public clone(): Texture {
        return new (this.constructor as new () => Texture)().copy(this);
    }

    public copy(source: Texture): this {
        this.name = source.name;
        this.image = source.image;
        this.mipmaps = source.mipmaps.slice(0);
        this.mapping = source.mapping;
        this.wrapS = source.wrapS;
        this.wrapT = source.wrapT;
        this.magFilter = source.magFilter;
        this.minFilter = source.minFilter;
        this.anisotropy = source.anisotropy;
        this.format = source.format;
        this.type = source.type;
        this.offset.copy(source.offset);
        this.repeat.copy(source.repeat);
        this.center.copy(source.center);
        this.rotation = source.rotation;
        this.matrixAutoUpdate = source.matrixAutoUpdate;
        this.matrix.copy(source.matrix);
        this.generateMipmaps = source.generateMipmaps;
        this.premultiplyAlpha = source.premultiplyAlpha;
        this.flipY = source.flipY;
        this.unpackAlignment = source.unpackAlignment;
        this.encoding = source.encoding;
        return this;
    }
}
