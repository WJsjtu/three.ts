import {Object3D} from "../core/Object3D";
import {Matrix4} from "./Matrix4";
import {Plane} from "./Plane";
import {Sphere} from "./Sphere";
import {Vector3} from "./Vector3";

export class Box3 {
    public min: Vector3 = new Vector3(+Infinity, +Infinity, +Infinity);
    public max: Vector3 = new Vector3(-Infinity, -Infinity, -Infinity);

    constructor(
        min: Vector3 = new Vector3(+Infinity, +Infinity, +Infinity),
        max: Vector3 = new Vector3(-Infinity, -Infinity, -Infinity),
    ) {
        this.max = max;
        this.min = min;
    }

    public set(min: Vector3, max: Vector3): this {
        this.min.copy(min);
        this.max.copy(max);
        return this;
    }

    public setFromArray(array: number[]): this {
        let minX: number = +Infinity,
            minY: number = +Infinity,
            minZ: number = +Infinity;
        let maxX: number = -Infinity,
            maxY: number = -Infinity,
            maxZ: number = -Infinity;
        for (let i: number = 0, l: number = array.length; i < l; i += 3) {
            const x: number = array[i],
                y: number = array[i + 1],
                z: number = array[i + 2];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (z < minZ) minZ = z;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
            if (z > maxZ) maxZ = z;
        }
        this.min.set(minX, minY, minZ);
        this.max.set(maxX, maxY, maxZ);
        return this;
    }

    public setFromPoints(points: Vector3[]): this {
        this.makeEmpty();
        for (let i: number = 0, il: number = points.length; i < il; i++) {
            this.expandByPoint(points[i]);
        }
        return this;
    }

    public setFromCenterAndSize(center: Vector3, size: Vector3): this {
        const halfSize: Vector3 = new Vector3().copy(size).multiplyScalar(0.5);
        this.min.copy(center).sub(halfSize);
        this.max.copy(center).add(halfSize);
        return this;
    }

    public setFromObject(object: Object3D): this {
        this.makeEmpty();
        return this.expandByObject(object);
    }

    public clone(): Box3 {
        return (new (this.constructor as () => void)() as Box3).copy(this);
    }

    public copy(box: Box3): this {
        this.min.copy(box.min);
        this.max.copy(box.max);
        return this;
    }

    public makeEmpty(): this {
        this.min.x = this.min.y = this.min.z = +Infinity;
        this.max.x = this.max.y = this.max.z = -Infinity;
        return this;
    }

    /**
     * this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
     * @returns {boolean}
     */
    public isEmpty(): boolean {
        return (
            this.max.x < this.min.x ||
            this.max.y < this.min.y ||
            this.max.z < this.min.z
        );
    }

    public getCenter(): Vector3 {
        const result: Vector3 = new Vector3();
        return this.isEmpty()
            ? result.set(0, 0, 0)
            : result
                  .copy(this.min)
                  .add(this.max)
                  .multiplyScalar(0.5);
    }

    public getSize(): Vector3 {
        const result = new Vector3();
        return this.isEmpty()
            ? result.set(0, 0, 0)
            : result.copy(this.max).sub(this.min);
    }

    public expandByPoint(point: Vector3): this {
        this.min.min(point);
        this.max.max(point);
        return this;
    }

    public expandByVector(vector: Vector3): this {
        this.min.sub(vector);
        this.max.add(vector);
        return this;
    }

    public expandByScalar(scalar: number): this {
        this.min.addScalar(-scalar);
        this.max.addScalar(scalar);
        return this;
    }

    /**
     * TODO expandByObject
     * @param object
     * @returns {Box3}
     */
    public expandByObject(object: Object3D): this {
        return this;
    }

    public containsPoint(point: Vector3): boolean {
        return !(
            point.x < this.min.x ||
            point.x > this.max.x ||
            point.y < this.min.y ||
            point.y > this.max.y ||
            point.z < this.min.z ||
            point.z > this.max.z
        );
    }

    public containsBox(box: Box3): boolean {
        return (
            this.min.x <= box.min.x &&
            box.max.x <= this.max.x &&
            this.min.y <= box.min.y &&
            box.max.y <= this.max.y &&
            this.min.z <= box.min.z &&
            box.max.z <= this.max.z
        );
    }

    /**
     * This can potentially have a divide by zero if the box has a size dimension of 0.
     * @param point
     * @returns {Vector3}
     */
    public getParameter(point: Vector3): Vector3 {
        const result: Vector3 = new Vector3();
        return result.set(
            (point.x - this.min.x) / (this.max.x - this.min.x),
            (point.y - this.min.y) / (this.max.y - this.min.y),
            (point.z - this.min.z) / (this.max.z - this.min.z),
        );
    }

    /**
     * using 6 splitting planes to rule out intersections
     * @param box
     * @returns {boolean}
     */
    public intersectsBox(box: Box3): boolean {
        return !(
            box.max.x < this.min.x ||
            box.min.x > this.max.x ||
            box.max.y < this.min.y ||
            box.min.y > this.max.y ||
            box.max.z < this.min.z ||
            box.min.z > this.max.z
        );
    }

    /**
     * Find the point on the AABB closest to the sphere center.
     * If that point is inside the sphere, the AABB and sphere intersect.
     * @param sphere
     * @returns {boolean}
     */
    public intersectsSphere(sphere: Sphere): boolean {
        const closestPoint: Vector3 = this.clampPoint(sphere.center);
        return (
            closestPoint.distanceToSquared(sphere.center) <=
            sphere.radius * sphere.radius
        );
    }

    /**
     * We compute the minimum and maximum dot product values. If those values
     * are on the same side (back or front) of the plane, then there is no intersection.
     * @param plane
     * @returns {boolean}
     */
    public intersectsPlane(plane: Plane): boolean {
        let min: number, max: number;
        if (plane.normal.x > 0) {
            min = plane.normal.x * this.min.x;
            max = plane.normal.x * this.max.x;
        } else {
            min = plane.normal.x * this.max.x;
            max = plane.normal.x * this.min.x;
        }
        if (plane.normal.y > 0) {
            min += plane.normal.y * this.min.y;
            max += plane.normal.y * this.max.y;
        } else {
            min += plane.normal.y * this.max.y;
            max += plane.normal.y * this.min.y;
        }
        if (plane.normal.z > 0) {
            min += plane.normal.z * this.min.z;
            max += plane.normal.z * this.max.z;
        } else {
            min += plane.normal.z * this.max.z;
            max += plane.normal.z * this.min.z;
        }
        return min <= plane.constant && max >= plane.constant;
    }

    public clampPoint(point: Vector3): Vector3 {
        return new Vector3().copy(point).clamp(this.min, this.max);
    }

    public distanceToPoint(point: Vector3): number {
        const clampedPoint: Vector3 = new Vector3()
            .copy(point)
            .clamp(this.min, this.max);
        return clampedPoint.sub(point).length();
    }

    public getBoundingSphere(): Sphere {
        const result: Sphere = new Sphere();
        result.center = this.getCenter();
        result.radius = this.getSize().length() * 0.5;
        return result;
    }

    public intersect(box: Box3): this {
        this.min.max(box.min);
        this.max.min(box.max);
        // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
        if (this.isEmpty()) this.makeEmpty();
        return this;
    }

    public union(box: Box3): this {
        this.min.min(box.min);
        this.max.max(box.max);
        return this;
    }

    public applyMatrix4(matrix: Matrix4): this {
        // transform of empty box is an empty box.
        if (this.isEmpty()) return this;
        const points: Vector3[] = [
            new Vector3(),
            new Vector3(),
            new Vector3(),
            new Vector3(),
            new Vector3(),
            new Vector3(),
            new Vector3(),
            new Vector3(),
        ];
        // NOTE: I am using a binary pattern to specify all 2^3 combinations below
        points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix); // 000
        points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix); // 001
        points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix); // 010
        points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix); // 011
        points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix); // 100
        points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix); // 101
        points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix); // 110
        points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix); // 111
        this.setFromPoints(points);
        return this;
    }

    public translate(offset: Vector3): this {
        this.min.add(offset);
        this.max.add(offset);
        return this;
    }

    public equals(box: Box3): boolean {
        return box.min.equals(this.min) && box.max.equals(this.max);
    }
}
