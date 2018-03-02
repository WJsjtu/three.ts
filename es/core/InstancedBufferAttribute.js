import { BufferAttribute } from "./BufferAttribute";
export class InstancedBufferAttribute extends BufferAttribute {
    constructor(array, itemSize, normalized = false, meshPerAttribute = 1) {
        super(array, itemSize, normalized);
        this.meshPerAttribute = 1;
        this.meshPerAttribute = meshPerAttribute;
    }
    copy(source) {
        super.copy(source);
        this.meshPerAttribute = source.meshPerAttribute;
        return this;
    }
}
