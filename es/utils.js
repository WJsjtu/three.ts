import { Matrix4 } from "./math/Matrix4";
import { Matrix3 } from "./math/Matrix3";
import { Vector3 } from "./math/Vector3";
import { Vector2 } from "./math/Vector2";
import { Vector4 } from "./math/Vector4";
export function arrayMin(array) {
    if (array.length === 0)
        return Infinity;
    let min = array[0];
    for (let i = 1, l = array.length; i < l; ++i) {
        if (array[i] < min)
            min = array[i];
    }
    return min;
}
export function arrayMax(array) {
    if (array.length === 0)
        return -Infinity;
    let max = array[0];
    for (let i = 1, l = array.length; i < l; ++i) {
        if (array[i] > max)
            max = array[i];
    }
    return max;
}
export function applyMatrixToBufferAttribute(matrix, attribute) {
    const vec = new Vector3();
    for (let i = 0, l = attribute.count; i < l; i++) {
        vec.x = attribute.getProperty(i, "x");
        vec.y = attribute.getProperty(i, "y");
        vec.z = attribute.getProperty(i, "z");
        if (matrix instanceof Matrix4) {
            vec.applyMatrix4(matrix);
        }
        else if (matrix instanceof Matrix3) {
            vec.applyMatrix3(matrix);
        }
        attribute.setProperty(i, "xyz", vec);
    }
    return attribute;
}
export function setBoxFromBufferAttribute(target, attribute) {
    let minX = +Infinity;
    let minY = +Infinity;
    let minZ = +Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    for (let i = 0, l = attribute.count; i < l; i++) {
        const x = attribute.getProperty(i, "x");
        const y = attribute.getProperty(i, "y");
        const z = attribute.getProperty(i, "z");
        if (x < minX)
            minX = x;
        if (y < minY)
            minY = y;
        if (z < minZ)
            minZ = z;
        if (x > maxX)
            maxX = x;
        if (y > maxY)
            maxY = y;
        if (z > maxZ)
            maxZ = z;
    }
    target.min.set(minX, minY, minZ);
    target.max.set(maxX, maxY, maxZ);
}
export function unprojectVector3onCamera(vector, camera) {
    const matrix = new Matrix4();
    vector.applyMatrix4(matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix)));
    return vector;
}
export function vectorFromBufferAttribute(vector, attribute, index = 0) {
    if (vector instanceof Vector2) {
        return vector.set(attribute.getProperty(index, "x"), attribute.getProperty(index, "y"));
    }
    else if (vector instanceof Vector3) {
        return vector.set(attribute.getProperty(index, "x"), attribute.getProperty(index, "y"), attribute.getProperty(index, "z"));
    }
    else if (vector instanceof Vector4) {
        return vector.set(attribute.getProperty(index, "x"), attribute.getProperty(index, "y"), attribute.getProperty(index, "z"), attribute.getProperty(index, "w"));
    }
    return vector;
}
