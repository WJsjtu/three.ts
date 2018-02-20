import {InterleavedBufferAttribute} from "./InterleavedBufferAttribute";
import {TypedArray} from "./BufferAttribute";

export class InstancedInterleavedBufferAttribute extends InterleavedBufferAttribute {
    public meshPerAttribute: number = 1;

    constructor(array: TypedArray, stride: number, itemSize: number, offset: number, normalized: boolean = false, meshPerAttribute: number = 1) {
        super(array, stride, itemSize, offset, normalized);
        this.meshPerAttribute = meshPerAttribute;
    }

    copy(source: InstancedInterleavedBufferAttribute): InstancedInterleavedBufferAttribute {
        super.copy(source);
        this.meshPerAttribute = source.meshPerAttribute;
        return this;
    }
}