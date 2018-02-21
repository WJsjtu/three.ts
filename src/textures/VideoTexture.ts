import {Texture} from "./Texture";

export class VideoTexture extends Texture {
    constructor(video: HTMLVideoElement,
                mapping?: number,
                wrapS?: number,
                wrapT?: number,
                magFilter?: number,
                minFilter?: number,
                format?: number,
                type?: number,
                anisotropy?: number) {
        super(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
        this.generateMipmaps = false;
    }

    public update(): this {
        const video: HTMLVideoElement = this.image as HTMLVideoElement;
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
            this.needsUpdate = true;
        }
        return this;
    }
}