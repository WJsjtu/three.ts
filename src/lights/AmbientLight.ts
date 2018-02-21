import {Light} from "./Light";
import {Color} from "../math/Color";

export class AmbientLight extends Light {
    public readonly type: string = "AmbientLight";
    public castShadow: boolean = false;

    constructor(color: Color, intensity: number) {
        super(color, intensity);
    }
}
