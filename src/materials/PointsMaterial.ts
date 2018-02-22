import { Color } from "../math/Color";
import { Texture } from "../textures/Texture";
import { IMaterialParameters, Material } from "./Material";

export interface IPointsMaterialParameters extends IMaterialParameters {
    color?: Color;
    map?: Texture;
    size?: number;
    sizeAttenuation?: boolean;
}

export class PointsMaterial extends Material {
    public readonly type: string = "PointsMaterial";

    public color: Color = new Color().setHex(0xffffff);
    public lights: boolean = false;
    public map: Texture = null;
    public size: number = 1;
    public sizeAttenuation: boolean = true;

    constructor(parameters: IPointsMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: PointsMaterial): this {
        super.copy(source);
        this.map = source.map;
        this.size = source.size;
        this.sizeAttenuation = source.sizeAttenuation;
        return this;
    }
}
