import {Light} from "./Light";
import {Color} from "../math/Color";

export class RectAreaLight extends Light {
    public readonly type: string = "RectAreaLight";
    public width: number = 10;
    public height: number = 10;

    constructor(color: Color, intensity: number, width: number = 10, height: number = 10) {
        super(color, intensity);
        this.width = width;
        this.height = height;
    }

    public copy(source: RectAreaLight): RectAreaLight {
        super.copy(source);
        this.width = source.width;
        this.height = source.height;
        return this;
    }
}