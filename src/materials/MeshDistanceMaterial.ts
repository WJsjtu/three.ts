import { BasicDepthPacking } from "../constants";
import { Vector3 } from "../math/Vector3";
import { IMaterialParameters, Material } from "./Material";

export interface IMeshDistanceMaterialParameters extends IMaterialParameters {
    alphaMap?: any;
    displacementMap?: any;
    displacementScale?: number;
    displacementBias?: number;
    farDistance?: number;
    map?: any;
    morphTargets?: boolean;
    nearDistance: number;
    referencePosition: Vector3;
    skinning?: boolean;
}

export class MeshDistanceMaterial extends Material {
    public readonly type: string = "MeshDepthMaterial";

    public alphaMap: any = null;
    public displacementMap: any = null;
    public displacementScale: number = 1;
    public displacementBias: number = 0;

    public farDistance: number = 1;
    public fog: boolean = false;
    public lights: boolean = false;

    public map: any = null;
    public morphTargets: boolean = false;
    public nearDistance: number = 1;
    public referencePosition: Vector3 = new Vector3();
    public skinning: boolean = false;

    constructor(parameters: IMeshDistanceMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: MeshDistanceMaterial): this {
        super.copy(source);
        this.referencePosition.copy(source.referencePosition);
        this.nearDistance = source.nearDistance;
        this.farDistance = source.farDistance;
        this.skinning = source.skinning;
        this.morphTargets = source.morphTargets;
        this.map = source.map;
        this.alphaMap = source.alphaMap;
        this.displacementMap = source.displacementMap;
        this.displacementScale = source.displacementScale;
        this.displacementBias = source.displacementBias;
        return this;
    }
}
