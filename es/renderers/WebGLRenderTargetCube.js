import { WebGLRenderTarget } from "./WebGLRenderTarget";
export class WebGLRenderTargetCube extends WebGLRenderTarget {
    constructor(width, height, options = {}) {
        super(width, height, options);
        // PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5
        this.activeCubeFace = 0;
        this.activeMipMapLevel = 0;
    }
}
