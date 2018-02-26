import { Box3 } from "../math/Box3";
import { Color } from "../math/Color";
import { MathUtil } from "../math/Math";
import { Matrix3 } from "../math/Matrix3";
import { Matrix4 } from "../math/Matrix4";
import { Sphere } from "../math/Sphere";
import { Triangle } from "../math/Triangle";
import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { EventDispatcher } from "./EventDispatcher";
import { Face3 } from "./Face3";
import { Object3D } from "./Object3D";
export class GeometryFace extends Face3 {
}
let geometryId = 0;
export class Geometry extends EventDispatcher {
    constructor() {
        super(...arguments);
        /**
         * Used in WebGLGeometries
         * @type {BufferGeometry}
         */
        this.bufferGeometry = null;
        this.id = (geometryId += 2);
        this.uuid = MathUtil.generateUUID();
        this.name = "";
        this.type = "Geometry";
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
        this.elementsNeedUpdate = false;
        this.verticesNeedUpdate = false;
        this.uvsNeedUpdate = false;
        this.normalsNeedUpdate = false;
        this.colorsNeedUpdate = false;
        this.lineDistancesNeedUpdate = false;
        this.groupsNeedUpdate = false;
    }
    applyMatrix(matrix) {
        const normalMatrix = new Matrix3().getNormalMatrix(matrix);
        for (let i = 0, il = this.vertices.length; i < il; i++) {
            this.vertices[i].applyMatrix4(matrix);
        }
        for (let i = 0, il = this.faces.length; i < il; i++) {
            const face = this.faces[i];
            face.normal.applyMatrix3(normalMatrix).normalize();
            for (let j = 0, jl = face.vertexNormals.length; j < jl; j++) {
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
    rotateX(angle) {
        return this.applyMatrix(new Matrix4().makeRotationX(angle));
    }
    rotateY(angle) {
        return this.applyMatrix(new Matrix4().makeRotationY(angle));
    }
    rotateZ(angle) {
        return this.applyMatrix(new Matrix4().makeRotationZ(angle));
    }
    translate(x, y, z) {
        return this.applyMatrix(new Matrix4().makeTranslation(x, y, z));
    }
    scale(x, y, z) {
        return this.applyMatrix(new Matrix4().makeScale(x, y, z));
    }
    lookAt(vector) {
        const obj = new Object3D().lookAt(vector);
        obj.updateMatrix();
        return this.applyMatrix(obj.matrix);
    }
    fromBufferGeometry(geometry) {
        const indices = geometry.index !== null ? geometry.index.array : undefined;
        const attributes = geometry.attributes;
        const positions = attributes.position.array;
        const normals = attributes.normal !== undefined
            ? attributes.normal.array
            : undefined;
        const colors = attributes.color !== undefined ? attributes.color.array : undefined;
        const uvs = attributes.uv !== undefined ? attributes.uv.array : undefined;
        const uvs2 = attributes.uv2 !== undefined ? attributes.uv2.array : undefined;
        if (uvs2 !== undefined)
            this.faceVertexUvs[1] = [];
        const tempNormals = [];
        const tempUVs = [];
        const tempUVs2 = [];
        for (let i = 0, j = 0; i < positions.length; i += 3, j += 2) {
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
        const addFace = (a, b, c, materialIndex) => {
            const vertexNormals = normals !== undefined
                ? [
                    tempNormals[a].clone(),
                    tempNormals[b].clone(),
                    tempNormals[c].clone(),
                ]
                : [];
            const vertexColors = colors !== undefined
                ? [
                    this.colors[a].clone(),
                    this.colors[b].clone(),
                    this.colors[c].clone(),
                ]
                : [];
            const face = new Face3(a, b, c, vertexNormals, vertexColors, materialIndex);
            this.faces.push(face);
            if (uvs !== undefined) {
                this.faceVertexUvs[0].push([
                    tempUVs[a].clone(),
                    tempUVs[b].clone(),
                    tempUVs[c].clone(),
                ]);
            }
            if (uvs2 !== undefined) {
                this.faceVertexUvs[1].push([
                    tempUVs2[a].clone(),
                    tempUVs2[b].clone(),
                    tempUVs2[c].clone(),
                ]);
            }
        };
        const groups = geometry.groups;
        if (groups.length > 0) {
            for (let i = 0; i < groups.length; i++) {
                const group = groups[i];
                const start = group.start;
                const count = group.count;
                for (let j = start, jl = start + count; j < jl; j += 3) {
                    if (indices !== undefined) {
                        addFace(indices[j], indices[j + 1], indices[j + 2], group.materialIndex);
                    }
                    else {
                        addFace(j, j + 1, j + 2, group.materialIndex);
                    }
                }
            }
        }
        else {
            if (indices !== undefined) {
                for (let i = 0; i < indices.length; i += 3) {
                    addFace(indices[i], indices[i + 1], indices[i + 2]);
                }
            }
            else {
                for (let i = 0; i < positions.length / 3; i += 3) {
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
    center() {
        this.computeBoundingBox();
        const offset = this.boundingBox.getCenter().negate();
        this.translate(offset.x, offset.y, offset.z);
        return offset;
    }
    normalize() {
        this.computeBoundingSphere();
        const center = this.boundingSphere.center;
        const radius = this.boundingSphere.radius;
        const s = radius === 0 ? 1 : 1.0 / radius;
        const matrix = new Matrix4();
        matrix.set(s, 0, 0, -s * center.x, 0, s, 0, -s * center.y, 0, 0, s, -s * center.z, 0, 0, 0, 1);
        return this.applyMatrix(matrix);
    }
    computeFaceNormals() {
        const cb = new Vector3(), ab = new Vector3();
        for (let f = 0, fl = this.faces.length; f < fl; f++) {
            const face = this.faces[f];
            const vA = this.vertices[face.a];
            const vB = this.vertices[face.b];
            const vC = this.vertices[face.c];
            cb.copy(vC).sub(vB);
            ab.copy(vA).sub(vB);
            cb.cross(ab);
            cb.normalize();
            face.normal.copy(cb);
        }
        return this;
    }
    computeVertexNormals(areaWeighted = true) {
        const vertices = new Array(this.vertices.length);
        for (let v = 0, vl = this.vertices.length; v < vl; v++) {
            vertices[v] = new Vector3();
        }
        if (areaWeighted) {
            // vertex normals weighted by triangle areas
            // http://www.iquilezles.org/www/articles/normals/normals.htm
            for (let f = 0, fl = this.faces.length; f < fl; f++) {
                const face = this.faces[f];
                const vA = this.vertices[face.a];
                const vB = this.vertices[face.b];
                const vC = this.vertices[face.c];
                const cb = new Vector3().copy(vC).sub(vB);
                const ab = new Vector3().copy(vA).sub(vB);
                cb.cross(ab);
                vertices[face.a].add(cb);
                vertices[face.b].add(cb);
                vertices[face.c].add(cb);
            }
        }
        else {
            this.computeFaceNormals();
            for (let f = 0, fl = this.faces.length; f < fl; f++) {
                const face = this.faces[f];
                vertices[face.a].add(face.normal);
                vertices[face.b].add(face.normal);
                vertices[face.c].add(face.normal);
            }
        }
        for (let v = 0, vl = this.vertices.length; v < vl; v++) {
            vertices[v].normalize();
        }
        for (let f = 0, fl = this.faces.length; f < fl; f++) {
            const face = this.faces[f];
            const vertexNormals = face.vertexNormals;
            if (vertexNormals.length === 3) {
                vertexNormals[0].copy(vertices[face.a]);
                vertexNormals[1].copy(vertices[face.b]);
                vertexNormals[2].copy(vertices[face.c]);
            }
            else {
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
    computeFlatVertexNormals() {
        this.computeFaceNormals();
        for (let f = 0, fl = this.faces.length; f < fl; f++) {
            const face = this.faces[f];
            const vertexNormals = face.vertexNormals;
            if (vertexNormals.length === 3) {
                vertexNormals[0].copy(face.normal);
                vertexNormals[1].copy(face.normal);
                vertexNormals[2].copy(face.normal);
            }
            else {
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
    computeMorphNormals() {
        // save original normals
        // - create temp variables on first access
        //   otherwise just copy (for faster repeated calls)
        for (let f = 0, fl = this.faces.length; f < fl; f++) {
            const face = this.faces[f];
            if (!face.originalFaceNormal) {
                face.originalFaceNormal = face.normal.clone();
            }
            else {
                face.originalFaceNormal.copy(face.normal);
            }
            if (!face.originalVertexNormals)
                face.originalVertexNormals = [];
            for (let i = 0, il = face.vertexNormals.length; i < il; i++) {
                if (!face.originalVertexNormals[i]) {
                    face.originalVertexNormals[i] = face.vertexNormals[i].clone();
                }
                else {
                    face.originalVertexNormals[i].copy(face.vertexNormals[i]);
                }
            }
        }
        // use temp geometry to compute face and vertex normals for each morph
        const tmpGeo = new Geometry();
        tmpGeo.faces = this.faces;
        for (let i = 0, il = this.morphTargets.length; i < il; i++) {
            // create on first access
            if (!this.morphNormals[i]) {
                this.morphNormals[i] = {
                    faceNormals: [],
                    vertexNormals: [],
                };
                for (let f = 0, fl = this.faces.length; f < fl; f++) {
                    this.morphNormals[i].faceNormals.push(new Vector3());
                    this.morphNormals[i].vertexNormals.push(new Triangle());
                }
            }
            const morphNormals = this.morphNormals[i];
            // set vertices to morph target
            tmpGeo.vertices = this.morphTargets[i].vertices;
            // compute morph normals
            tmpGeo.computeFaceNormals();
            tmpGeo.computeVertexNormals();
            // store morph normals
            for (let f = 0, fl = this.faces.length; f < fl; f++) {
                const face = this.faces[f];
                const faceNormal = morphNormals.faceNormals[f];
                const vertexNormals = morphNormals.vertexNormals[f];
                faceNormal.copy(face.normal);
                vertexNormals.a.copy(face.vertexNormals[0]);
                vertexNormals.b.copy(face.vertexNormals[1]);
                vertexNormals.c.copy(face.vertexNormals[2]);
            }
        }
        // restore original normals
        for (let f = 0, fl = this.faces.length; f < fl; f++) {
            const face = this.faces[f];
            face.normal = face.originalFaceNormal;
            face.vertexNormals = face.originalVertexNormals;
        }
        return this;
    }
    computeLineDistances() {
        let d = 0;
        const vertices = this.vertices;
        for (let i = 0, il = vertices.length; i < il; i++) {
            if (i > 0) {
                d += vertices[i].distanceTo(vertices[i - 1]);
            }
            this.lineDistances[i] = d;
        }
        return this;
    }
    computeBoundingBox() {
        if (this.boundingBox === null) {
            this.boundingBox = new Box3();
        }
        this.boundingBox.setFromPoints(this.vertices);
        return this;
    }
    computeBoundingSphere() {
        if (this.boundingSphere === null) {
            this.boundingSphere = new Sphere();
        }
        this.boundingSphere.setFromPoints(this.vertices);
        return this;
    }
    merge(geometry, matrix, materialIndexOffset = 0) {
        let normalMatrix;
        const vertexOffset = this.vertices.length, thisVertices = this.vertices, thatVertices = geometry.vertices, thisFaces = this.faces, thatFaces = geometry.faces, thisUvs = this.faceVertexUvs[0], thatUvs = geometry.faceVertexUvs[0], thisColors = this.colors, thatColors = geometry.colors;
        if (matrix !== undefined) {
            normalMatrix = new Matrix3().getNormalMatrix(matrix);
        }
        // vertices
        for (let i = 0, il = thatVertices.length; i < il; i++) {
            const vertexCopy = thatVertices[i].clone();
            if (matrix !== undefined)
                vertexCopy.applyMatrix4(matrix);
            thisVertices.push(vertexCopy);
        }
        // colors
        for (let i = 0, il = thatColors.length; i < il; i++) {
            thisColors.push(thatColors[i].clone());
        }
        // faces
        for (let i = 0, il = thatFaces.length; i < il; i++) {
            const face = thatFaces[i], faceVertexNormals = face.vertexNormals, faceVertexColors = face.vertexColors;
            const faceCopy = new GeometryFace(face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset);
            faceCopy.normal.copy(face.normal);
            if (normalMatrix !== undefined) {
                faceCopy.normal.applyMatrix3(normalMatrix).normalize();
            }
            for (let j = 0, jl = faceVertexNormals.length; j < jl; j++) {
                const normal = faceVertexNormals[j].clone();
                if (normalMatrix !== undefined) {
                    normal.applyMatrix3(normalMatrix).normalize();
                }
                faceCopy.vertexNormals.push(normal);
            }
            faceCopy.color.copy(face.color);
            for (let j = 0, jl = faceVertexColors.length; j < jl; j++) {
                const color = faceVertexColors[j];
                faceCopy.vertexColors.push(color.clone());
            }
            faceCopy.materialIndex = face.materialIndex + materialIndexOffset;
            thisFaces.push(faceCopy);
        }
        // uvs
        for (let i = 0, il = thatUvs.length; i < il; i++) {
            const uv = thatUvs[i], uvCopy = [];
            if (uv === undefined) {
                continue;
            }
            for (let j = 0, jl = uv.length; j < jl; j++) {
                uvCopy.push(uv[j].clone());
            }
            thisUvs.push(uvCopy);
        }
        return this;
    }
    mergeMesh(mesh) {
        if (mesh.geometry instanceof Geometry) {
            if (mesh.matrixAutoUpdate) {
                mesh.updateMatrix();
            }
            this.merge(mesh.geometry, mesh.matrix);
        }
        else {
            console.error(`THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.`, mesh.geometry);
        }
    }
    /**
     * Checks for duplicate vertices with hashmap.
     * Duplicated vertices are removed
     * and faces' vertices are updated.
     * @returns {number}
     */
    mergeVertices() {
        /**
         * Hashmap for looking up vertices by position coordinates (and making sure they are unique)
         * @type {{}}
         */
        const verticesMap = {};
        const unique = [], changes = [];
        /**
         * number of decimal points, e.g. 4 for epsilon of 0.0001
         * @type {number}
         */
        const precisionPoints = 4;
        const precision = Math.pow(10, precisionPoints);
        for (let i = 0, il = this.vertices.length; i < il; i++) {
            const v = this.vertices[i];
            const key = [
                Math.round(v.x * precision),
                Math.round(v.y * precision),
                Math.round(v.z * precision),
            ].join("_");
            if (verticesMap[key] === undefined) {
                verticesMap[key] = i;
                unique.push(this.vertices[i]);
                changes[i] = unique.length - 1;
            }
            else {
                // console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
                changes[i] = changes[verticesMap[key]];
            }
        }
        // if faces are completely degenerate after merging vertices, we
        // have to remove them from the geometry.
        const faceIndicesToRemove = [];
        for (let i = 0, il = this.faces.length; i < il; i++) {
            const face = this.faces[i];
            face.a = changes[face.a];
            face.b = changes[face.b];
            face.c = changes[face.c];
            const indices = [face.a, face.b, face.c];
            // if any duplicate vertices are found in a Face3
            // we have to remove the face as nothing can be saved
            for (let n = 0; n < 3; n++) {
                if (indices[n] === indices[(n + 1) % 3]) {
                    faceIndicesToRemove.push(i);
                    break;
                }
            }
        }
        for (let i = faceIndicesToRemove.length - 1; i >= 0; i--) {
            const idx = faceIndicesToRemove[i];
            this.faces.splice(idx, 1);
            for (let j = 0, jl = this.faceVertexUvs.length; j < jl; j++) {
                this.faceVertexUvs[j].splice(idx, 1);
            }
        }
        // Use unique set of vertices
        const diff = this.vertices.length - unique.length;
        this.vertices = unique;
        return diff;
    }
    setFromPoints(points) {
        this.vertices = [];
        for (let i = 0, l = points.length; i < l; i++) {
            const point = points[i];
            this.vertices.push(new Vector3(point.x, point.y, point.z || 0));
        }
        return this;
    }
    sortFacesByMaterialIndex() {
        const faces = this.faces;
        const length = faces.length;
        // tag faces
        for (let i = 0; i < length; i++) {
            faces[i].id = i;
        }
        // sort faces
        faces.sort((a, b) => {
            return a.materialIndex - b.materialIndex;
        });
        // sort uvs
        const uvs1 = this.faceVertexUvs[0];
        const uvs2 = this.faceVertexUvs[1];
        let newUvs1, newUvs2;
        if (uvs1 && uvs1.length === length)
            newUvs1 = [];
        if (uvs2 && uvs2.length === length)
            newUvs2 = [];
        for (let i = 0; i < length; i++) {
            const id = faces[i].id;
            if (newUvs1)
                newUvs1.push(uvs1[id]);
            if (newUvs2)
                newUvs2.push(uvs2[id]);
        }
        if (newUvs1)
            this.faceVertexUvs[0] = newUvs1;
        if (newUvs2)
            this.faceVertexUvs[1] = newUvs2;
        return this;
    }
    copy(source) {
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
        const vertices = source.vertices;
        for (let i = 0, il = vertices.length; i < il; i++) {
            this.vertices.push(vertices[i].clone());
        }
        // colors
        const colors = source.colors;
        for (let i = 0, il = colors.length; i < il; i++) {
            this.colors.push(colors[i].clone());
        }
        // faces
        const faces = source.faces;
        for (let i = 0, il = faces.length; i < il; i++) {
            this.faces.push(faces[i].clone());
        }
        // face vertex uvs
        for (let i = 0, il = source.faceVertexUvs.length; i < il; i++) {
            const faceVertexUvs = source.faceVertexUvs[i];
            if (this.faceVertexUvs[i] === undefined) {
                this.faceVertexUvs[i] = [];
            }
            for (let j = 0, jl = faceVertexUvs.length; j < jl; j++) {
                const uvs = faceVertexUvs[j];
                const uvsCopy = [];
                for (let k = 0, kl = uvs.length; k < kl; k++) {
                    uvsCopy.push(uvs[k].clone());
                }
                this.faceVertexUvs[i].push(uvsCopy);
            }
        }
        // morph targets
        const morphTargets = source.morphTargets;
        for (let i = 0, il = morphTargets.length; i < il; i++) {
            const morphTarget = { name: morphTargets[i].name };
            // vertices
            if (morphTargets[i].vertices !== undefined) {
                morphTarget.vertices = [];
                for (let j = 0, jl = morphTargets[i].vertices.length; j < jl; j++) {
                    morphTarget.vertices.push(morphTargets[i].vertices[j].clone());
                }
            }
            // normals
            if (morphTargets[i].normals !== undefined) {
                morphTarget.normals = [];
                for (let j = 0, jl = morphTargets[i].normals.length; j < jl; j++) {
                    morphTarget.normals.push(morphTargets[i].normals[j].clone());
                }
            }
            this.morphTargets.push(morphTarget);
        }
        // morph normals
        const morphNormals = source.morphNormals;
        for (let i = 0, il = morphNormals.length; i < il; i++) {
            const morphNormal = {};
            // vertex normals
            if (morphNormals[i].vertexNormals !== undefined) {
                morphNormal.vertexNormals = [];
                for (let j = 0, jl = morphNormals[i].vertexNormals.length; j < jl; j++) {
                    morphNormal.vertexNormals.push(morphNormals[i].vertexNormals[j].clone());
                }
            }
            // face normals
            if (morphNormals[i].faceNormals !== undefined) {
                morphNormal.faceNormals = [];
                for (let j = 0, jl = morphNormals[i].faceNormals.length; j < jl; j++) {
                    morphNormal.faceNormals.push(morphNormals[i].faceNormals[j].clone());
                }
            }
            this.morphNormals.push(morphNormal);
        }
        // skin weights
        const skinWeights = source.skinWeights;
        for (let i = 0, il = skinWeights.length; i < il; i++) {
            this.skinWeights.push(skinWeights[i].clone());
        }
        // skin indices
        const skinIndices = source.skinIndices;
        for (let i = 0, il = skinIndices.length; i < il; i++) {
            this.skinIndices.push(skinIndices[i].clone());
        }
        // line distances
        const lineDistances = source.lineDistances;
        for (let i = 0, il = lineDistances.length; i < il; i++) {
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
    clone() {
        return new this.constructor().copy(this);
    }
}
