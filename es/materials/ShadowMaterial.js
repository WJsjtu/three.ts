import { Color } from "../math/Color";
import { Material } from "./Material";
export class ShadowMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = "ShadowMaterial";
        this.color = new Color().setHex(0x000000);
        this.transparent = true;
        this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.color.copy(source.color);
        return this;
    }
}
