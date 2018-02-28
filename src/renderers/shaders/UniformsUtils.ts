import { Color } from "../../math/Color";
import { Matrix3 } from "../../math/Matrix3";
import { Matrix4 } from "../../math/Matrix4";
import { Vector2 } from "../../math/Vector2";
import { Vector3 } from "../../math/Vector3";
import { Vector4 } from "../../math/Vector4";
import { Texture } from "../../textures/Texture";
import { NestUniformType } from "../webgl/WebGLUniforms";

export interface IUniform {
    value?: NestUniformType | null;
    properties?: object;
    type?: string;
    needsUpdate?: boolean;
}

export class UniformsUtils {
    public static merge(uniforms: Array<{ [key: string]: IUniform }>): { [key: string]: IUniform } {
        const merged: { [key: string]: IUniform } = {};
        for (let u: number = 0; u < uniforms.length; u++) {
            const tmp = this.clone(uniforms[u]);
            for (const p in tmp) {
                if (tmp.hasOwnProperty(p)) {
                    merged[p] = tmp[p];
                }
            }
        }
        return merged;
    }

    public static clone(uniformsSrc: { [key: string]: IUniform }): { [key: string]: IUniform } {
        const uniformsDst: { [key: string]: IUniform } = {};
        for (const u in uniformsSrc) {
            if (!uniformsSrc.hasOwnProperty(u)) continue;
            uniformsDst[u] = {};
            for (const p in uniformsSrc[u]) {
                if (!uniformsSrc[u].hasOwnProperty(p)) continue;
                const parameterSrc = uniformsSrc[u][p];
                if (
                    parameterSrc &&
                    (parameterSrc instanceof Color ||
                        parameterSrc instanceof Matrix3 ||
                        parameterSrc instanceof Matrix4 ||
                        parameterSrc instanceof Vector2 ||
                        parameterSrc instanceof Vector3 ||
                        parameterSrc instanceof Vector4 ||
                        parameterSrc instanceof Texture)
                ) {
                    uniformsDst[u][p] = parameterSrc.clone();
                } else if (Array.isArray(parameterSrc)) {
                    uniformsDst[u][p] = parameterSrc.slice();
                } else {
                    uniformsDst[u][p] = parameterSrc;
                }
            }
        }
        return uniformsDst;
    }
}
