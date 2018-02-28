import { BufferAttribute, TypedArray } from "../core/BufferAttribute";
import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Object3D } from "../core/Object3D";
import { IIntersection, Raycaster } from "../core/Raycaster";
import { LineBasicMaterial } from "../materials/LineBasicMaterial";
import { Matrix4 } from "../math/Matrix4";
import { Ray } from "../math/Ray";
import { Sphere } from "../math/Sphere";
import { Vector3 } from "../math/Vector3";
import { LineSegments } from "./LineSegments";

export class Line extends Object3D {
    public readonly type: string = "Line";
    public geometry: BufferGeometry | Geometry;
    public material: LineBasicMaterial;

    constructor(
        geometry: BufferGeometry | Geometry = new BufferGeometry(),
        material: LineBasicMaterial = new LineBasicMaterial({
            color: Math.random() * 0xffffff,
        }),
    ) {
        super();
        this.geometry = geometry;
        this.material = material;
    }

    public raycast(raycaster: Raycaster, intersects: IIntersection[]): void {
        const precision: number = raycaster.linePrecision;
        const precisionSquared: number = precision * precision;

        const geometry: BufferGeometry | Geometry = this.geometry;
        const matrixWorld: Matrix4 = this.matrixWorld;

        // Checking boundingSphere distance to ray
        if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
        const sphere: Sphere = new Sphere().copy(geometry.boundingSphere);
        sphere.applyMatrix4(matrixWorld);
        if (raycaster.ray.intersectsSphere(sphere) === false) return;
        const inverseMatrix: Matrix4 = new Matrix4().getInverse(matrixWorld);
        const ray: Ray = new Ray();
        ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);

        const vStart: Vector3 = new Vector3();
        const vEnd: Vector3 = new Vector3();
        const interSegment: Vector3 = new Vector3();
        const interRay: Vector3 = new Vector3();
        const step: number = this instanceof LineSegments ? 2 : 1;

        if (geometry instanceof BufferGeometry) {
            const index: BufferAttribute = geometry.index;
            const attributes: { [key: string]: BufferAttribute } = geometry.attributes;
            const positions: TypedArray = attributes.position.array;
            if (index !== null) {
                const indices: TypedArray = index.array;
                for (let i: number = 0, l: number = indices.length - 1; i < l; i += step) {
                    const a: number = indices[i];
                    const b: number = indices[i + 1];
                    vStart.fromArray(positions, a * 3);
                    vEnd.fromArray(positions, b * 3);
                    const distSquared: number = ray.distanceSquareToSegment(vStart, vEnd, interRay, interSegment);
                    if (distSquared > precisionSquared) continue;
                    interRay.applyMatrix4(this.matrixWorld); // Move back to world space for distance calculation
                    const distance: number = raycaster.ray.origin.distanceTo(interRay);
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
            } else {
                for (let i: number = 0, l = positions.length / 3 - 1; i < l; i += step) {
                    vStart.fromArray(positions, 3 * i);
                    vEnd.fromArray(positions, 3 * i + 3);
                    const distSquared: number = ray.distanceSquareToSegment(vStart, vEnd, interRay, interSegment);
                    if (distSquared > precisionSquared) continue;
                    interRay.applyMatrix4(this.matrixWorld); // Move back to world space for distance calculation
                    const distance: number = raycaster.ray.origin.distanceTo(interRay);
                    if (distance < raycaster.near || distance > raycaster.far) {
                        continue;
                    }
                    intersects.push({
                        distance: distance,
                        face: null,
                        faceIndex: null,
                        index: i,
                        object: this,
                        // What do we want? intersection point on the ray or on the segment??
                        // point: raycaster.ray.at( distance ),
                        point: interSegment.clone().applyMatrix4(this.matrixWorld),
                    });
                }
            }
        } else if (geometry instanceof Geometry) {
            const vertices: Vector3[] = geometry.vertices;
            const nbVertices: number = vertices.length;
            for (let i: number = 0; i < nbVertices - 1; i += step) {
                const distSquared: number = ray.distanceSquareToSegment(
                    vertices[i],
                    vertices[i + 1],
                    interRay,
                    interSegment,
                );
                if (distSquared > precisionSquared) continue;
                interRay.applyMatrix4(this.matrixWorld); // Move back to world space for distance calculation
                const distance: number = raycaster.ray.origin.distanceTo(interRay);
                if (distance < raycaster.near || distance > raycaster.far) {
                    continue;
                }
                intersects.push({
                    distance: distance,
                    face: null,
                    faceIndex: null,
                    index: i,
                    object: this,
                    // What do we want? intersection point on the ray or on the segment??
                    // point: raycaster.ray.at( distance ),
                    point: interSegment.clone().applyMatrix4(this.matrixWorld),
                });
            }
        }
    }

    public clone(): Line {
        return new (this.constructor as new (geometry: BufferGeometry | Geometry, material: LineBasicMaterial) => Line)(
            this.geometry,
            this.material,
        ).copy(this);
    }
}
