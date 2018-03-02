import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Float32BufferAttribute } from "../core/BufferAttribute";
export class PlaneGeometry extends Geometry {
    constructor(width, height, widthSegments, heightSegments) {
        super();
        this.type = "PlaneGeometry";
        this.parameters = {
            width: width,
            height: height,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
        };
        this.fromBufferGeometry(new PlaneBufferGeometry(width, height, widthSegments, heightSegments));
        this.mergeVertices();
    }
}
export class PlaneBufferGeometry extends BufferGeometry {
    constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
        super();
        this.type = "PlaneBufferGeometry";
        this.parameters = {
            width: width,
            height: height,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
        };
        const widthHalf = width / 2;
        const heightHalf = height / 2;
        const gridX = Math.floor(widthSegments) || 1;
        const gridY = Math.floor(heightSegments) || 1;
        const gridX1 = gridX + 1;
        const gridY1 = gridY + 1;
        const segmentWidth = width / gridX;
        const segmentHeight = height / gridY;
        // buffers
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        // generate vertices, normals and uvs
        for (let iy = 0; iy < gridY1; iy++) {
            const y = iy * segmentHeight - heightHalf;
            for (let ix = 0; ix < gridX1; ix++) {
                const x = ix * segmentWidth - widthHalf;
                vertices.push(x, -y, 0);
                normals.push(0, 0, 1);
                uvs.push(ix / gridX);
                uvs.push(1 - iy / gridY);
            }
        }
        // indices
        for (let iy = 0; iy < gridY; iy++) {
            for (let ix = 0; ix < gridX; ix++) {
                const a = ix + gridX1 * iy;
                const b = ix + gridX1 * (iy + 1);
                const c = ix + 1 + gridX1 * (iy + 1);
                const d = ix + 1 + gridX1 * iy;
                // faces
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        // build geometry
        this.setIndex(indices);
        this.addAttribute("position", new Float32BufferAttribute(vertices, 3));
        this.addAttribute("normal", new Float32BufferAttribute(normals, 3));
        this.addAttribute("uv", new Float32BufferAttribute(uvs, 2));
    }
}
