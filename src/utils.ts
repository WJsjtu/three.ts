import {Matrix4} from "./math/Matrix4";
import {Matrix3} from "./math/Matrix3";
import {BufferAttribute} from "./core/BufferAttribute";
import {Vector3} from "./math/Vector3";
import {Box3} from "./math/Box3";
import {Camera} from "./cameras/Camera";
import {Vector2} from "./math/Vector2";
import {Vector4} from "./math/Vector4";

export function arrayMin(array: Array<number>): number {
    if (array.length === 0) return Infinity;
    let min: number = array[0];
    for (let i: number = 1, l: number = array.length; i < l; ++i) {
        if (array[i] < min) min = array[i];
    }
    return min;
}

export function arrayMax(array: Array<number>): number {
    if (array.length === 0) return -Infinity;
    let max: number = array[0];
    for (let i: number = 1, l: number = array.length; i < l; ++i) {
        if (array[i] > max) max = array[i];
    }
    return max;
}

export function applyMatrixToBufferAttribute(matrix: Matrix4 | Matrix3, attribute: BufferAttribute): BufferAttribute {
    const vec: Vector3 = new Vector3();
    for (let i: number = 0, l: number = attribute.count; i < l; i++) {
        vec.x = attribute.getProperty(i, "x") as number;
        vec.y = attribute.getProperty(i, "y") as number;
        vec.z = attribute.getProperty(i, "z") as number;
        if (matrix instanceof Matrix4) {
            vec.applyMatrix4(matrix);
        } else if (matrix instanceof Matrix3) {
            vec.applyMatrix3(matrix);
        }
        attribute.setProperty(i, "xyz", vec);
    }
    return attribute;
}

export function setBoxFromBufferAttribute(target: Box3, attribute: BufferAttribute): void {
    let minX: number = +Infinity;
    let minY: number = +Infinity;
    let minZ: number = +Infinity;
    let maxX: number = -Infinity;
    let maxY: number = -Infinity;
    let maxZ: number = -Infinity;
    for (let i: number = 0, l: number = attribute.count; i < l; i++) {
        let x: number = attribute.getProperty(i, "x") as number;
        let y: number = attribute.getProperty(i, "y") as number;
        let z: number = attribute.getProperty(i, "z") as number;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (z < minZ) minZ = z;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        if (z > maxZ) maxZ = z;
    }
    target.min.set(minX, minY, minZ);
    target.max.set(maxX, maxY, maxZ);
}

export function unprojectVector3onCamera(vector: Vector3, camera: Camera): Vector3 {
    const matrix: Matrix4 = new Matrix4();
    vector.applyMatrix4(matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix)));
    return vector;
}

export function vectorFromBufferAttribute<T = Vector4 | Vector3 | Vector2>(vector: T, attribute: BufferAttribute, index: number = 0): T {
    if (vector instanceof Vector2) {
        return vector.set(
            attribute.getProperty(index, "x") as number,
            attribute.getProperty(index, "y") as number
        )
    } else if (vector instanceof Vector3) {
        return vector.set(
            attribute.getProperty(index, "x") as number,
            attribute.getProperty(index, "y") as number,
            attribute.getProperty(index, "z") as number
        )
    } else if (vector instanceof Vector4) {
        return vector.set(
            attribute.getProperty(index, "x") as number,
            attribute.getProperty(index, "y") as number,
            attribute.getProperty(index, "z") as number,
            attribute.getProperty(index, "w") as number
        )
    }
    return vector;
}