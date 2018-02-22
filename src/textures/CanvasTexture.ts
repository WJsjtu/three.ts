import { Texture } from "./Texture";

export class CanvasTexture extends Texture {
    constructor(
        canvas: HTMLCanvasElement,
        mapping?: number,
        wrapS?: number,
        wrapT?: number,
        magFilter?: number,
        minFilter?: number,
        format?: number,
        type?: number,
        anisotropy?: number,
    ) {
        super(
            canvas,
            mapping,
            wrapS,
            wrapT,
            magFilter,
            minFilter,
            format,
            type,
            anisotropy,
        );
        this.needsUpdate = true;
    }
}
