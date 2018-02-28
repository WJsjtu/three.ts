import { TypedArray } from "../core/BufferAttribute";

export class Matrix2 {
    public elements: number[] = [1, 0, 0, 1];

    public set(n11: number, n12: number, n21: number, n22: number): this {
        const te: number[] = this.elements;
        te[0] = n11;
        te[1] = n21;
        te[3] = n12;
        te[4] = n22;
        return this;
    }

    public identity(): this {
        return this.set(1, 0, 0, 1);
    }

    public copy(mat2: Matrix2): this {
        const te: number[] = this.elements;
        const me: number[] = mat2.elements;

        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        return this;
    }

    public setFromMatrix4(mat2: Matrix2): this {
        const me: number[] = mat2.elements;
        return this.set(me[0], me[2], me[1], me[3]);
    }

    public multiply(mat2: Matrix2): this {
        return this.multiplyMatrices(this, mat2);
    }

    public premultiply(m: Matrix2): this {
        return this.multiplyMatrices(m, this);
    }

    public multiplyMatrices(a: Matrix2, b: Matrix2): this {
        const ae: number[] = a.elements;
        const be: number[] = b.elements;
        const te: number[] = this.elements;

        const a11: number = ae[0],
            a12: number = ae[2];
        const a21: number = ae[1],
            a22: number = ae[3];

        const b11: number = be[0],
            b12: number = be[2];
        const b21: number = be[1],
            b22: number = be[3];

        te[0] = a11 * b11 + a12 * b21;
        te[2] = a11 * b12 + a12 * b22;

        te[1] = a21 * b11 + a22 * b21;
        te[3] = a21 * b12 + a22 * b22;

        return this;
    }

    public multiplyScalar(s: number): this {
        const te: number[] = this.elements;
        te[0] *= s;
        te[2] *= s;
        te[1] *= s;
        te[3] *= s;
        return this;
    }

    public determinant(): number {
        const te: number[] = this.elements;
        const a: number = te[0],
            b: number = te[1],
            c: number = te[2],
            d: number = te[3];
        return a * d - b * c;
    }

    // getInverse

    public transpose(): this {
        let tmp;
        const m: number[] = this.elements;
        tmp = m[1];
        m[1] = m[2];
        m[2] = tmp;
        return this;
    }

    public equals(matrix: Matrix2): boolean {
        const te: number[] = this.elements;
        const me: number[] = matrix.elements;
        for (let i: number = 0; i < 4; i++) {
            if (te[i] !== me[i]) return false;
        }
        return true;
    }

    public fromArray(array: number[] | TypedArray, offset: number = 0): this {
        for (let i: number = 0; i < 4; i++) {
            this.elements[i] = array[i + offset];
        }
        return this;
    }

    public toArray(array: number[] | TypedArray = [], offset: number = 0): number[] | TypedArray {
        const te: number[] = this.elements;

        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];

        array[offset + 3] = te[3];

        return array;
    }

    public clone(): Matrix2 {
        return new (this.constructor as new () => Matrix2)().copy(this);
    }
}
