import { PerspectiveCamera } from "./PerspectiveCamera";
import { Camera } from "./Camera";

export class ArrayCamera extends PerspectiveCamera {
    public cameras: Camera[] = [];
    constructor(cameras: Camera[] = []) {
        super();
        this.cameras = cameras;
    }
}
