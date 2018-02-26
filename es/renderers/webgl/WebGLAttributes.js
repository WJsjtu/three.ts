export class WebGLAttributes {
    constructor(context) {
        this.context = null;
        this.buffers = {};
        this.context = context;
    }
    createBuffer(attribute, bufferType) {
        const gl = this.context;
        const array = attribute.array;
        const usage = attribute.dynamic
            ? gl.DYNAMIC_DRAW
            : gl.STATIC_DRAW;
        const buffer = gl.createBuffer();
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, array, usage);
        // attribute.onUploadCallback();
        let type = gl.FLOAT;
        if (array instanceof Float32Array) {
            type = gl.FLOAT;
        }
        else if (array instanceof Float64Array) {
            console.warn(`THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.`);
        }
        else if (array instanceof Uint16Array) {
            type = gl.UNSIGNED_SHORT;
        }
        else if (array instanceof Int16Array) {
            type = gl.SHORT;
        }
        else if (array instanceof Uint32Array) {
            type = gl.UNSIGNED_INT;
        }
        else if (array instanceof Int32Array) {
            type = gl.INT;
        }
        else if (array instanceof Int8Array) {
            type = gl.BYTE;
        }
        else if (array instanceof Uint8Array) {
            type = gl.UNSIGNED_BYTE;
        }
        return {
            buffer: buffer,
            type: type,
            bytesPerElement: array.BYTES_PER_ELEMENT,
            version: attribute.version,
        };
    }
    updateBuffer(buffer, attribute, bufferType) {
        const gl = this.context;
        const array = attribute.array;
        const updateRange = attribute.updateRange;
        gl.bindBuffer(bufferType, buffer);
        if (attribute.dynamic === false) {
            gl.bufferData(bufferType, array, gl.STATIC_DRAW);
        }
        else if (updateRange.count === -1) {
            // Not using update ranges
            gl.bufferSubData(bufferType, 0, array);
        }
        else if (updateRange.count === 0) {
            console.error(`THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.`);
        }
        else {
            gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array.subarray(updateRange.offset, updateRange.offset + updateRange.count));
            updateRange.count = -1; // reset range
        }
        return this;
    }
    get(attribute) {
        return this.buffers[attribute.uuid];
    }
    remove(attribute) {
        const data = this.buffers[attribute.uuid];
        if (data) {
            const gl = this.context;
            gl.deleteBuffer(data.buffer);
            delete this.buffers[attribute.uuid];
        }
        return this;
    }
    update(attribute, bufferType) {
        const data = this.buffers[attribute.uuid];
        if (data === undefined) {
            this.buffers[attribute.uuid] = this.createBuffer(attribute, bufferType);
        }
        else if (data.version < attribute.version) {
            this.updateBuffer(data.buffer, attribute, bufferType);
            data.version = attribute.version;
        }
        return this;
    }
}
