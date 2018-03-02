import { Texture } from "./Texture";
export class CompressedTexture extends Texture {
    constructor(mipmaps, width, height, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
        super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
        this.image = { width: width, height: height };
        this.mipmaps = mipmaps;
        /**
         * no flipping for cube textures
         * (also flipping doesn't work for compressed textures )
         * @type {boolean}
         */
        this.flipY = false;
        /**
         * can't generate mipmaps for compressed textures
         * mips must be embedded in DDS files
         * @type {boolean}
         */
        this.generateMipmaps = false;
    }
}
