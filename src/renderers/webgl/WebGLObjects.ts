import { BufferGeometry } from "../../core/BufferGeometry";
import { Geometry } from "../../core/Geometry";
import { ObjectWithGeometry } from "../../math/Box3";
import { WebGLGeometries } from "./WebGLGeometries";
import { IInfoRender } from "../WebGLRenderer";

export class WebGLObjects {
    protected geometries: WebGLGeometries = null;
    protected infoRender: IInfoRender = null;
    protected updateList: { [key: number]: number } = Object.create(null);

    constructor(geometries: WebGLGeometries, infoRender: IInfoRender) {
        this.geometries = geometries;
        this.infoRender = infoRender;
    }

    public update(object: ObjectWithGeometry): BufferGeometry {
        const frame: number = this.infoRender.frame;

        const geometry: BufferGeometry | Geometry = object.geometry;
        const bufferGeometry: BufferGeometry = this.geometries.get(
            object,
            geometry,
        );

        // Update once per frame
        if (this.updateList[bufferGeometry.id] !== frame) {
            if (geometry instanceof Geometry) {
                bufferGeometry.updateFromObject(object);
            }
            this.geometries.update(bufferGeometry);
            this.updateList[bufferGeometry.id] = frame;
        }

        return bufferGeometry;
    }

    public dispose() {
        this.updateList = Object.create(null);
    }
}
