import { Line3 } from "./Line3";
import { Plane } from "./Plane";
import { Vector3 } from "./Vector3";

export class Triangle {
    public a: Vector3 = new Vector3();
    public b: Vector3 = new Vector3();
    public c: Vector3 = new Vector3();

    constructor(
        a: Vector3 = new Vector3(),
        b: Vector3 = new Vector3(),
        c: Vector3 = new Vector3(),
    ) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public set(a: Vector3, b: Vector3, c: Vector3): this {
        this.a.copy(a);
        this.b.copy(b);
        this.c.copy(c);
        return this;
    }

    public clone(): Triangle {
        return new (this.constructor as new () => Triangle)().copy(this);
    }

    public copy(triangle: Triangle): this {
        this.a.copy(triangle.a);
        this.b.copy(triangle.b);
        this.c.copy(triangle.c);
        return this;
    }

    public area(): number {
        const v0: Vector3 = new Vector3().copy(this.c).sub(this.b);
        const v1: Vector3 = new Vector3().copy(this.a).sub(this.b);
        return v0.cross(v1).length() * 0.5;
    }

    public midpoint(): Vector3 {
        return new Vector3()
            .copy(this.a)
            .add(this.b)
            .add(this.c)
            .multiplyScalar(1 / 3);
    }

    public normal(): Vector3 {
        const vec = new Vector3().copy(this.a).sub(this.b);
        const result = new Vector3()
            .copy(this.c)
            .sub(this.b)
            .cross(vec);
        const resultLengthSquared = result.lengthSquared();
        if (resultLengthSquared > 0) {
            return result.multiplyScalar(1 / Math.sqrt(resultLengthSquared));
        }
        return result.set(0, 0, 0);
    }

    public plane(): Plane {
        return new Plane().setFromCoplanarPoints(this.a, this.b, this.c);
    }

    /**
     * based on: http://www.blackpawn.com/texts/pointinpoly/default.html
     * @param point
     */
    public barycoordFromPoint(point: Vector3): Vector3 {
        const v0: Vector3 = new Vector3().copy(this.c).sub(this.a);
        const v1: Vector3 = new Vector3().copy(this.b).sub(this.a);
        const v2: Vector3 = new Vector3().copy(point).sub(this.a);

        const dot00: number = v0.dot(v0);
        const dot01: number = v0.dot(v1);
        const dot02: number = v0.dot(v2);
        const dot11: number = v1.dot(v1);
        const dot12: number = v1.dot(v2);

        const denom: number = dot00 * dot11 - dot01 * dot01;

        // collinear or singular triangle
        if (denom === 0) {
            // arbitrary location outside of triangle?
            // not sure if this is the best idea, maybe should be returning undefined
            return new Vector3().set(-2, -1, -1);
        }

        const invDenom: number = 1 / denom;
        const u: number = (dot11 * dot02 - dot01 * dot12) * invDenom;
        const v: number = (dot00 * dot12 - dot01 * dot02) * invDenom;

        // barycentric coordinates must always sum to 1
        return new Vector3().set(1 - u - v, v, u);
    }

    public containsPoint(point: Vector3): boolean {
        const result: Vector3 = this.barycoordFromPoint(point);
        return result.x >= 0 && result.y >= 0 && result.x + result.y <= 1;
    }

    public closestPointToPoint(point: Vector3): Vector3 {
        // project the point onto the plane of the triangle
        const plane: Plane = new Plane().setFromCoplanarPoints(
            this.a,
            this.b,
            this.c,
        );
        const projectedPoint: Vector3 = plane.projectPoint(point);

        // check if the projection lies within the triangle
        if (this.containsPoint(projectedPoint) === true) {
            // if so, this is the closest point
            return new Vector3().copy(projectedPoint);
        } else {
            const result: Vector3 = new Vector3();
            let minDistance: number = Infinity;

            // if not, the point falls outside the triangle. the result is the closest point to the triangle's edges or vertices
            const edgeList: Line3[] = [
                new Line3(this.a, this.b),
                new Line3(this.b, this.c),
                new Line3(this.c, this.a),
            ];

            for (let i: number = 0; i < edgeList.length; i++) {
                const closestPoint: Vector3 = edgeList[i].closestPointToPoint(
                    projectedPoint,
                    true,
                );
                const distance: number = projectedPoint.distanceToSquared(
                    closestPoint,
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    result.copy(closestPoint);
                }
            }
            return result;
        }
    }

    public equals(triangle: Triangle): boolean {
        return (
            triangle.a.equals(this.a) &&
            triangle.b.equals(this.b) &&
            triangle.c.equals(this.c)
        );
    }
}
