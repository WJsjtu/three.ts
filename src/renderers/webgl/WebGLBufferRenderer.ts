import { BufferAttribute } from "../../core/BufferAttribute";
import { InstancedBufferGeometry } from "../../core/InstancedBufferGeometry";
import { InterleavedBufferAttribute } from "../../core/InterleavedBufferAttribute";
import { IInfoRender } from "../WebGLRenderer";
import { IWebGLBufferWrapper } from "./WebGLAttributes";
import { WebGLExtensions } from "./WebGLExtensions";

export class WebGLBufferRenderer {
    protected context: WebGLRenderingContext = null;
    protected extensions: WebGLExtensions = null;
    protected infoRender: IInfoRender = null;

    protected mode: number = 0;

    constructor(
        context: WebGLRenderingContext,
        extensions: WebGLExtensions,
        infoRender: IInfoRender,
    ) {
        this.context = context;
        this.extensions = extensions;
        this.infoRender = infoRender;
    }

    public setMode(value: number): this {
        this.mode = value;
        return this;
    }

    public render(start: number, count: number): this {
        const gl: WebGLRenderingContext = this.context;
        gl.drawArrays(this.mode, start, count);

        this.infoRender.calls++;
        this.infoRender.vertices += count;

        if (this.mode === gl.TRIANGLES) {
            this.infoRender.faces += count / 3;
        } else if (this.mode === gl.POINTS) {
            this.infoRender.points += count;
        }
        return this;
    }

    public renderInstances(
        geometry: InstancedBufferGeometry,
        start: number,
        count: number,
    ): this {
        const gl: WebGLRenderingContext = this.context;
        const extension: ANGLE_instanced_arrays = this.extensions.get(
            "ANGLE_instanced_arrays",
        );
        if (extension === null) {
            console.error(
                `THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.`,
            );
            return this;
        }
        const position: BufferAttribute = geometry.attributes.position;
        if (position instanceof InterleavedBufferAttribute) {
            count = position.count;
            extension.drawArraysInstancedANGLE(
                this.mode,
                0,
                count,
                geometry.maxInstancedCount,
            );
        } else {
            extension.drawArraysInstancedANGLE(
                this.mode,
                start,
                count,
                geometry.maxInstancedCount,
            );
        }

        this.infoRender.calls++;
        this.infoRender.vertices += count * geometry.maxInstancedCount;

        if (this.mode === gl.TRIANGLES) {
            this.infoRender.faces += geometry.maxInstancedCount * count / 3;
        } else if (this.mode === gl.POINTS) {
            this.infoRender.points += geometry.maxInstancedCount * count;
        }
        return this;
    }
}
