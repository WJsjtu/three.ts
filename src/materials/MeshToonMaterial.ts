import { Texture } from "../textures/Texture";
import {
    IMeshPhongMaterialParameters,
    MeshPhongMaterial,
} from "./MeshPhongMaterial";

export interface IMeshToonMaterialParameters
    extends IMeshPhongMaterialParameters {
    gradientMap?: Texture;
}

export class MeshToonMaterial extends MeshPhongMaterial {
    public readonly type: string = "MeshToonMaterial";

    public defines: { [key: string]: any } = { TOON: "" };
    public gradientMap: Texture = null;

    constructor(parameters: IMeshPhongMaterialParameters) {
        super(parameters);
        this.setValues(parameters);
    }

    public copy(source: MeshToonMaterial): this {
        super.copy(source);
        this.gradientMap = source.gradientMap;
        return this;
    }
}
