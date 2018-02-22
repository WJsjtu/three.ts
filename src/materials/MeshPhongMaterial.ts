import { MultiplyOperation } from "../constants";
import { Color } from "../math/Color";
import { Vector2 } from "../math/Vector2";
import { CubeTexture } from "../textures/CubeTexture";
import { Texture } from "../textures/Texture";
import { IMaterialParameters, Material } from "./Material";

export interface IMeshPhongMaterialParameters extends IMaterialParameters {
    alphaMap?: Texture;
    aoMap?: Texture;
    aoMapIntensity?: number;
    bumpMap?: Texture;
    bumpScale?: number;
    color?: Color | number | string;
    combine?: number;
    displacementBias?: number;
    displacementMap?: Texture;
    displacementScale?: number;
    emissive?: Color | number | string;
    emissiveIntensity?: number;
    emissiveMap?: Texture;
    envMap?: CubeTexture;
    lightMap?: Texture;
    lightMapIntensity?: number;
    map?: Texture;
    morphNormals?: boolean;
    morphTargets?: boolean;
    normalMap?: Texture;
    normalScale?: Vector2;
    reflectivity?: number;
    refractionRatio?: number;
    shininess?: number;
    skinning?: boolean;
    specular?: Color | number | string;
    specularMap?: Texture;
    wireframe?: boolean;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    wireframeLinewidth?: number;
}
/**
 * parameters = {
 *  color: <hex>,
 *  specular: <hex>,
 *  shininess: <float>,
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
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
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
export class MeshPhongMaterial extends Material {
    public readonly type: string = "MeshPhongMaterial";

    public alphaMap: Texture = null;
    public aoMap: Texture = null;
    public aoMapIntensity: number = 1.0;
    public bumpMap: Texture = null;
    public bumpScale: number = 1;
    public color: Color = new Color().setHex(0xffffff);
    public combine: number = MultiplyOperation;
    public displacementBias: number = 0;
    public displacementMap: Texture = null;
    public displacementScale: number = 1;
    public emissive: Color = new Color().setHex(0x000000);
    public emissiveIntensity: number = 1.0;
    public emissiveMap: Texture = null;
    public envMap: CubeTexture = null;
    public lightMap: Texture = null;
    public lightMapIntensity: number = 1.0;
    public map: Texture = null;
    public morphNormals: boolean = false;
    public morphTargets: boolean = false;
    public normalMap: Texture = null;
    public normalScale: Vector2 = new Vector2(1, 1);
    public reflectivity: number = 1;
    public refractionRatio: number = 0.98;
    public shininess: number = 30;
    public skinning: boolean = false;
    public specular: Color = new Color().setHex(0x111111);
    public specularMap: Texture = null;
    public wireframe: boolean = false;
    public wireframeLinecap: string = "round";
    public wireframeLinejoin: string = "round";
    public wireframeLinewidth: number = 1;

    constructor(parameters: IMeshPhongMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: MeshPhongMaterial): this {
        super.copy(source);
        this.color.copy(source.color);
        this.specular.copy(source.specular);
        this.shininess = source.shininess;

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

        this.specularMap = source.specularMap;

        this.alphaMap = source.alphaMap;

        this.envMap = source.envMap;
        this.combine = source.combine;
        this.reflectivity = source.reflectivity;
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
