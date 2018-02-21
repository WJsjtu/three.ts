import {TypedArray} from "./BufferAttribute";
import {InterleavedBufferAttribute} from "./InterleavedBufferAttribute";

export class InstancedInterleavedBufferAttribute extends InterleavedBufferAttribute {
    public meshPerAttribute: number = 1;

    constructor(
        array: TypedArray,
        stride: number,
        itemSize: number,
        offset: number,
        normalized: boolean = false,
        meshPerAttribute: number = 1,
    ) {
        super(array, stride, itemSize, offset, normalized);
        this.meshPerAttribute = meshPerAttribute;
    }

    public copy(source: InstancedInterleavedBufferAttribute): this {
        super.copy(source);
        this.meshPerAttribute = source.meshPerAttribute;
        return this;
    }
}
