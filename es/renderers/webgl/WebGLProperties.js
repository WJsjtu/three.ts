export class WebGLProperties {
    constructor() {
        this.properties = {};
    }
    get(object) {
        const uuid = object.uuid;
        let map = this.properties[uuid];
        if (map === undefined) {
            map = {};
            this.properties[uuid] = map;
        }
        return map;
    }
    remove(object) {
        delete this.properties[object.uuid];
    }
    dispose() {
        this.properties = {};
    }
}
