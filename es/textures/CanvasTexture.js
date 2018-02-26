import { Texture } from "./Texture";
export class CanvasTexture extends Texture {
    constructor(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
        super(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
        this.needsUpdate = true;
    }
}
