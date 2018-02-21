import {PerspectiveCamera} from "../cameras/PerspectiveCamera";
import {Color} from "../math/Color";
import {Light} from "./Light";
import {LightShadow} from "./LightShadow";

export class PointLight extends Light {
    public readonly type: string = "PointLight";
    public distance: number = 0;
    public decay: number = 1;
    public shadow: LightShadow = null;

    constructor(
        color: Color,
        intensity: number,
        distance: number = 0,
        decay: number = 1,
    ) {
        super(color, intensity);
        this.distance = distance;
        this.decay = decay;
        this.shadow = new LightShadow(new PerspectiveCamera(90, 1, 0.5, 500));
    }

    /**
     * ntensity = power per solid angle.
     * ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
     * @returns {number}
     */
    get power(): number {
        return this.intensity * 4 * Math.PI;
    }

    set power(power: number) {
        this.intensity = power / (4 * Math.PI);
    }

    public copy(source: PointLight): this {
        super.copy(source);
        this.distance = source.distance;
        this.decay = source.decay;
        this.shadow = source.shadow.clone();
        return this;
    }
}
