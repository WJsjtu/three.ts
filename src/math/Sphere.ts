import {Vector3} from "./Vector3";
import {Plane} from "./Plane";
import {Box3} from "./Box3";
import {Matrix4} from "./Matrix4";

export class Sphere {

    public center: Vector3 = new Vector3();
    public radius: number = 0;

    constructor(center: Vector3 = new Vector3(), radius: number = 0) {
        this.center = center;
        this.radius = radius;
    }

    public set(center: Vector3, radius: number): this {
        this.center.copy(center);
        this.radius = radius;
        return this;
    }

    public setFromPoints(points: Array<Vector3>, optionalCenter?: Vector3): this {
        if (optionalCenter !== undefined) {
            this.center.copy(optionalCenter);
        } else {
            this.center = new Box3().setFromPoints(points).getCenter();
        }
        let maxRadiusSq: number = 0;
        for (let i: number = 0, il: number = points.length; i < il; i++) {
            maxRadiusSq = Math.max(maxRadiusSq, this.center.distanceToSquared(points[i]));
        }
        this.radius = Math.sqrt(maxRadiusSq);
        return this;
    }

    public clone(): Sphere {
        return (new (this.constructor as () => void)() as Sphere).copy(this);
    }

    public copy(sphere: Sphere): this {
        this.center.copy(sphere.center);
        this.radius = sphere.radius;
        return this;
    }

    public empty(): boolean {
        return this.radius <= 0;
    }

    public containsPoint(point: Vector3): boolean {
        return point.distanceToSquared(this.center) <= this.radius * this.radius;
    }

    public distanceToPoint(point: Vector3): number {
        return point.distanceTo(this.center) - this.radius;
    }

    public intersectsSphere(sphere: Sphere): boolean {
        const radiusSum: number = this.radius + sphere.radius;
        return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
    }

    public intersectsBox(box: Box3): boolean {
        return box.intersectsSphere(this);
    }

    public intersectsPlane(plane: Plane): boolean {
        return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
    }

    public clampPoint(point: Vector3): Vector3 {
        const deltaLengthSquared: number = this.center.distanceToSquared(point);
        const result: Vector3 = new Vector3().copy(point);
        if (deltaLengthSquared > this.radius * this.radius) {
            result.sub(this.center).normalize();
            result.multiplyScalar(this.radius).add(this.center);
        }
        return result;
    }

    public getBoundingBox(): Box3 {
        return new Box3().set(this.center, this.center).expandByScalar(this.radius);
    }

    public applyMatrix4(matrix: Matrix4) {
        this.center.applyMatrix4(matrix);
        this.radius = this.radius * matrix.getMaxScaleOnAxis();
        return this;
    }

    public translate(offset: Vector3): this {
        this.center.add(offset);
        return this;
    }

    public equals(sphere: Sphere): boolean {
        return sphere.center.equals(this.center) && sphere.radius === this.radius;
    }

}