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
import { IUniform } from "../shaders/UniformsUtils";

export type ArrayUniformSource =
    | Vector2[]
    | Vector3[]
    | Vector4[]
    | Matrix2[]
    | Matrix3[]
    | Matrix4[]
    | Float32Array;

export type AllUniformType =
    | number
    | Color
    | Vector2
    | Vector3
    | Vector4
    | Matrix2
    | Matrix3
    | Matrix4
    | Int32Array
    | Texture
    | CubeTexture
    | ArrayUniformSource
    | number[]
    | Texture[]
    | CubeTexture[];

const emptyTexture: Texture = new Texture();
const emptyCubeTexture: CubeTexture = new CubeTexture();

class UniformSetter {
    public static mat2array: Float32Array = new Float32Array(4);
    public static mat3array: Float32Array = new Float32Array(9);
    public static mat4array: Float32Array = new Float32Array(16);

    public renderer: WebGLRenderer = null;
    public context: WebGLRenderingContext = null;
    public id: number | string = null;
    public activeInfo: WebGLActiveInfo;
    public addr: WebGLUniformLocation = 0;
    public size: number = 0;

    constructor(
        renderer: WebGLRenderer,
        id: number | string,
        activeInfo: WebGLActiveInfo,
        addr: WebGLUniformLocation,
    ) {
        this.renderer = renderer;
        this.context = renderer.context;
        this.id = id;
        this.activeInfo = activeInfo;
        this.addr = addr;
        this.size = activeInfo.size;
    }

    public setValue1f: (arg: AllUniformType) => void = (v: number): void => {
        this.context.uniform1f(this.addr, v);
    };

    public setValue1i: (arg: AllUniformType) => void = (v: number): void => {
        this.context.uniform1i(this.addr, v);
    };

    public setValue2fv: (arg: AllUniformType) => void = (
        v: Vector2 | Float32Array | number[],
    ): void => {
        if (v instanceof Float32Array || Array.isArray(v)) {
            this.context.uniform2fv(this.addr, v);
        } else {
            this.context.uniform2f(this.addr, v.x, v.y);
        }
    };

    public setValue3fv: (arg: AllUniformType) => void = (
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

    public setValue4fv: (arg: AllUniformType) => void = (
        v: Vector4 | Float32Array | number[],
    ): void => {
        if (v instanceof Float32Array || Array.isArray(v)) {
            this.context.uniform4fv(this.addr, v);
        } else {
            this.context.uniform4f(this.addr, v.x, v.y, v.z, v.w);
        }
    };

    public setValue2fm: (arg: AllUniformType) => void = (
        v: Float32Array | number[] | Matrix2,
    ): void => {
        if (v instanceof Matrix2) {
            UniformSetter.mat2array.set(v.elements);
            this.context.uniformMatrix2fv(
                this.addr,
                false,
                UniformSetter.mat2array,
            );
        } else {
            this.context.uniformMatrix2fv(this.addr, false, v);
        }
    };

    public setValue3fm: (arg: AllUniformType) => void = (
        v: Float32Array | number[] | Matrix3,
    ): void => {
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

    public setValue4fm: (arg: AllUniformType) => void = (
        v: Float32Array | number[] | Matrix4,
    ): void => {
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

    public setValueT1: (arg: AllUniformType) => void = (v: Texture): void => {
        const unit: number = this.renderer.allocTextureUnit();
        this.context.uniform1i(this.addr, unit);
        this.renderer.setTexture2D(v || emptyTexture, unit);
    };

    public setValueT6: (arg: AllUniformType) => void = (
        v: CubeTexture,
    ): void => {
        const unit: number = this.renderer.allocTextureUnit();
        this.context.uniform1i(this.addr, unit);
        this.renderer.setTextureCube(v || emptyCubeTexture, unit);
    };

    public setValue2iv: (arg: AllUniformType) => void = (
        v: Int32Array | number[],
    ): void => {
        this.context.uniform2iv(this.addr, v);
    };

    public setValue3iv: (arg: AllUniformType) => void = (
        v: Int32Array | number[],
    ): void => {
        this.context.uniform3iv(this.addr, v);
    };

    public setValue4iv: (arg: AllUniformType) => void = (
        v: Int32Array | number[],
    ): void => {
        this.context.uniform4iv(this.addr, v);
    };

    public getSingularSetter(): (arg: AllUniformType) => void {
        switch (this.activeInfo.type) {
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
        throw new Error(
            `Unknown type for getSingularSetter: ${this.activeInfo.type}`,
        );
    }

    public setValue1fv: (arg: AllUniformType) => void = (
        v: Float32Array | number[],
    ) => {
        this.context.uniform1fv(this.addr, v);
    };

    public setValue1iv: (arg: AllUniformType) => void = (
        v: Int32Array | number[],
    ) => {
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

    public setValueV2a: (arg: AllUniformType) => void = (v: Vector2[]) => {
        this.context.uniform2fv(
            this.addr,
            UniformSetter.flatten(v, this.size, 2),
        );
    };

    public setValueV3a: (arg: AllUniformType) => void = (v: Vector3[]) => {
        this.context.uniform3fv(
            this.addr,
            UniformSetter.flatten(v, this.size, 3),
        );
    };

    public setValueV4a: (arg: AllUniformType) => void = (v: Vector4[]) => {
        this.context.uniform4fv(
            this.addr,
            UniformSetter.flatten(v, this.size, 4),
        );
    };

    public setValueM2a: (arg: AllUniformType) => void = (v: Matrix2[]) => {
        this.context.uniformMatrix2fv(
            this.addr,
            false,
            UniformSetter.flatten(v, this.size, 4),
        );
    };

    public setValueM3a: (arg: AllUniformType) => void = (v: Matrix3[]) => {
        this.context.uniformMatrix3fv(
            this.addr,
            false,
            UniformSetter.flatten(v, this.size, 9),
        );
    };

    public setValueM4a: (arg: AllUniformType) => void = (v: Matrix4[]) => {
        this.context.uniformMatrix4fv(
            this.addr,
            false,
            UniformSetter.flatten(v, this.size, 16),
        );
    };

    public setValueT1a: (arg: AllUniformType) => void = (v: Texture[]) => {
        const n: number = v.length,
            units: Int32Array = this.allocTexUnits(n);
        this.context.uniform1iv(this.addr, units);
        for (let i: number = 0; i !== n; i++) {
            this.renderer.setTexture2D(v[i] || emptyTexture, units[i]);
        }
    };

    public setValueT6a: (arg: AllUniformType) => void = (v: CubeTexture[]) => {
        const n: number = v.length,
            units: Int32Array = this.allocTexUnits(n);
        this.context.uniform1iv(this.addr, units);
        for (let i: number = 0; i !== n; i++) {
            this.renderer.setTextureCube(v[i] || emptyCubeTexture, units[i]);
        }
    };

    public getPureArraySetter(): (arg: AllUniformType) => void {
        switch (this.activeInfo.type) {
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
        throw new Error(
            `Unknown type for getSingularSetter: ${this.activeInfo.type}`,
        );
    }
}

class SingleUniformSetter extends UniformSetter {
    public setValue(value: AllUniformType) {
        return super.getSingularSetter()(value);
    }
}

class PureArrayUniformSetter extends UniformSetter {
    public setValue(value: AllUniformType) {
        return super.getPureArraySetter()(value);
    }
}

export type UniformSetterType =
    | SingleUniformSetter
    | PureArrayUniformSetter
    | StructuredUniformSetter;

class UniformContainer {
    public seq: UniformSetterType[] = [];
    public map: { [key: string]: UniformSetterType } = Object.create(null);
}

type AllUniformTypeObject = { [key: string]: AllUniformType };

export type NestUniformType =
    | AllUniformType
    | AllUniformTypeObject
    | { [key: string]: AllUniformTypeObject };

class StructuredUniformSetter extends UniformContainer {
    public id: number | string = null;

    constructor(id: number | string) {
        super();
        this.id = id;
    }

    public setValue(value: NestUniformType) {
        // Note: Don't need an extra 'renderer' parameter, since samplers
        // are not allowed in structured uniforms.
        for (let i: number = 0, n: number = this.seq.length; i !== n; i++) {
            const u: UniformSetterType = this.seq[i];
            const v: AllUniformType | { [key: string]: AllUniformType } =
                value[u.id as string];
            /**
             * Well the following is the actually type logic...
             * if(u instanceof StructuredUniformSetter) {
             *     u.setValue(v as {[key: string]: AllUniformType;});
             * } else {
             *     u.setValue(v as AllUniformType);
             * }
             */
            (u as any).setValue(v);
        }
    }
}

const RePathPart: RegExp = /([\w\d_]+)(\])?(\[|\.)?/g;

// extracts
// 	- the identifier (member name or array index)
//  - followed by an optional right bracket (found when array index)
//  - followed by an optional left bracket or dot (type of subscript)
//
// Note: These portions can be read in a non-overlapping fashion and
// allow straightforward parsing of the hierarchy that WebGL encodes
// in the uniform names.

class WebGLUniforms extends UniformContainer {
    public renderer: WebGLRenderer = null;
    public program: WebGLProgram = null;

    constructor(renderer: WebGLRenderer, program: WebGLProgram) {
        super();
        this.renderer = renderer;
        this.program = program;
        const gl = this.renderer.context;
        const n: number = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i: number = 0; i < n; ++i) {
            const info: WebGLActiveInfo = gl.getActiveUniform(program, i),
                path: string = info.name,
                addr: WebGLUniformLocation = gl.getUniformLocation(
                    program,
                    path,
                );
            this.parseUniform(info, addr, this);
        }
    }

    protected static addUniform(
        container: UniformContainer,
        uniformObject: UniformSetterType,
    ): void {
        container.seq.push(uniformObject);
        container.map[uniformObject.id as string] = uniformObject;
    }

    protected parseUniform(
        activeInfo: WebGLActiveInfo,
        addr: WebGLUniformLocation,
        container: UniformContainer,
    ): void {
        /**
         * Hard to explain, take an example.
         * When there is a single basic type uniform the typeInfo will be [\d\w_]+
         * and when there is an array of basic type uniform the typeInfo will be [\d\w_]+[0]
         * So this is how matchEnd + 2 === pathLength works
         *
         * when path is "spotLights[0].direction"
         * the first match will get [ "spotLights[", "spotLights", undefined, "[" ] lastIndex == 11
         * This round the regex first get matchEnd + 2 !== pathLength, then we can get this is a
         * StructuredUniformSetter, So all the thing dealing in else bracket is about StructuredUniformSetter
         * The Setter from the map is sure to be StructuredUniformSetter.
         * So we use as StructuredUniformSetter
         */
        const path: string = activeInfo.name;
        const pathLength: number = path.length;
        // reset RegExp object, because of the early exit of a previous run
        RePathPart.lastIndex = 0;
        for (;;) {
            const match: RegExpExecArray | null = RePathPart.exec(path);
            const matchEnd: number = RePathPart.lastIndex;
            let id: string | number = match[1];
            const idIsIndex: boolean = match[2] === "]";
            const subscript: string = match[3];
            if (idIsIndex) id = parseInt(id, 10); // convert to integer
            if (
                subscript === undefined ||
                (subscript === "[" && matchEnd + 2 === pathLength)
            ) {
                // bare name or "pure" bottom-level array "[0]" suffix
                WebGLUniforms.addUniform(
                    container,
                    subscript === undefined
                        ? new SingleUniformSetter(
                              this.renderer,
                              id,
                              activeInfo,
                              addr,
                          )
                        : new PureArrayUniformSetter(
                              this.renderer,
                              id,
                              activeInfo,
                              addr,
                          ),
                );
                break;
            } else {
                // step into inner node / create it in case it doesn't exist
                const map: { [key: string]: UniformSetterType } = container.map;
                let next: StructuredUniformSetter = map[
                    id
                ] as StructuredUniformSetter;
                if (next === undefined) {
                    next = new StructuredUniformSetter(id);
                    WebGLUniforms.addUniform(container, next);
                }
                container = next;
            }
        }
    }

    public setValue(name: string, value: NestUniformType): void {
        const u: UniformSetterType = this.map[name];
        if (u !== undefined) {
            (u as any).setValue(value);
        }
    }

    public setOptional(
        object: { [key: string]: NestUniformType },
        name: string,
    ): void {
        const v: NestUniformType = object[name];
        if (v !== undefined) {
            this.setValue(name, v);
        }
    }

    public static upload(
        seq: UniformSetterType[],
        values: { [key: string]: IUniform },
    ) {
        for (let i: number = 0, n: number = seq.length; i !== n; i++) {
            const u: UniformSetterType = seq[i],
                v = values[u.id];
            if (v.needsUpdate !== false) {
                // note: always updating when .needsUpdate is undefined
                (u as any).setValue(v.value);
            }
        }
    }

    public static seqWithValue(
        seq: UniformSetterType[],
        values: { [key: string]: any },
    ): UniformSetterType[] {
        const r: UniformSetterType[] = [];
        for (let i: number = 0, n: number = seq.length; i !== n; i++) {
            const u: UniformSetterType = seq[i];
            if (u.id in values) r.push(u);
        }
        return r;
    }
}
