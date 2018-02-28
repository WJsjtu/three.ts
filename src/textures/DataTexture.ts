import { NearestFilter } from "../constants";
import { Texture } from "./Texture";
import { TypedArray } from "../core/BufferAttribute";

export class DataTexture extends Texture {
    public image: { data: TypedArray; width: number; height: number };

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
        this.image = { data: data, width: width, height: height };
        this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
        this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;
        this.generateMipmaps = false;
        this.flipY = false;
        this.unpackAlignment = 1;
    }
}
