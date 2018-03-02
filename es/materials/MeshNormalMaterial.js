import { Vector2 } from "../math/Vector2";
import { Material } from "./Material";
export class MeshNormalMaterial extends Material {
    constructor(paramenters) {
        super();
        this.type = "MeshNormalMaterial";
        this.bumpMap = null;
        this.bumpScale = 1;
        this.normalMap = null;
        this.normalScale = new Vector2(1, 1);
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.fog = false;
        this.lights = false;
        this.skinning = false;
        this.morphTargets = false;
        this.morphNormals = false;
        this.setValues(paramenters);
    }
}
