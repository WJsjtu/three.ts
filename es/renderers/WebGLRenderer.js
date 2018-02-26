import { LinearToneMapping, } from "../constants.js";
export class WebGLRenderer {
    constructor() {
        this.context = null;
        this.localClippingEnabled = false;
        this.physicallyCorrectLights = false;
        this.toneMapping = LinearToneMapping;
    }
    allocTextureUnit() {
        return 0;
    }
    renderBufferDirect(camera, fog, geometry, material, object, group) { }
    setTexture2D(texture, unit) { }
    setTextureCube(cubeTexture, unit) { }
    getRenderTarget() {
        return this.currentRendererTarget;
    }
    setRenderTarget(currentRendererTarget) { }
    clear() { }
}
