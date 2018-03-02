import { MultiplyOperation } from "../constants";
import { Color } from "../math/Color";
import { Material } from "./Material";
export class MeshBasicMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = "MeshBasicMaterial";
        this.alphaMap = null;
        this.aoMap = null;
        this.aoMapIntensity = 1.0;
        this.color = new Color().setHex(0xffffff);
        this.combine = MultiplyOperation;
        this.envMap = null;
        this.lights = false;
        this.lightMap = null;
        this.lightMapIntensity = 1.0;
        this.map = null;
        this.morphTargets = false;
        this.reflectivity = 1;
        this.refractionRatio = 0.98;
        this.skinning = false;
        this.specularMap = null;
        this.wireframe = false;
        this.wireframeLinecap = "round";
        this.wireframeLinejoin = "round";
        this.wireframeLinewidth = 1;
        this.setValues(parameters);
    }
    copy(source) {
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
