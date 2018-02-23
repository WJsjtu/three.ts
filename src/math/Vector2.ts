import { TypedArray } from "../core/BufferAttribute";
import { Matrix3 } from "./Matrix3";

export class Vector2 {
    public _x: number;
    public _y: number;

    get x() {
        return this._x;
    }

    set x(x: number) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y: number) {
        this._y = y;
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

    public set(x: number, y: number): this {
        this._x = x;
        this._y = y;
        return this;
    }

    public setScalar(scalar: number): this {
        return this.set(scalar, scalar);
    }

    public copy(v: Vector2): this {
        return this.set(v.x, v.y);
    }

    public add(v: Vector2): this {
        return this.set(this.x + v.x, this.y + v.y);
    }

    public addScalar(s: number): this {
        return this.set(this.x + s, this.y + s);
    }

    public sub(v: Vector2): this {
        return this.set(this.x - v.x, this.y - v.y);
    }

    public subScalar(s: number): this {
        return this.set(this.x - s, this.y - s);
    }

    public multiply(v: Vector2): this {
        return this.set(this.x * v.x, this.y * v.y);
    }

    public multiplyScalar(s: number): this {
        return this.set(this.x * s, this.y * s);
    }

    public divide(v: Vector2): this {
        return this.set(this.x / v.x, this.y / v.y);
    }

    public divideScalar(s: number): this {
        return this.set(this.x / s, this.y / s);
    }

    public applyMatrix3(m: Matrix3): this {
        const x: number = this.x,
            y: number = this.y;
        const e: number[] = m.elements;
        return this.set(e[0] * x + e[3] * y + e[6], e[1] * x + e[4] * y + e[7]);
    }

    public clamp(min, max): this {
        return this.set(
            Math.max(min.x, Math.min(max.x, this.x)),
            Math.max(min.y, Math.min(max.y, this.y)),
        );
    }

    public negate(): this {
        return this.set(-this.x, -this.y);
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

    public normalize(): this {
        return this.divideScalar(this.length() || 1);
    }

    public setLength(length: number): this {
        return this.normalize().multiplyScalar(length);
    }

    public lerp(v: Vector2, alpha: number): this {
        return this.set(
            this.x + (v.x - this.x) * alpha,
            this.y + (v.y - this.y) * alpha,
        );
    }

    public lerpVectors(v1: Vector2, v2: Vector2, alpha: number): this {
        return this.copy(v2)
            .sub(v1)
            .multiplyScalar(alpha)
            .add(v1);
    }

    public equals(v: Vector2): boolean {
        return v.x === this.x && v.y === this.y;
    }

    public fromArray(array: number[] | TypedArray, offset: number = 0): this {
        return this.set(array[offset], array[offset + 1]);
    }

    public toArray(
        array: number[] | TypedArray = [],
        offset: number = 0,
    ): number[] | TypedArray {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    }

    public rotateAround(center: Vector2, angle: number): this {
        const c: number = Math.cos(angle),
            s: number = Math.sin(angle);
        const x: number = this.x - center.x;
        const y: number = this.y - center.y;
        return this.set(x * c - y * s + center.x, x * s + y * c + center.y);
    }

    public clone(): Vector2 {
        return (new (this.constructor as () => void)() as Vector2).copy(this);
    }
}
