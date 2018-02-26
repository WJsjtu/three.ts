import { Color } from "../math/Color";
import { Material } from "./Material";
export class SpriteMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = "SpriteMaterial";
        this.color = new Color().setHex(0xffffff);
        this.fog = false;
        this.lights = false;
        this.map = null;
        this.rotation = 0;
        this.setValues(parameters);
    }
    copy(source) {
        super.copy(source);
        this.color.copy(source.color);
        this.map = source.map;
        this.rotation = source.rotation;
        return this;
    }
}
