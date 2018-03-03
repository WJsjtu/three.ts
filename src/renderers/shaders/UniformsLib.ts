import { Color } from "../../math/Color";
import { Vector2 } from "../../math/Vector2";
import { Matrix3 } from "../../math/Matrix3";
import { IUniform } from "./UniformsUtils";

/**
 * Uniforms library for shared webgl shaders
 */

const UniformsLib: {
    [key: string]: {
        [name: string]: IUniform;
    };
} = {
    common: {
        diffuse: { value: new Color().setHex(0xeeeeee) },
        opacity: { value: 1.0 },

        map: { value: null },
        uvTransform: { value: new Matrix3() },

        alphaMap: { value: null },
    },

    specularmap: {
        specularMap: { value: null },
    },

    envmap: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        reflectivity: { value: 1.0 },
        refractionRatio: { value: 0.98 },
    },

    aomap: {
        aoMap: { value: null },
        aoMapIntensity: { value: 1 },
    },

    lightmap: {
        lightMap: { value: null },
        lightMapIntensity: { value: 1 },
    },

    emissivemap: {
        emissiveMap: { value: null },
    },

    bumpmap: {
        bumpMap: { value: null },
        bumpScale: { value: 1 },
    },

    normalmap: {
        normalMap: { value: null },
        normalScale: { value: new Vector2(1, 1) },
    },

    displacementmap: {
        displacementMap: { value: null },
        displacementScale: { value: 1 },
        displacementBias: { value: 0 },
    },

    roughnessmap: {
        roughnessMap: { value: null },
    },

    metalnessmap: {
        metalnessMap: { value: null },
    },

    gradientmap: {
        gradientMap: { value: null },
    },

    fog: {
        fogDensity: { value: 0.00025 },
        fogNear: { value: 1 },
        fogFar: { value: 2000 },
        fogColor: { value: new Color().setHex(0xffffff) },
    },

    lights: {
        ambientLightColor: { value: [] },

        directionalLights: {
            value: [],
            properties: {
                direction: {},
                color: {},

                shadow: {},
                shadowBias: {},
                shadowRadius: {},
                shadowMapSize: {},
            },
        },

        directionalShadowMap: { value: [] },
        directionalShadowMatrix: { value: [] },

        spotLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                direction: {},
                distance: {},
                coneCos: {},
                penumbraCos: {},
                decay: {},

                shadow: {},
                shadowBias: {},
                shadowRadius: {},
                shadowMapSize: {},
            },
        },

        spotShadowMap: { value: [] },
        spotShadowMatrix: { value: [] },

        pointLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                decay: {},
                distance: {},

                shadow: {},
                shadowBias: {},
                shadowRadius: {},
                shadowMapSize: {},
                shadowCameraNear: {},
                shadowCameraFar: {},
            },
        },

        pointShadowMap: { value: [] },
        pointShadowMatrix: { value: [] },

        hemisphereLights: {
            value: [],
            properties: {
                direction: {},
                skyColor: {},
                groundColor: {},
            },
        },

        // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
        rectAreaLights: {
            value: [],
            properties: {
                color: {},
                position: {},
                width: {},
                height: {},
            },
        },
    },

    points: {
        diffuse: { value: new Color().setHex(0xeeeeee) },
        opacity: { value: 1.0 },
        size: { value: 1.0 },
        scale: { value: 1.0 },
        map: { value: null },
        uvTransform: { value: new Matrix3() },
    },
};

export { UniformsLib };
