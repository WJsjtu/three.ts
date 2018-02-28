import { ILineBasicMaterialParameters, LineBasicMaterial } from "./LineBasicMaterial";

export interface ILineDashedMaterialParameters extends ILineBasicMaterialParameters {
    dashSize?: number;
    gapSize?: number;
    scale?: number;
}

export class LineDashedMaterial extends LineBasicMaterial {
    public readonly type: string = "LineDashedMaterial";

    public dashSize: number = 3;
    public gapSize: number = 1;
    public scale: number = 1;

    constructor(parameters: ILineDashedMaterialParameters) {
        super(parameters);
        this.setValues(parameters);
    }

    public copy(source: LineDashedMaterial): this {
        this.scale = source.scale;
        this.dashSize = source.dashSize;
        this.gapSize = source.gapSize;
        return this;
    }
}
