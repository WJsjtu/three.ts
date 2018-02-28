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
import { Light } from "../lights/Light";
import { Sprite } from "../objects/Sprite";

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

export interface IWebGLRendererParameters {
    canvas?: HTMLCanvasElement;
    context?: WebGLRenderingContext;
    alpha?: boolean;
    depth?: boolean;
    stencil?: boolean;
    antialias?: boolean;
    logarithmicDepthBuffer?: boolean;
    precision?: string;
    premultipliedAlpha?: boolean;
    preserveDrawingBuffer?: boolean;
    powerPreference?: string;
}

export class WebGLRenderer {
    protected alpha: boolean;
    protected depth: boolean;
    protected stencil: boolean;
    protected antialias: boolean;
    protected premultipliedAlpha: boolean;
    protected preserveDrawingBuffer: boolean;
    protected powerPreference: string;
    protected lightsArray: Light[] = [];
    protected shadowsArray: any[] = [];
    protected spritesArray: Sprite[] = [];
    protected currentRendererTarget: WebGLRenderTarget | null = null;

    // public properties
    public domElement: HTMLCanvasElement;
    public context: WebGLRenderingContext | null;

    // clearing
    public autoClear: boolean = true;
    public autoClearColor: boolean = true;
    public autoClearDepth: boolean = true;
    public autoClearStencil: boolean = true;

    // scene graph
    public sortObjects: boolean = true;

    // user-defined clipping
    public clippingPlanes: any[] = [];
    public localClippingEnabled: boolean = false;

    // physically based shading
    public gammaInput: boolean; // for backwards compatibility
    public gammaFactor: number;
    public gammaOutput: boolean;

    // physical lights
    public physicallyCorrectLights: boolean = false;

    // tone mapping
    public toneMapping: number = LinearToneMapping;
    public toneMappingExposure: number = 1.0;
    public toneMappingWhitePoint: number = 1.0;

    // morphs
    public maxMorphNormals: number;
    public maxMorphTargets: number;

    // internal properties

    public shadowMap: WebGLShadowMap;
    public state: WebGLState;

    constructor(parameters: IWebGLRendererParameters = {}) {
        console.log("THREE.WebGLRenderer", REVISION);
        (this.domElement =
            parameters.canvas !== undefined
                ? parameters.canvas
                : (document.createElementNS(
                      "http://www.w3.org/1999/xhtml",
                      "canvas",
                  ) as HTMLCanvasElement)),
            (this.context =
                parameters.context !== undefined ? parameters.context : null),
            (this.alpha =
                parameters.alpha !== undefined ? parameters.alpha : false),
            (this.depth =
                parameters.depth !== undefined ? parameters.depth : true),
            (this.stencil =
                parameters.stencil !== undefined ? parameters.stencil : true),
            (this.antialias =
                parameters.antialias !== undefined
                    ? parameters.antialias
                    : false),
            (this.premultipliedAlpha =
                parameters.premultipliedAlpha !== undefined
                    ? parameters.premultipliedAlpha
                    : true),
            (this.preserveDrawingBuffer =
                parameters.preserveDrawingBuffer !== undefined
                    ? parameters.preserveDrawingBuffer
                    : false),
            (this.powerPreference =
                parameters.powerPreference !== undefined
                    ? parameters.powerPreference
                    : "default");
    }

    public allocTextureUnit(): number {
        return 0;
    }

    public renderBufferDirect(
        camera: Camera,
        fog: Fog | null,
        geometry: BufferGeometry,
        material: Material,
        object: Object3D,
        group: IGroup | null,
    ): void {}

    public setTexture2D(texture: Texture, unit: number) {}

    public setTextureCube(cubeTexture: CubeTexture, unit: number) {}

    public getRenderTarget(): WebGLRenderTarget | null {
        return this.currentRendererTarget;
    }

    public setRenderTarget(currentRendererTarget: WebGLRenderTarget): void {}

    public clear(): void {}
}
