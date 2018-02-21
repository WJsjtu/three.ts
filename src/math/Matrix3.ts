import {Matrix4} from "./Matrix4";

export class Matrix3 {
    protected elements: number[] = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    public set(
        n11: number,
        n12: number,
        n13: number,
        n21: number,
        n22: number,
        n23: number,
        n31: number,
        n32: number,
        n33: number,
    ): this {
        const te: number[] = this.elements;
        te[0] = n11;
        te[1] = n21;
        te[2] = n31;
        te[3] = n12;
        te[4] = n22;
        te[5] = n32;
        te[6] = n13;
        te[7] = n23;
        te[8] = n33;
        return this;
    }

    public identity(): this {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }

    public copy(mat3: Matrix3): this {
        this.elements = mat3.toArray();
        return this;
    }

    public setFromMatrix4(mat4: Matrix4): this {
        const me: number[] = mat4.toArray();
        return this.set(
            me[0],
            me[4],
            me[8],
            me[1],
            me[5],
            me[9],
            me[2],
            me[6],
            me[10],
        );
    }

    public multiply(mat3: Matrix3): this {
        return this.multiplyMatrices(this, mat3);
    }

    public premultiply(m: Matrix3): this {
        return this.multiplyMatrices(m, this);
    }

    public multiplyMatrices(a: Matrix3, b: Matrix3): this {
        const ae: number[] = a.toArray();
        const be: number[] = b.toArray();
        const te: number[] = this.elements;

        const a11: number = ae[0],
            a12: number = ae[3],
            a13: number = ae[6];
        const a21: number = ae[1],
            a22: number = ae[4],
            a23: number = ae[7];
        const a31: number = ae[2],
            a32: number = ae[5],
            a33: number = ae[8];

        const b11: number = be[0],
            b12: number = be[3],
            b13: number = be[6];
        const b21: number = be[1],
            b22: number = be[4],
            b23: number = be[7];
        const b31: number = be[2],
            b32: number = be[5],
            b33: number = be[8];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31;
        te[3] = a11 * b12 + a12 * b22 + a13 * b32;
        te[6] = a11 * b13 + a12 * b23 + a13 * b33;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31;
        te[4] = a21 * b12 + a22 * b22 + a23 * b32;
        te[7] = a21 * b13 + a22 * b23 + a23 * b33;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31;
        te[5] = a31 * b12 + a32 * b22 + a33 * b32;
        te[8] = a31 * b13 + a32 * b23 + a33 * b33;

        return this;
    }

    public multiplyScalar(s: number): this {
        const te: number[] = this.elements;
        te[0] *= s;
        te[3] *= s;
        te[6] *= s;
        te[1] *= s;
        te[4] *= s;
        te[7] *= s;
        te[2] *= s;
        te[5] *= s;
        te[8] *= s;
        return this;
    }

    public determinant(): number {
        const te: number[] = this.elements;
        const a: number = te[0],
            b: number = te[1],
            c: number = te[2],
            d: number = te[3],
            e: number = te[4],
            f: number = te[5],
            g: number = te[6],
            h: number = te[7],
            i: number = te[8];
        return (
            a * e * i -
            a * f * h -
            b * d * i +
            b * f * g +
            c * d * h -
            c * e * g
        );
    }

    public getInverse(
        matrix: Matrix3,
        throwOnDegenerate: boolean = false,
    ): this {
        const me: number[] = matrix.toArray(),
            te: number[] = this.elements,
            n11: number = me[0],
            n21: number = me[1],
            n31: number = me[2],
            n12: number = me[3],
            n22: number = me[4],
            n32: number = me[5],
            n13: number = me[6],
            n23: number = me[7],
            n33: number = me[8],
            t11: number = n33 * n22 - n32 * n23,
            t12: number = n32 * n13 - n33 * n12,
            t13: number = n23 * n12 - n22 * n13,
            det: number = n11 * t11 + n21 * t12 + n31 * t13;

        if (det === 0) {
            const msg = `THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0`;
            if (throwOnDegenerate === true) {
                throw new Error(msg);
            } else {
                console.warn(msg);
            }
            return this.identity();
        }

        const detInv: number = 1 / det;

        te[0] = t11 * detInv;
        te[1] = (n31 * n23 - n33 * n21) * detInv;
        te[2] = (n32 * n21 - n31 * n22) * detInv;

        te[3] = t12 * detInv;
        te[4] = (n33 * n11 - n31 * n13) * detInv;
        te[5] = (n31 * n12 - n32 * n11) * detInv;

        te[6] = t13 * detInv;
        te[7] = (n21 * n13 - n23 * n11) * detInv;
        te[8] = (n22 * n11 - n21 * n12) * detInv;

        return this;
    }

    public transpose(): this {
        let tmp;
        const m: number[] = this.elements;

        tmp = m[1];
        m[1] = m[3];
        m[3] = tmp;
        tmp = m[2];
        m[2] = m[6];
        m[6] = tmp;
        tmp = m[5];
        m[5] = m[7];
        m[7] = tmp;
        return this;
    }

    public getNormalMatrix(matrix4: Matrix4): this {
        return this.setFromMatrix4(matrix4)
            .getInverse(this)
            .transpose();
    }

    public setUvTransform(
        tx: number,
        ty: number,
        sx: number,
        sy: number,
        rotation: number,
        cx: number,
        cy: number,
    ): this {
        const c = Math.cos(rotation);
        const s = Math.sin(rotation);
        return this.set(
            sx * c,
            sx * s,
            -sx * (c * cx + s * cy) + cx + tx,
            -sy * s,
            sy * c,
            -sy * (-s * cx + c * cy) + cy + ty,
            0,
            0,
            1,
        );
    }

    public scale(sx: number, sy: number): this {
        const te: number[] = this.elements;
        te[0] *= sx;
        te[3] *= sx;
        te[6] *= sx;
        te[1] *= sy;
        te[4] *= sy;
        te[7] *= sy;
        return this;
    }

    public rotate(theta: number): this {
        const c: number = Math.cos(theta);
        const s: number = Math.sin(theta);

        const te: number[] = this.elements;

        const a11: number = te[0],
            a12: number = te[3],
            a13: number = te[6];
        const a21: number = te[1],
            a22: number = te[4],
            a23: number = te[7];

        te[0] = c * a11 + s * a21;
        te[3] = c * a12 + s * a22;
        te[6] = c * a13 + s * a23;

        te[1] = -s * a11 + c * a21;
        te[4] = -s * a12 + c * a22;
        te[7] = -s * a13 + c * a23;

        return this;
    }

    public translate(tx: number, ty: number): this {
        const te: number[] = this.elements;
        te[0] += tx * te[2];
        te[3] += tx * te[5];
        te[6] += tx * te[8];
        te[1] += ty * te[2];
        te[4] += ty * te[5];
        te[7] += ty * te[8];
        return this;
    }

    public equals(matrix: Matrix3): boolean {
        const te: number[] = this.elements;
        const me: number[] = matrix.toArray();
        for (let i: number = 0; i < 9; i++) {
            if (te[i] !== me[i]) return false;
        }
        return true;
    }

    public fromArray(array: number[], offset: number = 0): this {
        for (let i: number = 0; i < 9; i++) {
            this.elements[i] = array[i + offset];
        }
        return this;
    }

    public toArray(array: number[] = [], offset: number = 0): number[] {
        const te: number[] = this.elements;

        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];

        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];

        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];

        return array;
    }

    public clone(): Matrix3 {
        return (new (this.constructor as () => void)() as Matrix3).copy(this);
    }
}
