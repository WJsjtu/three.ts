import {Texture} from "./Texture";
import {NearestFilter} from "../constants.js";

export class DataTexture extends Texture {
    constructor(
        data: any,
        width: number,
        height: number,
        mapping?: number,
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
            null,
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
        this.image = {data: data, width: width, height: height};
        this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
        this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;
        this.generateMipmaps = false;
        this.flipY = false;
        this.unpackAlignment = 1;
    }
}
