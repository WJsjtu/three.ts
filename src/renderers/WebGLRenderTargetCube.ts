import { WebGLRenderTarget, IWebGLRenderTargetOptions } from "./WebGLRenderTarget";

export class WebGLRenderTargetCube extends WebGLRenderTarget {
    // PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5
    public activeCubeFace: number = 0;
    public activeMipMapLevel: number = 0;

    constructor(width: number, height: number, options: IWebGLRenderTargetOptions = {}) {
        super(width, height, options);
    }
}
