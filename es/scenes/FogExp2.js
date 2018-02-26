import { Color } from "../math/Color";
export class FogExp2 {
    constructor(color, density = 1) {
        this.name = "";
        this.color = null;
        this.density = 0.00025;
        if (color instanceof Color) {
            this.color = new Color().copy(color);
        }
        else if (typeof color === "number") {
            this.color = new Color().setHex(color);
        }
        else if (typeof color === "string") {
            this.color = new Color().setStyle(color);
        }
        this.density = density;
    }
    copy(source) {
        this.color.copy(source.color);
        this.density = source.density;
        return this;
    }
    clone() {
        return new this.constructor(this.color, this.density).copy(this);
    }
}
