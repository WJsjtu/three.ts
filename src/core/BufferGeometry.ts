import {Box3} from "../math/Box3";
import {MathUtil} from "../math/Math";
import {Matrix3} from "../math/Matrix3";
import {Matrix4} from "../math/Matrix4";
import {Sphere} from "../math/Sphere";
import {Vector3} from "../math/Vector3";
import {
    applyMatrixToBufferAttribute,
    arrayMax,
    setBoxFromBufferAttribute,
} from "../utils";
import {
    BufferAttribute,
    Float32BufferAttribute,
    TypedArray,
    Uint16BufferAttribute,
    Uint32BufferAttribute,
} from "./BufferAttribute";
import {DirectGeometry, IGroup} from "./DirectGeometry";
import {EventDispatcher} from "./EventDispatcher";
import {Geometry} from "./Geometry";
import {Object3D} from "./Object3D";

export interface IDrawRange {
    start: number;
    count: number;
}

let bufferGeometryId: number = 1;
export class BufferGeometry extends EventDispatcher {
    public readonly id: number = (bufferGeometryId += 2);
    public readonly uuid: string = MathUtil.generateUUID();
    public name: string = "";
    public readonly type: string = "BufferGeometry";

    public index: BufferAttribute = null;
    public attributes: {[key: string]: BufferAttribute} = {};

    public morphAttributes: {[key: string]: BufferAttribute[]} = {};

    public groups: IGroup[] = [];

    public boundingBox: Box3 = null;
    public boundingSphere: Sphere = null;

    public drawRange: IDrawRange = {start: 0, count: Infinity};

    public setIndex(index: number[] | BufferAttribute): this {
        if (Array.isArray(index)) {
            this.index = new (arrayMax(index) > 65535
                ? Uint32BufferAttribute
                : Uint16BufferAttribute)(index, 1);
        } else {
            this.index = index;
        }
        return this;
    }

    public addAttribute(name: string, attribute: BufferAttribute): this {
        if (name === "index") {
            this.setIndex(attribute);
            return this;
        }
        this.attributes[name] = attribute;
        return this;
    }

    public getAttribute(name: string): BufferAttribute {
        return this.attributes[name];
    }

    public removeAttribute(name: string): this {
        delete this.attributes[name];
        return this;
    }

    public addGroup(
        start: number,
        count: number,
        materialIndex: number = 0,
    ): this {
        this.groups.push({
            count: count,
            materialIndex: materialIndex,
            start: start,
        });
        return this;
    }

    public clearGroups(): this {
        this.groups = [];
        return this;
    }

    public setDrawRange(start: number, count: number): this {
        this.drawRange.start = start;
        this.drawRange.count = count;
        return this;
    }

    public applyMatrix(matrix: Matrix4): this {
        const position: BufferAttribute = this.attributes.position;
        if (position !== undefined) {
            applyMatrixToBufferAttribute(matrix, position);
            position.needsUpdate = true;
        }
        const normal: BufferAttribute = this.attributes.normal;
        if (normal !== undefined) {
            const normalMatrix: Matrix3 = new Matrix3().getNormalMatrix(matrix);
            applyMatrixToBufferAttribute(normalMatrix, normal);
            normal.needsUpdate = true;
        }
        if (this.boundingBox !== null) {
            this.computeBoundingBox();
        }
        if (this.boundingSphere !== null) {
            this.computeBoundingSphere();
        }
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

    public center(): Vector3 {
        this.computeBoundingBox();
        const offset: Vector3 = this.boundingBox.getCenter().negate();
        this.translate(offset.x, offset.y, offset.z);
        return offset;
    }

    /**
     * TODO setFromObject
     * @param object
     */
    public setFromObject(object: Object3D): this {
        return this;
    }

    public setFromPoints(points: Vector3[]): this {
        const position: number[] = [];
        for (let i: number = 0, l: number = points.length; i < l; i++) {
            const point: Vector3 = points[i];
            position.push(point.x, point.y, point.z || 0);
        }
        this.addAttribute("position", new Float32BufferAttribute(position, 3));
        return this;
    }

    /**
     * TODO updateFromObject
     * @param object
     * @returns {BufferGeometry}
     */
    public updateFromObject(object: Object3D): this {
        return this;
    }

    public fromGeometry(geometry: Geometry): this {
        geometry.directGeometry = new DirectGeometry().fromGeometry(geometry);
        return this.fromDirectGeometry(geometry.directGeometry);
    }

    public fromDirectGeometry(geometry: DirectGeometry): this {
        const positions: Float32Array = new Float32Array(
            geometry.vertices.length * 3,
        );
        this.addAttribute(
            "position",
            new BufferAttribute(positions, 3).copyVector3sArray(
                geometry.vertices,
            ),
        );
        if (geometry.normals.length > 0) {
            const normals: Float32Array = new Float32Array(
                geometry.normals.length * 3,
            );
            this.addAttribute(
                "normal",
                new BufferAttribute(normals, 3).copyVector3sArray(
                    geometry.normals,
                ),
            );
        }
        if (geometry.colors.length > 0) {
            const colors: Float32Array = new Float32Array(
                geometry.colors.length * 3,
            );
            this.addAttribute(
                "color",
                new BufferAttribute(colors, 3).copyColorsArray(geometry.colors),
            );
        }
        if (geometry.uvs.length > 0) {
            const uvs: Float32Array = new Float32Array(geometry.uvs.length * 2);
            this.addAttribute(
                "uv",
                new BufferAttribute(uvs, 2).copyVector2sArray(geometry.uvs),
            );
        }
        if (geometry.uvs2.length > 0) {
            const uvs2: Float32Array = new Float32Array(
                geometry.uvs2.length * 2,
            );
            this.addAttribute(
                "uv2",
                new BufferAttribute(uvs2, 2).copyVector2sArray(geometry.uvs2),
            );
        }
        /**
         * TODO question https://discourse.threejs.org/t/question-about-fromdirectgeometry-function-of-buffergeometry/1890/2
         if (geometry.indices.length > 0) {
            const indices: Uint32Array | Uint16Array = new (arrayMax(geometry.indices) > 65535 ? Uint32Array : Uint16Array)(geometry.indices.length * 3);
            this.setIndex(new BufferAttribute(indices, 1).copyIndicesArray(geometry.indices));
        }
         */
        // groups
        this.groups = geometry.groups;
        // morphs
        for (const name in geometry.morphTargets) {
            if (!geometry.morphTargets.hasOwnProperty(name)) continue;
            const array: Float32BufferAttribute[] = [];
            const morphTargets: Vector3[][] = geometry.morphTargets[name];
            for (
                let i: number = 0, l: number = morphTargets.length;
                i < l;
                i++
            ) {
                const morphTarget: Vector3[] = morphTargets[i];
                const attribute: Float32BufferAttribute = new Float32BufferAttribute(
                    new Array(morphTarget.length * 3),
                    3,
                );
                array.push(attribute.copyVector3sArray(morphTarget));
            }
            this.morphAttributes[name] = array;
        }
        // skinning
        if (geometry.skinIndices.length > 0) {
            const skinIndices: Float32BufferAttribute = new Float32BufferAttribute(
                new Array(geometry.skinIndices.length * 4),
                4,
            );
            this.addAttribute(
                "skinIndex",
                skinIndices.copyVector4sArray(geometry.skinIndices),
            );
        }
        if (geometry.skinWeights.length > 0) {
            const skinWeights: Float32BufferAttribute = new Float32BufferAttribute(
                new Array(geometry.skinWeights.length * 4),
                4,
            );
            this.addAttribute(
                "skinWeight",
                skinWeights.copyVector4sArray(geometry.skinWeights),
            );
        }

        /**
         * TODO question https://discourse.threejs.org/t/question-about-fromdirectgeometry-function-of-buffergeometry/1890/2

         if (geometry.boundingSphere !== null) {
            this.boundingSphere = geometry.boundingSphere.clone();
        }
         if (geometry.boundingBox !== null) {
            this.boundingBox = geometry.boundingBox.clone();
        }
         */
        return this;
    }

    public computeBoundingBox(): void {
        if (this.boundingBox === null) {
            this.boundingBox = new Box3();
        }
        const position: BufferAttribute = this.attributes.position;
        if (position !== undefined) {
            setBoxFromBufferAttribute(this.boundingBox, position);
        } else {
            this.boundingBox.makeEmpty();
        }
        if (
            isNaN(this.boundingBox.min.x) ||
            isNaN(this.boundingBox.min.y) ||
            isNaN(this.boundingBox.min.z)
        ) {
            console.error(
                `THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,
                this,
            );
        }
    }

    public computeBoundingSphere(): void {
        if (this.boundingSphere === null) {
            this.boundingSphere = new Sphere();
        }
        const position: BufferAttribute = this.attributes.position;
        if (position) {
            const box: Box3 = new Box3();
            setBoxFromBufferAttribute(box, position);
            const center: Vector3 = box.getCenter();
            // hoping to find a boundingSphere with a radius smaller than the
            // boundingSphere of the boundingBox: sqrt(3) smaller in the best case
            let maxRadiusSquare: number = 0;
            for (let i: number = 0, il: number = position.count; i < il; i++) {
                const vector: Vector3 = new Vector3();
                vector.x = position.getProperty(i, "x") as number;
                vector.y = position.getProperty(i, "y") as number;
                vector.z = position.getProperty(i, "z") as number;
                maxRadiusSquare = Math.max(
                    maxRadiusSquare,
                    center.distanceToSquared(vector),
                );
            }
            this.boundingSphere.radius = Math.sqrt(maxRadiusSquare);
            if (isNaN(this.boundingSphere.radius)) {
                console.error(
                    `THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,
                    this,
                );
            }
        }
    }

    public computeVertexNormals(): void {
        const index: BufferAttribute = this.index;
        const attributes: {[key: string]: BufferAttribute} = this.attributes;
        const groups: IGroup[] = this.groups;
        if (attributes.position) {
            const positions: TypedArray = attributes.position.array;
            if (attributes.normal === undefined) {
                this.addAttribute(
                    "normal",
                    new BufferAttribute(new Float32Array(positions.length), 3),
                );
            } else {
                // reset existing normals to zero
                const array: TypedArray = attributes.normal.array;
                for (
                    let i: number = 0, il: number = array.length;
                    i < il;
                    i++
                ) {
                    array[i] = 0;
                }
            }
            const normals: TypedArray = attributes.normal.array;

            let vA: number, vB: number, vC: number;
            const pA: Vector3 = new Vector3(),
                pB: Vector3 = new Vector3(),
                pC: Vector3 = new Vector3();
            const cb: Vector3 = new Vector3(),
                ab: Vector3 = new Vector3();
            // indexed elements
            if (index) {
                const indices: TypedArray = index.array;
                if (groups.length === 0) {
                    this.addGroup(0, indices.length);
                }
                for (
                    let j: number = 0, jl: number = groups.length;
                    j < jl;
                    ++j
                ) {
                    const group: IGroup = groups[j];
                    const start: number = group.start;
                    const count: number = group.count;
                    for (
                        let i: number = start, il: number = start + count;
                        i < il;
                        i += 3
                    ) {
                        vA = indices[i] * 3;
                        vB = indices[i + 1] * 3;
                        vC = indices[i + 2] * 3;
                        pA.fromArray(positions, vA);
                        pB.fromArray(positions, vB);
                        pC.fromArray(positions, vC);
                        cb.copy(pC).sub(pB);
                        ab.copy(pA).sub(pB);
                        cb.cross(ab);
                        normals[vA] += cb.x;
                        normals[vA + 1] += cb.y;
                        normals[vA + 2] += cb.z;
                        normals[vB] += cb.x;
                        normals[vB + 1] += cb.y;
                        normals[vB + 2] += cb.z;
                        normals[vC] += cb.x;
                        normals[vC + 1] += cb.y;
                        normals[vC + 2] += cb.z;
                    }
                }
            } else {
                // non-indexed elements (unconnected triangle soup)
                for (
                    let i: number = 0, il: number = positions.length;
                    i < il;
                    i += 9
                ) {
                    pA.fromArray(positions, i);
                    pB.fromArray(positions, i + 3);
                    pC.fromArray(positions, i + 6);
                    cb.copy(pC).sub(pB);
                    ab.copy(pA).sub(pB);
                    cb.cross(ab);
                    normals[i] = cb.x;
                    normals[i + 1] = cb.y;
                    normals[i + 2] = cb.z;
                    normals[i + 3] = cb.x;
                    normals[i + 4] = cb.y;
                    normals[i + 5] = cb.z;
                    normals[i + 6] = cb.x;
                    normals[i + 7] = cb.y;
                    normals[i + 8] = cb.z;
                }
            }
            this.normalizeNormals();
            attributes.normal.needsUpdate = true;
        }
    }

    public normalizeNormals(): void {
        const vector: Vector3 = new Vector3();
        const normals: BufferAttribute = this.attributes.normal;
        for (let i: number = 0, il: number = normals.count; i < il; i++) {
            vector.x = normals.getProperty(i, "x") as number;
            vector.y = normals.getProperty(i, "y") as number;
            vector.z = normals.getProperty(i, "z") as number;
            vector.normalize();
            normals.setProperty(i, "xyz", vector);
        }
    }

    public toNonIndexed(): BufferGeometry {
        if (this.index === null) {
            console.warn(
                `THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed.`,
            );
            return this;
        }
        const geometry2: BufferGeometry = new BufferGeometry();
        const indices: TypedArray = this.index.array;
        const attributes: {[key: string]: BufferAttribute} = this.attributes;
        for (const name in attributes) {
            if (!attributes.hasOwnProperty(name)) continue;
            const attribute: BufferAttribute = attributes[name];
            const array: TypedArray = attribute.array;
            const itemSize: number = attribute.itemSize;
            const array2: TypedArray = new (array.constructor as (
                length: number,
            ) => void)(indices.length * itemSize) as TypedArray;
            let index: number = 0,
                index2: number = 0;
            for (let i: number = 0, l: number = indices.length; i < l; i++) {
                index = indices[i] * itemSize;
                for (let j: number = 0; j < itemSize; j++) {
                    array2[index2++] = array[index++];
                }
            }
            geometry2.addAttribute(name, new BufferAttribute(array2, itemSize));
        }
        return geometry2;
    }

    public clone(): BufferGeometry {
        return (new (this.constructor as () => void)() as BufferGeometry).copy(
            this,
        );
    }

    public copy(source): this {
        // reset
        this.index = null;
        this.attributes = {};
        this.morphAttributes = {};
        this.groups = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        // name
        this.name = source.name;
        // index
        const index: BufferAttribute = source.index;
        if (index !== null) {
            this.setIndex(index.clone());
        }
        // attributes
        const attributes: {[key: string]: BufferAttribute} = source.attributes;
        for (const name in attributes) {
            if (!attributes.hasOwnProperty(name)) continue;
            const attribute: BufferAttribute = attributes[name];
            this.addAttribute(name, attribute.clone());
        }
        // morph attributes
        const morphAttributes: {[key: string]: BufferAttribute[]} =
            source.morphAttributes;
        for (const name in morphAttributes) {
            if (!attributes.hasOwnProperty(name)) continue;
            const array: BufferAttribute[] = [];
            const morphAttribute: BufferAttribute[] = morphAttributes[name]; // morphAttribute: array of Float32BufferAttributes
            for (
                let i: number = 0, l: number = morphAttribute.length;
                i < l;
                i++
            ) {
                array.push(morphAttribute[i].clone());
            }
            this.morphAttributes[name] = array;
        }
        // groups
        const groups: IGroup[] = source.groups;
        for (let i: number = 0, l: number = groups.length; i < l; i++) {
            const group: IGroup = groups[i];
            this.addGroup(group.start, group.count, group.materialIndex);
        }
        // bounding box
        const boundingBox: Box3 = source.boundingBox;
        if (boundingBox !== null) {
            this.boundingBox = boundingBox.clone();
        }
        // bounding sphere
        const boundingSphere: Sphere = source.boundingSphere;
        if (boundingSphere !== null) {
            this.boundingSphere = boundingSphere.clone();
        }
        // draw range
        this.drawRange.start = source.drawRange.start;
        this.drawRange.count = source.drawRange.count;
        return this;
    }

    public dispose(): void {
        this.dispatchEvent({type: "dispose"});
    }
}
