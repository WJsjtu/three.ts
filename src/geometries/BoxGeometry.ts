import { Float32BufferAttribute } from "../core/BufferAttribute";
import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Vector3 } from "../math/Vector3";

export interface IBoxGeometryParameters {
    width: number;
    height: number;
    depth: number;
    widthSegments: number;
    heightSegments: number;
    depthSegments: number;
}

export class BoxGeometry extends Geometry {
    public readonly type: string = "BoxGeometry";
    public parameters: IBoxGeometryParameters;

    constructor(
        width?: number,
        height?: number,
        depth?: number,
        widthSegments?: number,
        heightSegments?: number,
        depthSegments?: number,
    ) {
        super();
        this.parameters = {
            depth: depth,
            depthSegments: depthSegments,
            height: height,
            heightSegments: heightSegments,
            width: width,
            widthSegments: widthSegments,
        };
    }
}

export class BoxBufferGeometry extends BufferGeometry {
    public readonly type: string = "BoxBufferGeometry";
    public parameters: IBoxGeometryParameters;

    constructor(
        width: number = 1,
        height: number = 1,
        depth: number = 1,
        widthSegments: number = 1,
        heightSegments: number = 1,
        depthSegments: number = 1,
    ) {
        super();
        this.parameters = {
            depth: depth,
            depthSegments: depthSegments,
            height: height,
            heightSegments: heightSegments,
            width: width,
            widthSegments: widthSegments,
        };

        widthSegments = Math.floor(widthSegments);
        heightSegments = Math.floor(heightSegments);
        depthSegments = Math.floor(depthSegments);

        // buffers

        const indices: number[] = [];
        const vertices: number[] = [];
        const normals: number[] = [];
        const uvs: number[] = [];

        // helper variables

        let numberOfVertices: number = 0;
        let groupStart: number = 0;

        const buildPlane = (
            u: string,
            v: string,
            w: string,
            uDir: number,
            vDir: number,
            width2: number,
            height2: number,
            depth2: number,
            gridX: number,
            gridY: number,
            materialIndex: number,
        ): void => {
            const segmentWidth: number = width2 / gridX;
            const segmentHeight: number = height2 / gridY;

            const widthHalf: number = width2 / 2;
            const heightHalf: number = height2 / 2;
            const depthHalf: number = depth2 / 2;

            const gridX1: number = gridX + 1;
            const gridY1: number = gridY + 1;

            let vertexCounter: number = 0;
            let groupCount: number = 0;

            // generate vertices, normals and uvs

            for (let iy: number = 0; iy < gridY1; iy++) {
                const y: number = iy * segmentHeight - heightHalf;

                for (let ix: number = 0; ix < gridX1; ix++) {
                    const x: number = ix * segmentWidth - widthHalf;
                    const vector: Vector3 = new Vector3();
                    // set values to correct vector component
                    vector[u] = x * uDir;
                    vector[v] = y * vDir;
                    vector[w] = depthHalf;
                    // now apply vector to vertex buffer
                    vertices.push(vector.x, vector.y, vector.z);
                    // set values to correct vector component
                    vector[u] = 0;
                    vector[v] = 0;
                    vector[w] = depth2 > 0 ? 1 : -1;
                    // now apply vector to normal buffer
                    normals.push(vector.x, vector.y, vector.z);
                    // uvs
                    uvs.push(ix / gridX);
                    uvs.push(1 - iy / gridY);
                    // counters
                    vertexCounter += 1;
                }
            }
            // indices
            // 1. you need three indices to draw a single face
            // 2. a single segment consists of two faces
            // 3. so we need to generate six (2*3) indices per segment
            for (let iy: number = 0; iy < gridY; iy++) {
                for (let ix: number = 0; ix < gridX; ix++) {
                    const a: number = numberOfVertices + ix + gridX1 * iy;
                    const b: number = numberOfVertices + ix + gridX1 * (iy + 1);
                    const c: number =
                        numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
                    const d: number = numberOfVertices + (ix + 1) + gridX1 * iy;
                    // faces
                    indices.push(a, b, d);
                    indices.push(b, c, d);
                    // increase counter
                    groupCount += 6;
                }
            }
            // add a group to the geometry. this will ensure multi material support
            this.addGroup(groupStart, groupCount, materialIndex);
            // calculate new start value for groups
            groupStart += groupCount;
            // update total number of vertices
            numberOfVertices += vertexCounter;
        };

        // build each side of the box geometry
        buildPlane(
            "z",
            "y",
            "x",
            -1,
            -1,
            depth,
            height,
            width,
            depthSegments,
            heightSegments,
            0,
        ); // px
        buildPlane(
            "z",
            "y",
            "x",
            1,
            -1,
            depth,
            height,
            -width,
            depthSegments,
            heightSegments,
            1,
        ); // nx
        buildPlane(
            "x",
            "z",
            "y",
            1,
            1,
            width,
            depth,
            height,
            widthSegments,
            depthSegments,
            2,
        ); // py
        buildPlane(
            "x",
            "z",
            "y",
            1,
            -1,
            width,
            depth,
            -height,
            widthSegments,
            depthSegments,
            3,
        ); // ny
        buildPlane(
            "x",
            "y",
            "z",
            1,
            -1,
            width,
            height,
            depth,
            widthSegments,
            heightSegments,
            4,
        ); // pz
        buildPlane(
            "x",
            "y",
            "z",
            -1,
            -1,
            width,
            height,
            -depth,
            widthSegments,
            heightSegments,
            5,
        ); // nz

        // build geometry
        this.setIndex(indices);
        this.addAttribute("position", new Float32BufferAttribute(vertices, 3));
        this.addAttribute("normal", new Float32BufferAttribute(normals, 3));
        this.addAttribute("uv", new Float32BufferAttribute(uvs, 2));
    }
}
