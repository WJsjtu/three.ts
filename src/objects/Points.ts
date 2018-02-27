import { BufferAttribute, TypedArray } from "../core/BufferAttribute";
import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Object3D } from "../core/Object3D";
import { IIntersection, Raycaster } from "../core/Raycaster";
import { Material } from "../materials/Material";
import { PointsMaterial } from "../materials/PointsMaterial";
import { Matrix4 } from "../math/Matrix4";
import { Ray } from "../math/Ray";
import { Sphere } from "../math/Sphere";
import { Vector3 } from "../math/Vector3";

export class Points extends Object3D {
    public readonly type: string = "Points";

    public geometry: Geometry | BufferGeometry;
    public material: Material;

    constructor(
        geometry: Geometry | BufferGeometry = new BufferGeometry(),
        material: Material = new PointsMaterial({
            color: Math.random() * 0xffffff,
        }),
    ) {
        super();
        this.geometry = geometry;
        this.material = material;
    }

    public raycast(raycaster: Raycaster, intersects: IIntersection[]): void {
        const geometry: Geometry | BufferGeometry = this.geometry;
        const matrixWorld: Matrix4 = this.matrixWorld;
        const threshold: number = raycaster.params.Points.threshold;

        // Checking boundingSphere distance to ray

        if (geometry.boundingSphere === null) geometry.computeBoundingSphere();

        const sphere: Sphere = new Sphere().copy(geometry.boundingSphere);
        sphere.applyMatrix4(matrixWorld);
        sphere.radius += threshold;

        if (raycaster.ray.intersectsSphere(sphere) === false) return;
        const inverseMatrix: Matrix4 = new Matrix4().getInverse(matrixWorld);
        const ray: Ray = new Ray()
            .copy(raycaster.ray)
            .applyMatrix4(inverseMatrix);

        const testPoint = (point: Vector3, index2: number): void => {
            const localThreshold: number =
                threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
            const localThresholdSquare: number =
                localThreshold * localThreshold;
            const rayPointDistanceSquare: number = ray.distanceSquaredToPoint(
                point,
            );
            if (rayPointDistanceSquare < localThresholdSquare) {
                const intersectPoint = ray.closestPointToPoint(point);
                intersectPoint.applyMatrix4(matrixWorld);
                const distance = raycaster.ray.origin.distanceTo(
                    intersectPoint,
                );
                if (distance < raycaster.near || distance > raycaster.far) {
                    return;
                }
                intersects.push({
                    distance: distance,
                    distanceToRay: Math.sqrt(rayPointDistanceSquare),
                    face: null,
                    index: index2,
                    object: this,
                    point: intersectPoint.clone(),
                });
            }
        };

        if (geometry instanceof BufferGeometry) {
            const position: Vector3 = new Vector3();
            const index: BufferAttribute = geometry.index;
            const positions: TypedArray = geometry.attributes.position.array;
            if (index !== null) {
                const indices: TypedArray = index.array;
                for (
                    let i: number = 0, il: number = indices.length;
                    i < il;
                    i++
                ) {
                    const a: number = indices[i];
                    position.fromArray(positions, a * 3);
                    testPoint(position, a);
                }
            } else {
                for (
                    let i: number = 0, l: number = positions.length / 3;
                    i < l;
                    i++
                ) {
                    position.fromArray(positions, i * 3);
                    testPoint(position, i);
                }
            }
        } else if (geometry instanceof Geometry) {
            const vertices: Vector3[] = geometry.vertices;
            for (let i: number = 0, l: number = vertices.length; i < l; i++) {
                testPoint(vertices[i], i);
            }
        }
    }

    public clone(): Points {
        return new (this.constructor as new (
            geometry: BufferGeometry | Geometry,
            material: Material | Material[],
        ) => Points)(this.geometry, this.material).copy(this);
    }
}
