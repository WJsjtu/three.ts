import {EventDispatcher} from "./EventDispatcher";
import {MathUtil} from "../math/Math";
import {Vector3} from "../math/Vector3";
import {Vector4} from "../math/Vector4";
import {Color} from "../math/Color";
import {Face3} from "./Face3";
import {Box3} from "../math/Box3";
import {Sphere} from "../math/Sphere";
import {Matrix4} from "../math/Matrix4";
import {Matrix3} from "../math/Matrix3";
import {Object3D} from "./Object3D";
import {Triangle} from "../math/Triangle";
import {Vector2} from "../math/Vector2";
import {DirectGeometry, Group} from "./DirectGeometry";
import {BufferAttribute, TypedArray} from "./BufferAttribute";
import {BufferGeometry} from "./BufferGeometry";

export class GeometryFace extends Face3 {
    public id?: number;
    public originalFaceNormal?: Vector3;
    public originalVertexNormals?: Array<Vector3>;
}

export interface MorphNormal {
    faceNormals?: Array<Vector3>,
    vertexNormals?: Array<Triangle>
}

export interface MorphTarget {
    name: string,
    vertices?: Array<Vector3>,
    normals?: Array<Vector3>
}

let geometryId: number = 0;

export class Geometry extends EventDispatcher {

    /**
     * Used in WebGLGeometries
     * @type {BufferGeometry}
     */
    public bufferGeometry?: BufferGeometry = null;

    public readonly id: number = geometryId += 2;
    public readonly uuid: string = MathUtil.generateUUID();
    public name: string = "";
    public readonly type: string = "Geometry";

    public vertices: Array<Vector3> = [];
    public colors: Array<Color> = [];
    public faces: Array<GeometryFace> = [];
    public faceVertexUvs: Array<Array<Array<Vector2>>> = [[]];

    public morphTargets: Array<MorphTarget> = [];
    public morphNormals: Array<MorphNormal> = [];

    public skinWeights: Array<Vector4> = [];
    public skinIndices: Array<Vector4> = [];

    public lineDistances: Array<number> = [];

    public boundingBox: Box3 = null;
    public boundingSphere: Sphere = null;

    public elementsNeedUpdate: boolean = false;
    public verticesNeedUpdate: boolean = false;
    public uvsNeedUpdate: boolean = false;
    public normalsNeedUpdate: boolean = false;
    public colorsNeedUpdate: boolean = false;
    public lineDistancesNeedUpdate: boolean = false;
    public groupsNeedUpdate: boolean = false;

    public directGeometry?: DirectGeometry;

    public applyMatrix(matrix: Matrix4): this {
        const normalMatrix: Matrix3 = new Matrix3().getNormalMatrix(matrix);
        for (let i: number = 0, il: number = this.vertices.length; i < il; i++) {
            this.vertices[i].applyMatrix4(matrix);
        }
        for (let i: number = 0, il: number = this.faces.length; i < il; i++) {
            const face: GeometryFace = this.faces[i];
            face.normal.applyMatrix3(normalMatrix).normalize();
            for (let j: number = 0, jl: number = face.vertexNormals.length; j < jl; j++) {
                face.vertexNormals[j].applyMatrix3(normalMatrix).normalize();
            }
        }
        if (this.boundingBox !== null) {
            this.computeBoundingBox();
        }
        if (this.boundingSphere !== null) {
            this.computeBoundingSphere();
        }
        this.verticesNeedUpdate = true;
        this.normalsNeedUpdate = true;
        return this;
    }

    public rotateX(angle: number): this {
        return this.applyMatrix(new Matrix4().makeRotationX(angle));
    }

    public rotateY(angle: number): this {
        return this.applyMatrix(new Matrix4().makeRotationY(angle));
    }

    public rotateZ(angle: number): this {
        return this.applyMatrix(new Matrix4().makeRotationZ(angle));
    }

    public translate(x: number, y: number, z: number): this {
        return this.applyMatrix(new Matrix4().makeTranslation(x, y, z));
    }

    public scale(x: number, y: number, z: number): this {
        return this.applyMatrix(new Matrix4().makeScale(x, y, z));
    }

    public lookAt(vector: Vector3): this {
        return this.applyMatrix(new Object3D().lookAt(vector).matrix);
    }

    public fromBufferGeometry(geometry: BufferGeometry): this {
        const indices: TypedArray = geometry.index !== null ? geometry.index.array : undefined;
        const attributes: { [key: string]: BufferAttribute; } = geometry.attributes;
        const positions: TypedArray = attributes.position.array;
        const normals: TypedArray = attributes.normal !== undefined ? attributes.normal.array : undefined;
        const colors: TypedArray = attributes.color !== undefined ? attributes.color.array : undefined;
        const uvs: TypedArray = attributes.uv !== undefined ? attributes.uv.array : undefined;
        const uvs2: TypedArray = attributes.uv2 !== undefined ? attributes.uv2.array : undefined;

        if (uvs2 !== undefined) this.faceVertexUvs[1] = [];
        const tempNormals: Array<Vector3> = [];
        const tempUVs: Array<Vector2> = [];
        const tempUVs2: Array<Vector2> = [];

        for (let i: number = 0, j: number = 0; i < positions.length; i += 3, j += 2) {
            this.vertices.push(new Vector3(positions[i], positions[i + 1], positions[i + 2]));
            if (normals !== undefined) {
                tempNormals.push(new Vector3(normals[i], normals[i + 1], normals[i + 2]));
            }
            if (colors !== undefined) {
                this.colors.push(new Color(colors[i], colors[i + 1], colors[i + 2]));
            }
            if (uvs !== undefined) {
                tempUVs.push(new Vector2(uvs[j], uvs[j + 1]));
            }
            if (uvs2 !== undefined) {
                tempUVs2.push(new Vector2(uvs2[j], uvs2[j + 1]));
            }
        }
        const addFace = (a: number, b: number, c: number, materialIndex?: number): void => {
            const vertexNormals: Array<Vector3> = normals !== undefined ? [tempNormals[a].clone(), tempNormals[b].clone(), tempNormals[c].clone()] : [];
            const vertexColors: Array<Color> = colors !== undefined ? [this.colors[a].clone(), this.colors[b].clone(), this.colors[c].clone()] : [];
            const face: Face3 = new Face3(a, b, c, vertexNormals, vertexColors, materialIndex);
            this.faces.push(face);
            if (uvs !== undefined) {
                this.faceVertexUvs[0].push([tempUVs[a].clone(), tempUVs[b].clone(), tempUVs[c].clone()]);
            }
            if (uvs2 !== undefined) {
                this.faceVertexUvs[1].push([tempUVs2[a].clone(), tempUVs2[b].clone(), tempUVs2[c].clone()]);
            }
        };

        const groups: Array<Group> = geometry.groups;
        if (groups.length > 0) {
            for (let i: number = 0; i < groups.length; i++) {
                const group: Group = groups[i];
                const start: number = group.start;
                const count: number = group.count;
                for (let j: number = start, jl: number = start + count; j < jl; j += 3) {
                    if (indices !== undefined) {
                        addFace(indices[j], indices[j + 1], indices[j + 2], group.materialIndex);
                    } else {
                        addFace(j, j + 1, j + 2, group.materialIndex);
                    }
                }
            }
        } else {
            if (indices !== undefined) {
                for (let i: number = 0; i < indices.length; i += 3) {
                    addFace(indices[i], indices[i + 1], indices[i + 2]);
                }
            } else {
                for (let i: number = 0; i < positions.length / 3; i += 3) {
                    addFace(i, i + 1, i + 2);
                }
            }
        }
        this.computeFaceNormals();
        if (geometry.boundingBox !== null) {
            this.boundingBox = geometry.boundingBox.clone();
        }
        if (geometry.boundingSphere !== null) {
            this.boundingSphere = geometry.boundingSphere.clone();
        }
        return this;
    }

    public center(): Vector3 {
        this.computeBoundingBox();
        const offset: Vector3 = this.boundingBox.getCenter().negate();
        this.translate(offset.x, offset.y, offset.z);
        return offset;
    }

    public normalize(): this {
        this.computeBoundingSphere();
        const center: Vector3 = this.boundingSphere.center;
        const radius: number = this.boundingSphere.radius;
        const s: number = radius === 0 ? 1 : 1.0 / radius;
        const matrix: Matrix4 = new Matrix4();
        matrix.set(
            s, 0, 0, -s * center.x,
            0, s, 0, -s * center.y,
            0, 0, s, -s * center.z,
            0, 0, 0, 1
        );
        return this.applyMatrix(matrix);
    }

    public computeFaceNormals(): this {
        const cb: Vector3 = new Vector3(), ab: Vector3 = new Vector3();
        for (let f: number = 0, fl: number = this.faces.length; f < fl; f++) {
            const face: GeometryFace = this.faces[f];
            const vA: Vector3 = this.vertices[face.a];
            const vB: Vector3 = this.vertices[face.b];
            const vC: Vector3 = this.vertices[face.c];
            cb.copy(vC).sub(vB);
            ab.copy(vA).sub(vB);
            cb.cross(ab);
            cb.normalize();
            face.normal.copy(cb);
        }
        return this;
    }

    public computeVertexNormals(areaWeighted: boolean = true): this {
        const vertices: Array<Vector3> = new Array(this.vertices.length);
        for (let v: number = 0, vl: number = this.vertices.length; v < vl; v++) {
            vertices[v] = new Vector3();
        }
        if (areaWeighted) {
            // vertex normals weighted by triangle areas
            // http://www.iquilezles.org/www/articles/normals/normals.htm
            for (let f: number = 0, fl: number = this.faces.length; f < fl; f++) {
                const face: GeometryFace = this.faces[f];
                const vA: Vector3 = this.vertices[face.a];
                const vB: Vector3 = this.vertices[face.b];
                const vC: Vector3 = this.vertices[face.c];
                const cb: Vector3 = new Vector3().copy(vC).sub(vB);
                const ab: Vector3 = new Vector3().copy(vA).sub(vB);
                cb.cross(ab);
                vertices[face.a].add(cb);
                vertices[face.b].add(cb);
                vertices[face.c].add(cb);
            }
        } else {
            this.computeFaceNormals();
            for (let f: number = 0, fl: number = this.faces.length; f < fl; f++) {
                const face: GeometryFace = this.faces[f];
                vertices[face.a].add(face.normal);
                vertices[face.b].add(face.normal);
                vertices[face.c].add(face.normal);
            }
        }
        for (let v: number = 0, vl: number = this.vertices.length; v < vl; v++) {
            vertices[v].normalize();
        }
        for (let f: number = 0, fl: number = this.faces.length; f < fl; f++) {
            const face: GeometryFace = this.faces[f];
            const vertexNormals: Array<Vector3> = face.vertexNormals;
            if (vertexNormals.length === 3) {
                vertexNormals[0].copy(vertices[face.a]);
                vertexNormals[1].copy(vertices[face.b]);
                vertexNormals[2].copy(vertices[face.c]);
            } else {
                vertexNormals[0] = vertices[face.a].clone();
                vertexNormals[1] = vertices[face.b].clone();
                vertexNormals[2] = vertices[face.c].clone();
            }
        }
        if (this.faces.length > 0) {
            this.normalsNeedUpdate = true;
        }
        return this;
    }

    public computeFlatVertexNormals(): this {
        this.computeFaceNormals();
        for (let f: number = 0, fl: number = this.faces.length; f < fl; f++) {
            const face: GeometryFace = this.faces[f];
            const vertexNormals: Array<Vector3> = face.vertexNormals;
            if (vertexNormals.length === 3) {
                vertexNormals[0].copy(face.normal);
                vertexNormals[1].copy(face.normal);
                vertexNormals[2].copy(face.normal);
            } else {
                vertexNormals[0] = face.normal.clone();
                vertexNormals[1] = face.normal.clone();
                vertexNormals[2] = face.normal.clone();
            }
        }
        if (this.faces.length > 0) {
            this.normalsNeedUpdate = true;
        }
        return this;
    }

    public computeMorphNormals(): this {
        // save original normals
        // - create temp variables on first access
        //   otherwise just copy (for faster repeated calls)

        for (let f: number = 0, fl: number = this.faces.length; f < fl; f++) {
            const face = this.faces[f];
            if (!face.originalFaceNormal) {
                face.originalFaceNormal = face.normal.clone();
            } else {
                face.originalFaceNormal.copy(face.normal);
            }
            if (!face.originalVertexNormals) face.originalVertexNormals = [];
            for (let i: number = 0, il: number = face.vertexNormals.length; i < il; i++) {
                if (!face.originalVertexNormals[i]) {
                    face.originalVertexNormals[i] = face.vertexNormals[i].clone();
                } else {
                    face.originalVertexNormals[i].copy(face.vertexNormals[i]);
                }
            }
        }

        // use temp geometry to compute face and vertex normals for each morph

        const tmpGeo: Geometry = new Geometry();
        tmpGeo.faces = this.faces;

        for (let i: number = 0, il: number = this.morphTargets.length; i < il; i++) {
            // create on first access
            if (!this.morphNormals[i]) {
                this.morphNormals[i] = {
                    faceNormals: [],
                    vertexNormals: []
                };
                for (let f: number = 0, fl: number = this.faces.length; f < fl; f++) {
                    this.morphNormals[i].faceNormals.push(new Vector3());
                    this.morphNormals[i].vertexNormals.push(new Triangle());
                }
            }
            const morphNormals: MorphNormal = this.morphNormals[i];
            // set vertices to morph target
            tmpGeo.vertices = this.morphTargets[i].vertices;
            // compute morph normals
            tmpGeo.computeFaceNormals();
            tmpGeo.computeVertexNormals();
            // store morph normals
            for (let f: number = 0, fl: number = this.faces.length; f < fl; f++) {
                const face: GeometryFace = this.faces[f];
                const faceNormal = morphNormals.faceNormals[f];
                const vertexNormals = morphNormals.vertexNormals[f];
                faceNormal.copy(face.normal);
                vertexNormals.a.copy(face.vertexNormals[0]);
                vertexNormals.b.copy(face.vertexNormals[1]);
                vertexNormals.c.copy(face.vertexNormals[2]);
            }
        }

        // restore original normals
        for (let f: number = 0, fl: number = this.faces.length; f < fl; f++) {
            const face: GeometryFace = this.faces[f];
            face.normal = face.originalFaceNormal;
            face.vertexNormals = face.originalVertexNormals;
        }
        return this;
    }

    public computeLineDistances(): this {
        let d: number = 0;
        const vertices: Array<Vector3> = this.vertices;
        for (let i: number = 0, il: number = vertices.length; i < il; i++) {
            if (i > 0) {
                d += vertices[i].distanceTo(vertices[i - 1]);
            }
            this.lineDistances[i] = d;
        }
        return this;
    }

    public computeBoundingBox(): this {
        if (this.boundingBox === null) {
            this.boundingBox = new Box3();
        }
        this.boundingBox.setFromPoints(this.vertices);
        return this;
    }

    public computeBoundingSphere(): this {
        if (this.boundingSphere === null) {
            this.boundingSphere = new Sphere();
        }
        this.boundingSphere.setFromPoints(this.vertices);
        return this;
    }

    public merge(geometry: Geometry, matrix?: Matrix4, materialIndexOffset: number = 0): this {
        let normalMatrix: Matrix3;
        const vertexOffset: number = this.vertices.length,
            thisVertices = this.vertices,
            thatVertices = geometry.vertices,
            thisFaces = this.faces,
            thatFaces = geometry.faces,
            thisUvs = this.faceVertexUvs[0],
            thatUvs = geometry.faceVertexUvs[0],
            thisColors = this.colors,
            thatColors = geometry.colors;
        if (matrix !== undefined) normalMatrix = new Matrix3().getNormalMatrix(matrix);
        // vertices
        for (let i: number = 0, il: number = thatVertices.length; i < il; i++) {
            const vertexCopy: Vector3 = thatVertices[i].clone();
            if (matrix !== undefined) vertexCopy.applyMatrix4(matrix);
            thisVertices.push(vertexCopy);
        }
        // colors
        for (let i: number = 0, il: number = thatColors.length; i < il; i++) {
            thisColors.push(thatColors[i].clone());
        }
        // faces
        for (let i: number = 0, il: number = thatFaces.length; i < il; i++) {
            const face: GeometryFace = thatFaces[i],
                faceVertexNormals = face.vertexNormals,
                faceVertexColors = face.vertexColors;
            const faceCopy = new GeometryFace(face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset);
            faceCopy.normal.copy(face.normal);
            if (normalMatrix !== undefined) {
                faceCopy.normal.applyMatrix3(normalMatrix).normalize();
            }
            for (let j: number = 0, jl: number = faceVertexNormals.length; j < jl; j++) {
                const normal: Vector3 = faceVertexNormals[j].clone();
                if (normalMatrix !== undefined) {
                    normal.applyMatrix3(normalMatrix).normalize();
                }
                faceCopy.vertexNormals.push(normal);
            }
            faceCopy.color.copy(face.color);
            for (let j: number = 0, jl = faceVertexColors.length; j < jl; j++) {
                const color: Color = faceVertexColors[j];
                faceCopy.vertexColors.push(color.clone());
            }
            faceCopy.materialIndex = face.materialIndex + materialIndexOffset;
            thisFaces.push(faceCopy);
        }
        // uvs
        for (let i: number = 0, il: number = thatUvs.length; i < il; i++) {
            const uv = thatUvs[i], uvCopy = [];
            if (uv === undefined) {
                continue;
            }
            for (let j: number = 0, jl: number = uv.length; j < jl; j++) {
                uvCopy.push(uv[j].clone());
            }
            thisUvs.push(uvCopy);
        }
        return this;
    }

    //TODO mergeMesh

    /**
     * Checks for duplicate vertices with hashmap.
     * Duplicated vertices are removed
     * and faces' vertices are updated.
     * @returns {number}
     */
    public mergeVertices(): number {
        /**
         * Hashmap for looking up vertices by position coordinates (and making sure they are unique)
         * @type {{}}
         */
        const verticesMap: { [key: string]: number; } = {};
        const unique: Array<Vector3> = [], changes: Array<number> = [];

        /**
         * number of decimal points, e.g. 4 for epsilon of 0.0001
         * @type {number}
         */
        const precisionPoints: number = 4;
        const precision: number = Math.pow(10, precisionPoints);

        for (let i: number = 0, il: number = this.vertices.length; i < il; i++) {
            const v = this.vertices[i];
            const key: string = [
                Math.round(v.x * precision),
                Math.round(v.y * precision),
                Math.round(v.z * precision)
            ].join("_");

            if (verticesMap[key] === undefined) {
                verticesMap[key] = i;
                unique.push(this.vertices[i]);
                changes[i] = unique.length - 1;
            } else {
                //console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
                changes[i] = changes[verticesMap[key]];
            }
        }

        // if faces are completely degenerate after merging vertices, we
        // have to remove them from the geometry.
        const faceIndicesToRemove: Array<number> = [];
        for (let i: number = 0, il: number = this.faces.length; i < il; i++) {
            const face: GeometryFace = this.faces[i];
            face.a = changes[face.a];
            face.b = changes[face.b];
            face.c = changes[face.c];
            const indices = [face.a, face.b, face.c];
            // if any duplicate vertices are found in a Face3
            // we have to remove the face as nothing can be saved
            for (let n: number = 0; n < 3; n++) {
                if (indices[n] === indices[( n + 1 ) % 3]) {
                    faceIndicesToRemove.push(i);
                    break;
                }
            }

        }
        for (let i: number = faceIndicesToRemove.length - 1; i >= 0; i--) {
            const idx: number = faceIndicesToRemove[i];
            this.faces.splice(idx, 1);
            for (let j: number = 0, jl: number = this.faceVertexUvs.length; j < jl; j++) {
                this.faceVertexUvs[j].splice(idx, 1);
            }
        }
        // Use unique set of vertices
        const diff: number = this.vertices.length - unique.length;
        this.vertices = unique;
        return diff;
    }

    public setFromPoints(points: Array<Vector3>): this {
        this.vertices = [];
        for (let i: number = 0, l: number = points.length; i < l; i++) {
            const point: Vector3 = points[i];
            this.vertices.push(new Vector3(point.x, point.y, point.z || 0));
        }
        return this;
    }

    public sortFacesByMaterialIndex(): this {
        const faces: Array<GeometryFace> = this.faces;
        const length: number = faces.length;
        // tag faces
        for (let i: number = 0; i < length; i++) {
            faces[i].id = i;
        }
        // sort faces
        faces.sort((a: GeometryFace, b: GeometryFace): number => {
            return a.materialIndex - b.materialIndex;
        });
        // sort uvs
        const uvs1: Array<Array<Vector2>> = this.faceVertexUvs[0];
        const uvs2: Array<Array<Vector2>> = this.faceVertexUvs[1];

        let newUvs1: Array<Array<Vector2>>, newUvs2: Array<Array<Vector2>>;
        if (uvs1 && uvs1.length === length) newUvs1 = [];
        if (uvs2 && uvs2.length === length) newUvs2 = [];
        for (let i: number = 0; i < length; i++) {
            const id: number = faces[i].id;
            if (newUvs1) newUvs1.push(uvs1[id]);
            if (newUvs2) newUvs2.push(uvs2[id]);
        }
        if (newUvs1) this.faceVertexUvs[0] = newUvs1;
        if (newUvs2) this.faceVertexUvs[1] = newUvs2;
        return this;
    }

    public copy(source: Geometry): this {
        // reset
        this.vertices = [];
        this.colors = [];
        this.faces = [];
        this.faceVertexUvs = [[]];
        this.morphTargets = [];
        this.morphNormals = [];
        this.skinWeights = [];
        this.skinIndices = [];
        this.lineDistances = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        // name
        this.name = source.name;
        // vertices
        const vertices: Array<Vector3> = source.vertices;
        for (let i: number = 0, il: number = vertices.length; i < il; i++) {
            this.vertices.push(vertices[i].clone());
        }
        // colors
        const colors: Array<Color> = source.colors;
        for (let i: number = 0, il: number = colors.length; i < il; i++) {
            this.colors.push(colors[i].clone());
        }
        // faces
        const faces: Array<GeometryFace> = source.faces;
        for (let i: number = 0, il: number = faces.length; i < il; i++) {
            this.faces.push(faces[i].clone() as GeometryFace);
        }
        // face vertex uvs
        for (let i: number = 0, il: number = source.faceVertexUvs.length; i < il; i++) {
            const faceVertexUvs: Array<Array<Vector2>> = source.faceVertexUvs[i];
            if (this.faceVertexUvs[i] === undefined) {
                this.faceVertexUvs[i] = [];
            }
            for (let j: number = 0, jl: number = faceVertexUvs.length; j < jl; j++) {
                const uvs: Array<Vector2> = faceVertexUvs[j];
                const uvsCopy: Array<Vector2> = [];
                for (let k: number = 0, kl: number = uvs.length; k < kl; k++) {
                    uvsCopy.push(uvs[k].clone());
                }
                this.faceVertexUvs[i].push(uvsCopy);
            }
        }

        // morph targets
        const morphTargets: Array<MorphTarget> = source.morphTargets;
        for (let i: number = 0, il: number = morphTargets.length; i < il; i++) {
            const morphTarget: MorphTarget = {name: morphTargets[i].name};
            // vertices
            if (morphTargets[i].vertices !== undefined) {
                morphTarget.vertices = [];
                for (let j: number = 0, jl: number = morphTargets[i].vertices.length; j < jl; j++) {
                    morphTarget.vertices.push(morphTargets[i].vertices[j].clone());
                }
            }
            // normals
            if (morphTargets[i].normals !== undefined) {
                morphTarget.normals = [];
                for (let j: number = 0, jl: number = morphTargets[i].normals.length; j < jl; j++) {
                    morphTarget.normals.push(morphTargets[i].normals[j].clone());
                }
            }
            this.morphTargets.push(morphTarget);
        }
        // morph normals
        const morphNormals: Array<MorphNormal> = source.morphNormals;
        for (let i: number = 0, il: number = morphNormals.length; i < il; i++) {
            const morphNormal: MorphNormal = {};
            // vertex normals
            if (morphNormals[i].vertexNormals !== undefined) {
                morphNormal.vertexNormals = [];
                for (let j: number = 0, jl: number = morphNormals[i].vertexNormals.length; j < jl; j++) {
                    morphNormal.vertexNormals.push(morphNormals[i].vertexNormals[j].clone());
                }
            }
            // face normals
            if (morphNormals[i].faceNormals !== undefined) {
                morphNormal.faceNormals = [];
                for (let j: number = 0, jl: number = morphNormals[i].faceNormals.length; j < jl; j++) {
                    morphNormal.faceNormals.push(morphNormals[i].faceNormals[j].clone());
                }
            }
            this.morphNormals.push(morphNormal);

        }
        // skin weights
        const skinWeights: Array<Vector4> = source.skinWeights;
        for (let i: number = 0, il: number = skinWeights.length; i < il; i++) {
            this.skinWeights.push(skinWeights[i].clone());
        }
        // skin indices
        const skinIndices: Array<Vector4> = source.skinIndices;
        for (let i: number = 0, il: number = skinIndices.length; i < il; i++) {
            this.skinIndices.push(skinIndices[i].clone());
        }
        // line distances
        const lineDistances: Array<number> = source.lineDistances;
        for (let i: number = 0, il: number = lineDistances.length; i < il; i++) {
            this.lineDistances.push(lineDistances[i]);
        }
        // bounding box
        const boundingBox = source.boundingBox;
        if (boundingBox !== null) {
            this.boundingBox = boundingBox.clone();
        }
        // bounding sphere
        const boundingSphere = source.boundingSphere;
        if (boundingSphere !== null) {
            this.boundingSphere = boundingSphere.clone();
        }
        // update flags
        this.elementsNeedUpdate = source.elementsNeedUpdate;
        this.verticesNeedUpdate = source.verticesNeedUpdate;
        this.uvsNeedUpdate = source.uvsNeedUpdate;
        this.normalsNeedUpdate = source.normalsNeedUpdate;
        this.colorsNeedUpdate = source.colorsNeedUpdate;
        this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
        this.groupsNeedUpdate = source.groupsNeedUpdate;
        return this;
    }

    public clone(): Geometry {
        return (new (this.constructor as () => void)() as Geometry).copy(this);
    }
}