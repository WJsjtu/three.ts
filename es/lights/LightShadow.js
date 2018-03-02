import { Matrix4 } from "../math/Matrix4";
import { Vector2 } from "../math/Vector2";
export class LightShadow {
    constructor(camera) {
        this.bias = 0;
        this.radius = 1;
        this.mapSize = new Vector2(512, 512);
        this.map = null;
        this.matrix = new Matrix4();
        this.camera = camera;
    }
    copy(source) {
        this.camera = source.camera.clone();
        this.bias = source.bias;
        this.radius = source.radius;
        this.mapSize.copy(source.mapSize);
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
