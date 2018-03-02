import { PerspectiveCamera } from "../cameras/PerspectiveCamera";
import { Light } from "./Light";
import { LightShadow } from "./LightShadow";
export class PointLight extends Light {
    constructor(color, intensity, distance = 0, decay = 1) {
        super(color, intensity);
        this.type = "PointLight";
        this.distance = 0;
        this.decay = 1;
        this.distance = distance;
        this.decay = decay;
        this.shadow = new LightShadow(new PerspectiveCamera(90, 1, 0.5, 500));
    }
    /**
     * ntensity = power per solid angle.
     * ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
     * @returns {number}
     */
    get power() {
        return this.intensity * 4 * Math.PI;
    }
    set power(power) {
        this.intensity = power / (4 * Math.PI);
    }
    copy(source) {
        super.copy(source);
        this.distance = source.distance;
        this.decay = source.decay;
        this.shadow = source.shadow.clone();
        return this;
    }
}
