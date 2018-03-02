import { Uint16BufferAttribute, Uint32BufferAttribute } from "../../core/BufferAttribute";
import { BufferGeometry } from "../../core/BufferGeometry";
import { Geometry } from "../../core/Geometry";
import { arrayMax } from "../../utils";
export class WebGLGeometries {
    constructor(context, attributes, infoMemory) {
        this.geometries = {};
        this.wireframeAttributes = {};
        this.context = context;
        this.attributes = attributes;
        this.infoMemory = infoMemory;
    }
    onGeometryDispose(event) {
        const geometry = event.target;
        const bufferGeometry = this.geometries[geometry.id];
        if (bufferGeometry.index !== null) {
            this.attributes.remove(bufferGeometry.index);
        }
        for (const name in bufferGeometry.attributes) {
            if (!bufferGeometry.attributes.hasOwnProperty(name)) {
                continue;
            }
            this.attributes.remove(bufferGeometry.attributes[name]);
        }
        geometry.removeEventListener("dispose", this.onGeometryDispose);
        delete this.geometries[geometry.id];
        // TODO Remove duplicate code
        let attribute = this.wireframeAttributes[geometry.id];
        if (attribute) {
            this.attributes.remove(attribute);
            delete this.wireframeAttributes[geometry.id];
        }
        attribute = this.wireframeAttributes[bufferGeometry.id];
        if (attribute) {
            this.attributes.remove(attribute);
            delete this.wireframeAttributes[bufferGeometry.id];
        }
        this.infoMemory.geometries--;
    }
    get(object, geometry) {
        let bufferGeometry = this.geometries[geometry.id];
        if (bufferGeometry)
            return bufferGeometry;
        geometry.addEventListener("dispose", this.onGeometryDispose);
        if (geometry instanceof BufferGeometry) {
            bufferGeometry = geometry;
        }
        else if (geometry instanceof Geometry) {
            if (geometry.bufferGeometry === null) {
                geometry.bufferGeometry = new BufferGeometry().setFromObject(object);
            }
            bufferGeometry = geometry.bufferGeometry;
        }
        this.geometries[geometry.id] = bufferGeometry;
        this.infoMemory.geometries++;
        return bufferGeometry;
    }
    update(geometry) {
        const index = geometry.index;
        const geometryAttributes = geometry.attributes;
        if (index !== null) {
            this.attributes.update(index, this.context.ELEMENT_ARRAY_BUFFER);
        }
        for (const name in geometryAttributes) {
            if (!geometryAttributes.hasOwnProperty(name)) {
                continue;
            }
            this.attributes.update(geometryAttributes[name], this.context.ARRAY_BUFFER);
        }
        // morph targets
        const morphAttributes = geometry.morphAttributes;
        for (const name in morphAttributes) {
            if (!morphAttributes.hasOwnProperty(name)) {
                continue;
            }
            const array = morphAttributes[name];
            for (let i = 0, l = array.length; i < l; i++) {
                this.attributes.update(array[i], this.context.ARRAY_BUFFER);
            }
        }
        return this;
    }
    getWireframeAttribute(geometry) {
        let attribute = this.wireframeAttributes[geometry.id];
        if (attribute)
            return attribute;
        const indices = [];
        if (geometry.index !== null) {
            const array = geometry.index.array;
            for (let i = 0, l = array.length; i < l; i += 3) {
                const a = array[i];
                const b = array[i + 1];
                const c = array[i + 2];
                indices.push(a, b, b, c, c, a);
            }
        }
        else {
            const array = geometry.attributes.position.array;
            for (let i = 0, l = array.length / 3 - 1; i < l; i += 3) {
                const a = i;
                const b = i + 1;
                const c = i + 2;
                indices.push(a, b, b, c, c, a);
            }
        }
        attribute = new (arrayMax(indices) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(indices, 1);
        this.attributes.update(attribute, this.context.ELEMENT_ARRAY_BUFFER);
        this.wireframeAttributes[geometry.id] = attribute;
        return attribute;
    }
}
