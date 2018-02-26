import { MathUtil } from "./Math";
import { Quaternion } from "./Quaternion";
export class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
    get z() {
        return this._z;
    }
    set z(z) {
        this._z = z;
    }
    set(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
        return this;
    }
    setScalar(scalar) {
        return this.set(scalar, scalar, scalar);
    }
    copy(vec) {
        return this.set(vec.x, vec.y, vec.z);
    }
    add(vec) {
        return this.set(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }
    addScalar(scalar) {
        return this.set(this.x + scalar, this.y + scalar, this.z + scalar);
    }
    sub(vec) {
        return this.set(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }
    subScalar(scalar) {
        return this.set(this.x - scalar, this.y - scalar, this.z - scalar);
    }
    multiply(vec) {
        return this.set(this.x * vec.x, this.y * vec.y, this.z * vec.z);
    }
    multiplyScalar(scalar) {
        return this.set(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    divide(vec) {
        return this.set(this.x / vec.x, this.y / vec.y, this.z / vec.z);
    }
    divideScalar(scalar) {
        return this.set(this.x / scalar, this.y / scalar, this.z / scalar);
    }
    applyEuler(euler) {
        const quaternion = new Quaternion();
        return this.applyQuaternion(quaternion.setFromEuler(euler));
    }
    applyAxisAngle(axis, angle) {
        const quaternion = new Quaternion();
        return this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));
    }
    applyMatrix3(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements;
        return this.set(e[0] * x + e[3] * y + e[6] * z, e[1] * x + e[4] * y + e[7] * z, e[2] * x + e[5] * y + e[8] * z);
    }
    applyMatrix4(matrix) {
        const x = this.x, y = this.y, z = this.z;
        const e = matrix.elements;
        const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
        return this.set((e[0] * x + e[4] * y + e[8] * z + e[12]) * w, (e[1] * x + e[5] * y + e[9] * z + e[13]) * w, (e[2] * x + e[6] * y + e[10] * z + e[14]) * w);
    }
    applyQuaternion(quaternion) {
        const x = this.x, y = this.y, z = this.z;
        const qx = quaternion.x, qy = quaternion.y, qz = quaternion.z, qw = quaternion.w;
        // calculate quat * vector
        const ix = qw * x + qy * z - qz * y;
        const iy = qw * y + qz * x - qx * z;
        const iz = qw * z + qx * y - qy * x;
        const iw = -qx * x - qy * y - qz * z;
        // calculate result * inverse quat
        return this.set(ix * qw + iw * -qx + iy * -qz - iz * -qy, iy * qw + iw * -qy + iz * -qx - ix * -qz, iz * qw + iw * -qz + ix * -qy - iy * -qx);
    }
    transformDirection(mat4) {
        const x = this.x, y = this.y, z = this.z;
        const e = mat4.elements;
        return this.set(e[0] * x + e[4] * y + e[8] * z, e[1] * x + e[5] * y + e[9] * z, e[2] * x + e[6] * y + e[10] * z).normalize();
    }
    min(vec) {
        return this.set(Math.min(this.x, vec.x), Math.min(this.y, vec.y), Math.min(this.z, vec.z));
    }
    max(vec) {
        return this.set(Math.max(this.x, vec.x), Math.max(this.y, vec.y), Math.max(this.z, vec.z));
    }
    clamp(min, max) {
        return this.set(Math.max(min.x, Math.min(max.x, this.x)), Math.max(min.y, Math.min(max.y, this.y)), Math.max(min.z, Math.min(max.z, this.z)));
    }
    negate() {
        return this.set(-this.x, -this.y, -this.z);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    lengthSquared() {
        const x = this.x, y = this.y, z = this.z;
        return x * x + y * y + z * z;
    }
    length() {
        const x = this.x, y = this.y, z = this.z;
        return Math.sqrt(x * x + y * y + z * z);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    manhattanLength() {
        const x = this.x, y = this.y, z = this.z;
        return Math.abs(x) + Math.abs(y) + Math.abs(z);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    lerp(vec, alpha) {
        return this.set((vec.x - this.x) * alpha, (vec.y - this.y) * alpha, (vec.z - this.z) * alpha);
    }
    lerpVectors(v1, v2, alpha) {
        return this.set(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z)
            .multiplyScalar(alpha)
            .add(v1);
    }
    cross(vec) {
        const ax = this.x, ay = this.y, az = this.z;
        const bx = vec.x, by = vec.y, bz = vec.z;
        return this.set(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
    }
    projectOnVector(vector) {
        const scalar = vector.dot(this) / vector.lengthSquared();
        return this.copy(vector).multiplyScalar(scalar);
    }
    projectOnPlane(planeNormal) {
        const vec = new Vector3();
        vec.copy(this).projectOnVector(planeNormal);
        return this.sub(vec);
    }
    /**
     * reflect incident vector off plane orthogonal to normal
     * normal is assumed to have unit length
     * @param normal
     * @returns {Vector3}
     */
    reflect(normal) {
        const vec = new Vector3();
        return this.sub(vec.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }
    angleTo(v) {
        const theta = this.dot(v) / Math.sqrt(this.lengthSquared() * v.lengthSquared());
        return Math.acos(MathUtil.clamp(theta, -1, 1));
    }
    distanceTo(vec) {
        return Math.sqrt(this.distanceToSquared(vec));
    }
    distanceToSquared(vec) {
        const dx = this.x - vec.x, dy = this.y - vec.y, dz = this.z - vec.z;
        return dx * dx + dy * dy + dz * dz;
    }
    equals(vec) {
        return vec.x === this.x && vec.y === this.y && vec.z === this.z;
    }
    setFromMatrixPosition(m) {
        const e = m.elements;
        return this.set(e[12], e[13], e[14]);
    }
    setFromMatrixScale(m) {
        const sx = this.setFromMatrixColumn(m, 0).length();
        const sy = this.setFromMatrixColumn(m, 1).length();
        const sz = this.setFromMatrixColumn(m, 2).length();
        this.x = sx;
        this.y = sy;
        this.z = sz;
        return this;
    }
    setFromMatrixColumn(m, index) {
        return this.fromArray(m.elements, index * 4);
    }
    fromArray(array, offset = 0) {
        return this.set(array[offset], array[offset + 1], array[offset + 2]);
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
