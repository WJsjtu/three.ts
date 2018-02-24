import {
    BufferAttribute,
    IBufferRange,
    TypedArray,
} from "../../core/BufferAttribute";
import { InstancedBufferAttribute } from "../../core/InstancedBufferAttribute";
import { InterleavedBufferAttribute } from "../../core/InterleavedBufferAttribute";
import { InstancedInterleavedBufferAttribute } from "../../core/InstancedInterleavedBufferAttribute";

export interface IWebGLBufferWrapper {
    buffer: WebGLBuffer;
    type: number;
    bytesPerElement: number;
    version: number;
}

export type TypedBufferAttribute =
    | BufferAttribute
    | InstancedBufferAttribute
    | InterleavedBufferAttribute
    | InstancedInterleavedBufferAttribute;

export class WebGLAttributes {
    protected context: WebGLRenderingContext = null;

    protected buffers: { [key: string]: IWebGLBufferWrapper } = {};

    constructor(context: WebGLRenderingContext) {
        this.context = context;
    }

    protected createBuffer(
        attribute: TypedBufferAttribute,
        bufferType: number,
    ): IWebGLBufferWrapper {
        const gl: WebGLRenderingContext = this.context;
        const array: TypedArray = attribute.array;
        const usage: number = attribute.dynamic
            ? gl.DYNAMIC_DRAW
            : gl.STATIC_DRAW;
        const buffer = gl.createBuffer();
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, array, usage);

        // attribute.onUploadCallback();

        let type = gl.FLOAT;

        if (array instanceof Float32Array) {
            type = gl.FLOAT;
        } else if (array instanceof Float64Array) {
            console.warn(
                `THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.`,
            );
        } else if (array instanceof Uint16Array) {
            type = gl.UNSIGNED_SHORT;
        } else if (array instanceof Int16Array) {
            type = gl.SHORT;
        } else if (array instanceof Uint32Array) {
            type = gl.UNSIGNED_INT;
        } else if (array instanceof Int32Array) {
            type = gl.INT;
        } else if (array instanceof Int8Array) {
            type = gl.BYTE;
        } else if (array instanceof Uint8Array) {
            type = gl.UNSIGNED_BYTE;
        }
        return {
            buffer: buffer,
            type: type,
            bytesPerElement: array.BYTES_PER_ELEMENT,
            version: attribute.version,
        };
    }

    protected updateBuffer(
        buffer: WebGLBuffer,
        attribute: TypedBufferAttribute,
        bufferType: number,
    ): this {
        const gl: WebGLRenderingContext = this.context;
        const array: TypedArray = attribute.array;
        const updateRange: IBufferRange = attribute.updateRange;
        gl.bindBuffer(bufferType, buffer);
        if (attribute.dynamic === false) {
            gl.bufferData(bufferType, array, gl.STATIC_DRAW);
        } else if (updateRange.count === -1) {
            // Not using update ranges
            gl.bufferSubData(bufferType, 0, array);
        } else if (updateRange.count === 0) {
            console.error(
                `THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.`,
            );
        } else {
            gl.bufferSubData(
                bufferType,
                updateRange.offset * array.BYTES_PER_ELEMENT,
                array.subarray(
                    updateRange.offset,
                    updateRange.offset + updateRange.count,
                ),
            );
            updateRange.count = -1; // reset range
        }
        return this;
    }

    public get(attribute: TypedBufferAttribute): IWebGLBufferWrapper {
        return this.buffers[attribute.uuid];
    }

    public remove(attribute: TypedBufferAttribute): this {
        const data = this.buffers[attribute.uuid];
        if (data) {
            const gl: WebGLRenderingContext = this.context;
            gl.deleteBuffer(data.buffer);
            delete this.buffers[attribute.uuid];
        }
        return this;
    }

    public update(attribute: TypedBufferAttribute, bufferType: number): this {
        const data = this.buffers[attribute.uuid];
        if (data === undefined) {
            this.buffers[attribute.uuid] = this.createBuffer(
                attribute,
                bufferType,
            );
        } else if (data.version < attribute.version) {
            this.updateBuffer(data.buffer, attribute, bufferType);
            data.version = attribute.version;
        }
        return this;
    }
}
