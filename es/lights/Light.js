import { Object3D } from "../core/Object3D";
import { Color } from "../math/Color";
export class Light extends Object3D {
    constructor(color = new Color(), intensity = 1) {
        super();
        this.type = "Light";
        this.intensity = 1;
        this.receiveShadow = false;
        this.color = color;
        this.intensity = intensity;
    }
    copy(source) {
        super.copy(source);
        this.color.copy(source.color);
        this.intensity = source.intensity;
        return this;
    }
}
