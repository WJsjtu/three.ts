import { Texture } from "./Texture";
export class VideoTexture extends Texture {
    constructor(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
        super(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
        this.image = Texture.DEFAULT_IMAGE;
        this.generateMipmaps = false;
    }
    update() {
        const video = this.image;
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
            this.needsUpdate = true;
        }
        return this;
    }
}
