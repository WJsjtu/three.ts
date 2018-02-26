import { BufferGeometry } from "./BufferGeometry";
export class InstancedBufferGeometry extends BufferGeometry {
    constructor() {
        super(...arguments);
        this.type = "InstancedBufferGeometry";
    }
    copy(source) {
        super.copy(source);
        this.maxInstancedCount = source.maxInstancedCount;
        return this;
    }
    clone() {
        return new this
            .constructor().copy(this);
    }
}
