import { MathUtil } from "./Math";
import { Matrix4 } from "./Matrix4";
import { Quaternion } from "./Quaternion";
export var EulerOrder;
(function (EulerOrder) {
    EulerOrder[EulerOrder["XYZ"] = 0] = "XYZ";
    EulerOrder[EulerOrder["YZX"] = 1] = "YZX";
    EulerOrder[EulerOrder["ZXY"] = 2] = "ZXY";
    EulerOrder[EulerOrder["XZY"] = 3] = "XZY";
    EulerOrder[EulerOrder["YXZ"] = 4] = "YXZ";
    EulerOrder[EulerOrder["ZYX"] = 5] = "ZYX";
})(EulerOrder || (EulerOrder = {}));
/**
 * TODO: setFromVector3
 */
export class Euler {
    constructor(x = 0, y = 0, z = 0) {
        this._order = Euler.DefaultOrder;
        this.onChangeCallback = function () { };
        this._x = x;
        this._y = y;
        this._z = z;
    }
    onChange(callback) {
        this.onChangeCallback = callback;
        return this;
    }
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
        this.onChangeCallback();
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
        this.onChangeCallback();
    }
    get z() {
        return this._z;
    }
    set z(z) {
        this._z = z;
        this.onChangeCallback();
    }
    get order() {
        return this._order;
    }
    set order(_order) {
        this._order = _order;
        this.onChangeCallback();
    }
    set(x, y, z, order) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order;
        this.onChangeCallback();
        return this;
    }
    copy(euler) {
        this.set(euler.x, euler.y, euler.z, euler.order);
        this.onChangeCallback();
        return this;
    }
    /**
     * assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
     * @param m
     * @param order
     * @returns {Euler}
     */
    setFromRotationMatrix(m, order = this.order, update) {
        const clamp = MathUtil.clamp;
        const te = m.elements;
        const m11 = te[0], m12 = te[4], m13 = te[8];
        const m21 = te[1], m22 = te[5], m23 = te[9];
        const m31 = te[2], m32 = te[6], m33 = te[10];
        if (order === EulerOrder.XYZ) {
            this._y = Math.asin(clamp(m13, -1, 1));
            if (Math.abs(m13) < 0.99999) {
                this._x = Math.atan2(-m23, m33);
                this._z = Math.atan2(-m12, m11);
            }
            else {
                this._x = Math.atan2(m32, m22);
                this._z = 0;
            }
        }
        else if (order === EulerOrder.YXZ) {
            this._x = Math.asin(-clamp(m23, -1, 1));
            if (Math.abs(m23) < 0.99999) {
                this._y = Math.atan2(m13, m33);
                this._z = Math.atan2(m21, m22);
            }
            else {
                this._y = Math.atan2(-m31, m11);
                this._z = 0;
            }
        }
        else if (order === EulerOrder.ZXY) {
            this._x = Math.asin(clamp(m32, -1, 1));
            if (Math.abs(m32) < 0.99999) {
                this._y = Math.atan2(-m31, m33);
                this._z = Math.atan2(-m12, m22);
            }
            else {
                this._y = 0;
                this._z = Math.atan2(m21, m11);
            }
        }
        else if (order === EulerOrder.ZYX) {
            this._y = Math.asin(-clamp(m31, -1, 1));
            if (Math.abs(m31) < 0.99999) {
                this._x = Math.atan2(m32, m33);
                this._z = Math.atan2(m21, m11);
            }
            else {
                this._x = 0;
                this._z = Math.atan2(-m12, m22);
            }
        }
        else if (order === EulerOrder.YZX) {
            this._z = Math.asin(clamp(m21, -1, 1));
            if (Math.abs(m21) < 0.99999) {
                this._x = Math.atan2(-m23, m22);
                this._y = Math.atan2(-m31, m11);
            }
            else {
                this._x = 0;
                this._y = Math.atan2(m13, m33);
            }
        }
        else if (order === EulerOrder.XZY) {
            this._z = Math.asin(-clamp(m12, -1, 1));
            if (Math.abs(m12) < 0.99999) {
                this._x = Math.atan2(m32, m22);
                this._y = Math.atan2(m13, m11);
            }
            else {
                this._x = Math.atan2(-m23, m33);
                this._y = 0;
            }
        }
        this.order = order;
        if (update !== false)
            this.onChangeCallback();
        return this;
    }
    setFromQuaternion(q, order, update) {
        const matrix = new Matrix4();
        matrix.makeRotationFromQuaternion(q);
        return this.setFromRotationMatrix(matrix, order, update);
    }
    /**
     * this discards revolution information -bhouston
     * @param newOrder
     * @returns {Euler}
     */
    reorder(newOrder) {
        const q = new Quaternion();
        q.setFromEuler(this);
        return this.setFromQuaternion(q, newOrder);
    }
    equals(euler) {
        return euler.x === this.x && euler.y === this.y && euler.z === this.z && euler.order === this.order;
    }
    fromArray(array) {
        this._x = array[0];
        this._y = array[1];
        this._z = array[2];
        this._order = array[3] || this.order;
        this.onChangeCallback();
        return this;
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.order;
        return array;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
Euler.DefaultOrder = EulerOrder.XYZ;
