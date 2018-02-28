import { Object3D } from "../core/Object3D";
import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";

export class Camera extends Object3D {
    public readonly type: string = "Camera";

    public matrixWorldInverse: Matrix4 = new Matrix4();
    public projectionMatrix: Matrix4 = new Matrix4();

    constructor() {
        super();
    }

    public updateMatrixWorld(force: boolean = false): this {
        super.updateMatrixWorld(force);
        this.matrixWorldInverse.getInverse(this.matrixWorld);
        return this;
    }

    public copy(source: Camera, recursive: boolean = true): this {
        super.copy(source, recursive);
        this.matrixWorldInverse.copy(source.matrixWorldInverse);
        this.projectionMatrix.copy(source.projectionMatrix);
        return this;
    }

    get worldDirection(): Vector3 {
        return new Vector3().set(0, 0, -1).applyQuaternion(this.worldQuaternion);
    }

    public clone(): Camera {
        return new (this.constructor as new () => Camera)().copy(this);
    }
}

export interface IFrustumView {
    fullWidth: number;
    fullHeight: number;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    enabled: boolean;
}
