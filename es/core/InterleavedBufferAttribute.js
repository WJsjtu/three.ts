import { MathUtil } from "../math/Math";
import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
export class InterleavedBufferAttribute {
    constructor(array, stride, itemSize, offset, normalized = false) {
        this.uuid = MathUtil.generateUUID();
        this.array = undefined;
        this.stride = 1;
        this.count = 0;
        this.dynamic = false;
        this.updateRange = { offset: 0, count: -1 };
        this.version = 0;
        this.normalized = false;
        this.array = array;
        this.stride = stride;
        this.count = array !== undefined ? array.length / stride : 0;
        this.itemSize = itemSize;
        this.offset = offset;
        this.normalized = normalized;
    }
    set needsUpdate(value) {
        if (value === true)
            this.version++;
    }
    setArray(array) {
        this.count = array !== undefined ? array.length / this.stride : 0;
        this.array = array;
        return this;
    }
    setDynamic(value) {
        this.dynamic = value;
        return this;
    }
    copy(source) {
        this.array = new source.array.constructor(source.array);
        this.stride = source.stride;
        this.count = source.count;
        this.dynamic = source.dynamic;
        return this;
    }
    set(value, offset = 0) {
        this.array.set(value, offset);
        return this;
    }
    get(offset = 0, length = 1) {
        return this.array.slice(offset, length);
    }
    copyAt(index1, attribute, index2) {
        index1 *= this.stride;
        index2 *= attribute.stride;
        for (let i = 0, l = this.stride; i < l; i++) {
            this.array[index1 + i] = attribute.array[index2 + i];
        }
        return this;
    }
    clone() {
        return new this.constructor(this.array, this.stride).copy(this);
    }
    setProperty(index, property, value) {
        property = property.toLowerCase();
        if (property &&
            property.length <= 4 &&
            property.replace(/[xyzw]/g, "").length === 0) {
            const offsetMap = { x: 0, y: 1, z: 2 };
            if (property.length === 1 && typeof value === "number") {
                this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(0)]] = value;
            }
            else if (property.length === 2 && value instanceof Vector2) {
                this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(0)]] =
                    value.x;
                this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(1)]] =
                    value.y;
            }
            else if (property.length === 3 && value instanceof Vector3) {
                this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(0)]] =
                    value.x;
                this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(1)]] =
                    value.y;
                this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(2)]] =
                    value.z;
            }
            else if (property.length === 4 && value instanceof Vector4) {
                this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(0)]] =
                    value.x;
                this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(1)]] =
                    value.y;
                this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(2)]] =
                    value.z;
                this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(3)]] =
                    value.w;
            }
        }
        return this;
    }
    getProperty(index, property) {
        property = property.toLowerCase();
        if (property &&
            property.length <= 4 &&
            property.replace(/[xyzw]/g, "").length === 0) {
            const offsetMap = { x: 0, y: 1, z: 2 };
            if (property.length === 1) {
                return this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(0)]];
            }
            else if (property.length === 2) {
                return new Vector2(this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(0)]], this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(1)]]);
            }
            else if (property.length === 3) {
                return new Vector3(this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(0)]], this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(1)]], this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(2)]]);
            }
            else if (property.length === 4) {
                return new Vector4(this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(0)]], this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(1)]], this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(2)]], this.array[index * this.stride +
                    this.offset +
                    offsetMap[property.charAt(3)]]);
            }
        }
        return null;
    }
}
