import { Matrix4 } from "../math/Matrix4";
import { Bone } from "./Bone";
const offsetMatrix = new Matrix4();
const identityMatrix = new Matrix4();
export class Skeleton {
    constructor(bones = [], boneInverses) {
        this.bones = [];
        this.boneInverses = [];
        this.bones = bones.slice(0);
        this.boneMatrices = new Float32Array(this.bones.length * 16);
        if (boneInverses === undefined) {
            this.calculateInverses();
        }
        else {
            if (this.bones.length === boneInverses.length) {
                this.boneInverses = boneInverses.slice(0);
            }
            else {
                console.warn("THREE.Skeleton boneInverses is the wrong length.");
                for (let i = 0, il = this.bones.length; i < il; i++) {
                    this.boneInverses.push(new Matrix4());
                }
            }
        }
    }
    calculateInverses() {
        this.boneInverses = [];
        for (let i = 0, il = this.bones.length; i < il; i++) {
            const inverse = new Matrix4();
            if (this.bones[i]) {
                inverse.getInverse(this.bones[i].matrixWorld);
            }
            this.boneInverses.push(inverse);
        }
    }
    pose() {
        // recover the bind-time world matrices
        for (let i = 0, il = this.bones.length; i < il; i++) {
            const bone = this.bones[i];
            if (bone) {
                bone.matrixWorld.getInverse(this.boneInverses[i]);
            }
        }
        // compute the local matrices, positions, rotations and scales
        for (let i = 0, il = this.bones.length; i < il; i++) {
            const bone = this.bones[i];
            if (bone) {
                if (bone.parent && bone.parent instanceof Bone) {
                    bone.matrix.getInverse(bone.parent.matrixWorld);
                    bone.matrix.multiply(bone.matrixWorld);
                }
                else {
                    bone.matrix.copy(bone.matrixWorld);
                }
                bone.matrix.decompose(bone.position, bone.quaternion, bone.scale);
            }
        }
    }
    update() {
        const bones = this.bones;
        const boneInverses = this.boneInverses;
        const boneMatrices = this.boneMatrices;
        const boneTexture = this.boneTexture;
        // flatten bone matrices to array
        for (let i = 0, il = bones.length; i < il; i++) {
            // compute the offset between the current and the original transform
            const matrix = bones[i] ? bones[i].matrixWorld : identityMatrix;
            offsetMatrix.multiplyMatrices(matrix, boneInverses[i]);
            offsetMatrix.toArray(boneMatrices, i * 16);
        }
        if (boneTexture !== undefined) {
            boneTexture.needsUpdate = true;
        }
    }
    getBoneByName(name) {
        for (let i = 0, il = this.bones.length; i < il; i++) {
            const bone = this.bones[i];
            if (bone.name === name) {
                return bone;
            }
        }
        return undefined;
    }
    clone() {
        return new this.constructor(this.bones, this.boneInverses);
    }
}
