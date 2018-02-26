import {
    BackSide,
    DoubleSide,
    CubeUVRefractionMapping,
    CubeUVReflectionMapping,
    GammaEncoding,
    LinearEncoding,
} from "../../constants";
import { WebGLRenderer, IShader } from "../WebGLRenderer";
import { WebGLExtensions } from "./WebGLExtensions";
import { WebGLCapabilities } from "./WebGLCapabilities";
import { Bone } from "../../objects/Bone";
import { SkinnedMesh } from "../../objects/SkinnedMesh";
import { Skeleton } from "../../objects/Skeleton";
import { Object3D } from "../../core/Object3D";
import { Material } from "../../materials/Material";
import { WebGLRenderTarget } from "../WebGLRenderTarget";
import { FogExp2 } from "../../scenes/FogExp2";
import { Fog } from "../../scenes/Fog";
import { ILightState } from "./WebGLLights";
import { Texture } from "../../textures/Texture";
import { WebGLProgramWrapper } from "./WebGLProgram";
import { Light } from "../../lights/Light";

export interface IProgramParameters {
    alphaMap: boolean;
    alphaTest: number;
    aoMap: boolean;
    bumpMap: boolean;
    combine: number;
    depthPacking: number | boolean; // ?
    displacementMap: boolean;
    dithering: boolean;
    doubleSided: boolean;
    emissiveMap: boolean;
    emissiveMapEncoding: number;
    envMap: boolean;
    envMapMode: null | number;
    envMapEncoding: number;
    envMapCubeUV: boolean;
    flatShading: boolean;
    flipSided: boolean;
    fog: boolean;
    fogExp: boolean;
    gradientMap: boolean;
    lightMap: boolean;
    logarithmicDepthBuffer: boolean;
    map: boolean;
    mapEncoding: number;
    maxBones: number;
    maxMorphNormals: number;
    maxMorphTargets: number;
    metalnessMap: boolean;
    normalMap: boolean;
    morphTargets: boolean;
    morphNormals: boolean;
    numClipIntersection: number;
    numClippingPlanes: number;
    numDirLights: number;
    numHemiLights: number;
    numPointLights: number;
    numRectAreaLights: number;
    numSpotLights: number;
    outputEncoding: number;
    physicallyCorrectLights: boolean;
    premultipliedAlpha: boolean;
    precision: string;
    roughnessMap: boolean;
    shaderID: string;
    shadowMapEnabled: boolean;
    shadowMapType: number;
    sizeAttenuation: boolean;
    skinning: boolean;
    specularMap: boolean;
    supportsVertexTextures: boolean;
    toneMapping: number;
    useFog: boolean;
    useVertexTexture: boolean;
    vertexColors: number;
}

function getTextureEncodingFromMap(
    map: Texture | WebGLRenderTarget,
    gammaOverrideLinear: boolean,
): number {
    let encoding: number;
    if (!map) {
        encoding = LinearEncoding;
    } else if (map instanceof Texture) {
        encoding = map.encoding;
    } else if (map instanceof WebGLRenderTarget) {
        console.warn(
            "THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead.",
        );
        encoding = map.texture.encoding;
    }
    // add backwards compatibility for WebGLRenderer.gammaInput/gammaOutput parameter, should probably be removed at some point.
    if (encoding === LinearEncoding && gammaOverrideLinear) {
        encoding = GammaEncoding;
    }
    return encoding;
}

export class WebGLPrograms {
    public static shaderIDs: { [key: string]: string } = {
        MeshDepthMaterial: "depth",
        MeshDistanceMaterial: "distanceRGBA",
        MeshNormalMaterial: "normal",
        MeshBasicMaterial: "basic",
        MeshLambertMaterial: "lambert",
        MeshPhongMaterial: "phong",
        MeshToonMaterial: "phong",
        MeshStandardMaterial: "physical",
        MeshPhysicalMaterial: "physical",
        LineBasicMaterial: "basic",
        LineDashedMaterial: "dashed",
        PointsMaterial: "points",
        ShadowMaterial: "shadow",
    };

    public static parameterNames: string[] = [
        "precision",
        "supportsVertexTextures",
        "map",
        "mapEncoding",
        "envMap",
        "envMapMode",
        "envMapEncoding",
        "lightMap",
        "aoMap",
        "emissiveMap",
        "emissiveMapEncoding",
        "bumpMap",
        "normalMap",
        "displacementMap",
        "specularMap",
        "roughnessMap",
        "metalnessMap",
        "gradientMap",
        "alphaMap",
        "combine",
        "vertexColors",
        "fog",
        "useFog",
        "fogExp",
        "flatShading",
        "sizeAttenuation",
        "logarithmicDepthBuffer",
        "skinning",
        "maxBones",
        "useVertexTexture",
        "morphTargets",
        "morphNormals",
        "maxMorphTargets",
        "maxMorphNormals",
        "premultipliedAlpha",
        "numDirLights",
        "numPointLights",
        "numSpotLights",
        "numHemiLights",
        "numRectAreaLights",
        "shadowMapEnabled",
        "shadowMapType",
        "toneMapping",
        "physicallyCorrectLights",
        "alphaTest",
        "doubleSided",
        "flipSided",
        "numClippingPlanes",
        "numClipIntersection",
        "depthPacking",
        "dithering",
    ];

    public renderer: WebGLRenderer = null;
    public extensions: WebGLExtensions = null;
    public capabilities: WebGLCapabilities = null;
    public programs: WebGLProgramWrapper[];

    constructor(
        renderer: WebGLRenderer,
        extensions: WebGLExtensions,
        capabilities: WebGLCapabilities,
    ) {
        this.renderer = renderer;
        this.extensions = extensions;
        this.capabilities = capabilities;
    }

    protected allocateBones(object: SkinnedMesh): number {
        const skeleton: Skeleton = object.skeleton;
        const bones: Bone[] = skeleton.bones;
        if (this.capabilities.floatVertexTextures) {
            return 1024;
        } else {
            // default for when object is not specified
            // ( for example when prebuilding shader to be used with multiple objects )
            //
            //  - leave some extra space for other uniforms
            //  - limit here is ANGLE's 254 max uniform vectors
            //    (up to 54 should be safe)
            const nVertexUniforms: number = this.capabilities.maxVertexUniforms;
            const nVertexMatrices: number = Math.floor(
                (nVertexUniforms - 20) / 4,
            );
            const maxBones: number = Math.min(nVertexMatrices, bones.length);
            if (maxBones < bones.length) {
                console.warn(
                    "THREE.WebGLRenderer: Skeleton has " +
                        bones.length +
                        " bones. This GPU supports " +
                        maxBones +
                        ".",
                );
                return 0;
            }
            return maxBones;
        }
    }

    public getParameters(
        material: Material,
        lights: ILightState,
        shadows: Light[],
        fog?: Fog | FogExp2,
        nClipPlanes?: number,
        nClipIntersection?: number,
        object?: Object3D,
    ): IProgramParameters {
        const renderer: WebGLRenderer = this.renderer;
        const capabilities: WebGLCapabilities = this.capabilities;
        const shaderID: string = WebGLPrograms.shaderIDs[material.type];
        // heuristics to create shader parameters according to lights in the scene
        // (not to blow over maxLights budget)
        const maxBones: number =
            object instanceof SkinnedMesh ? this.allocateBones(object) : 0;
        let precision: string = capabilities.precision;
        if (material.precision !== null) {
            precision = capabilities.getMaxPrecision(material.precision);
            if (precision !== material.precision) {
                console.warn(
                    "THREE.WebGLProgram.getParameters:",
                    material.precision,
                    "not supported, using",
                    precision,
                    "instead.",
                );
            }
        }
        const currentRenderTarget: WebGLRenderTarget = renderer.getRenderTarget();
        const parameters: IProgramParameters = {
            shaderID: shaderID,
            precision: precision,
            supportsVertexTextures: capabilities.vertexTextures,
            outputEncoding: getTextureEncodingFromMap(
                !currentRenderTarget ? null : currentRenderTarget.texture,
                renderer.gammaOutput,
            ),
            map: !!material.map,
            mapEncoding: getTextureEncodingFromMap(
                material.map,
                renderer.gammaInput,
            ),
            envMap: !!material.envMap,
            envMapMode: material.envMap && material.envMap.mapping,
            envMapEncoding: getTextureEncodingFromMap(
                material.envMap,
                renderer.gammaInput,
            ),
            envMapCubeUV:
                !!material.envMap &&
                (material.envMap.mapping === CubeUVReflectionMapping ||
                    material.envMap.mapping === CubeUVRefractionMapping),
            lightMap: !!material.lightMap,
            aoMap: !!material.aoMap,
            emissiveMap: !!material.emissiveMap,
            emissiveMapEncoding: getTextureEncodingFromMap(
                material.emissiveMap,
                renderer.gammaInput,
            ),
            bumpMap: !!material.bumpMap,
            normalMap: !!material.normalMap,
            displacementMap: !!material.displacementMap,
            roughnessMap: !!material.roughnessMap,
            metalnessMap: !!material.metalnessMap,
            specularMap: !!material.specularMap,
            alphaMap: !!material.alphaMap,
            gradientMap: !!material.gradientMap,
            combine: material.combine,
            vertexColors: material.vertexColors,
            fog: !!fog,
            useFog: material.fog,
            fogExp: fog && fog instanceof FogExp2,
            flatShading: material.flatShading,
            sizeAttenuation: material.sizeAttenuation,
            logarithmicDepthBuffer: capabilities.logarithmicDepthBuffer,
            skinning: material.skinning && maxBones > 0,
            maxBones: maxBones,
            useVertexTexture: capabilities.floatVertexTextures,
            morphTargets: material.morphTargets,
            morphNormals: material.morphNormals,
            maxMorphTargets: renderer.maxMorphTargets,
            maxMorphNormals: renderer.maxMorphNormals,
            numDirLights: lights.directional.length,
            numPointLights: lights.point.length,
            numSpotLights: lights.spot.length,
            numRectAreaLights: lights.rectArea.length,
            numHemiLights: lights.hemi.length,
            numClippingPlanes: nClipPlanes,
            numClipIntersection: nClipIntersection,
            dithering: material.dithering,
            shadowMapEnabled:
                renderer.shadowMap.enabled &&
                object.receiveShadow &&
                shadows.length > 0,
            shadowMapType: renderer.shadowMap.type,
            toneMapping: renderer.toneMapping,
            physicallyCorrectLights: renderer.physicallyCorrectLights,
            premultipliedAlpha: material.premultipliedAlpha,
            alphaTest: material.alphaTest,
            doubleSided: material.side === DoubleSide,
            flipSided: material.side === BackSide,
            depthPacking:
                material.depthPacking !== undefined
                    ? material.depthPacking
                    : false,
        };
        return parameters;
    }

    public getProgramCode(
        material: Material,
        parameters: IProgramParameters,
    ): string {
        const array: any[] = [];
        if (parameters.shaderID) {
            array.push(parameters.shaderID);
        } else {
            array.push(material.fragmentShader);
            array.push(material.vertexShader);
        }
        if (material.defines !== undefined) {
            for (const name in material.defines) {
                if (material.defines.hasOwnProperty(name)) {
                    array.push(name);
                    array.push(material.defines[name]);
                }
            }
        }
        for (let i: number = 0; i < WebGLPrograms.parameterNames.length; i++) {
            array.push(parameters[WebGLPrograms.parameterNames[i]]);
        }
        array.push(material.onBeforeCompile.toString());
        array.push(this.renderer.gammaOutput);
        return array.join();
    }

    public acquireProgram(
        material: Material,
        shader: IShader,
        parameters: IProgramParameters,
        code: string,
    ): WebGLProgramWrapper {
        let program: WebGLProgramWrapper;
        // Check if code has been already compiled
        for (
            let p: number = 0, pl: number = this.programs.length;
            p < pl;
            p++
        ) {
            const programInfo = this.programs[p];
            if (programInfo.code === code) {
                program = programInfo;
                ++program.usedTimes;
                break;
            }
        }
        if (program === undefined) {
            program = new WebGLProgramWrapper(
                this.renderer,
                this.extensions,
                code,
                material,
                shader,
                parameters,
            );
            this.programs.push(program);
        }
        return program;
    }

    public releaseProgram(program: WebGLProgramWrapper) {
        if (--program.usedTimes === 0) {
            // Remove from unordered set
            const i: number = this.programs.indexOf(program);
            this.programs[i] = this.programs[this.programs.length - 1];
            this.programs.pop();
            // Free WebGL resources
            program.destroy();
        }
    }
}
