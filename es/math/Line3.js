import { MathUtil } from "./Math";
import { Vector3 } from "./Vector3";
export class Line3 {
    constructor(start = new Vector3(), end = new Vector3()) {
        this.start = new Vector3();
        this.end = new Vector3();
        this.start = start;
        this.end = end;
    }
    set(start, end) {
        this.start.copy(start);
        this.end.copy(end);
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(line) {
        this.start.copy(line.start);
        this.end.copy(line.end);
        return this;
    }
    getCenter() {
        return new Vector3()
            .copy(this.start)
            .add(this.end)
            .multiplyScalar(0.5);
    }
    delta() {
        return new Vector3().copy(this.end).sub(this.start);
    }
    distanceSquared() {
        return this.start.distanceToSquared(this.end);
    }
    distance() {
        return this.start.distanceTo(this.end);
    }
    at(t) {
        return this.delta()
            .multiplyScalar(t)
            .add(this.start);
    }
    closestPointToPointParameter(point, clampToLine = false) {
        const startP = new Vector3();
        const startEnd = new Vector3();
        startP.copy(point).sub(this.start);
        startEnd.copy(this.end).sub(this.start);
        const startEnd2 = startEnd.dot(startEnd);
        const startEndStartP = startEnd.dot(startP);
        let t = startEndStartP / startEnd2;
        if (clampToLine) {
            t = MathUtil.clamp(t, 0, 1);
        }
        return t;
    }
    closestPointToPoint(point, clampToLine = false) {
        const t = this.closestPointToPointParameter(point, clampToLine);
        return this.delta()
            .multiplyScalar(t)
            .add(this.start);
    }
    applyMatrix4(matrix) {
        this.start.applyMatrix4(matrix);
        this.end.applyMatrix4(matrix);
        return this;
    }
    equals(line) {
        return line.start.equals(this.start) && line.end.equals(this.end);
    }
}
