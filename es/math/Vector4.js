export class Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
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
    get w() {
        return this._w;
    }
    set w(w) {
        this._w = w;
    }
    set(x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        return this;
    }
    setScalar(scalar) {
        return this.set(scalar, scalar, scalar, scalar);
    }
    copy(v) {
        return this.set(v.x, v.y, v.z, (v instanceof Vector4 ? v.w : undefined) || 1);
    }
    add(v) {
        return this.set(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }
    addScalar(s) {
        return this.set(this.x + s, this.y + s, this.z + s, this.w + s);
    }
    sub(v) {
        return this.set(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }
    subScalar(s) {
        return this.set(this.x - s, this.y - s, this.z - s, this.w - s);
    }
    multiplyScalar(s) {
        return this.set(this.x * s, this.y * s, this.z * s, this.w * s);
    }
    divideScalar(s) {
        return this.set(this.x / s, this.y / s, this.z / s, this.w / s);
    }
    applyMatrix4(m) {
        const x = this.x, y = this.y, z = this.z, w = this.w;
        const e = m.elements;
        return this.set(e[0] * x + e[4] * y + e[8] * z + e[12] * w, e[1] * x + e[5] * y + e[9] * z + e[13] * w, e[2] * x + e[6] * y + e[10] * z + e[14] * w, e[3] * x + e[7] * y + e[11] * z + e[15] * w);
    }
    /**
     * http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
     * q is assumed to be normalized
     * @param q
     * @returns {Vector4}
     */
    setAxisAngleFromQuaternion(q) {
        const s = Math.sqrt(1 - q.w * q.w);
        if (s < 0.0001) {
            return this.set(1, 0, 0, 2 * Math.acos(q.w));
        }
        else {
            return this.set(q.x / s, q.y / s, q.z / s, 2 * Math.acos(q.w));
        }
    }
    /**
     * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
     * @param m
     * @returns {Vector4}
     */
    setAxisAngleFromRotationMatrix(m) {
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        let angle, x, y, z; // variables for result
        const epsilon = 0.01, // margin to allow for rounding errors
        epsilon2 = 0.1, // margin to distinguish between 0 and 180 degrees
        te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
        if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
            // singularity found
            // first check for identity matrix which must have +1 for all terms
            // in leading diagonal and zero in other terms
            if (Math.abs(m12 + m21) < epsilon2 &&
                Math.abs(m13 + m31) < epsilon2 &&
                Math.abs(m23 + m32) < epsilon2 &&
                Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
                // this singularity is identity matrix so angle = 0
                // zero angle, arbitrary axis
                return this.set(1, 0, 0, 0);
            }
            // otherwise this singularity is angle = 180
            angle = Math.PI;
            const xx = (m11 + 1) / 2;
            const yy = (m22 + 1) / 2;
            const zz = (m33 + 1) / 2;
            const xy = (m12 + m21) / 4;
            const xz = (m13 + m31) / 4;
            const yz = (m23 + m32) / 4;
            if (xx > yy && xx > zz) {
                // m11 is the largest diagonal term
                if (xx < epsilon) {
                    x = 0;
                    y = 0.707106781;
                    z = 0.707106781;
                }
                else {
                    x = Math.sqrt(xx);
                    y = xy / x;
                    z = xz / x;
                }
            }
            else if (yy > zz) {
                // m22 is the largest diagonal term
                if (yy < epsilon) {
                    x = 0.707106781;
                    y = 0;
                    z = 0.707106781;
                }
                else {
                    y = Math.sqrt(yy);
                    x = xy / y;
                    z = yz / y;
                }
            }
            else {
                // m33 is the largest diagonal term so base result on this
                if (zz < epsilon) {
                    x = 0.707106781;
                    y = 0.707106781;
                    z = 0;
                }
                else {
                    z = Math.sqrt(zz);
                    x = xz / z;
                    y = yz / z;
                }
            }
            // return 180 deg rotation
            return this.set(x, y, z, angle);
        }
        // as we have reached here there are no singularities so we can handle normally
        let s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12)); // used to normalize
        if (Math.abs(s) < 0.001)
            s = 1;
        // prevent divide by zero, should not happen if matrix is orthogonal and should be
        // caught by singularity test above, but I"ve left it in just in case
        return this.set((m32 - m23) / s, (m13 - m31) / s, (m21 - m12) / s, Math.acos((m11 + m22 + m33 - 1) / 2));
    }
    min(v) {
        return this.set(Math.min(this.x, v.x), Math.min(this.y, v.y), Math.min(this.z, v.z), Math.min(this.w, v.w));
    }
    max(v) {
        return this.set(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z), Math.max(this.w, v.w));
    }
    clamp(min, max) {
        return this.set(Math.max(min.x, Math.min(max.x, this.x)), Math.max(min.y, Math.min(max.y, this.y)), Math.max(min.z, Math.min(max.z, this.z)), Math.max(min.w, Math.min(max.w, this.w)));
    }
    negate() {
        return this.set(-this.x, -this.y, -this.z, -this.w);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        return this.set(this.x + (v.x - this.x) * alpha, this.y + (v.y - this.y) * alpha, this.z + (v.z - this.z) * alpha, this.w + (v.w - this.w) * alpha);
    }
    lerpVectors(v1, v2, alpha) {
        return this.copy(v2)
            .sub(v1)
            .multiplyScalar(alpha)
            .add(v1);
    }
    equals(v) {
        return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
    }
    fromArray(array, offset = 0) {
        return this.set(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
