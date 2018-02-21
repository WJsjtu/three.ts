import {Object3D} from "../core/Object3D";
import {Color} from "../math/Color";
import {LightShadow} from "./LightShadow";

export class Light extends Object3D {

    public readonly type: string = "Light";

    public color: Color = null;
    public intensity: number = 1;
    public receiveShadow: boolean = false;
    public shadow?: LightShadow;
    public distance?: number;

    constructor(color: Color = new Color(), intensity: number = 1) {
        super();
        this.color = color;
        this.intensity = intensity;
    }

    public copy(source: Light): this {
        super.copy(source);
        this.color.copy(source.color);
        this.intensity = source.intensity;
        return this;
    }
}