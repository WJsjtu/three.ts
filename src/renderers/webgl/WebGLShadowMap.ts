import {
    FrontSide,
    BackSide,
    DoubleSide,
    RGBAFormat,
    NearestFilter,
    PCFShadowMap,
    RGBADepthPacking,
} from "../../constants";
import { Frustum } from "../../math/Frustum";
import { Matrix4 } from "../../math/Matrix4";
import { Vector2 } from "../../math/Vector2";
import { Vector3 } from "../../math/Vector3";
import { WebGLRenderer } from "../WebGLRenderer";
import { Vector4 } from "../../math/Vector4";
import { MeshDepthMaterial, MeshDistanceMaterial, Material } from "../../materials/Materials";
import { WebGLObjects } from "./WebGLObjects";
import { Scene } from "../../scenes/Scene";
import { Camera } from "../../cameras/Camera";
import { WebGLState } from "./WebGLState";
import { PointLight } from "../../lights/PointLight";
import { LightShadow, LightShadowCamera } from "../../lights/LightShadow";
import { WebGLRenderTarget, IWebGLRenderTargetOptions } from "../WebGLRenderTarget";
import { SpotLightShadow } from "../../lights/SpotLightShadow";
import { SpotLight } from "../../lights/SpotLight";
import { DirectionalLight } from "../../lights/DirectionalLight";
import { Mesh } from "../../objects/Mesh";
import { Line } from "../../objects/Line";
import { Points } from "../../objects/Points";
import { Object3D } from "../../core/Object3D";
import { BufferGeometry } from "../../core/BufferGeometry";
import { IGroup } from "../../core/DirectGeometry";
import { SkinnedMesh } from "../../objects/SkinnedMesh";
import { ObjectWithGeometry } from "../../math/Box3";
import { Geometry } from "../../core/Geometry";

export type ShadowLightWithoutPointLight = DirectionalLight | SpotLight;
export type ShadowLight = ShadowLightWithoutPointLight | PointLight;

export class WebGLShadowMap {
    public type: number = PCFShadowMap;
    public enabled: boolean = false;
    public autoUpdate: boolean = true;
    public needsUpdate: boolean = false;

    protected frustum: Frustum = new Frustum();
    protected projScreenMatrix: Matrix4 = new Matrix4();
    protected shadowMapSize: Vector2 = new Vector2();
    protected maxShadowMapSize: Vector2;
    protected lookTarget: Vector3 = new Vector3();
    protected lightPositionWorld: Vector3 = new Vector3();
    protected morphingFlag: number = 1;
    protected skinningFlag: number = 2;
    protected numberOfMaterialVariants: number = (this.morphingFlag | this.skinningFlag) + 1;
    protected depthMaterials: MeshDepthMaterial[] | MeshDistanceMaterial[] = new Array(this.numberOfMaterialVariants);
    protected distanceMaterials: MeshDistanceMaterial[] = new Array(this.numberOfMaterialVariants);
    protected materialCache: {
        [key: string]: {
            [key: string]: MeshDepthMaterial | MeshDistanceMaterial;
        };
    } = {};
    protected objects: WebGLObjects;
    protected renderer: WebGLRenderer;

    protected shadowSide: { [key: number]: number };
    protected cubeDirections: Vector3[];
    protected cubeUps: Vector3[];
    protected cube2DViewPorts: Vector4[];

    constructor(renderer: WebGLRenderer, objects: WebGLObjects, maxTextureSize: number) {
        this.renderer = renderer;
        this.objects = objects;
        this.maxShadowMapSize = new Vector2(maxTextureSize, maxTextureSize);
        this.shadowSide = {
            0: BackSide,
            1: FrontSide,
            2: DoubleSide,
        };
        this.cubeDirections = [
            new Vector3(1, 0, 0),
            new Vector3(-1, 0, 0),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, -1),
            new Vector3(0, 1, 0),
            new Vector3(0, -1, 0),
        ];
        this.cubeUps = [
            new Vector3(0, 1, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, -1),
        ];
        this.cube2DViewPorts = [
            new Vector4(),
            new Vector4(),
            new Vector4(),
            new Vector4(),
            new Vector4(),
            new Vector4(),
        ];
        // init
        for (let i: number = 0; i !== this.numberOfMaterialVariants; i++) {
            const useMorphing: boolean = (i & this.morphingFlag) !== 0;
            const useSkinning: boolean = (i & this.skinningFlag) !== 0;
            const depthMaterial: MeshDepthMaterial = new MeshDepthMaterial({
                depthPacking: RGBADepthPacking,
                morphTargets: useMorphing,
                skinning: useSkinning,
            });
            this.depthMaterials[i] = depthMaterial;
            const distanceMaterial: MeshDistanceMaterial = new MeshDistanceMaterial({
                morphTargets: useMorphing,
                skinning: useSkinning,
            });
            this.distanceMaterials[i] = distanceMaterial;
        }
    }

    public getDepthMaterial(
        object: Object3D,
        material: Material,
        isPointLight: boolean,
        lightPositionWorld: Vector3,
        shadowCameraNear: number,
        shadowCameraFar: number,
    ): MeshDepthMaterial | MeshDistanceMaterial {
        let result: MeshDepthMaterial | MeshDistanceMaterial | null = null;
        let materialVariants: MeshDepthMaterial[] | MeshDistanceMaterial[] = this.depthMaterials;
        let customMaterial: MeshDepthMaterial | MeshDistanceMaterial = object.customDepthMaterial;
        if (isPointLight) {
            materialVariants = this.distanceMaterials;
            customMaterial = object.customDistanceMaterial;
        }
        if (!customMaterial) {
            let useMorphing: boolean = false;
            if (material.morphTargets) {
                const geometry: BufferGeometry | Geometry = (object as ObjectWithGeometry).geometry;
                if (geometry && geometry instanceof BufferGeometry) {
                    useMorphing =
                        geometry.morphAttributes &&
                        geometry.morphAttributes.position &&
                        geometry.morphAttributes.position.length > 0;
                } else if (geometry && geometry instanceof Geometry) {
                    useMorphing = geometry.morphTargets && geometry.morphTargets.length > 0;
                }
            }
            if (object instanceof SkinnedMesh && material.skinning === false) {
                console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", object);
            }
            const useSkinning: boolean = object instanceof SkinnedMesh && material.skinning;
            let variantIndex: number = 0;
            if (useMorphing) variantIndex |= this.morphingFlag;
            if (useSkinning) variantIndex |= this.skinningFlag;
            result = materialVariants[variantIndex];
        } else {
            result = customMaterial;
        }
        if (
            this.renderer.localClippingEnabled &&
            material.clipShadows === true &&
            material.clippingPlanes.length !== 0
        ) {
            // in this case we need a unique material instance reflecting the
            // appropriate state
            const keyA: string = result.uuid,
                keyB: string = material.uuid;
            let materialsForVariant: {
                [key: string]: MeshDepthMaterial | MeshDistanceMaterial;
            } = this.materialCache[keyA];
            if (materialsForVariant === undefined) {
                materialsForVariant = {};
                this.materialCache[keyA] = materialsForVariant;
            }
            let cachedMaterial: MeshDepthMaterial | MeshDistanceMaterial = materialsForVariant[keyB];
            if (cachedMaterial === undefined) {
                cachedMaterial = result.clone() as MeshDepthMaterial | MeshDistanceMaterial;
                materialsForVariant[keyB] = cachedMaterial;
            }
            result = cachedMaterial;
        }
        result.visible = material.visible;
        result.wireframe = material.wireframe;
        result.side = material.shadowSide !== null ? material.shadowSide : this.shadowSide[material.side];
        result.clipShadows = material.clipShadows;
        result.clippingPlanes = material.clippingPlanes;
        result.clipIntersection = material.clipIntersection;
        result.wireframeLinewidth = material.wireframeLinewidth;
        result.linewidth = material.linewidth;
        if (isPointLight && result instanceof MeshDistanceMaterial) {
            result.referencePosition.copy(lightPositionWorld);
            result.nearDistance = shadowCameraNear;
            result.farDistance = shadowCameraFar;
        }
        return result;
    }

    /**
     * Ambient lights cannot cast shadows.
     * Hemisphere lights cannot cast shadows.
     * RectAreaLight does not support shadows.
     */
    public render(lights: ShadowLight[], scene: Scene, camera: Camera): void {
        if (this.enabled === false) return;
        if (this.autoUpdate === false && this.needsUpdate === false) return;
        if (lights.length === 0) return;
        // TODO Clean up (needed in case of contextlost)
        const gl: WebGLRenderingContext = this.renderer.context;
        const state: WebGLState = this.renderer.state;
        // Set GL state for depth map.
        state.disable(gl.BLEND);
        state.buffers.color.setClear(1, 1, 1, 1);
        state.buffers.depth.setTest(true);
        state.setScissorTest(false);
        // render depth map
        let faceCount: number;
        for (let i: number = 0, il: number = lights.length; i < il; i++) {
            const light: ShadowLight = lights[i];
            const shadow: LightShadow = light.shadow;
            const isPointLight: boolean = light instanceof PointLight;
            if (shadow === undefined) {
                console.warn("THREE.WebGLShadowMap:", light, "has no shadow.");
                continue;
            }
            const shadowCamera: LightShadowCamera = shadow.camera;
            this.shadowMapSize.copy(shadow.mapSize);
            this.shadowMapSize.min(this.maxShadowMapSize);
            if (isPointLight) {
                const vpWidth: number = this.shadowMapSize.x;
                const vpHeight: number = this.shadowMapSize.y;
                // These viewports map a cube-map onto a 2D texture with the
                // following orientation:
                //
                //  xzXZ
                //   y Y
                //
                // X - Positive x direction
                // x - Negative x direction
                // Y - Positive y direction
                // y - Negative y direction
                // Z - Positive z direction
                // z - Negative z direction
                // positive X
                this.cube2DViewPorts[0].set(vpWidth * 2, vpHeight, vpWidth, vpHeight);
                // negative X
                this.cube2DViewPorts[1].set(0, vpHeight, vpWidth, vpHeight);
                // positive Z
                this.cube2DViewPorts[2].set(vpWidth * 3, vpHeight, vpWidth, vpHeight);
                // negative Z
                this.cube2DViewPorts[3].set(vpWidth, vpHeight, vpWidth, vpHeight);
                // positive Y
                this.cube2DViewPorts[4].set(vpWidth * 3, 0, vpWidth, vpHeight);
                // negative Y
                this.cube2DViewPorts[5].set(vpWidth, 0, vpWidth, vpHeight);
                this.shadowMapSize.x *= 4.0;
                this.shadowMapSize.y *= 2.0;
            }

            if (shadow.map === null) {
                const pars: IWebGLRenderTargetOptions = {
                    minFilter: NearestFilter,
                    magFilter: NearestFilter,
                    format: RGBAFormat,
                };
                shadow.map = new WebGLRenderTarget(this.shadowMapSize.x, this.shadowMapSize.y, pars);
                shadow.map.texture.name = light.name + ".shadowMap";
                shadowCamera.updateProjectionMatrix();
            }
            /**
             * Only SpotLight haa a shadow of SpotLightShadow
             */
            if (shadow instanceof SpotLightShadow) {
                shadow.update(light as SpotLight);
            }

            const shadowMap: WebGLRenderTarget = shadow.map;
            const shadowMatrix: Matrix4 = shadow.matrix;

            this.lightPositionWorld.setFromMatrixPosition(light.matrixWorld);
            shadowCamera.position.copy(this.lightPositionWorld);

            if (isPointLight) {
                faceCount = 6;
                // for point lights we set the shadow matrix to be a translation-only matrix
                // equal to inverse of the light's position
                shadowMatrix.makeTranslation(
                    -this.lightPositionWorld.x,
                    -this.lightPositionWorld.y,
                    -this.lightPositionWorld.z,
                );
            } else {
                faceCount = 1;
                /**
                 * Not PointLight
                 */
                this.lookTarget.setFromMatrixPosition((light as ShadowLightWithoutPointLight).target.matrixWorld);
                shadowCamera.lookAt(this.lookTarget);
                shadowCamera.updateMatrixWorld();
                // compute shadow matrix
                shadowMatrix.set(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 1.0);
                shadowMatrix.multiply(shadowCamera.projectionMatrix);
                shadowMatrix.multiply(shadowCamera.matrixWorldInverse);
            }

            this.renderer.setRenderTarget(shadowMap);
            this.renderer.clear();

            // render shadow map for each cube face (if omni-directional) or
            // run a single pass if not
            for (let face: number = 0; face < faceCount; face++) {
                if (isPointLight) {
                    this.lookTarget.copy(shadowCamera.position);
                    this.lookTarget.add(this.cubeDirections[face]);
                    shadowCamera.up.copy(this.cubeUps[face]);
                    shadowCamera.lookAt(this.lookTarget);
                    shadowCamera.updateMatrixWorld();
                    const vpDimensions: Vector4 = this.cube2DViewPorts[face];
                    state.viewport(vpDimensions);
                }
                // update camera matrices and frustum
                this.projScreenMatrix.multiplyMatrices(shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse);
                this.frustum.setFromMatrix(this.projScreenMatrix);
                // set object matrices & frustum culling
                this.renderObject(scene, camera, shadowCamera, isPointLight);
            }
        }
        this.needsUpdate = false;
    }

    public renderObject(
        object: Object3D,
        camera: Camera,
        shadowCamera: LightShadowCamera,
        isPointLight: boolean,
    ): void {
        if (object.visible === false) return;
        const visible: boolean = object.layers.test(camera.layers);
        if (visible && (object instanceof Mesh || object instanceof Line || object instanceof Points)) {
            if (object.castShadow && (!object.frustumCulled || this.frustum.intersectsObject(object))) {
                object.modelViewMatrix.multiplyMatrices(shadowCamera.matrixWorldInverse, object.matrixWorld);
                const geometry: BufferGeometry = this.objects.update(object);
                const material: Material | Material[] = object.material;
                if (Array.isArray(material)) {
                    const groups: IGroup[] = geometry.groups;
                    for (let k: number = 0, kl: number = groups.length; k < kl; k++) {
                        const group: IGroup = groups[k];
                        const groupMaterial: Material = material[group.materialIndex];
                        if (groupMaterial && groupMaterial.visible) {
                            const depthMaterial: MeshDepthMaterial | MeshDistanceMaterial = this.getDepthMaterial(
                                object,
                                groupMaterial,
                                isPointLight,
                                this.lightPositionWorld,
                                shadowCamera.near,
                                shadowCamera.far,
                            );
                            this.renderer.renderBufferDirect(
                                shadowCamera,
                                null,
                                geometry,
                                depthMaterial,
                                object,
                                group,
                            );
                        }
                    }
                } else if (material.visible) {
                    const depthMaterial: MeshDepthMaterial | MeshDistanceMaterial = this.getDepthMaterial(
                        object,
                        material,
                        isPointLight,
                        this.lightPositionWorld,
                        shadowCamera.near,
                        shadowCamera.far,
                    );
                    this.renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, null);
                }
            }
        }
        const children: Object3D[] = object.children;
        for (let i: number = 0, l: number = children.length; i < l; i++) {
            this.renderObject(children[i], camera, shadowCamera, isPointLight);
        }
    }
}
