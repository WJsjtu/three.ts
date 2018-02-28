import { MathUtil } from "../math/Math";
import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { IBufferRange, TypedArray } from "./BufferAttribute";

export class InterleavedBufferAttribute {
    public readonly uuid: string = MathUtil.generateUUID();

    public array: TypedArray = undefined;
    public stride: number = 1;
    public count: number = 0;
    public dynamic: boolean = false;
    public updateRange: IBufferRange = { offset: 0, count: -1 };
    public version: number = 0;

    public itemSize: number;
    public offset: number;
    public normalized: boolean = false;

    constructor(array: TypedArray, stride: number, itemSize: number, offset: number, normalized: boolean = false) {
        this.array = array;
        this.stride = stride;
        this.count = array !== undefined ? array.length / stride : 0;
        this.itemSize = itemSize;
        this.offset = offset;
        this.normalized = normalized;
    }

    set needsUpdate(value: boolean) {
        if (value === true) this.version++;
    }

    public setArray(array: TypedArray): this {
        this.count = array !== undefined ? array.length / this.stride : 0;
        this.array = array;
        return this;
    }

    public setDynamic(value: boolean): this {
        this.dynamic = value;
        return this;
    }

    public copy(source: InterleavedBufferAttribute): this {
        this.array = new ((source.array as any).constructor as new (arg: TypedArray) => TypedArray)(source.array);
        this.stride = source.stride;
        this.count = source.count;
        this.dynamic = source.dynamic;
        return this;
    }

    public set(value: TypedArray | number[], offset: number = 0): this {
        this.array.set(value, offset);
        return this;
    }

    public get(offset: number = 0, length: number = 1): TypedArray {
        return this.array.slice(offset, length);
    }

    public copyAt(index1: number, attribute: InterleavedBufferAttribute, index2: number): this {
        index1 *= this.stride;
        index2 *= attribute.stride;
        for (let i: number = 0, l: number = this.stride; i < l; i++) {
            this.array[index1 + i] = attribute.array[index2 + i];
        }
        return this;
    }

    public clone(): InterleavedBufferAttribute {
        return new (this.constructor as new (array: TypedArray, itemSize: number) => InterleavedBufferAttribute)(
            this.array,
            this.stride,
        ).copy(this);
    }

    public setProperty(index: number, property: string, value: Vector2 | Vector3 | Vector4 | number): this {
        property = property.toLowerCase();
        if (property && property.length <= 4 && property.replace(/[xyzw]/g, "").length === 0) {
            const offsetMap = { x: 0, y: 1, z: 2 };
            if (property.length === 1 && typeof value === "number") {
                this.array[index * this.stride + this.offset + offsetMap[property.charAt(0)]] = value;
            } else if (property.length === 2 && value instanceof Vector2) {
                this.array[index * this.stride + this.offset + offsetMap[property.charAt(0)]] = value.x;
                this.array[index * this.stride + this.offset + offsetMap[property.charAt(1)]] = value.y;
            } else if (property.length === 3 && value instanceof Vector3) {
                this.array[index * this.stride + this.offset + offsetMap[property.charAt(0)]] = value.x;
                this.array[index * this.stride + this.offset + offsetMap[property.charAt(1)]] = value.y;
                this.array[index * this.stride + this.offset + offsetMap[property.charAt(2)]] = value.z;
            } else if (property.length === 4 && value instanceof Vector4) {
                this.array[index * this.stride + this.offset + offsetMap[property.charAt(0)]] = value.x;
                this.array[index * this.stride + this.offset + offsetMap[property.charAt(1)]] = value.y;
                this.array[index * this.stride + this.offset + offsetMap[property.charAt(2)]] = value.z;
                this.array[index * this.stride + this.offset + offsetMap[property.charAt(3)]] = value.w;
            }
        }
        return this;
    }

    public getProperty(index: number, property: string): Vector2 | Vector3 | Vector4 | number | undefined {
        property = property.toLowerCase();
        if (property && property.length <= 4 && property.replace(/[xyzw]/g, "").length === 0) {
            const offsetMap = { x: 0, y: 1, z: 2 };
            if (property.length === 1) {
                return this.array[index * this.stride + this.offset + offsetMap[property.charAt(0)]];
            } else if (property.length === 2) {
                return new Vector2(
                    this.array[index * this.stride + this.offset + offsetMap[property.charAt(0)]],
                    this.array[index * this.stride + this.offset + offsetMap[property.charAt(1)]],
                );
            } else if (property.length === 3) {
                return new Vector3(
                    this.array[index * this.stride + this.offset + offsetMap[property.charAt(0)]],
                    this.array[index * this.stride + this.offset + offsetMap[property.charAt(1)]],
                    this.array[index * this.stride + this.offset + offsetMap[property.charAt(2)]],
                );
            } else if (property.length === 4) {
                return new Vector4(
                    this.array[index * this.stride + this.offset + offsetMap[property.charAt(0)]],
                    this.array[index * this.stride + this.offset + offsetMap[property.charAt(1)]],
                    this.array[index * this.stride + this.offset + offsetMap[property.charAt(2)]],
                    this.array[index * this.stride + this.offset + offsetMap[property.charAt(3)]],
                );
            }
        }
        return undefined;
    }
}
