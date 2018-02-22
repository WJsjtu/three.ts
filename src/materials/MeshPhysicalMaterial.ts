import { IMaterialParameters, Material } from "./Material";

export interface IMeshPhysicalMaterialParameters extends IMaterialParameters {
    clearCoat?: number;
    clearCoatRoughness?: number;
    reflectivity?: number;
}

export class MeshPhysicalMaterial extends Material {
    public readonly type: string = "MeshPhysicalMaterial";

    // maps to F0 = 0.04
    public clearCoat: number = 0.0;
    public clearCoatRoughness: number = 0.0;
    public defines: { [key: string]: any } = { PHYSICAL: "" };
    public reflectivity: number = 0.5;

    constructor(parameters: IMeshPhysicalMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: MeshPhysicalMaterial): this {
        this.defines = { PHYSICAL: "" };
        this.reflectivity = source.reflectivity;
        this.clearCoat = source.clearCoat;
        this.clearCoatRoughness = source.clearCoatRoughness;
        return this;
    }
}
