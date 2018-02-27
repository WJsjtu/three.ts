import { Color } from "../math/Color";
import { Vector2 } from "../math/Vector2";
import { CubeTexture } from "../textures/CubeTexture";
import { Texture } from "../textures/Texture";
import { IMaterialParameters, Material } from "./Material";

export interface IMeshStandardMaterialParameters extends IMaterialParameters {
    alphaMap?: Texture;
    aoMap?: Texture;
    aoMapIntensity?: number;
    bumpMap?: Texture;
    bumpScale?: number;
    color?: Color | number | string;
    displacementBias?: number;
    displacementMap?: Texture;
    displacementScale?: number;
    emissive?: Color | number | string;
    emissiveIntensity?: number;
    emissiveMap?: Texture;
    envMap?: CubeTexture;
    envMapIntensity?: number;
    lightMap?: Texture;
    lightMapIntensity?: number;
    map?: Texture;
    metalness?: number;
    metalnessMap?: Texture;
    morphNormals?: boolean;
    morphTargets?: boolean;
    normalMap?: Texture;
    normalScale?: Vector2;
    refractionRatio?: number;
    roughness?: number;
    roughnessMap?: Texture;
    skinning?: boolean;
    wireframe?: boolean;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    wireframeLinewidth?: number;
}

/**
 *
 * parameters = {
 *  color: <hex>,
 *  roughness: <float>,
 *  metalness: <float>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  emissive: <hex>,
 *  emissiveIntensity: <float>
 *  emissiveMap: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalScale: <Vector2>,
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>,
 *
 *  roughnessMap: new THREE.Texture( <Image> ),
 *
 *  metalnessMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
 *  envMapIntensity: <float>
 *
 *  refractionRatio: <float>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */

export class MeshStandardMaterial extends Material {
    public readonly type: string = "MeshStandardMaterial";

    public alphaMap: Texture | null = null;
    public aoMap: Texture | null = null;
    public aoMapIntensity: number = 1.0;
    public bumpMap: Texture | null = null;
    public bumpScale: number = 1;
    public color: Color = new Color().setHex(0xffffff);
    public defines: { [key: string]: any } = { STANDARD: "" };
    public displacementBias: number = 0;
    public displacementMap: Texture | null = null;
    public displacementScale: number = 1;
    public emissive: Color = new Color().setHex(0x000000);
    public emissiveIntensity: number = 1.0;
    public emissiveMap: Texture | null = null;
    public envMap: CubeTexture | null = null;
    public envMapIntensity: number = 1.0;
    public lightMap: Texture | null = null;
    public lightMapIntensity: number = 1.0;
    public map: Texture | null = null;
    public metalness: number = 0.5;
    public metalnessMap: Texture | null = null;
    public morphNormals: boolean = false;
    public morphTargets: boolean = false;
    public normalMap: Texture | null = null;
    public normalScale: Vector2 = new Vector2(1, 1);
    public refractionRatio: number = 0.98;
    public roughness: number = 0.5;
    public roughnessMap: Texture | null = null;
    public skinning: boolean = false;
    public wireframe: boolean = false;
    public wireframeLinecap: string = "round";
    public wireframeLinejoin: string = "round";
    public wireframeLinewidth: number = 1;

    constructor(parameters: IMeshStandardMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: MeshStandardMaterial): this {
        super.copy(source);
        this.defines = { STANDARD: "" };
        this.color.copy(source.color);
        this.roughness = source.roughness;
        this.metalness = source.metalness;

        this.map = source.map;

        this.lightMap = source.lightMap;
        this.lightMapIntensity = source.lightMapIntensity;

        this.aoMap = source.aoMap;
        this.aoMapIntensity = source.aoMapIntensity;

        this.emissive.copy(source.emissive);
        this.emissiveMap = source.emissiveMap;
        this.emissiveIntensity = source.emissiveIntensity;

        this.bumpMap = source.bumpMap;
        this.bumpScale = source.bumpScale;

        this.normalMap = source.normalMap;
        this.normalScale.copy(source.normalScale);

        this.displacementMap = source.displacementMap;
        this.displacementScale = source.displacementScale;
        this.displacementBias = source.displacementBias;

        this.roughnessMap = source.roughnessMap;

        this.metalnessMap = source.metalnessMap;

        this.alphaMap = source.alphaMap;

        this.envMap = source.envMap;
        this.envMapIntensity = source.envMapIntensity;

        this.refractionRatio = source.refractionRatio;

        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;
        this.wireframeLinecap = source.wireframeLinecap;
        this.wireframeLinejoin = source.wireframeLinejoin;

        this.skinning = source.skinning;
        this.morphTargets = source.morphTargets;
        this.morphNormals = source.morphNormals;
        return this;
    }
}
