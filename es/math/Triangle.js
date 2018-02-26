import { Line3 } from "./Line3";
import { Plane } from "./Plane";
import { Vector3 } from "./Vector3";
export class Triangle {
    constructor(a = new Vector3(), b = new Vector3(), c = new Vector3()) {
        this.a = new Vector3();
        this.b = new Vector3();
        this.c = new Vector3();
        this.a = a;
        this.b = b;
        this.c = c;
    }
    set(a, b, c) {
        this.a.copy(a);
        this.b.copy(b);
        this.c.copy(c);
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(triangle) {
        this.a.copy(triangle.a);
        this.b.copy(triangle.b);
        this.c.copy(triangle.c);
        return this;
    }
    area() {
        const v0 = new Vector3().copy(this.c).sub(this.b);
        const v1 = new Vector3().copy(this.a).sub(this.b);
        return v0.cross(v1).length() * 0.5;
    }
    midpoint() {
        return new Vector3()
            .copy(this.a)
            .add(this.b)
            .add(this.c)
            .multiplyScalar(1 / 3);
    }
    normal() {
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
    plane() {
        return new Plane().setFromCoplanarPoints(this.a, this.b, this.c);
    }
    /**
     * based on: http://www.blackpawn.com/texts/pointinpoly/default.html
     * @param point
     */
    barycoordFromPoint(point) {
        const v0 = new Vector3().copy(this.c).sub(this.a);
        const v1 = new Vector3().copy(this.b).sub(this.a);
        const v2 = new Vector3().copy(point).sub(this.a);
        const dot00 = v0.dot(v0);
        const dot01 = v0.dot(v1);
        const dot02 = v0.dot(v2);
        const dot11 = v1.dot(v1);
        const dot12 = v1.dot(v2);
        const denom = dot00 * dot11 - dot01 * dot01;
        // collinear or singular triangle
        if (denom === 0) {
            // arbitrary location outside of triangle?
            // not sure if this is the best idea, maybe should be returning undefined
            return new Vector3().set(-2, -1, -1);
        }
        const invDenom = 1 / denom;
        const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        const v = (dot00 * dot12 - dot01 * dot02) * invDenom;
        // barycentric coordinates must always sum to 1
        return new Vector3().set(1 - u - v, v, u);
    }
    containsPoint(point) {
        const result = this.barycoordFromPoint(point);
        return result.x >= 0 && result.y >= 0 && result.x + result.y <= 1;
    }
    closestPointToPoint(point) {
        // project the point onto the plane of the triangle
        const plane = new Plane().setFromCoplanarPoints(this.a, this.b, this.c);
        const projectedPoint = plane.projectPoint(point);
        // check if the projection lies within the triangle
        if (this.containsPoint(projectedPoint) === true) {
            // if so, this is the closest point
            return new Vector3().copy(projectedPoint);
        }
        else {
            const result = new Vector3();
            let minDistance = Infinity;
            // if not, the point falls outside the triangle. the result is the closest point to the triangle's edges or vertices
            const edgeList = [
                new Line3(this.a, this.b),
                new Line3(this.b, this.c),
                new Line3(this.c, this.a),
            ];
            for (let i = 0; i < edgeList.length; i++) {
                const closestPoint = edgeList[i].closestPointToPoint(projectedPoint, true);
                const distance = projectedPoint.distanceToSquared(closestPoint);
                if (distance < minDistance) {
                    minDistance = distance;
                    result.copy(closestPoint);
                }
            }
            return result;
        }
    }
    equals(triangle) {
        return (triangle.a.equals(this.a) &&
            triangle.b.equals(this.b) &&
            triangle.c.equals(this.c));
    }
}
