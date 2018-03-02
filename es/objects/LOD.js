import { Object3D } from "../core/Object3D";
import { Vector3 } from "../math/Vector3";
export class LOD extends Object3D {
    constructor() {
        super(...arguments);
        this.type = "LOD";
        this.levels = [];
    }
    addLevel(object, distance = 0) {
        const levels = this.levels;
        distance = Math.abs(distance);
        let l = 0;
        for (; l < levels.length; l++) {
            if (distance < levels[l].distance) {
                break;
            }
        }
        levels.splice(l, 0, { distance: distance, object: object });
        this.add(object);
        return this;
    }
    getObjectForDistance(distance) {
        const levels = this.levels;
        let i = 1;
        for (const l = levels.length; i < l; i++) {
            if (distance < levels[i].distance) {
                break;
            }
        }
        return levels[i - 1].object;
    }
    raycast(raycaster, intersects = []) {
        const matrixPosition = new Vector3().setFromMatrixPosition(this.matrixWorld);
        const distance = raycaster.ray.origin.distanceTo(matrixPosition);
        this.getObjectForDistance(distance).raycast(raycaster, intersects);
        return intersects;
    }
    update(camera) {
        const levels = this.levels;
        if (levels.length > 1) {
            const v1 = new Vector3().setFromMatrixPosition(camera.matrixWorld);
            const v2 = new Vector3().setFromMatrixPosition(this.matrixWorld);
            const distance = v1.distanceTo(v2);
            levels[0].object.visible = true;
            let i = 1;
            const l = levels.length;
            for (; i < l; i++) {
                if (distance >= levels[i].distance) {
                    levels[i - 1].object.visible = false;
                    levels[i].object.visible = true;
                }
                else {
                    break;
                }
            }
            for (; i < l; i++) {
                levels[i].object.visible = false;
            }
        }
        return this;
    }
    copy(source) {
        super.copy(source);
        const levels = source.levels;
        for (let i = 0, l = levels.length; i < l; i++) {
            const level = levels[i];
            this.addLevel(level.object.clone(), level.distance);
        }
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
