import { Object3D } from "../../core/Object3D";
import { Material } from "../../materials/Material";
import { TypedArray } from "../../core/BufferAttribute";

export class ImmediateRenderObject extends Object3D {
    public material: Material;

    public hasPositions?: boolean;
    public hasNormals?: boolean;
    public hasUvs?: boolean;
    public hasColors?: boolean;
    public count?: number;
    public positionArray?: TypedArray;
    public normalArray?: TypedArray;
    public uvArray?: TypedArray;
    public colorArray?: TypedArray;

    public render: (arg1: any, ...arg2: any[]) => any;

    constructor(material: Material) {
        super();
        this.material = material;
    }
}
