export class Matrix2 {
    constructor() {
        this.elements = [1, 0, 0, 1];
    }
    set(n11, n12, n21, n22) {
        const te = this.elements;
        te[0] = n11;
        te[1] = n21;
        te[3] = n12;
        te[4] = n22;
        return this;
    }
    identity() {
        return this.set(1, 0, 0, 1);
    }
    copy(mat2) {
        const te = this.elements;
        const me = mat2.elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        return this;
    }
    setFromMatrix4(mat2) {
        const me = mat2.elements;
        return this.set(me[0], me[2], me[1], me[3]);
    }
    multiply(mat2) {
        return this.multiplyMatrices(this, mat2);
    }
    premultiply(m) {
        return this.multiplyMatrices(m, this);
    }
    multiplyMatrices(a, b) {
        const ae = a.elements;
        const be = b.elements;
        const te = this.elements;
        const a11 = ae[0], a12 = ae[2];
        const a21 = ae[1], a22 = ae[3];
        const b11 = be[0], b12 = be[2];
        const b21 = be[1], b22 = be[3];
        te[0] = a11 * b11 + a12 * b21;
        te[2] = a11 * b12 + a12 * b22;
        te[1] = a21 * b11 + a22 * b21;
        te[3] = a21 * b12 + a22 * b22;
        return this;
    }
    multiplyScalar(s) {
        const te = this.elements;
        te[0] *= s;
        te[2] *= s;
        te[1] *= s;
        te[3] *= s;
        return this;
    }
    determinant() {
        const te = this.elements;
        const a = te[0], b = te[1], c = te[2], d = te[3];
        return a * d - b * c;
    }
    // getInverse
    transpose() {
        let tmp;
        const m = this.elements;
        tmp = m[1];
        m[1] = m[2];
        m[2] = tmp;
        return this;
    }
    equals(matrix) {
        const te = this.elements;
        const me = matrix.elements;
        for (let i = 0; i < 4; i++) {
            if (te[i] !== me[i])
                return false;
        }
        return true;
    }
    fromArray(array, offset = 0) {
        for (let i = 0; i < 4; i++) {
            this.elements[i] = array[i + offset];
        }
        return this;
    }
    toArray(array = [], offset = 0) {
        const te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        return array;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
