import { MathUtil } from "./Math";
export class Spherical {
    constructor(radius = 1.0, phi = 0, theta = 0) {
        this.radius = radius;
        this.phi = phi;
        this.theta = theta;
    }
    set(radius, phi, theta) {
        this.radius = radius;
        this.phi = phi;
        this.theta = theta;
        return this;
    }
    copy(other) {
        this.radius = other.radius;
        this.phi = other.phi;
        this.theta = other.theta;
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    // restrict phi to be betwee EPS and PI-EPS
    makeSafe() {
        const EPS = 0.000001;
        this.phi = Math.max(EPS, Math.min(Math.PI - EPS, this.phi));
        return this;
    }
    setFromVector3(vec3) {
        this.radius = vec3.length();
        if (this.radius === 0) {
            this.theta = 0;
            this.phi = 0;
        }
        else {
            this.theta = Math.atan2(vec3.x, vec3.z); // equator angle around y-up axis
            this.phi = Math.acos(MathUtil.clamp(vec3.y / this.radius, -1, 1)); // polar angle
        }
        return this;
    }
}
