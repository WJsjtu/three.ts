import { Object3D } from "../core/Object3D";
import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";
export class Camera extends Object3D {
    constructor() {
        super();
        this.type = "Camera";
        this.matrixWorldInverse = new Matrix4();
        this.projectionMatrix = new Matrix4();
    }
    updateMatrixWorld(force = false) {
        super.updateMatrixWorld(force);
        this.matrixWorldInverse.getInverse(this.matrixWorld);
        return this;
    }
    copy(source, recursive = true) {
        super.copy(source, recursive);
        this.matrixWorldInverse.copy(source.matrixWorldInverse);
        this.projectionMatrix.copy(source.projectionMatrix);
        return this;
    }
    get worldDirection() {
        return new Vector3().set(0, 0, -1).applyQuaternion(this.worldQuaternion);
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
