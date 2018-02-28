import { Plane } from "./Plane";
import { Matrix4 } from "./Matrix4";
import { Sphere } from "./Sphere";
import { ObjectWithGeometry, Box3 } from "./Box3";
import { Geometry } from "../core/Geometry";
import { BufferGeometry } from "../core/BufferGeometry";
import { Vector3 } from "./Vector3";
import { Sprite } from "../objects/Sprite";

export class Frustum {
    public planes: [Plane, Plane, Plane, Plane, Plane, Plane];

    constructor(
        p0: Plane = new Plane(),
        p1: Plane = new Plane(),
        p2: Plane = new Plane(),
        p3: Plane = new Plane(),
        p4: Plane = new Plane(),
        p5: Plane = new Plane(),
    ) {
        this.planes = [p0, p1, p2, p3, p4, p5];
    }

    public set(p0: Plane, p1: Plane, p2: Plane, p3: Plane, p4: Plane, p5: Plane): this {
        const planes: Plane[] = this.planes;
        planes[0].copy(p0);
        planes[1].copy(p1);
        planes[2].copy(p2);
        planes[3].copy(p3);
        planes[4].copy(p4);
        planes[5].copy(p5);
        return this;
    }

    public copy(frustum: Frustum): this {
        const planes: Plane[] = this.planes;
        for (let i: number = 0; i < 6; i++) {
            planes[i].copy(frustum.planes[i]);
        }
        return this;
    }

    public clone(): Frustum {
        return new (this.constructor as new () => Frustum)().copy(this);
    }

    public setFromMatrix(m: Matrix4): this {
        const planes: Plane[] = this.planes;
        const me: number[] = m.elements;
        const me0: number = me[0],
            me1: number = me[1],
            me2: number = me[2],
            me3: number = me[3];
        const me4: number = me[4],
            me5: number = me[5],
            me6: number = me[6],
            me7: number = me[7];
        const me8: number = me[8],
            me9: number = me[9],
            me10: number = me[10],
            me11: number = me[11];
        const me12: number = me[12],
            me13: number = me[13],
            me14: number = me[14],
            me15: number = me[15];
        const setPlane = (plane: Plane, x: number, y: number, z: number, w: number) => {
            plane.normal.set(x, y, z);
            plane.constant = w;
            plane.normalize();
        };
        setPlane(planes[0], me3 - me0, me7 - me4, me11 - me8, me15 - me12);
        setPlane(planes[1], me3 + me0, me7 + me4, me11 + me8, me15 + me12);
        setPlane(planes[2], me3 + me1, me7 + me5, me11 + me9, me15 + me13);
        setPlane(planes[3], me3 - me1, me7 - me5, me11 - me9, me15 - me13);
        setPlane(planes[4], me3 - me2, me7 - me6, me11 - me10, me15 - me14);
        setPlane(planes[5], me3 + me2, me7 + me6, me11 + me10, me15 + me14);
        return this;
    }

    public intersectsObject(object: ObjectWithGeometry): boolean {
        const geometry: Geometry | BufferGeometry = object.geometry;
        if (geometry.boundingSphere === null) {
            geometry.computeBoundingSphere();
        }
        const sphere = new Sphere().copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);
        return this.intersectsSphere(sphere);
    }

    public intersectsSprite(sprite: Sprite) {
        const sphere: Sphere = new Sphere();
        sphere.center.set(0, 0, 0);
        sphere.radius = 0.7071067811865476;
        sphere.applyMatrix4(sprite.matrixWorld);
        return this.intersectsSphere(sphere);
    }

    public intersectsSphere(sphere: Sphere): boolean {
        const planes: Plane[] = this.planes;
        const center: Vector3 = sphere.center;
        const negRadius: number = -sphere.radius;
        for (let i: number = 0; i < 6; i++) {
            const distance: number = planes[i].distanceToPoint(center);
            if (distance < negRadius) {
                return false;
            }
        }
        return true;
    }

    public intersectsBox(box: Box3): boolean {
        const p1: Vector3 = new Vector3(),
            p2: Vector3 = new Vector3();
        const planes: Plane[] = this.planes;

        for (let i: number = 0; i < 6; i++) {
            const plane: Plane = planes[i];
            p1.x = plane.normal.x > 0 ? box.min.x : box.max.x;
            p2.x = plane.normal.x > 0 ? box.max.x : box.min.x;
            p1.y = plane.normal.y > 0 ? box.min.y : box.max.y;
            p2.y = plane.normal.y > 0 ? box.max.y : box.min.y;
            p1.z = plane.normal.z > 0 ? box.min.z : box.max.z;
            p2.z = plane.normal.z > 0 ? box.max.z : box.min.z;
            const d1: number = plane.distanceToPoint(p1);
            const d2: number = plane.distanceToPoint(p2);
            // if both outside plane, no intersection
            if (d1 < 0 && d2 < 0) {
                return false;
            }
        }
        return true;
    }

    public containsPoint(point: Vector3): boolean {
        const planes: Plane[] = this.planes;
        for (let i: number = 0; i < 6; i++) {
            if (planes[i].distanceToPoint(point) < 0) {
                return false;
            }
        }
        return true;
    }
}
