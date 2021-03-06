import { MultiplyOperation } from "../constants";
import { Color } from "../math/Color";
import { CubeTexture } from "../textures/CubeTexture";
import { Texture } from "../textures/Texture";
import { IMaterialParameters, Material } from "./Material";

export interface IMeshBasicMaterialParameter extends IMaterialParameters {
    alphaMap?: Texture;
    aoMap?: Texture;
    aoMapIntensity?: number;
    color?: Color | number | string;
    combine?: number;
    envMap?: CubeTexture;
    lightMap?: Texture;
    lightMapIntensity?: number;
    map?: Texture;
    morphTargets?: boolean;
    reflectivity?: number;
    refractionRatio?: number;
    skinning?: boolean;
    specularMap?: Texture;
    wireframe?: boolean;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    wireframeLinewidth?: number;
}

export class MeshBasicMaterial extends Material {
    public readonly type: string = "MeshBasicMaterial";

    public alphaMap: Texture | null = null;
    public aoMap: Texture | null = null;
    public aoMapIntensity: number = 1.0;
    public color: Color = new Color().setHex(0xffffff);
    public combine: number = MultiplyOperation;
    public envMap: CubeTexture | null = null;
    public lights: boolean = false;
    public lightMap: Texture | null = null;
    public lightMapIntensity: number = 1.0;
    public map: Texture | null = null;
    public morphTargets: boolean = false;
    public reflectivity: number = 1;
    public refractionRatio: number = 0.98;
    public skinning: boolean = false;
    public specularMap: Texture | null = null;
    public wireframe: boolean = false;
    public wireframeLinecap: string = "round";
    public wireframeLinejoin: string = "round";
    public wireframeLinewidth: number = 1;

    constructor(parameters: IMeshBasicMaterialParameter) {
        super();
        this.setValues(parameters);
    }

    public copy(source: MeshBasicMaterial): this {
        super.copy(source);
        this.color.copy(source.color);

        this.map = source.map;

        this.lightMap = source.lightMap;
        this.lightMapIntensity = source.lightMapIntensity;

        this.aoMap = source.aoMap;
        this.aoMapIntensity = source.aoMapIntensity;

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

        return this;
    }
}
