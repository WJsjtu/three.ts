import { Texture } from "../textures/Texture";
import { CubeTexture } from "../textures/CubeTexture";

export interface IInfoMemory {
    geometries: number;
    textures: number;
}

export interface IInfoRender {
    frame: number;
    calls: number;
    vertices: number;
    faces: number;
    points: number;
}

export class WebGLRenderer {
    public context: WebGLRenderingContext = null;

    public allocTextureUnit(): number {
        return 0;
    }

    public setTexture2D(texture: Texture, unit: number) {}

    public setTextureCube(cubeTexture: CubeTexture, unit: number) {}
}
