import { BackSide, DoubleSide, TrianglesDrawMode } from "../constants";
import { BufferGeometry } from "../core/BufferGeometry";
import { Face3 } from "../core/Face3";
import { Geometry } from "../core/Geometry";
import { Object3D } from "../core/Object3D";
import { MeshBasicMaterial } from "../materials/MeshBasicMaterial";
import { Matrix4 } from "../math/Matrix4";
import { Ray } from "../math/Ray";
import { Sphere } from "../math/Sphere";
import { Triangle } from "../math/Triangle";
import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { vectorFromBufferAttribute } from "../utils";
export class Mesh extends Object3D {
    constructor(geometry = new BufferGeometry(), material = new MeshBasicMaterial({
            color: Math.random() * 0xffffff,
        })) {
        super();
        this.type = "Mesh";
        this.geometry = null;
        this.material = null;
        this.drawMode = TrianglesDrawMode;
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        this.geometry = geometry;
        this.material = material;
        this.updateMorphTargets();
    }
    static uvIntersection(point, triangle, uv1, uv2, uv3) {
        const baryCoord = triangle.barycoordFromPoint(point);
        uv1.multiplyScalar(baryCoord.x);
        uv2.multiplyScalar(baryCoord.y);
        uv3.multiplyScalar(baryCoord.z);
        uv1.add(uv2).add(uv3);
        return uv1.clone();
    }
    static checkIntersection(object, material, raycaster, ray, pA, pB, pC, point) {
        let intersect;
        const intersectionPointWorld = new Vector3();
        if (material.side === BackSide) {
            intersect = ray.intersectTriangle(new Triangle(pC, pB, pA), true);
        }
        else {
            intersect = ray.intersectTriangle(new Triangle(pC, pB, pA), material.side !== DoubleSide);
        }
        if (intersect === null)
            return null;
        point.copy(intersect);
        intersectionPointWorld.copy(point);
        intersectionPointWorld.applyMatrix4(object.matrixWorld);
        const distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);
        if (distance < raycaster.near || distance > raycaster.far)
            return null;
        return {
            distance: distance,
            object: object,
            point: intersectionPointWorld.clone(),
        };
    }
    static checkBufferGeometryIntersection(object, raycaster, ray, position, uv, a, b, c) {
        const intersectionPoint = new Vector3();
        const vA = vectorFromBufferAttribute(new Vector3(), position, a);
        const vB = vectorFromBufferAttribute(new Vector3(), position, b);
        const vC = vectorFromBufferAttribute(new Vector3(), position, c);
        const triangle = new Triangle(vectorFromBufferAttribute(new Vector3(), position, a), vectorFromBufferAttribute(new Vector3(), position, b), vectorFromBufferAttribute(new Vector3(), position, c));
        const intersection = Mesh.checkIntersection(object, object.material, raycaster, ray, vA, vB, vC, intersectionPoint);
        if (intersection) {
            if (uv) {
                const uvA = vectorFromBufferAttribute(new Vector2(), uv, a);
                const uvB = vectorFromBufferAttribute(new Vector2(), uv, b);
                const uvC = vectorFromBufferAttribute(new Vector2(), uv, c);
                intersection.uv = Mesh.uvIntersection(intersectionPoint, triangle, uvA, uvB, uvC);
            }
            intersection.face = new Face3(a, b, c, triangle.normal());
            intersection.faceIndex = a;
        }
        return intersection;
    }
    setDrawMode(value) {
        this.drawMode = value;
        return this;
    }
    updateMorphTargets() {
        const geometry = this.geometry;
        if (geometry instanceof BufferGeometry) {
            const morphAttributes = geometry.morphAttributes;
            const keys = Object.keys(morphAttributes);
            if (keys.length > 0) {
                const morphAttribute = morphAttributes[keys[0]];
                if (morphAttribute !== undefined) {
                    for (let m = 0, ml = morphAttribute.length; m < ml; m++) {
                        const name = morphAttribute[m].name || String(m);
                        this.morphTargetInfluences.push(0);
                        this.morphTargetDictionary[name] = m;
                    }
                }
            }
        }
        else if (geometry instanceof Geometry) {
            const morphTargets = geometry.morphTargets;
            if (morphTargets !== undefined && morphTargets.length > 0) {
                for (let m = 0, ml = morphTargets.length; m < ml; m++) {
                    const name = morphTargets[m].name || String(m);
                    this.morphTargetInfluences.push(0);
                    this.morphTargetDictionary[name] = m;
                }
            }
        }
        return this;
    }
    raycast(raycaster, intersects = []) {
        const geometry = this.geometry;
        const material = this.material;
        const matrixWorld = this.matrixWorld;
        if (material === undefined)
            return null;
        // Checking boundingSphere distance to ray
        if (geometry.boundingSphere === null)
            geometry.computeBoundingSphere();
        const sphere = new Sphere()
            .copy(geometry.boundingSphere)
            .applyMatrix4(matrixWorld);
        if (raycaster.ray.intersectsSphere(sphere) === false)
            return null;
        const inverseMatrix = new Matrix4().getInverse(matrixWorld);
        const ray = new Ray().copy(raycaster.ray).applyMatrix4(inverseMatrix);
        // Check boundingBox before continuing
        if (geometry.boundingBox !== null) {
            if (ray.intersectsBox(geometry.boundingBox) === false)
                return null;
        }
        if (geometry instanceof BufferGeometry) {
            const index = geometry.index;
            const position = geometry.attributes.position;
            const uv = geometry.attributes.uv;
            if (index !== null) {
                // indexed buffer geometry
                for (let i = 0, l = index.count; i < l; i += 3) {
                    const a = index.getProperty(i, "x");
                    const b = index.getProperty(i + 1, "x");
                    const c = index.getProperty(i + 2, "x");
                    const intersection = Mesh.checkBufferGeometryIntersection(this, raycaster, ray, position, uv, a, b, c);
                    if (intersection) {
                        intersection.faceIndex = Math.floor(i / 3); // triangle number in indices buffer semantics
                        intersects.push(intersection);
                    }
                }
            }
            else if (position !== undefined) {
                // non-indexed buffer geometry
                for (let i = 0, l = position.count; i < l; i += 3) {
                    const a = i;
                    const b = i + 1;
                    const c = i + 2;
                    const intersection = Mesh.checkBufferGeometryIntersection(this, raycaster, ray, position, uv, a, b, c);
                    if (intersection) {
                        intersection.index = a; // triangle number in positions buffer semantics
                        intersects.push(intersection);
                    }
                }
            }
        }
        else if (geometry instanceof Geometry) {
            const vertices = geometry.vertices;
            const faces = geometry.faces;
            let uvs;
            const faceVertexUvs = geometry.faceVertexUvs[0];
            if (faceVertexUvs.length > 0)
                uvs = faceVertexUvs;
            for (let f = 0, fl = faces.length; f < fl; f++) {
                const face = faces[f];
                const faceMaterial = Array.isArray(material)
                    ? material[face.materialIndex]
                    : material;
                if (faceMaterial === undefined)
                    continue;
                let fvA = vertices[face.a];
                let fvB = vertices[face.b];
                let fvC = vertices[face.c];
                if (faceMaterial.morphTargets === true) {
                    const morphTargets = geometry.morphTargets;
                    const vA = new Vector3(), vB = new Vector3(), vC = new Vector3();
                    for (let t = 0, tl = morphTargets.length; t < tl; t++) {
                        const influence = this.morphTargetInfluences[t];
                        if (influence === 0)
                            continue;
                        const targets = morphTargets[t].vertices;
                        vA.add(new Vector3()
                            .copy(targets[face.a])
                            .sub(fvA)
                            .multiplyScalar(influence));
                        vB.add(new Vector3()
                            .copy(targets[face.b])
                            .sub(fvB)
                            .multiplyScalar(influence));
                        vC.add(new Vector3()
                            .copy(targets[face.c])
                            .sub(fvC)
                            .multiplyScalar(influence));
                    }
                    vA.add(fvA);
                    vB.add(fvB);
                    vC.add(fvC);
                    fvA = vA;
                    fvB = vB;
                    fvC = vC;
                }
                const intersectionPoint = new Vector3();
                const intersection = Mesh.checkIntersection(this, faceMaterial, raycaster, ray, fvA, fvB, fvC, intersectionPoint);
                if (intersection) {
                    if (uvs && uvs[f]) {
                        const uvsF = uvs[f];
                        const uvA = new Vector2().copy(uvsF[0]);
                        const uvB = new Vector2().copy(uvsF[1]);
                        const uvC = new Vector2().copy(uvsF[2]);
                        intersection.uv = Mesh.uvIntersection(intersectionPoint, new Triangle(fvA, fvB, fvC), uvA, uvB, uvC);
                    }
                    intersection.face = face;
                    intersection.faceIndex = f;
                    intersects.push(intersection);
                }
            }
        }
        return intersects;
    }
    clone() {
        return new this.constructor(this.geometry, this.material).copy(this);
    }
}
