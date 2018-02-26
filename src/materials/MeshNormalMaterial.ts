import { Vector2 } from "../math/Vector2";
import { Texture } from "../textures/Texture";
import { IMaterialParameters, Material } from "./Material";

export interface IMeshNormalMaterialParameters extends IMaterialParameters {
    bumpMap?: Texture;
    bumpScale?: number;
    normalMap?: Texture;
    normalScale?: Vector2;
    displacementMap?: Texture;
    displacementScale?: number;
    displacementBias?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    skinning?: boolean;
    morphTargets?: boolean;
    morphNormals?: boolean;
}

export class MeshNormalMaterial extends Material {
    public readonly type: string = "MeshNormalMaterial";

    public bumpMap: Texture = null;
    public bumpScale: number = 1;

    public normalMap: Texture = null;
    public normalScale: Vector2 = new Vector2(1, 1);

    public displacementMap: Texture = null;
    public displacementScale: number = 1;
    public displacementBias: number = 0;

    public wireframe: boolean = false;
    public wireframeLinewidth: number = 1;

    public fog: boolean = false;
    public lights: boolean = false;

    public skinning: boolean = false;
    public morphTargets: boolean = false;
    public morphNormals: boolean = false;

    constructor(paramenters: IMeshNormalMaterialParameters) {
        super();
        this.setValues(paramenters);
    }
}
