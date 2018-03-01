import { Vector4 } from "../math/Vector4";
import { PerspectiveCamera } from "./PerspectiveCamera";
import { Camera } from "./Camera";

export interface ArrayCameraCamera extends Camera {
    bounds: Vector4;
}

export class ArrayCamera extends PerspectiveCamera {
    public cameras: ArrayCameraCamera[] = [];
    constructor(cameras: ArrayCameraCamera[] = []) {
        super();
        this.cameras = cameras;
    }
}
