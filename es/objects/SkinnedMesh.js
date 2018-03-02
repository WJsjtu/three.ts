import { Mesh } from "./Mesh";
import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Matrix4 } from "../math/Matrix4";
import { Bone } from "./Bone";
import { Skeleton } from "./Skeleton";
import { Vector4 } from "../math/Vector4";
export class SkinnedMesh extends Mesh {
    /**
     * skinIndices and skinWeights should be set to true on the Geometry
     * skinIndex and skinWeights attribute on BufferGeometry
     * @param geometry
     * @param material
     */
    constructor(geometry, material) {
        super(geometry, material);
        this.type = "SkinnedMesh";
        this.bindMode = "attached";
        this.bindMatrix = new Matrix4();
        this.bindMatrixInverse = new Matrix4();
        const bones = this.initBones();
        const skeleton = new Skeleton(bones);
        this.bind(skeleton, this.matrixWorld);
        this.normalizeSkinWeights();
    }
    initBones() {
        const bones = [];
        if (this.geometry && this.geometry instanceof Geometry && this.geometry.bones !== undefined) {
            // first, create array of 'Bone' objects from geometry data
            for (let i = 0, il = this.geometry.bones.length; i < il; i++) {
                const gbone = this.geometry.bones[i];
                // create new 'Bone' object
                const bone = new Bone();
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
            for (let i = 0, il = this.geometry.bones.length; i < il; i++) {
                const gbone = this.geometry.bones[i];
                if (gbone.parent !== -1 && gbone.parent !== null && bones[gbone.parent] !== undefined) {
                    // subsequent bones in the hierarchy
                    bones[gbone.parent].add(bones[i]);
                }
                else {
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
    bind(skeleton, bindMatrix) {
        this.skeleton = skeleton;
        if (bindMatrix === undefined) {
            this.updateMatrixWorld(true);
            this.skeleton.calculateInverses();
            bindMatrix = this.matrixWorld;
        }
        this.bindMatrix.copy(bindMatrix);
        this.bindMatrixInverse.getInverse(bindMatrix);
    }
    pose() {
        this.skeleton.pose();
    }
    normalizeSkinWeights() {
        if (this.geometry && this.geometry instanceof Geometry) {
            for (let i = 0; i < this.geometry.skinWeights.length; i++) {
                const sw = this.geometry.skinWeights[i];
                const scale = 1.0 / sw.manhattanLength();
                if (scale !== Infinity) {
                    sw.multiplyScalar(scale);
                }
                else {
                    sw.set(1, 0, 0, 0); // do something reasonable
                }
            }
        }
        else if (this.geometry && this.geometry instanceof BufferGeometry) {
            const vec = new Vector4();
            const skinWeight = this.geometry.attributes.skinWeight;
            for (let i = 0; i < skinWeight.count; i++) {
                vec.x = skinWeight.getProperty(i, "x");
                vec.y = skinWeight.getProperty(i, "y");
                vec.z = skinWeight.getProperty(i, "z");
                vec.w = skinWeight.getProperty(i, "w");
                const scale = 1.0 / vec.manhattanLength();
                if (scale !== Infinity) {
                    vec.multiplyScalar(scale);
                }
                else {
                    vec.set(1, 0, 0, 0); // do something reasonable
                }
                skinWeight.setProperty(i, "xyzw", vec);
            }
        }
    }
    updateMatrixWorld(force = false) {
        super.updateMatrixWorld(force);
        if (this.bindMode === "attached") {
            this.bindMatrixInverse.getInverse(this.matrixWorld);
        }
        else if (this.bindMode === "detached") {
            this.bindMatrixInverse.getInverse(this.bindMatrix);
        }
        else {
            console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
        }
        return this;
    }
    clone() {
        return new this.constructor(this.geometry, this.material).copy(this);
    }
}
