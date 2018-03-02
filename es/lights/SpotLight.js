import { Object3D } from "../core/Object3D";
import { Light } from "./Light";
import { SpotLightShadow } from "./SpotLightShadow";
export class SpotLight extends Light {
    constructor(color, intensity, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 1) {
        super(color, intensity);
        this.type = "SpotLight";
        this.target = new Object3D();
        this.distance = 0;
        this.angle = Math.PI / 3;
        this.penumbra = 0;
        this.decay = 0;
        this.shadow = new SpotLightShadow();
        this.position = Object3D.DefaultUp.clone();
        this.updateMatrix();
        this.distance = distance;
        this.angle = angle;
        this.penumbra = penumbra;
        this.decay = decay;
    }
    get power() {
        return this.intensity * Math.PI;
    }
    set power(power) {
        this.intensity = power / Math.PI;
    }
    copy(source) {
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
