import { WebGLRenderer } from "../WebGLRenderer";
import { WebGLExtensions } from "./WebGLExtensions";
import { WebGLCapabilities } from "./WebGLCapabilities";
import { Bone } from "../../objects/Bone";
import { SkinnedMesh } from "../../objects/SkinnedMesh";
import { Skeleton } from "../../objects/Skeleton";

export interface IProgramParameters {
    shaderID: string;
    precision: "highp" | "mediump" | "lowp";
    supportsVertexTextures: boolean;
    outputEncoding: number;
    map: boolean;
    mapEncoding: number;
    envMap: boolean;
    envMapMode: null | number;
    envMapEncoding: number;
    envMapCubeUV: boolean;
    lightMap: boolean;
    aoMap: boolean;
    emissiveMap: boolean;
    emissiveMapEncoding: number;
    bumpMap: boolean;
    normalMap: boolean;
    displacementMap: boolean;
    roughnessMap: boolean;
    metalnessMap: boolean;
    specularMap: boolean;
    alphaMap: boolean;
    gradientMap: boolean;
    combine: number;
    vertexColors: number;
    fog: boolean;
    useFog: boolean;
    fogExp: boolean;
    flatShading: boolean;
    sizeAttenuation: boolean;
    logarithmicDepthBuffer: boolean;
    skinning: boolean;
    maxBones: number;
    useVertexTexture: boolean;
    morphTargets: boolean;
    morphNormals: boolean;
    maxMorphTargets: number;
    maxMorphNormals: number;
    numDirLights: number;
    numPointLights: number;
    numSpotLights: number;
    numRectAreaLights: number;
    numHemiLights: number;
    numClippingPlanes: number;
    numClipIntersection: number;
    dithering: boolean;
    shadowMapEnabled: boolean;
    shadowMapType: number;
    toneMapping: number;
    physicallyCorrectLights: boolean;
    premultipliedAlpha: boolean;
    alphaTest: number;
    doubleSided: boolean;
    flipSided: boolean;
    depthPacking: boolean;
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
    public programs: any[];

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

    public getParameters() {}
}
