import { BufferAttribute, TypedArray, Uint16BufferAttribute, Uint32BufferAttribute } from "../../core/BufferAttribute";
import { BufferGeometry } from "../../core/BufferGeometry";
import { IEventObject } from "../../core/EventDispatcher";
import { Geometry } from "../../core/Geometry";
import { ObjectWithGeometry } from "../../math/Box3";
import { arrayMax } from "../../utils";
import { IInfoMemory } from "../WebGLRenderer";
import { WebGLAttributes } from "./WebGLAttributes";

export class WebGLGeometries {
    protected geometries: { [key: number]: BufferGeometry } = {};
    protected wireframeAttributes: { [key: number]: BufferAttribute } = {};
    protected context: WebGLRenderingContext;
    protected attributes: WebGLAttributes;
    protected infoMemory: IInfoMemory;

    constructor(context: WebGLRenderingContext, attributes: WebGLAttributes, infoMemory: IInfoMemory) {
        this.context = context;
        this.attributes = attributes;
        this.infoMemory = infoMemory;
    }

    protected onGeometryDispose(event: IEventObject): void {
        const geometry: Geometry = event.target as Geometry;
        const bufferGeometry: BufferGeometry = this.geometries[geometry.id];
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
        let attribute: BufferAttribute = this.wireframeAttributes[geometry.id];
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

    public get(object: ObjectWithGeometry, geometry: BufferGeometry | Geometry): BufferGeometry {
        let bufferGeometry: BufferGeometry = this.geometries[geometry.id];
        if (bufferGeometry) return bufferGeometry;
        geometry.addEventListener("dispose", this.onGeometryDispose);
        if (geometry instanceof BufferGeometry) {
            bufferGeometry = geometry;
        } else if (geometry instanceof Geometry) {
            if (geometry.bufferGeometry === undefined) {
                geometry.bufferGeometry = new BufferGeometry().setFromObject(object);
            }
            bufferGeometry = geometry.bufferGeometry;
        }
        this.geometries[geometry.id] = bufferGeometry;
        this.infoMemory.geometries++;
        return bufferGeometry;
    }

    public update(geometry: BufferGeometry): this {
        const index: BufferAttribute = geometry.index;
        const geometryAttributes: { [key: string]: BufferAttribute } = geometry.attributes;
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
        const morphAttributes: { [key: string]: BufferAttribute[] } = geometry.morphAttributes;
        for (const name in morphAttributes) {
            if (!morphAttributes.hasOwnProperty(name)) {
                continue;
            }
            const array: BufferAttribute[] = morphAttributes[name];
            for (let i: number = 0, l: number = array.length; i < l; i++) {
                this.attributes.update(array[i], this.context.ARRAY_BUFFER);
            }
        }
        return this;
    }

    public getWireframeAttribute(geometry: BufferGeometry): BufferAttribute {
        let attribute: BufferAttribute = this.wireframeAttributes[geometry.id];
        if (attribute) return attribute;
        const indices: number[] = [];
        if (geometry.index !== null) {
            const array: TypedArray = geometry.index.array;
            for (let i: number = 0, l: number = array.length; i < l; i += 3) {
                const a: number = array[i];
                const b: number = array[i + 1];
                const c: number = array[i + 2];
                indices.push(a, b, b, c, c, a);
            }
        } else {
            const array: TypedArray = geometry.attributes.position.array;
            for (let i: number = 0, l: number = array.length / 3 - 1; i < l; i += 3) {
                const a: number = i;
                const b: number = i + 1;
                const c: number = i + 2;
                indices.push(a, b, b, c, c, a);
            }
        }
        attribute = new (arrayMax(indices) > 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(indices, 1);
        this.attributes.update(attribute, this.context.ELEMENT_ARRAY_BUFFER);
        this.wireframeAttributes[geometry.id] = attribute;
        return attribute;
    }
}
