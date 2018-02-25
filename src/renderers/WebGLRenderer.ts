import {
    REVISION,
    RGBAFormat,
    HalfFloatType,
    FloatType,
    UnsignedByteType,
    FrontFaceDirectionCW,
    TriangleFanDrawMode,
    TriangleStripDrawMode,
    TrianglesDrawMode,
    NoColors,
    LinearToneMapping,
} from "../constants.js";
import { Texture } from "../textures/Texture";
import { CubeTexture } from "../textures/CubeTexture";
import { WebGLRenderTarget } from "./WebGLRenderTarget";
import { WebGLShadowMap } from "./webgl/WebGLShadowMap";

export interface IInfoMemory {
    geometries: number;
    textures: number;
}

export interface IInfoRender {
    frame: number;
    calls: number;
    vertices: number;
    faces: number;
    points: number;
}

export interface IShader {
    name: string;
    vertexShader: string;
    fragmentShader: string;
}

export class WebGLRenderer {
    public context: WebGLRenderingContext = null;
    public gammaInput: boolean;
    public gammaFactor: number;
    public gammaOutput: boolean;
    public maxMorphNormals: number;
    public maxMorphTargets: number;
    public physicallyCorrectLights: boolean = false;
    public shadowMap: WebGLShadowMap;
    public toneMapping: number = LinearToneMapping;

    protected currentRendererTarget: WebGLRenderTarget;

    public allocTextureUnit(): number {
        return 0;
    }

    public setTexture2D(texture: Texture, unit: number) {}

    public setTextureCube(cubeTexture: CubeTexture, unit: number) {}

    public getRenderTarget(): WebGLRenderTarget {
        return this.currentRendererTarget;
    }
}
