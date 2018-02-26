import { FrontSide, BackSide, DoubleSide, RGBAFormat, NearestFilter, PCFShadowMap, RGBADepthPacking, } from "../../constants.js";
import { Frustum } from "../../math/Frustum.js";
import { Matrix4 } from "../../math/Matrix4.js";
import { Vector2 } from "../../math/Vector2.js";
import { Vector3 } from "../../math/Vector3.js";
import { Vector4 } from "../../math/Vector4.js";
import { MeshDepthMaterial, MeshDistanceMaterial, } from "../../materials/Materials.js";
import { PointLight } from "../../lights/PointLight.js";
import { WebGLRenderTarget, } from "../WebGLRenderTarget.js";
import { SpotLightShadow } from "../../lights/SpotLightShadow.js";
import { Mesh } from "../../objects/Mesh.js";
import { Line } from "../../objects/Line.js";
import { Points } from "../../objects/Points.js";
import { BufferGeometry } from "../../core/BufferGeometry.js";
import { SkinnedMesh } from "../../objects/SkinnedMesh.js";
import { Geometry } from "../../core/Geometry.js";
export class WebGLShadowMap {
    constructor(renderer, objects, maxTextureSize) {
        this.type = PCFShadowMap;
        this.enabled = false;
        this.autoUpdate = true;
        this.needsUpdate = false;
        this.frustum = new Frustum();
        this.projScreenMatrix = new Matrix4();
        this.shadowMapSize = new Vector2();
        this.maxShadowMapSize = null;
        this.lookTarget = new Vector3();
        this.lightPositionWorld = new Vector3();
        this.morphingFlag = 1;
        this.skinningFlag = 2;
        this.numberOfMaterialVariants = (this.morphingFlag |
            this.skinningFlag) +
            1;
        this.depthMaterials = new Array(this.numberOfMaterialVariants);
        this.distanceMaterials = new Array(this.numberOfMaterialVariants);
        this.materialCache = {};
        this.objects = null;
        this.renderer = null;
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
        for (let i = 0; i !== this.numberOfMaterialVariants; i++) {
            const useMorphing = (i & this.morphingFlag) !== 0;
            const useSkinning = (i & this.skinningFlag) !== 0;
            const depthMaterial = new MeshDepthMaterial({
                depthPacking: RGBADepthPacking,
                morphTargets: useMorphing,
                skinning: useSkinning,
            });
            this.depthMaterials[i] = depthMaterial;
            const distanceMaterial = new MeshDistanceMaterial({
                morphTargets: useMorphing,
                skinning: useSkinning,
            });
            this.distanceMaterials[i] = distanceMaterial;
        }
    }
    getDepthMaterial(object, material, isPointLight, lightPositionWorld, shadowCameraNear, shadowCameraFar) {
        let result = null;
        let materialVariants = this.depthMaterials;
        let customMaterial = object.customDepthMaterial;
        if (isPointLight) {
            materialVariants = this.distanceMaterials;
            customMaterial = object.customDistanceMaterial;
        }
        if (!customMaterial) {
            let useMorphing = false;
            if (material.morphTargets) {
                const geometry = object.geometry;
                if (geometry && geometry instanceof BufferGeometry) {
                    useMorphing =
                        geometry.morphAttributes &&
                            geometry.morphAttributes.position &&
                            geometry.morphAttributes.position.length > 0;
                }
                else if (geometry && geometry instanceof Geometry) {
                    useMorphing =
                        geometry.morphTargets &&
                            geometry.morphTargets.length > 0;
                }
            }
            if (object instanceof SkinnedMesh && material.skinning === false) {
                console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", object);
            }
            const useSkinning = object instanceof SkinnedMesh && material.skinning;
            let variantIndex = 0;
            if (useMorphing)
                variantIndex |= this.morphingFlag;
            if (useSkinning)
                variantIndex |= this.skinningFlag;
            result = materialVariants[variantIndex];
        }
        else {
            result = customMaterial;
        }
        if (this.renderer.localClippingEnabled &&
            material.clipShadows === true &&
            material.clippingPlanes.length !== 0) {
            // in this case we need a unique material instance reflecting the
            // appropriate state
            const keyA = result.uuid, keyB = material.uuid;
            let materialsForVariant = this.materialCache[keyA];
            if (materialsForVariant === undefined) {
                materialsForVariant = {};
                this.materialCache[keyA] = materialsForVariant;
            }
            let cachedMaterial = materialsForVariant[keyB];
            if (cachedMaterial === undefined) {
                cachedMaterial = result.clone();
                materialsForVariant[keyB] = cachedMaterial;
            }
            result = cachedMaterial;
        }
        result.visible = material.visible;
        result.wireframe = material.wireframe;
        result.side =
            material.shadowSide !== null
                ? material.shadowSide
                : this.shadowSide[material.side];
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
    render(lights, scene, camera) {
        if (this.enabled === false)
            return;
        if (this.autoUpdate === false && this.needsUpdate === false)
            return;
        if (lights.length === 0)
            return;
        // TODO Clean up (needed in case of contextlost)
        const gl = this.renderer.context;
        const state = this.renderer.state;
        // Set GL state for depth map.
        state.disable(gl.BLEND);
        state.buffers.color.setClear(1, 1, 1, 1);
        state.buffers.depth.setTest(true);
        state.setScissorTest(false);
        // render depth map
        let faceCount;
        for (let i = 0, il = lights.length; i < il; i++) {
            const light = lights[i];
            const shadow = light.shadow;
            const isPointLight = light instanceof PointLight;
            if (shadow === undefined) {
                console.warn("THREE.WebGLShadowMap:", light, "has no shadow.");
                continue;
            }
            const shadowCamera = shadow.camera;
            this.shadowMapSize.copy(shadow.mapSize);
            this.shadowMapSize.min(this.maxShadowMapSize);
            if (isPointLight) {
                const vpWidth = this.shadowMapSize.x;
                const vpHeight = this.shadowMapSize.y;
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
                const pars = {
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
                shadow.update(light);
            }
            const shadowMap = shadow.map;
            const shadowMatrix = shadow.matrix;
            this.lightPositionWorld.setFromMatrixPosition(light.matrixWorld);
            shadowCamera.position.copy(this.lightPositionWorld);
            if (isPointLight) {
                faceCount = 6;
                // for point lights we set the shadow matrix to be a translation-only matrix
                // equal to inverse of the light's position
                shadowMatrix.makeTranslation(-this.lightPositionWorld.x, -this.lightPositionWorld.y, -this.lightPositionWorld.z);
            }
            else {
                faceCount = 1;
                /**
                 * Not PointLight
                 */
                this.lookTarget.setFromMatrixPosition(light.target.matrixWorld);
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
            for (let face = 0; face < faceCount; face++) {
                if (isPointLight) {
                    this.lookTarget.copy(shadowCamera.position);
                    this.lookTarget.add(this.cubeDirections[face]);
                    shadowCamera.up.copy(this.cubeUps[face]);
                    shadowCamera.lookAt(this.lookTarget);
                    shadowCamera.updateMatrixWorld();
                    const vpDimensions = this.cube2DViewPorts[face];
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
    renderObject(object, camera, shadowCamera, isPointLight) {
        if (object.visible === false)
            return;
        const visible = object.layers.test(camera.layers);
        if (visible &&
            (object instanceof Mesh ||
                object instanceof Line ||
                object instanceof Points)) {
            if (object.castShadow &&
                (!object.frustumCulled || this.frustum.intersectsObject(object))) {
                object.modelViewMatrix.multiplyMatrices(shadowCamera.matrixWorldInverse, object.matrixWorld);
                const geometry = this.objects.update(object);
                const material = object.material;
                if (Array.isArray(material)) {
                    const groups = geometry.groups;
                    for (let k = 0, kl = groups.length; k < kl; k++) {
                        const group = groups[k];
                        const groupMaterial = material[group.materialIndex];
                        if (groupMaterial && groupMaterial.visible) {
                            const depthMaterial = this.getDepthMaterial(object, groupMaterial, isPointLight, this.lightPositionWorld, shadowCamera.near, shadowCamera.far);
                            this.renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, group);
                        }
                    }
                }
                else if (material.visible) {
                    const depthMaterial = this.getDepthMaterial(object, material, isPointLight, this.lightPositionWorld, shadowCamera.near, shadowCamera.far);
                    this.renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, null);
                }
            }
        }
        const children = object.children;
        for (let i = 0, l = children.length; i < l; i++) {
            this.renderObject(children[i], camera, shadowCamera, isPointLight);
        }
    }
}
