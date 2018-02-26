import { Object3D } from "../core/Object3D";
import { Material } from "../materials/Material";
import { SpriteMaterial } from "../materials/Materials";
import { Vector3 } from "../math/Vector3";
import { Raycaster, IIntersection } from "../core/Raycaster";

export class Sprite extends Object3D {
    public readonly type: string = "Sprite";

    public material: Material = null;

    constructor(material: Material = new SpriteMaterial()) {
        super();
        this.material = material;
    }

    public raycast(
        raycaster: Raycaster,
        intersects: IIntersection[] = [],
    ): IIntersection[] {
        const worldPosition: Vector3 = new Vector3().setFromMatrixPosition(
            this.matrixWorld,
        );
        const intersectPoint: Vector3 = raycaster.ray.closestPointToPoint(
            worldPosition,
        );
        const worldScale: Vector3 = new Vector3().setFromMatrixScale(
            this.matrixWorld,
        );
        const guessSizeSq: number = worldScale.x * worldScale.y / 4;
        if (worldPosition.distanceToSquared(intersectPoint) > guessSizeSq) {
            return null;
        }
        const distance: number = raycaster.ray.origin.distanceTo(
            intersectPoint,
        );
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

    public clone(): Sprite {
        return new (this.constructor as new (material: Material) => Sprite)(
            this.material,
        ).copy(this);
    }
}
