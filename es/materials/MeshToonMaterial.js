import { MeshPhongMaterial } from "./MeshPhongMaterial";
export class MeshToonMaterial extends MeshPhongMaterial {
    constructor(parameters) {
        super(parameters);
        this.type = "MeshToonMaterial";
        this.defines = { TOON: "" };
        this.gradientMap = null;
        this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.gradientMap = source.gradientMap;
        return this;
    }
}
