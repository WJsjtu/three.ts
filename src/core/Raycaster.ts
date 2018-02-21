import {Vector3} from "../math/Vector3";
import {Object3D} from "./Object3D";
import {Ray} from "../math/Ray";
import {Camera} from "../cameras/Camera";
import {Vector2} from "../math/Vector2";
import {PerspectiveCamera} from "../cameras/PerspectiveCamera";
import {OrthographicCamera} from "../cameras/OrthographicCamera";
import {unprojectVector3onCamera} from "../utils";
import {Face3} from "./Face3";

export interface IIntersection {
    index?: number;
    face?: Face3;
    faceIndex?: number;
    uv?: Vector2;
    distance: number;
    point: Vector3;
    object: Object3D;
}

function intersectObject(object: Object3D, raycaster: Raycaster, intersects: Array<IIntersection>, recursive: boolean = false) {
    if (object.visible === false) return;
    object.raycast(raycaster, intersects);
    if (recursive === true) {
        const children: Array<Object3D> = object.children;
        for (let i: number = 0, l: number = children.length; i < l; i++) {
            intersectObject(children[i], raycaster, intersects, true);
        }
    }
}

export class Raycaster {

    public params: any = {
        Mesh: {},
        Line: {},
        LOD: {},
        Points: {threshold: 1},
        Sprite: {}
    };

    public near: number = 0;
    public far: number = Infinity;
    public ray: Ray = null;
    public linePrecision: number = 1;

    constructor(origin: Vector3, direction: Vector3, near: number = 0, far: number = Infinity) {
        this.ray = new Ray(origin, direction);
        this.near = near;
        this.far = far
    }

    public set(origin: Vector3, direction: Vector3): this {
        this.ray.set(origin, direction);
        return this;
    }

    public setFromCamera(coords: Vector2, camera: Camera): this {
        if (camera && camera instanceof PerspectiveCamera) {
            this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
            this.ray.direction.set(coords.x, coords.y, 0.5);
            unprojectVector3onCamera(this.ray.direction, camera);
            this.ray.direction.sub(this.ray.origin).normalize();
        } else if (camera && camera instanceof OrthographicCamera) {
            this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far));
            unprojectVector3onCamera(this.ray.origin, camera); // set origin in plane of camera
            this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld);
        } else {
            console.error(`THREE.Raycaster: Unsupported camera type.`);
        }
        return this;
    }

    public intersectObject(object: Object3D, recursive: boolean = false): Array<IIntersection> {
        const intersects: Array<IIntersection> = [];
        intersectObject(object, this, intersects, recursive);
        intersects.sort((a: IIntersection, b: IIntersection) => a.distance - b.distance);
        return intersects;
    }

    public intersectObjects(objects: Array<Object3D>, recursive: boolean = false): Array<IIntersection> {
        const intersects: Array<IIntersection> = [];
        for (let i: number = 0, l: number = objects.length; i < l; i++) {
            intersectObject(objects[i], this, intersects, recursive);
        }
        intersects.sort((a: IIntersection, b: IIntersection) => a.distance - b.distance);
        return intersects;
    }
}