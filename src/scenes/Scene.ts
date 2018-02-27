import { Object3D } from "../core/Object3D";
import { Color } from "../math/Color";
import { CubeTexture } from "../textures/CubeTexture";
import { Texture } from "../textures/Texture";
import { Fog } from "./Fog";
import { FogExp2 } from "./FogExp2";
import { Material } from "../materials/Material";

export class Scene extends Object3D {
    public readonly type: string = "Scene";

    public background: Color | Texture | CubeTexture | null = null;
    public fog: Fog | FogExp2 | null = null;
    public overrideMaterial: Material | null = null;
    public autoUpdate: boolean = true; // checked by the renderer

    public copy(source: Scene): this {
        super.copy(source);
        if (source.background !== null) {
            this.background = source.background.clone();
        }
        if (source.fog !== null) {
            this.fog = source.fog.clone();
        }
        if (source.overrideMaterial !== null) {
            this.overrideMaterial = source.overrideMaterial.clone();
        }
        this.autoUpdate = source.autoUpdate;
        // this.matrixAutoUpdate = source.matrixAutoUpdate;
        return this;
    }

    public clone(): Scene {
        return new (this.constructor as new () => Scene)().copy(this);
    }
}
