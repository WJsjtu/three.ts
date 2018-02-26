import { MathUtil } from "../math/Math";
import { Vector4 } from "../math/Vector4";
import { LinearFilter } from "../constants";
import { Texture } from "../textures/Texture";
import { EventDispatcher } from "../core/EventDispatcher";
export class WebGLRenderTarget extends EventDispatcher {
    constructor(width, height, options = {}) {
        super();
        this.uuid = MathUtil.generateUUID();
        this.scissorTest = false;
        this.texture = null;
        this.width = width;
        this.height = height;
        this.scissor = new Vector4(0, 0, width, height);
        this.viewport = new Vector4(0, 0, width, height);
        if (options.minFilter === undefined) {
            options.minFilter = LinearFilter;
        }
        this.texture = new Texture(undefined, undefined, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding);
        this.depthBuffer =
            options.depthBuffer !== undefined ? options.depthBuffer : true;
        this.stencilBuffer =
            options.stencilBuffer !== undefined ? options.stencilBuffer : true;
        this.depthTexture =
            options.depthTexture !== undefined ? options.depthTexture : null;
    }
    setSize(width, height) {
        if (this.width !== width || this.height !== height) {
            this.width = width;
            this.height = height;
            this.dispose();
        }
        this.viewport.set(0, 0, width, height);
        this.scissor.set(0, 0, width, height);
    }
    copy(source) {
        this.width = source.width;
        this.height = source.height;
        this.viewport.copy(source.viewport);
        this.texture = source.texture.clone();
        this.depthBuffer = source.depthBuffer;
        this.stencilBuffer = source.stencilBuffer;
        this.depthTexture = source.depthTexture;
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    dispose() {
        this.dispatchEvent({ type: "dispose" });
    }
}
