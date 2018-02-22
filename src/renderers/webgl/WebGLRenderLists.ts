import { BufferGeometry } from "../../core/BufferGeometry";
import { IGroup } from "../../core/DirectGeometry";
import { Geometry } from "../../core/Geometry";
import { Object3D } from "../../core/Object3D";
import { Material } from "../../materials/Material";

export interface IRenderItem {
    geometry: BufferGeometry;
    group: IGroup;
    id: number;
    material: Material;
    object: Object3D;
    program: any;
    renderOrder: number;
    z: number;
}

export class WebGLRenderList {
    public opaque: IRenderItem[] = [];
    public transparent: IRenderItem[] = [];

    protected renderItems: IRenderItem[] = [];
    protected renderItemsIndex: number = 0;

    public init(): this {
        this.renderItemsIndex = 0;
        this.opaque.length = 0;
        this.transparent.length = 0;
        return this;
    }

    public push(
        object: Object3D,
        geometry: BufferGeometry,
        material: Material,
        z: number,
        group: IGroup,
    ) {
        let renderItem: IRenderItem = this.renderItems[this.renderItemsIndex];
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
        } else {
            renderItem.id = object.id;
            renderItem.object = object;
            renderItem.geometry = geometry;
            renderItem.material = material;
            renderItem.program = material.program;
            renderItem.renderOrder = object.renderOrder;
            renderItem.z = z;
            renderItem.group = group;
        }
        (material.transparent === true ? this.transparent : this.opaque).push(
            renderItem,
        );
        this.renderItemsIndex++;
    }

    public sort() {
        if (this.opaque.length > 1) {
            this.opaque.sort((a: IRenderItem, b: IRenderItem) => {
                if (a.renderOrder !== b.renderOrder) {
                    return a.renderOrder - b.renderOrder;
                } else if (a.program && b.program && a.program !== b.program) {
                    return a.program.id - b.program.id;
                } else if (a.material.id !== b.material.id) {
                    return a.material.id - b.material.id;
                } else if (a.z !== b.z) {
                    return a.z - b.z;
                } else {
                    return a.id - b.id;
                }
            });
        }
        if (this.transparent.length > 1) {
            this.transparent.sort((a: IRenderItem, b: IRenderItem) => {
                if (a.renderOrder !== b.renderOrder) {
                    return a.renderOrder - b.renderOrder;
                }
                if (a.z !== b.z) {
                    return b.z - a.z;
                } else {
                    return a.id - b.id;
                }
            });
        }
    }
}

export class WebGLRenderLists {}
