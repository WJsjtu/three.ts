import {BackSide, DoubleSide, TrianglesDrawMode} from "../constants";
import {BufferAttribute} from "../core/BufferAttribute";
import {BufferGeometry} from "../core/BufferGeometry";
import {Face3} from "../core/Face3";
import {Geometry, IMorphTarget} from "../core/Geometry";
import {Object3D} from "../core/Object3D";
import {IIntersection, Raycaster} from "../core/Raycaster";
import {Material} from "../materials/Material";
import {MeshBasicMaterial} from "../materials/MeshBasicMaterial";
import {Matrix4} from "../math/Matrix4";
import {Ray} from "../math/Ray";
import {Sphere} from "../math/Sphere";
import {Triangle} from "../math/Triangle";
import {Vector2} from "../math/Vector2";
import {Vector3} from "../math/Vector3";
import {vectorFromBufferAttribute} from "../utils";

class Mesh extends Object3D {
    public static uvIntersection(
        point: Vector3,
        triangle: Triangle,
        uv1: Vector2,
        uv2: Vector2,
        uv3: Vector2,
    ): Vector2 {
        const baryCoord: Vector3 = triangle.barycoordFromPoint(point);
        uv1.multiplyScalar(baryCoord.x);
        uv2.multiplyScalar(baryCoord.y);
        uv3.multiplyScalar(baryCoord.z);
        uv1.add(uv2).add(uv3);
        return uv1.clone();
    }

    public static checkIntersection(
        object: Mesh,
        material: MeshBasicMaterial,
        raycaster: Raycaster,
        ray: Ray,
        pA: Vector3,
        pB: Vector3,
        pC: Vector3,
        point: Vector3,
    ): IIntersection {
        let intersect: Vector3;
        const intersectionPointWorld: Vector3 = new Vector3();
        if (material.side === BackSide) {
            intersect = ray.intersectTriangle(new Triangle(pC, pB, pA), true);
        } else {
            intersect = ray.intersectTriangle(
                new Triangle(pC, pB, pA),
                material.side !== DoubleSide,
            );
        }
        if (intersect === null) return null;
        point.copy(intersect);
        intersectionPointWorld.copy(point);
        intersectionPointWorld.applyMatrix4(object.matrixWorld);
        const distance: number = raycaster.ray.origin.distanceTo(
            intersectionPointWorld,
        );
        if (distance < raycaster.near || distance > raycaster.far) return null;
        return {
            distance: distance,
            object: object,
            point: intersectionPointWorld.clone(),
        };
    }

    public static checkBufferGeometryIntersection(
        object: Mesh,
        raycaster: Raycaster,
        ray: Ray,
        position: BufferAttribute,
        uv: BufferAttribute,
        a: number,
        b: number,
        c: number,
    ): IIntersection {
        const intersectionPoint: Vector3 = new Vector3();
        const vA = vectorFromBufferAttribute(new Vector3(), position, a);
        const vB = vectorFromBufferAttribute(new Vector3(), position, b);
        const vC = vectorFromBufferAttribute(new Vector3(), position, c);
        const triangle = new Triangle(
            vectorFromBufferAttribute(new Vector3(), position, a),
            vectorFromBufferAttribute(new Vector3(), position, b),
            vectorFromBufferAttribute(new Vector3(), position, c),
        );
        const intersection: IIntersection = Mesh.checkIntersection(
            object,
            object.material as MeshBasicMaterial,
            raycaster,
            ray,
            vA,
            vB,
            vC,
            intersectionPoint,
        );
        if (intersection) {
            if (uv) {
                const uvA = vectorFromBufferAttribute(new Vector2(), uv, a);
                const uvB = vectorFromBufferAttribute(new Vector2(), uv, b);
                const uvC = vectorFromBufferAttribute(new Vector2(), uv, c);
                intersection.uv = Mesh.uvIntersection(
                    intersectionPoint,
                    triangle,
                    uvA,
                    uvB,
                    uvC,
                );
            }
            intersection.face = new Face3(a, b, c, triangle.normal());
            intersection.faceIndex = a;
        }
        return intersection;
    }

    public readonly type: string = "Mesh";

    public geometry: BufferGeometry | Geometry = null;
    public material: MeshBasicMaterial | MeshBasicMaterial[] = null;
    public drawMode: number = TrianglesDrawMode;

    public morphTargetInfluences: number[] = [];
    public morphTargetDictionary: {[key: string]: number} = {};

    constructor(
        geometry: BufferGeometry | Geometry = new BufferGeometry(),
        material:
            | MeshBasicMaterial
            | MeshBasicMaterial[] = new MeshBasicMaterial({
            color: Math.random() * 0xffffff,
        }),
    ) {
        super();
        this.geometry = geometry;
        this.material = material;
        this.updateMorphTargets();
    }

    public setDrawMode(value: number): this {
        this.drawMode = value;
        return this;
    }

    public updateMorphTargets(): this {
        const geometry: BufferGeometry | Geometry = this.geometry;
        if (geometry instanceof BufferGeometry) {
            const morphAttributes: {[key: string]: BufferAttribute[]} =
                geometry.morphAttributes;
            const keys: string[] = Object.keys(morphAttributes);
            if (keys.length > 0) {
                const morphAttribute: BufferAttribute[] =
                    morphAttributes[keys[0]];
                if (morphAttribute !== undefined) {
                    for (
                        let m: number = 0, ml: number = morphAttribute.length;
                        m < ml;
                        m++
                    ) {
                        const name: string =
                            morphAttribute[m].name || String(m);
                        this.morphTargetInfluences.push(0);
                        this.morphTargetDictionary[name] = m;
                    }
                }
            }
        } else if (geometry instanceof Geometry) {
            const morphTargets: IMorphTarget[] = geometry.morphTargets;
            if (morphTargets !== undefined && morphTargets.length > 0) {
                for (
                    let m: number = 0, ml: number = morphTargets.length;
                    m < ml;
                    m++
                ) {
                    const name: string = morphTargets[m].name || String(m);
                    this.morphTargetInfluences.push(0);
                    this.morphTargetDictionary[name] = m;
                }
            }
        }
        return this;
    }

    public raycast(
        raycaster: Raycaster,
        intersects: IIntersection[] = [],
    ): IIntersection[] {
        const geometry: BufferGeometry | Geometry = this.geometry;
        const material: MeshBasicMaterial | MeshBasicMaterial[] = this.material;
        const matrixWorld: Matrix4 = this.matrixWorld;
        if (material === undefined) return;
        // Checking boundingSphere distance to ray
        if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
        const sphere: Sphere = new Sphere()
            .copy(geometry.boundingSphere)
            .applyMatrix4(matrixWorld);
        if (raycaster.ray.intersectsSphere(sphere) === false) return;
        const inverseMatrix: Matrix4 = new Matrix4().getInverse(matrixWorld);
        const ray = new Ray().copy(raycaster.ray).applyMatrix4(inverseMatrix);
        // Check boundingBox before continuing
        if (geometry.boundingBox !== null) {
            if (ray.intersectsBox(geometry.boundingBox) === false) return;
        }
        if (geometry instanceof BufferGeometry) {
            const index: BufferAttribute = geometry.index;
            const position: BufferAttribute = geometry.attributes.position;
            const uv: BufferAttribute = geometry.attributes.uv;
            if (index !== null) {
                // indexed buffer geometry
                for (
                    let i: number = 0, l: number = index.count;
                    i < l;
                    i += 3
                ) {
                    const a: number = index.getProperty(i, "x") as number;
                    const b: number = index.getProperty(i + 1, "x") as number;
                    const c: number = index.getProperty(i + 2, "x") as number;
                    const intersection: IIntersection = Mesh.checkBufferGeometryIntersection(
                        this,
                        raycaster,
                        ray,
                        position,
                        uv,
                        a,
                        b,
                        c,
                    );
                    if (intersection) {
                        intersection.faceIndex = Math.floor(i / 3); // triangle number in indices buffer semantics
                        intersects.push(intersection);
                    }
                }
            } else if (position !== undefined) {
                // non-indexed buffer geometry
                for (
                    let i: number = 0, l: number = position.count;
                    i < l;
                    i += 3
                ) {
                    const a: number = i;
                    const b: number = i + 1;
                    const c: number = i + 2;
                    const intersection: IIntersection = Mesh.checkBufferGeometryIntersection(
                        this,
                        raycaster,
                        ray,
                        position,
                        uv,
                        a,
                        b,
                        c,
                    );
                    if (intersection) {
                        intersection.index = a; // triangle number in positions buffer semantics
                        intersects.push(intersection);
                    }
                }
            }
        } else if (geometry instanceof Geometry) {
            const vertices: Vector3[] = geometry.vertices;
            const faces: Face3[] = geometry.faces;
            let uvs: Vector2[][] | undefined;
            const faceVertexUvs: Vector2[][] = geometry.faceVertexUvs[0];
            if (faceVertexUvs.length > 0) uvs = faceVertexUvs;
            for (let f: number = 0, fl: number = faces.length; f < fl; f++) {
                const face: Face3 = faces[f];
                const faceMaterial: MeshBasicMaterial = Array.isArray(material)
                    ? material[face.materialIndex]
                    : material;
                if (faceMaterial === undefined) continue;
                let fvA: Vector3 = vertices[face.a];
                let fvB: Vector3 = vertices[face.b];
                let fvC: Vector3 = vertices[face.c];
                if (faceMaterial.morphTargets === true) {
                    const morphTargets: IMorphTarget[] = geometry.morphTargets;
                    const vA = new Vector3(),
                        vB = new Vector3(),
                        vC = new Vector3();
                    for (
                        let t: number = 0, tl: number = morphTargets.length;
                        t < tl;
                        t++
                    ) {
                        const influence: number = this.morphTargetInfluences[t];
                        if (influence === 0) continue;
                        const targets: Vector3[] = morphTargets[t].vertices;
                        vA.add(
                            new Vector3()
                                .copy(targets[face.a])
                                .sub(fvA)
                                .multiplyScalar(influence),
                        );
                        vB.add(
                            new Vector3()
                                .copy(targets[face.b])
                                .sub(fvB)
                                .multiplyScalar(influence),
                        );
                        vC.add(
                            new Vector3()
                                .copy(targets[face.c])
                                .sub(fvC)
                                .multiplyScalar(influence),
                        );
                    }
                    vA.add(fvA);
                    vB.add(fvB);
                    vC.add(fvC);
                    fvA = vA;
                    fvB = vB;
                    fvC = vC;
                }

                const intersectionPoint: Vector3 = new Vector3();
                const intersection: IIntersection = Mesh.checkIntersection(
                    this,
                    faceMaterial,
                    raycaster,
                    ray,
                    fvA,
                    fvB,
                    fvC,
                    intersectionPoint,
                );

                if (intersection) {
                    if (uvs && uvs[f]) {
                        const uvsF: Vector2[] = uvs[f];
                        const uvA = new Vector2().copy(uvsF[0]);
                        const uvB = new Vector2().copy(uvsF[1]);
                        const uvC = new Vector2().copy(uvsF[2]);
                        intersection.uv = Mesh.uvIntersection(
                            intersectionPoint,
                            new Triangle(fvA, fvB, fvC),
                            uvA,
                            uvB,
                            uvC,
                        );
                    }
                    intersection.face = face;
                    intersection.faceIndex = f;
                    intersects.push(intersection);
                }
            }
        }
        return intersects;
    }

    public clone(): Mesh {
        return new (this.constructor as (
            geometry: BufferGeometry | Geometry,
            material: MeshBasicMaterial | MeshBasicMaterial[],
        ) => void)(this.geometry, this.material).copy(this);
    }
}
