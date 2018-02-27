import { Mesh } from "./Mesh";
import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Material } from "../materials/Material";
import { Matrix4 } from "../math/Matrix4";
import { Bone } from "./Bone";
import { TypedArray, BufferAttribute } from "../core/BufferAttribute";
import { Skeleton } from "./Skeleton";
import { Vector4 } from "../math/Vector4";

export interface IGeometeryBone {
    name: string;
    parent: number;
    pos: number[] | TypedArray;
    rotq: number[] | TypedArray;
    scl?: number[] | TypedArray;
}

export class SkinnedMesh extends Mesh {
    public readonly type: string = "SkinnedMesh";
    public bindMode: string = "attached";
    public bindMatrix: Matrix4 = new Matrix4();
    public bindMatrixInverse: Matrix4 = new Matrix4();
    public skeleton: Skeleton;

    /**
     * skinIndices and skinWeights should be set to true on the Geometry
     * skinIndex and skinWeights attribute on BufferGeometry
     * @param geometry
     * @param material
     */
    constructor(
        geometry: Geometry | BufferGeometry,
        material?: Material | Material[],
    ) {
        super(geometry, material);
        const bones: Bone[] = this.initBones();
        const skeleton: Skeleton = new Skeleton(bones);
        this.bind(skeleton, this.matrixWorld);
        this.normalizeSkinWeights();
    }

    public initBones(): Bone[] {
        const bones: Bone[] = [];
        if (
            this.geometry &&
            this.geometry instanceof Geometry &&
            this.geometry.bones !== undefined
        ) {
            // first, create array of 'Bone' objects from geometry data
            for (
                let i: number = 0, il: number = this.geometry.bones.length;
                i < il;
                i++
            ) {
                const gbone = this.geometry.bones[i];
                // create new 'Bone' object
                const bone: Bone = new Bone();
                bones.push(bone);
                // apply values
                bone.name = gbone.name;
                bone.position.fromArray(gbone.pos);
                bone.quaternion.fromArray(gbone.rotq);
                if (gbone.scl !== undefined) {
                    bone.scale.fromArray(gbone.scl);
                }
            }
            // second, create bone hierarchy
            for (
                let i: number = 0, il: number = this.geometry.bones.length;
                i < il;
                i++
            ) {
                const gbone = this.geometry.bones[i];
                if (
                    gbone.parent !== -1 &&
                    gbone.parent !== null &&
                    bones[gbone.parent] !== undefined
                ) {
                    // subsequent bones in the hierarchy
                    bones[gbone.parent].add(bones[i]);
                } else {
                    // topmost bone, immediate child of the skinned mesh
                    this.add(bones[i]);
                }
            }
        }
        // now the bones are part of the scene graph and children of the skinned mesh.
        // let's update the corresponding matrices
        this.updateMatrixWorld(true);
        return bones;
    }

    public bind(skeleton: Skeleton, bindMatrix: Matrix4): void {
        this.skeleton = skeleton;
        if (bindMatrix === undefined) {
            this.updateMatrixWorld(true);
            this.skeleton.calculateInverses();
            bindMatrix = this.matrixWorld;
        }
        this.bindMatrix.copy(bindMatrix);
        this.bindMatrixInverse.getInverse(bindMatrix);
    }

    public pose(): void {
        this.skeleton.pose();
    }

    public normalizeSkinWeights(): void {
        if (this.geometry && this.geometry instanceof Geometry) {
            for (let i: number = 0; i < this.geometry.skinWeights.length; i++) {
                const sw: Vector4 = this.geometry.skinWeights[i];
                const scale: number = 1.0 / sw.manhattanLength();
                if (scale !== Infinity) {
                    sw.multiplyScalar(scale);
                } else {
                    sw.set(1, 0, 0, 0); // do something reasonable
                }
            }
        } else if (this.geometry && this.geometry instanceof BufferGeometry) {
            const vec: Vector4 = new Vector4();
            const skinWeight: BufferAttribute = this.geometry.attributes
                .skinWeight;
            for (let i: number = 0; i < skinWeight.count; i++) {
                vec.x = skinWeight.getProperty(i, "x") as number;
                vec.y = skinWeight.getProperty(i, "y") as number;
                vec.z = skinWeight.getProperty(i, "z") as number;
                vec.w = skinWeight.getProperty(i, "w") as number;
                const scale: number = 1.0 / vec.manhattanLength();
                if (scale !== Infinity) {
                    vec.multiplyScalar(scale);
                } else {
                    vec.set(1, 0, 0, 0); // do something reasonable
                }
                skinWeight.setProperty(i, "xyzw", vec);
            }
        }
    }

    public updateMatrixWorld(force: boolean = false): this {
        super.updateMatrixWorld(force);
        if (this.bindMode === "attached") {
            this.bindMatrixInverse.getInverse(this.matrixWorld);
        } else if (this.bindMode === "detached") {
            this.bindMatrixInverse.getInverse(this.bindMatrix);
        } else {
            console.warn(
                "THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode,
            );
        }
        return this;
    }

    public clone(): SkinnedMesh {
        return new (this.constructor as new (
            geometry: Geometry | BufferGeometry,
            material: Material | Material[],
        ) => SkinnedMesh)(this.geometry, this.material).copy(this);
    }
}
