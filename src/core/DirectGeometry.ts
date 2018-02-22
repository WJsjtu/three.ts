import { Color } from "../math/Color";
import { Triangle } from "../math/Triangle";
import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { Geometry, GeometryFace, IMorphNormal, IMorphTarget } from "./Geometry";
// import {Sphere} from "../math/Sphere";
// import {Box3} from "../math/Box3";

export interface IGroup {
    start: number;
    materialIndex: number;
    count?: number;
}

export class DirectGeometry {
    /**
     * TODO question https://discourse.threejs.org/t/question-about-fromdirectgeometry-function-of-buffergeometry/1890/2
     * public indices: number[] = [];
     */

    public vertices: Vector3[] = [];
    public normals: Vector3[] = [];
    public colors: Color[] = [];
    public uvs: Vector2[] = [];
    public uvs2: Vector2[] = [];

    public groups: IGroup[] = [];

    public morphTargets: {
        position?: Vector3[][];
        normal?: Vector3[][];
    } = {};

    public skinWeights: Vector4[] = [];
    public skinIndices: Vector4[] = [];

    /*
     TODO question https://discourse.threejs.org/t/question-about-fromdirectgeometry-function-of-buffergeometry/1890/2
     public boundingSphere: Sphere = null;
     public boundingBox: Box3 = null;
     */

    public verticesNeedUpdate: boolean = false;
    public uvsNeedUpdate: boolean = false;
    public normalsNeedUpdate: boolean = false;
    public colorsNeedUpdate: boolean = false;
    public groupsNeedUpdate: boolean = false;

    public computeGroups(geometry: Geometry): void {
        let group: IGroup;
        const groups: IGroup[] = [];
        let materialIndex: number;
        const faces: GeometryFace[] = geometry.faces;
        let i: number = 0;
        for (; i < faces.length; i++) {
            const face: GeometryFace = faces[i];
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

    public fromGeometry(geometry: Geometry): this {
        const faces: GeometryFace[] = geometry.faces;
        const vertices: Vector3[] = geometry.vertices;
        const faceVertexUvs: Vector2[][][] = geometry.faceVertexUvs;

        const hasFaceVertexUv: boolean =
            faceVertexUvs[0] && faceVertexUvs[0].length > 0;
        const hasFaceVertexUv2: boolean =
            faceVertexUvs[1] && faceVertexUvs[1].length > 0;

        // morphs
        const morphTargets: IMorphTarget[] = geometry.morphTargets;
        const morphTargetsLength: number = morphTargets.length;
        if (morphTargetsLength > 0) {
            this.morphTargets.position = [];
            for (let i: number = 0; i < morphTargetsLength; i++) {
                this.morphTargets.position[i] = [];
            }
        }
        const morphNormals: IMorphNormal[] = geometry.morphNormals;
        const morphNormalsLength: number = morphNormals.length;
        if (morphNormalsLength > 0) {
            this.morphTargets.normal = [];
            for (let i: number = 0; i < morphNormalsLength; i++) {
                this.morphTargets.normal[i] = [];
            }
        }
        // skins
        const skinIndices: Vector4[] = geometry.skinIndices;
        const skinWeights: Vector4[] = geometry.skinWeights;
        const hasSkinIndices: boolean = skinIndices.length === vertices.length;
        const hasSkinWeights: boolean = skinWeights.length === vertices.length;
        for (let i: number = 0; i < faces.length; i++) {
            const face: GeometryFace = faces[i];
            this.vertices.push(
                vertices[face.a],
                vertices[face.b],
                vertices[face.c],
            );
            const vertexNormals: Vector3[] = face.vertexNormals;
            if (vertexNormals.length === 3) {
                this.normals.push(
                    vertexNormals[0],
                    vertexNormals[1],
                    vertexNormals[2],
                );
            } else {
                const normal: Vector3 = face.normal;
                this.normals.push(normal, normal, normal);
            }
            const vertexColors: Color[] = face.vertexColors;
            if (vertexColors.length === 3) {
                this.colors.push(
                    vertexColors[0],
                    vertexColors[1],
                    vertexColors[2],
                );
            } else {
                const color: Color = face.color;
                this.colors.push(color, color, color);
            }
            if (hasFaceVertexUv === true) {
                const vertexUvs: Vector2[] = faceVertexUvs[0][i];
                if (vertexUvs !== undefined) {
                    this.uvs.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);
                } else {
                    console.warn(
                        `THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ${i}`,
                    );
                    this.uvs.push(new Vector2(), new Vector2(), new Vector2());
                }
            }
            if (hasFaceVertexUv2 === true) {
                const vertexUvs: Vector2[] = faceVertexUvs[1][i];
                if (vertexUvs !== undefined) {
                    this.uvs2.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);
                } else {
                    console.warn(
                        `THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ${i}`,
                    );
                    this.uvs2.push(new Vector2(), new Vector2(), new Vector2());
                }
            }
            // morphs
            for (let j: number = 0; j < morphTargetsLength; j++) {
                const morphTarget: Vector3[] = morphTargets[j].vertices;
                this.morphTargets.position[j].push(
                    morphTarget[face.a],
                    morphTarget[face.b],
                    morphTarget[face.c],
                );
            }
            for (let j: number = 0; j < morphNormalsLength; j++) {
                const morphNormal: Triangle = morphNormals[j].vertexNormals[i];
                this.morphTargets.normal[j].push(
                    morphNormal.a,
                    morphNormal.b,
                    morphNormal.c,
                );
            }
            // skins
            if (hasSkinIndices) {
                this.skinIndices.push(
                    skinIndices[face.a],
                    skinIndices[face.b],
                    skinIndices[face.c],
                );
            }
            if (hasSkinWeights) {
                this.skinWeights.push(
                    skinWeights[face.a],
                    skinWeights[face.b],
                    skinWeights[face.c],
                );
            }
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
