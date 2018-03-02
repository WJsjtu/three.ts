import { Box3 } from "./Box3";
import { Vector3 } from "./Vector3";
export class Sphere {
    constructor(center = new Vector3(), radius = 0) {
        this.center = new Vector3();
        this.radius = 0;
        this.center = center;
        this.radius = radius;
    }
    set(center, radius) {
        this.center.copy(center);
        this.radius = radius;
        return this;
    }
    setFromPoints(points, optionalCenter) {
        if (optionalCenter !== undefined) {
            this.center.copy(optionalCenter);
        }
        else {
            this.center = new Box3().setFromPoints(points).getCenter();
        }
        let maxRadiusSq = 0;
        for (let i = 0, il = points.length; i < il; i++) {
            maxRadiusSq = Math.max(maxRadiusSq, this.center.distanceToSquared(points[i]));
        }
        this.radius = Math.sqrt(maxRadiusSq);
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(sphere) {
        this.center.copy(sphere.center);
        this.radius = sphere.radius;
        return this;
    }
    empty() {
        return this.radius <= 0;
    }
    containsPoint(point) {
        return point.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(point) {
        return point.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(sphere) {
        const radiusSum = this.radius + sphere.radius;
        return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
    }
    intersectsBox(box) {
        return box.intersectsSphere(this);
    }
    intersectsPlane(plane) {
        return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(point) {
        const deltaLengthSquared = this.center.distanceToSquared(point);
        const result = new Vector3().copy(point);
        if (deltaLengthSquared > this.radius * this.radius) {
            result.sub(this.center).normalize();
            result.multiplyScalar(this.radius).add(this.center);
        }
        return result;
    }
    getBoundingBox() {
        return new Box3().set(this.center, this.center).expandByScalar(this.radius);
    }
    applyMatrix4(matrix) {
        this.center.applyMatrix4(matrix);
        this.radius = this.radius * matrix.getMaxScaleOnAxis();
        return this;
    }
    translate(offset) {
        this.center.add(offset);
        return this;
    }
    equals(sphere) {
        return sphere.center.equals(this.center) && sphere.radius === this.radius;
    }
}
