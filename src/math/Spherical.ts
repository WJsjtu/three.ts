import { Vector3 } from "./Vector3";
import { MathUtil } from "./Math";

export class Spherical {
    public radius: number;
    public phi: number;
    public theta: number;

    constructor(radius: number = 1.0, phi: number = 0, theta: number = 0) {
        this.radius = radius;
        this.phi = phi;
        this.theta = theta;
    }

    public set(radius: number, phi: number, theta: number): this {
        this.radius = radius;
        this.phi = phi;
        this.theta = theta;
        return this;
    }

    public copy(other: Spherical): this {
        this.radius = other.radius;
        this.phi = other.phi;
        this.theta = other.theta;
        return this;
    }

    public clone(): Spherical {
        return new (this.constructor as new () => Spherical)().copy(this);
    }

    // restrict phi to be betwee EPS and PI-EPS
    public makeSafe(): this {
        const EPS: number = 0.000001;
        this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));
        return this;
    }

    public setFromVector3(vec3: Vector3): this {
        this.radius = vec3.length();
        if (this.radius === 0) {
            this.theta = 0;
            this.phi = 0;
        } else {
            this.theta = Math.atan2(vec3.x, vec3.z); // equator angle around y-up axis
            this.phi = Math.acos(MathUtil.clamp(vec3.y / this.radius, -1, 1)); // polar angle
        }
        return this;
    }
}
