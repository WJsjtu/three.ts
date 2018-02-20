import {Vector3} from "../math/Vector3";
import {Object3D} from "./Object3D";

export interface Intersection {
    distance: number,
    point: Vector3,
    object: Object3D
}

export class Raycaster {

}