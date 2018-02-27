import { MathUtil } from "../math/Math";
import { Vector4 } from "../math/Vector4";
import { LinearFilter } from "../constants";
import { Texture } from "../textures/Texture";
import { EventDispatcher } from "../core/EventDispatcher";

export interface IWebGLRenderTargetOptions {
    minFilter?: number;
    wrapS?: number;
    wrapT?: number;
    magFilter?: number;
    format?: number;
    type?: number;
    anisotropy?: number;
    encoding?: number;
    depthBuffer?: boolean;
    stencilBuffer?: boolean;
    depthTexture?: boolean;
}

export class WebGLRenderTarget extends EventDispatcher {
    public readonly uuid: string = MathUtil.generateUUID();
    public width: number;
    public height: number;
    public scissor: Vector4;
    public scissorTest: boolean = false;
    public viewport: Vector4;
    public texture: Texture;
    public depthBuffer?: boolean;
    public stencilBuffer?: boolean;
    public depthTexture?: boolean | null; // Question type

    constructor(
        width: number,
        height: number,
        options: IWebGLRenderTargetOptions = {},
    ) {
        super();
        this.width = width;
        this.height = height;
        this.scissor = new Vector4(0, 0, width, height);
        this.viewport = new Vector4(0, 0, width, height);
        if (options.minFilter === undefined) {
            options.minFilter = LinearFilter;
        }
        this.texture = new Texture(
            undefined,
            undefined,
            options.wrapS,
            options.wrapT,
            options.magFilter,
            options.minFilter,
            options.format,
            options.type,
            options.anisotropy,
            options.encoding,
        );
        this.depthBuffer =
            options.depthBuffer !== undefined ? options.depthBuffer : true;
        this.stencilBuffer =
            options.stencilBuffer !== undefined ? options.stencilBuffer : true;
        this.depthTexture =
            options.depthTexture !== undefined ? options.depthTexture : null;
    }

    public setSize(width: number, height: number): void {
        if (this.width !== width || this.height !== height) {
            this.width = width;
            this.height = height;
            this.dispose();
        }
        this.viewport.set(0, 0, width, height);
        this.scissor.set(0, 0, width, height);
    }

    public copy(source: WebGLRenderTarget): this {
        this.width = source.width;
        this.height = source.height;
        this.viewport.copy(source.viewport);
        this.texture = source.texture.clone();
        this.depthBuffer = source.depthBuffer;
        this.stencilBuffer = source.stencilBuffer;
        this.depthTexture = source.depthTexture;
        return this;
    }

    public clone(): WebGLRenderTarget {
        return new (this.constructor as new () => WebGLRenderTarget)().copy(
            this,
        );
    }

    public dispose(): void {
        this.dispatchEvent({ type: "dispose" });
    }
}
