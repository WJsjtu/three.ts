import { Euler, EulerOrder } from "./Euler";
import { Matrix4 } from "./Matrix4";
import { Vector3 } from "./Vector3";
import { Vector4 } from "./Vector4";
import { TypedArray } from "../core/BufferAttribute";

export class Quaternion {
    protected _x: number;
    protected _y: number;
    protected _z: number;
    protected _w: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }

    get x(): number {
        return this._x;
    }

    set x(_x: number) {
        this._x = _x;
    }

    get y(): number {
        return this._y;
    }

    set y(_y: number) {
        this._y = _y;
    }

    get z(): number {
        return this._z;
    }

    set z(_z: number) {
        this._z = _z;
    }

    get w(): number {
        return this._w;
    }

    set w(_w: number) {
        this._w = _w;
    }

    public set(x: number, y: number, z: number, w: number): this {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        return this;
    }

    public copy(quaternion: Quaternion): this {
        return this.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }

    public setFromEuler(euler: Euler): this {
        const { x, y, z, order } = euler;

        const cos: (arg: number) => number = Math.cos;
        const sin: (arg: number) => number = Math.sin;

        const c1: number = cos(x / 2);
        const c2: number = cos(y / 2);
        const c3: number = cos(z / 2);

        const s1: number = sin(x / 2);
        const s2: number = sin(y / 2);
        const s3: number = sin(z / 2);

        if (order === EulerOrder.XYZ) {
            return this.set(
                s1 * c2 * c3 + c1 * s2 * s3,
                c1 * s2 * c3 - s1 * c2 * s3,
                c1 * c2 * s3 + s1 * s2 * c3,
                c1 * c2 * c3 - s1 * s2 * s3,
            );
        } else if (order === EulerOrder.YXZ) {
            return this.set(
                s1 * c2 * c3 + c1 * s2 * s3,
                c1 * s2 * c3 - s1 * c2 * s3,
                c1 * c2 * s3 - s1 * s2 * c3,
                c1 * c2 * c3 + s1 * s2 * s3,
            );
        } else if (order === EulerOrder.ZXY) {
            return this.set(
                s1 * c2 * c3 - c1 * s2 * s3,
                c1 * s2 * c3 + s1 * c2 * s3,
                c1 * c2 * s3 + s1 * s2 * c3,
                c1 * c2 * c3 - s1 * s2 * s3,
            );
        } else if (order === EulerOrder.ZYX) {
            return this.set(
                s1 * c2 * c3 - c1 * s2 * s3,
                c1 * s2 * c3 + s1 * c2 * s3,
                c1 * c2 * s3 - s1 * s2 * c3,
                c1 * c2 * c3 + s1 * s2 * s3,
            );
        } else if (order === EulerOrder.YZX) {
            return this.set(
                s1 * c2 * c3 + c1 * s2 * s3,
                c1 * s2 * c3 + s1 * c2 * s3,
                c1 * c2 * s3 - s1 * s2 * c3,
                c1 * c2 * c3 - s1 * s2 * s3,
            );
        } else if (order === EulerOrder.XZY) {
            return this.set(
                s1 * c2 * c3 - c1 * s2 * s3,
                c1 * s2 * c3 - s1 * c2 * s3,
                c1 * c2 * s3 + s1 * s2 * c3,
                c1 * c2 * c3 + s1 * s2 * s3,
            );
        }
        return this;
    }

    /**
     * !!! assumes axis is normalized
     * http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
     * @param axis
     * @param angle
     * @returns {Quaternion}
     */
    public setFromAxisAngle(axis: Vector3, angle: number): this {
        const halfAngle: number = angle / 2,
            s: number = Math.sin(halfAngle);
        return this.set(
            axis.x * s,
            axis.y * s,
            axis.z * s,
            Math.cos(halfAngle),
        );
    }

    /**
     * !!! assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
     * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
     * @param m
     * @returns {Quaternion}
     */
    public setFromRotationMatrix(m: Matrix4): this {
        const te: number[] = m.elements,
            m11: number = te[0],
            m12: number = te[4],
            m13: number = te[8],
            m21: number = te[1],
            m22: number = te[5],
            m23: number = te[9],
            m31: number = te[2],
            m32: number = te[6],
            m33: number = te[10],
            trace: number = m11 + m22 + m33;
        let s: number;

        if (trace > 0) {
            s = 0.5 / Math.sqrt(trace + 1.0);
            return this.set(
                (m32 - m23) * s,
                (m13 - m31) * s,
                (m21 - m12) * s,
                0.25 / s,
            );
        } else if (m11 > m22 && m11 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            return this.set(
                0.25 * s,
                (m12 + m21) / s,
                (m13 + m31) / s,
                (m32 - m23) / s,
            );
        } else if (m22 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            return this.set(
                (m12 + m21) / s,
                0.25 * s,
                (m23 + m32) / s,
                (m13 - m31) / s,
            );
        } else {
            s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            return this.set(
                (m13 + m31) / s,
                (m23 + m32) / s,
                0.25 * s,
                (m21 - m12) / s,
            );
        }
    }

    /**
     * !! assumes direction vectors vFrom and vTo are normalized
     * @param vFrom
     * @param vTo
     * @returns {Quaternion}
     */
    public setFromUnitVectors(vFrom: Vector3, vTo: Vector3): this {
        const vec: Vector3 = new Vector3();
        const EPS: number = 0.000001;
        let r: number = vFrom.dot(vTo) + 1;
        if (r < EPS) {
            r = 0;
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                vec.set(-vFrom.y, vFrom.x, 0);
            } else {
                vec.set(0, -vFrom.z, vFrom.y);
            }
        } else {
            vec.copy(vFrom).cross(vTo);
        }
        this._x = vec.x;
        this._y = vec.y;
        this._z = vec.z;
        this._w = r;
        return this.normalize();
    }

    public inverse(): this {
        return this.conjugate().normalize();
    }

    public conjugate(): this {
        return this.set(this.x * -1, this.y * -1, this.z * -1, this.w);
    }

    public dot(vec: Vector4): number {
        return (
            this.x * vec.x + this.y * vec.y + this.z * vec.z + this.w * vec.w
        );
    }

    public lengthSquared(): number {
        const { x, y, z, w } = this;
        return x * x + y * y + z * z + w * w;
    }

    public length(): number {
        return Math.sqrt(this.lengthSquared());
    }

    public normalize(): this {
        let l: number = this.length();
        if (l === 0) {
            return this.set(0, 0, 0, 1);
        } else {
            l = 1 / l;
            return this.set(this.x * l, this.y * l, this.z * l, this.w * l);
        }
    }

    public multiply(quaternion: Quaternion): this {
        return this.multiplyQuaternions(this, quaternion);
    }

    public premultiply(quaternion: Quaternion): this {
        return this.multiplyQuaternions(quaternion, this);
    }

    /**
     * http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
     * @param a
     * @param b
     * @returns {Quaternion}
     */
    public multiplyQuaternions(a: Quaternion, b: Quaternion): this {
        const qax: number = a.x,
            qay: number = a.y,
            qaz: number = a.z,
            qaw: number = a.w;
        const qbx: number = b.x,
            qby: number = b.y,
            qbz: number = b.z,
            qbw: number = b.w;
        return this.set(
            qax * qbw + qaw * qbx + qay * qbz - qaz * qby,
            qay * qbw + qaw * qby + qaz * qbx - qax * qbz,
            qaz * qbw + qaw * qbz + qax * qby - qay * qbx,
            qaw * qbw - qax * qbx - qay * qby - qaz * qbz,
        );
    }

    /**
     * http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
     * @param qb
     * @param t
     * @returns {Quaternion}
     */
    public slerp(qb: Quaternion, t: number): this {
        if (t === 0) return this;
        if (t === 1) return this.copy(qb);

        const { x, y, z, w } = this;

        let cosHalfTheta: number = w * qb.w + x * qb.x + y * qb.y + z * qb.z;

        if (cosHalfTheta < 0) {
            this.set(-qb.x, -qb.y, -qb.z, -qb.w);
            cosHalfTheta = -cosHalfTheta;
        } else {
            this.copy(qb);
        }

        if (cosHalfTheta >= 1.0) {
            return this.set(x, y, z, w);
        }

        const sinHalfTheta: number = Math.sqrt(
            1.0 - cosHalfTheta * cosHalfTheta,
        );

        if (Math.abs(sinHalfTheta) < 0.001) {
            return this.set(
                0.5 * (x + this.x),
                0.5 * (y + this.y),
                0.5 * (z + this.z),
                0.5 * (w + this.w),
            );
        }

        const halfTheta: number = Math.atan2(sinHalfTheta, cosHalfTheta);
        const ratioA: number = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
            ratioB: number = Math.sin(t * halfTheta) / sinHalfTheta;

        return this.set(
            x * ratioA + this.x * ratioB,
            y * ratioA + this.y * ratioB,
            z * ratioA + this.z * ratioB,
            w * ratioA + this.w * ratioB,
        );
    }

    public equals(quaternion: Quaternion): boolean {
        const { x, y, z, w } = this;
        return (
            quaternion.x === x &&
            quaternion.y === y &&
            quaternion.z === z &&
            quaternion.w === w
        );
    }

    public fromArray(array: number[] | TypedArray, offset: number = 0): this {
        return this.set(
            array[offset],
            array[offset + 1],
            array[offset + 2],
            array[offset + 3],
        );
    }

    public toArray(
        array: number[] | TypedArray = [],
        offset: number = 0,
    ): number[] | TypedArray {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    }

    public clone(): Quaternion {
        return new (this.constructor as new () => Quaternion)().copy(this);
    }
}
