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
import { WebGLState } from "./webgl/WebGLState.js";
import { Camera } from "../cameras/Camera.js";
import { Fog } from "../scenes/Fog.js";
import { Object3D } from "../core/Object3D.js";
import { Material } from "../materials/Material.js";
import { Geometry } from "../core/Geometry.js";
import { BufferGeometry } from "../core/BufferGeometry.js";
import { IGroup } from "../core/DirectGeometry.js";

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
        geometry: Geometry | BufferGeometry,
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
