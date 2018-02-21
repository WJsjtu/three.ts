import {Vector3} from "./Vector3";
import {MathUtil} from "./Math";
import {Matrix4} from "./Matrix4";

export class Line3 {

    public start: Vector3 = new Vector3();
    public end: Vector3 = new Vector3();

    constructor(start: Vector3 = new Vector3(), end: Vector3 = new Vector3()) {
        this.start = start;
        this.end = end;
    }

    public set(start: Vector3, end: Vector3): this {
        this.start.copy(start);
        this.end.copy(end);
        return this;
    }

    public clone(): Line3 {
        return (new (this.constructor as () => void)() as Line3).copy(this);
    }

    public copy(line: Line3): this {
        this.start.copy(line.start);
        this.end.copy(line.end);
        return this;
    }

    public getCenter(): Vector3 {
        return new Vector3().copy(this.start).add(this.end).multiplyScalar(0.5);
    }

    public delta(): Vector3 {
        return new Vector3().copy(this.end).sub(this.start);
    }

    public distanceSquared(): number {
        return this.start.distanceToSquared(this.end);
    }

    public distance(): number {
        return this.start.distanceTo(this.end);
    }

    public at(t): Vector3 {
        return this.delta().multiplyScalar(t).add(this.start);
    }

    public closestPointToPointParameter(point: Vector3, clampToLine: boolean = false): number {
        const startP = new Vector3();
        const startEnd = new Vector3();
        startP.copy(point).sub(this.start);
        startEnd.copy(this.end).sub(this.start);
        const startEnd2 = startEnd.dot(startEnd);
        const startEnd_startP = startEnd.dot(startP);
        let t: number = startEnd_startP / startEnd2;
        if (clampToLine) {
            t = MathUtil.clamp(t, 0, 1);
        }
        return t;
    }

    public closestPointToPoint(point: Vector3, clampToLine: boolean = false): Vector3 {
        const t = this.closestPointToPointParameter(point, clampToLine);
        return this.delta().multiplyScalar(t).add(this.start);
    }

    public applyMatrix4(matrix: Matrix4): this {
        this.start.applyMatrix4(matrix);
        this.end.applyMatrix4(matrix);
        return this;
    }

    public equals(line: Line3): boolean {
        return line.start.equals(this.start) && line.end.equals(this.end);
    }
}