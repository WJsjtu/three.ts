import { Object3D } from "../../core/Object3D";
export class ImmediateRenderObject extends Object3D {
    constructor(material) {
        super();
        this.material = material;
    }
}
