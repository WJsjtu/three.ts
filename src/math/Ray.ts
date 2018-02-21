import {Vector3} from "./Vector3";
import {Sphere} from "./Sphere";
import {Plane} from "./Plane";
import {Box3} from "./Box3";
import {Triangle} from "./Triangle";
import {Matrix4} from "./Matrix4";

export class Ray {
    public origin: Vector3 = new Vector3();
    public direction: Vector3 = new Vector3();

    constructor(
        origin: Vector3 = new Vector3(),
        direction: Vector3 = new Vector3(),
    ) {
        this.origin = origin;
        this.direction = direction;
    }

    public set(origin: Vector3, direction: Vector3): this {
        this.origin.copy(origin);
        this.direction.copy(direction);
        return this;
    }

    public clone(): Ray {
        return (new (this.constructor as () => void)() as Ray).copy(this);
    }

    public copy(ray: Ray): this {
        this.origin.copy(ray.origin);
        this.direction.copy(ray.direction);
        return this;
    }

    public at(t: number): Vector3 {
        return new Vector3()
            .copy(this.direction)
            .multiplyScalar(t)
            .add(this.origin);
    }

    public lookAt(v: Vector3): this {
        this.direction
            .copy(v)
            .sub(this.origin)
            .normalize();
        return this;
    }

    public recast(t: number): this {
        this.origin.copy(this.at(t));
        return this;
    }

    public closestPointToPoint(point: Vector3): Vector3 {
        const result = new Vector3().copy(point).sub(this.origin);
        const directionDistance: number = result.dot(this.direction);
        if (directionDistance < 0) {
            return result.copy(this.origin);
        }
        return result
            .copy(this.direction)
            .multiplyScalar(directionDistance)
            .add(this.origin);
    }

    public distanceToPoint(point: Vector3): number {
        return Math.sqrt(this.distanceSquaredToPoint(point));
    }

    public distanceSquaredToPoint(point: Vector3): number {
        const directionDistance: number = new Vector3()
            .copy(point)
            .sub(this.origin)
            .dot(this.direction);
        // point behind the ray
        if (directionDistance < 0) {
            return this.origin.distanceToSquared(point);
        }
        return new Vector3()
            .copy(this.direction)
            .multiplyScalar(directionDistance)
            .add(this.origin)
            .distanceToSquared(point);
    }

    public distanceSqToSegment(
        v0: Vector3,
        v1: Vector3,
        optionalPointOnRay?: Vector3,
        optionalPointOnSegment?: Vector3,
    ): number {
        const segCenter: Vector3 = new Vector3();
        const segDir: Vector3 = new Vector3();
        const diff: Vector3 = new Vector3();
        // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
        // It returns the min distance between the ray and the segment
        // defined by v0 and v1
        // It can also set two optional targets :
        // - The closest point on the ray
        // - The closest point on the segment

        segCenter
            .copy(v0)
            .add(v1)
            .multiplyScalar(0.5);
        segDir
            .copy(v1)
            .sub(v0)
            .normalize();
        diff.copy(this.origin).sub(segCenter);

        const segExtent: number = v0.distanceTo(v1) * 0.5;
        const a01: number = -this.direction.dot(segDir);
        const b0: number = diff.dot(this.direction);
        const b1: number = -diff.dot(segDir);
        const c: number = diff.lengthSquared();
        const det: number = Math.abs(1 - a01 * a01);

        let s0: number, s1: number, sqrDist: number, extDet: number;
        if (det > 0) {
            // The ray and segment are not parallel.
            s0 = a01 * b1 - b0;
            s1 = a01 * b0 - b1;
            extDet = segExtent * det;
            if (s0 >= 0) {
                if (s1 >= -extDet) {
                    if (s1 <= extDet) {
                        // region 0
                        // Minimum at interior points of ray and segment.
                        const invDet: number = 1 / det;
                        s0 *= invDet;
                        s1 *= invDet;
                        sqrDist =
                            s0 * (s0 + a01 * s1 + 2 * b0) +
                            s1 * (a01 * s0 + s1 + 2 * b1) +
                            c;
                    } else {
                        // region 1
                        s1 = segExtent;
                        s0 = Math.max(0, -(a01 * s1 + b0));
                        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                    }
                } else {
                    // region 5
                    s1 = -segExtent;
                    s0 = Math.max(0, -(a01 * s1 + b0));
                    sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                }
            } else {
                if (s1 <= -extDet) {
                    // region 4
                    s0 = Math.max(0, -(-a01 * segExtent + b0));
                    s1 =
                        s0 > 0
                            ? -segExtent
                            : Math.min(Math.max(-segExtent, -b1), segExtent);
                    sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                } else if (s1 <= extDet) {
                    // region 3
                    s0 = 0;
                    s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
                    sqrDist = s1 * (s1 + 2 * b1) + c;
                } else {
                    // region 2
                    s0 = Math.max(0, -(a01 * segExtent + b0));
                    s1 =
                        s0 > 0
                            ? segExtent
                            : Math.min(Math.max(-segExtent, -b1), segExtent);
                    sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                }
            }
        } else {
            // Ray and segment are parallel.
            s1 = a01 > 0 ? -segExtent : segExtent;
            s0 = Math.max(0, -(a01 * s1 + b0));
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
        }
        if (optionalPointOnRay) {
            optionalPointOnRay
                .copy(this.direction)
                .multiplyScalar(s0)
                .add(this.origin);
        }
        if (optionalPointOnSegment) {
            optionalPointOnSegment
                .copy(segDir)
                .multiplyScalar(s1)
                .add(segCenter);
        }
        return sqrDist;
    }

    public intersectSphere(sphere: Sphere): Vector3 | null {
        const vec: Vector3 = new Vector3().copy(sphere.center).sub(this.origin);
        const tca: number = vec.dot(this.direction);
        const d2: number = vec.dot(vec) - tca * tca;
        const radius2: number = sphere.radius * sphere.radius;

        if (d2 > radius2) return null;

        const thc: number = Math.sqrt(radius2 - d2);

        // t0 = first intersect point - entrance on front of sphere
        const t0: number = tca - thc;

        // t1 = second intersect point - exit point on back of sphere
        const t1: number = tca + thc;

        // test to see if both t0 and t1 are behind the ray - if so, return null
        if (t0 < 0 && t1 < 0) return null;

        // test to see if t0 is behind the ray:
        // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
        // in order to always return an intersect point that is in front of the ray.
        if (t0 < 0) return this.at(t1);

        // else t0 is in front of the ray, so return the first collision point scaled by t0
        return this.at(t0);
    }

    public intersectsSphere(sphere: Sphere): boolean {
        return this.distanceToPoint(sphere.center) <= sphere.radius;
    }

    public distanceToPlane(plane: Plane): number {
        const denominator: number = plane.normal.dot(this.direction);
        if (denominator === 0) {
            // line is coplanar, return origin
            if (plane.distanceToPoint(this.origin) === 0) {
                return 0;
            }
            // Null is preferable to undefined since undefined means.... it is undefined
            return Infinity;
        }
        const t: number =
            -(this.origin.dot(plane.normal) + plane.constant) / denominator;
        // Return if the ray never intersects the plane
        return t >= 0 ? t : Infinity;
    }

    public intersectPlane(plane: Plane): Vector3 {
        const t: number = this.distanceToPlane(plane);
        if (!isFinite(t)) {
            return null;
        }
        return this.at(t);
    }

    public intersectsPlane(plane: Plane): boolean {
        // check if the ray lies on the plane first
        const distToPoint: number = plane.distanceToPoint(this.origin);
        if (distToPoint === 0) {
            return true;
        }
        const denominator: number = plane.normal.dot(this.direction);
        if (denominator * distToPoint < 0) {
            return true;
        }
        // ray origin is behind the plane (and is pointing behind it)
        return false;
    }

    public intersectBox(box: Box3): Vector3 {
        let tmin: number,
            tmax: number,
            tymin: number,
            tymax: number,
            tzmin: number,
            tzmax: number;
        const invdirx: number = 1 / this.direction.x,
            invdiry: number = 1 / this.direction.y,
            invdirz: number = 1 / this.direction.z;
        const origin: Vector3 = this.origin;
        if (invdirx >= 0) {
            tmin = (box.min.x - origin.x) * invdirx;
            tmax = (box.max.x - origin.x) * invdirx;
        } else {
            tmin = (box.max.x - origin.x) * invdirx;
            tmax = (box.min.x - origin.x) * invdirx;
        }
        if (invdiry >= 0) {
            tymin = (box.min.y - origin.y) * invdiry;
            tymax = (box.max.y - origin.y) * invdiry;
        } else {
            tymin = (box.max.y - origin.y) * invdiry;
            tymax = (box.min.y - origin.y) * invdiry;
        }
        if (tmin > tymax || tymin > tmax) return null;
        // These lines also handle the case where tmin or tmax is NaN
        // (result of 0 * Infinity). x !== x returns true if x is NaN
        if (tymin > tmin || tmin !== tmin) tmin = tymin;
        if (tymax < tmax || tmax !== tmax) tmax = tymax;
        if (invdirz >= 0) {
            tzmin = (box.min.z - origin.z) * invdirz;
            tzmax = (box.max.z - origin.z) * invdirz;
        } else {
            tzmin = (box.max.z - origin.z) * invdirz;
            tzmax = (box.min.z - origin.z) * invdirz;
        }
        if (tmin > tzmax || tzmin > tmax) return null;
        if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
        if (tzmax < tmax || tmax !== tmax) tmax = tzmax;
        //return point closest to the ray (positive side)
        if (tmax < 0) return null;
        return this.at(tmin >= 0 ? tmin : tmax);
    }

    public intersectsBox(box: Box3): boolean {
        return this.intersectBox(box) !== null;
    }

    public intersectTriangle(
        triangle: Triangle,
        backFaceCulling: boolean = false,
    ): Vector3 {
        // Compute the offset origin, edges, and normal.
        const a: Vector3 = triangle.a,
            b: Vector3 = triangle.b,
            c: Vector3 = triangle.c;
        const edge1: Vector3 = new Vector3().copy(b).sub(a);
        const edge2: Vector3 = new Vector3().copy(c).sub(a);
        const normal: Vector3 = new Vector3().copy(edge1).cross(edge2);
        // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
        // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
        //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
        //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
        //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
        let DdN: number = this.direction.dot(normal);
        let sign: number;
        if (DdN > 0) {
            if (backFaceCulling) return null;
            sign = 1;
        } else if (DdN < 0) {
            sign = -1;
            DdN = -DdN;
        } else {
            return null;
        }
        const diff: Vector3 = new Vector3().copy(this.origin).sub(a);
        const DdQxE2: number =
            sign * this.direction.dot(edge2.copy(diff).cross(edge2));
        // b1 < 0, no intersection
        if (DdQxE2 < 0) {
            return null;
        }
        const DdE1xQ: number = sign * this.direction.dot(edge1.cross(diff));
        // b2 < 0, no intersection
        if (DdE1xQ < 0) {
            return null;
        }
        // b1+b2 > 1, no intersection
        if (DdQxE2 + DdE1xQ > DdN) {
            return null;
        }
        // Line intersects triangle, check if ray does.
        const QdN: number = -sign * diff.dot(normal);
        // t < 0, no intersection
        if (QdN < 0) {
            return null;
        }
        // Ray intersects triangle.
        return this.at(QdN / DdN);
    }

    public intersectsTriangle(triangle: Triangle): boolean {
        return this.intersectTriangle(triangle) !== null;
    }

    public applyMatrix4(matrix4: Matrix4): this {
        this.origin.applyMatrix4(matrix4);
        this.direction.transformDirection(matrix4);
        return this;
    }

    public equals(ray: Ray): boolean {
        return (
            ray.origin.equals(this.origin) &&
            ray.direction.equals(this.direction)
        );
    }
}
