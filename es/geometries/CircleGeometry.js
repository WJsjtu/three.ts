import { Float32BufferAttribute } from "../core/BufferAttribute";
import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
export class CircleGeometry extends Geometry {
    constructor(radius, segments, thetaStart, thetaLength) {
        super();
        this.type = "CircleGeometry";
        this.parameters = {
            radius: radius,
            segments: segments,
            thetaLength: thetaLength,
            thetaStart: thetaStart,
        };
        this.fromBufferGeometry(new CircleBufferGeometry(radius, segments, thetaStart, thetaLength));
        this.mergeVertices();
    }
}
export class CircleBufferGeometry extends BufferGeometry {
    constructor(radius = 1, segments, thetaStart = 0, thetaLength = Math.PI * 2) {
        super();
        this.type = "CircleBufferGeometry";
        this.parameters = {
            radius: radius,
            segments: segments,
            thetaLength: thetaLength,
            thetaStart: thetaStart,
        };
        segments = segments !== undefined ? Math.max(3, segments) : 8;
        // buffers
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        // center point
        vertices.push(0, 0, 0);
        normals.push(0, 0, 1);
        uvs.push(0.5, 0.5);
        for (let s = 0, i = 3; s <= segments; s++, i += 3) {
            const segment = thetaStart + s / segments * thetaLength;
            // vertex
            vertices.push(radius * Math.cos(segment), radius * Math.sin(segment), 0);
            // normal
            normals.push(0, 0, 1);
            // uvs
            uvs.push((vertices[i] / radius + 1) / 2, (vertices[i + 1] / radius + 1) / 2);
        }
        // indices
        for (let i = 1; i <= segments; i++) {
            indices.push(i, i + 1, 0);
        }
        // build geometry
        this.setIndex(indices);
        this.addAttribute("position", new Float32BufferAttribute(vertices, 3));
        this.addAttribute("normal", new Float32BufferAttribute(normals, 3));
        this.addAttribute("uv", new Float32BufferAttribute(uvs, 2));
    }
}
