import { Matrix3 } from "./Matrix3";
import { Vector3 } from "./Vector3";
export class Plane {
    constructor(normal = new Vector3(1, 0, 0), constant = 0) {
        this.normal = new Vector3(1, 0, 0);
        this.constant = 0;
        this.normal = normal;
        this.constant = constant;
    }
    set(normal, constant) {
        this.normal.copy(normal);
        this.constant = constant;
        return this;
    }
    setFromNormalAndCoplanarPoint(normal, point) {
        this.normal.copy(normal);
        this.constant = -point.dot(this.normal);
        return this;
    }
    setFromCoplanarPoints(a, b, c) {
        const v1 = new Vector3();
        const v2 = new Vector3();
        const normal = v1
            .copy(c)
            .sub(b)
            .cross(v2.copy(a).sub(b))
            .normalize();
        // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?
        this.setFromNormalAndCoplanarPoint(normal, a);
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(plane) {
        this.normal.copy(plane.normal);
        this.constant = plane.constant;
        return this;
    }
    /**
     * Note: will lead to a divide by zero if the plane is invalid
     * @returns {Plane}
     */
    normalize() {
        const inverseNormalLength = 1.0 / this.normal.length();
        this.normal.multiplyScalar(inverseNormalLength);
        this.constant *= inverseNormalLength;
        return this;
    }
    negate() {
        this.constant *= -1;
        this.normal.negate();
        return this;
    }
    distanceToPoint(point) {
        return this.normal.dot(point) + this.constant;
    }
    distanceToSphere(sphere) {
        return this.distanceToPoint(sphere.center) - sphere.radius;
    }
    projectPoint(point) {
        return new Vector3()
            .copy(this.normal)
            .multiplyScalar(-this.distanceToPoint(point))
            .add(point);
    }
    intersectLine(line) {
        const direction = line.delta();
        const denominator = this.normal.dot(direction);
        if (denominator === 0) {
            // line is coplanar, return origin
            if (this.distanceToPoint(line.start) === 0) {
                return new Vector3().copy(line.start);
            }
            // Unsure if this is the correct method to handle this case.
            return undefined;
        }
        const t = -(line.start.dot(this.normal) + this.constant) / denominator;
        if (t < 0 || t > 1) {
            return undefined;
        }
        return new Vector3()
            .copy(direction)
            .multiplyScalar(t)
            .add(line.start);
    }
    intersectsLine(line) {
        // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.
        const startSign = this.distanceToPoint(line.start);
        const endSign = this.distanceToPoint(line.end);
        return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);
    }
    intersectsBox(box) {
        return box.intersectsPlane(this);
    }
    intersectsSphere(sphere) {
        return sphere.intersectsPlane(this);
    }
    coplanarPoint() {
        return new Vector3().copy(this.normal).multiplyScalar(-this.constant);
    }
    applyMatrix4(matrix) {
        const normalMatrix = new Matrix3().getNormalMatrix(matrix);
        const referencePoint = this.coplanarPoint().applyMatrix4(matrix);
        const normal = this.normal
            .applyMatrix3(normalMatrix)
            .normalize();
        this.constant = -referencePoint.dot(normal);
        return this;
    }
    translate(offset) {
        this.constant -= offset.dot(this.normal);
        return this;
    }
    equals(plane) {
        return (plane.normal.equals(this.normal) && plane.constant === this.constant);
    }
}
