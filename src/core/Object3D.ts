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
import {
    MeshDepthMaterial,
    MeshDistanceMaterial,
} from "../materials/Materials";

let object3DId: number = 0;

export class Object3D extends EventDispatcher {
    public static DefaultUp = new Vector3(0, 1, 0);
    public static DefaultMatrixAutoUpdate: boolean = true;

    public readonly id: number = object3DId++;
    public readonly uuid: string = MathUtil.generateUUID();
    public name: string = "";
    public readonly type: string = "Object3D";
    public parent: Object3D | null = null;
    public children: Object3D[] = [];
    public up: Vector3 = new Vector3().copy(Object3D.DefaultUp);
    public matrix: Matrix4 = new Matrix4();
    public matrixWorld: Matrix4 = new Matrix4();
    public matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
    public matrixWorldNeedsUpdate: boolean = false;
    public layers: Layers = new Layers();
    public visible: boolean = true;
    public castShadow: boolean = false;
    public receiveShadow: boolean = false;
    public frustumCulled: boolean = true;
    public renderOrder: number = 0;
    public userData: any = {};

    public position: Vector3 = new Vector3();
    public rotation: Euler = new Euler();
    public quaternion: Quaternion = new Quaternion();
    public scale: Vector3 = new Vector3(1, 1, 1);
    public modelViewMatrix: Matrix4 = new Matrix4();
    public normalMatrix: Matrix4 = new Matrix4();

    public customDepthMaterial?: MeshDepthMaterial;
    public customDistanceMaterial?: MeshDistanceMaterial;

    public updateMatrix(): this {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.matrixWorldNeedsUpdate = true;
        return this;
    }

    public updateMatrixWorld(force: boolean = false): this {
        if (this.matrixAutoUpdate) {
            return this.updateMatrix();
        }
        if (this.matrixWorldNeedsUpdate || force) {
            if (this.parent === null) {
                this.matrixWorld.copy(this.matrix);
            } else {
                this.matrixWorld.multiplyMatrices(
                    this.parent.matrixWorld,
                    this.matrix,
                );
            }
            this.matrixWorldNeedsUpdate = false;
            force = true;
        }
        // update children
        const children: Object3D[] = this.children;
        for (let i: number = 0, l: number = children.length; i < l; i++) {
            children[i].updateMatrixWorld(force);
        }
        return this;
    }

    public raycast(
        raycaster: Raycaster,
        intersections: IIntersection[],
    ): void {}

    public applyMatrix(matrix: Matrix4): this {
        this.matrix.multiplyMatrices(matrix, this.matrix);
        this.matrix.decompose(this.position, this.quaternion, this.scale);
        return this;
    }

    public applyQuaternion(q: Quaternion): this {
        this.quaternion.premultiply(q);
        return this;
    }

    /**
     * assumes axis is normalized
     * @param axis
     * @param angle
     * @returns {Object3D}
     */
    public setRotationFromAxisAngle(axis: Vector3, angle: number): this {
        this.quaternion.setFromAxisAngle(axis, angle);
        return this;
    }

    public setRotationFromEuler(euler: Euler): this {
        this.quaternion.setFromEuler(euler);
        return this;
    }

    /**
     * assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
     * @param m
     * @returns {Object3D}
     */
    public setRotationFromMatrix(m: Matrix4): this {
        this.quaternion.setFromRotationMatrix(m);
        return this;
    }

    /**
     * assumes q is normalized
     * @param q
     * @returns {Object3D}
     */
    public setRotationFromQuaternion(q: Quaternion): this {
        this.quaternion.copy(q);
        return this;
    }

    public rotateOnAxis(axis: Vector3, angle: number): this {
        const q: Quaternion = new Quaternion();
        q.setFromAxisAngle(axis, angle);
        this.quaternion.multiply(q);
        return this;
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
        return this;
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
        this.position.add(vec.multiplyScalar(distance));
        return this;
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
        return this;
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
        this.updateMatrixWorld(true);
        return new Vector3().setFromMatrixPosition(this.matrixWorld);
    }

    get worldQuaternion(): Quaternion {
        const position: Vector3 = new Vector3();
        const scale: Vector3 = new Vector3();
        const result: Quaternion = new Quaternion();
        this.updateMatrixWorld(true);
        this.matrixWorld.decompose(position, result, scale);
        return result;
    }

    get worldRotation(): Euler {
        return new Euler().setFromQuaternion(
            this.worldQuaternion,
            this.rotation.order,
        );
    }

    get worldScale(): Vector3 {
        const position: Vector3 = new Vector3();
        const quaternion: Quaternion = new Quaternion();
        const result: Vector3 = new Vector3();
        this.updateMatrixWorld(true);
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
        return new (this.constructor as new () => Object3D)().copy(
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
        this.matrixAutoUpdate = source.matrixAutoUpdate;
        this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
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
