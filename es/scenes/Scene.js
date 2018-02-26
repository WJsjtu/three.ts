import { Object3D } from "../core/Object3D";
export class Scene extends Object3D {
    constructor() {
        super(...arguments);
        this.type = "Scene";
        this.background = null;
        this.fog = null;
        this.overrideMaterial = null;
        this.autoUpdate = true; // checked by the renderer
    }
    copy(source) {
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
    clone() {
        return new this.constructor().copy(this);
    }
}
