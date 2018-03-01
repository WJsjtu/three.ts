import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Float32BufferAttribute } from "../core/BufferAttribute";

export interface IPlaneGeometryParameters {
    width: number;
    height: number;
    widthSegments: number;
    heightSegments: number;
}

export class PlaneGeometry extends Geometry {
    public readonly type: string = "PlaneGeometry";

    public parameters: IPlaneGeometryParameters;

    constructor(width?: number, height?: number, widthSegments?: number, heightSegments?: number) {
        super();
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
    public readonly type: string = "PlaneBufferGeometry";

    public parameters: IPlaneGeometryParameters;

    constructor(width: number = 1, height: number = 1, widthSegments: number = 1, heightSegments: number = 1) {
        super();
        this.parameters = {
            width: width,
            height: height,
            widthSegments: widthSegments,
            heightSegments: heightSegments,
        };
        const widthHalf: number = width / 2;
        const heightHalf: number = height / 2;

        const gridX: number = Math.floor(widthSegments) || 1;
        const gridY: number = Math.floor(heightSegments) || 1;

        const gridX1: number = gridX + 1;
        const gridY1: number = gridY + 1;
        const segmentWidth: number = width / gridX;
        const segmentHeight: number = height / gridY;
        // buffers
        const indices: number[] = [];
        const vertices: number[] = [];
        const normals: number[] = [];
        const uvs: number[] = [];
        // generate vertices, normals and uvs
        for (let iy: number = 0; iy < gridY1; iy++) {
            const y: number = iy * segmentHeight - heightHalf;
            for (let ix: number = 0; ix < gridX1; ix++) {
                const x: number = ix * segmentWidth - widthHalf;
                vertices.push(x, -y, 0);
                normals.push(0, 0, 1);
                uvs.push(ix / gridX);
                uvs.push(1 - iy / gridY);
            }
        }
        // indices
        for (let iy: number = 0; iy < gridY; iy++) {
            for (let ix: number = 0; ix < gridX; ix++) {
                const a: number = ix + gridX1 * iy;
                const b: number = ix + gridX1 * (iy + 1);
                const c: number = ix + 1 + gridX1 * (iy + 1);
                const d: number = ix + 1 + gridX1 * iy;
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
