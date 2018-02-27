import { MultiplyOperation } from "../constants";
import { Color } from "../math/Color";
import { CubeTexture } from "../textures/CubeTexture";
import { Texture } from "../textures/Texture";
import { IMaterialParameters, Material } from "./Material";

export interface IMeshLambertMaterialParameters extends IMaterialParameters {
    aoMap?: Texture;
    aoMapIntensity?: number;
    alphaMap?: Texture;
    color?: Color | number | string;
    combine?: number;
    emissive?: Color | number | string;
    emissiveIntensity?: number;
    emissiveMap?: Texture;
    envMap?: CubeTexture;
    map?: Texture;
    morphNormals?: boolean;
    morphTargets?: boolean;
    lightMap?: Texture;
    lightMapIntensity?: number;
    skinning?: boolean;
    specularMap?: Texture;
    reflectivity?: number;
    refractionRatio?: number;
    wireframe?: boolean;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    wireframeLinewidth?: number;
}

export class MeshLambertMaterial extends Material {
    public readonly type: string = "MeshLambertMaterial";

    public aoMap: Texture | null = null;
    public aoMapIntensity: number = 1;

    public alphaMap: Texture | null = null;

    public color: Color = new Color().setHex(0xffffff);
    public combine: number = MultiplyOperation;

    public emissive: Color = new Color().setHex(0x000000);
    public emissiveIntensity: number = 1;
    public emissiveMap: Texture | null = null;
    public envMap: CubeTexture | null = null;

    public map: Texture | null = null;
    public morphNormals: boolean = true;
    public morphTargets: boolean = true;

    public lightMap: Texture = null;
    public lightMapIntensity: number = 1;

    public skinning: boolean = false;
    public specularMap: Texture | null = null;

    public reflectivity: number = 1;
    public refractionRatio: number = 0.98;

    public wireframe: boolean = false;
    public wireframeLinecap: string = "round";
    public wireframeLinejoin: string = "round";
    public wireframeLinewidth: number = 1;

    constructor(parameters: IMeshLambertMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: MeshLambertMaterial): this {
        super.copy(source);
        this.color.copy(source.color);

        this.map = source.map;

        this.lightMap = source.lightMap;
        this.lightMapIntensity = source.lightMapIntensity;

        this.aoMap = source.aoMap;
        this.aoMapIntensity = source.aoMapIntensity;

        this.emissive.copy(source.emissive);
        this.emissiveMap = source.emissiveMap;
        this.emissiveIntensity = source.emissiveIntensity;

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
