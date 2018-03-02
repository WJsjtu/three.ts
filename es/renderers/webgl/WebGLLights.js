import { AmbientLight } from "../../lights/AmbientLight";
import { DirectionalLight } from "../../lights/DirectionalLight";
import { HemisphereLight } from "../../lights/HemisphereLight";
import { PointLight } from "../../lights/PointLight";
import { RectAreaLight } from "../../lights/RectAreaLight";
import { SpotLight } from "../../lights/SpotLight";
import { Color } from "../../math/Color";
import { Matrix4 } from "../../math/Matrix4";
import { Vector2 } from "../../math/Vector2";
import { Vector3 } from "../../math/Vector3";
class LightUniformsCache {
    constructor() {
        this.lights = {};
    }
    get(light) {
        if (this.lights[light.id] !== undefined) {
            return this.lights[light.id];
        }
        let uniforms;
        switch (light.type) {
            case "DirectionalLight":
                uniforms = {
                    direction: new Vector3(),
                    color: new Color(),
                    shadow: false,
                    shadowBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new Vector2(),
                };
                break;
            case "SpotLight":
                uniforms = {
                    position: new Vector3(),
                    direction: new Vector3(),
                    color: new Color(),
                    distance: 0,
                    coneCos: 0,
                    penumbraCos: 0,
                    decay: 0,
                    shadow: false,
                    shadowBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new Vector2(),
                };
                break;
            case "PointLight":
                uniforms = {
                    position: new Vector3(),
                    color: new Color(),
                    distance: 0,
                    decay: 0,
                    shadow: false,
                    shadowBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new Vector2(),
                    shadowCameraNear: 1,
                    shadowCameraFar: 1000,
                };
                break;
            case "HemisphereLight":
                uniforms = {
                    direction: new Vector3(),
                    skyColor: new Color(),
                    groundColor: new Color(),
                };
                break;
            case "RectAreaLight":
                uniforms = {
                    color: new Color(),
                    position: new Vector3(),
                    halfWidth: new Vector3(),
                    halfHeight: new Vector3(),
                };
                break;
        }
        this.lights[light.id] = uniforms;
        return uniforms;
    }
}
export class WebGLLights {
    constructor() {
        this.cache = new LightUniformsCache();
        this.state = {
            hash: "",
            ambient: [0, 0, 0],
            directional: [],
            directionalShadowMap: [],
            directionalShadowMatrix: [],
            spot: [],
            spotShadowMap: [],
            spotShadowMatrix: [],
            rectArea: [],
            point: [],
            pointShadowMap: [],
            pointShadowMatrix: [],
            hemi: [],
        };
    }
    setup(lights, shadows, camera) {
        const vector3 = new Vector3();
        const matrix4 = new Matrix4();
        const matrix42 = new Matrix4();
        let r = 0, g = 0, b = 0;
        const state = this.state;
        const cache = this.cache;
        let directionalLength = 0;
        let pointLength = 0;
        let spotLength = 0;
        let rectAreaLength = 0;
        let hemisphereLength = 0;
        const viewMatrix = camera.matrixWorldInverse;
        for (let i = 0, l = lights.length; i < l; i++) {
            const light = lights[i];
            const color = light.color;
            const intensity = light.intensity;
            const distance = light.distance;
            const shadowMap = light.shadow && light.shadow.map ? light.shadow.map.texture : null;
            if (light instanceof AmbientLight) {
                r += color.r * intensity;
                g += color.g * intensity;
                b += color.b * intensity;
            }
            else if (light instanceof DirectionalLight) {
                const uniforms = cache.get(light);
                uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                vector3.setFromMatrixPosition(light.target.matrixWorld);
                uniforms.direction.sub(vector3);
                uniforms.direction.transformDirection(viewMatrix);
                uniforms.shadow = light.castShadow;
                if (light.castShadow) {
                    const shadow = light.shadow;
                    uniforms.shadowBias = shadow.bias;
                    uniforms.shadowRadius = shadow.radius;
                    uniforms.shadowMapSize = shadow.mapSize;
                }
                state.directionalShadowMap[directionalLength] = shadowMap;
                state.directionalShadowMatrix[directionalLength] = light.shadow.matrix;
                state.directional[directionalLength] = uniforms;
                directionalLength++;
            }
            else if (light instanceof SpotLight) {
                const uniforms = cache.get(light);
                uniforms.position.setFromMatrixPosition(light.matrixWorld);
                uniforms.position.applyMatrix4(viewMatrix);
                uniforms.color.copy(color).multiplyScalar(intensity);
                uniforms.distance = distance;
                uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                vector3.setFromMatrixPosition(light.target.matrixWorld);
                uniforms.direction.sub(vector3);
                uniforms.direction.transformDirection(viewMatrix);
                uniforms.coneCos = Math.cos(light.angle);
                uniforms.penumbraCos = Math.cos(light.angle * (1 - light.penumbra));
                uniforms.decay = light.distance === 0 ? 0.0 : light.decay;
                uniforms.shadow = light.castShadow;
                if (light.castShadow) {
                    const shadow = light.shadow;
                    uniforms.shadowBias = shadow.bias;
                    uniforms.shadowRadius = shadow.radius;
                    uniforms.shadowMapSize = shadow.mapSize;
                }
                state.spotShadowMap[spotLength] = shadowMap;
                state.spotShadowMatrix[spotLength] = light.shadow.matrix;
                state.spot[spotLength] = uniforms;
                spotLength++;
            }
            else if (light instanceof RectAreaLight) {
                const uniforms = cache.get(light);
                // (a) intensity is the total visible light emitted
                // uniforms.color.copy( color ).multiplyScalar( intensity / ( light.width * light.height * Math.PI ) );
                // (b) intensity is the brightness of the light
                uniforms.color.copy(color).multiplyScalar(intensity);
                uniforms.position.setFromMatrixPosition(light.matrixWorld);
                uniforms.position.applyMatrix4(viewMatrix);
                // extract local rotation of light to derive width/height half vectors
                matrix42.identity();
                matrix4.copy(light.matrixWorld);
                matrix4.premultiply(viewMatrix);
                matrix42.extractRotation(matrix4);
                uniforms.halfWidth.set(light.width * 0.5, 0.0, 0.0);
                uniforms.halfHeight.set(0.0, light.height * 0.5, 0.0);
                uniforms.halfWidth.applyMatrix4(matrix42);
                uniforms.halfHeight.applyMatrix4(matrix42);
                // TODO (abelnation): RectAreaLight distance?
                // uniforms.distance = distance;
                state.rectArea[rectAreaLength] = uniforms;
                rectAreaLength++;
            }
            else if (light instanceof PointLight) {
                const uniforms = cache.get(light);
                uniforms.position.setFromMatrixPosition(light.matrixWorld);
                uniforms.position.applyMatrix4(viewMatrix);
                uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                uniforms.distance = light.distance;
                uniforms.decay = light.distance === 0 ? 0.0 : light.decay;
                uniforms.shadow = light.castShadow;
                if (light.castShadow) {
                    const shadow = light.shadow;
                    uniforms.shadowBias = shadow.bias;
                    uniforms.shadowRadius = shadow.radius;
                    uniforms.shadowMapSize = shadow.mapSize;
                    uniforms.shadowCameraNear = shadow.camera.near;
                    uniforms.shadowCameraFar = shadow.camera.far;
                }
                state.pointShadowMap[pointLength] = shadowMap;
                state.pointShadowMatrix[pointLength] = light.shadow.matrix;
                state.point[pointLength] = uniforms;
                pointLength++;
            }
            else if (light instanceof HemisphereLight) {
                const uniforms = cache.get(light);
                uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                uniforms.direction.transformDirection(viewMatrix);
                uniforms.direction.normalize();
                uniforms.skyColor.copy(light.color).multiplyScalar(intensity);
                uniforms.groundColor.copy(light.groundColor).multiplyScalar(intensity);
                state.hemi[hemisphereLength] = uniforms;
                hemisphereLength++;
            }
        }
        state.ambient[0] = r;
        state.ambient[1] = g;
        state.ambient[2] = b;
        state.directional.length = directionalLength;
        state.spot.length = spotLength;
        state.rectArea.length = rectAreaLength;
        state.point.length = pointLength;
        state.hemi.length = hemisphereLength;
        state.hash = [
            directionalLength,
            pointLength,
            spotLength,
            rectAreaLength,
            hemisphereLength,
            shadows.length,
        ].join(",");
        return this;
    }
}
