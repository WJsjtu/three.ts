import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Object3D } from "../core/Object3D";
import { LineBasicMaterial } from "../materials/LineBasicMaterial";
import { Matrix4 } from "../math/Matrix4";
import { Ray } from "../math/Ray";
import { Sphere } from "../math/Sphere";
import { Vector3 } from "../math/Vector3";
import { LineSegments } from "./LineSegments";
export class Line extends Object3D {
    constructor(geometry = new BufferGeometry(), material = new LineBasicMaterial({
            color: Math.random() * 0xffffff,
        })) {
        super();
        this.type = "Line";
        this.geometry = null;
        this.material = null;
        this.geometry = geometry;
        this.material = material;
    }
    raycast(raycaster, intersects = []) {
        const precision = raycaster.linePrecision;
        const precisionSquared = precision * precision;
        const geometry = this.geometry;
        const matrixWorld = this.matrixWorld;
        // Checking boundingSphere distance to ray
        if (geometry.boundingSphere === null)
            geometry.computeBoundingSphere();
        const sphere = new Sphere().copy(geometry.boundingSphere);
        sphere.applyMatrix4(matrixWorld);
        if (raycaster.ray.intersectsSphere(sphere) === false)
            return null;
        const inverseMatrix = new Matrix4().getInverse(matrixWorld);
        const ray = new Ray();
        ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
        const vStart = new Vector3();
        const vEnd = new Vector3();
        const interSegment = new Vector3();
        const interRay = new Vector3();
        const step = this instanceof LineSegments ? 2 : 1;
        if (geometry instanceof BufferGeometry) {
            const index = geometry.index;
            const attributes = geometry.attributes;
            const positions = attributes.position.array;
            if (index !== null) {
                const indices = index.array;
                for (let i = 0, l = indices.length - 1; i < l; i += step) {
                    const a = indices[i];
                    const b = indices[i + 1];
                    vStart.fromArray(positions, a * 3);
                    vEnd.fromArray(positions, b * 3);
                    const distSquared = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);
                    if (distSquared > precisionSquared)
                        continue;
                    interRay.applyMatrix4(this.matrixWorld); // Move back to world space for distance calculation
                    const distance = raycaster.ray.origin.distanceTo(interRay);
                    if (distance < raycaster.near || distance > raycaster.far) {
                        continue;
                    }
                    intersects.push({
                        distance: distance,
                        index: i,
                        object: this,
                        // What do we want? intersection point on the ray or on the segment??
                        // point: raycaster.ray.at( distance ),
                        point: interSegment
                            .clone()
                            .applyMatrix4(this.matrixWorld),
                    });
                }
            }
            else {
                for (let i = 0, l = positions.length / 3 - 1; i < l; i += step) {
                    vStart.fromArray(positions, 3 * i);
                    vEnd.fromArray(positions, 3 * i + 3);
                    const distSquared = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);
                    if (distSquared > precisionSquared)
                        continue;
                    interRay.applyMatrix4(this.matrixWorld); // Move back to world space for distance calculation
                    const distance = raycaster.ray.origin.distanceTo(interRay);
                    if (distance < raycaster.near || distance > raycaster.far) {
                        continue;
                    }
                    intersects.push({
                        distance: distance,
                        index: i,
                        object: this,
                        // What do we want? intersection point on the ray or on the segment??
                        // point: raycaster.ray.at( distance ),
                        point: interSegment
                            .clone()
                            .applyMatrix4(this.matrixWorld),
                    });
                }
            }
        }
        else if (geometry instanceof Geometry) {
            const vertices = geometry.vertices;
            const nbVertices = vertices.length;
            for (let i = 0; i < nbVertices - 1; i += step) {
                const distSquared = ray.distanceSqToSegment(vertices[i], vertices[i + 1], interRay, interSegment);
                if (distSquared > precisionSquared)
                    continue;
                interRay.applyMatrix4(this.matrixWorld); // Move back to world space for distance calculation
                const distance = raycaster.ray.origin.distanceTo(interRay);
                if (distance < raycaster.near || distance > raycaster.far) {
                    continue;
                }
                intersects.push({
                    distance: distance,
                    index: i,
                    object: this,
                    // What do we want? intersection point on the ray or on the segment??
                    // point: raycaster.ray.at( distance ),
                    point: interSegment.clone().applyMatrix4(this.matrixWorld),
                });
            }
        }
        return intersects;
    }
    clone() {
        return new this.constructor(this.geometry, this.material).copy(this);
    }
}
