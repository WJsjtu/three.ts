import { Matrix4 } from "../math/Matrix4";
import { Vector2 } from "../math/Vector2";
import { WebGLRenderTarget } from "../renderers/WebGLRenderTarget";
import { PerspectiveCamera } from "../cameras/PerspectiveCamera";
import { OrthographicCamera } from "../cameras/OrthographicCamera";

/**
 * updateMatrixWorld
 * near
 * far
 * Above properties and method is needed in WebGLShadowMap.render
 */
export type LightShadowCamera = PerspectiveCamera | OrthographicCamera;

export class LightShadow {
    public camera: LightShadowCamera;
    public bias: number = 0;
    public radius: number = 1;
    public mapSize: Vector2 = new Vector2(512, 512);
    public map: WebGLRenderTarget | null = null;
    public matrix: Matrix4 = new Matrix4();

    constructor(camera: LightShadowCamera) {
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
        return new (this.constructor as new () => LightShadow)().copy(this);
    }
}
