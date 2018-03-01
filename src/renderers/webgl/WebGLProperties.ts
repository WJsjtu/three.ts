import { IShader } from "../WebGLRenderer";
import { WebGLProgramWrapper } from "./WebGLProgram";
import { UniformSetterType } from "./WebGLUniforms";
import { Object3D } from "../../core/Object3D";
import { Material } from "../../materials/Material";
import { Texture } from "../../textures/Texture";
import { WebGLRenderTarget } from "../WebGLRenderTarget";
import { WebGLRenderTargetCube } from "../WebGLRenderTargetCube";
import { Fog } from "../../scenes/Fog";
import { FogExp2 } from "../../scenes/FogExp2";

export interface ITextureProperties {
    __version?: number;
    __webglInit?: boolean;
    __webglTexture?: WebGLTexture;
    __image__webglTextureCube?: WebGLTexture;
    __currentAnisotropy?: any;
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
    clippingState?: Float32Array | null;
    fog?: Fog | FogExp2;
}

export interface IImmediateRenderObjectProperties {
    position?: WebGLBuffer;
    normal?: WebGLBuffer;
    uv?: WebGLBuffer;
    color?: WebGLBuffer;
}

export type WebGLPropertiesType =
    | IImmediateRenderObjectProperties
    | IMaterialProperties
    | ITextureProperties
    | IRenderTargetProperties
    | IRenderTargetCubeProperties;

export class WebGLProperties {
    protected properties: { [key: string]: WebGLPropertiesType } = {};

    public get(object: Object3D): IImmediateRenderObjectProperties;
    public get(object: Material): IMaterialProperties;
    public get(object: Texture): ITextureProperties;
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

    public remove(object: Object3D | Material | Texture | WebGLRenderTarget | WebGLRenderTargetCube): void {
        delete this.properties[object.uuid];
    }

    public dispose(): void {
        this.properties = {};
    }
}
