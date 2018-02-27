import { Color } from "../math/Color";

export class Fog {
    public name: string = "";
    public color: Color;
    public near: number = 1;
    public far: number = 1000;

    constructor(
        color: Color | number | string,
        near: number = 1,
        far: number = 1000,
    ) {
        if (color instanceof Color) {
            this.color = new Color().copy(color);
        } else if (typeof color === "number") {
            this.color = new Color().setHex(color);
        } else if (typeof color === "string") {
            this.color = new Color().setStyle(color);
        }
        this.near = near;
        this.far = far;
    }

    public copy(source: Fog): this {
        this.color.copy(source.color);
        this.near = source.near;
        this.far = source.far;
        return this;
    }

    public clone(): Fog {
        return new (this.constructor as new (
            color: Color,
            near: number,
            far: number,
        ) => Fog)(this.color, this.near, this.far).copy(this);
    }
}
