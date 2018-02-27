import { Matrix4 } from "../math/Matrix4";
import { DataTexture } from "../textures/DataTexture";
import { Bone } from "./Bone";

const offsetMatrix: Matrix4 = new Matrix4();
const identityMatrix: Matrix4 = new Matrix4();

export class Skeleton {
    public bones: Bone[] = [];
    public boneMatrices: Float32Array;
    public boneInverses: Matrix4[] = [];
    public boneTexture?: DataTexture;

    constructor(bones: Bone[] = [], boneInverses?: Matrix4[]) {
        this.bones = bones.slice(0);
        this.boneMatrices = new Float32Array(this.bones.length * 16);
        if (boneInverses === undefined) {
            this.calculateInverses();
        } else {
            if (this.bones.length === boneInverses.length) {
                this.boneInverses = boneInverses.slice(0);
            } else {
                console.warn(
                    "THREE.Skeleton boneInverses is the wrong length.",
                );
                for (let i = 0, il = this.bones.length; i < il; i++) {
                    this.boneInverses.push(new Matrix4());
                }
            }
        }
    }

    public calculateInverses(): void {
        this.boneInverses = [];
        for (let i: number = 0, il: number = this.bones.length; i < il; i++) {
            const inverse: Matrix4 = new Matrix4();
            if (this.bones[i]) {
                inverse.getInverse(this.bones[i].matrixWorld);
            }
            this.boneInverses.push(inverse);
        }
    }

    public pose(): void {
        // recover the bind-time world matrices
        for (let i: number = 0, il: number = this.bones.length; i < il; i++) {
            const bone: Bone = this.bones[i];
            if (bone) {
                bone.matrixWorld.getInverse(this.boneInverses[i]);
            }
        }

        // compute the local matrices, positions, rotations and scales
        for (let i: number = 0, il: number = this.bones.length; i < il; i++) {
            const bone: Bone = this.bones[i];
            if (bone) {
                if (bone.parent && bone.parent instanceof Bone) {
                    bone.matrix.getInverse(bone.parent.matrixWorld);
                    bone.matrix.multiply(bone.matrixWorld);
                } else {
                    bone.matrix.copy(bone.matrixWorld);
                }
                bone.matrix.decompose(
                    bone.position,
                    bone.quaternion,
                    bone.scale,
                );
            }
        }
    }

    public update(): void {
        const bones: Bone[] = this.bones;
        const boneInverses: Matrix4[] = this.boneInverses;
        const boneMatrices: Float32Array = this.boneMatrices;
        const boneTexture: DataTexture = this.boneTexture;
        // flatten bone matrices to array
        for (let i: number = 0, il: number = bones.length; i < il; i++) {
            // compute the offset between the current and the original transform
            const matrix: Matrix4 = bones[i]
                ? bones[i].matrixWorld
                : identityMatrix;
            offsetMatrix.multiplyMatrices(matrix, boneInverses[i]);
            offsetMatrix.toArray(boneMatrices, i * 16);
        }
        if (boneTexture !== undefined) {
            boneTexture.needsUpdate = true;
        }
    }

    public getBoneByName(name: string): Bone | undefined {
        for (let i: number = 0, il: number = this.bones.length; i < il; i++) {
            const bone: Bone = this.bones[i];
            if (bone.name === name) {
                return bone;
            }
        }
        return undefined;
    }

    public clone(): Skeleton {
        return new (this.constructor as new (
            bones: Bone[],
            boneInverses: Matrix4[],
        ) => Skeleton)(this.bones, this.boneInverses);
    }
}
