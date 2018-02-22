import { Camera } from "../cameras/Camera";
import { Euler } from "../math/Euler";
import { MathUtil } from "../math/Math";
import { Matrix4 } from "../math/Matrix4";
import { Quaternion } from "../math/Quaternion";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { EventDispatcher } from "./EventDispatcher";
import { Layers } from "./Layers";
import { IIntersection, Raycaster } from "./Raycaster";

let object3DId: number = 0;

export class Object3D extends EventDispatcher {
    public static DefaultUp = new Vector3(0, 1, 0);

    public readonly id: number = object3DId++;
    public readonly uuid: string = MathUtil.generateUUID();
    public name: string = "";
    public readonly type: string = "Object3D";
    public parent: Object3D | null = null;
    public children: Object3D[] = [];
    public up: Vector3 = new Vector3().copy(Object3D.DefaultUp);
    public matrix: Matrix4 = new Matrix4();
    public matrixWorld: Matrix4 = new Matrix4();
    public layers: Layers = new Layers();
    public visible: boolean = true;
    public castShadow: boolean = false;
    public receiveShadow: boolean = false;
    public frustumCulled: boolean = true;
    public renderOrder: number = 0;
    public userData: any = {};

    protected _position: Vector3 = new Vector3();
    protected _rotation: Euler = new Euler();
    protected _quaternion: Quaternion = new Quaternion();
    protected _scale: Vector3 = new Vector3(1, 1, 1);

    set position(_position: Vector3) {
        if (!this._position.equals(_position)) {
            this._position.copy(_position);
            this.updateMatrix();
        }
    }

    get position(): Vector3 {
        return new Vector3().copy(this._position);
    }

    set rotation(_rotation: Euler) {
        if (!this._rotation.equals(_rotation)) {
            this._rotation.copy(_rotation);
            this.updateMatrix();
        }
    }

    get rotation(): Euler {
        return new Euler().copy(this._rotation);
    }

    set quaternion(_quaternion: Quaternion) {
        if (!this._quaternion.equals(_quaternion)) {
            this._quaternion.copy(_quaternion);
            this.updateMatrix();
        }
    }

    get quaternion(): Quaternion {
        return new Quaternion().copy(this._quaternion);
    }

    set scale(_scale: Vector3) {
        if (!this._scale.equals(_scale)) {
            this._scale.copy(_scale);
            this.updateMatrix();
        }
    }

    get scale(): Vector3 {
        return new Vector3().copy(this._scale);
    }

    public updateMatrix(): this {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        if (this.parent === null) {
            this.matrixWorld.copy(this.matrix);
        } else {
            this.matrixWorld.multiplyMatrices(
                this.parent.matrixWorld,
                this.matrix,
            );
        }
        this.children.forEach((child: Object3D) => {
            child.updateMatrix();
        });
        return this;
    }

    public raycast(
        raycaster: Raycaster,
        intersections: IIntersection[] = [],
    ): IIntersection[] {
        return intersections;
    }

    public applyMatrix(matrix: Matrix4): this {
        this.matrix.multiplyMatrices(matrix, this.matrix);
        this.matrix.decompose(this._position, this._quaternion, this._scale);
        this.children.forEach((child: Object3D) => {
            child.updateMatrix();
        });
        return this;
    }

    public applyQuaternion(q: Quaternion): this {
        this._quaternion.premultiply(q);
        return this.updateMatrix();
    }

    /**
     * assumes axis is normalized
     * @param axis
     * @param angle
     * @returns {Object3D}
     */
    public setRotationFromAxisAngle(axis: Vector3, angle: number): this {
        this._quaternion.setFromAxisAngle(axis, angle);
        return this.updateMatrix();
    }

    public setRotationFromEuler(euler: Euler): this {
        this._quaternion.setFromEuler(euler);
        return this.updateMatrix();
    }

    /**
     * assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
     * @param m
     * @returns {Object3D}
     */
    public setRotationFromMatrix(m: Matrix4): this {
        this._quaternion.setFromRotationMatrix(m);
        return this.updateMatrix();
    }

    /**
     * assumes q is normalized
     * @param q
     * @returns {Object3D}
     */
    public setRotationFromQuaternion(q: Quaternion): this {
        this._quaternion.copy(q);
        return this.updateMatrix();
    }

    public rotateOnAxis(axis: Vector3, angle: number): this {
        const q: Quaternion = new Quaternion();
        q.setFromAxisAngle(axis, angle);
        this._quaternion.multiply(q);
        return this.updateMatrix();
    }

    /**
     * rotate object on axis in world space
     * axis is assumed to be normalized
     * method assumes no rotated parent
     * @param axis
     * @param angle
     * @returns {Object3D}
     */
    public rotateOnWorldAxis(axis: Vector3, angle: number): this {
        const q = new Quaternion();
        q.setFromAxisAngle(axis, angle);
        this.quaternion.premultiply(q);
        return this.updateMatrix();
    }

    public rotateX(angle: number): this {
        return this.rotateOnAxis(new Vector3(1, 0, 0), angle);
    }

    public rotateY(angle: number): this {
        return this.rotateOnAxis(new Vector3(0, 1, 0), angle);
    }

    public rotateZ(angle: number): this {
        return this.rotateOnAxis(new Vector3(0, 0, 1), angle);
    }

    /**
     * translate object by distance along axis in object space
     * axis is assumed to be normalized
     * @param axis
     * @param distance
     * @returns {Object3D}
     */
    public translateOnAxis(axis: Vector3, distance: number): this {
        const vec = new Vector3();
        vec.copy(axis).applyQuaternion(this.quaternion);
        this._position.add(vec.multiplyScalar(distance));
        return this.updateMatrix();
    }

    public translateX(distance: number): this {
        return this.translateOnAxis(new Vector3(1, 0, 0), distance);
    }

    public translateY(distance: number): this {
        return this.translateOnAxis(new Vector3(0, 1, 0), distance);
    }

    public translateZ(distance: number): this {
        return this.translateOnAxis(new Vector3(0, 0, 1), distance);
    }

    public localToWorld(vector: Vector3 | Vector4): Vector3 | Vector4 {
        return vector.applyMatrix4(this.matrixWorld);
    }

    public worldToLocal(vector: Vector3 | Vector4): Vector3 | Vector4 {
        return vector.applyMatrix4(new Matrix4().getInverse(this.matrixWorld));
    }

    public lookAt(vec: Vector3): this {
        const mat: Matrix4 = new Matrix4();
        const vector: Vector3 = new Vector3();
        if (this instanceof Camera) {
            mat.lookAt(this.position, vector, this.up);
        } else {
            mat.lookAt(vector, this.position, this.up);
        }
        this.quaternion.setFromRotationMatrix(mat);
        return this.updateMatrix();
    }

    public add(object: Object3D, ...objects: Object3D[]): this {
        if (objects.length > 1) {
            for (let i: number = 0; i < objects.length; i++) {
                this.add(objects[i]);
            }
            return this;
        }
        if (object === this) {
            console.error(
                `THREE.Object3D.add: object can't be added as a child of itself. ${object}`,
            );
            return this;
        }
        if (object.parent !== null) {
            object.parent.remove(object);
        }
        object.parent = this;
        object.dispatchEvent({ type: "added" });
        this.children.push(object);
        return this;
    }

    public remove(object: Object3D, ...objects: Object3D[]): this {
        if (objects.length > 1) {
            for (let i: number = 0; i < objects.length; i++) {
                this.remove(objects[i]);
            }
            return this;
        }
        const index = this.children.indexOf(object);
        if (index !== -1) {
            object.parent = null;
            object.dispatchEvent({ type: "removed" });
            this.children.splice(index, 1);
        }
        return this;
    }

    get worldPosition(): Vector3 {
        return new Vector3().setFromMatrixPosition(this.matrixWorld);
    }

    get worldQuaternion(): Quaternion {
        const position: Vector3 = new Vector3();
        const scale: Vector3 = new Vector3();
        const result: Quaternion = new Quaternion();
        this.matrixWorld.decompose(position, result, scale);
        return result;
    }

    get worldRotation(): Euler {
        return new Euler().setFromQuaternion(
            this.worldQuaternion,
            this._rotation.order,
        );
    }

    get worldScale(): Vector3 {
        const position: Vector3 = new Vector3();
        const quaternion: Quaternion = new Quaternion();
        const result: Vector3 = new Vector3();
        this.matrixWorld.decompose(position, quaternion, result);
        return result;
    }

    get worldDirection(): Vector3 {
        return new Vector3().set(0, 0, 1).applyQuaternion(this.worldQuaternion);
    }

    public traverse(callback: (object: Object3D) => any): void {
        callback(this);
        for (let i: number = 0, l = this.children.length; i < l; i++) {
            this.children[i].traverse(callback);
        }
    }

    public traverseVisible(callback: (object: Object3D) => any): void {
        if (this.visible === false) return;
        callback(this);
        for (let i: number = 0, l = this.children.length; i < l; i++) {
            this.children[i].traverseVisible(callback);
        }
    }

    public traverseAncestors(callback: (object: Object3D) => any): void {
        if (this.parent !== null) {
            callback(this.parent);
            this.parent.traverseAncestors(callback);
        }
    }

    public clone(recursive: boolean = false) {
        return (new (this.constructor as () => void)() as Object3D).copy(
            this,
            recursive,
        );
    }

    public copy(source: Object3D, recursive: boolean = true): this {
        this.name = source.name;
        this.up.copy(source.up);
        this.position.copy(source.position);
        this.quaternion.copy(source.quaternion);
        this.scale.copy(source.scale);
        this.matrix.copy(source.matrix);
        this.matrixWorld.copy(source.matrixWorld);
        this.layers.mask = source.layers.mask;
        this.visible = source.visible;
        this.castShadow = source.castShadow;
        this.receiveShadow = source.receiveShadow;
        this.frustumCulled = source.frustumCulled;
        this.renderOrder = source.renderOrder;
        this.userData = JSON.parse(JSON.stringify(source.userData));
        if (recursive === true) {
            for (let i: number = 0; i < source.children.length; i++) {
                this.add(source.children[i].clone());
            }
        }
        return this;
    }
}
