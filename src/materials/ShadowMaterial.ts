import { Color } from "../math/Color";
import { IMaterialParameters, Material } from "./Material";

export interface IShadowMaterialParameters extends IMaterialParameters {
    color?: Color | number | string;
}

export class ShadowMaterial extends Material {
    public readonly type: string = "ShadowMaterial";

    public color: Color = new Color().setHex(0x000000);
    public opacity: number = 1.0;
    public lights: boolean = true;
    public transparent: boolean = true;

    constructor(parameters: IShadowMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: ShadowMaterial): this {
        super.copy(source);
        this.color.copy(source.color);
        return this;
    }
}
