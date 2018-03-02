import { PerspectiveCamera } from "../cameras/PerspectiveCamera";
import { MathUtil } from "../math/Math";
import { LightShadow } from "./LightShadow";
export class SpotLightShadow extends LightShadow {
    constructor() {
        super(new PerspectiveCamera(50, 1, 0.5, 500));
    }
    update(light) {
        const camera = this.camera;
        const fov = MathUtil.RAD2DEG * 2 * light.angle;
        const aspect = this.mapSize.width / this.mapSize.height;
        const far = light.distance || camera.far;
        if (fov !== camera.fov || aspect !== camera.aspect || far !== camera.far) {
            camera.fov = fov;
            camera.aspect = aspect;
            camera.far = far;
        }
        return this;
    }
    clone() {
        return super.clone();
    }
}
