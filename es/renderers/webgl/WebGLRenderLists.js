export class WebGLRenderList {
    constructor() {
        this.opaque = [];
        this.transparent = [];
        this.renderItems = [];
        this.renderItemsIndex = 0;
    }
    init() {
        this.renderItemsIndex = 0;
        this.opaque.length = 0;
        this.transparent.length = 0;
        return this;
    }
    push(object, geometry, material, z, group) {
        let renderItem = this.renderItems[this.renderItemsIndex];
        if (renderItem === undefined) {
            renderItem = {
                geometry: geometry,
                group: group,
                id: object.id,
                material: material,
                object: object,
                program: material.program,
                renderOrder: object.renderOrder,
                z: z,
            };
            this.renderItems[this.renderItemsIndex] = renderItem;
        }
        else {
            renderItem.id = object.id;
            renderItem.object = object;
            renderItem.geometry = geometry;
            renderItem.material = material;
            renderItem.program = material.program;
            renderItem.renderOrder = object.renderOrder;
            renderItem.z = z;
            renderItem.group = group;
        }
        (material.transparent === true ? this.transparent : this.opaque).push(renderItem);
        this.renderItemsIndex++;
    }
    sort() {
        if (this.opaque.length > 1) {
            this.opaque.sort((a, b) => {
                if (a.renderOrder !== b.renderOrder) {
                    return a.renderOrder - b.renderOrder;
                }
                else if (a.program && b.program && a.program !== b.program) {
                    return a.program.id - b.program.id;
                }
                else if (a.material.id !== b.material.id) {
                    return a.material.id - b.material.id;
                }
                else if (a.z !== b.z) {
                    return a.z - b.z;
                }
                else {
                    return a.id - b.id;
                }
            });
        }
        if (this.transparent.length > 1) {
            this.transparent.sort((a, b) => {
                if (a.renderOrder !== b.renderOrder) {
                    return a.renderOrder - b.renderOrder;
                }
                if (a.z !== b.z) {
                    return b.z - a.z;
                }
                else {
                    return a.id - b.id;
                }
            });
        }
    }
}
export class WebGLRenderLists {
    constructor() {
        this.lists = {};
    }
    get(scene, camera) {
        const hash = scene.id + "," + camera.id;
        let list = this.lists[hash];
        if (list === undefined) {
            list = new WebGLRenderList();
            this.lists[hash] = list;
        }
        return list;
    }
    dispose() {
        this.lists = {};
    }
}
