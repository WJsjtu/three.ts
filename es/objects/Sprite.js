import { Object3D } from "../core/Object3D";
import { SpriteMaterial } from "../materials/Materials";
import { Vector3 } from "../math/Vector3";
export class Sprite extends Object3D {
    constructor(material = new SpriteMaterial()) {
        super();
        this.type = "Sprite";
        this.material = null;
        this.material = material;
    }
    raycast(raycaster, intersects = []) {
        const worldPosition = new Vector3().setFromMatrixPosition(this.matrixWorld);
        const intersectPoint = raycaster.ray.closestPointToPoint(worldPosition);
        const worldScale = new Vector3().setFromMatrixScale(this.matrixWorld);
        const guessSizeSq = worldScale.x * worldScale.y / 4;
        if (worldPosition.distanceToSquared(intersectPoint) > guessSizeSq) {
            return null;
        }
        const distance = raycaster.ray.origin.distanceTo(intersectPoint);
        if (distance < raycaster.near || distance > raycaster.far) {
            return null;
        }
        intersects.push({
            distance: distance,
            point: intersectPoint.clone(),
            object: this,
        });
        return intersects;
    }
    clone() {
        return new this.constructor(this.material).copy(this);
    }
}
