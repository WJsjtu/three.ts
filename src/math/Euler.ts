import { MathUtil } from "./Math";
import { Matrix4 } from "./Matrix4";
import { Quaternion } from "./Quaternion";

export enum EulerOrder {
    XYZ,
    YZX,
    ZXY,
    XZY,
    YXZ,
    ZYX,
}

/**
 * TODO: setFromVector3
 */
export class Euler {
    public static DefaultOrder: EulerOrder = EulerOrder.XYZ;

    protected _order: EulerOrder = Euler.DefaultOrder;
    protected _x: number;
    protected _y: number;
    protected _z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

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

    get z() {
        return this._z;
    }

    set z(z: number) {
        this._z = z;
    }

    get order(): EulerOrder {
        return this._order;
    }

    set order(_order: EulerOrder) {
        this._order = _order;
    }

    public set(x: number, y: number, z: number, order: EulerOrder): this {
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order;
        return this;
    }

    public copy(euler: Euler): this {
        return this.set(euler.x, euler.y, euler.z, euler.order);
    }

    /**
     * assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
     * @param m
     * @param order
     * @returns {Euler}
     */
    public setFromRotationMatrix(
        m: Matrix4,
        order: EulerOrder = this.order,
    ): this {
        const clamp: (value: number, min: number, max: number) => number =
            MathUtil.clamp;
        const te: number[] = m.elements;
        const m11: number = te[0],
            m12: number = te[4],
            m13: number = te[8];
        const m21: number = te[1],
            m22: number = te[5],
            m23: number = te[9];
        const m31: number = te[2],
            m32: number = te[6],
            m33: number = te[10];

        if (order === EulerOrder.XYZ) {
            this._y = Math.asin(clamp(m13, -1, 1));
            if (Math.abs(m13) < 0.99999) {
                this._x = Math.atan2(-m23, m33);
                this._z = Math.atan2(-m12, m11);
            } else {
                this._x = Math.atan2(m32, m22);
                this._z = 0;
            }
        } else if (order === EulerOrder.YXZ) {
            this._x = Math.asin(-clamp(m23, -1, 1));
            if (Math.abs(m23) < 0.99999) {
                this._y = Math.atan2(m13, m33);
                this._z = Math.atan2(m21, m22);
            } else {
                this._y = Math.atan2(-m31, m11);
                this._z = 0;
            }
        } else if (order === EulerOrder.ZXY) {
            this._x = Math.asin(clamp(m32, -1, 1));
            if (Math.abs(m32) < 0.99999) {
                this._y = Math.atan2(-m31, m33);
                this._z = Math.atan2(-m12, m22);
            } else {
                this._y = 0;
                this._z = Math.atan2(m21, m11);
            }
        } else if (order === EulerOrder.ZYX) {
            this._y = Math.asin(-clamp(m31, -1, 1));
            if (Math.abs(m31) < 0.99999) {
                this._x = Math.atan2(m32, m33);
                this._z = Math.atan2(m21, m11);
            } else {
                this._x = 0;
                this._z = Math.atan2(-m12, m22);
            }
        } else if (order === EulerOrder.YZX) {
            this._z = Math.asin(clamp(m21, -1, 1));
            if (Math.abs(m21) < 0.99999) {
                this._x = Math.atan2(-m23, m22);
                this._y = Math.atan2(-m31, m11);
            } else {
                this._x = 0;
                this._y = Math.atan2(m13, m33);
            }
        } else if (order === EulerOrder.XZY) {
            this._z = Math.asin(-clamp(m12, -1, 1));
            if (Math.abs(m12) < 0.99999) {
                this._x = Math.atan2(m32, m22);
                this._y = Math.atan2(m13, m11);
            } else {
                this._x = Math.atan2(-m23, m33);
                this._y = 0;
            }
        }
        this.order = order;
        return this;
    }

    public setFromQuaternion(q: Quaternion, order: EulerOrder): this {
        const matrix: Matrix4 = new Matrix4();
        matrix.makeRotationFromQuaternion(q);
        return this.setFromRotationMatrix(matrix, order);
    }

    /**
     * this discards revolution information -bhouston
     * @param newOrder
     * @returns {Euler}
     */
    public reorder(newOrder: EulerOrder): this {
        const q: Quaternion = new Quaternion();
        q.setFromEuler(this);
        return this.setFromQuaternion(q, newOrder);
    }

    public equals(euler: Euler): boolean {
        return (
            euler.x === this.x &&
            euler.y === this.y &&
            euler.z === this.z &&
            euler.order === this.order
        );
    }

    public fromArray(
        array: [number, number, number] | [number, number, number, EulerOrder],
    ): this {
        return this.set(array[0], array[1], array[2], array[3] || this.order);
    }

    public toArray(array: any[] = [], offset: number = 0): any[] {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.order;
        return array;
    }

    public clone(): Euler {
        return new (this.constructor as new () => Euler)().copy(this);
    }
}
