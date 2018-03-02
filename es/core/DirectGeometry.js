import { Vector2 } from "../math/Vector2";
export class DirectGeometry {
    constructor() {
        this.vertices = [];
        this.normals = [];
        this.colors = [];
        this.uvs = [];
        this.uvs2 = [];
        this.groups = [];
        this.morphTargets = {};
        this.skinWeights = [];
        this.skinIndices = [];
        this.boundingSphere = null;
        this.boundingBox = null;
        this.verticesNeedUpdate = false;
        this.uvsNeedUpdate = false;
        this.normalsNeedUpdate = false;
        this.colorsNeedUpdate = false;
        this.groupsNeedUpdate = false;
    }
    computeGroups(geometry) {
        let group;
        const groups = [];
        let materialIndex;
        const faces = geometry.faces;
        let i = 0;
        for (; i < faces.length; i++) {
            const face = faces[i];
            // materials
            if (face.materialIndex !== materialIndex) {
                materialIndex = face.materialIndex;
                if (group !== undefined) {
                    group.count = i * 3 - group.start;
                    groups.push(group);
                }
                group = {
                    materialIndex: materialIndex,
                    start: i * 3,
                };
            }
        }
        if (group !== undefined) {
            group.count = i * 3 - group.start;
            groups.push(group);
        }
        this.groups = groups;
    }
    fromGeometry(geometry) {
        const faces = geometry.faces;
        const vertices = geometry.vertices;
        const faceVertexUvs = geometry.faceVertexUvs;
        const hasFaceVertexUv = faceVertexUvs[0] && faceVertexUvs[0].length > 0;
        const hasFaceVertexUv2 = faceVertexUvs[1] && faceVertexUvs[1].length > 0;
        // morphs
        const morphTargets = geometry.morphTargets;
        const morphTargetsLength = morphTargets.length;
        if (morphTargetsLength > 0) {
            this.morphTargets.position = [];
            for (let i = 0; i < morphTargetsLength; i++) {
                this.morphTargets.position[i] = [];
            }
        }
        const morphNormals = geometry.morphNormals;
        const morphNormalsLength = morphNormals.length;
        if (morphNormalsLength > 0) {
            this.morphTargets.normal = [];
            for (let i = 0; i < morphNormalsLength; i++) {
                this.morphTargets.normal[i] = [];
            }
        }
        // skins
        const skinIndices = geometry.skinIndices;
        const skinWeights = geometry.skinWeights;
        const hasSkinIndices = skinIndices.length === vertices.length;
        const hasSkinWeights = skinWeights.length === vertices.length;
        for (let i = 0; i < faces.length; i++) {
            const face = faces[i];
            this.vertices.push(vertices[face.a], vertices[face.b], vertices[face.c]);
            const vertexNormals = face.vertexNormals;
            if (vertexNormals.length === 3) {
                this.normals.push(vertexNormals[0], vertexNormals[1], vertexNormals[2]);
            }
            else {
                const normal = face.normal;
                this.normals.push(normal, normal, normal);
            }
            const vertexColors = face.vertexColors;
            if (vertexColors.length === 3) {
                this.colors.push(vertexColors[0], vertexColors[1], vertexColors[2]);
            }
            else {
                const color = face.color;
                this.colors.push(color, color, color);
            }
            if (hasFaceVertexUv === true) {
                const vertexUvs = faceVertexUvs[0][i];
                if (vertexUvs !== undefined) {
                    this.uvs.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);
                }
                else {
                    console.warn(`THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ${i}`);
                    this.uvs.push(new Vector2(), new Vector2(), new Vector2());
                }
            }
            if (hasFaceVertexUv2 === true) {
                const vertexUvs = faceVertexUvs[1][i];
                if (vertexUvs !== undefined) {
                    this.uvs2.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);
                }
                else {
                    console.warn(`THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ${i}`);
                    this.uvs2.push(new Vector2(), new Vector2(), new Vector2());
                }
            }
            // morphs
            for (let j = 0; j < morphTargetsLength; j++) {
                const morphTarget = morphTargets[j].vertices;
                this.morphTargets.position[j].push(morphTarget[face.a], morphTarget[face.b], morphTarget[face.c]);
            }
            for (let j = 0; j < morphNormalsLength; j++) {
                const morphNormal = morphNormals[j].vertexNormals[i];
                this.morphTargets.normal[j].push(morphNormal.a, morphNormal.b, morphNormal.c);
            }
            // skins
            if (hasSkinIndices) {
                this.skinIndices.push(skinIndices[face.a], skinIndices[face.b], skinIndices[face.c]);
            }
            if (hasSkinWeights) {
                this.skinWeights.push(skinWeights[face.a], skinWeights[face.b], skinWeights[face.c]);
            }
        }
        if (geometry.boundingSphere !== null) {
            this.boundingSphere = geometry.boundingSphere.clone();
        }
        if (geometry.boundingBox !== null) {
            this.boundingBox = geometry.boundingBox.clone();
        }
        this.computeGroups(geometry);
        this.verticesNeedUpdate = geometry.verticesNeedUpdate;
        this.normalsNeedUpdate = geometry.normalsNeedUpdate;
        this.colorsNeedUpdate = geometry.colorsNeedUpdate;
        this.uvsNeedUpdate = geometry.uvsNeedUpdate;
        this.groupsNeedUpdate = geometry.groupsNeedUpdate;
        return this;
    }
}
