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
import { Camera } from "../cameras/Camera";
import { Material } from "../materials/Material";
import { ArrayCamera, ArrayCameraCamera } from "../cameras/ArrayCamera";
import { Object3D } from "../core/Object3D";
import { InstancedBufferGeometry } from "../core/InstancedBufferGeometry";
import { BufferAttribute, TypedArray } from "../core/BufferAttribute";
import { InterleavedBufferAttribute } from "../core/InterleavedBufferAttribute";
import { InstancedInterleavedBufferAttribute } from "../core/InstancedInterleavedBufferAttribute";
import { InstancedBufferAttribute } from "../core/InstancedBufferAttribute";
import { Geometry } from "../core/Geometry";
import { BufferGeometry } from "../core/BufferGeometry";
import { IGroup } from "../core/DirectGeometry";
import { Light } from "../lights/Light";
import { Color } from "../math/Color";
import { MathUtil } from "../math/Math";
import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { Frustum } from "../math/Frustum";
import { Matrix3 } from "../math/Matrix3";
import { Matrix4 } from "../math/Matrix4";
import { WebGLUniformsWrapper, UniformSetterType, AllUniformType, NestUniformType } from "./webgl/WebGLUniforms";
import {
    ShaderMaterial,
    MeshPhongMaterial,
    MeshStandardMaterial,
    MeshLambertMaterial,
    MeshBasicMaterial,
    MeshToonMaterial,
    MeshPhysicalMaterial,
    RawShaderMaterial,
    MeshDepthMaterial,
    MeshDistanceMaterial,
    MeshNormalMaterial,
    LineBasicMaterial,
    LineDashedMaterial,
    PointsMaterial,
    ShadowMaterial,
} from "../materials/Materials";
import { Mesh } from "../objects/Mesh";
import { Line } from "../objects/Line";
import { Sprite } from "../objects/Sprite";
import { LineSegments } from "../objects/LineSegments";
import { LineLoop } from "../objects/LineLoop";
import { Points } from "../objects/Points";
import { Bone } from "../objects/Bone";
import { Skeleton } from "../objects/Skeleton";
import { SkinnedMesh } from "../objects/SkinnedMesh";
import { Fog } from "../scenes/Fog";
import { FogExp2 } from "../scenes/FogExp2";
import { Scene } from "../scenes/Scene";
import { DataTexture } from "../textures/DataTexture";
import { Texture } from "../textures/Texture";
import { CubeTexture } from "../textures/CubeTexture";
import { IUniform } from "./shaders/UniformsUtils";
import { ShaderLib } from "./shaders/ShaderLib";
import { UniformsLib } from "./shaders/UniformsLib";
import { UniformsUtils } from "./shaders/UniformsUtils";
import { WebGLShadowMap } from "./webgl/WebGLShadowMap";
import { WebGLState } from "./webgl/WebGLState";
import { WebGLUtils } from "./webgl/WebGLUtils";
import { WebGLClipping } from "./webgl/WebGLClipping";
import { WebGLProgramWrapper } from "./webgl/WebGLProgram";
import { WebGLExtensions } from "./webgl/WebGLExtensions";
import { WebGLCapabilities } from "./webgl/WebGLCapabilities";
import {
    WebGLProperties,
    IMaterialProperties,
    ITextureProperties,
    IImmediateRenderObjectProperties,
} from "./webgl/WebGLProperties";
import { WebGLTextures } from "./webgl/WebGLTextures";
import { WebGLAttributes, IWebGLBufferWrapper } from "./webgl/WebGLAttributes";
import { WebGLGeometries } from "./webgl/WebGLGeometries";
import { WebGLObjects } from "./webgl/WebGLObjects";
import { WebGLMorphtargets } from "./webgl/WebGLMorphtargets";
import { WebGLPrograms, IProgramParameters } from "./webgl/WebGLPrograms";
import { WebGLLights } from "./webgl/WebGLLights";
import { WebGLRenderLists, WebGLRenderList, IRenderItem } from "./webgl/WebGLRenderLists";
import { WebGLBufferRenderer } from "./webgl/WebGLBufferRenderer";
import { WebGLIndexedBufferRenderer } from "./webgl/WebGLIndexedBufferRenderer";
import { WebGLSpriteRenderer } from "./webgl/WebGLSpriteRenderer";
import { WebGLBackground } from "./webgl/WebGLBackground";
import { WebGLRenderTarget } from "./WebGLRenderTarget";
import { WebGLRenderTargetCube } from "./WebGLRenderTargetCube";
import { ImmediateRenderObject } from "../extras/objects/ImmediateRenderObject";

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
    protected currentRenderTarget: WebGLRenderTarget | WebGLRenderTargetCube | null = null;
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
    public localClippingEnabled: boolean = false;

    // camera matrices cache
    protected projScreenMatrix: Matrix4 = new Matrix4();
    protected tempVector3: Vector3 = new Vector3();

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
    public currentRenderList: WebGLRenderList;

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

    public getTargetPixelRatio(): number {
        return this.currentRenderTarget === null ? this.pixelRatio : 1;
    }

    public getContext(): WebGLRenderingContext {
        return this.context;
    }

    public getContextAttributes(): WebGLContextAttributes {
        return this.context.getContextAttributes();
    }

    public forceContextLoss(): void {
        const extension = this.extensions.get("WEBGL_lose_context");
        if (extension) extension.loseContext();
    }

    public forceContextRestore(): void {
        const extension = this.extensions.get("WEBGL_lose_context");
        if (extension) extension.restoreContext();
    }

    public getPixelRatio(): number {
        return this.pixelRatio;
    }

    public setPixelRatio(value: number): void {
        if (value === undefined) return;
        this.pixelRatio = value;
        this.setSize(this.width, this.height, false);
    }

    public getSize(): { width: number; height: number } {
        return {
            width: this.width,
            height: this.height,
        };
    }

    public setSize(width: number, height: number, updateStyle: boolean): void {
        this.width = width;
        this.height = height;
        this.domElement.width = width * this.pixelRatio;
        this.domElement.height = height * this.pixelRatio;
        if (updateStyle !== false) {
            this.domElement.style.width = width + "px";
            this.domElement.style.height = height + "px";
        }
        this.setViewport(0, 0, width, height);
    }

    public getDrawingBufferSize(): { width: number; height: number } {
        return {
            width: this.width * this.pixelRatio,
            height: this.height * this.pixelRatio,
        };
    }

    public setDrawingBufferSize(width: number, height: number, pixelRatio: number): void {
        this.width = width;
        this.height = height;
        this.pixelRatio = pixelRatio;
        this.domElement.width = width * pixelRatio;
        this.domElement.height = height * pixelRatio;
        this.setViewport(0, 0, width, height);
    }

    public getCurrentViewport(): Vector4 {
        return this.currentViewport;
    }

    public setViewport(x: number, y: number, width: number, height: number): void {
        this.viewport.set(x, this.height - y - height, width, height);
        this.state.viewport(this.currentViewport.copy(this.viewport).multiplyScalar(this.pixelRatio));
    }

    public setScissor(x: number, y: number, width: number, height: number): void {
        this.scissor.set(x, this.height - y - height, width, height);
        this.state.scissor(this.currentScissor.copy(this.scissor).multiplyScalar(this.pixelRatio));
    }

    public setScissorTest(value: boolean): void {
        this.state.setScissorTest((this.scissorTest = value));
    }

    public getClearColor(): Color {
        return this.background.getClearColor();
    }

    public setClearColor(color: Color, alpha: number): void {
        this.background.setClearColor(color, alpha);
    }

    public getClearAlpha(): number {
        return this.background.getClearAlpha();
    }

    public setClearAlpha(alpha: number): void {
        this.background.setClearAlpha(alpha);
    }

    public clear(color?: boolean, depth?: boolean, stencil?: boolean): void {
        const gl: WebGLRenderingContext = this.context;
        let bits: number = 0;
        if (color === undefined || color) bits |= gl.COLOR_BUFFER_BIT;
        if (depth === undefined || depth) bits |= gl.DEPTH_BUFFER_BIT;
        if (stencil === undefined || stencil) bits |= gl.STENCIL_BUFFER_BIT;
        gl.clear(bits);
    }

    public clearColor(): void {
        this.clear(true, false, false);
    }

    public clearDepth(): void {
        this.clear(false, true, false);
    }

    public clearStencil(): void {
        this.clear(false, false, true);
    }

    public clearTarget(renderTarget: WebGLRenderTarget, color: boolean, depth: boolean, stencil: boolean): void {
        this.setRenderTarget(renderTarget);
        this.clear(color, depth, stencil);
    }

    public dispose(): void {
        this.domElement.removeEventListener("webglcontextlost", this.onContextLost, false);
        this.domElement.removeEventListener("webglcontextrestored", this.onContextRestore, false);
        this.renderLists.dispose();
        this.properties.dispose();
        this.objects.dispose();
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

    public compile(scene: Scene, camera: Camera): void {
        this.lightsArray.length = 0;
        this.shadowsArray.length = 0;
        scene.traverse((object: Object3D): void => {
            if (object instanceof Light) {
                this.lightsArray.push(object);
                if (object.castShadow) {
                    this.shadowsArray.push(object);
                }
            }
        });
        this.lights.setup(this.lightsArray, this.shadowsArray, camera);
        scene.traverse((obj: Object3D): void => {
            const object: Line | Mesh | Points = obj as Line | Mesh | Points;
            if (object.material) {
                if (Array.isArray(object.material)) {
                    for (let i: number = 0; i < object.material.length; i++) {
                        this.initMaterial(object.material[i], scene.fog, object);
                    }
                } else {
                    this.initMaterial(object.material, scene.fog, object);
                }
            }
        });
    }

    protected isAnimating: boolean = false;
    protected onAnimationFrame: (time: number) => any | null = null;
    protected start(): void {
        if (this.isAnimating) return;
        window.requestAnimationFrame(this.loop);
        this.isAnimating = true;
    }

    protected loop = (time: number): void => {
        if (this.onAnimationFrame !== null) this.onAnimationFrame(time);
        window.requestAnimationFrame(this.loop);
    };

    public animate(callback: (time: number) => any): void {
        this.onAnimationFrame = callback;
        this.start();
    }

    public render(scene: Scene, camera: Camera, renderTarget: WebGLRenderTarget, forceClear: boolean): void {
        if (!(camera && camera instanceof Camera)) {
            console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
            return;
        }
        if (this.isContextLost) return;
        // reset caching for this frame
        this.currentGeometryProgram = "";
        this.currentMaterialId = -1;
        this.currentCamera = null;
        // update scene graph
        if (scene.autoUpdate === true) scene.updateMatrixWorld();
        // update camera matrices and frustum
        if (camera.parent === null) camera.updateMatrixWorld();
        scene.onBeforeRender(this, scene, camera, renderTarget);
        this.projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
        this.frustum.setFromMatrix(this.projScreenMatrix);
        this.lightsArray.length = 0;
        this.shadowsArray.length = 0;
        this.spritesArray.length = 0;
        this.clippingEnabled = this.clipping.init(this.clippingPlanes, this.localClippingEnabled, camera);
        this.currentRenderList = this.renderLists.get(scene, camera);
        this.currentRenderList.init();
        this.projectObject(scene, camera, this.sortObjects);
        if (this.sortObjects === true) {
            this.currentRenderList.sort();
        }
        //
        if (this.clippingEnabled) this.clipping.beginShadows();
        this.shadowMap.render(this.shadowsArray, scene, camera);
        this.lights.setup(this.lightsArray, this.shadowsArray, camera);
        if (this.clippingEnabled) this.clipping.endShadows();
        //
        if (this.info.autoReset) this.info.reset();
        if (renderTarget === undefined) {
            renderTarget = null;
        }
        this.setRenderTarget(renderTarget);
        //
        this.background.render(this.currentRenderList, scene, camera, forceClear);
        // render scene
        const opaqueObjects: IRenderItem[] = this.currentRenderList.opaque;
        const transparentObjects: IRenderItem[] = this.currentRenderList.transparent;
        if (scene.overrideMaterial) {
            const overrideMaterial: Material = scene.overrideMaterial;
            if (opaqueObjects.length) this.renderObjects(opaqueObjects, scene, camera, overrideMaterial);
            if (transparentObjects.length) this.renderObjects(transparentObjects, scene, camera, overrideMaterial);
        } else {
            // opaque pass (front-to-back order)
            if (opaqueObjects.length) this.renderObjects(opaqueObjects, scene, camera);
            // transparent pass (back-to-front order)
            if (transparentObjects.length) this.renderObjects(transparentObjects, scene, camera);
        }
        // custom renderers
        this.spriteRenderer.render(this.spritesArray, scene, camera);
        // Generate mipmap if we're using any kind of mipmap filtering
        if (renderTarget) {
            this.textures.updateRenderTargetMipmap(renderTarget);
        }
        // Ensure depth buffer writing is enabled so it can be cleared on next render
        const state: WebGLState = this.state;
        state.buffers.depth.setTest(true);
        state.buffers.depth.setMask(true);
        state.buffers.color.setMask(true);
        state.setPolygonOffset(false);
        //scene.onAfterRender(this, scene, camera, renderTarget );
        // _gl.finish();
    }

    protected projectObject(object: Object3D, camera: Camera, sortObjects: boolean = false): void {
        if (object.visible === false) return;
        const visible: boolean = object.layers.test(camera.layers);
        if (visible) {
            if (object instanceof Light) {
                this.lightsArray.push(object);
                if (object.castShadow) {
                    this.shadowsArray.push(object);
                }
            } else if (object instanceof Sprite) {
                if (!object.frustumCulled || this.frustum.intersectsSprite(object)) {
                    this.spritesArray.push(object);
                }
            } else if (object instanceof ImmediateRenderObject) {
                if (sortObjects) {
                    this.tempVector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(this.projScreenMatrix);
                }
                this.currentRenderList.push(object, null, object.material, this.tempVector3.z, null);
            } else if (object instanceof Mesh || object instanceof Line || object instanceof Points) {
                if (object instanceof SkinnedMesh) {
                    object.skeleton.update();
                }
                if (!object.frustumCulled || this.frustum.intersectsObject(object)) {
                    if (sortObjects) {
                        this.tempVector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(this.projScreenMatrix);
                    }
                    const geometry: BufferGeometry = this.objects.update(object);
                    const material = object.material;
                    if (Array.isArray(material)) {
                        const groups: IGroup[] = geometry.groups;
                        for (let i: number = 0, l: number = groups.length; i < l; i++) {
                            const group: IGroup = groups[i];
                            const groupMaterial: Material = material[group.materialIndex];
                            if (groupMaterial && groupMaterial.visible) {
                                this.currentRenderList.push(object, geometry, groupMaterial, this.tempVector3.z, group);
                            }
                        }
                    } else if (material.visible) {
                        this.currentRenderList.push(object, geometry, material, this.tempVector3.z, null);
                    }
                }
            }
        }
        const children: Object3D[] = object.children;
        for (let i: number = 0, l: number = children.length; i < l; i++) {
            this.projectObject(children[i], camera, sortObjects);
        }
    }

    protected renderObjects(
        renderList: IRenderItem[],
        scene: Scene,
        camera: Camera,
        overrideMaterial?: Material,
    ): void {
        for (let i: number = 0, l: number = renderList.length; i < l; i++) {
            const renderItem: IRenderItem = renderList[i];
            const object: Object3D = renderItem.object;
            const geometry: BufferGeometry = renderItem.geometry;
            const material: Material = overrideMaterial === undefined ? renderItem.material : overrideMaterial;
            const group: IGroup = renderItem.group;
            if (camera instanceof ArrayCamera) {
                this.currentArrayCamera = camera;
                const cameras: ArrayCameraCamera[] = camera.cameras;
                for (var j = 0, jl = cameras.length; j < jl; j++) {
                    var camera2 = cameras[j];
                    if (object.layers.test(camera2.layers)) {
                        var bounds = camera2.bounds;
                        var x = bounds.x * this.width;
                        var y = bounds.y * this.height;
                        var width = bounds.z * this.width;
                        var height = bounds.w * this.height;
                        this.state.viewport(
                            this.currentViewport.set(x, y, width, height).multiplyScalar(this.pixelRatio),
                        );
                        this.renderObject(object, scene, camera2, geometry, material, group);
                    }
                }
            } else {
                this.currentArrayCamera = null;
                this.renderObject(object, scene, camera, geometry, material, group);
            }
        }
    }

    protected renderObject(
        object: Object3D,
        scene: Scene,
        camera: Camera,
        geometry: BufferGeometry,
        material: Material,
        group: IGroup,
    ): void {
        object.onBeforeRender(this, scene, camera, geometry, material, group);
        object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld);
        object.normalMatrix.getNormalMatrix(object.modelViewMatrix);
        if (object instanceof ImmediateRenderObject) {
            //What???
            var frontFaceCW = object instanceof Mesh && object.matrixWorld.determinant() < 0;
            this.state.setMaterial(material, frontFaceCW);
            var program = this.setProgram(camera, scene.fog, material, object);
            this.currentGeometryProgram = "";
            this.renderObjectImmediate(object, program, material);
        } else {
            this.renderBufferDirect(camera, scene.fog, geometry, material, object, group);
        }
        //object.onAfterRender(this, scene, camera, geometry, material, group );
    }

    // Buffer rendering
    // renderObjectImmediate 目前看来很有问题
    protected renderObjectImmediate(
        object: ImmediateRenderObject,
        program: WebGLProgramWrapper,
        material: Material,
    ): void {
        object.render(() => {
            this.renderBufferImmediate(object, program, material);
        });
    }

    protected renderBufferImmediate(
        object: ImmediateRenderObject,
        program: WebGLProgramWrapper,
        material: Material,
    ): void {
        const state: WebGLState = this.state;
        const gl: WebGLRenderingContext = this.context;
        state.initAttributes();
        const buffers: IImmediateRenderObjectProperties = this.properties.get(object);
        if (object.hasPositions && !buffers.position) buffers.position = gl.createBuffer();
        if (object.hasNormals && !buffers.normal) buffers.normal = gl.createBuffer();
        if (object.hasUvs && !buffers.uv) buffers.uv = gl.createBuffer();
        if (object.hasColors && !buffers.color) buffers.color = gl.createBuffer();
        const programAttributes: { [key: string]: number } = program.getAttributes();
        if (object.hasPositions) {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.bufferData(gl.ARRAY_BUFFER, object.positionArray, gl.DYNAMIC_DRAW);
            state.enableAttribute(programAttributes.position);
            gl.vertexAttribPointer(programAttributes.position, 3, gl.FLOAT, false, 0, 0);
        }
        if (object.hasNormals) {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
            if (
                !(material instanceof MeshPhongMaterial) &&
                !(material instanceof MeshStandardMaterial) &&
                !(material instanceof MeshNormalMaterial) &&
                material.flatShading === true
            ) {
                for (let i: number = 0, l: number = object.count * 3; i < l; i += 9) {
                    const array = object.normalArray;
                    const nx: number = (array[i + 0] + array[i + 3] + array[i + 6]) / 3;
                    const ny: number = (array[i + 1] + array[i + 4] + array[i + 7]) / 3;
                    const nz: number = (array[i + 2] + array[i + 5] + array[i + 8]) / 3;
                    array[i + 0] = nx;
                    array[i + 1] = ny;
                    array[i + 2] = nz;
                    array[i + 3] = nx;
                    array[i + 4] = ny;
                    array[i + 5] = nz;
                    array[i + 6] = nx;
                    array[i + 7] = ny;
                    array[i + 8] = nz;
                }
            }
            gl.bufferData(gl.ARRAY_BUFFER, object.normalArray, gl.DYNAMIC_DRAW);
            state.enableAttribute(programAttributes.normal);
            gl.vertexAttribPointer(programAttributes.normal, 3, gl.FLOAT, false, 0, 0);
        }
        if (object.hasUvs && material.map) {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.uv);
            gl.bufferData(gl.ARRAY_BUFFER, object.uvArray, gl.DYNAMIC_DRAW);
            state.enableAttribute(programAttributes.uv);
            gl.vertexAttribPointer(programAttributes.uv, 2, gl.FLOAT, false, 0, 0);
        }
        if (object.hasColors && material.vertexColors !== NoColors) {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
            gl.bufferData(gl.ARRAY_BUFFER, object.colorArray, gl.DYNAMIC_DRAW);
            state.enableAttribute(programAttributes.color);
            gl.vertexAttribPointer(programAttributes.color, 3, gl.FLOAT, false, 0, 0);
        }
        state.disableUnusedAttributes();
        gl.drawArrays(gl.TRIANGLES, 0, object.count);
        object.count = 0;
    }

    public renderBufferDirect(
        camera: Camera,
        fog: Fog | FogExp2 | null,
        geometry: BufferGeometry,
        material: Material,
        object: Object3D,
        group: IGroup | null,
    ): void {
        const gl: WebGLRenderingContext = this.context;
        const frontFaceCW: boolean = object instanceof Mesh && object.matrixWorld.determinant() < 0;
        this.state.setMaterial(material, frontFaceCW);
        const program = this.setProgram(camera, fog, material, object);
        const geometryProgram = geometry.id + "_" + program.id + "_" + (material.wireframe === true);
        let updateBuffers: Boolean = false;
        if (geometryProgram !== this.currentGeometryProgram) {
            this.currentGeometryProgram = geometryProgram;
            updateBuffers = true;
        }
        if ((object as Mesh).morphTargetInfluences) {
            this.morphtargets.update(object, geometry, material, program);
            updateBuffers = true;
        }
        //
        let index: BufferAttribute = geometry.index;
        const position: BufferAttribute = geometry.attributes.position;
        let rangeFactor: number = 1;
        if (material.wireframe === true) {
            index = this.geometries.getWireframeAttribute(geometry);
            rangeFactor = 2;
        }
        let attribute: IWebGLBufferWrapper;
        let renderer: WebGLBufferRenderer | WebGLIndexedBufferRenderer = this.bufferRenderer;
        if (index !== null) {
            attribute = this.attributes.get(index);
            renderer = this.indexedBufferRenderer;
            renderer.setIndex(attribute);
        }
        if (updateBuffers) {
            this.setupVertexAttributes(material, program, geometry);
            if (index !== null) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, attribute.buffer);
            }
        }
        //
        let dataCount: number = 0;
        if (index !== null) {
            dataCount = index.count;
        } else if (position !== undefined) {
            dataCount = position.count;
        }
        const rangeStart: number = geometry.drawRange.start * rangeFactor;
        const rangeCount: number = geometry.drawRange.count * rangeFactor;
        const groupStart: number = group !== null ? group.start * rangeFactor : 0;
        const groupCount: number = group !== null ? group.count * rangeFactor : Infinity;
        const drawStart: number = Math.max(rangeStart, groupStart);
        const drawEnd: number = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;
        const drawCount: number = Math.max(0, drawEnd - drawStart + 1);
        if (drawCount === 0) return;
        //
        if (object instanceof Mesh) {
            if (material.wireframe === true) {
                this.state.setLineWidth(material.wireframeLinewidth * this.getTargetPixelRatio());
                renderer.setMode(gl.LINES);
            } else {
                switch (object.drawMode) {
                    case TrianglesDrawMode:
                        renderer.setMode(gl.TRIANGLES);
                        break;
                    case TriangleStripDrawMode:
                        renderer.setMode(gl.TRIANGLE_STRIP);
                        break;
                    case TriangleFanDrawMode:
                        renderer.setMode(gl.TRIANGLE_FAN);
                        break;
                }
            }
        } else if (object instanceof Line) {
            let lineWidth: number = material.linewidth;
            if (lineWidth === undefined) lineWidth = 1; // Not using Line*Material
            this.state.setLineWidth(lineWidth * this.getTargetPixelRatio());
            if (object instanceof LineSegments) {
                renderer.setMode(gl.LINES);
            } else if (object instanceof LineLoop) {
                renderer.setMode(gl.LINE_LOOP);
            } else {
                renderer.setMode(gl.LINE_STRIP);
            }
        } else if (object instanceof Points) {
            renderer.setMode(gl.POINTS);
        }
        if (geometry && geometry instanceof InstancedBufferGeometry) {
            if (geometry.maxInstancedCount > 0) {
                renderer.renderInstances(geometry, drawStart, drawCount);
            }
        } else {
            renderer.render(drawStart, drawCount);
        }
    }

    protected setProgram(
        camera: Camera,
        fog: Fog | FogExp2 | null,
        material: Material,
        object: Object3D,
    ): WebGLProgramWrapper {
        const gl: WebGLRenderingContext = this.context;
        this.usedTextureUnits = 0;
        const materialProperties: IMaterialProperties = this.properties.get(material);
        if (this.clippingEnabled) {
            if (this.localClippingEnabled || camera !== this.currentCamera) {
                const useCache: boolean = camera === this.currentCamera && material.id === this.currentMaterialId;
                // we might want to call this function with some ClippingGroup
                // object instead of the material, once it becomes feasible
                // (#8465, #8379)
                this.clipping.setState(
                    material.clippingPlanes,
                    material.clipIntersection,
                    material.clipShadows,
                    camera,
                    materialProperties,
                    useCache,
                );
            }
        }
        if (material.needsUpdate === false) {
            if (materialProperties.program === undefined) {
                material.needsUpdate = true;
            } else if (material.fog && materialProperties.fog !== fog) {
                material.needsUpdate = true;
            } else if (material.lights && materialProperties.lightsHash !== this.lights.state.hash) {
                material.needsUpdate = true;
            } else if (
                materialProperties.numClippingPlanes !== undefined &&
                (materialProperties.numClippingPlanes !== this.clipping.numPlanes ||
                    materialProperties.numIntersection !== this.clipping.numIntersection)
            ) {
                material.needsUpdate = true;
            }
        }
        if (material.needsUpdate) {
            this.initMaterial(material, fog, object);
            material.needsUpdate = false;
        }
        let refreshProgram: boolean = false;
        let refreshMaterial: boolean = false;
        let refreshLights: boolean = false;
        const program: WebGLProgramWrapper = materialProperties.program,
            p_uniforms: WebGLUniformsWrapper = program.getUniforms(),
            m_uniforms: { [key: string]: IUniform } = materialProperties.shader.uniforms;
        if (this.state.useProgram(program.program)) {
            refreshProgram = true;
            refreshMaterial = true;
            refreshLights = true;
        }
        if (material.id !== this.currentMaterialId) {
            this.currentMaterialId = material.id;
            refreshMaterial = true;
        }
        if (refreshProgram || camera !== this.currentCamera) {
            p_uniforms.setValue("projectionMatrix", camera.projectionMatrix);
            if (this.capabilities.logarithmicDepthBuffer) {
                p_uniforms.setValue("logDepthBufFC", 2.0 / (Math.log(camera.far + 1.0) / Math.LN2));
            }
            // Avoid unneeded uniform updates per ArrayCamera's sub-camera
            if (this.currentCamera !== (this.currentArrayCamera || camera)) {
                this.currentCamera = this.currentArrayCamera || camera;
                // lighting uniforms depend on the camera so enforce an update
                // now, in case this material supports lights - or later, when
                // the next material that does gets activated:
                refreshMaterial = true; // set to true on material change
                refreshLights = true; // remains set until update done
            }
            // load material specific uniforms
            // (shader material also gets them for the sake of genericity)
            if (
                material instanceof ShaderMaterial ||
                material instanceof MeshPhongMaterial ||
                material instanceof MeshStandardMaterial ||
                material.envMap
            ) {
                const uCamPos: UniformSetterType = p_uniforms.map.cameraPosition;
                if (uCamPos !== undefined) {
                    (uCamPos.setValue as (arg: AllUniformType) => void)(
                        new Vector3().setFromMatrixPosition(camera.matrixWorld),
                    );
                }
            }
            if (
                material instanceof MeshPhongMaterial ||
                material instanceof MeshLambertMaterial ||
                material instanceof MeshBasicMaterial ||
                material instanceof MeshStandardMaterial ||
                material instanceof ShaderMaterial ||
                material.skinning
            ) {
                p_uniforms.setValue("viewMatrix", camera.matrixWorldInverse);
            }
        }
        // skinning uniforms must be set even if material didn't change
        // auto-setting of texture unit for bone texture must go before other textures
        // not sure why, but otherwise weird things happen
        if (material.skinning) {
            p_uniforms.setOptional(object, "bindMatrix");
            p_uniforms.setOptional(object, "bindMatrixInverse");
            const skeleton: Skeleton = (object as SkinnedMesh).skeleton;
            if (skeleton) {
                const bones: Bone[] = skeleton.bones;
                if (this.capabilities.floatVertexTextures) {
                    if (skeleton.boneTexture === undefined) {
                        // layout (1 matrix = 4 pixels)
                        //      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
                        //  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
                        //       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
                        //       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
                        //       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)
                        let size: number = Math.sqrt(bones.length * 4); // 4 pixels needed for 1 matrix
                        size = MathUtil.ceilPowerOfTwo(size);
                        size = Math.max(size, 4);
                        const boneMatrices: Float32Array = new Float32Array(size * size * 4); // 4 floats per RGBA pixel
                        boneMatrices.set(skeleton.boneMatrices); // copy current values
                        const boneTexture: DataTexture = new DataTexture(
                            boneMatrices,
                            size,
                            size,
                            RGBAFormat,
                            FloatType,
                        );
                        skeleton.boneMatrices = boneMatrices;
                        skeleton.boneTexture = boneTexture;
                        skeleton.boneTextureSize = size;
                    }
                    p_uniforms.setValue("boneTexture", skeleton.boneTexture);
                    p_uniforms.setValue("boneTextureSize", skeleton.boneTextureSize);
                } else {
                    p_uniforms.setOptional(skeleton, "boneMatrices");
                }
            }
        }
        if (refreshMaterial) {
            p_uniforms.setValue("toneMappingExposure", this.toneMappingExposure);
            p_uniforms.setValue("toneMappingWhitePoint", this.toneMappingWhitePoint);
            if (material.lights) {
                // the current material requires lighting info
                // note: all lighting uniforms are always set correctly
                // they simply reference the renderer's state for their
                // values
                //
                // use the current material's .needsUpdate flags to set
                // the GL state when required
                this.markUniformsLightsNeedsUpdate(m_uniforms, refreshLights);
            }
            // refresh uniforms common to several materials
            if (fog && material.fog) {
                this.refreshUniformsFog(m_uniforms, fog);
            }
            if (material instanceof MeshBasicMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
            } else if (material instanceof MeshLambertMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                this.refreshUniformsLambert(m_uniforms, material);
            } else if (material instanceof MeshPhongMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                if (material instanceof MeshToonMaterial) {
                    this.refreshUniformsToon(m_uniforms, material);
                } else {
                    this.refreshUniformsPhong(m_uniforms, material);
                }
            } else if (material instanceof MeshStandardMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                if (material instanceof MeshPhysicalMaterial) {
                    this.refreshUniformsPhysical(m_uniforms, material);
                } else {
                    this.refreshUniformsStandard(m_uniforms, material);
                }
            } else if (material instanceof MeshDepthMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                this.refreshUniformsDepth(m_uniforms, material);
            } else if (material instanceof MeshDistanceMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                this.refreshUniformsDistance(m_uniforms, material);
            } else if (material instanceof MeshNormalMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                this.refreshUniformsNormal(m_uniforms, material);
            } else if (material instanceof LineBasicMaterial) {
                this.refreshUniformsLine(m_uniforms, material);
                if (material instanceof LineDashedMaterial) {
                    this.refreshUniformsDash(m_uniforms, material);
                }
            } else if (material instanceof PointsMaterial) {
                this.refreshUniformsPoints(m_uniforms, material);
            } else if (material instanceof ShadowMaterial) {
                m_uniforms.color.value = material.color;
                m_uniforms.opacity.value = material.opacity;
            }
            // RectAreaLight Texture
            // TODO (mrdoob): Find a nicer implementation
            /**
             * LTC_1? LTC_2?
             */
            // if (m_uniforms.ltc_1 !== undefined) m_uniforms.ltc_1.value = UniformsLib.LTC_1;
            // if (m_uniforms.ltc_2 !== undefined) m_uniforms.ltc_2.value = UniformsLib.LTC_2;
            WebGLUniformsWrapper.upload(materialProperties.uniformsList, m_uniforms);
        }
        // common matrices
        p_uniforms.setValue("modelViewMatrix", object.modelViewMatrix);
        p_uniforms.setValue("normalMatrix", object.normalMatrix);
        p_uniforms.setValue("modelMatrix", object.matrixWorld);
        return program;
    }

    protected setupVertexAttributes(
        material: Material,
        program: WebGLProgramWrapper,
        geometry: BufferGeometry,
        startIndex: number = 0,
    ): void {
        const state = this.state;
        const gl = this.context;
        if (geometry && geometry instanceof InstancedBufferGeometry) {
            if (this.extensions.get("ANGLE_instanced_arrays") === null) {
                console.error(
                    "THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.",
                );
                return;
            }
        }
        state.initAttributes();
        const geometryAttributes: { [key: string]: BufferAttribute } = geometry.attributes;
        const programAttributes: { [key: string]: number } = program.getAttributes();
        // ShaderMaterial
        const materialDefaultAttributeValues: { [key: string]: number[] } = material.defaultAttributeValues;
        for (const name in programAttributes) {
            const programAttribute: number = programAttributes[name];
            if (programAttribute >= 0) {
                const geometryAttribute: BufferAttribute = geometryAttributes[name];
                if (geometryAttribute !== undefined) {
                    const normalized: boolean = geometryAttribute.normalized;
                    const size: number = geometryAttribute.itemSize;
                    const attribute: IWebGLBufferWrapper = this.attributes.get(geometryAttribute);
                    // TODO Attribute may not be available on context restore
                    if (attribute === undefined) continue;
                    const buffer: WebGLBuffer = attribute.buffer;
                    const type: number = attribute.type;
                    const bytesPerElement: number = attribute.bytesPerElement;
                    if (geometryAttribute instanceof InstancedInterleavedBufferAttribute) {
                        const stride: number = geometryAttribute.stride;
                        const offset: number = geometryAttribute.offset;
                        if (geometryAttribute) {
                            state.enableAttributeAndDivisor(programAttribute, geometryAttribute.meshPerAttribute);
                            if ((geometry as InstancedBufferGeometry).maxInstancedCount === undefined) {
                                (geometry as InstancedBufferGeometry).maxInstancedCount =
                                    geometryAttribute.meshPerAttribute * geometryAttribute.count;
                            }
                        } else {
                            state.enableAttribute(programAttribute);
                        }
                        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                        gl.vertexAttribPointer(
                            programAttribute,
                            size,
                            type,
                            normalized,
                            stride * bytesPerElement,
                            (startIndex * stride + offset) * bytesPerElement,
                        );
                    } else {
                        if (geometryAttribute instanceof InstancedBufferAttribute) {
                            state.enableAttributeAndDivisor(programAttribute, geometryAttribute.meshPerAttribute);
                            if ((geometry as InstancedBufferGeometry).maxInstancedCount === undefined) {
                                (geometry as InstancedBufferGeometry).maxInstancedCount =
                                    geometryAttribute.meshPerAttribute * geometryAttribute.count;
                            }
                        } else {
                            state.enableAttribute(programAttribute);
                        }
                        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                        gl.vertexAttribPointer(
                            programAttribute,
                            size,
                            type,
                            normalized,
                            0,
                            startIndex * size * bytesPerElement,
                        );
                    }
                } else if (materialDefaultAttributeValues !== undefined) {
                    const value: number[] = materialDefaultAttributeValues[name];
                    if (value !== undefined) {
                        switch (value.length) {
                            case 2:
                                gl.vertexAttrib2fv(programAttribute, value);
                                break;
                            case 3:
                                gl.vertexAttrib3fv(programAttribute, value);
                                break;
                            case 4:
                                gl.vertexAttrib4fv(programAttribute, value);
                                break;
                            default:
                                gl.vertexAttrib1fv(programAttribute, value);
                        }
                    }
                }
            }
        }
        state.disableUnusedAttributes();
    }

    protected initMaterial(material: Material, fog: Fog | FogExp2 | null, object: Object3D) {
        const lights: WebGLLights = this.lights;
        const clipping: WebGLClipping = this.clipping;
        const materialProperties: IMaterialProperties = this.properties.get(material);
        const parameters: IProgramParameters = this.programCache.getParameters(
            material,
            this.lights.state,
            this.shadowsArray,
            fog,
            this.clipping.numPlanes,
            this.clipping.numIntersection,
            object,
        );
        const code: string = this.programCache.getProgramCode(material, parameters);
        let program: WebGLProgramWrapper = materialProperties.program;
        let programChange: boolean = true;
        if (program === undefined) {
            // new material
            material.addEventListener("dispose", this.onMaterialDispose);
        } else if (program.code !== code) {
            // changed glsl or parameters
            this.releaseMaterialProgramReference(material);
        } else if (parameters.shaderID !== undefined) {
            // same glsl and uniform list
            return;
        } else {
            // only rebuild uniform list
            programChange = false;
        }
        if (programChange) {
            if (parameters.shaderID) {
                const shader: {
                    uniforms: { [key: string]: IUniform };
                    vertexShader: string;
                    fragmentShader: string;
                } =
                    ShaderLib[parameters.shaderID];
                materialProperties.shader = {
                    name: material.type,
                    uniforms: UniformsUtils.clone(shader.uniforms),
                    vertexShader: shader.vertexShader,
                    fragmentShader: shader.fragmentShader,
                };
            } else {
                materialProperties.shader = {
                    name: material.type,
                    uniforms: (material as ShaderMaterial).uniforms,
                    vertexShader: material.vertexShader,
                    fragmentShader: material.fragmentShader,
                };
            }
            material.onBeforeCompile(materialProperties.shader);
            program = this.programCache.acquireProgram(material, materialProperties.shader, parameters, code);
            materialProperties.program = program;
            material.program = program;
        }
        const programAttributes: { [key: string]: number } = program.getAttributes();
        if (material.morphTargets) {
            material.numSupportedMorphTargets = 0;
            for (let i: number = 0; i < this.maxMorphTargets; i++) {
                if (programAttributes["morphTarget" + i] >= 0) {
                    material.numSupportedMorphTargets++;
                }
            }
        }
        if (material.morphNormals) {
            material.numSupportedMorphNormals = 0;
            for (let i: number = 0; i < this.maxMorphNormals; i++) {
                if (programAttributes["morphNormal" + i] >= 0) {
                    material.numSupportedMorphNormals++;
                }
            }
        }
        const uniforms: { [key: string]: IUniform } = materialProperties.shader.uniforms;
        if (
            (!(material instanceof ShaderMaterial) && !(material instanceof RawShaderMaterial)) ||
            material.clipping === true
        ) {
            materialProperties.numClippingPlanes = clipping.numPlanes;
            materialProperties.numIntersection = clipping.numIntersection;
            uniforms.clippingPlanes = clipping.uniform;
        }
        materialProperties.fog = fog;
        // store the light setup it was created for
        materialProperties.lightsHash = lights.state.hash;
        if (material.lights) {
            // wire up the material to this renderer's lighting state
            uniforms.ambientLightColor.value = lights.state.ambient;
            uniforms.directionalLights.value = lights.state.directional;
            uniforms.spotLights.value = lights.state.spot;
            uniforms.rectAreaLights.value = lights.state.rectArea;
            uniforms.pointLights.value = lights.state.point;
            uniforms.hemisphereLights.value = lights.state.hemi;
            uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
            uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
            uniforms.spotShadowMap.value = lights.state.spotShadowMap;
            uniforms.spotShadowMatrix.value = lights.state.spotShadowMatrix;
            uniforms.pointShadowMap.value = lights.state.pointShadowMap;
            uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
            // TODO (abelnation): add area lights shadow info to uniforms
        }
        const progUniforms: WebGLUniformsWrapper = materialProperties.program.getUniforms();
        const uniformsList: UniformSetterType[] = WebGLUniformsWrapper.seqWithValue(progUniforms.seq, uniforms);
        materialProperties.uniformsList = uniformsList;
    }

    protected onMaterialDispose = (event: Event): void => {
        const material: Material = (event.target as any) as Material;
        material.removeEventListener("dispose", this.onMaterialDispose);
        this.deallocateMaterial(material);
    };

    protected deallocateMaterial(material: Material): void {
        this.releaseMaterialProgramReference(material);
        this.properties.remove(material);
    }

    protected releaseMaterialProgramReference(material: Material): void {
        const programInfo: WebGLProgramWrapper = this.properties.get(material).program;
        material.program = undefined;
        if (programInfo !== undefined) {
            this.programCache.releaseProgram(programInfo);
        }
    }

    public setFaceCulling(cullFace: number, frontFaceDirection: number): void {
        this.state.setCullFace(cullFace);
        this.state.setFlipSided(frontFaceDirection === FrontFaceDirectionCW);
    }

    public allocTextureUnit(): number {
        const textureUnit = this.usedTextureUnits;
        if (textureUnit >= this.capabilities.maxTextures) {
            console.warn(
                "THREE.WebGLRenderer: Trying to use " +
                    textureUnit +
                    " texture units while this GPU supports only " +
                    this.capabilities.maxTextures,
            );
        }
        this.usedTextureUnits += 1;
        return textureUnit;
    }

    protected setTexture2DWarned: boolean = false;

    public setTexture2D(texture: Texture | WebGLRenderTarget, unit: number): void {
        if (texture && texture instanceof WebGLRenderTarget) {
            if (!this.setTexture2DWarned) {
                console.warn(
                    "THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead.",
                );
                this.setTexture2DWarned = true;
            }
            texture = texture.texture;
        }
        this.textures.setTexture2D(texture as Texture, unit);
    }

    protected setTextureCubeWarned: boolean = false;

    public setTextureCube(cubeTexture: CubeTexture | WebGLRenderTargetCube, slot: number): void {
        let texture: CubeTexture | WebGLRenderTargetCube | Texture = cubeTexture;
        // backwards compatibility: peel texture.texture
        if (cubeTexture && cubeTexture instanceof WebGLRenderTargetCube) {
            if (!this.setTextureCubeWarned) {
                console.warn(
                    "THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead.",
                );
                this.setTextureCubeWarned = true;
            }
            texture = cubeTexture.texture;
        }
        // currently relying on the fact that WebGLRenderTargetCube.texture is a Texture and NOT a CubeTexture
        // TODO: unify these code paths
        if (
            (texture && texture instanceof CubeTexture) ||
            (Array.isArray((texture as CubeTexture).image) && (texture as CubeTexture).image.length === 6)
        ) {
            // CompressedTexture can have Array in image :/
            // this function alone should take care of cube textures
            this.textures.setTextureCube(texture as CubeTexture, slot);
        } else {
            // assumed: texture property of THREE.WebGLRenderTargetCube
            this.textures.setTextureCubeDynamic(texture as Texture, slot);
        }
    }

    public getRenderTarget(): WebGLRenderTarget | null {
        return this.currentRendererTarget;
    }

    public setRenderTarget(renderTarget: WebGLRenderTarget | WebGLRenderTargetCube): void {
        const properties: WebGLProperties = this.properties;
        this.currentRenderTarget = renderTarget;
        if (renderTarget && properties.get(renderTarget).__webglFramebuffer === undefined) {
            this.textures.setupRenderTarget(renderTarget);
        }
        let framebuffer: WebGLFramebuffer = null;
        let isCube: boolean = false;
        if (renderTarget) {
            const __webglFramebuffer: WebGLFramebuffer = properties.get(renderTarget).__webglFramebuffer;
            if (renderTarget instanceof WebGLRenderTargetCube) {
                framebuffer = __webglFramebuffer[renderTarget.activeCubeFace];
                isCube = true;
            } else {
                framebuffer = __webglFramebuffer;
            }
            this.currentViewport.copy(renderTarget.viewport);
            this.currentScissor.copy(renderTarget.scissor);
            this.currentScissorTest = renderTarget.scissorTest;
        } else {
            this.currentViewport.copy(this.viewport).multiplyScalar(this.pixelRatio);
            this.currentScissor.copy(this.scissor).multiplyScalar(this.pixelRatio);
            this.currentScissorTest = this.scissorTest;
        }
        const gl: WebGLRenderingContext = this.context;
        const state: WebGLState = this.state;
        if (this.currentFramebuffer !== framebuffer) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            this.currentFramebuffer = framebuffer;
        }
        state.viewport(this.currentViewport);
        state.scissor(this.currentScissor);
        state.setScissorTest(this.currentScissorTest);
        if (isCube) {
            const textureProperties: ITextureProperties = properties.get(renderTarget.texture);
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl.COLOR_ATTACHMENT0,
                gl.TEXTURE_CUBE_MAP_POSITIVE_X + (renderTarget as WebGLRenderTargetCube).activeCubeFace,
                textureProperties.__webglTexture,
                (renderTarget as WebGLRenderTargetCube).activeMipMapLevel,
            );
        }
    }

    public readRenderTargetPixels(
        renderTarget: WebGLRenderTarget,
        x: number,
        y: number,
        width: number,
        height: number,
        buffer: TypedArray,
    ): void {
        if (!(renderTarget && renderTarget instanceof WebGLRenderTarget)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
            return;
        }
        const gl: WebGLRenderingContext = this.context;
        const utils: WebGLUtils = this.utils;
        const extensions: WebGLExtensions = this.extensions;
        const framebuffer: WebGLFramebuffer = this.properties.get(renderTarget).__webglFramebuffer;
        if (framebuffer) {
            let restore: boolean = false;
            if (framebuffer !== this.currentFramebuffer) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
                restore = true;
            }
            try {
                var texture = renderTarget.texture;
                var textureFormat = texture.format;
                var textureType = texture.type;
                if (
                    textureFormat !== RGBAFormat &&
                    utils.convert(textureFormat) !== gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_FORMAT)
                ) {
                    console.error(
                        "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.",
                    );
                    return;
                }
                if (
                    textureType !== UnsignedByteType &&
                    utils.convert(textureType) !== gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_TYPE) && // IE11, Edge and Chrome Mac < 52 (#9513)
                    !(
                        textureType === FloatType &&
                        (extensions.get("OES_texture_float") || extensions.get("WEBGL_color_buffer_float"))
                    ) && // Chrome Mac >= 52 and Firefox
                    !(textureType === HalfFloatType && extensions.get("EXT_color_buffer_half_float"))
                ) {
                    console.error(
                        "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.",
                    );
                    return;
                }
                if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
                    // the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)
                    if (x >= 0 && x <= renderTarget.width - width && (y >= 0 && y <= renderTarget.height - height)) {
                        gl.readPixels(
                            x,
                            y,
                            width,
                            height,
                            utils.convert(textureFormat),
                            utils.convert(textureType),
                            buffer,
                        );
                    }
                } else {
                    console.error(
                        "THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.",
                    );
                }
            } finally {
                if (restore) {
                    gl.bindFramebuffer(gl.FRAMEBUFFER, this.currentFramebuffer);
                }
            }
        }
    }

    public copyFramebufferToTexture(position: Vector2, texture: Texture, level: number): void {
        const gl: WebGLRenderingContext = this.context;
        const width: number = texture.image.width;
        const height: number = texture.image.height;
        const internalFormat: number = this.utils.convert(texture.format);
        this.setTexture2D(texture, 0);
        gl.copyTexImage2D(gl.TEXTURE_2D, level || 0, internalFormat, position.x, position.y, width, height, 0);
    }

    // Uniforms (refresh uniforms objects)
    protected refreshUniformsCommon(uniforms: { [key: string]: IUniform }, material: Material): void {
        uniforms.opacity.value = material.opacity;
        if (material.color) {
            uniforms.diffuse.value = material.color;
        }
        if (material.emissive) {
            (uniforms.emissive.value as Color).copy(material.emissive).multiplyScalar(material.emissiveIntensity);
        }
        if (material.map) {
            uniforms.map.value = material.map;
        }
        if (material.alphaMap) {
            uniforms.alphaMap.value = material.alphaMap;
        }
        if (material.specularMap) {
            uniforms.specularMap.value = material.specularMap;
        }
        if (material.envMap) {
            uniforms.envMap.value = material.envMap;
            // don't flip CubeTexture envMaps, flip everything else:
            //  WebGLRenderTargetCube will be flipped for backwards compatibility
            //  WebGLRenderTargetCube.texture will be flipped because it's a Texture and NOT a CubeTexture
            // this check must be handled differently, or removed entirely, if WebGLRenderTargetCube uses a CubeTexture in the future
            uniforms.flipEnvMap.value = !(material.envMap && material.envMap instanceof CubeTexture) ? 1 : -1;
            uniforms.reflectivity.value = material.reflectivity;
            uniforms.refractionRatio.value = material.refractionRatio;
        }
        if (material.lightMap) {
            uniforms.lightMap.value = material.lightMap;
            uniforms.lightMapIntensity.value = material.lightMapIntensity;
        }
        if (material.aoMap) {
            uniforms.aoMap.value = material.aoMap;
            uniforms.aoMapIntensity.value = material.aoMapIntensity;
        }
        // uv repeat and offset setting priorities
        // 1. color map
        // 2. specular map
        // 3. normal map
        // 4. bump map
        // 5. alpha map
        // 6. emissive map
        let uvScaleMap: WebGLRenderTarget | Texture;
        if (material.map) {
            uvScaleMap = material.map;
        } else if (material.specularMap) {
            uvScaleMap = material.specularMap;
        } else if (material.displacementMap) {
            uvScaleMap = material.displacementMap;
        } else if (material.normalMap) {
            uvScaleMap = material.normalMap;
        } else if (material.bumpMap) {
            uvScaleMap = material.bumpMap;
        } else if (material.roughnessMap) {
            uvScaleMap = material.roughnessMap;
        } else if (material.metalnessMap) {
            uvScaleMap = material.metalnessMap;
        } else if (material.alphaMap) {
            uvScaleMap = material.alphaMap;
        } else if (material.emissiveMap) {
            uvScaleMap = material.emissiveMap;
        }
        if (uvScaleMap !== undefined) {
            // backwards compatibility
            if (uvScaleMap instanceof WebGLRenderTarget) {
                uvScaleMap = uvScaleMap.texture;
            }
            if (uvScaleMap.matrixAutoUpdate === true) {
                const offset: Vector2 = uvScaleMap.offset;
                const repeat: Vector2 = uvScaleMap.repeat;
                const rotation: number = uvScaleMap.rotation;
                const center: Vector2 = uvScaleMap.center;
                uvScaleMap.matrix.setUvTransform(offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y);
            }
            (uniforms.uvTransform.value as Matrix3).copy(uvScaleMap.matrix);
        }
    }

    protected refreshUniformsLine(uniforms: { [key: string]: IUniform }, material: Material): void {
        uniforms.diffuse.value = material.color;
        uniforms.opacity.value = material.opacity;
    }

    protected refreshUniformsDash(uniforms: { [key: string]: IUniform }, material: Material): void {
        uniforms.dashSize.value = material.dashSize;
        uniforms.totalSize.value = material.dashSize + material.gapSize;
        uniforms.scale.value = material.scale;
    }

    protected refreshUniformsPoints(uniforms: { [key: string]: IUniform }, material: Material): void {
        uniforms.diffuse.value = material.color;
        uniforms.opacity.value = material.opacity;
        uniforms.size.value = material.size * this.pixelRatio;
        uniforms.scale.value = this.height * 0.5;
        uniforms.map.value = material.map;
        if (material.map !== null) {
            if (material.map.matrixAutoUpdate === true) {
                const offset: Vector2 = material.map.offset;
                const repeat: Vector2 = material.map.repeat;
                const rotation: number = material.map.rotation;
                const center: Vector2 = material.map.center;
                material.map.matrix.setUvTransform(
                    offset.x,
                    offset.y,
                    repeat.x,
                    repeat.y,
                    rotation,
                    center.x,
                    center.y,
                );
            }
            (uniforms.uvTransform.value as Matrix3).copy(material.map.matrix);
        }
    }

    protected refreshUniformsFog(uniforms: { [key: string]: IUniform }, fog: Fog | FogExp2): void {
        uniforms.fogColor.value = fog.color;
        if (fog instanceof Fog) {
            uniforms.fogNear.value = fog.near;
            uniforms.fogFar.value = fog.far;
        } else if (fog instanceof FogExp2) {
            uniforms.fogDensity.value = fog.density;
        }
    }

    protected refreshUniformsLambert(uniforms: { [key: string]: IUniform }, material: Material): void {
        if (material.emissiveMap) {
            uniforms.emissiveMap.value = material.emissiveMap;
        }
    }

    protected refreshUniformsPhong(uniforms: { [key: string]: IUniform }, material: Material): void {
        uniforms.specular.value = material.specular;
        uniforms.shininess.value = Math.max(material.shininess, 1e-4); // to prevent pow( 0.0, 0.0 )
        if (material.emissiveMap) {
            uniforms.emissiveMap.value = material.emissiveMap;
        }
        if (material.bumpMap) {
            uniforms.bumpMap.value = material.bumpMap;
            uniforms.bumpScale.value = material.bumpScale;
        }
        if (material.normalMap) {
            uniforms.normalMap.value = material.normalMap;
            (uniforms.normalScale.value as Vector2).copy(material.normalScale);
        }
        if (material.displacementMap) {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
    }

    protected refreshUniformsToon(uniforms: { [key: string]: IUniform }, material: Material): void {
        this.refreshUniformsPhong(uniforms, material);
        if (material.gradientMap) {
            uniforms.gradientMap.value = material.gradientMap;
        }
    }

    protected refreshUniformsStandard(uniforms: { [key: string]: IUniform }, material: Material): void {
        uniforms.roughness.value = material.roughness;
        uniforms.metalness.value = material.metalness;
        if (material.roughnessMap) {
            uniforms.roughnessMap.value = material.roughnessMap;
        }
        if (material.metalnessMap) {
            uniforms.metalnessMap.value = material.metalnessMap;
        }
        if (material.emissiveMap) {
            uniforms.emissiveMap.value = material.emissiveMap;
        }
        if (material.bumpMap) {
            uniforms.bumpMap.value = material.bumpMap;
            uniforms.bumpScale.value = material.bumpScale;
        }
        if (material.normalMap) {
            uniforms.normalMap.value = material.normalMap;
            (uniforms.normalScale.value as Vector2).copy(material.normalScale);
        }
        if (material.displacementMap) {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
        if (material.envMap) {
            //uniforms.envMap.value = material.envMap; // part of uniforms common
            uniforms.envMapIntensity.value = material.envMapIntensity;
        }
    }

    protected refreshUniformsPhysical(uniforms: { [key: string]: IUniform }, material: Material): void {
        uniforms.clearCoat.value = material.clearCoat;
        uniforms.clearCoatRoughness.value = material.clearCoatRoughness;
        this.refreshUniformsStandard(uniforms, material);
    }

    protected refreshUniformsDepth(uniforms: { [key: string]: IUniform }, material: Material): void {
        if (material.displacementMap) {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
    }

    protected refreshUniformsDistance(uniforms: { [key: string]: IUniform }, material: Material): void {
        if (material.displacementMap) {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
        (uniforms.referencePosition.value as Vector3).copy(material.referencePosition);
        uniforms.nearDistance.value = material.nearDistance;
        uniforms.farDistance.value = material.farDistance;
    }

    protected refreshUniformsNormal(uniforms: { [key: string]: IUniform }, material: Material): void {
        if (material.bumpMap) {
            uniforms.bumpMap.value = material.bumpMap;
            uniforms.bumpScale.value = material.bumpScale;
        }
        if (material.normalMap) {
            uniforms.normalMap.value = material.normalMap;
            (uniforms.normalScale.value as Vector2).copy(material.normalScale);
        }
        if (material.displacementMap) {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
    }

    // If uniforms are marked as clean, they don't need to be loaded to the GPU.
    protected markUniformsLightsNeedsUpdate(uniforms: { [key: string]: IUniform }, value: boolean): void {
        uniforms.ambientLightColor.needsUpdate = value;
        uniforms.directionalLights.needsUpdate = value;
        uniforms.pointLights.needsUpdate = value;
        uniforms.spotLights.needsUpdate = value;
        uniforms.rectAreaLights.needsUpdate = value;
        uniforms.hemisphereLights.needsUpdate = value;
    }
}
