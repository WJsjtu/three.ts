import {MathUtil} from "../math/Math";
import {Vector2} from "../math/Vector2";
import {Vector3} from "../math/Vector3";
import {Vector4} from "../math/Vector4";
import {Color} from "../math/Color";
import {Face3} from "./Face3";

export interface BufferRange {
    offset: number,
    count: number
}

export type TypedArray = Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;

export class BufferAttribute {
    public readonly uuid: string = MathUtil.generateUUID();
    public name: string = "";
    public array: TypedArray = undefined;
    public itemSize: number = 1;
    public count: number = 0;
    public normalized: boolean = false;
    public dynamic: boolean = false;
    public updateRange: BufferRange = {offset: 0, count: -1};
    public version: number = 0;

    constructor(array: TypedArray, itemSize: number = 0, normalized: boolean = false) {
        this.array = array;
        this.itemSize = itemSize;
        this.count = array !== undefined ? array.length / itemSize : 0;
        this.normalized = normalized;
    }

    set needsUpdate(value: boolean) {
        if (value === true) this.version++;
    }

    public setArray(array: TypedArray): BufferAttribute {
        this.count = array !== undefined ? array.length / this.itemSize : 0;
        this.array = array;
        return this;
    }

    public setDynamic(value: boolean): BufferAttribute {
        this.dynamic = value;
        return this;
    }

    public copy(source: BufferAttribute): BufferAttribute {
        this.array = (new ((source.array as any).constructor as (TypedArray) => void)(source.array)) as TypedArray;
        this.itemSize = source.itemSize;
        this.count = source.count;
        this.normalized = source.normalized;
        this.dynamic = source.dynamic;
        return this;
    }

    public set(value: TypedArray | Array<number>, offset: number = 0): BufferAttribute {
        this.array.set(value, offset);
        return this;
    }

    public get(offset: number = 0, length: number = 1): TypedArray {
        return this.array.slice(offset, length);
    }

    public copyAt(index1: number, attribute: BufferAttribute, index2: number): BufferAttribute {
        index1 *= this.itemSize;
        index2 *= attribute.itemSize;
        for (let i: number = 0, l: number = this.itemSize; i < l; i++) {
            this.array[index1 + i] = attribute.array[index2 + i];
        }
        return this;
    }

    public copyArray(array: TypedArray): BufferAttribute {
        this.array.set(array);
        return this;
    }

    public copyColorsArray(colors: Array<Color>): BufferAttribute {
        const array: TypedArray = this.array;
        let offset: number = 0;
        for (let i: number = 0, l: number = colors.length; i < l; i++) {
            const color: Color = colors[i] || new Color();
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
     public copyIndicesArray(indices: Array<Face3>): BufferAttribute {
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

    public copyVector2sArray(vectors: Array<Vector2>): BufferAttribute {
        const array: TypedArray = this.array;
        let offset: number = 0;
        for (let i: number = 0, l: number = vectors.length; i < l; i++) {
            const vector: Vector2 = vectors[i] || new Vector2();
            array[offset++] = vector.x;
            array[offset++] = vector.y;
        }
        return this;
    }

    public copyVector3sArray(vectors: Array<Vector3>): BufferAttribute {
        const array: TypedArray = this.array;
        let offset: number = 0;
        for (let i: number = 0, l: number = vectors.length; i < l; i++) {
            const vector: Vector3 = vectors[i] || new Vector3();
            array[offset++] = vector.x;
            array[offset++] = vector.y;
            array[offset++] = vector.z;
        }
        return this;
    }

    public copyVector4sArray(vectors: Array<Vector4>): BufferAttribute {
        const array: TypedArray = this.array;
        let offset: number = 0;
        for (let i: number = 0, l: number = vectors.length; i < l; i++) {
            const vector: Vector4 = vectors[i] || new Vector4();
            array[offset++] = vector.x;
            array[offset++] = vector.y;
            array[offset++] = vector.z;
            array[offset++] = vector.w;
        }
        return this;
    }

    public setProperty(index: number, property: string, value: Vector2 | Vector3 | Vector4 | number): BufferAttribute {
        property = property.toLowerCase();
        if (property && property.length <= 4 && property.replace(/[xyzw]/g, "").length === 0) {
            const offsetMap = {x: 0, y: 1, z: 2};
            if (property.length === 1 && typeof value === "number") {
                this.array[index * this.itemSize + offsetMap[property.charAt(0)]] = value;
            } else if (property.length === 2 && value instanceof Vector2) {
                this.array[index * this.itemSize + offsetMap[property.charAt(0)]] = value.x;
                this.array[index * this.itemSize + offsetMap[property.charAt(1)]] = value.y;
            } else if (property.length === 3 && value instanceof Vector3) {
                this.array[index * this.itemSize + offsetMap[property.charAt(0)]] = value.x;
                this.array[index * this.itemSize + offsetMap[property.charAt(1)]] = value.y;
                this.array[index * this.itemSize + offsetMap[property.charAt(2)]] = value.z;
            } else if (property.length === 4 && value instanceof Vector4) {
                this.array[index * this.itemSize + offsetMap[property.charAt(0)]] = value.x;
                this.array[index * this.itemSize + offsetMap[property.charAt(1)]] = value.y;
                this.array[index * this.itemSize + offsetMap[property.charAt(2)]] = value.z;
                this.array[index * this.itemSize + offsetMap[property.charAt(3)]] = value.w;
            }
        }
        return this;
    }

    public getProperty(index: number, property: string): Vector2 | Vector3 | Vector4 | number {
        property = property.toLowerCase();
        if (property && property.length <= 4 && property.replace(/[xyzw]/g, "").length === 0) {
            const offsetMap = {x: 0, y: 1, z: 2};
            if (property.length === 1) {
                return this.array[index * this.itemSize + offsetMap[property.charAt(0)]];
            } else if (property.length === 2) {
                return new Vector2(
                    this.array[index * this.itemSize + offsetMap[property.charAt(0)]],
                    this.array[index * this.itemSize + offsetMap[property.charAt(1)]]
                );
            } else if (property.length === 3) {
                return new Vector3(
                    this.array[index * this.itemSize + offsetMap[property.charAt(0)]],
                    this.array[index * this.itemSize + offsetMap[property.charAt(1)]],
                    this.array[index * this.itemSize + offsetMap[property.charAt(2)]]
                );
            } else if (property.length === 4) {
                return new Vector4(
                    this.array[index * this.itemSize + offsetMap[property.charAt(0)]],
                    this.array[index * this.itemSize + offsetMap[property.charAt(1)]],
                    this.array[index * this.itemSize + offsetMap[property.charAt(2)]],
                    this.array[index * this.itemSize + offsetMap[property.charAt(3)]]
                );
            }
        }
    }

    public clone(): BufferAttribute {
        return ((new (this.constructor as (array: TypedArray, itemSize: number, normalized: boolean) => void)(this.array, this.itemSize, true)) as BufferAttribute).copy(this);
    }
}

export class Int8BufferAttribute extends BufferAttribute {
    constructor(array: Array<number>, itemSize: number, normalized?: boolean) {
        super(new Int8Array(array), itemSize, normalized);
    }
}

export class Uint8BufferAttribute extends BufferAttribute {
    constructor(array: Array<number>, itemSize: number, normalized?: boolean) {
        super(new Uint8Array(array), itemSize, normalized);
    }
}

export class Uint8ClampedBufferAttribute extends BufferAttribute {
    constructor(array: Array<number>, itemSize: number, normalized?: boolean) {
        super(new Uint8ClampedArray(array), itemSize, normalized);
    }
}

export class Int16BufferAttribute extends BufferAttribute {
    constructor(array: Array<number>, itemSize: number, normalized?: boolean) {
        super(new Int16Array(array), itemSize, normalized);
    }
}

export class Uint16BufferAttribute extends BufferAttribute {
    constructor(array: Array<number>, itemSize: number, normalized?: boolean) {
        super(new Uint16Array(array), itemSize, normalized);
    }
}

export class Int32BufferAttribute extends BufferAttribute {
    constructor(array: Array<number>, itemSize: number, normalized?: boolean) {
        super(new Int32Array(array), itemSize, normalized);
    }
}

export class Uint32BufferAttribute extends BufferAttribute {
    constructor(array: Array<number>, itemSize: number, normalized?: boolean) {
        super(new Uint32Array(array), itemSize, normalized);
    }
}

export class Float32BufferAttribute extends BufferAttribute {
    constructor(array: Array<number>, itemSize: number, normalized?: boolean) {
        super(new Float32Array(array), itemSize, normalized);
    }
}

export class Float64BufferAttribute extends BufferAttribute {
    constructor(array: Array<number>, itemSize: number, normalized?: boolean) {
        super(new Float64Array(array), itemSize, normalized);
    }
}

export type TypedBufferAttribute =
    Int8BufferAttribute
    | Uint8BufferAttribute
    | Uint8ClampedBufferAttribute
    | Int16BufferAttribute
    | Uint16BufferAttribute
    | Int32BufferAttribute
    | Uint32BufferAttribute
    | Float32BufferAttribute
    | Float64BufferAttribute;