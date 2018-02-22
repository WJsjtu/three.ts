import {Color} from "../math/Color";
import {IMaterialParameters, Material} from "./Material";

export interface ILineBasicMaterialParameters extends IMaterialParameters {
    color?: Color | number | string;
    linewidth?: number;
    linecap?: string;
    linejoin?: string;
}

export class LineBasicMaterial extends Material {
    public readonly type: string = "LineBasicMaterial";

    public color: Color = new Color().setHex(0xffffff);
    public lights: boolean = false;
    public linecap: string = "round";
    public linejoin: string = "round";
    public linewidth: number = 1;

    constructor(parameters: ILineBasicMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: LineBasicMaterial): this {
        super.copy(source);
        this.color.copy(source.color);
        this.linewidth = source.linewidth;
        this.linecap = source.linecap;
        this.linejoin = source.linejoin;
        return this;
    }
}
