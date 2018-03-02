import { Light } from "./Light";
export class RectAreaLight extends Light {
    constructor(color, intensity, width = 10, height = 10) {
        super(color, intensity);
        this.type = "RectAreaLight";
        this.width = 10;
        this.height = 10;
        this.width = width;
        this.height = height;
    }
    copy(source) {
        super.copy(source);
        this.width = source.width;
        this.height = source.height;
        return this;
    }
}
