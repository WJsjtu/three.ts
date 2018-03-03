import { REVISION, RGBAFormat, HalfFloatType, FloatType, UnsignedByteType, FrontFaceDirectionCW, TriangleFanDrawMode, TriangleStripDrawMode, TrianglesDrawMode, NoColors, LinearToneMapping, } from "../constants";
import { Camera } from "../cameras/Camera";
import { ArrayCamera } from "../cameras/ArrayCamera";
import { InstancedBufferGeometry } from "../core/InstancedBufferGeometry";
import { InstancedInterleavedBufferAttribute } from "../core/InstancedInterleavedBufferAttribute";
import { InstancedBufferAttribute } from "../core/InstancedBufferAttribute";
import { Light } from "../lights/Light";
import { MathUtil } from "../math/Math";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { Frustum } from "../math/Frustum";
import { Matrix4 } from "../math/Matrix4";
import { WebGLUniformsWrapper } from "./webgl/WebGLUniforms";
import { ShaderMaterial, MeshPhongMaterial, MeshStandardMaterial, MeshLambertMaterial, MeshBasicMaterial, MeshToonMaterial, MeshPhysicalMaterial, RawShaderMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshNormalMaterial, LineBasicMaterial, LineDashedMaterial, PointsMaterial, ShadowMaterial, } from "../materials/Materials";
import { Mesh } from "../objects/Mesh";
import { Line } from "../objects/Line";
import { Sprite } from "../objects/Sprite";
import { LineSegments } from "../objects/LineSegments";
import { LineLoop } from "../objects/LineLoop";
import { Points } from "../objects/Points";
import { SkinnedMesh } from "../objects/SkinnedMesh";
import { Fog } from "../scenes/Fog";
import { FogExp2 } from "../scenes/FogExp2";
import { DataTexture } from "../textures/DataTexture";
import { CubeTexture } from "../textures/CubeTexture";
import { ShaderLib } from "./shaders/ShaderLib";
import { UniformsUtils } from "./shaders/UniformsUtils";
import { WebGLShadowMap } from "./webgl/WebGLShadowMap";
import { WebGLState } from "./webgl/WebGLState";
import { WebGLUtils } from "./webgl/WebGLUtils";
import { WebGLClipping } from "./webgl/WebGLClipping";
import { WebGLExtensions } from "./webgl/WebGLExtensions";
import { WebGLCapabilities } from "./webgl/WebGLCapabilities";
import { WebGLProperties, } from "./webgl/WebGLProperties";
import { WebGLTextures } from "./webgl/WebGLTextures";
import { WebGLAttributes } from "./webgl/WebGLAttributes";
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
import { WebGLRenderTarget } from "./WebGLRenderTarget";
import { WebGLRenderTargetCube } from "./WebGLRenderTargetCube";
import { ImmediateRenderObject } from "../extras/objects/ImmediateRenderObject";
export class WebGLRenderer {
    constructor(parameters = {}) {
        this.lightsArray = [];
        this.shadowsArray = [];
        this.spritesArray = [];
        // clearing
        this.autoClear = true;
        this.autoClearColor = true;
        this.autoClearDepth = true;
        this.autoClearStencil = true;
        // scene graph
        this.sortObjects = true;
        // user-defined clipping
        this.clippingPlanes = [];
        // physically based shading
        this.gammaInput = false; // for backwards compatibility
        this.gammaFactor = 2.0;
        this.gammaOutput = false;
        // physical lights
        this.physicallyCorrectLights = false;
        // tone mapping
        this.toneMapping = LinearToneMapping;
        this.toneMappingExposure = 1.0;
        this.toneMappingWhitePoint = 1.0;
        // morphs
        this.maxMorphNormals = 4;
        this.maxMorphTargets = 8;
        // internal properties
        this.isContextLost = false;
        // internal state cache
        this.currentRenderTarget = null;
        this.currentFramebuffer = null;
        this.currentMaterialId = -1;
        this.currentGeometryProgram = "";
        this.currentCamera = null;
        this.currentArrayCamera = null;
        this.currentViewport = new Vector4();
        this.currentScissor = new Vector4();
        this.currentScissorTest = null;
        //
        this.usedTextureUnits = 0;
        this.pixelRatio = 1;
        this.scissorTest = false;
        // frustum
        this.frustum = new Frustum();
        // clipping
        this.clipping = new WebGLClipping();
        this.clippingEnabled = false;
        this.localClippingEnabled = false;
        // camera matrices cache
        this.projScreenMatrix = new Matrix4();
        this.tempVector3 = new Vector3();
        // info
        this.infoMemory = {
            geometries: 0,
            textures: 0,
        };
        this.infoRender = {
            frame: 0,
            calls: 0,
            vertices: 0,
            faces: 0,
            points: 0,
        };
        this.info = {
            render: this.infoRender,
            memory: this.infoMemory,
            programs: null,
            autoReset: true,
            reset: () => {
                this.infoRender.frame++;
                this.infoRender.calls = 0;
                this.infoRender.vertices = 0;
                this.infoRender.faces = 0;
                this.infoRender.points = 0;
            },
        };
        this.onContextLost = (event) => {
            event.preventDefault();
            console.log("THREE.WebGLRenderer: Context Lost.");
            this.isContextLost = true;
        };
        this.onContextRestore = () => {
            console.log("THREE.WebGLRenderer: Context Restored.");
            this.isContextLost = false;
            this.initGLContext();
        };
        this.isAnimating = false;
        this.onAnimationFrame = null;
        this.loop = (time) => {
            if (this.onAnimationFrame !== null)
                this.onAnimationFrame(time);
            window.requestAnimationFrame(this.loop);
        };
        this.onMaterialDispose = (event) => {
            const material = event.target;
            material.removeEventListener("dispose", this.onMaterialDispose);
            this.deallocateMaterial(material);
        };
        this.setTexture2DWarned = false;
        this.setTextureCubeWarned = false;
        this.parameters = parameters;
        console.log("THREE.WebGLRenderer", REVISION);
        (this.domElement =
            parameters.canvas !== undefined
                ? parameters.canvas
                : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")),
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
        this.width = this.domElement.width;
        this.height = this.domElement.height;
        this.viewport = new Vector4(0, 0, this.width, this.height);
        this.scissor = new Vector4(0, 0, this.width, this.height);
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
                    this.domElement.getContext("webgl", contextAttributes) ||
                    this.domElement.getContext("experimental-webgl", contextAttributes);
            if (this.context === null) {
                if (this.domElement.getContext("webgl") !== null) {
                    throw new Error("Error creating WebGL context with your selected attributes.");
                }
                else {
                    throw new Error("Error creating WebGL context.");
                }
            }
            // Some experimental-webgl implementations do not have getShaderPrecisionFormat
            if (this.domElement.getShaderPrecisionFormat === undefined) {
                this.domElement.getShaderPrecisionFormat = function () {
                    return { rangeMin: 1, rangeMax: 1, precision: 1 };
                };
            }
        }
        catch (error) {
            console.error("THREE.WebGLRenderer: " + error.message);
        }
        this.initGLContext();
        this.shadowMap = new WebGLShadowMap(this, this.objects, this.capabilities.maxTextureSize);
    }
    getTargetPixelRatio() {
        return this.currentRenderTarget === null ? this.pixelRatio : 1;
    }
    getContext() {
        return this.context;
    }
    getContextAttributes() {
        return this.context.getContextAttributes();
    }
    forceContextLoss() {
        const extension = this.extensions.get("WEBGL_lose_context");
        if (extension)
            extension.loseContext();
    }
    forceContextRestore() {
        const extension = this.extensions.get("WEBGL_lose_context");
        if (extension)
            extension.restoreContext();
    }
    getPixelRatio() {
        return this.pixelRatio;
    }
    setPixelRatio(value) {
        if (value === undefined)
            return;
        this.pixelRatio = value;
        this.setSize(this.width, this.height, false);
    }
    getSize() {
        return {
            width: this.width,
            height: this.height,
        };
    }
    setSize(width, height, updateStyle) {
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
    getDrawingBufferSize() {
        return {
            width: this.width * this.pixelRatio,
            height: this.height * this.pixelRatio,
        };
    }
    setDrawingBufferSize(width, height, pixelRatio) {
        this.width = width;
        this.height = height;
        this.pixelRatio = pixelRatio;
        this.domElement.width = width * pixelRatio;
        this.domElement.height = height * pixelRatio;
        this.setViewport(0, 0, width, height);
    }
    getCurrentViewport() {
        return this.currentViewport;
    }
    setViewport(x, y, width, height) {
        this.viewport.set(x, this.height - y - height, width, height);
        this.state.viewport(this.currentViewport.copy(this.viewport).multiplyScalar(this.pixelRatio));
    }
    setScissor(x, y, width, height) {
        this.scissor.set(x, this.height - y - height, width, height);
        this.state.scissor(this.currentScissor.copy(this.scissor).multiplyScalar(this.pixelRatio));
    }
    setScissorTest(value) {
        this.state.setScissorTest((this.scissorTest = value));
    }
    getClearColor() {
        return this.background.getClearColor();
    }
    setClearColor(color, alpha) {
        this.background.setClearColor(color, alpha);
    }
    getClearAlpha() {
        return this.background.getClearAlpha();
    }
    setClearAlpha(alpha) {
        this.background.setClearAlpha(alpha);
    }
    clear(color, depth, stencil) {
        const gl = this.context;
        let bits = 0;
        if (color === undefined || color)
            bits |= gl.COLOR_BUFFER_BIT;
        if (depth === undefined || depth)
            bits |= gl.DEPTH_BUFFER_BIT;
        if (stencil === undefined || stencil)
            bits |= gl.STENCIL_BUFFER_BIT;
        gl.clear(bits);
    }
    clearColor() {
        this.clear(true, false, false);
    }
    clearDepth() {
        this.clear(false, true, false);
    }
    clearStencil() {
        this.clear(false, false, true);
    }
    clearTarget(renderTarget, color, depth, stencil) {
        this.setRenderTarget(renderTarget);
        this.clear(color, depth, stencil);
    }
    dispose() {
        this.domElement.removeEventListener("webglcontextlost", this.onContextLost, false);
        this.domElement.removeEventListener("webglcontextrestored", this.onContextRestore, false);
        this.renderLists.dispose();
        this.properties.dispose();
        this.objects.dispose();
    }
    initGLContext() {
        const gl = this.context;
        const extensions = new WebGLExtensions(gl);
        extensions.get("WEBGL_depth_texture");
        extensions.get("OES_texture_float");
        extensions.get("OES_texture_float_linear");
        extensions.get("OES_texture_half_float");
        extensions.get("OES_texture_half_float_linear");
        extensions.get("OES_standard_derivatives");
        extensions.get("OES_element_index_uint");
        extensions.get("ANGLE_instanced_arrays");
        const utils = new WebGLUtils(gl, extensions);
        const capabilities = new WebGLCapabilities(gl, extensions, this.parameters);
        const state = new WebGLState(gl, extensions, utils);
        state.scissor(this.currentScissor.copy(this.scissor).multiplyScalar(this.pixelRatio));
        state.viewport(this.currentViewport.copy(this.viewport).multiplyScalar(this.pixelRatio));
        const properties = new WebGLProperties();
        const textures = new WebGLTextures(gl, extensions, state, properties, capabilities, utils, this.infoMemory, this.infoRender);
        const attributes = new WebGLAttributes(gl);
        const geometries = new WebGLGeometries(gl, attributes, this.infoMemory);
        const objects = new WebGLObjects(geometries, this.infoRender);
        const morphtargets = new WebGLMorphtargets(gl);
        const programCache = new WebGLPrograms(this, extensions, capabilities);
        const lights = new WebGLLights();
        const renderLists = new WebGLRenderLists();
        const background = new WebGLBackground(this, state, geometries, this.premultipliedAlpha);
        const bufferRenderer = new WebGLBufferRenderer(gl, extensions, this.infoRender);
        const indexedBufferRenderer = new WebGLIndexedBufferRenderer(gl, extensions, this.infoRender);
        const spriteRenderer = new WebGLSpriteRenderer(this, state, textures, capabilities);
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
    compile(scene, camera) {
        this.lightsArray.length = 0;
        this.shadowsArray.length = 0;
        scene.traverse((object) => {
            if (object instanceof Light) {
                this.lightsArray.push(object);
                if (object.castShadow) {
                    this.shadowsArray.push(object);
                }
            }
        });
        this.lights.setup(this.lightsArray, this.shadowsArray, camera);
        scene.traverse((obj) => {
            const object = obj;
            if (object.material) {
                if (Array.isArray(object.material)) {
                    for (let i = 0; i < object.material.length; i++) {
                        this.initMaterial(object.material[i], scene.fog, object);
                    }
                }
                else {
                    this.initMaterial(object.material, scene.fog, object);
                }
            }
        });
    }
    start() {
        if (this.isAnimating)
            return;
        window.requestAnimationFrame(this.loop);
        this.isAnimating = true;
    }
    animate(callback) {
        this.onAnimationFrame = callback;
        this.start();
    }
    render(scene, camera, renderTarget, forceClear) {
        if (!(camera && camera instanceof Camera)) {
            console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
            return;
        }
        if (this.isContextLost)
            return;
        // reset caching for this frame
        this.currentGeometryProgram = "";
        this.currentMaterialId = -1;
        this.currentCamera = null;
        // update scene graph
        if (scene.autoUpdate === true)
            scene.updateMatrixWorld();
        // update camera matrices and frustum
        if (camera.parent === null)
            camera.updateMatrixWorld();
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
        if (this.clippingEnabled)
            this.clipping.beginShadows();
        this.shadowMap.render(this.shadowsArray, scene, camera);
        this.lights.setup(this.lightsArray, this.shadowsArray, camera);
        if (this.clippingEnabled)
            this.clipping.endShadows();
        //
        if (this.info.autoReset)
            this.info.reset();
        if (renderTarget === undefined) {
            renderTarget = null;
        }
        this.setRenderTarget(renderTarget);
        //
        this.background.render(this.currentRenderList, scene, camera, forceClear);
        // render scene
        const opaqueObjects = this.currentRenderList.opaque;
        const transparentObjects = this.currentRenderList.transparent;
        if (scene.overrideMaterial) {
            const overrideMaterial = scene.overrideMaterial;
            if (opaqueObjects.length)
                this.renderObjects(opaqueObjects, scene, camera, overrideMaterial);
            if (transparentObjects.length)
                this.renderObjects(transparentObjects, scene, camera, overrideMaterial);
        }
        else {
            // opaque pass (front-to-back order)
            if (opaqueObjects.length)
                this.renderObjects(opaqueObjects, scene, camera);
            // transparent pass (back-to-front order)
            if (transparentObjects.length)
                this.renderObjects(transparentObjects, scene, camera);
        }
        // custom renderers
        this.spriteRenderer.render(this.spritesArray, scene, camera);
        // Generate mipmap if we're using any kind of mipmap filtering
        if (renderTarget) {
            this.textures.updateRenderTargetMipmap(renderTarget);
        }
        // Ensure depth buffer writing is enabled so it can be cleared on next render
        const state = this.state;
        state.buffers.depth.setTest(true);
        state.buffers.depth.setMask(true);
        state.buffers.color.setMask(true);
        state.setPolygonOffset(false);
        //scene.onAfterRender(this, scene, camera, renderTarget );
        // _gl.finish();
    }
    projectObject(object, camera, sortObjects = false) {
        if (object.visible === false)
            return;
        const visible = object.layers.test(camera.layers);
        if (visible) {
            if (object instanceof Light) {
                this.lightsArray.push(object);
                if (object.castShadow) {
                    this.shadowsArray.push(object);
                }
            }
            else if (object instanceof Sprite) {
                if (!object.frustumCulled || this.frustum.intersectsSprite(object)) {
                    this.spritesArray.push(object);
                }
            }
            else if (object instanceof ImmediateRenderObject) {
                if (sortObjects) {
                    this.tempVector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(this.projScreenMatrix);
                }
                this.currentRenderList.push(object, null, object.material, this.tempVector3.z, null);
            }
            else if (object instanceof Mesh || object instanceof Line || object instanceof Points) {
                if (object instanceof SkinnedMesh) {
                    object.skeleton.update();
                }
                if (!object.frustumCulled || this.frustum.intersectsObject(object)) {
                    if (sortObjects) {
                        this.tempVector3.setFromMatrixPosition(object.matrixWorld).applyMatrix4(this.projScreenMatrix);
                    }
                    const geometry = this.objects.update(object);
                    const material = object.material;
                    if (Array.isArray(material)) {
                        const groups = geometry.groups;
                        for (let i = 0, l = groups.length; i < l; i++) {
                            const group = groups[i];
                            const groupMaterial = material[group.materialIndex];
                            if (groupMaterial && groupMaterial.visible) {
                                this.currentRenderList.push(object, geometry, groupMaterial, this.tempVector3.z, group);
                            }
                        }
                    }
                    else if (material.visible) {
                        this.currentRenderList.push(object, geometry, material, this.tempVector3.z, null);
                    }
                }
            }
        }
        const children = object.children;
        for (let i = 0, l = children.length; i < l; i++) {
            this.projectObject(children[i], camera, sortObjects);
        }
    }
    renderObjects(renderList, scene, camera, overrideMaterial) {
        for (let i = 0, l = renderList.length; i < l; i++) {
            const renderItem = renderList[i];
            const object = renderItem.object;
            const geometry = renderItem.geometry;
            const material = overrideMaterial === undefined ? renderItem.material : overrideMaterial;
            const group = renderItem.group;
            if (camera instanceof ArrayCamera) {
                this.currentArrayCamera = camera;
                const cameras = camera.cameras;
                for (var j = 0, jl = cameras.length; j < jl; j++) {
                    var camera2 = cameras[j];
                    if (object.layers.test(camera2.layers)) {
                        var bounds = camera2.bounds;
                        var x = bounds.x * this.width;
                        var y = bounds.y * this.height;
                        var width = bounds.z * this.width;
                        var height = bounds.w * this.height;
                        this.state.viewport(this.currentViewport.set(x, y, width, height).multiplyScalar(this.pixelRatio));
                        this.renderObject(object, scene, camera2, geometry, material, group);
                    }
                }
            }
            else {
                this.currentArrayCamera = null;
                this.renderObject(object, scene, camera, geometry, material, group);
            }
        }
    }
    renderObject(object, scene, camera, geometry, material, group) {
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
        }
        else {
            this.renderBufferDirect(camera, scene.fog, geometry, material, object, group);
        }
        //object.onAfterRender(this, scene, camera, geometry, material, group );
    }
    // Buffer rendering
    // renderObjectImmediate 目前看来很有问题
    renderObjectImmediate(object, program, material) {
        object.render((object) => {
            this.renderBufferImmediate(object, program, material);
        });
    }
    renderBufferImmediate(object, program, material) {
        const state = this.state;
        const gl = this.context;
        state.initAttributes();
        const buffers = this.properties.get(object);
        if (object.hasPositions && !buffers.position)
            buffers.position = gl.createBuffer();
        if (object.hasNormals && !buffers.normal)
            buffers.normal = gl.createBuffer();
        if (object.hasUvs && !buffers.uv)
            buffers.uv = gl.createBuffer();
        if (object.hasColors && !buffers.color)
            buffers.color = gl.createBuffer();
        const programAttributes = program.getAttributes();
        if (object.hasPositions) {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.bufferData(gl.ARRAY_BUFFER, object.positionArray, gl.DYNAMIC_DRAW);
            state.enableAttribute(programAttributes.position);
            gl.vertexAttribPointer(programAttributes.position, 3, gl.FLOAT, false, 0, 0);
        }
        if (object.hasNormals) {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
            if (!(material instanceof MeshPhongMaterial) &&
                !(material instanceof MeshStandardMaterial) &&
                !(material instanceof MeshNormalMaterial) &&
                material.flatShading === true) {
                for (let i = 0, l = object.count * 3; i < l; i += 9) {
                    const array = object.normalArray;
                    const nx = (array[i + 0] + array[i + 3] + array[i + 6]) / 3;
                    const ny = (array[i + 1] + array[i + 4] + array[i + 7]) / 3;
                    const nz = (array[i + 2] + array[i + 5] + array[i + 8]) / 3;
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
    renderBufferDirect(camera, fog, geometry, material, object, group) {
        const gl = this.context;
        const frontFaceCW = object instanceof Mesh && object.matrixWorld.determinant() < 0;
        this.state.setMaterial(material, frontFaceCW);
        const program = this.setProgram(camera, fog, material, object);
        const geometryProgram = geometry.id + "_" + program.id + "_" + (material.wireframe === true);
        let updateBuffers = false;
        if (geometryProgram !== this.currentGeometryProgram) {
            this.currentGeometryProgram = geometryProgram;
            updateBuffers = true;
        }
        if (object.morphTargetInfluences) {
            this.morphtargets.update(object, geometry, material, program);
            updateBuffers = true;
        }
        //
        let index = geometry.index;
        const position = geometry.attributes.position;
        let rangeFactor = 1;
        if (material.wireframe === true) {
            index = this.geometries.getWireframeAttribute(geometry);
            rangeFactor = 2;
        }
        let attribute;
        let renderer = this.bufferRenderer;
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
        let dataCount = 0;
        if (index !== null) {
            dataCount = index.count;
        }
        else if (position !== undefined) {
            dataCount = position.count;
        }
        const rangeStart = geometry.drawRange.start * rangeFactor;
        const rangeCount = geometry.drawRange.count * rangeFactor;
        const groupStart = group !== null ? group.start * rangeFactor : 0;
        const groupCount = group !== null ? group.count * rangeFactor : Infinity;
        const drawStart = Math.max(rangeStart, groupStart);
        const drawEnd = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;
        const drawCount = Math.max(0, drawEnd - drawStart + 1);
        if (drawCount === 0)
            return;
        //
        if (object instanceof Mesh) {
            if (material.wireframe === true) {
                this.state.setLineWidth(material.wireframeLinewidth * this.getTargetPixelRatio());
                renderer.setMode(gl.LINES);
            }
            else {
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
        }
        else if (object instanceof Line) {
            let lineWidth = material.linewidth;
            if (lineWidth === undefined)
                lineWidth = 1; // Not using Line*Material
            this.state.setLineWidth(lineWidth * this.getTargetPixelRatio());
            if (object instanceof LineSegments) {
                renderer.setMode(gl.LINES);
            }
            else if (object instanceof LineLoop) {
                renderer.setMode(gl.LINE_LOOP);
            }
            else {
                renderer.setMode(gl.LINE_STRIP);
            }
        }
        else if (object instanceof Points) {
            renderer.setMode(gl.POINTS);
        }
        if (geometry && geometry instanceof InstancedBufferGeometry) {
            if (geometry.maxInstancedCount > 0) {
                renderer.renderInstances(geometry, drawStart, drawCount);
            }
        }
        else {
            renderer.render(drawStart, drawCount);
        }
    }
    setProgram(camera, fog, material, object) {
        const gl = this.context;
        this.usedTextureUnits = 0;
        const materialProperties = this.properties.get(material);
        if (this.clippingEnabled) {
            if (this.localClippingEnabled || camera !== this.currentCamera) {
                const useCache = camera === this.currentCamera && material.id === this.currentMaterialId;
                // we might want to call this function with some ClippingGroup
                // object instead of the material, once it becomes feasible
                // (#8465, #8379)
                this.clipping.setState(material.clippingPlanes, material.clipIntersection, material.clipShadows, camera, materialProperties, useCache);
            }
        }
        if (material.needsUpdate === false) {
            if (materialProperties.program === undefined) {
                material.needsUpdate = true;
            }
            else if (material.fog && materialProperties.fog !== fog) {
                material.needsUpdate = true;
            }
            else if (material.lights && materialProperties.lightsHash !== this.lights.state.hash) {
                material.needsUpdate = true;
            }
            else if (materialProperties.numClippingPlanes !== undefined &&
                (materialProperties.numClippingPlanes !== this.clipping.numPlanes ||
                    materialProperties.numIntersection !== this.clipping.numIntersection)) {
                material.needsUpdate = true;
            }
        }
        if (material.needsUpdate) {
            this.initMaterial(material, fog, object);
            material.needsUpdate = false;
        }
        let refreshProgram = false;
        let refreshMaterial = false;
        let refreshLights = false;
        const program = materialProperties.program, p_uniforms = program.getUniforms(), m_uniforms = materialProperties.shader.uniforms;
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
            if (material instanceof ShaderMaterial ||
                material instanceof MeshPhongMaterial ||
                material instanceof MeshStandardMaterial ||
                material.envMap) {
                const uCamPos = p_uniforms.map.cameraPosition;
                if (uCamPos !== undefined) {
                    uCamPos.setValue(new Vector3().setFromMatrixPosition(camera.matrixWorld));
                }
            }
            if (material instanceof MeshPhongMaterial ||
                material instanceof MeshLambertMaterial ||
                material instanceof MeshBasicMaterial ||
                material instanceof MeshStandardMaterial ||
                material instanceof ShaderMaterial ||
                material.skinning) {
                p_uniforms.setValue("viewMatrix", camera.matrixWorldInverse);
            }
        }
        // skinning uniforms must be set even if material didn't change
        // auto-setting of texture unit for bone texture must go before other textures
        // not sure why, but otherwise weird things happen
        if (material.skinning) {
            p_uniforms.setOptional(object, "bindMatrix");
            p_uniforms.setOptional(object, "bindMatrixInverse");
            const skeleton = object.skeleton;
            if (skeleton) {
                const bones = skeleton.bones;
                if (this.capabilities.floatVertexTextures) {
                    if (skeleton.boneTexture === undefined) {
                        // layout (1 matrix = 4 pixels)
                        //      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
                        //  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
                        //       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
                        //       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
                        //       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)
                        let size = Math.sqrt(bones.length * 4); // 4 pixels needed for 1 matrix
                        size = MathUtil.ceilPowerOfTwo(size);
                        size = Math.max(size, 4);
                        const boneMatrices = new Float32Array(size * size * 4); // 4 floats per RGBA pixel
                        boneMatrices.set(skeleton.boneMatrices); // copy current values
                        const boneTexture = new DataTexture(boneMatrices, size, size, RGBAFormat, FloatType);
                        skeleton.boneMatrices = boneMatrices;
                        skeleton.boneTexture = boneTexture;
                        skeleton.boneTextureSize = size;
                    }
                    p_uniforms.setValue("boneTexture", skeleton.boneTexture);
                    p_uniforms.setValue("boneTextureSize", skeleton.boneTextureSize);
                }
                else {
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
            }
            else if (material instanceof MeshLambertMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                this.refreshUniformsLambert(m_uniforms, material);
            }
            else if (material instanceof MeshPhongMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                if (material instanceof MeshToonMaterial) {
                    this.refreshUniformsToon(m_uniforms, material);
                }
                else {
                    this.refreshUniformsPhong(m_uniforms, material);
                }
            }
            else if (material instanceof MeshStandardMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                if (material instanceof MeshPhysicalMaterial) {
                    this.refreshUniformsPhysical(m_uniforms, material);
                }
                else {
                    this.refreshUniformsStandard(m_uniforms, material);
                }
            }
            else if (material instanceof MeshDepthMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                this.refreshUniformsDepth(m_uniforms, material);
            }
            else if (material instanceof MeshDistanceMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                this.refreshUniformsDistance(m_uniforms, material);
            }
            else if (material instanceof MeshNormalMaterial) {
                this.refreshUniformsCommon(m_uniforms, material);
                this.refreshUniformsNormal(m_uniforms, material);
            }
            else if (material instanceof LineBasicMaterial) {
                this.refreshUniformsLine(m_uniforms, material);
                if (material instanceof LineDashedMaterial) {
                    this.refreshUniformsDash(m_uniforms, material);
                }
            }
            else if (material instanceof PointsMaterial) {
                this.refreshUniformsPoints(m_uniforms, material);
            }
            else if (material instanceof ShadowMaterial) {
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
    setupVertexAttributes(material, program, geometry, startIndex = 0) {
        const state = this.state;
        const gl = this.context;
        if (geometry && geometry instanceof InstancedBufferGeometry) {
            if (this.extensions.get("ANGLE_instanced_arrays") === null) {
                console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                return;
            }
        }
        state.initAttributes();
        const geometryAttributes = geometry.attributes;
        const programAttributes = program.getAttributes();
        // ShaderMaterial
        const materialDefaultAttributeValues = material.defaultAttributeValues;
        for (const name in programAttributes) {
            const programAttribute = programAttributes[name];
            if (programAttribute >= 0) {
                const geometryAttribute = geometryAttributes[name];
                if (geometryAttribute !== undefined) {
                    const normalized = geometryAttribute.normalized;
                    const size = geometryAttribute.itemSize;
                    const attribute = this.attributes.get(geometryAttribute);
                    // TODO Attribute may not be available on context restore
                    if (attribute === undefined)
                        continue;
                    const buffer = attribute.buffer;
                    const type = attribute.type;
                    const bytesPerElement = attribute.bytesPerElement;
                    if (geometryAttribute instanceof InstancedInterleavedBufferAttribute) {
                        const stride = geometryAttribute.stride;
                        const offset = geometryAttribute.offset;
                        if (geometryAttribute) {
                            state.enableAttributeAndDivisor(programAttribute, geometryAttribute.meshPerAttribute);
                            if (geometry.maxInstancedCount === undefined) {
                                geometry.maxInstancedCount =
                                    geometryAttribute.meshPerAttribute * geometryAttribute.count;
                            }
                        }
                        else {
                            state.enableAttribute(programAttribute);
                        }
                        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                        gl.vertexAttribPointer(programAttribute, size, type, normalized, stride * bytesPerElement, (startIndex * stride + offset) * bytesPerElement);
                    }
                    else {
                        if (geometryAttribute instanceof InstancedBufferAttribute) {
                            state.enableAttributeAndDivisor(programAttribute, geometryAttribute.meshPerAttribute);
                            if (geometry.maxInstancedCount === undefined) {
                                geometry.maxInstancedCount =
                                    geometryAttribute.meshPerAttribute * geometryAttribute.count;
                            }
                        }
                        else {
                            state.enableAttribute(programAttribute);
                        }
                        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                        gl.vertexAttribPointer(programAttribute, size, type, normalized, 0, startIndex * size * bytesPerElement);
                    }
                }
                else if (materialDefaultAttributeValues !== undefined) {
                    const value = materialDefaultAttributeValues[name];
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
    initMaterial(material, fog, object) {
        const lights = this.lights;
        const clipping = this.clipping;
        const materialProperties = this.properties.get(material);
        const parameters = this.programCache.getParameters(material, this.lights.state, this.shadowsArray, fog, this.clipping.numPlanes, this.clipping.numIntersection, object);
        const code = this.programCache.getProgramCode(material, parameters);
        let program = materialProperties.program;
        let programChange = true;
        if (program === undefined) {
            // new material
            material.addEventListener("dispose", this.onMaterialDispose);
        }
        else if (program.code !== code) {
            // changed glsl or parameters
            this.releaseMaterialProgramReference(material);
        }
        else if (parameters.shaderID !== undefined) {
            // same glsl and uniform list
            return;
        }
        else {
            // only rebuild uniform list
            programChange = false;
        }
        if (programChange) {
            if (parameters.shaderID) {
                const shader = ShaderLib[parameters.shaderID];
                materialProperties.shader = {
                    name: material.type,
                    uniforms: UniformsUtils.clone(shader.uniforms),
                    vertexShader: shader.vertexShader,
                    fragmentShader: shader.fragmentShader,
                };
            }
            else {
                materialProperties.shader = {
                    name: material.type,
                    uniforms: material.uniforms,
                    vertexShader: material.vertexShader,
                    fragmentShader: material.fragmentShader,
                };
            }
            material.onBeforeCompile(materialProperties.shader);
            program = this.programCache.acquireProgram(material, materialProperties.shader, parameters, code);
            materialProperties.program = program;
            material.program = program;
        }
        const programAttributes = program.getAttributes();
        if (material.morphTargets) {
            material.numSupportedMorphTargets = 0;
            for (let i = 0; i < this.maxMorphTargets; i++) {
                if (programAttributes["morphTarget" + i] >= 0) {
                    material.numSupportedMorphTargets++;
                }
            }
        }
        if (material.morphNormals) {
            material.numSupportedMorphNormals = 0;
            for (let i = 0; i < this.maxMorphNormals; i++) {
                if (programAttributes["morphNormal" + i] >= 0) {
                    material.numSupportedMorphNormals++;
                }
            }
        }
        const uniforms = materialProperties.shader.uniforms;
        if ((!(material instanceof ShaderMaterial) && !(material instanceof RawShaderMaterial)) ||
            material.clipping === true) {
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
        const progUniforms = materialProperties.program.getUniforms();
        const uniformsList = WebGLUniformsWrapper.seqWithValue(progUniforms.seq, uniforms);
        materialProperties.uniformsList = uniformsList;
    }
    deallocateMaterial(material) {
        this.releaseMaterialProgramReference(material);
        this.properties.remove(material);
    }
    releaseMaterialProgramReference(material) {
        const programInfo = this.properties.get(material).program;
        material.program = undefined;
        if (programInfo !== undefined) {
            this.programCache.releaseProgram(programInfo);
        }
    }
    setFaceCulling(cullFace, frontFaceDirection) {
        this.state.setCullFace(cullFace);
        this.state.setFlipSided(frontFaceDirection === FrontFaceDirectionCW);
    }
    allocTextureUnit() {
        const textureUnit = this.usedTextureUnits;
        if (textureUnit >= this.capabilities.maxTextures) {
            console.warn("THREE.WebGLRenderer: Trying to use " +
                textureUnit +
                " texture units while this GPU supports only " +
                this.capabilities.maxTextures);
        }
        this.usedTextureUnits += 1;
        return textureUnit;
    }
    setTexture2D(texture, unit) {
        if (texture && texture instanceof WebGLRenderTarget) {
            if (!this.setTexture2DWarned) {
                console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead.");
                this.setTexture2DWarned = true;
            }
            texture = texture.texture;
        }
        this.textures.setTexture2D(texture, unit);
    }
    setTextureCube(cubeTexture, slot) {
        let texture = cubeTexture;
        // backwards compatibility: peel texture.texture
        if (cubeTexture && cubeTexture instanceof WebGLRenderTargetCube) {
            if (!this.setTextureCubeWarned) {
                console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead.");
                this.setTextureCubeWarned = true;
            }
            texture = cubeTexture.texture;
        }
        // currently relying on the fact that WebGLRenderTargetCube.texture is a Texture and NOT a CubeTexture
        // TODO: unify these code paths
        if ((texture && texture instanceof CubeTexture) ||
            (Array.isArray(texture.image) && texture.image.length === 6)) {
            // CompressedTexture can have Array in image :/
            // this function alone should take care of cube textures
            this.textures.setTextureCube(texture, slot);
        }
        else {
            // assumed: texture property of THREE.WebGLRenderTargetCube
            this.textures.setTextureCubeDynamic(texture, slot);
        }
    }
    getRenderTarget() {
        return this.currentRenderTarget;
    }
    setRenderTarget(renderTarget) {
        const properties = this.properties;
        this.currentRenderTarget = renderTarget;
        if (renderTarget && properties.get(renderTarget).__webglFramebuffer === undefined) {
            this.textures.setupRenderTarget(renderTarget);
        }
        let framebuffer = null;
        let isCube = false;
        if (renderTarget) {
            const __webglFramebuffer = properties.get(renderTarget).__webglFramebuffer;
            if (renderTarget instanceof WebGLRenderTargetCube) {
                framebuffer = __webglFramebuffer[renderTarget.activeCubeFace];
                isCube = true;
            }
            else {
                framebuffer = __webglFramebuffer;
            }
            this.currentViewport.copy(renderTarget.viewport);
            this.currentScissor.copy(renderTarget.scissor);
            this.currentScissorTest = renderTarget.scissorTest;
        }
        else {
            this.currentViewport.copy(this.viewport).multiplyScalar(this.pixelRatio);
            this.currentScissor.copy(this.scissor).multiplyScalar(this.pixelRatio);
            this.currentScissorTest = this.scissorTest;
        }
        const gl = this.context;
        const state = this.state;
        if (this.currentFramebuffer !== framebuffer) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            this.currentFramebuffer = framebuffer;
        }
        state.viewport(this.currentViewport);
        state.scissor(this.currentScissor);
        state.setScissorTest(this.currentScissorTest);
        if (isCube) {
            const textureProperties = properties.get(renderTarget.texture);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X + renderTarget.activeCubeFace, textureProperties.__webglTexture, renderTarget.activeMipMapLevel);
        }
    }
    readRenderTargetPixels(renderTarget, x, y, width, height, buffer) {
        if (!(renderTarget && renderTarget instanceof WebGLRenderTarget)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
            return;
        }
        const gl = this.context;
        const utils = this.utils;
        const extensions = this.extensions;
        const framebuffer = this.properties.get(renderTarget).__webglFramebuffer;
        if (framebuffer) {
            let restore = false;
            if (framebuffer !== this.currentFramebuffer) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
                restore = true;
            }
            try {
                var texture = renderTarget.texture;
                var textureFormat = texture.format;
                var textureType = texture.type;
                if (textureFormat !== RGBAFormat &&
                    utils.convert(textureFormat) !== gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_FORMAT)) {
                    console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                    return;
                }
                if (textureType !== UnsignedByteType &&
                    utils.convert(textureType) !== gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_TYPE) && // IE11, Edge and Chrome Mac < 52 (#9513)
                    !(textureType === FloatType &&
                        (extensions.get("OES_texture_float") || extensions.get("WEBGL_color_buffer_float"))) && // Chrome Mac >= 52 and Firefox
                    !(textureType === HalfFloatType && extensions.get("EXT_color_buffer_half_float"))) {
                    console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                    return;
                }
                if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
                    // the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)
                    if (x >= 0 && x <= renderTarget.width - width && (y >= 0 && y <= renderTarget.height - height)) {
                        gl.readPixels(x, y, width, height, utils.convert(textureFormat), utils.convert(textureType), buffer);
                    }
                }
                else {
                    console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.");
                }
            }
            finally {
                if (restore) {
                    gl.bindFramebuffer(gl.FRAMEBUFFER, this.currentFramebuffer);
                }
            }
        }
    }
    copyFramebufferToTexture(position, texture, level) {
        const gl = this.context;
        const width = texture.image.width;
        const height = texture.image.height;
        const internalFormat = this.utils.convert(texture.format);
        this.setTexture2D(texture, 0);
        gl.copyTexImage2D(gl.TEXTURE_2D, level || 0, internalFormat, position.x, position.y, width, height, 0);
    }
    // Uniforms (refresh uniforms objects)
    refreshUniformsCommon(uniforms, material) {
        uniforms.opacity.value = material.opacity;
        if (material.color) {
            uniforms.diffuse.value = material.color;
        }
        if (material.emissive) {
            uniforms.emissive.value.copy(material.emissive).multiplyScalar(material.emissiveIntensity);
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
        let uvScaleMap;
        if (material.map) {
            uvScaleMap = material.map;
        }
        else if (material.specularMap) {
            uvScaleMap = material.specularMap;
        }
        else if (material.displacementMap) {
            uvScaleMap = material.displacementMap;
        }
        else if (material.normalMap) {
            uvScaleMap = material.normalMap;
        }
        else if (material.bumpMap) {
            uvScaleMap = material.bumpMap;
        }
        else if (material.roughnessMap) {
            uvScaleMap = material.roughnessMap;
        }
        else if (material.metalnessMap) {
            uvScaleMap = material.metalnessMap;
        }
        else if (material.alphaMap) {
            uvScaleMap = material.alphaMap;
        }
        else if (material.emissiveMap) {
            uvScaleMap = material.emissiveMap;
        }
        if (uvScaleMap !== undefined) {
            // backwards compatibility
            if (uvScaleMap instanceof WebGLRenderTarget) {
                uvScaleMap = uvScaleMap.texture;
            }
            if (uvScaleMap.matrixAutoUpdate === true) {
                const offset = uvScaleMap.offset;
                const repeat = uvScaleMap.repeat;
                const rotation = uvScaleMap.rotation;
                const center = uvScaleMap.center;
                uvScaleMap.matrix.setUvTransform(offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y);
            }
            uniforms.uvTransform.value.copy(uvScaleMap.matrix);
        }
    }
    refreshUniformsLine(uniforms, material) {
        uniforms.diffuse.value = material.color;
        uniforms.opacity.value = material.opacity;
    }
    refreshUniformsDash(uniforms, material) {
        uniforms.dashSize.value = material.dashSize;
        uniforms.totalSize.value = material.dashSize + material.gapSize;
        uniforms.scale.value = material.scale;
    }
    refreshUniformsPoints(uniforms, material) {
        uniforms.diffuse.value = material.color;
        uniforms.opacity.value = material.opacity;
        uniforms.size.value = material.size * this.pixelRatio;
        uniforms.scale.value = this.height * 0.5;
        uniforms.map.value = material.map;
        if (material.map !== null) {
            if (material.map.matrixAutoUpdate === true) {
                const offset = material.map.offset;
                const repeat = material.map.repeat;
                const rotation = material.map.rotation;
                const center = material.map.center;
                material.map.matrix.setUvTransform(offset.x, offset.y, repeat.x, repeat.y, rotation, center.x, center.y);
            }
            uniforms.uvTransform.value.copy(material.map.matrix);
        }
    }
    refreshUniformsFog(uniforms, fog) {
        uniforms.fogColor.value = fog.color;
        if (fog instanceof Fog) {
            uniforms.fogNear.value = fog.near;
            uniforms.fogFar.value = fog.far;
        }
        else if (fog instanceof FogExp2) {
            uniforms.fogDensity.value = fog.density;
        }
    }
    refreshUniformsLambert(uniforms, material) {
        if (material.emissiveMap) {
            uniforms.emissiveMap.value = material.emissiveMap;
        }
    }
    refreshUniformsPhong(uniforms, material) {
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
            uniforms.normalScale.value.copy(material.normalScale);
        }
        if (material.displacementMap) {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
    }
    refreshUniformsToon(uniforms, material) {
        this.refreshUniformsPhong(uniforms, material);
        if (material.gradientMap) {
            uniforms.gradientMap.value = material.gradientMap;
        }
    }
    refreshUniformsStandard(uniforms, material) {
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
            uniforms.normalScale.value.copy(material.normalScale);
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
    refreshUniformsPhysical(uniforms, material) {
        uniforms.clearCoat.value = material.clearCoat;
        uniforms.clearCoatRoughness.value = material.clearCoatRoughness;
        this.refreshUniformsStandard(uniforms, material);
    }
    refreshUniformsDepth(uniforms, material) {
        if (material.displacementMap) {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
    }
    refreshUniformsDistance(uniforms, material) {
        if (material.displacementMap) {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
        uniforms.referencePosition.value.copy(material.referencePosition);
        uniforms.nearDistance.value = material.nearDistance;
        uniforms.farDistance.value = material.farDistance;
    }
    refreshUniformsNormal(uniforms, material) {
        if (material.bumpMap) {
            uniforms.bumpMap.value = material.bumpMap;
            uniforms.bumpScale.value = material.bumpScale;
        }
        if (material.normalMap) {
            uniforms.normalMap.value = material.normalMap;
            uniforms.normalScale.value.copy(material.normalScale);
        }
        if (material.displacementMap) {
            uniforms.displacementMap.value = material.displacementMap;
            uniforms.displacementScale.value = material.displacementScale;
            uniforms.displacementBias.value = material.displacementBias;
        }
    }
    // If uniforms are marked as clean, they don't need to be loaded to the GPU.
    markUniformsLightsNeedsUpdate(uniforms, value) {
        uniforms.ambientLightColor.needsUpdate = value;
        uniforms.directionalLights.needsUpdate = value;
        uniforms.pointLights.needsUpdate = value;
        uniforms.spotLights.needsUpdate = value;
        uniforms.rectAreaLights.needsUpdate = value;
        uniforms.hemisphereLights.needsUpdate = value;
    }
}
