import { Camera } from "../cameras/Camera";
import { Euler } from "../math/Euler";
import { MathUtil } from "../math/Math";
import { Matrix3 } from "../math/Matrix3";
import { Matrix4 } from "../math/Matrix4";
import { Quaternion } from "../math/Quaternion";
import { Vector3 } from "../math/Vector3";
import { EventDispatcher } from "./EventDispatcher";
import { Layers } from "./Layers";
let object3DId = 0;
export class Object3D extends EventDispatcher {
    constructor() {
        super(...arguments);
        this.id = object3DId++;
        this.uuid = MathUtil.generateUUID();
        this.name = "";
        this.type = "Object3D";
        this.parent = null;
        this.children = [];
        this.up = new Vector3().copy(Object3D.DefaultUp);
        this.matrix = new Matrix4();
        this.matrixWorld = new Matrix4();
        this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
        this.matrixWorldNeedsUpdate = false;
        this.layers = new Layers();
        this.visible = true;
        this.castShadow = false;
        this.receiveShadow = false;
        this.frustumCulled = true;
        this.renderOrder = 0;
        this.userData = {};
        this.position = new Vector3();
        this.rotation = new Euler();
        this.quaternion = new Quaternion();
        this.scale = new Vector3(1, 1, 1);
        this.modelViewMatrix = new Matrix4();
        this.normalMatrix = new Matrix3();
        this.onBeforeRender = function () { };
        this.onAfterRender = function () { };
    }
    updateMatrix() {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.matrixWorldNeedsUpdate = true;
        return this;
    }
    updateMatrixWorld(force = false) {
        if (this.matrixAutoUpdate) {
            this.updateMatrix();
        }
        if (this.matrixWorldNeedsUpdate || force) {
            if (this.parent === null) {
                this.matrixWorld.copy(this.matrix);
            }
            else {
                this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
            }
            this.matrixWorldNeedsUpdate = false;
            force = true;
        }
        // update children
        const children = this.children;
        for (let i = 0, l = children.length; i < l; i++) {
            children[i].updateMatrixWorld(force);
        }
        return this;
    }
    raycast(raycaster, intersections) { }
    applyMatrix(matrix) {
        this.matrix.multiplyMatrices(matrix, this.matrix);
        this.matrix.decompose(this.position, this.quaternion, this.scale);
        return this;
    }
    applyQuaternion(q) {
        this.quaternion.premultiply(q);
        return this;
    }
    /**
     * assumes axis is normalized
     * @param axis
     * @param angle
     * @returns {Object3D}
     */
    setRotationFromAxisAngle(axis, angle) {
        this.quaternion.setFromAxisAngle(axis, angle);
        return this;
    }
    setRotationFromEuler(euler) {
        this.quaternion.setFromEuler(euler);
        return this;
    }
    /**
     * assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
     * @param m
     * @returns {Object3D}
     */
    setRotationFromMatrix(m) {
        this.quaternion.setFromRotationMatrix(m);
        return this;
    }
    /**
     * assumes q is normalized
     * @param q
     * @returns {Object3D}
     */
    setRotationFromQuaternion(q) {
        this.quaternion.copy(q);
        return this;
    }
    rotateOnAxis(axis, angle) {
        const q = new Quaternion();
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
    rotateOnWorldAxis(axis, angle) {
        const q = new Quaternion();
        q.setFromAxisAngle(axis, angle);
        this.quaternion.premultiply(q);
        return this;
    }
    rotateX(angle) {
        return this.rotateOnAxis(new Vector3(1, 0, 0), angle);
    }
    rotateY(angle) {
        return this.rotateOnAxis(new Vector3(0, 1, 0), angle);
    }
    rotateZ(angle) {
        return this.rotateOnAxis(new Vector3(0, 0, 1), angle);
    }
    /**
     * translate object by distance along axis in object space
     * axis is assumed to be normalized
     * @param axis
     * @param distance
     * @returns {Object3D}
     */
    translateOnAxis(axis, distance) {
        const vec = new Vector3();
        vec.copy(axis).applyQuaternion(this.quaternion);
        this.position.add(vec.multiplyScalar(distance));
        return this;
    }
    translateX(distance) {
        return this.translateOnAxis(new Vector3(1, 0, 0), distance);
    }
    translateY(distance) {
        return this.translateOnAxis(new Vector3(0, 1, 0), distance);
    }
    translateZ(distance) {
        return this.translateOnAxis(new Vector3(0, 0, 1), distance);
    }
    localToWorld(vector) {
        return vector.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(vector) {
        return vector.applyMatrix4(new Matrix4().getInverse(this.matrixWorld));
    }
    lookAt(vec) {
        const mat = new Matrix4();
        const vector = new Vector3();
        if (this instanceof Camera) {
            mat.lookAt(this.position, vector, this.up);
        }
        else {
            mat.lookAt(vector, this.position, this.up);
        }
        this.quaternion.setFromRotationMatrix(mat);
        return this;
    }
    add(object, ...objects) {
        if (objects.length > 1) {
            for (let i = 0; i < objects.length; i++) {
                this.add(objects[i]);
            }
            return this;
        }
        if (object === this) {
            console.error(`THREE.Object3D.add: object can't be added as a child of itself. ${object}`);
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
    remove(object, ...objects) {
        if (objects.length > 1) {
            for (let i = 0; i < objects.length; i++) {
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
    get worldPosition() {
        this.updateMatrixWorld(true);
        return new Vector3().setFromMatrixPosition(this.matrixWorld);
    }
    get worldQuaternion() {
        const position = new Vector3();
        const scale = new Vector3();
        const result = new Quaternion();
        this.updateMatrixWorld(true);
        this.matrixWorld.decompose(position, result, scale);
        return result;
    }
    get worldRotation() {
        return new Euler().setFromQuaternion(this.worldQuaternion, this.rotation.order);
    }
    get worldScale() {
        const position = new Vector3();
        const quaternion = new Quaternion();
        const result = new Vector3();
        this.updateMatrixWorld(true);
        this.matrixWorld.decompose(position, quaternion, result);
        return result;
    }
    get worldDirection() {
        return new Vector3().set(0, 0, 1).applyQuaternion(this.worldQuaternion);
    }
    traverse(callback) {
        callback(this);
        for (let i = 0, l = this.children.length; i < l; i++) {
            this.children[i].traverse(callback);
        }
    }
    traverseVisible(callback) {
        if (this.visible === false)
            return;
        callback(this);
        for (let i = 0, l = this.children.length; i < l; i++) {
            this.children[i].traverseVisible(callback);
        }
    }
    traverseAncestors(callback) {
        if (this.parent !== null) {
            callback(this.parent);
            this.parent.traverseAncestors(callback);
        }
    }
    clone(recursive = false) {
        return new this.constructor().copy(this, recursive);
    }
    copy(source, recursive = true) {
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
            for (let i = 0; i < source.children.length; i++) {
                this.add(source.children[i].clone());
            }
        }
        return this;
    }
}
Object3D.DefaultUp = new Vector3(0, 1, 0);
Object3D.DefaultMatrixAutoUpdate = true;
