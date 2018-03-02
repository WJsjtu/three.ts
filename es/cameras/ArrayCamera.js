import { PerspectiveCamera } from "./PerspectiveCamera";
export class ArrayCamera extends PerspectiveCamera {
    constructor(cameras = []) {
        super();
        this.cameras = [];
        this.cameras = cameras;
    }
}
