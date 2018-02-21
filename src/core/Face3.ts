import {Color} from "../math/Color";
import {Vector3} from "../math/Vector3";

export class Face3 {
    public a: number = 0;
    public b: number = 0;
    public c: number = 0;

    public normal: Vector3 = new Vector3();
    public vertexNormals: Vector3[] = [];
    public color: Color = new Color();
    public vertexColors: Color[] = [];
    public materialIndex: number = 0;

    constructor(
        a: number = 0,
        b: number = 0,
        c: number = 0,
        normal: Vector3 | Vector3[] = new Vector3(),
        color: Color | Color[] = new Color(),
        materialIndex: number = 0,
    ) {
        this.a = a;
        this.b = b;
        this.c = c;

        if (normal instanceof Vector3) this.normal = normal;
        if (Array.isArray(normal)) this.vertexNormals = normal;

        if (color instanceof Color) this.color = color;
        if (Array.isArray(color)) this.vertexColors = color;

        this.materialIndex = materialIndex;
    }

    public copy(source: Face3): this {
        this.a = source.a;
        this.b = source.b;
        this.c = source.c;
        this.normal.copy(source.normal);
        this.color.copy(source.color);
        this.materialIndex = source.materialIndex;
        for (
            let i: number = 0, il: number = source.vertexNormals.length;
            i < il;
            i++
        ) {
            this.vertexNormals[i] = source.vertexNormals[i].clone();
        }
        for (
            let i: number = 0, il: number = source.vertexColors.length;
            i < il;
            i++
        ) {
            this.vertexColors[i] = source.vertexColors[i].clone();
        }
        return this;
    }

    public clone(): Face3 {
        return (new (this.constructor as () => void)() as Face3).copy(this);
    }
}
