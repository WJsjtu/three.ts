import { CubeReflectionMapping } from "../constants";
import { Texture, TextureSource } from "./Texture";

export class CubeTexture extends Texture {
    constructor(
        images: TextureSource = [],
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
            images,
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

    get images(): TextureSource {
        return this.image;
    }

    set images(images: TextureSource) {
        this.image = images;
    }
}
