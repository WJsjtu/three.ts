import { CubeTexture } from "../../textures/CubeTexture";
import { Texture } from "../../textures/Texture";
import { Vector2 } from "../../math/Vector2";
import { Vector3 } from "../../math/Vector3";
import { Color } from "../../math/Color";
import { Vector4 } from "../../math/Vector4";
import { Matrix2 } from "../../math/Matrix2";
import { Matrix3 } from "../../math/Matrix3";
import { Matrix4 } from "../../math/Matrix4";
import { WebGLRenderer } from "../WebGLRenderer";

class UniformContainer {
    public seq: SingleUniformSetter[]| PureArrayUniformSetter[] | StructuredUniformSetter[] = [];
    public map = {};
}

// --- Utilities ---

// Array Caches (provide typed arrays for temporary by size)

// Texture unit allocation

export type ArrayUniformSource =
    | Vector2[]
    | Vector3[]
    | Vector4[]
    | Matrix2[]
    | Matrix3[]
    | Matrix4[]
    | Float32Array;

const emptyTexture: Texture = new Texture();
const emptyCubeTexture: CubeTexture = new CubeTexture();

class UniformSetter {
    public static mat3array: Float32Array = new Float32Array(9);
    public static mat4array: Float32Array = new Float32Array(16);

    public renderer: WebGLRenderer = null;
    public context: WebGLRenderingContext = null;
    public id: number = 0;
    public activeInfo: any;
    public addr: WebGLUniformLocation = 0;
    public size: number = 0;

    constructor(
        renderer: WebGLRenderer,
        id: number,
        activeInfo: any,
        addr: WebGLUniformLocation,
        size: number,
    ) {
        this.renderer = renderer;
        this.context = renderer.context;
        this.id = id;
        this.activeInfo = activeInfo;
        this.addr = addr;
        this.size = size;
    }

    public setValue1f = (v: number): void => {
        this.context.uniform1f(this.addr, v);
    };

    public setValue1i = (v: number): void => {
        this.context.uniform1i(this.addr, v);
    };

    public setValue2fv = (v: Vector2 | Float32Array | number[]): void => {
        if (v instanceof Float32Array || Array.isArray(v)) {
            this.context.uniform2fv(this.addr, v);
        } else {
            this.context.uniform2f(this.addr, v.x, v.y);
        }
    };

    public setValue3fv = (
        v: Vector3 | Float32Array | number[] | Color,
    ): void => {
        if (v instanceof Float32Array || Array.isArray(v)) {
            this.context.uniform3fv(this.addr, v);
        } else if (v instanceof Vector3) {
            this.context.uniform3f(this.addr, v.x, v.y, v.z);
        } else {
            this.context.uniform3f(this.addr, v.r, v.g, v.b);
        }
    };

    public setValue4fv = (v: Vector4 | Float32Array | number[]): void => {
        if (v instanceof Float32Array || Array.isArray(v)) {
            this.context.uniform4fv(this.addr, v);
        } else {
            this.context.uniform4f(this.addr, v.x, v.y, v.z, v.w);
        }
    };

    public setValue2fm = (v: Float32Array | number[]): void => {
        this.context.uniformMatrix2fv(this.addr, false, v);
    };

    public setValue3fm = (v: Float32Array | number[] | Matrix3): void => {
        if (v instanceof Matrix3) {
            UniformSetter.mat3array.set(v.elements);
            this.context.uniformMatrix3fv(
                this.addr,
                false,
                UniformSetter.mat3array,
            );
        } else {
            this.context.uniformMatrix3fv(this.addr, false, v);
        }
    };

    public setValue4fm = (v: Float32Array | number[] | Matrix4): void => {
        if (v instanceof Matrix4) {
            UniformSetter.mat4array.set(v.elements);
            this.context.uniformMatrix4fv(
                this.addr,
                false,
                UniformSetter.mat4array,
            );
        } else {
            this.context.uniformMatrix4fv(this.addr, false, v);
        }
    };

    public setValueT1 = (v: Texture): void => {
        const unit: number = this.renderer.allocTextureUnit();
        this.context.uniform1i(this.addr, unit);
        this.renderer.setTexture2D(v || emptyTexture, unit);
    };

    public setValueT6 = (v: CubeTexture): void => {
        const unit: number = this.renderer.allocTextureUnit();
        this.context.uniform1i(this.addr, unit);
        this.renderer.setTextureCube(v || emptyCubeTexture, unit);
    };

    public setValue2iv = (v: Int32Array | number[]): void => {
        this.context.uniform2iv(this.addr, v);
    };

    public setValue3iv = (v: Int32Array | number[]): void => {
        this.context.uniform3iv(this.addr, v);
    };

    public setValue4iv = (v: Int32Array | number[]): void => {
        this.context.uniform4iv(this.addr, v);
    };

    public getSingularSetter(type: number) {
        switch (type) {
            case 0x1406:
                return this.setValue1f; // FLOAT
            case 0x8b50:
                return this.setValue2fv; // _VEC2
            case 0x8b51:
                return this.setValue3fv; // _VEC3
            case 0x8b52:
                return this.setValue4fv; // _VEC4

            case 0x8b5a:
                return this.setValue2fm; // _MAT2
            case 0x8b5b:
                return this.setValue3fm; // _MAT3
            case 0x8b5c:
                return this.setValue4fm; // _MAT4

            case 0x8b5e:
            case 0x8d66:
                return this.setValueT1; // SAMPLER_2D, SAMPLER_EXTERNAL_OES
            case 0x8b60:
                return this.setValueT6; // SAMPLER_CUBE

            case 0x1404:
            case 0x8b56:
                return this.setValue1i; // INT, BOOL
            case 0x8b53:
            case 0x8b57:
                return this.setValue2iv; // _VEC2
            case 0x8b54:
            case 0x8b58:
                return this.setValue3iv; // _VEC3
            case 0x8b55:
            case 0x8b59:
                return this.setValue4iv; // _VEC4
        }
        throw new Error(`Unknown type for getSingularSetter: ${type}`);
    }

    public setValue1fv = (v: Float32Array | number[]) => {
        this.context.uniform1fv(this.addr, v);
    };

    public setValue1iv = (v: Int32Array | number[]) => {
        this.context.uniform1iv(this.addr, v);
    };

    public static arrayCacheF32: Float32Array[] = [];
    public static arrayCacheI32: Int32Array[] = [];

    public static flatten(
        array: ArrayUniformSource,
        nBlocks: number,
        blockSize: number,
    ): Float32Array {
        if (array instanceof Float32Array) {
            return array;
        }
        const n: number = nBlocks * blockSize;
        let r: Float32Array = UniformSetter.arrayCacheF32[n];
        if (r === undefined) {
            r = new Float32Array(n);
            UniformSetter.arrayCacheF32[n] = r;
        }
        if (nBlocks !== 0) {
            for (let i: number = 0, offset: number = 0; i !== nBlocks; i++) {
                array[i].toArray(r, offset);
                offset += blockSize;
            }
        }
        return r;
    }

    public allocTexUnits(n: number): Int32Array {
        let r: Int32Array = UniformSetter.arrayCacheI32[n];
        if (r === undefined) {
            r = new Int32Array(n);
            UniformSetter.arrayCacheI32[n] = r;
        }
        for (let i: number = 0; i !== n; i++) {
            r[i] = this.renderer.allocTextureUnit();
        }
        return r;
    }

    public setValueV2a = (v: Vector2[]) => {
        this.context.uniform2fv(
            this.addr,
            UniformSetter.flatten(v, this.size, 2),
        );
    };

    public setValueV3a = (v: Vector3[]) => {
        this.context.uniform3fv(
            this.addr,
            UniformSetter.flatten(v, this.size, 3),
        );
    };

    public setValueV4a = (v: Vector3[]) => {
        this.context.uniform4fv(
            this.addr,
            UniformSetter.flatten(v, this.size, 4),
        );
    };

    public setValueM2a = (v: Matrix2[]) => {
        this.context.uniformMatrix2fv(
            this.addr,
            false,
            UniformSetter.flatten(v, this.size, 4),
        );
    };

    public setValueM3a = (v: Matrix3[]) => {
        this.context.uniformMatrix3fv(
            this.addr,
            false,
            UniformSetter.flatten(v, this.size, 9),
        );
    };

    public setValueM4a = (v: Matrix4[]) => {
        this.context.uniformMatrix4fv(
            this.addr,
            false,
            UniformSetter.flatten(v, this.size, 16),
        );
    };

    public setValueT1a = (v: Texture[]) => {
        const n: number = v.length,
            units: Int32Array = this.allocTexUnits(n);
        this.context.uniform1iv(this.addr, units);
        for (let i: number = 0; i !== n; i++) {
            this.renderer.setTexture2D(v[i] || emptyTexture, units[i]);
        }
    };

    public setValueT6a = (v: CubeTexture[]) => {
        const n: number = v.length,
            units: Int32Array = this.allocTexUnits(n);
        this.context.uniform1iv(this.addr, units);
        for (let i: number = 0; i !== n; i++) {
            this.renderer.setTextureCube(v[i] || emptyCubeTexture, units[i]);
        }
    };

    public getPureArraySetter(type: number) {
        switch (type) {
            case 0x1406:
                return this.setValue1fv; // FLOAT
            case 0x8b50:
                return this.setValueV2a; // _VEC2
            case 0x8b51:
                return this.setValueV3a; // _VEC3
            case 0x8b52:
                return this.setValueV4a; // _VEC4

            case 0x8b5a:
                return this.setValueM2a; // _MAT2
            case 0x8b5b:
                return this.setValueM3a; // _MAT3
            case 0x8b5c:
                return this.setValueM4a; // _MAT4

            case 0x8b5e:
                return this.setValueT1a; // SAMPLER_2D
            case 0x8b60:
                return this.setValueT6a; // SAMPLER_CUBE

            case 0x1404:
            case 0x8b56:
                return this.setValue1iv; // INT, BOOL
            case 0x8b53:
            case 0x8b57:
                return this.setValue2iv; // _VEC2
            case 0x8b54:
            case 0x8b58:
                return this.setValue3iv; // _VEC3
            case 0x8b55:
            case 0x8b59:
                return this.setValue4iv; // _VEC4
        }
        throw new Error(`Unknown type for getSingularSetter: ${type}`);
    }
}

class SingleUniformSetter extends UniformSetter {
    public setValue() {
        return super.getSingularSetter(this.activeInfo.type);
    }
}

class PureArrayUniformSetter extends UniformSetter {
    public setValue() {
        return super.getPureArraySetter(this.activeInfo.type);
    }
}

class StructuredUniformSetter extends UniformContainer {

    public id: number = 0;
    public context:WebGLRenderingContext = null;

    constructor(id: number, context:WebGLRenderingContext) {
        super();
        this.id = id;
        this.context = context;
    }

    public setValue(value) {
        // Note: Don't need an extra 'renderer' parameter, since samplers
        // are not allowed in structured uniforms.
        for ( let i: number = 0, n: number = this.seq.length; i !== n;  i++ ) {
            var u = this.seq[ i ];
            u.setValue(value[ u.id ] );
        }
    }
}

const RePathPart: RegExp = /([\w\d_]+)(\])?(\[|\.)?/g;
