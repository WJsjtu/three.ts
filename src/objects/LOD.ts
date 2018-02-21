import {Object3D} from "../core/Object3D";
import {Intersection, Raycaster} from "../core/Raycaster";
import {Vector3} from "../math/Vector3";
import {Camera} from "../cameras/Camera";

export interface LODLevel {
    object: Object3D,
    distance: number
}

export class LOD extends Object3D {
    public readonly type: string = "LOD";
    public levels: Array<LODLevel> = [];

    public addLevel(object: Object3D, distance: number = 0): LOD {
        const levels: Array<LODLevel> = this.levels;
        distance = Math.abs(distance);
        let l: number = 0;
        for (; l < levels.length; l++) {
            if (distance < levels[l].distance) {
                break;
            }
        }
        levels.splice(l, 0, {distance: distance, object: object});
        this.add(object);
        return this;
    }

    public getObjectForDistance(distance: number) {
        const levels: Array<LODLevel> = this.levels;
        let i: number = 1;
        for (let l: number = levels.length; i < l; i++) {
            if (distance < levels[i].distance) {
                break;
            }
        }
        return levels[i - 1].object;
    }

    public raycast(raycaster: Raycaster, intersects: Array<Intersection> = []): Array<Intersection> {
        const matrixPosition: Vector3 = new Vector3().setFromMatrixPosition(this.matrixWorld);
        const distance: number = raycaster.ray.origin.distanceTo(matrixPosition);
        this.getObjectForDistance(distance).raycast(raycaster, intersects);
        return intersects;
    }

    public update(camera: Camera): this {
        const levels: Array<LODLevel> = this.levels;
        if (levels.length > 1) {
            const v1: Vector3 = new Vector3().setFromMatrixPosition(camera.matrixWorld);
            const v2: Vector3 = new Vector3().setFromMatrixPosition(this.matrixWorld);
            const distance: number = v1.distanceTo(v2);
            levels[0].object.visible = true;
            let i: number = 1, l: number = levels.length;
            for (; i < l; i++) {
                if (distance >= levels[i].distance) {
                    levels[i - 1].object.visible = false;
                    levels[i].object.visible = true;
                } else {
                    break;
                }
            }
            for (; i < l; i++) {
                levels[i].object.visible = false;
            }
        }
        return this;
    }

    public copy(source: LOD): this {
        super.copy(source);
        const levels: Array<LODLevel> = source.levels;
        for (let i: number = 0, l: number = levels.length; i < l; i++) {
            const level: LODLevel = levels[i];
            this.addLevel(level.object.clone(), level.distance);
        }
        return this;
    }

    public clone(): LOD {
        return (new (this.constructor as () => void)()).copy(this);
    }
}