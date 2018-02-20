import {Light} from "./Light";
import {Color} from "../math/Color";
import {Object3D} from "../core/Object3D";

export class HemisphereLight extends Light {
    public readonly type: string = "HemisphereLight";
    public castShadow: boolean = false;
    public groundColor: Color = null;

    constructor(skyColor: Color, groundColor: Color, intensity: number) {
        super(skyColor, intensity);
        this.groundColor = groundColor;
        this.position = Object3D.DefaultUp.clone();
    }

    copy(source: HemisphereLight): HemisphereLight {
        super.copy(source);
        this.groundColor.copy(source.groundColor);
        return this;
    }
}