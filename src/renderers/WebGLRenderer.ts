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
} from "../constants";
import { Texture } from "../textures/Texture";
import { CubeTexture } from "../textures/CubeTexture";
import { WebGLRenderTarget } from "./WebGLRenderTarget";
import { WebGLShadowMap } from "./webgl/WebGLShadowMap";
import { WebGLState } from "./webgl/WebGLState";
import { Camera } from "../cameras/Camera";
import { Fog } from "../scenes/Fog";
import { Object3D } from "../core/Object3D";
import { Material } from "../materials/Material";
import { Geometry } from "../core/Geometry";
import { BufferGeometry } from "../core/BufferGeometry";
import { IGroup } from "../core/DirectGeometry";
import { IUniform } from "./shaders/UniformsUtils";

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
    uniforms: { [key: string]: IUniform };
    vertexShader: string;
    fragmentShader: string;
}

export class WebGLRenderer {
    public context: WebGLRenderingContext = null;
    public gammaInput: boolean;
    public gammaFactor: number;
    public gammaOutput: boolean;
    public localClippingEnabled: boolean = false;
    public maxMorphNormals: number;
    public maxMorphTargets: number;
    public physicallyCorrectLights: boolean = false;
    public shadowMap: WebGLShadowMap;
    public toneMapping: number = LinearToneMapping;
    public state: WebGLState;

    protected currentRendererTarget: WebGLRenderTarget;

    public allocTextureUnit(): number {
        return 0;
    }

    public renderBufferDirect(
        camera: Camera,
        fog: Fog,
        geometry: BufferGeometry,
        material: Material,
        object: Object3D,
        group: IGroup,
    ): void {}

    public setTexture2D(texture: Texture, unit: number) {}

    public setTextureCube(cubeTexture: CubeTexture, unit: number) {}

    public getRenderTarget(): WebGLRenderTarget {
        return this.currentRendererTarget;
    }

    public setRenderTarget(currentRendererTarget: WebGLRenderTarget): void {}

    public clear(): void {}
}
