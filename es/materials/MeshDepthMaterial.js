import { BasicDepthPacking } from "../constants";
import { Material } from "./Material";
export class MeshDepthMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = "MeshDepthMaterial";
        this.alphaMap = null;
        this.depthPacking = BasicDepthPacking;
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.fog = false;
        this.lights = false;
        this.map = null;
        this.morphTargets = false;
        this.skinning = false;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.depthPacking = source.depthPacking;
        this.skinning = source.skinning;
        this.morphTargets = source.morphTargets;
        this.map = source.map;
        this.alphaMap = source.alphaMap;
        this.displacementMap = source.displacementMap;
        this.displacementScale = source.displacementScale;
        this.displacementBias = source.displacementBias;
        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;
        return this;
    }
}
