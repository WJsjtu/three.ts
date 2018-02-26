import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Object3D } from "../core/Object3D";
import { PointsMaterial } from "../materials/PointsMaterial";
import { Matrix4 } from "../math/Matrix4";
import { Ray } from "../math/Ray";
import { Sphere } from "../math/Sphere";
import { Vector3 } from "../math/Vector3";
export class Points extends Object3D {
    constructor(geometry = new BufferGeometry(), material = new PointsMaterial({
            color: Math.random() * 0xffffff,
        })) {
        super();
        this.type = "Points";
        this.geometry = null;
        this.material = null;
        this.geometry = geometry;
        this.material = material;
    }
    raycast(raycaster, intersects = []) {
        const geometry = this.geometry;
        const matrixWorld = this.matrixWorld;
        const threshold = raycaster.params.Points.threshold;
        // Checking boundingSphere distance to ray
        if (geometry.boundingSphere === null)
            geometry.computeBoundingSphere();
        const sphere = new Sphere().copy(geometry.boundingSphere);
        sphere.applyMatrix4(matrixWorld);
        sphere.radius += threshold;
        if (raycaster.ray.intersectsSphere(sphere) === false)
            return null;
        const inverseMatrix = new Matrix4().getInverse(matrixWorld);
        const ray = new Ray()
            .copy(raycaster.ray)
            .applyMatrix4(inverseMatrix);
        const testPoint = (point, index2) => {
            const localThreshold = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
            const localThresholdSquare = localThreshold * localThreshold;
            const rayPointDistanceSquare = ray.distanceSquaredToPoint(point);
            if (rayPointDistanceSquare < localThresholdSquare) {
                const intersectPoint = ray.closestPointToPoint(point);
                intersectPoint.applyMatrix4(matrixWorld);
                const distance = raycaster.ray.origin.distanceTo(intersectPoint);
                if (distance < raycaster.near || distance > raycaster.far) {
                    return;
                }
                intersects.push({
                    distance: distance,
                    distanceToRay: Math.sqrt(rayPointDistanceSquare),
                    index: index2,
                    object: this,
                    point: intersectPoint.clone(),
                });
            }
        };
        if (geometry instanceof BufferGeometry) {
            const position = new Vector3();
            const index = geometry.index;
            const positions = geometry.attributes.position.array;
            if (index !== null) {
                const indices = index.array;
                for (let i = 0, il = indices.length; i < il; i++) {
                    const a = indices[i];
                    position.fromArray(positions, a * 3);
                    testPoint(position, a);
                }
            }
            else {
                for (let i = 0, l = positions.length / 3; i < l; i++) {
                    position.fromArray(positions, i * 3);
                    testPoint(position, i);
                }
            }
        }
        else if (geometry instanceof Geometry) {
            const vertices = geometry.vertices;
            for (let i = 0, l = vertices.length; i < l; i++) {
                testPoint(vertices[i], i);
            }
        }
        return intersects;
    }
    clone() {
        return new this.constructor(this.geometry, this.material).copy(this);
    }
}
