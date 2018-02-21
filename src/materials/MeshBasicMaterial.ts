import {Material, IMaterialParameters} from "./Material";
import {Color} from "../math/Color";
import {MultiplyOperation} from "../constants";

export interface IMeshBasicMaterialParameter extends IMaterialParameters {
    color?: Color | number | string;
    map?: any;
    lightMap?: any;
    lightMapIntensity?: number;
    aoMap?: any;
    aoMapIntensity?: number;
    specularMap?: any;
    alphaMap?: any;
    envMap?: any;
    combine?: number;
    reflectivity?: number;
    refractionRatio?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    skinning?: boolean;
    morphTargets?: boolean;
}

export class MeshBasicMaterial extends Material {
    public readonly type: string = "MeshBasicMaterial";

    public color: Color = new Color().setHex(0xffffff);
    public map: any = null;
    public lightMap: any = null;
    public lightMapIntensity: number = 1.0;

    public aoMap: any = null;
    public aoMapIntensity: number = 1.0;

    public specularMap: any = null;

    public alphaMap: any = null;

    public envMap: any = null;
    public combine: number = MultiplyOperation;
    public reflectivity: number = 1;
    public refractionRatio: number = 0.98;

    public wireframe: boolean = false;
    public wireframeLinewidth: number = 1;
    public wireframeLinecap: string = "round";
    public wireframeLinejoin: string = "round";

    public skinning: boolean = false;
    public morphTargets: boolean = false;

    public lights: boolean = false;

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