import { Texture } from "./Texture";
export class CanvasTexture extends Texture {
    constructor(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
        super(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
        this.image = Texture.DEFAULT_IMAGE;
        this.needsUpdate = true;
    }
}
