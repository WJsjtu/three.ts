import {Color} from "../../math/Color";
import {Matrix3} from "../../math/Matrix3";
import {Matrix4} from "../../math/Matrix4";
import {Vector2} from "../../math/Vector2";
import {Vector3} from "../../math/Vector3";
import {Vector4} from "../../math/Vector4";
import {Texture} from "../../textures/Texture";

export type BaseUniformType = number | Color | Matrix3 | Matrix4 | Vector2 | Vector3 | Vector4 | Texture;

export type Uniform = {
    value?: BaseUniformType | Array<BaseUniformType>,
    properties?: object,
    type?: string
}

export class UniformsUtils {
    static merge(uniforms: Array<{ [key: string]: Uniform; }>): { [key: string]: Uniform; } {
        const merged: { [key: string]: Uniform; } = {};
        for (let u: number = 0; u < uniforms.length; u++) {
            let tmp = this.clone(uniforms[u]);
            for (let p in tmp) {
                merged[p] = tmp[p];
            }
        }
        return merged;
    }

    static clone(uniforms_src: { [key: string]: Uniform; }): { [key: string]: Uniform; } {
        const uniforms_dst: { [key: string]: Uniform; } = {};
        for (let u in uniforms_src) {
            if (!uniforms_src.hasOwnProperty(u)) continue;
            uniforms_dst[u] = {};
            for (let p in uniforms_src[u]) {
                if (!uniforms_src[u].hasOwnProperty(p)) continue;
                const parameter_src = uniforms_src[u][p];
                if (parameter_src && (
                        (parameter_src instanceof Color) ||
                        (parameter_src instanceof Matrix3) ||
                        (parameter_src instanceof Matrix4) ||
                        (parameter_src instanceof Vector2) ||
                        (parameter_src instanceof Vector3) ||
                        (parameter_src instanceof Vector4) ||
                        (parameter_src instanceof Texture)
                    )
                ) {
                    uniforms_dst[u][p] = parameter_src.clone();
                } else if (Array.isArray(parameter_src)) {
                    uniforms_dst[u][p] = parameter_src.slice();
                } else {
                    uniforms_dst[u][p] = parameter_src;
                }
            }
        }
        return uniforms_dst;
    }
}