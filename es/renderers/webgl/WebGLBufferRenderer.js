import { InterleavedBufferAttribute } from "../../core/InterleavedBufferAttribute";
export class WebGLBufferRenderer {
    constructor(context, extensions, infoRender) {
        this.context = null;
        this.extensions = null;
        this.infoRender = null;
        this.mode = 0;
        this.context = context;
        this.extensions = extensions;
        this.infoRender = infoRender;
    }
    setMode(value) {
        this.mode = value;
        return this;
    }
    render(start, count) {
        const gl = this.context;
        gl.drawArrays(this.mode, start, count);
        this.infoRender.calls++;
        this.infoRender.vertices += count;
        if (this.mode === gl.TRIANGLES) {
            this.infoRender.faces += count / 3;
        }
        else if (this.mode === gl.POINTS) {
            this.infoRender.points += count;
        }
        return this;
    }
    renderInstances(geometry, start, count) {
        const gl = this.context;
        const extension = this.extensions.get("ANGLE_instanced_arrays");
        if (extension === null) {
            console.error(`THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.`);
            return this;
        }
        const position = geometry.attributes.position;
        if (position instanceof InterleavedBufferAttribute) {
            count = position.count;
            extension.drawArraysInstancedANGLE(this.mode, 0, count, geometry.maxInstancedCount);
        }
        else {
            extension.drawArraysInstancedANGLE(this.mode, start, count, geometry.maxInstancedCount);
        }
        this.infoRender.calls++;
        this.infoRender.vertices += count * geometry.maxInstancedCount;
        if (this.mode === gl.TRIANGLES) {
            this.infoRender.faces += geometry.maxInstancedCount * count / 3;
        }
        else if (this.mode === gl.POINTS) {
            this.infoRender.points += geometry.maxInstancedCount * count;
        }
        return this;
    }
}
