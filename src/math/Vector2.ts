import {Matrix3} from "./Matrix3";

export class Vector2 {
    public _x: number;
    public _y: number;

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(_x: number) {
        this._x = _x;
    }

    set y(_y: number) {
        this._y = _y;
    }

    get width(): number {
        return this.x;
    }

    set width(width: number) {
        this._x = width;
    }

    get height(): number {
        return this.y;
    }

    set height(height: number) {
        this._y = height;
    }

    constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    public set(x: number, y: number): Vector2 {
        this._x = x;
        this._y = y;
        return this;
    }

    public setScalar(scalar: number): Vector2 {
        return this.set(scalar, scalar);
    }

    public copy(v: Vector2): Vector2 {
        return this.set(v.x, v.y);
    }

    public add(v: Vector2): Vector2 {
        return this.set(
            this.x + v.x,
            this.y + v.y
        );
    }

    public addScalar(s: number): Vector2 {
        return this.set(
            this.x + s,
            this.y + s
        );
    }

    public sub(v: Vector2): Vector2 {
        return this.set(
            this.x - v.x,
            this.y - v.y
        );
    }

    public subScalar(s: number): Vector2 {
        return this.set(
            this.x - s,
            this.y - s
        );
    }

    public multiply(v: Vector2): Vector2 {
        return this.set(
            this.x * v.x,
            this.y * v.y
        );
    }

    public multiplyScalar(s: number): Vector2 {
        return this.set(
            this.x * s,
            this.y * s
        );
    }

    public divide(v: Vector2): Vector2 {
        return this.set(
            this.x / v.x,
            this.y / v.y
        );
    }

    public divideScalar(s: number): Vector2 {
        return this.set(
            this.x / s,
            this.y / s
        );
    }

    public applyMatrix3(m: Matrix3): Vector2 {
        const x: number = this.x, y: number = this.y;
        const e: Array<number> = m.toArray();
        return this.set(
            e[0] * x + e[3] * y + e[6],
            e[1] * x + e[4] * y + e[7]
        );
    }

    public clamp(min, max) {
        return this.set(
            Math.max(min.x, Math.min(max.x, this.x)),
            Math.max(min.y, Math.min(max.y, this.y))
        );
    }

    public negate(): Vector2 {
        return this.set(
            -this.x,
            -this.y
        );
    }

    public dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }

    public lengthSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    public length(): number {
        return Math.sqrt(this.lengthSquared());
    }

    public manhattanLength(): number {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    public normalize(): Vector2 {
        return this.divideScalar(this.length() || 1);
    }

    public setLength(length: number): Vector2 {
        return this.normalize().multiplyScalar(length);
    }

    public lerp(v: Vector2, alpha: number): Vector2 {
        return this.set(
            this.x + ( v.x - this.x ) * alpha,
            this.y + ( v.y - this.y ) * alpha
        );
    }

    public lerpVectors(v1: Vector2, v2: Vector2, alpha: number): Vector2 {
        return this.copy(v2).sub(v1).multiplyScalar(alpha).add(v1);
    }

    public equals(v: Vector2): boolean {
        return (v.x === this.x) && (v.y === this.y);
    }

    public fromArray(array: Array<number>, offset: number = 0): Vector2 {
        return this.set(
            array[offset],
            array[offset + 1]
        );
    }

    public toArray(array: Array<number> = [], offset: number = 0): Array<number> {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    }

    public rotateAround(center: Vector2, angle: number): Vector2 {
        const c: number = Math.cos(angle), s: number = Math.sin(angle);
        const x: number = this.x - center.x;
        const y: number = this.y - center.y;
        return this.set(
            x * c - y * s + center.x,
            x * s + y * c + center.y
        );
    }

    public clone(): Vector2 {
        return ((new (this.constructor as () => void)()) as Vector2).copy(this);
    }
}