import {Vector3} from "./Vector3";
import {Matrix4} from "./Matrix4";
import {Quaternion} from "./Quaternion";

export class Vector4 {
    protected _x: number;
    protected _y: number;
    protected _z: number;
    protected _w: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }

    get x(): number {
        return this._x;
    }

    set x(x: number) {
        this._x = x;
    }

    get y(): number {
        return this._y;
    }

    set y(y: number) {
        this._y = y;
    }

    get z(): number {
        return this._z;
    }

    set z(z: number) {
        this._z = z;
    }

    get w(): number {
        return this._w;
    }

    set w(w: number) {
        this._w = w;
    }

    public set(x: number, y: number, z: number, w: number): this {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        return this;
    }

    public setScalar(scalar: number): this {
        return this.set(scalar, scalar, scalar, scalar);
    }

    public copy(v: Vector4 | Vector3): this {
        return this.set(
            v.x,
            v.y,
            v.z,
            (v instanceof Vector4 ? v.w : undefined) || 1,
        );
    }

    public add(v: Vector4): this {
        return this.set(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }

    public addScalar(s: number): this {
        return this.set(this.x + s, this.y + s, this.z + s, this.w + s);
    }

    public sub(v: Vector4): this {
        return this.set(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }

    public subScalar(s: number): this {
        return this.set(this.x - s, this.y - s, this.z - s, this.w - s);
    }

    public multiplyScalar(s: number): this {
        return this.set(this.x * s, this.y * s, this.z * s, this.w * s);
    }

    public divideScalar(s: number): this {
        return this.set(this.x / s, this.y / s, this.z / s, this.w / s);
    }

    public applyMatrix4(m: Matrix4): this {
        const x: number = this.x,
            y: number = this.y,
            z: number = this.z,
            w: number = this.w;
        const e: number[] = m.toArray();
        return this.set(
            e[0] * x + e[4] * y + e[8] * z + e[12] * w,
            e[1] * x + e[5] * y + e[9] * z + e[13] * w,
            e[2] * x + e[6] * y + e[10] * z + e[14] * w,
            e[3] * x + e[7] * y + e[11] * z + e[15] * w,
        );
    }

    /**
     * http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
     * q is assumed to be normalized
     * @param q
     * @returns {Vector4}
     */
    public setAxisAngleFromQuaternion(q: Quaternion): this {
        const s = Math.sqrt(1 - q.w * q.w);
        if (s < 0.0001) {
            return this.set(1, 0, 0, 2 * Math.acos(q.w));
        } else {
            return this.set(q.x / s, q.y / s, q.z / s, 2 * Math.acos(q.w));
        }
    }

    /**
     * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
     * @param m
     * @returns {Vector4}
     */
    public setAxisAngleFromRotationMatrix(m: Matrix4): this {
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        let angle: number, x: number, y: number, z: number; // variables for result
        const epsilon: number = 0.01, // margin to allow for rounding errors
            epsilon2: number = 0.1, // margin to distinguish between 0 and 180 degrees
            te: number[] = m.toArray(),
            m11 = te[0],
            m12 = te[4],
            m13 = te[8],
            m21 = te[1],
            m22 = te[5],
            m23 = te[9],
            m31 = te[2],
            m32 = te[6],
            m33 = te[10];
        if (
            Math.abs(m12 - m21) < epsilon &&
            Math.abs(m13 - m31) < epsilon &&
            Math.abs(m23 - m32) < epsilon
        ) {
            // singularity found
            // first check for identity matrix which must have +1 for all terms
            // in leading diagonal and zero in other terms
            if (
                Math.abs(m12 + m21) < epsilon2 &&
                Math.abs(m13 + m31) < epsilon2 &&
                Math.abs(m23 + m32) < epsilon2 &&
                Math.abs(m11 + m22 + m33 - 3) < epsilon2
            ) {
                // this singularity is identity matrix so angle = 0
                // zero angle, arbitrary axis
                return this.set(1, 0, 0, 0);
            }
            // otherwise this singularity is angle = 180
            angle = Math.PI;
            const xx: number = (m11 + 1) / 2;
            const yy: number = (m22 + 1) / 2;
            const zz: number = (m33 + 1) / 2;
            const xy: number = (m12 + m21) / 4;
            const xz: number = (m13 + m31) / 4;
            const yz: number = (m23 + m32) / 4;
            if (xx > yy && xx > zz) {
                // m11 is the largest diagonal term
                if (xx < epsilon) {
                    x = 0;
                    y = 0.707106781;
                    z = 0.707106781;
                } else {
                    x = Math.sqrt(xx);
                    y = xy / x;
                    z = xz / x;
                }
            } else if (yy > zz) {
                // m22 is the largest diagonal term
                if (yy < epsilon) {
                    x = 0.707106781;
                    y = 0;
                    z = 0.707106781;
                } else {
                    y = Math.sqrt(yy);
                    x = xy / y;
                    z = yz / y;
                }
            } else {
                // m33 is the largest diagonal term so base result on this
                if (zz < epsilon) {
                    x = 0.707106781;
                    y = 0.707106781;
                    z = 0;
                } else {
                    z = Math.sqrt(zz);
                    x = xz / z;
                    y = yz / z;
                }
            }
            // return 180 deg rotation
            return this.set(x, y, z, angle);
        }
        // as we have reached here there are no singularities so we can handle normally
        let s: number = Math.sqrt(
            (m32 - m23) * (m32 - m23) +
                (m13 - m31) * (m13 - m31) +
                (m21 - m12) * (m21 - m12),
        ); // used to normalize
        if (Math.abs(s) < 0.001) s = 1;
        // prevent divide by zero, should not happen if matrix is orthogonal and should be
        // caught by singularity test above, but I"ve left it in just in case
        return this.set(
            (m32 - m23) / s,
            (m13 - m31) / s,
            (m21 - m12) / s,
            Math.acos((m11 + m22 + m33 - 1) / 2),
        );
    }

    public min(v: Vector4): this {
        return this.set(
            Math.min(this.x, v.x),
            Math.min(this.y, v.y),
            Math.min(this.z, v.z),
            Math.min(this.w, v.w),
        );
    }

    public max(v: Vector4): this {
        return this.set(
            Math.max(this.x, v.x),
            Math.max(this.y, v.y),
            Math.max(this.z, v.z),
            Math.max(this.w, v.w),
        );
    }

    public clamp(min: Vector4, max: Vector4): this {
        return this.set(
            Math.max(min.x, Math.min(max.x, this.x)),
            Math.max(min.y, Math.min(max.y, this.y)),
            Math.max(min.z, Math.min(max.z, this.z)),
            Math.max(min.w, Math.min(max.w, this.w)),
        );
    }

    public negate(): this {
        return this.set(-this.x, -this.y, -this.z, -this.w);
    }

    public dot(v: Vector4): number {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }

    public lengthSquared(): number {
        return (
            this.x * this.x +
            this.y * this.y +
            this.z * this.z +
            this.w * this.w
        );
    }

    public length(): number {
        return Math.sqrt(this.lengthSquared());
    }

    public manhattanLength(): number {
        return (
            Math.abs(this.x) +
            Math.abs(this.y) +
            Math.abs(this.z) +
            Math.abs(this.w)
        );
    }

    public normalize(): this {
        return this.divideScalar(this.length() || 1);
    }

    public setLength(length: number): this {
        return this.normalize().multiplyScalar(length);
    }

    public lerp(v: Vector4, alpha: number): this {
        return this.set(
            this.x + (v.x - this.x) * alpha,
            this.y + (v.y - this.y) * alpha,
            this.z + (v.z - this.z) * alpha,
            this.w + (v.w - this.w) * alpha,
        );
    }

    public lerpVectors(v1: Vector4, v2: Vector4, alpha: number): this {
        return this.copy(v2)
            .sub(v1)
            .multiplyScalar(alpha)
            .add(v1);
    }

    public equals(v: Vector4): boolean {
        return (
            v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w
        );
    }

    public fromArray(array: number[], offset: number = 0): this {
        return this.set(
            array[offset],
            array[offset + 1],
            array[offset + 2],
            array[offset + 3],
        );
    }

    public toArray(array: number[] = [], offset: number = 0): number[] {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    }

    public clone(): Vector4 {
        return (new (this.constructor as () => void)() as Vector4).copy(this);
    }
}
