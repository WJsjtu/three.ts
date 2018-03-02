import { Object3D } from "../core/Object3D";
export class Bone extends Object3D {
    constructor() {
        super(...arguments);
        this.type = "Bone";
    }
}
