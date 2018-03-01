import { WebGLRenderer } from "../WebGLRenderer";
import { Camera } from "../../cameras/Camera";
import { Color } from "../../math/Color";
import { Scene } from "../../scenes/Scene";
import { WebGLState } from "./WebGLState";
import { WebGLGeometries } from "./WebGLGeometries";
import { WebGLRenderList } from "./WebGLRenderLists";

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

    public render(renderList: WebGLRenderList, scene: Scene, camera: Camera, forceClear: boolean): void {}
}
