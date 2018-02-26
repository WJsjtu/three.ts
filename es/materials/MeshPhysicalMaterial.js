import { Material } from "./Material";
export class MeshPhysicalMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = "MeshPhysicalMaterial";
        // maps to F0 = 0.04
        this.clearCoat = 0.0;
        this.clearCoatRoughness = 0.0;
        this.defines = { PHYSICAL: "" };
        this.reflectivity = 0.5;
        this.setValues(parameters);
    }
    copy(source) {
        this.defines = { PHYSICAL: "" };
        this.reflectivity = source.reflectivity;
        this.clearCoat = source.clearCoat;
        this.clearCoatRoughness = source.clearCoatRoughness;
        return this;
    }
}
