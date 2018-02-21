import {Vector3} from "./Vector3";
import {Euler, EulerOrder} from "./Euler";
import {Quaternion} from "./Quaternion"

/**
 * TODO: applyToBufferAttribute
 */
export class Matrix4 {

    protected elements: number[] = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    public copy(mat4: Matrix4): this {
        this.elements = mat4.toArray();
        return this;
    }

    public set(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, n41: number, n42: number, n43: number, n44: number): this {
        const te = this.elements;
        te[0] = n11;
        te[4] = n12;
        te[8] = n13;
        te[12] = n14;
        te[1] = n21;
        te[5] = n22;
        te[9] = n23;
        te[13] = n24;
        te[2] = n31;
        te[6] = n32;
        te[10] = n33;
        te[14] = n34;
        te[3] = n41;
        te[7] = n42;
        te[11] = n43;
        te[15] = n44;
        return this;
    }

    public identity(): this {
        return this.set(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    public copyPosition(m: Matrix4): this {
        const te: number[] = this.elements, me: number[] = m.toArray();
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        return this;
    }

    public extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this {
        xAxis.fromArray(this.elements, 0);
        yAxis.fromArray(this.elements, 4);
        zAxis.fromArray(this.elements, 8);
        return this;
    }

    public makeBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): this {
        return this.set(
            xAxis.x, yAxis.x, zAxis.x, 0,
            xAxis.y, yAxis.y, zAxis.y, 0,
            xAxis.z, yAxis.z, zAxis.z, 0,
            0, 0, 0, 1
        );
    }

    public extractRotation(mat4: Matrix4): this {
        const vec: Vector3 = new Vector3();
        const te: number[] = this.elements;
        const me: number[] = mat4.elements;
        const scaleX: number = 1 / vec.fromArray(mat4.toArray(), 0).length();
        const scaleY: number = 1 / vec.fromArray(mat4.toArray(), 4).length();
        const scaleZ: number = 1 / vec.fromArray(mat4.toArray(), 8).length();
        te[0] = me[0] * scaleX;
        te[1] = me[1] * scaleX;
        te[2] = me[2] * scaleX;
        te[4] = me[4] * scaleY;
        te[5] = me[5] * scaleY;
        te[6] = me[6] * scaleY;
        te[8] = me[8] * scaleZ;
        te[9] = me[9] * scaleZ;
        te[10] = me[10] * scaleZ;
        return this;
    }

    public makeRotationFromEuler(euler: Euler): this {
        const te: number[] = this.elements;
        const x: number = euler.x, y: number = euler.y, z: number = euler.z;
        const a: number = Math.cos(x), b: number = Math.sin(x);
        const c: number = Math.cos(y), d: number = Math.sin(y);
        const e: number = Math.cos(z), f: number = Math.sin(z);

        if (euler.order === EulerOrder.XYZ) {
            const ae = a * e, af = a * f, be = b * e, bf = b * f;
            te[0] = c * e;
            te[4] = -c * f;
            te[8] = d;
            te[1] = af + be * d;
            te[5] = ae - bf * d;
            te[9] = -b * c;
            te[2] = bf - ae * d;
            te[6] = be + af * d;
            te[10] = a * c;
        } else if (euler.order === EulerOrder.YXZ) {
            const ce = c * e, cf = c * f, de = d * e, df = d * f;
            te[0] = ce + df * b;
            te[4] = de * b - cf;
            te[8] = a * d;
            te[1] = a * f;
            te[5] = a * e;
            te[9] = -b;
            te[2] = cf * b - de;
            te[6] = df + ce * b;
            te[10] = a * c;
        } else if (euler.order === EulerOrder.ZXY) {
            const ce = c * e, cf = c * f, de = d * e, df = d * f;
            te[0] = ce - df * b;
            te[4] = -a * f;
            te[8] = de + cf * b;
            te[1] = cf + de * b;
            te[5] = a * e;
            te[9] = df - ce * b;
            te[2] = -a * d;
            te[6] = b;
            te[10] = a * c;
        } else if (euler.order === EulerOrder.ZYX) {
            const ae = a * e, af = a * f, be = b * e, bf = b * f;
            te[0] = c * e;
            te[4] = be * d - af;
            te[8] = ae * d + bf;
            te[1] = c * f;
            te[5] = bf * d + ae;
            te[9] = af * d - be;
            te[2] = -d;
            te[6] = b * c;
            te[10] = a * c;
        } else if (euler.order === EulerOrder.YZX) {
            const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
            te[0] = c * e;
            te[4] = bd - ac * f;
            te[8] = bc * f + ad;
            te[1] = f;
            te[5] = a * e;
            te[9] = -b * e;
            te[2] = -d * e;
            te[6] = ad * f + bc;
            te[10] = ac - bd * f;
        } else if (euler.order === EulerOrder.XZY) {
            const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
            te[0] = c * e;
            te[4] = -f;
            te[8] = d * e;
            te[1] = ac * f + bd;
            te[5] = a * e;
            te[9] = ad * f - bc;
            te[2] = bc * f - ad;
            te[6] = b * e;
            te[10] = bd * f + ac;
        }

        // last column
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;

        // bottom row
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this;
    }

    public makeRotationFromQuaternion(quaternion: Quaternion): this {

        const te: number[] = this.elements;
        const x: number = quaternion.x, y: number = quaternion.y, z: number = quaternion.z, w: number = quaternion.w;
        const x2: number = x + x, y2: number = y + y, z2: number = z + z;
        const xx: number = x * x2, xy: number = x * y2, xz: number = x * z2;
        const yy: number = y * y2, yz: number = y * z2, zz: number = z * z2;
        const wx: number = w * x2, wy: number = w * y2, wz: number = w * z2;

        te[0] = 1 - ( yy + zz );
        te[4] = xy - wz;
        te[8] = xz + wy;

        te[1] = xy + wz;
        te[5] = 1 - ( xx + zz );
        te[9] = yz - wx;

        te[2] = xz - wy;
        te[6] = yz + wx;
        te[10] = 1 - ( xx + yy );

        // last column
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;

        // bottom row
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;

        return this;

    }

    public lookAt(eye: Vector3, target: Vector3, up: Vector3): this {
        const x: Vector3 = new Vector3();
        const y: Vector3 = new Vector3();
        const z: Vector3 = new Vector3();
        const te: number[] = this.elements;
        z.copy(eye).cross(target);
        if (z.lengthSquared() === 0) {
            // eye and target are in the same position
            z.z = 1;
        }
        z.normalize();
        x.copy(up).cross(z);

        if (x.lengthSquared() === 0) {
            // up and z are parallel
            if (Math.abs(up.z) === 1) {
                z.x += 0.0001;
            } else {
                z.z += 0.0001;
            }
            z.normalize();
            x.copy(up).cross(z);
        }

        x.normalize();
        y.copy(z).cross(x);

        te[0] = x.x;
        te[4] = y.x;
        te[8] = z.x;
        te[1] = x.y;
        te[5] = y.y;
        te[9] = z.y;
        te[2] = x.z;
        te[6] = y.z;
        te[10] = z.z;

        return this;
    }

    public multiply(mat: Matrix4): this {
        return this.multiplyMatrices(this, mat);
    }

    public premultiply(mat: Matrix4): this {
        return this.multiplyMatrices(mat, this);
    }

    public multiplyMatrices(matA: Matrix4, matB: Matrix4): this {

        const ae: number[] = matA.toArray();
        const be: number[] = matB.toArray();
        const te: number[] = this.elements;

        const a11: number = ae[0], a12: number = ae[4], a13: number = ae[8], a14: number = ae[12];
        const a21: number = ae[1], a22: number = ae[5], a23: number = ae[9], a24: number = ae[13];
        const a31: number = ae[2], a32: number = ae[6], a33: number = ae[10], a34: number = ae[14];
        const a41: number = ae[3], a42: number = ae[7], a43: number = ae[11], a44: number = ae[15];

        const b11: number = be[0], b12: number = be[4], b13: number = be[8], b14: number = be[12];
        const b21: number = be[1], b22: number = be[5], b23: number = be[9], b24: number = be[13];
        const b31: number = be[2], b32: number = be[6], b33: number = be[10], b34: number = be[14];
        const b41: number = be[3], b42: number = be[7], b43: number = be[11], b44: number = be[15];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return this;

    }

    public multiplyScalar(s: number): this {
        const te: number[] = this.elements;
        te[0] *= s;
        te[4] *= s;
        te[8] *= s;
        te[12] *= s;
        te[1] *= s;
        te[5] *= s;
        te[9] *= s;
        te[13] *= s;
        te[2] *= s;
        te[6] *= s;
        te[10] *= s;
        te[14] *= s;
        te[3] *= s;
        te[7] *= s;
        te[11] *= s;
        te[15] *= s;
        return this;
    }

    /**
     * http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
     * @returns {number}
     */
    public determinant(): number {
        const te: number[] = this.elements;

        const n11: number = te[0], n12: number = te[4], n13: number = te[8], n14: number = te[12];
        const n21: number = te[1], n22: number = te[5], n23: number = te[9], n24: number = te[13];
        const n31: number = te[2], n32: number = te[6], n33: number = te[10], n34: number = te[14];
        const n41: number = te[3], n42: number = te[7], n43: number = te[11], n44: number = te[15];

        return (
            n41 * (
                +n14 * n23 * n32
                - n13 * n24 * n32
                - n14 * n22 * n33
                + n12 * n24 * n33
                + n13 * n22 * n34
                - n12 * n23 * n34
            ) +
            n42 * (
                +n11 * n23 * n34
                - n11 * n24 * n33
                + n14 * n21 * n33
                - n13 * n21 * n34
                + n13 * n24 * n31
                - n14 * n23 * n31
            ) +
            n43 * (
                +n11 * n24 * n32
                - n11 * n22 * n34
                - n14 * n21 * n32
                + n12 * n21 * n34
                + n14 * n22 * n31
                - n12 * n24 * n31
            ) +
            n44 * (
                -n13 * n22 * n31
                - n11 * n23 * n32
                + n11 * n22 * n33
                + n13 * n21 * n32
                - n12 * n21 * n33
                + n12 * n23 * n31
            )
        );
    }

    public transpose(): this {
        const te: number[] = this.elements;
        let tmp: number;
        tmp = te[1];
        te[1] = te[4];
        te[4] = tmp;
        tmp = te[2];
        te[2] = te[8];
        te[8] = tmp;
        tmp = te[6];
        te[6] = te[9];
        te[9] = tmp;
        tmp = te[3];
        te[3] = te[12];
        te[12] = tmp;
        tmp = te[7];
        te[7] = te[13];
        te[13] = tmp;
        tmp = te[11];
        te[11] = te[14];
        te[14] = tmp;
        return this;
    }

    public setPosition(v: Vector3): this {
        const te: number[] = this.elements;
        te[12] = v.x;
        te[13] = v.y;
        te[14] = v.z;
        return this;
    }

    /**
     * http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
     * @param m
     * @param throwOnDegenerate
     * @returns {Matrix4}
     */
    public getInverse(m: Matrix4, throwOnDegenerate: boolean = false): this {
        const te: number[] = this.elements, me: number[] = m.elements;
        const n11: number = me[0], n21: number = me[1], n31: number = me[2], n41: number = me[3],
            n12: number = me[4], n22: number = me[5], n32: number = me[6], n42: number = me[7],
            n13: number = me[8], n23: number = me[9], n33: number = me[10], n43: number = me[11],
            n14: number = me[12], n24: number = me[13], n34: number = me[14], n44: number = me[15],

            t11: number = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
            t12: number = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
            t13: number = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
            t14: number = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

        const det: number = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

        if (det === 0) {
            const msg = `THREE.Matrix4: .getInverse() can"t invert matrix, determinant is 0`;
            if (throwOnDegenerate === true) {
                throw new Error(msg);
            } else {
                console.warn(msg);
            }
            return this.identity();
        }

        const detInv: number = 1 / det;

        te[0] = t11 * detInv;
        te[1] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
        te[2] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
        te[3] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

        te[4] = t12 * detInv;
        te[5] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
        te[6] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
        te[7] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

        te[8] = t13 * detInv;
        te[9] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
        te[10] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
        te[11] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

        te[12] = t14 * detInv;
        te[13] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
        te[14] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
        te[15] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

        return this;

    }

    public scale(v: Vector3): this {
        const te: number[] = this.elements;
        const x: number = v.x, y: number = v.y, z: number = v.z;
        te[0] *= x;
        te[4] *= y;
        te[8] *= z;
        te[1] *= x;
        te[5] *= y;
        te[9] *= z;
        te[2] *= x;
        te[6] *= y;
        te[10] *= z;
        te[3] *= x;
        te[7] *= y;
        te[11] *= z;
        return this;
    }

    public getMaxScaleOnAxis(): number {
        const te: number[] = this.elements;
        const scaleXSq: number = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
        const scaleYSq: number = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
        const scaleZSq: number = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
        return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
    }

    public makeTranslation(x: number, y: number, z: number): this {
        return this.set(
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        );
    }

    public makeRotationX(theta: number): this {
        const c: number = Math.cos(theta), s: number = Math.sin(theta);
        return this.set(
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        );
    }

    public makeRotationY(theta: number): this {
        const c: number = Math.cos(theta), s: number = Math.sin(theta);
        return this.set(
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        );
    }

    public makeRotationZ(theta: number): this {
        const c: number = Math.cos(theta), s: number = Math.sin(theta);
        return this.set(
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    /**
     * http://www.gamedev.net/reference/articles/article1199.asp
     * @param axis
     * @param angle
     * @returns {Matrix4}
     */
    public makeRotationAxis(axis: Vector3, angle: number): this {
        const c: number = Math.cos(angle);
        const s: number = Math.sin(angle);
        const t: number = 1 - c;
        const x: number = axis.x, y: number = axis.y, z: number = axis.z;
        const tx: number = t * x, ty = t * y;
        return this.set(
            tx * x + c, tx * y - s * z, tx * z + s * y, 0,
            tx * y + s * z, ty * y + c, ty * z - s * x, 0,
            tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
            0, 0, 0, 1
        );
    }

    public makeScale(x: number, y: number, z: number): this {
        return this.set(
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        );
    }

    public makeShear(x: number, y: number, z: number): this {
        return this.set(
            1, y, z, 0,
            x, 1, z, 0,
            x, y, 1, 0,
            0, 0, 0, 1
        );
    }

    public compose(position: Vector3, quaternion: Quaternion, scale: Vector3): this {
        this.makeRotationFromQuaternion(quaternion);
        this.scale(scale);
        this.setPosition(position);
        return this;
    }

    public decompose(position: Vector3, quaternion: Quaternion, scale: Vector3): this {
        const vector: Vector3 = new Vector3();
        const matrix: Matrix4 = new Matrix4();
        const te: number[] = this.elements;

        let sx: number = vector.set(te[0], te[1], te[2]).length();
        const sy: number = vector.set(te[4], te[5], te[6]).length();
        const sz: number = vector.set(te[8], te[9], te[10]).length();

        // if determine is negative, we need to invert one scale
        const det: number = this.determinant();
        if (det < 0) sx = -sx;

        position.x = te[12];
        position.y = te[13];
        position.z = te[14];

        // scale the rotation part
        matrix.copy(this);

        const invSX: number = 1 / sx;
        const invSY: number = 1 / sy;
        const invSZ: number = 1 / sz;

        matrix.elements[0] *= invSX;
        matrix.elements[1] *= invSX;
        matrix.elements[2] *= invSX;

        matrix.elements[4] *= invSY;
        matrix.elements[5] *= invSY;
        matrix.elements[6] *= invSY;

        matrix.elements[8] *= invSZ;
        matrix.elements[9] *= invSZ;
        matrix.elements[10] *= invSZ;

        quaternion.setFromRotationMatrix(matrix);
        scale.set(sx, sy, sz);
        return this;
    }

    public makePerspective(left: number, right: number, top: number, bottom: number, near: number, far: number): this {
        return this.set(
            2 * near / (right - left), 0, (right + left) / (right - left), 0,
            0, 2 * near / (top - bottom), (top + bottom) / (top - bottom), 0,
            0, 0, -(far + near) / (far - near), -2 * far * near / (far - near),
            0, 0, -1, 0
        );
    }

    public makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): this {
        const w: number = 1.0 / ( right - left );
        const h: number = 1.0 / ( top - bottom );
        const p: number = 1.0 / ( far - near );

        const x: number = ( right + left ) * w;
        const y: number = ( top + bottom ) * h;
        const z: number = ( far + near ) * p;

        return this.set(
            2 * w, 0, 0, -x,
            0, 2 * h, 0, -y,
            0, 0, -2 * p, -z,
            0, 0, 0, 1
        );

    }

    public equals(matrix: Matrix4): boolean {
        const me: number[] = matrix.toArray();
        for (let i: number = 0; i < 16; i++) {
            if (this.elements[i] !== me[i]) return false;
        }
        return true;
    }

    public fromArray(array: number[], offset: number = 0): this {
        for (let i: number = 0; i < 16; i++) {
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
        array[offset + 9] = te[9];
        array[offset + 10] = te[10];
        array[offset + 11] = te[11];

        array[offset + 12] = te[12];
        array[offset + 13] = te[13];
        array[offset + 14] = te[14];
        array[offset + 15] = te[15];
        return array;
    }

    public clone(): Matrix4 {
        return ((new (this.constructor as () => void)()) as Matrix4).copy(this);
    }
}