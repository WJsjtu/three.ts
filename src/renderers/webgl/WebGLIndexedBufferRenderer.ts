import { InstancedBufferGeometry } from "../../core/InstancedBufferGeometry";
import { IInfoRender } from "../WebGLRenderer";
import { IWebGLBufferWrapper } from "./WebGLAttributes";
import { WebGLExtensions } from "./WebGLExtensions";

export class WebGLIndexedBufferRenderer {
    protected context: WebGLRenderingContext = null;
    protected extensions: WebGLExtensions = null;
    protected infoRender: IInfoRender = null;

    protected mode: number = 0;
    protected type: number = 0;
    protected bytesPerElement: number = 0;

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

    public setIndex(value: IWebGLBufferWrapper): this {
        this.type = value.type;
        this.bytesPerElement = value.bytesPerElement;
        return this;
    }

    public render(start: number, count: number): this {
        const gl: WebGLRenderingContext = this.context;
        gl.drawElements(
            this.mode,
            count,
            this.type,
            start * this.bytesPerElement,
        );

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
        extension.drawElementsInstancedANGLE(
            this.mode,
            count,
            this.type,
            start * this.bytesPerElement,
            geometry.maxInstancedCount,
        );

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
