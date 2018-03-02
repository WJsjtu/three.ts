export class Vector2 {
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
    get width() {
        return this.x;
    }
    set width(width) {
        this._x = width;
    }
    get height() {
        return this.y;
    }
    set height(height) {
        this._y = height;
    }
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }
    set(x, y) {
        this._x = x;
        this._y = y;
        return this;
    }
    setScalar(scalar) {
        return this.set(scalar, scalar);
    }
    copy(v) {
        return this.set(v.x, v.y);
    }
    add(v) {
        return this.set(this.x + v.x, this.y + v.y);
    }
    addScalar(s) {
        return this.set(this.x + s, this.y + s);
    }
    sub(v) {
        return this.set(this.x - v.x, this.y - v.y);
    }
    subScalar(s) {
        return this.set(this.x - s, this.y - s);
    }
    multiply(v) {
        return this.set(this.x * v.x, this.y * v.y);
    }
    multiplyScalar(s) {
        return this.set(this.x * s, this.y * s);
    }
    divide(v) {
        return this.set(this.x / v.x, this.y / v.y);
    }
    divideScalar(s) {
        return this.set(this.x / s, this.y / s);
    }
    applyMatrix3(m) {
        const x = this.x, y = this.y;
        const e = m.elements;
        return this.set(e[0] * x + e[3] * y + e[6], e[1] * x + e[4] * y + e[7]);
    }
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        return this;
    }
    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        return this;
    }
    clamp(min, max) {
        return this.set(Math.max(min.x, Math.min(max.x, this.x)), Math.max(min.y, Math.min(max.y, this.y)));
    }
    negate() {
        return this.set(-this.x, -this.y);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
        return this.divideScalar(this.length() || 1);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(v, alpha) {
        return this.set(this.x + (v.x - this.x) * alpha, this.y + (v.y - this.y) * alpha);
    }
    lerpVectors(v1, v2, alpha) {
        return this.copy(v2)
            .sub(v1)
            .multiplyScalar(alpha)
            .add(v1);
    }
    equals(v) {
        return v.x === this.x && v.y === this.y;
    }
    fromArray(array, offset = 0) {
        return this.set(array[offset], array[offset + 1]);
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    }
    rotateAround(center, angle) {
        const c = Math.cos(angle), s = Math.sin(angle);
        const x = this.x - center.x;
        const y = this.y - center.y;
        return this.set(x * c - y * s + center.x, x * s + y * c + center.y);
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
