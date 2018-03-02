import { Vector3 } from "../math/Vector3";
import { Material } from "./Material";
export class MeshDistanceMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = "MeshDepthMaterial";
        this.alphaMap = null;
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.farDistance = 1;
        this.fog = false;
        this.lights = false;
        this.map = null;
        this.morphTargets = false;
        this.nearDistance = 1;
        this.referencePosition = new Vector3();
        this.skinning = false;
        this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.referencePosition.copy(source.referencePosition);
        this.nearDistance = source.nearDistance;
        this.farDistance = source.farDistance;
        this.skinning = source.skinning;
        this.morphTargets = source.morphTargets;
        this.map = source.map;
        this.alphaMap = source.alphaMap;
        this.displacementMap = source.displacementMap;
        this.displacementScale = source.displacementScale;
        this.displacementBias = source.displacementBias;
        return this;
    }
}
