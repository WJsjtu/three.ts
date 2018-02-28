import { CubeReflectionMapping } from "../constants";
import { Texture, HTMLTextureSource } from "./Texture";
import { DataTexture } from "./DataTexture";

export class CubeTexture extends Texture {
    public image: HTMLTextureSource[];

    constructor(
        images: HTMLTextureSource[] | DataTexture = [],
        mapping: number = CubeReflectionMapping,
        wrapS?: number,
        wrapT?: number,
        magFilter?: number,
        minFilter?: number,
        format?: number,
        type?: number,
        anisotropy?: number,
        encoding?: number,
    ) {
        super(
            images as any,
            mapping,
            wrapS,
            wrapT,
            magFilter,
            minFilter,
            format,
            type,
            anisotropy,
            encoding,
        );
        this.flipY = false;
    }

    get images(): HTMLTextureSource[] {
        return this.image;
    }

    set images(images: HTMLTextureSource[]) {
        this.image = images;
    }
}
