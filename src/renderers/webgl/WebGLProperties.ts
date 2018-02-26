import { IShader } from "../WebGLRenderer";
import { WebGLProgramWrapper } from "./WebGLProgram";
import { UniformSetterType } from "./WebGLUniforms";
import { Object3D } from "../../core/Object3D";
import { Material } from "../../materials/Material";
import { Texture } from "../../textures/Texture";
import { CubeTexture } from "../../textures/CubeTexture";
import { WebGLRenderTarget } from "../WebGLRenderTarget";
import { WebGLRenderTargetCube } from "../WebGLRenderTargetCube";

export interface ITexture2DProperties {
    __webglInit?: boolean;
    __webglTexture?: WebGLTexture;
}

export interface ITextureCubeProperties {
    __image__webglTextureCube?: WebGLTexture;
}

export interface IRenderTargetProperties {
    __webglDepthbuffer?: WebGLRenderbuffer;
    __webglFramebuffer?: WebGLFramebuffer;
}

export interface IRenderTargetCubeProperties {
    __webglDepthbuffer?: WebGLRenderbuffer[];
    __webglFramebuffer?: WebGLFramebuffer;
}

export interface IMaterialProperties {
    program?: WebGLProgramWrapper;
    shader?: IShader;
    lightsHash?: string;
    uniformsList?: UniformSetterType[];
    numClippingPlanes?: number;
    numIntersection?: number;
}

export interface IObjectProperties {
    position?: WebGLBuffer;
    normal?: WebGLBuffer;
    uv?: WebGLBuffer;
    color?: WebGLBuffer;
}

export type WebGLPropertiesType =
    | IObjectProperties
    | IMaterialProperties
    | ITexture2DProperties
    | ITextureCubeProperties
    | IRenderTargetProperties
    | IRenderTargetCubeProperties;

export class WebGLProperties {
    protected properties: { [key: string]: WebGLPropertiesType } = {};

    public get(object: Object3D): IObjectProperties;
    public get(object: Material): IMaterialProperties;
    public get(object: Texture): ITexture2DProperties;
    public get(object: CubeTexture): ITextureCubeProperties;
    public get(object: WebGLRenderTarget): IRenderTargetProperties;
    public get(object: WebGLRenderTargetCube): IRenderTargetCubeProperties;
    public get(object: any): WebGLPropertiesType {
        const uuid: string = object.uuid;
        let map: WebGLPropertiesType = this.properties[uuid];
        if (map === undefined) {
            map = {};
            this.properties[uuid] = map;
        }
        return map;
    }

    public remove(
        object:
            | Object3D
            | Material
            | Texture
            | CubeTexture
            | WebGLRenderTarget
            | WebGLRenderTargetCube,
    ): void {
        delete this.properties[object.uuid];
    }

    public dispose(): void {
        this.properties = {};
    }
}
