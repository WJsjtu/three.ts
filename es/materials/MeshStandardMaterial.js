import { Color } from "../math/Color";
import { Vector2 } from "../math/Vector2";
import { Material } from "./Material";
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
    constructor(parameters) {
        super();
        this.type = "MeshStandardMaterial";
        this.alphaMap = null;
        this.aoMap = null;
        this.aoMapIntensity = 1.0;
        this.bumpMap = null;
        this.bumpScale = 1;
        this.color = new Color().setHex(0xffffff);
        this.defines = { STANDARD: "" };
        this.displacementBias = 0;
        this.displacementMap = null;
        this.displacementScale = 1;
        this.emissive = new Color().setHex(0x000000);
        this.emissiveIntensity = 1.0;
        this.emissiveMap = null;
        this.envMap = null;
        this.envMapIntensity = 1.0;
        this.lightMap = null;
        this.lightMapIntensity = 1.0;
        this.map = null;
        this.metalness = 0.5;
        this.metalnessMap = null;
        this.morphNormals = false;
        this.morphTargets = false;
        this.normalMap = null;
        this.normalScale = new Vector2(1, 1);
        this.refractionRatio = 0.98;
        this.roughness = 0.5;
        this.roughnessMap = null;
        this.skinning = false;
        this.wireframe = false;
        this.wireframeLinecap = "round";
        this.wireframeLinejoin = "round";
        this.wireframeLinewidth = 1;
        this.setValues(parameters);
    }
    copy(source) {
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
