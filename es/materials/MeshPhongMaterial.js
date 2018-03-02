import { MultiplyOperation } from "../constants";
import { Color } from "../math/Color";
import { Vector2 } from "../math/Vector2";
import { Material } from "./Material";
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
    constructor(parameters) {
        super();
        this.type = "MeshPhongMaterial";
        this.alphaMap = null;
        this.aoMap = null;
        this.aoMapIntensity = 1.0;
        this.bumpMap = null;
        this.bumpScale = 1;
        this.color = new Color().setHex(0xffffff);
        this.combine = MultiplyOperation;
        this.displacementBias = 0;
        this.displacementMap = null;
        this.displacementScale = 1;
        this.emissive = new Color().setHex(0x000000);
        this.emissiveIntensity = 1.0;
        this.emissiveMap = null;
        this.envMap = null;
        this.lightMap = null;
        this.lightMapIntensity = 1.0;
        this.map = null;
        this.morphNormals = false;
        this.morphTargets = false;
        this.normalMap = null;
        this.normalScale = new Vector2(1, 1);
        this.reflectivity = 1;
        this.refractionRatio = 0.98;
        this.shininess = 30;
        this.skinning = false;
        this.specular = new Color().setHex(0x111111);
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
