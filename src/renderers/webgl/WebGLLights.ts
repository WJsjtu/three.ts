import {Light} from "../../lights/Light";
import {Vector2} from "../../math/Vector2";
import {Vector3} from "../../math/Vector3";
import {Color} from "../../math/Color";
import {Camera} from "../../cameras/Camera";
import {DirectionalLight} from "../../lights/DirectionalLight";
import {AmbientLight} from "../../lights/AmbientLight";
import {SpotLight} from "../../lights/SpotLight";
import {RectAreaLight} from "../../lights/RectAreaLight";
import {PointLight} from "../../lights/PointLight";
import {HemisphereLight} from "../../lights/HemisphereLight";
import {Matrix4} from "../../math/Matrix4";
import {DirectionalLightShadow} from "../../lights/DirectionalLightShadow";
import {SpotLightShadow} from "../../lights/SpotLightShadow";
import {LightShadow} from "../../lights/LightShadow";
import {PerspectiveCamera} from "../../cameras/PerspectiveCamera";

interface ILightShadowUniforms {
    shadow: boolean;
    shadowBias: number;
    shadowRadius: number;
    shadowMapSize: Vector2;
}

export interface IDirectionalLightUniforms extends ILightShadowUniforms {
    direction: Vector3;
    color: Color;
}

export interface ISpotLightUniforms extends ILightShadowUniforms {
    position: Vector3;
    direction: Vector3;
    color: Color;
    distance: number;
    coneCos: number;
    penumbraCos: number;
    decay: number;
}

export interface IPointLightUniforms extends ILightShadowUniforms {
    position: Vector3;
    color: Color;
    distance: number;
    decay: number;
    shadowCameraNear: number;
    shadowCameraFar: number;
}

export interface IHemisphereLightUniforms {
    direction: Vector3;
    skyColor: Color;
    groundColor: Color;
}

export interface IRectAreaLightUniforms {
    position: Vector3;
    color: Color;
    halfWidth: Vector3;
    halfHeight: Vector3;
}

export type ILightUniforms =
    ILightShadowUniforms
    | ISpotLightUniforms
    | IPointLightUniforms
    | IHemisphereLightUniforms
    | IRectAreaLightUniforms;

class LightUniformsCache {
    protected lights: { [key: string]: any; } = {};

    public get(light: Light): ILightUniforms {
        if (this.lights[light.id] !== undefined) {
            return this.lights[light.id];
        }
        let uniforms: ILightUniforms;
        switch (light.type) {
            case "DirectionalLight":
                uniforms = {
                    direction: new Vector3(),
                    color: new Color(),
                    shadow: false,
                    shadowBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new Vector2()
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
                    shadowMapSize: new Vector2()
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
                    shadowCameraFar: 1000
                };
                break;
            case "HemisphereLight":
                uniforms = {
                    direction: new Vector3(),
                    skyColor: new Color(),
                    groundColor: new Color()
                };
                break;
            case "RectAreaLight":
                uniforms = {
                    color: new Color(),
                    position: new Vector3(),
                    halfWidth: new Vector3(),
                    halfHeight: new Vector3()
                    // TODO (abelnation): set RectAreaLight shadow uniforms
                };
                break;
        }
        this.lights[light.id] = uniforms;
        return uniforms;
    }
}

export interface IWebGLLightsState {
    hash: string,
    ambient: [number, number, number],
    directional: Array<IDirectionalLightUniforms>,
    directionalShadowMap: Array<DirectionalLightShadow>,
    directionalShadowMatrix: Array<Matrix4>,
    spot: Array<ISpotLightUniforms>,
    spotShadowMap: Array<SpotLightShadow>,
    spotShadowMatrix: Array<Matrix4>,
    rectArea: Array<IRectAreaLightUniforms>,
    point: Array<IPointLightUniforms>,
    pointShadowMap: Array<LightShadow>,
    pointShadowMatrix: Array<Matrix4>,
    hemi: Array<IHemisphereLightUniforms>
}

export class WebGLLights {

    protected cache: LightUniformsCache = new LightUniformsCache();

    public state: any = {
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
        hemi: []
    };

    public setup(lights: Array<Light>, shadows: Array<LightShadow>, camera: Camera): this {

        const vector3: Vector3 = new Vector3();
        const matrix4: Matrix4 = new Matrix4();
        const matrix42: Matrix4 = new Matrix4();

        let r = 0, g = 0, b = 0;

        const state = this.state;
        const cache: LightUniformsCache = this.cache;

        let directionalLength: number = 0;
        let pointLength: number = 0;
        let spotLength: number = 0;
        let rectAreaLength: number = 0;
        let hemisphereLength: number = 0;

        const viewMatrix: Matrix4 = camera.matrixWorldInverse;

        for (let i: number = 0, l: number = lights.length; i < l; i++) {
            const light = lights[i];
            const color = light.color;
            const intensity = light.intensity;
            const distance = light.distance;
            const shadowMap = (light.shadow && light.shadow.map) ? light.shadow.map.texture : null;

            if (light instanceof AmbientLight) {
                r += color.r * intensity;
                g += color.g * intensity;
                b += color.b * intensity;
            } else if (light instanceof DirectionalLight) {
                const uniforms: IDirectionalLightUniforms = cache.get(light) as IDirectionalLightUniforms;
                uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                vector3.setFromMatrixPosition(light.target.matrixWorld);
                uniforms.direction.sub(vector3);
                uniforms.direction.transformDirection(viewMatrix);
                uniforms.shadow = light.castShadow;
                if (light.castShadow) {
                    const shadow: DirectionalLightShadow = light.shadow;
                    uniforms.shadowBias = shadow.bias;
                    uniforms.shadowRadius = shadow.radius;
                    uniforms.shadowMapSize = shadow.mapSize;
                }
                state.directionalShadowMap[directionalLength] = shadowMap;
                state.directionalShadowMatrix[directionalLength] = light.shadow.matrix;
                state.directional[directionalLength] = uniforms;
                directionalLength++;
            } else if (light instanceof SpotLight) {
                const uniforms: ISpotLightUniforms = cache.get(light) as ISpotLightUniforms;
                uniforms.position.setFromMatrixPosition(light.matrixWorld);
                uniforms.position.applyMatrix4(viewMatrix);
                uniforms.color.copy(color).multiplyScalar(intensity);
                uniforms.distance = distance;
                uniforms.direction.setFromMatrixPosition(light.matrixWorld);
                vector3.setFromMatrixPosition(light.target.matrixWorld);
                uniforms.direction.sub(vector3);
                uniforms.direction.transformDirection(viewMatrix);
                uniforms.coneCos = Math.cos(light.angle);
                uniforms.penumbraCos = Math.cos(light.angle * ( 1 - light.penumbra ));
                uniforms.decay = ( light.distance === 0 ) ? 0.0 : light.decay;
                uniforms.shadow = light.castShadow;
                if (light.castShadow) {
                    const shadow: SpotLightShadow = light.shadow;
                    uniforms.shadowBias = shadow.bias;
                    uniforms.shadowRadius = shadow.radius;
                    uniforms.shadowMapSize = shadow.mapSize;
                }
                state.spotShadowMap[spotLength] = shadowMap;
                state.spotShadowMatrix[spotLength] = light.shadow.matrix;
                state.spot[spotLength] = uniforms;
                spotLength++;
            } else if (light instanceof RectAreaLight) {
                const uniforms: IRectAreaLightUniforms = cache.get(light) as IRectAreaLightUniforms;

                // (a) intensity is the total visible light emitted
                //uniforms.color.copy( color ).multiplyScalar( intensity / ( light.width * light.height * Math.PI ) );

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

            } else if (light instanceof PointLight) {
                const uniforms: IPointLightUniforms = cache.get(light) as IPointLightUniforms;
                uniforms.position.setFromMatrixPosition(light.matrixWorld);
                uniforms.position.applyMatrix4(viewMatrix);
                uniforms.color.copy(light.color).multiplyScalar(light.intensity);
                uniforms.distance = light.distance;
                uniforms.decay = ( light.distance === 0 ) ? 0.0 : light.decay;
                uniforms.shadow = light.castShadow;
                if (light.castShadow) {
                    const shadow: LightShadow = light.shadow;
                    uniforms.shadowBias = shadow.bias;
                    uniforms.shadowRadius = shadow.radius;
                    uniforms.shadowMapSize = shadow.mapSize;
                    uniforms.shadowCameraNear = (shadow.camera as PerspectiveCamera).near;
                    uniforms.shadowCameraFar = (shadow.camera as PerspectiveCamera).far;

                }
                state.pointShadowMap[pointLength] = shadowMap;
                state.pointShadowMatrix[pointLength] = light.shadow.matrix;
                state.point[pointLength] = uniforms;
                pointLength++;
            } else if (light instanceof HemisphereLight) {
                const uniforms: IHemisphereLightUniforms = cache.get(light) as IHemisphereLightUniforms;
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

        state.hash = [directionalLength, pointLength, spotLength, rectAreaLength, hemisphereLength, shadows.length].join(",");
        
        return this;
    }
}