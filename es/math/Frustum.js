import { Plane } from "./Plane";
import { Sphere } from "./Sphere";
import { Vector3 } from "./Vector3";
export class Frustum {
    constructor(p0 = new Plane(), p1 = new Plane(), p2 = new Plane(), p3 = new Plane(), p4 = new Plane(), p5 = new Plane()) {
        this.planes = [p0, p1, p2, p3, p4, p5];
    }
    set(p0, p1, p2, p3, p4, p5) {
        const planes = this.planes;
        planes[0].copy(p0);
        planes[1].copy(p1);
        planes[2].copy(p2);
        planes[3].copy(p3);
        planes[4].copy(p4);
        planes[5].copy(p5);
        return this;
    }
    copy(frustum) {
        const planes = this.planes;
        for (let i = 0; i < 6; i++) {
            planes[i].copy(frustum.planes[i]);
        }
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    setFromMatrix(m) {
        const planes = this.planes;
        const me = m.elements;
        const me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
        const me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
        const me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
        const me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];
        const setPlane = (plane, x, y, z, w) => {
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
    intersectsObject(object) {
        const geometry = object.geometry;
        if (geometry.boundingSphere === null) {
            geometry.computeBoundingSphere();
        }
        const sphere = new Sphere()
            .copy(geometry.boundingSphere)
            .applyMatrix4(object.matrixWorld);
        return this.intersectsSphere(sphere);
    }
    intersectsSprite(sprite) {
        const sphere = new Sphere();
        sphere.center.set(0, 0, 0);
        sphere.radius = 0.7071067811865476;
        sphere.applyMatrix4(sprite.matrixWorld);
        return this.intersectsSphere(sphere);
    }
    intersectsSphere(sphere) {
        const planes = this.planes;
        const center = sphere.center;
        const negRadius = -sphere.radius;
        for (let i = 0; i < 6; i++) {
            const distance = planes[i].distanceToPoint(center);
            if (distance < negRadius) {
                return false;
            }
        }
        return true;
    }
    intersectsBox(box) {
        const p1 = new Vector3(), p2 = new Vector3();
        const planes = this.planes;
        for (let i = 0; i < 6; i++) {
            const plane = planes[i];
            p1.x = plane.normal.x > 0 ? box.min.x : box.max.x;
            p2.x = plane.normal.x > 0 ? box.max.x : box.min.x;
            p1.y = plane.normal.y > 0 ? box.min.y : box.max.y;
            p2.y = plane.normal.y > 0 ? box.max.y : box.min.y;
            p1.z = plane.normal.z > 0 ? box.min.z : box.max.z;
            p2.z = plane.normal.z > 0 ? box.max.z : box.min.z;
            const d1 = plane.distanceToPoint(p1);
            const d2 = plane.distanceToPoint(p2);
            // if both outside plane, no intersection
            if (d1 < 0 && d2 < 0) {
                return false;
            }
        }
        return true;
    }
    containsPoint(point) {
        const planes = this.planes;
        for (let i = 0; i < 6; i++) {
            if (planes[i].distanceToPoint(point) < 0) {
                return false;
            }
        }
        return true;
    }
}
