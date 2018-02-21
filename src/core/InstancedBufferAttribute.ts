import {BufferAttribute, TypedArray} from "./BufferAttribute";

export class InstancedBufferAttribute extends BufferAttribute {
    public meshPerAttribute: number = 1;

    constructor(array: TypedArray, itemSize: number, normalized: boolean = false, meshPerAttribute: number = 1) {
        super(array, itemSize, normalized);
        this.meshPerAttribute = meshPerAttribute;
    }

    copy(source: InstancedBufferAttribute): this {
        super.copy(source);
        this.meshPerAttribute = source.meshPerAttribute;
        return this;
    }
}