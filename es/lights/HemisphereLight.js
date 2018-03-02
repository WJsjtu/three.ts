import { Object3D } from "../core/Object3D";
import { Light } from "./Light";
export class HemisphereLight extends Light {
    constructor(skyColor, groundColor, intensity) {
        super(skyColor, intensity);
        this.type = "HemisphereLight";
        this.castShadow = false;
        this.groundColor = groundColor;
        this.position = Object3D.DefaultUp.clone();
        this.updateMatrix();
    }
    copy(source) {
        super.copy(source);
        this.groundColor.copy(source.groundColor);
        return this;
    }
}
