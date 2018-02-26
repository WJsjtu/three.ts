import {
    DepthFormat,
    DepthStencilFormat,
    NearestFilter,
    UnsignedInt248Type,
    UnsignedShortType,
} from "../constants";
import { Texture } from "./Texture";

export class DepthTexture extends Texture {
    constructor(
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
        format = format !== undefined ? format : DepthFormat;
        if (format !== DepthFormat && format !== DepthStencilFormat) {
            throw new Error(
                `DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`,
            );
        }
        if (type === undefined && format === DepthFormat) {
            type = UnsignedShortType;
        }
        if (type === undefined && format === DepthStencilFormat) {
            type = UnsignedInt248Type;
        }
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
        this.image = { width: width, height: height };
        this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
        this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;
        this.flipY = false;
        this.generateMipmaps = false;
    }
}
