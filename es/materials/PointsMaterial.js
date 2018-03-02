import { Color } from "../math/Color";
import { Material } from "./Material";
export class PointsMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = "PointsMaterial";
        this.color = new Color().setHex(0xffffff);
        this.lights = false;
        this.map = null;
        this.size = 1;
        this.sizeAttenuation = true;
        this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.color.copy(source.color);
        this.map = source.map;
        this.size = source.size;
        this.sizeAttenuation = source.sizeAttenuation;
        return this;
    }
}
