import { NearestFilter } from "../constants.js";
import { Texture } from "./Texture";
export class DataTexture extends Texture {
    constructor(data, width, height, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
        super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
        this.image = { data: data, width: width, height: height };
        this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
        this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;
        this.generateMipmaps = false;
        this.flipY = false;
        this.unpackAlignment = 1;
    }
}
