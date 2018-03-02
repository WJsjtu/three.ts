import { InterleavedBufferAttribute } from "./InterleavedBufferAttribute";
export class InstancedInterleavedBufferAttribute extends InterleavedBufferAttribute {
    constructor(array, stride, itemSize, offset, normalized = false, meshPerAttribute = 1) {
        super(array, stride, itemSize, offset, normalized);
        this.meshPerAttribute = 1;
        this.meshPerAttribute = meshPerAttribute;
    }
    copy(source) {
        super.copy(source);
        this.meshPerAttribute = source.meshPerAttribute;
        return this;
    }
}
