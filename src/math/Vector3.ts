import {Matrix3} from "./Matrix3";
import {Matrix4} from "./Matrix4";
import {Euler} from "./Euler";
import {Quaternion} from "./Quaternion";
import {Vector4} from "./Vector4";
import {MathUtil} from "./Math";

/**
 * TODO: project, unproject, clampScalar, clampLength, floor, ceil, round, roundToZero, crossVectors,
 * manhattanDistanceTo, setFromSpherical, setFromCylindrical, setFromMatrixPosition,
 * setFromMatrixScale, setFromMatrixColumn
 */
export class Vector3 {

    private _x: number;
    private _y: number;
    private _z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get z(): number {
        return this._z;
    }

    set x(_x: number) {
        this._x = _x;
    }

    set y(_y: number) {
        this._y = _y;
    }

    set z(_z: number) {
        this._z = _z;
    }

    public set(x: number, y: number, z: number): Vector3 {
        this._x = x;
        this._y = y;
        this._z = z;
        return this;
    }

    public setScalar(scalar: number): Vector3 {
        return this.set(scalar, scalar, scalar);
    }

    public copy(vec: Vector3): Vector3 {
        return this.set(vec.x, vec.y, vec.z);
    }

    public add(vec: Vector3): Vector3 {
        return this.set(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    }

    public addScalar(scalar: number): Vector3 {
        return this.set(
            this.x + scalar,
            this.y + scalar,
            this.z + scalar
        );
    }

    public sub(vec: Vector3): Vector3 {
        return this.set(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    }

    public subScalar(scalar: number): Vector3 {
        return this.set(
            this.x - scalar,
            this.y - scalar,
            this.z - scalar
        );
    }

    public multiply(vec: Vector3): Vector3 {
        return this.set(this.x * vec.x, this.y * vec.y, this.z * vec.z);
    }

    public multiplyScalar(scalar: number): Vector3 {
        return this.set(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        );
    }

    public divide(vec: Vector3): Vector3 {
        return this.set(
            this.x / vec.x,
            this.y / vec.y,
            this.z / vec.z
        );

    }

    public divideScalar(scalar: number): Vector3 {
        return this.set(
            this.x / scalar,
            this.y / scalar,
            this.z / scalar
        );
    }

    public applyEuler(euler: Euler): Vector3 {
        const quaternion: Quaternion = new Quaternion();
        return this.applyQuaternion(quaternion.setFromEuler(euler));
    }

    public applyAxisAngle(axis: Vector3, angle: number): Vector3 {
        const quaternion: Quaternion = new Quaternion();
        return this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));
    }

    public applyMatrix3(m: Matrix3): Vector3 {
        const x: number = this.x, y: number = this.y, z: number = this.z;
        const e: Array<number> = m.toArray();
        return this.set(
            e[0] * x + e[3] * y + e[6] * z,
            e[1] * x + e[4] * y + e[7] * z,
            e[2] * x + e[5] * y + e[8] * z
        );
    }

    public applyMatrix4(matrix: Matrix4): Vector3 {
        const x: number = this.x, y: number = this.y, z: number = this.z;
        const e: Array<number> = matrix.toArray();
        const w: number = 1 / ( e[3] * x + e[7] * y + e[11] * z + e[15] );
        return this.set(
            (e[0] * x + e[4] * y + e[8] * z + e[12]) * w,
            (e[1] * x + e[5] * y + e[9] * z + e[13]) * w,
            (e[2] * x + e[6] * y + e[10] * z + e[14]) * w
        );
    }

    public applyQuaternion(quaternion: Quaternion): Vector3 {
        const x: number = this.x, y: number = this.y, z: number = this.z;
        const qx: number = quaternion.x, qy: number = quaternion.y, qz: number = quaternion.z,
            qw: number = quaternion.w;

        // calculate quat * vector
        const ix: number = qw * x + qy * z - qz * y;
        const iy: number = qw * y + qz * x - qx * z;
        const iz: number = qw * z + qx * y - qy * x;
        const iw: number = -qx * x - qy * y - qz * z;

        // calculate result * inverse quat
        return this.set(
            ix * qw + iw * -qx + iy * -qz - iz * -qy,
            iy * qw + iw * -qy + iz * -qx - ix * -qz,
            iz * qw + iw * -qz + ix * -qy - iy * -qx
        );
    }

    public transformDirection(mat4: Matrix4): Vector3 {
        const x: number = this.x, y: number = this.y, z: number = this.z;
        const e: Array<number> = mat4.toArray();
        return this.set(
            e[0] * x + e[4] * y + e[8] * z,
            e[1] * x + e[5] * y + e[9] * z,
            e[2] * x + e[6] * y + e[10] * z
        ).normalize();
    }

    public min(vec: Vector3): Vector3 {
        return this.set(
            Math.min(this.x, vec.x),
            Math.min(this.y, vec.y),
            Math.min(this.z, vec.z)
        );
    }

    public max(vec: Vector3): Vector3 {
        return this.set(
            Math.max(this.x, vec.x),
            Math.max(this.y, vec.y),
            Math.max(this.z, vec.z)
        );
    }

    public clamp(min: Vector3, max: Vector3): Vector3 {
        return this.set(
            Math.max(min.x, Math.min(max.x, this.x)),
            Math.max(min.y, Math.min(max.y, this.y)),
            Math.max(min.z, Math.min(max.z, this.z))
        );
    }

    public negate(): Vector3 {
        return this.set(-this.x, -this.y, -this.z);
    }

    public dot(v: Vector3 | Vector4): number {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public lengthSquared(): number {
        const x: number = this.x, y: number = this.y, z: number = this.z;
        return x * x + y * y + z * z;
    }

    public length(): number {
        const x: number = this.x, y: number = this.y, z: number = this.z;
        return Math.sqrt(x * x + y * y + z * z);
    }

    public setLength(length: number): Vector3 {
        return this.normalize().multiplyScalar(length);
    }

    public manhattanLength(): number {
        const x: number = this.x, y: number = this.y, z: number = this.z;
        return Math.abs(x) + Math.abs(y) + Math.abs(z);
    }

    public normalize(): Vector3 {
        return this.divideScalar(this.length() || 1);
    }

    public lerp(vec: Vector3, alpha: number): Vector3 {
        return this.set(
            (vec.x - this.x) * alpha,
            (vec.y - this.y) * alpha,
            (vec.z - this.z) * alpha
        );
    }

    public lerpVectors(v1: Vector3, v2: Vector3, alpha: number): Vector3 {
        return this.set(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z).multiplyScalar(alpha).add(v1);
    }

    public cross(vec: Vector3): Vector3 {
        const ax: number = this.x, ay: number = this.y, az: number = this.z;
        const bx: number = vec.x, by: number = vec.y, bz: number = vec.z;
        return this.set(
            ay * bz - az * by,
            az * bx - ax * bz,
            ax * by - ay * bx
        );
    }

    public projectOnVector(vector: Vector3): Vector3 {
        const scalar: number = vector.dot(this) / vector.lengthSquared();
        return this.copy(vector).multiplyScalar(scalar);
    }

    public projectOnPlane(planeNormal: Vector3): Vector3 {
        const vec: Vector3 = new Vector3();
        vec.copy(this).projectOnVector(planeNormal);
        return this.sub(vec);
    }

    /**
     * reflect incident vector off plane orthogonal to normal
     * normal is assumed to have unit length
     * @param normal
     * @returns {Vector3}
     */
    public reflect(normal: Vector3): Vector3 {
        const vec: Vector3 = new Vector3();
        return this.sub(vec.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }

    public angleTo(v: Vector3): number {
        const theta: number = this.dot(v) / (Math.sqrt(this.lengthSquared() * v.lengthSquared()));
        return Math.acos(MathUtil.clamp(theta, -1, 1));
    }

    public distanceTo(vec: Vector3): number {
        return Math.sqrt(this.distanceToSquared(vec));
    }

    public distanceToSquared(vec: Vector3): number {
        const dx: number = this.x - vec.x, dy: number = this.y - vec.y, dz: number = this.z - vec.z;
        return dx * dx + dy * dy + dz * dz;
    }

    public equals(vec: Vector3): boolean {
        return ((vec.x === this.x) && (vec.y === this.y) && (vec.z === this.z));
    }

    public setFromMatrixPosition(m: Matrix4): Vector3 {
    	var e: Array<number> = m.toArray();
    	return this.set(e[ 12 ], e[ 13 ], e[ 14 ]);
    }

    public fromArray(array: ArrayLike<number>, offset: number = 0): Vector3 {
        return this.set(
            array[offset],
            array[offset + 1],
            array[offset + 2]
        );
    }

    public toArray(array: Array<number> = [], offset: number = 0): Array<number> {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    }

    public clone(): Vector3 {
        return ((new (this.constructor as () => void)()) as Vector3).copy(this);
    }
}