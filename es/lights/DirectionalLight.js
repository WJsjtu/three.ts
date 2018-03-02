import { Object3D } from "../core/Object3D";
import { DirectionalLightShadow } from "./DirectionalLightShadow";
import { Light } from "./Light";
export class DirectionalLight extends Light {
    constructor(color, intensity) {
        super(color, intensity);
        this.type = "DirectionalLight";
        this.target = new Object3D();
        this.shadow = new DirectionalLightShadow();
        this.position = Object3D.DefaultUp.clone();
        this.updateMatrix();
    }
    copy(source) {
        super.copy(source);
        this.target = source.target.clone();
        this.shadow = source.shadow.clone();
        return this;
    }
}
