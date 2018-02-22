import { Object3D } from "../core/Object3D";
import { Color } from "../math/Color";
import { DirectionalLightShadow } from "./DirectionalLightShadow";
import { Light } from "./Light";

export class DirectionalLight extends Light {
    public readonly type: string = "DirectionalLight";
    public target: Object3D = new Object3D();
    public shadow: DirectionalLightShadow = new DirectionalLightShadow();

    constructor(color: Color, intensity: number) {
        super(color, intensity);
        this.position = Object3D.DefaultUp.clone();
    }

    public copy(source: DirectionalLight): this {
        super.copy(source);
        this.target = source.target.clone();
        this.shadow = source.shadow.clone();
        return this;
    }
}
