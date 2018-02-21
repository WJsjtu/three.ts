import {Material, MaterialParameters} from "./Material";
import {Color} from "../math/Color";

export interface LineBasicMaterialParameters extends MaterialParameters {
    color?: Color | number | string,
    linewidth?: number,
    linecap?: string
    linejoin?: string
}

export class LineBasicMaterial extends Material {

    public readonly type: string = "LineBasicMaterial";
    public color: Color = new Color().setHex(0xffffff);
    public linewidth: number = 1;
    public linecap: string = "round";
    public linejoin: string = "round";
    public lights: boolean = false;

    constructor(parameters: LineBasicMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: LineBasicMaterial): LineBasicMaterial {
        super.copy(source);
        this.color.copy(source.color);
        this.linewidth = source.linewidth;
        this.linecap = source.linecap;
        this.linejoin = source.linejoin;
        return this;
    }
}