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
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { Frustum } from "../math/Frustum";
import { Matrix4 } from "../math/Matrix4";
import { WebGLUtils } from "./webgl/WebGLUtils";
import { WebGLClipping } from "./webgl/WebGLClipping";
import { ArrayCamera } from "../cameras/ArrayCamera";
import { WebGLProgramWrapper } from "./webgl/WebGLProgram";
import { WebGLExtensions } from "./webgl/WebGLExtensions";
import { WebGLCapabilities } from "./webgl/WebGLCapabilities";
import { WebGLProperties } from "./webgl/WebGLProperties";
import { WebGLTextures } from "./webgl/WebGLTextures";
import { WebGLAttributes, IWebGLBufferWrapper } from "./webgl/WebGLAttributes";
import { WebGLGeometries } from "./webgl/WebGLGeometries";
import { WebGLObjects } from "./webgl/WebGLObjects";
import { WebGLMorphtargets } from "./webgl/WebGLMorphtargets";
import { WebGLPrograms } from "./webgl/WebGLPrograms";
import { WebGLLights } from "./webgl/WebGLLights";
import { WebGLRenderLists } from "./webgl/WebGLRenderLists";
import { WebGLBufferRenderer } from "./webgl/WebGLBufferRenderer";
import { WebGLIndexedBufferRenderer } from "./webgl/WebGLIndexedBufferRenderer";
import { WebGLSpriteRenderer } from "./webgl/WebGLSpriteRenderer";
import { WebGLBackground } from "./webgl/WebGLBackground";

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
    protected parameters: IWebGLRendererParameters;

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
    protected isContextLost: boolean = false;

    // internal state cache
    protected currentRenderTarget: WebGLRenderer | null = null;
    protected currentFramebuffer: WebGLFramebuffer | null = null;
    protected currentMaterialId: number = -1;
    protected currentGeometryProgram: string = "";

    protected currentCamera: Camera | null = null;
    protected currentArrayCamera: ArrayCamera | null = null;

    protected currentViewport: Vector4 = new Vector4();
    protected currentScissor: Vector4 = new Vector4();
    protected currentScissorTest: boolean | null = null;

    //
    protected usedTextureUnits: number = 0;

    //
    protected width = this.domElement.width;
    protected height = this.domElement.height;

    protected pixelRatio: number = 1;
    protected viewport: Vector4 = new Vector4(0, 0, this.width, this.height);
    protected scissor: Vector4 = new Vector4(0, 0, this.width, this.height);
    protected scissorTest: boolean = false;

    // frustum
    protected frustum: Frustum = new Frustum();

    // clipping
    protected clipping: WebGLClipping = new WebGLClipping();
    protected clippingEnabled: boolean = false;
    protected localClippingEnabled: boolean = false;

    // camera matrices cache
    protected projScreenMatrix: Matrix4 = new Matrix4();
    protected vector3: Vector3 = new Vector3();

    // info
    protected infoMemory: IInfoMemory = {
        geometries: 0,
        textures: 0,
    };

    protected infoRender: IInfoRender = {
        frame: 0,
        calls: 0,
        vertices: 0,
        faces: 0,
        points: 0,
    };

    public info: {
        render: IInfoRender;
        memory: IInfoMemory;
        programs: WebGLProgramWrapper[] | null;
        autoReset: boolean;
        reset: () => void;
    } = {
        render: this.infoRender,
        memory: this.infoMemory,
        programs: null,
        autoReset: true,
        reset: (): void => {
            this.infoRender.frame++;
            this.infoRender.calls = 0;
            this.infoRender.vertices = 0;
            this.infoRender.faces = 0;
            this.infoRender.points = 0;
        },
    };

    // GLs
    public shadowMap: WebGLShadowMap;
    public extensions: WebGLExtensions;
    public utils: WebGLUtils;
    public capabilities: WebGLCapabilities;
    public state: WebGLState;
    public properties: WebGLProperties;
    public textures: WebGLTextures;
    public attributes: WebGLAttributes;
    public geometries: WebGLGeometries;
    public objects: WebGLObjects;
    public morphtargets: WebGLMorphtargets;
    public programCache: WebGLPrograms;
    public lights: WebGLLights;
    public renderLists: WebGLRenderLists;
    public background: WebGLBackground;
    public bufferRenderer: WebGLBufferRenderer;
    public indexedBufferRenderer: WebGLIndexedBufferRenderer;
    public spriteRenderer: WebGLSpriteRenderer;

    constructor(parameters: IWebGLRendererParameters = {}) {
        this.parameters = parameters;
        console.log("THREE.WebGLRenderer", REVISION);
        (this.domElement =
            parameters.canvas !== undefined
                ? parameters.canvas
                : (document.createElementNS("http://www.w3.org/1999/xhtml", "canvas") as HTMLCanvasElement)),
            (this.context = parameters.context !== undefined ? parameters.context : null),
            (this.alpha = parameters.alpha !== undefined ? parameters.alpha : false),
            (this.depth = parameters.depth !== undefined ? parameters.depth : true),
            (this.stencil = parameters.stencil !== undefined ? parameters.stencil : true),
            (this.antialias = parameters.antialias !== undefined ? parameters.antialias : false),
            (this.premultipliedAlpha =
                parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true),
            (this.preserveDrawingBuffer =
                parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false),
            (this.powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : "default");

        try {
            const contextAttributes = {
                alpha: this.alpha,
                depth: this.depth,
                stencil: this.stencil,
                antialias: this.antialias,
                premultipliedAlpha: this.premultipliedAlpha,
                preserveDrawingBuffer: this.preserveDrawingBuffer,
                powerPreference: this.powerPreference,
            };

            // event listeners must be registered before WebGL context is created, see #12753

            this.domElement.addEventListener("webglcontextlost", this.onContextLost, false);
            this.domElement.addEventListener("webglcontextrestored", this.onContextRestore, false);

            this.context =
                this.context ||
                (this.domElement.getContext("webgl", contextAttributes) as WebGLRenderingContext) ||
                (this.domElement.getContext("experimental-webgl", contextAttributes) as WebGLRenderingContext);

            if (this.context === null) {
                if (this.domElement.getContext("webgl") !== null) {
                    throw new Error("Error creating WebGL context with your selected attributes.");
                } else {
                    throw new Error("Error creating WebGL context.");
                }
            }

            // Some experimental-webgl implementations do not have getShaderPrecisionFormat

            if ((this.domElement as any).getShaderPrecisionFormat === undefined) {
                (this.domElement as any).getShaderPrecisionFormat = function() {
                    return { rangeMin: 1, rangeMax: 1, precision: 1 };
                };
            }
        } catch (error) {
            console.error("THREE.WebGLRenderer: " + error.message);
        }
        this.initGLContext();
        this.shadowMap = new WebGLShadowMap(this, this.objects, this.capabilities.maxTextureSize);
    }

    protected onContextLost = (event: Event): void => {
        event.preventDefault();
        console.log("THREE.WebGLRenderer: Context Lost.");
        this.isContextLost = true;
    };

    protected onContextRestore = (): void => {
        console.log("THREE.WebGLRenderer: Context Restored.");
        this.isContextLost = false;
        this.initGLContext();
    };

    protected initGLContext() {
        const gl = this.context;
        const extensions: WebGLExtensions = new WebGLExtensions(gl);
        extensions.get("WEBGL_depth_texture");
        extensions.get("OES_texture_float");
        extensions.get("OES_texture_float_linear");
        extensions.get("OES_texture_half_float");
        extensions.get("OES_texture_half_float_linear");
        extensions.get("OES_standard_derivatives");
        extensions.get("OES_element_index_uint");
        extensions.get("ANGLE_instanced_arrays");
        const utils: WebGLUtils = new WebGLUtils(gl, extensions);
        const capabilities: WebGLCapabilities = new WebGLCapabilities(gl, extensions, this.parameters);
        const state: WebGLState = new WebGLState(gl, extensions, utils);
        state.scissor(this.currentScissor.copy(this.scissor).multiplyScalar(this.pixelRatio));
        state.viewport(this.currentViewport.copy(this.viewport).multiplyScalar(this.pixelRatio));
        const properties: WebGLProperties = new WebGLProperties();
        const textures = new WebGLTextures(
            gl,
            extensions,
            state,
            properties,
            capabilities,
            utils,
            this.infoMemory,
            this.infoRender,
        );
        const attributes: WebGLAttributes = new WebGLAttributes(gl);
        const geometries: WebGLGeometries = new WebGLGeometries(gl, attributes, this.infoMemory);
        const objects: WebGLObjects = new WebGLObjects(geometries, this.infoRender);
        const morphtargets: WebGLMorphtargets = new WebGLMorphtargets(gl);
        const programCache: WebGLPrograms = new WebGLPrograms(this, extensions, capabilities);
        const lights: WebGLLights = new WebGLLights();
        const renderLists: WebGLRenderLists = new WebGLRenderLists();
        const background: WebGLBackground = new WebGLBackground(this, state, geometries, this.premultipliedAlpha);
        const bufferRenderer: WebGLBufferRenderer = new WebGLBufferRenderer(gl, extensions, this.infoRender);
        const indexedBufferRenderer: WebGLIndexedBufferRenderer = new WebGLIndexedBufferRenderer(
            gl,
            extensions,
            this.infoRender,
        );
        const spriteRenderer: WebGLSpriteRenderer = new WebGLSpriteRenderer(this, state, textures, capabilities);

        this.info.programs = programCache.programs;
        this.extensions = extensions;
        this.utils = utils;
        this.capabilities = capabilities;
        this.state = state;
        this.properties = properties;
        this.textures = textures;
        this.attributes = attributes;
        this.geometries = geometries;
        this.objects = objects;
        this.morphtargets = morphtargets;
        this.programCache = programCache;
        this.lights = lights;
        this.renderLists = renderLists;
        this.background = background;
        this.bufferRenderer = bufferRenderer;
        this.indexedBufferRenderer = indexedBufferRenderer;
        this.spriteRenderer = spriteRenderer;
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
