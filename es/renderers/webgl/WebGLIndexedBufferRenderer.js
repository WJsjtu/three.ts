export class WebGLIndexedBufferRenderer {
    constructor(context, extensions, infoRender) {
        this.context = null;
        this.extensions = null;
        this.infoRender = null;
        this.mode = 0;
        this.type = 0;
        this.bytesPerElement = 0;
        this.context = context;
        this.extensions = extensions;
        this.infoRender = infoRender;
    }
    setMode(value) {
        this.mode = value;
        return this;
    }
    setIndex(value) {
        this.type = value.type;
        this.bytesPerElement = value.bytesPerElement;
        return this;
    }
    render(start, count) {
        const gl = this.context;
        gl.drawElements(this.mode, count, this.type, start * this.bytesPerElement);
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
        extension.drawElementsInstancedANGLE(this.mode, count, this.type, start * this.bytesPerElement, geometry.maxInstancedCount);
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
