import { MultiplyOperation } from "../constants";
import { Color } from "../math/Color";
import { Material } from "./Material";
export class MeshLambertMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = "MeshLambertMaterial";
        this.aoMap = null;
        this.aoMapIntensity = 1;
        this.alphaMap = null;
        this.color = new Color().setHex(0xffffff);
        this.combine = MultiplyOperation;
        this.emissive = new Color().setHex(0x000000);
        this.emissiveIntensity = 1;
        this.emissiveMap = null;
        this.envMap = null;
        this.map = null;
        this.morphNormals = true;
        this.morphTargets = true;
        this.lightMap = null;
        this.lightMapIntensity = 1;
        this.skinning = false;
        this.specularMap = null;
        this.reflectivity = 1;
        this.refractionRatio = 0.98;
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
