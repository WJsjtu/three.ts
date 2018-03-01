import { WebGLRenderer } from "../WebGLRenderer";
import { WebGLState } from "./WebGLState";
import { WebGLGeometries } from "./WebGLGeometries";
import { Color } from "../../math/Color";

export class WebGLBackground {
    protected clearColor: Color;
    protected clearAlpha: number;

    constructor(renderer: WebGLRenderer, state: WebGLState, geometries: WebGLGeometries, premultipliedAlpha: boolean) {}

    public getClearColor(): Color {
        return this.clearColor;
    }

    public setClearColor(color: Color, alpha: number): void {}

    public getClearAlpha(): number {
        return this.clearAlpha;
    }

    public setClearAlpha(alpha: number): void {}
}
