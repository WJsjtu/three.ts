import { Color } from "../math/Color";
export class Fog {
    constructor(color, near = 1, far = 1000) {
        this.name = "";
        this.color = null;
        this.near = 1;
        this.far = 1000;
        if (color instanceof Color) {
            this.color = new Color().copy(color);
        }
        else if (typeof color === "number") {
            this.color = new Color().setHex(color);
        }
        else if (typeof color === "string") {
            this.color = new Color().setStyle(color);
        }
        this.near = near;
        this.far = far;
    }
    copy(source) {
        this.color.copy(source.color);
        this.near = source.near;
        this.far = source.far;
        return this;
    }
    clone() {
        return new this.constructor(this.color, this.near, this.far).copy(this);
    }
}
