import {BufferGeometry} from "./BufferGeometry";
export class InstancedBufferGeometry extends BufferGeometry {
    public readonly type: string = "InstancedBufferGeometry";
    public maxInstancedCount: number;

    public copy(source: InstancedBufferGeometry): this {
        super.copy(source);
        this.maxInstancedCount = source.maxInstancedCount;
        return this;
    }

    public clone(): InstancedBufferGeometry {
        return (new (this
            .constructor as () => void)() as InstancedBufferGeometry).copy(
            this,
        );
    }
}
