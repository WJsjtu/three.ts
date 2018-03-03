import { OrthographicCamera } from "../cameras/OrthographicCamera";
import { PerspectiveCamera } from "../cameras/PerspectiveCamera";
import { Ray } from "../math/Ray";
import { unprojectVector3OnCamera } from "../utils";
function intersectObject(object, raycaster, intersects, recursive = false) {
    if (object.visible === false)
        return;
    object.raycast(raycaster, intersects);
    if (recursive === true) {
        const children = object.children;
        for (let i = 0, l = children.length; i < l; i++) {
            intersectObject(children[i], raycaster, intersects, true);
        }
    }
}
export class Raycaster {
    constructor(origin, direction, near = 0, far = Infinity) {
        this.params = {
            LOD: {},
            Line: {},
            Mesh: {},
            Points: { threshold: 1 },
            Sprite: {},
        };
        this.near = 0;
        this.far = Infinity;
        this.linePrecision = 1;
        this.ray = new Ray(origin, direction);
        this.near = near;
        this.far = far;
    }
    set(origin, direction) {
        this.ray.set(origin, direction);
        return this;
    }
    setFromCamera(coords, camera) {
        if (camera && camera instanceof PerspectiveCamera) {
            this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
            this.ray.direction.set(coords.x, coords.y, 0.5);
            unprojectVector3OnCamera(this.ray.direction, camera);
            this.ray.direction.sub(this.ray.origin).normalize();
        }
        else if (camera && camera instanceof OrthographicCamera) {
            this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far));
            unprojectVector3OnCamera(this.ray.origin, camera); // set origin in plane of camera
            this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld);
        }
        else {
            console.error(`THREE.Raycaster: Unsupported camera type.`);
        }
        return this;
    }
    intersectObject(object, recursive = false) {
        const intersects = [];
        intersectObject(object, this, intersects, recursive);
        intersects.sort((a, b) => a.distance - b.distance);
        return intersects;
    }
    intersectObjects(objects, recursive = false) {
        const intersects = [];
        for (let i = 0, l = objects.length; i < l; i++) {
            intersectObject(objects[i], this, intersects, recursive);
        }
        intersects.sort((a, b) => a.distance - b.distance);
        return intersects;
    }
}
