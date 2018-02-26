import { Geometry } from "../../core/Geometry";
export class WebGLObjects {
    constructor(geometries, infoRender) {
        this.geometries = null;
        this.infoRender = null;
        this.updateList = {};
        this.geometries = geometries;
        this.infoRender = infoRender;
    }
    update(object) {
        const frame = this.infoRender.frame;
        const geometry = object.geometry;
        const bufferGeometry = this.geometries.get(object, geometry);
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
    dispose() {
        this.updateList = {};
    }
}
