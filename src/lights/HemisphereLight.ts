import { Object3D } from "../core/Object3D";
import { Color } from "../math/Color";
import { Light } from "./Light";

export class HemisphereLight extends Light {
    public readonly type: string = "HemisphereLight";
    public castShadow: boolean = false;
    public groundColor: Color;

    constructor(skyColor: Color, groundColor: Color, intensity: number) {
        super(skyColor, intensity);
        this.groundColor = groundColor;
        this.position = Object3D.DefaultUp.clone();
        this.updateMatrix();
    }

    public copy(source: HemisphereLight): this {
        super.copy(source);
        this.groundColor.copy(source.groundColor);
        return this;
    }
}
