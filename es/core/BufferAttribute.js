import { Color } from "../math/Color";
import { MathUtil } from "../math/Math";
import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
export class BufferAttribute {
    constructor(array, itemSize = 0, normalized = false) {
        this.uuid = MathUtil.generateUUID();
        this.name = "";
        this.array = undefined;
        this.itemSize = 1;
        this.count = 0;
        this.normalized = false;
        this.dynamic = false;
        this.updateRange = { offset: 0, count: -1 };
        this.version = 0;
        this.array = array;
        this.itemSize = itemSize;
        this.count = array !== undefined ? array.length / itemSize : 0;
        this.normalized = normalized;
    }
    set needsUpdate(value) {
        if (value === true)
            this.version++;
    }
    setArray(array) {
        this.count = array !== undefined ? array.length / this.itemSize : 0;
        this.array = array;
        return this;
    }
    setDynamic(value) {
        this.dynamic = value;
        return this;
    }
    copy(source) {
        this.array = new source.array.constructor();
        this.itemSize = source.itemSize;
        this.count = source.count;
        this.normalized = source.normalized;
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
        index1 *= this.itemSize;
        index2 *= attribute.itemSize;
        for (let i = 0, l = this.itemSize; i < l; i++) {
            this.array[index1 + i] = attribute.array[index2 + i];
        }
        return this;
    }
    copyArray(array) {
        this.array.set(array);
        return this;
    }
    copyColorsArray(colors) {
        const array = this.array;
        let offset = 0;
        for (let i = 0, l = colors.length; i < l; i++) {
            const color = colors[i] || new Color();
            array[offset++] = color.r;
            array[offset++] = color.g;
            array[offset++] = color.b;
        }
        return this;
    }
    /**
     * TODO question https://discourse.threejs.org/t/question-about-fromdirectgeometry-function-of-buffergeometry/1890/2
     * @param indices
     * @returns {BufferAttribute}
     public copyIndicesArray(indices: Face3[]): BufferAttribute {
        const array: TypedArray = this.array;
        let offset: number = 0;
        for (let i: number = 0, l: number = indices.length; i < l; i++) {
            const index = indices[i];
            array[offset++] = index.a;
            array[offset++] = index.b;
            array[offset++] = index.c;
        }
        return this;
    }
     */
    copyVector2sArray(vectors) {
        const array = this.array;
        let offset = 0;
        for (let i = 0, l = vectors.length; i < l; i++) {
            const vector = vectors[i] || new Vector2();
            array[offset++] = vector.x;
            array[offset++] = vector.y;
        }
        return this;
    }
    copyVector3sArray(vectors) {
        const array = this.array;
        let offset = 0;
        for (let i = 0, l = vectors.length; i < l; i++) {
            const vector = vectors[i] || new Vector3();
            array[offset++] = vector.x;
            array[offset++] = vector.y;
            array[offset++] = vector.z;
        }
        return this;
    }
    copyVector4sArray(vectors) {
        const array = this.array;
        let offset = 0;
        for (let i = 0, l = vectors.length; i < l; i++) {
            const vector = vectors[i] || new Vector4();
            array[offset++] = vector.x;
            array[offset++] = vector.y;
            array[offset++] = vector.z;
            array[offset++] = vector.w;
        }
        return this;
    }
    setProperty(index, property, value) {
        property = property.toLowerCase();
        if (property &&
            property.length <= 4 &&
            property.replace(/[xyzw]/g, "").length === 0) {
            const offsetMap = { x: 0, y: 1, z: 2 };
            if (property.length === 1 && typeof value === "number") {
                this.array[index * this.itemSize + offsetMap[property.charAt(0)]] = value;
            }
            else if (property.length === 2 && value instanceof Vector2) {
                this.array[index * this.itemSize + offsetMap[property.charAt(0)]] =
                    value.x;
                this.array[index * this.itemSize + offsetMap[property.charAt(1)]] =
                    value.y;
            }
            else if (property.length === 3 && value instanceof Vector3) {
                this.array[index * this.itemSize + offsetMap[property.charAt(0)]] =
                    value.x;
                this.array[index * this.itemSize + offsetMap[property.charAt(1)]] =
                    value.y;
                this.array[index * this.itemSize + offsetMap[property.charAt(2)]] =
                    value.z;
            }
            else if (property.length === 4 && value instanceof Vector4) {
                this.array[index * this.itemSize + offsetMap[property.charAt(0)]] =
                    value.x;
                this.array[index * this.itemSize + offsetMap[property.charAt(1)]] =
                    value.y;
                this.array[index * this.itemSize + offsetMap[property.charAt(2)]] =
                    value.z;
                this.array[index * this.itemSize + offsetMap[property.charAt(3)]] =
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
                return this.array[index * this.itemSize + offsetMap[property.charAt(0)]];
            }
            else if (property.length === 2) {
                return new Vector2(this.array[index * this.itemSize + offsetMap[property.charAt(0)]], this.array[index * this.itemSize + offsetMap[property.charAt(1)]]);
            }
            else if (property.length === 3) {
                return new Vector3(this.array[index * this.itemSize + offsetMap[property.charAt(0)]], this.array[index * this.itemSize + offsetMap[property.charAt(1)]], this.array[index * this.itemSize + offsetMap[property.charAt(2)]]);
            }
            else if (property.length === 4) {
                return new Vector4(this.array[index * this.itemSize + offsetMap[property.charAt(0)]], this.array[index * this.itemSize + offsetMap[property.charAt(1)]], this.array[index * this.itemSize + offsetMap[property.charAt(2)]], this.array[index * this.itemSize + offsetMap[property.charAt(3)]]);
            }
        }
        return null;
    }
    clone() {
        return new this.constructor(this.array, this.itemSize, true).copy(this);
    }
}
export class Int8BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Int8Array(array), itemSize, normalized);
    }
}
export class Uint8BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Uint8Array(array), itemSize, normalized);
    }
}
export class Uint8ClampedBufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Uint8ClampedArray(array), itemSize, normalized);
    }
}
export class Int16BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Int16Array(array), itemSize, normalized);
    }
}
export class Uint16BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Uint16Array(array), itemSize, normalized);
    }
}
export class Int32BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Int32Array(array), itemSize, normalized);
    }
}
export class Uint32BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Uint32Array(array), itemSize, normalized);
    }
}
export class Float32BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Float32Array(array), itemSize, normalized);
    }
}
export class Float64BufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized) {
        super(new Float64Array(array), itemSize, normalized);
    }
}
