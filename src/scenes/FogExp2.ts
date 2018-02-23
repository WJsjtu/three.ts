import { Color } from "../math/Color";

export class FogExp2 {
    public name: string = "";
    public color: Color = null;
    public density: number = 0.00025;

    constructor(color: Color | number | string, density: number = 1) {
        if (color instanceof Color) {
            this.color = new Color().copy(color);
        } else if (typeof color === "number") {
            this.color = new Color().setHex(color);
        } else if (typeof color === "string") {
            this.color = new Color().setStyle(color);
        }
        this.density = density;
    }

    public copy(source: FogExp2): this {
        this.color.copy(source.color);
        this.density = source.density;
        return this;
    }

    public clone(): FogExp2 {
        return new (this.constructor as (
            color: Color,
            density: number,
        ) => void)(this.color, this.density).copy(this);
    }
}
