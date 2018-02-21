import {Camera} from "../cameras/Camera";
import {Matrix4} from "../math/Matrix4";
import {Vector2} from "../math/Vector2";

export class LightShadow {
    public camera: Camera = null;
    public bias: number = 0;
    public radius: number = 1;
    public mapSize: Vector2 = new Vector2(512, 512);
    public map: any = null;
    public matrix: Matrix4 = new Matrix4();

    constructor(camera: Camera) {
        this.camera = camera;
    }

    public copy(source: LightShadow): this {
        this.camera = source.camera.clone();
        this.bias = source.bias;
        this.radius = source.radius;
        this.mapSize.copy(source.mapSize);
        return this;
    }

    public clone(): LightShadow {
        return (new (this.constructor as () => void)() as LightShadow).copy(
            this,
        );
    }
}
