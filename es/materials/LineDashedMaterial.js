import { LineBasicMaterial, } from "./LineBasicMaterial";
export class LineDashedMaterial extends LineBasicMaterial {
    constructor(parameters) {
        super(parameters);
        this.type = "LineDashedMaterial";
        this.dashSize = 3;
        this.gapSize = 1;
        this.scale = 1;
        this.setValues(parameters);
    }
    copy(source) {
        this.scale = source.scale;
        this.dashSize = source.dashSize;
        this.gapSize = source.gapSize;
        return this;
    }
}
