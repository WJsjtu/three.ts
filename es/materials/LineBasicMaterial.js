import { Color } from "../math/Color";
import { Material } from "./Material";
export class LineBasicMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = "LineBasicMaterial";
        this.color = new Color().setHex(0xffffff);
        this.lights = false;
        this.linecap = "round";
        this.linejoin = "round";
        this.linewidth = 1;
        this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.color.copy(source.color);
        this.linewidth = source.linewidth;
        this.linecap = source.linecap;
        this.linejoin = source.linejoin;
        return this;
    }
}
