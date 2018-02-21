import {Geometry} from "../core/Geometry";
import {BufferGeometry} from "../core/BufferGeometry";
import {Float32BufferAttribute} from "../core/BufferAttribute";

export interface CircleGeometryParameters {
    radius: number,
    segments: number,
    thetaStart: number,
    thetaLength: number
}

export class CircleGeometry extends Geometry {

    public readonly type: string = "CircleGeometry";
    public parameters: CircleGeometryParameters;

    constructor(radius?: number, segments?: number, thetaStart?: number, thetaLength?: number) {
        super();
        this.parameters = {
            radius: radius,
            segments: segments,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };
        this.fromBufferGeometry(new CircleBufferGeometry(radius, segments, thetaStart, thetaLength));
        this.mergeVertices();
    }
}

export class CircleBufferGeometry extends BufferGeometry {

    public readonly type: string = "CircleBufferGeometry";
    public parameters: CircleGeometryParameters;

    constructor(radius: number = 1, segments: number | undefined = undefined, thetaStart: number = 0, thetaLength: number = Math.PI * 2) {
        super();
        this.parameters = {
            radius: radius,
            segments: segments,
            thetaStart: thetaStart,
            thetaLength: thetaLength
        };
        segments = segments !== undefined ? Math.max(3, segments) : 8;
        // buffers
        const indices: Array<number> = [];
        const vertices: Array<number> = [];
        const normals: Array<number> = [];
        const uvs: Array<number> = [];
        // center point
        vertices.push(0, 0, 0);
        normals.push(0, 0, 1);
        uvs.push(0.5, 0.5);
        for (let s: number = 0, i: number = 3; s <= segments; s++, i += 3) {
            const segment: number = thetaStart + s / segments * thetaLength;
            // vertex
            vertices.push(radius * Math.cos(segment), radius * Math.sin(segment), 0);
            // normal
            normals.push(0, 0, 1);
            // uvs
            uvs.push((vertices[i] / radius + 1) / 2, (vertices[i + 1] / radius + 1) / 2);
        }
        // indices
        for (let i: number = 1; i <= segments; i++) {
            indices.push(i, i + 1, 0);
        }
        // build geometry
        this.setIndex(indices);
        this.addAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.addAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.addAttribute('uv', new Float32BufferAttribute(uvs, 2));
    }
}