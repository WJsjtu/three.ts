import { BasicDepthPacking } from "../constants";
import { Texture } from "../textures/Texture";
import { IMaterialParameters, Material } from "./Material";

export interface IMeshDepthMaterialParameters extends IMaterialParameters {
    alphaMap?: Texture;
    depthPacking?: number;
    displacementMap?: Texture;
    displacementScale?: number;
    displacementBias?: number;
    map?: Texture;
    morphTargets?: boolean;
    skinning?: boolean;
    wireframe?: boolean;
    wireframeLinewidth?: number;
}

export class MeshDepthMaterial extends Material {
    public readonly type: string = "MeshDepthMaterial";

    public alphaMap: Texture | null = null;
    public depthPacking: number = BasicDepthPacking;
    public displacementMap: Texture | null = null;
    public displacementScale: number = 1;
    public displacementBias: number = 0;

    public fog: boolean = false;
    public lights: boolean = false;

    public map: Texture | null = null;
    public morphTargets: boolean = false;
    public skinning: boolean = false;
    public wireframe: boolean = false;
    public wireframeLinewidth: number = 1;

    constructor(parameters: IMeshDepthMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: MeshDepthMaterial): this {
        super.copy(source);
        this.depthPacking = source.depthPacking;
        this.skinning = source.skinning;
        this.morphTargets = source.morphTargets;
        this.map = source.map;
        this.alphaMap = source.alphaMap;
        this.displacementMap = source.displacementMap;
        this.displacementScale = source.displacementScale;
        this.displacementBias = source.displacementBias;
        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;
        return this;
    }
}
