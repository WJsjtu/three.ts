import { CubeTexture } from "../../textures/CubeTexture";
import { Texture } from "../../textures/Texture";
import { Vector3 } from "../../math/Vector3";
import { Matrix2 } from "../../math/Matrix2";
import { Matrix3 } from "../../math/Matrix3";
import { Matrix4 } from "../../math/Matrix4";
const emptyTexture = new Texture();
const emptyCubeTexture = new CubeTexture();
class UniformSetter {
    constructor(renderer, id, activeInfo, addr) {
        this.renderer = null;
        this.context = null;
        this.id = null;
        this.addr = 0;
        this.size = 0;
        this.setValue1f = (v) => {
            this.context.uniform1f(this.addr, v);
        };
        this.setValue1i = (v) => {
            this.context.uniform1i(this.addr, v);
        };
        this.setValue2fv = (v) => {
            if (v instanceof Float32Array || Array.isArray(v)) {
                this.context.uniform2fv(this.addr, v);
            }
            else {
                this.context.uniform2f(this.addr, v.x, v.y);
            }
        };
        this.setValue3fv = (v) => {
            if (v instanceof Float32Array || Array.isArray(v)) {
                this.context.uniform3fv(this.addr, v);
            }
            else if (v instanceof Vector3) {
                this.context.uniform3f(this.addr, v.x, v.y, v.z);
            }
            else {
                this.context.uniform3f(this.addr, v.r, v.g, v.b);
            }
        };
        this.setValue4fv = (v) => {
            if (v instanceof Float32Array || Array.isArray(v)) {
                this.context.uniform4fv(this.addr, v);
            }
            else {
                this.context.uniform4f(this.addr, v.x, v.y, v.z, v.w);
            }
        };
        this.setValue2fm = (v) => {
            if (v instanceof Matrix2) {
                UniformSetter.mat2array.set(v.elements);
                this.context.uniformMatrix2fv(this.addr, false, UniformSetter.mat2array);
            }
            else {
                this.context.uniformMatrix2fv(this.addr, false, v);
            }
        };
        this.setValue3fm = (v) => {
            if (v instanceof Matrix3) {
                UniformSetter.mat3array.set(v.elements);
                this.context.uniformMatrix3fv(this.addr, false, UniformSetter.mat3array);
            }
            else {
                this.context.uniformMatrix3fv(this.addr, false, v);
            }
        };
        this.setValue4fm = (v) => {
            if (v instanceof Matrix4) {
                UniformSetter.mat4array.set(v.elements);
                this.context.uniformMatrix4fv(this.addr, false, UniformSetter.mat4array);
            }
            else {
                this.context.uniformMatrix4fv(this.addr, false, v);
            }
        };
        this.setValueT1 = (v) => {
            const unit = this.renderer.allocTextureUnit();
            this.context.uniform1i(this.addr, unit);
            this.renderer.setTexture2D(v || emptyTexture, unit);
        };
        this.setValueT6 = (v) => {
            const unit = this.renderer.allocTextureUnit();
            this.context.uniform1i(this.addr, unit);
            this.renderer.setTextureCube(v || emptyCubeTexture, unit);
        };
        this.setValue2iv = (v) => {
            this.context.uniform2iv(this.addr, v);
        };
        this.setValue3iv = (v) => {
            this.context.uniform3iv(this.addr, v);
        };
        this.setValue4iv = (v) => {
            this.context.uniform4iv(this.addr, v);
        };
        this.setValue1fv = (v) => {
            this.context.uniform1fv(this.addr, v);
        };
        this.setValue1iv = (v) => {
            this.context.uniform1iv(this.addr, v);
        };
        this.setValueV2a = (v) => {
            this.context.uniform2fv(this.addr, UniformSetter.flatten(v, this.size, 2));
        };
        this.setValueV3a = (v) => {
            this.context.uniform3fv(this.addr, UniformSetter.flatten(v, this.size, 3));
        };
        this.setValueV4a = (v) => {
            this.context.uniform4fv(this.addr, UniformSetter.flatten(v, this.size, 4));
        };
        this.setValueM2a = (v) => {
            this.context.uniformMatrix2fv(this.addr, false, UniformSetter.flatten(v, this.size, 4));
        };
        this.setValueM3a = (v) => {
            this.context.uniformMatrix3fv(this.addr, false, UniformSetter.flatten(v, this.size, 9));
        };
        this.setValueM4a = (v) => {
            this.context.uniformMatrix4fv(this.addr, false, UniformSetter.flatten(v, this.size, 16));
        };
        this.setValueT1a = (v) => {
            const n = v.length, units = this.allocTexUnits(n);
            this.context.uniform1iv(this.addr, units);
            for (let i = 0; i !== n; i++) {
                this.renderer.setTexture2D(v[i] || emptyTexture, units[i]);
            }
        };
        this.setValueT6a = (v) => {
            const n = v.length, units = this.allocTexUnits(n);
            this.context.uniform1iv(this.addr, units);
            for (let i = 0; i !== n; i++) {
                this.renderer.setTextureCube(v[i] || emptyCubeTexture, units[i]);
            }
        };
        this.renderer = renderer;
        this.context = renderer.context;
        this.id = id;
        this.activeInfo = activeInfo;
        this.addr = addr;
        this.size = activeInfo.size;
    }
    getSingularSetter() {
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
        throw new Error(`Unknown type for getSingularSetter: ${this.activeInfo.type}`);
    }
    static flatten(array, nBlocks, blockSize) {
        if (array instanceof Float32Array) {
            return array;
        }
        const n = nBlocks * blockSize;
        let r = UniformSetter.arrayCacheF32[n];
        if (r === undefined) {
            r = new Float32Array(n);
            UniformSetter.arrayCacheF32[n] = r;
        }
        if (nBlocks !== 0) {
            for (let i = 0, offset = 0; i !== nBlocks; i++) {
                array[i].toArray(r, offset);
                offset += blockSize;
            }
        }
        return r;
    }
    allocTexUnits(n) {
        let r = UniformSetter.arrayCacheI32[n];
        if (r === undefined) {
            r = new Int32Array(n);
            UniformSetter.arrayCacheI32[n] = r;
        }
        for (let i = 0; i !== n; i++) {
            r[i] = this.renderer.allocTextureUnit();
        }
        return r;
    }
    getPureArraySetter() {
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
        throw new Error(`Unknown type for getSingularSetter: ${this.activeInfo.type}`);
    }
}
UniformSetter.mat2array = new Float32Array(4);
UniformSetter.mat3array = new Float32Array(9);
UniformSetter.mat4array = new Float32Array(16);
UniformSetter.arrayCacheF32 = [];
UniformSetter.arrayCacheI32 = [];
class SingleUniformSetter extends UniformSetter {
    setValue(value) {
        return super.getSingularSetter()(value);
    }
}
class PureArrayUniformSetter extends UniformSetter {
    setValue(value) {
        return super.getPureArraySetter()(value);
    }
}
class UniformContainer {
    constructor() {
        this.seq = [];
        this.map = {};
    }
}
class StructuredUniformSetter extends UniformContainer {
    constructor(id) {
        super();
        this.id = null;
        this.id = id;
    }
    setValue(value) {
        // Note: Don't need an extra 'renderer' parameter, since samplers
        // are not allowed in structured uniforms.
        for (let i = 0, n = this.seq.length; i !== n; i++) {
            const u = this.seq[i];
            const v = value[u.id];
            /**
             * Well the following is the actually type logic...
             * if(u instanceof StructuredUniformSetter) {
             *     u.setValue(v as {[key: string]: AllUniformType;});
             * } else {
             *     u.setValue(v as AllUniformType);
             * }
             */
            u.setValue(v);
        }
    }
}
const RePathPart = /([\w\d_]+)(\])?(\[|\.)?/g;
// extracts
// 	- the identifier (member name or array index)
//  - followed by an optional right bracket (found when array index)
//  - followed by an optional left bracket or dot (type of subscript)
//
// Note: These portions can be read in a non-overlapping fashion and
// allow straightforward parsing of the hierarchy that WebGL encodes
// in the uniform names.
export class WebGLUniformsWrapper extends UniformContainer {
    constructor(renderer, program) {
        super();
        this.renderer = null;
        this.program = null;
        this.renderer = renderer;
        this.program = program;
        const gl = this.renderer.context;
        const n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < n; ++i) {
            const info = gl.getActiveUniform(program, i), path = info.name, addr = gl.getUniformLocation(program, path);
            this.parseUniform(info, addr, this);
        }
    }
    static addUniform(container, uniformObject) {
        container.seq.push(uniformObject);
        container.map[uniformObject.id] = uniformObject;
    }
    parseUniform(activeInfo, addr, container) {
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
        const path = activeInfo.name;
        const pathLength = path.length;
        // reset RegExp object, because of the early exit of a previous run
        RePathPart.lastIndex = 0;
        for (;;) {
            const match = RePathPart.exec(path);
            const matchEnd = RePathPart.lastIndex;
            let id = match[1];
            const idIsIndex = match[2] === "]";
            const subscript = match[3];
            if (idIsIndex)
                id = parseInt(id, 10); // convert to integer
            if (subscript === undefined ||
                (subscript === "[" && matchEnd + 2 === pathLength)) {
                // bare name or "pure" bottom-level array "[0]" suffix
                WebGLUniformsWrapper.addUniform(container, subscript === undefined
                    ? new SingleUniformSetter(this.renderer, id, activeInfo, addr)
                    : new PureArrayUniformSetter(this.renderer, id, activeInfo, addr));
                break;
            }
            else {
                // step into inner node / create it in case it doesn't exist
                const map = container.map;
                let next = map[id];
                if (next === undefined) {
                    next = new StructuredUniformSetter(id);
                    WebGLUniformsWrapper.addUniform(container, next);
                }
                container = next;
            }
        }
    }
    setValue(name, value) {
        const u = this.map[name];
        if (u !== undefined) {
            u.setValue(value);
        }
    }
    setOptional(object, name) {
        const v = object[name];
        if (v !== undefined) {
            this.setValue(name, v);
        }
    }
    static upload(seq, values) {
        for (let i = 0, n = seq.length; i !== n; i++) {
            const u = seq[i], v = values[u.id];
            if (v.needsUpdate !== false) {
                // note: always updating when .needsUpdate is undefined
                u.setValue(v.value);
            }
        }
    }
    static seqWithValue(seq, values) {
        const r = [];
        for (let i = 0, n = seq.length; i !== n; i++) {
            const u = seq[i];
            if (u.id in values)
                r.push(u);
        }
        return r;
    }
}
