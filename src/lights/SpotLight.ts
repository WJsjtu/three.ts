import {Light} from "./Light";
import {Color} from "../math/Color";
import {Object3D} from "../core/Object3D";
import {SpotLightShadow} from "./SpotLightShadow";

export class SpotLight extends Light {
    public readonly type: string = "SpotLight";
    public target: Object3D = new Object3D();
    public distance: number = 0;
    public angle: number = Math.PI / 3;
    public penumbra: number = 0;
    public decay: number = 0;
    public shadow: SpotLightShadow = null;

    constructor(
        color: Color,
        intensity: number,
        distance: number = 0,
        angle: number = Math.PI / 3,
        penumbra: number = 0,
        decay: number = 1,
    ) {
        super(color, intensity);
        this.position = Object3D.DefaultUp.clone();
        this.distance = distance;
        this.angle = angle;
        this.penumbra = penumbra;
        this.decay = decay;
        this.shadow = new SpotLightShadow();
    }

    get power(): number {
        return this.intensity * Math.PI;
    }

    set power(power: number) {
        this.intensity = power / Math.PI;
    }

    public copy(source: SpotLight): this {
        super.copy(source);
        this.distance = source.distance;
        this.angle = source.angle;
        this.penumbra = source.penumbra;
        this.decay = source.decay;
        this.target = source.target.clone();
        this.shadow = source.shadow.clone();
        return this;
    }
}
