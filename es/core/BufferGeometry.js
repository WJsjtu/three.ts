import { Box3 } from "../math/Box3";
import { MathUtil } from "../math/Math";
import { Matrix3 } from "../math/Matrix3";
import { Matrix4 } from "../math/Matrix4";
import { Sphere } from "../math/Sphere";
import { Vector3 } from "../math/Vector3";
import { applyMatrixToBufferAttribute, arrayMax, setBoxFromBufferAttribute, } from "../utils";
import { BufferAttribute, Float32BufferAttribute, Uint16BufferAttribute, Uint32BufferAttribute, } from "./BufferAttribute";
import { DirectGeometry } from "./DirectGeometry";
import { EventDispatcher } from "./EventDispatcher";
import { Geometry } from "./Geometry";
import { Object3D } from "./Object3D";
import { Mesh } from "../objects/Mesh";
import { Line } from "../objects/Line";
import { Points } from "../objects/Points";
let bufferGeometryId = 1;
export class BufferGeometry extends EventDispatcher {
    constructor() {
        super(...arguments);
        this.id = (bufferGeometryId += 2);
        this.uuid = MathUtil.generateUUID();
        this.name = "";
        this.type = "BufferGeometry";
        this.index = null;
        this.attributes = {};
        this.morphAttributes = {};
        this.groups = [];
        this.boundingBox = null;
        this.boundingSphere = null;
        this.drawRange = { start: 0, count: Infinity };
    }
    setIndex(index) {
        if (Array.isArray(index)) {
            this.index = new (arrayMax(index) > 65535
                ? Uint32BufferAttribute
                : Uint16BufferAttribute)(index, 1);
        }
        else {
            this.index = index;
        }
        return this;
    }
    addAttribute(name, attribute) {
        if (name === "index") {
            this.setIndex(attribute);
            return this;
        }
        this.attributes[name] = attribute;
        return this;
    }
    getAttribute(name) {
        return this.attributes[name];
    }
    removeAttribute(name) {
        delete this.attributes[name];
        return this;
    }
    addGroup(start, count, materialIndex = 0) {
        this.groups.push({
            count: count,
            materialIndex: materialIndex,
            start: start,
        });
        return this;
    }
    clearGroups() {
        this.groups = [];
        return this;
    }
    setDrawRange(start, count) {
        this.drawRange.start = start;
        this.drawRange.count = count;
        return this;
    }
    applyMatrix(matrix) {
        const position = this.attributes.position;
        if (position !== undefined) {
            applyMatrixToBufferAttribute(matrix, position);
            position.needsUpdate = true;
        }
        const normal = this.attributes.normal;
        if (normal !== undefined) {
            const normalMatrix = new Matrix3().getNormalMatrix(matrix);
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
    center() {
        this.computeBoundingBox();
        const offset = this.boundingBox.getCenter().negate();
        this.translate(offset.x, offset.y, offset.z);
        return offset;
    }
    /**
     * Same as updateFromObject
     * @param object
     */
    setFromObject(object) {
        const geometry = object.geometry;
        if (object instanceof Points || object instanceof Line) {
            const positions = new Float32BufferAttribute(geometry.vertices.length * 3, 3);
            const colors = new Float32BufferAttribute(geometry.colors.length * 3, 3);
            this.addAttribute("position", positions.copyVector3sArray(geometry.vertices));
            this.addAttribute("color", colors.copyColorsArray(geometry.colors));
            if (geometry.lineDistances &&
                geometry.lineDistances.length === geometry.vertices.length) {
                const lineDistances = new Float32BufferAttribute(geometry.lineDistances.length, 1);
                this.addAttribute("lineDistance", lineDistances.copyArray(geometry.lineDistances));
            }
            if (geometry.boundingSphere !== null) {
                this.boundingSphere = geometry.boundingSphere.clone();
            }
            if (geometry.boundingBox !== null) {
                this.boundingBox = geometry.boundingBox.clone();
            }
        }
        else if (object instanceof Mesh) {
            this.fromGeometry(geometry);
        }
        return this;
    }
    setFromPoints(points) {
        const position = [];
        for (let i = 0, l = points.length; i < l; i++) {
            const point = points[i];
            position.push(point.x, point.y, point.z || 0);
        }
        this.addAttribute("position", new Float32BufferAttribute(position, 3));
        return this;
    }
    /**
     * This function is a mess.
     * The argument has implicit requirement for arg `object`
     * Since the only use of this function is in `WebGLObjects`,
     * and it requires the object's `geometry` property should be a `Geometry` instance,
     * So we can/must assert the object.geometry as type `Geometry`.
     * So the whole function is dealing with no BufferGeometry instance,
     * which may be the reason why BufferGeometry is faster.
     *
     * @param object
     * @returns {BufferGeometry}
     */
    updateFromObject(object) {
        let geometry = object.geometry;
        if (object instanceof Mesh) {
            let direct = geometry.directGeometry;
            if (geometry.elementsNeedUpdate === true) {
                direct = undefined;
                geometry.elementsNeedUpdate = false;
            }
            if (direct === undefined) {
                // Geometry -> DirectGeometry -> BufferGeometry
                return this.fromGeometry(geometry);
            }
            direct.verticesNeedUpdate = geometry.verticesNeedUpdate;
            direct.normalsNeedUpdate = geometry.normalsNeedUpdate;
            direct.colorsNeedUpdate = geometry.colorsNeedUpdate;
            direct.uvsNeedUpdate = geometry.uvsNeedUpdate;
            direct.groupsNeedUpdate = geometry.groupsNeedUpdate;
            geometry.verticesNeedUpdate = false;
            geometry.normalsNeedUpdate = false;
            geometry.colorsNeedUpdate = false;
            geometry.uvsNeedUpdate = false;
            geometry.groupsNeedUpdate = false;
            geometry = direct;
        }
        // Used by both Geometry and DirectGeometry
        if (geometry.verticesNeedUpdate === true) {
            const attribute = this.attributes.position;
            if (attribute !== undefined) {
                attribute.copyVector3sArray(geometry.vertices);
                attribute.needsUpdate = true;
            }
            geometry.verticesNeedUpdate = false;
        }
        // Used only by DirectGeometry
        if (geometry instanceof DirectGeometry &&
            geometry.normalsNeedUpdate === true) {
            const attribute = this.attributes.normal;
            if (attribute !== undefined) {
                attribute.copyVector3sArray(geometry.normals);
                attribute.needsUpdate = true;
            }
            geometry.normalsNeedUpdate = false;
        }
        // Used by both Geometry and DirectGeometry
        if (geometry.colorsNeedUpdate === true) {
            const attribute = this.attributes.color;
            if (attribute !== undefined) {
                attribute.copyColorsArray(geometry.colors);
                attribute.needsUpdate = true;
            }
            geometry.colorsNeedUpdate = false;
        }
        // Used only by DirectGeometry
        if (geometry instanceof DirectGeometry && geometry.uvsNeedUpdate) {
            const attribute = this.attributes.uv;
            if (attribute !== undefined) {
                attribute.copyVector2sArray(geometry.uvs);
                attribute.needsUpdate = true;
            }
            geometry.uvsNeedUpdate = false;
        }
        // Used only by Geometry
        if (geometry instanceof Geometry && geometry.lineDistancesNeedUpdate) {
            const attribute = this.attributes.lineDistance;
            if (attribute !== undefined) {
                attribute.copyArray(geometry.lineDistances);
                attribute.needsUpdate = true;
            }
            geometry.lineDistancesNeedUpdate = false;
        }
        // Used only by DirectGeometry
        if (geometry instanceof DirectGeometry && geometry.groupsNeedUpdate) {
            geometry.computeGroups(object.geometry);
            this.groups = geometry.groups;
            geometry.groupsNeedUpdate = false;
        }
        // Well, IMO!!
        return this;
    }
    /**
     * Geometry of a Mesh
     * @param geometry
     */
    fromGeometry(geometry) {
        geometry.directGeometry = new DirectGeometry().fromGeometry(geometry);
        return this.fromDirectGeometry(geometry.directGeometry);
    }
    fromDirectGeometry(geometry) {
        const positions = new Float32Array(geometry.vertices.length * 3);
        this.addAttribute("position", new BufferAttribute(positions, 3).copyVector3sArray(geometry.vertices));
        if (geometry.normals.length > 0) {
            const normals = new Float32Array(geometry.normals.length * 3);
            this.addAttribute("normal", new BufferAttribute(normals, 3).copyVector3sArray(geometry.normals));
        }
        if (geometry.colors.length > 0) {
            const colors = new Float32Array(geometry.colors.length * 3);
            this.addAttribute("color", new BufferAttribute(colors, 3).copyColorsArray(geometry.colors));
        }
        if (geometry.uvs.length > 0) {
            const uvs = new Float32Array(geometry.uvs.length * 2);
            this.addAttribute("uv", new BufferAttribute(uvs, 2).copyVector2sArray(geometry.uvs));
        }
        if (geometry.uvs2.length > 0) {
            const uvs2 = new Float32Array(geometry.uvs2.length * 2);
            this.addAttribute("uv2", new BufferAttribute(uvs2, 2).copyVector2sArray(geometry.uvs2));
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
            if (!geometry.morphTargets.hasOwnProperty(name))
                continue;
            const array = [];
            const morphTargets = geometry.morphTargets[name];
            for (let i = 0, l = morphTargets.length; i < l; i++) {
                const morphTarget = morphTargets[i];
                const attribute = new Float32BufferAttribute(new Array(morphTarget.length * 3), 3);
                array.push(attribute.copyVector3sArray(morphTarget));
            }
            this.morphAttributes[name] = array;
        }
        // skinning
        if (geometry.skinIndices.length > 0) {
            const skinIndices = new Float32BufferAttribute(new Array(geometry.skinIndices.length * 4), 4);
            this.addAttribute("skinIndex", skinIndices.copyVector4sArray(geometry.skinIndices));
        }
        if (geometry.skinWeights.length > 0) {
            const skinWeights = new Float32BufferAttribute(new Array(geometry.skinWeights.length * 4), 4);
            this.addAttribute("skinWeight", skinWeights.copyVector4sArray(geometry.skinWeights));
        }
        if (geometry.boundingSphere !== null) {
            this.boundingSphere = geometry.boundingSphere.clone();
        }
        if (geometry.boundingBox !== null) {
            this.boundingBox = geometry.boundingBox.clone();
        }
        return this;
    }
    computeBoundingBox() {
        if (this.boundingBox === null) {
            this.boundingBox = new Box3();
        }
        const position = this.attributes.position;
        if (position !== undefined) {
            setBoxFromBufferAttribute(this.boundingBox, position);
        }
        else {
            this.boundingBox.makeEmpty();
        }
        if (isNaN(this.boundingBox.min.x) ||
            isNaN(this.boundingBox.min.y) ||
            isNaN(this.boundingBox.min.z)) {
            console.error(`THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`, this);
        }
    }
    computeBoundingSphere() {
        if (this.boundingSphere === null) {
            this.boundingSphere = new Sphere();
        }
        const position = this.attributes.position;
        if (position) {
            const box = new Box3();
            setBoxFromBufferAttribute(box, position);
            const center = box.getCenter();
            // hoping to find a boundingSphere with a radius smaller than the
            // boundingSphere of the boundingBox: sqrt(3) smaller in the best case
            let maxRadiusSquare = 0;
            for (let i = 0, il = position.count; i < il; i++) {
                const vector = new Vector3();
                vector.x = position.getProperty(i, "x");
                vector.y = position.getProperty(i, "y");
                vector.z = position.getProperty(i, "z");
                maxRadiusSquare = Math.max(maxRadiusSquare, center.distanceToSquared(vector));
            }
            this.boundingSphere.radius = Math.sqrt(maxRadiusSquare);
            if (isNaN(this.boundingSphere.radius)) {
                console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`, this);
            }
        }
    }
    computeVertexNormals() {
        const index = this.index;
        const attributes = this.attributes;
        const groups = this.groups;
        if (attributes.position) {
            const positions = attributes.position.array;
            if (attributes.normal === undefined) {
                this.addAttribute("normal", new BufferAttribute(new Float32Array(positions.length), 3));
            }
            else {
                // reset existing normals to zero
                const array = attributes.normal.array;
                for (let i = 0, il = array.length; i < il; i++) {
                    array[i] = 0;
                }
            }
            const normals = attributes.normal.array;
            let vA, vB, vC;
            const pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
            const cb = new Vector3(), ab = new Vector3();
            // indexed elements
            if (index) {
                const indices = index.array;
                if (groups.length === 0) {
                    this.addGroup(0, indices.length);
                }
                for (let j = 0, jl = groups.length; j < jl; ++j) {
                    const group = groups[j];
                    const start = group.start;
                    const count = group.count;
                    for (let i = start, il = start + count; i < il; i += 3) {
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
            }
            else {
                // non-indexed elements (unconnected triangle soup)
                for (let i = 0, il = positions.length; i < il; i += 9) {
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
    normalizeNormals() {
        const vector = new Vector3();
        const normals = this.attributes.normal;
        for (let i = 0, il = normals.count; i < il; i++) {
            vector.x = normals.getProperty(i, "x");
            vector.y = normals.getProperty(i, "y");
            vector.z = normals.getProperty(i, "z");
            vector.normalize();
            normals.setProperty(i, "xyz", vector);
        }
    }
    toNonIndexed() {
        if (this.index === null) {
            console.warn(`THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed.`);
            return this;
        }
        const geometry2 = new BufferGeometry();
        const indices = this.index.array;
        const attributes = this.attributes;
        for (const name in attributes) {
            if (!attributes.hasOwnProperty(name))
                continue;
            const attribute = attributes[name];
            const array = attribute.array;
            const itemSize = attribute.itemSize;
            const array2 = new array.constructor(indices.length * itemSize);
            let index = 0, index2 = 0;
            for (let i = 0, l = indices.length; i < l; i++) {
                index = indices[i] * itemSize;
                for (let j = 0; j < itemSize; j++) {
                    array2[index2++] = array[index++];
                }
            }
            geometry2.addAttribute(name, new BufferAttribute(array2, itemSize));
        }
        return geometry2;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(source) {
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
        const index = source.index;
        if (index !== null) {
            this.setIndex(index.clone());
        }
        // attributes
        const attributes = source.attributes;
        for (const name in attributes) {
            if (!attributes.hasOwnProperty(name))
                continue;
            const attribute = attributes[name];
            this.addAttribute(name, attribute.clone());
        }
        // morph attributes
        const morphAttributes = source.morphAttributes;
        for (const name in morphAttributes) {
            if (!attributes.hasOwnProperty(name))
                continue;
            const array = [];
            const morphAttribute = morphAttributes[name]; // morphAttribute: array of Float32BufferAttributes
            for (let i = 0, l = morphAttribute.length; i < l; i++) {
                array.push(morphAttribute[i].clone());
            }
            this.morphAttributes[name] = array;
        }
        // groups
        const groups = source.groups;
        for (let i = 0, l = groups.length; i < l; i++) {
            const group = groups[i];
            this.addGroup(group.start, group.count, group.materialIndex);
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
        // draw range
        this.drawRange.start = source.drawRange.start;
        this.drawRange.count = source.drawRange.count;
        return this;
    }
    dispose() {
        this.dispatchEvent({ type: "dispose" });
    }
}
