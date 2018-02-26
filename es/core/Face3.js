import { Color } from "../math/Color";
import { Vector3 } from "../math/Vector3";
export class Face3 {
    constructor(a = 0, b = 0, c = 0, normal = new Vector3(), color = new Color(), materialIndex = 0) {
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.normal = new Vector3();
        this.vertexNormals = [];
        this.color = new Color();
        this.vertexColors = [];
        this.materialIndex = 0;
        this.a = a;
        this.b = b;
        this.c = c;
        if (normal instanceof Vector3)
            this.normal = normal;
        if (Array.isArray(normal))
            this.vertexNormals = normal;
        if (color instanceof Color)
            this.color = color;
        if (Array.isArray(color))
            this.vertexColors = color;
        this.materialIndex = materialIndex;
    }
    copy(source) {
        this.a = source.a;
        this.b = source.b;
        this.c = source.c;
        this.normal.copy(source.normal);
        this.color.copy(source.color);
        this.materialIndex = source.materialIndex;
        for (let i = 0, il = source.vertexNormals.length; i < il; i++) {
            this.vertexNormals[i] = source.vertexNormals[i].clone();
        }
        for (let i = 0, il = source.vertexColors.length; i < il; i++) {
            this.vertexColors[i] = source.vertexColors[i].clone();
        }
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
