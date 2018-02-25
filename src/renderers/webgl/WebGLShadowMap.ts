import {
    FrontSide,
    BackSide,
    DoubleSide,
    RGBAFormat,
    NearestFilter,
    PCFShadowMap,
    RGBADepthPacking,
} from "../../constants.js";

export class WebGLShadowMap {
    public type: number = PCFShadowMap;
    public enabled: boolean = false;
    public autoUpdate: boolean = true;
    public needsUpdate: boolean = false;
}
