import {LightShadow} from "./LightShadow";
import {PerspectiveCamera} from "../cameras/PerspectiveCamera";
import {MathUtil} from "../math/Math";

export class SpotLightShadow extends LightShadow {
    constructor() {
        super(new PerspectiveCamera(50, 1, 0.5, 500));
    }

    update(light) {
        const camera: PerspectiveCamera = this.camera as PerspectiveCamera;
        const fov: number = MathUtil.RAD2DEG * 2 * light.angle;
        const aspect: number = this.mapSize.width / this.mapSize.height;
        const far: number = light.distance || camera.far;
        if (fov !== camera.fov || aspect !== camera.aspect || far !== camera.far) {
            camera.fov = fov;
            camera.aspect = aspect;
            camera.far = far;
        }
    }

    public clone(): SpotLightShadow {
        return super.clone() as SpotLightShadow;
    }
}