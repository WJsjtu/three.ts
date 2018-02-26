import { CubeReflectionMapping } from "../constants.js";
import { Texture } from "./Texture";
export class CubeTexture extends Texture {
    constructor(images = [], mapping = CubeReflectionMapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
        super(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
        this.flipY = false;
    }
    get images() {
        return this.image;
    }
    set images(images) {
        this.image = images;
    }
}
