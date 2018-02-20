import {Vector3} from "./Vector3";
import {Sphere} from "./Sphere";
import {Line3} from "./Line3";
import {Box3} from "./Box3";
import {Matrix4} from "./Matrix4";
import {Matrix3} from "./Matrix3";

export class Plane {
    public normal: Vector3 = new Vector3(1, 0, 0);
    public constant: number = 0;

    constructor(normal: Vector3 = new Vector3(1, 0, 0), constant: number = 0) {
        this.normal = normal;
        this.constant = constant;
    }

    public set(normal: Vector3, constant: number): Plane {
        this.normal.copy(normal);
        this.constant = constant;
        return this;
    }

    public setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3): Plane {
        this.normal.copy(normal);
        this.constant = -point.dot(this.normal);
        return this;
    }

    public setFromCoplanarPoints(a, b, c): Plane {
        const v1: Vector3 = new Vector3();
        const v2: Vector3 = new Vector3();
        const normal: Vector3 = v1.copy(c).sub(b).cross(v2.copy(a).sub(b)).normalize();
        // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?
        this.setFromNormalAndCoplanarPoint(normal, a);
        return this;
    }

    public clone(): Plane {
        return (new (this.constructor as () => void)() as Plane).copy(this);
    }

    public copy(plane): Plane {
        this.normal.copy(plane.normal);
        this.constant = plane.constant;
        return this;
    }

    /**
     * Note: will lead to a divide by zero if the plane is invalid
     * @returns {Plane}
     */
    public normalize(): Plane {
        const inverseNormalLength: number = 1.0 / this.normal.length();
        this.normal.multiplyScalar(inverseNormalLength);
        this.constant *= inverseNormalLength;
        return this;
    }

    public negate(): Plane {
        this.constant *= -1;
        this.normal.negate();
        return this;
    }

    public distanceToPoint(point: Vector3): number {
        return this.normal.dot(point) + this.constant;
    }

    public distanceToSphere(sphere: Sphere): number {
        return this.distanceToPoint(sphere.center) - sphere.radius;
    }

    public projectPoint(point: Vector3): Vector3 {
        return new Vector3().copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point);
    }

    public intersectLine(line: Line3): Vector3 | undefined {
        const direction: Vector3 = line.delta();
        const denominator: number = this.normal.dot(direction);
        if (denominator === 0) {
            // line is coplanar, return origin
            if (this.distanceToPoint(line.start) === 0) {
                return new Vector3().copy(line.start);
            }
            // Unsure if this is the correct method to handle this case.
            return undefined;
        }
        const t: number = -( line.start.dot(this.normal) + this.constant ) / denominator;
        if (t < 0 || t > 1) {
            return undefined;
        }
        return new Vector3().copy(direction).multiplyScalar(t).add(line.start);
    }

    public intersectsLine(line: Line3): boolean {
        // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.
        const startSign: number = this.distanceToPoint(line.start);
        const endSign: number = this.distanceToPoint(line.end);
        return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );
    }

    public intersectsBox(box: Box3): boolean {
        return box.intersectsPlane(this);
    }

    public intersectsSphere(sphere: Sphere): boolean {
        return sphere.intersectsPlane(this);
    }

    public coplanarPoint(): Vector3 {
        return new Vector3().copy(this.normal).multiplyScalar(-this.constant);
    }

    public applyMatrix4(matrix: Matrix4): Plane {
        const normalMatrix: Matrix3 = new Matrix3().getNormalMatrix(matrix);
        const referencePoint: Vector3 = this.coplanarPoint().applyMatrix4(matrix);
        const normal: Vector3 = this.normal.applyMatrix3(normalMatrix).normalize();
        this.constant = -referencePoint.dot(normal);
        return this;
    }

    public translate(offset: Vector3): Plane {
        this.constant -= offset.dot(this.normal);
        return this;
    }

    public equals(plane: Plane): boolean {
        return plane.normal.equals(this.normal) && ( plane.constant === this.constant );
    }
}