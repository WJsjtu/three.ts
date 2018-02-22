import { Color } from "../math/Color";
import { Light } from "./Light";

export class RectAreaLight extends Light {
    public readonly type: string = "RectAreaLight";
    public width: number = 10;
    public height: number = 10;

    constructor(
        color: Color,
        intensity: number,
        width: number = 10,
        height: number = 10,
    ) {
        super(color, intensity);
        this.width = width;
        this.height = height;
    }

    public copy(source: RectAreaLight): this {
        super.copy(source);
        this.width = source.width;
        this.height = source.height;
        return this;
    }
}
