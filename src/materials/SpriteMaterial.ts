import { Color } from "../math/Color";
import { Texture } from "../textures/Texture";
import { IMaterialParameters, Material } from "./Material";

export interface ISpriteMaterialParameters extends IMaterialParameters {
    color?: Color | number | string;
    fog?: boolean;
    map?: Texture;
    rotation?: number;
}

export class SpriteMaterial extends Material {
    public readonly type: string = "SpriteMaterial";

    public color: Color = new Color().setHex(0xffffff);
    public fog: boolean = false;
    public lights: boolean = false;
    public map: Texture = null;
    public rotation: number = 0;

    constructor(parameters?: ISpriteMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: SpriteMaterial): this {
        super.copy(source);
        this.color.copy(source.color);
        this.map = source.map;
        this.rotation = source.rotation;
        return this;
    }
}
