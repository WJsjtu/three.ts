import { Float32BufferAttribute } from "../core/BufferAttribute";
import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Vector3 } from "../math/Vector3";
export class BoxGeometry extends Geometry {
    constructor(width, height, depth, widthSegments, heightSegments, depthSegments) {
        super();
        this.type = "BoxGeometry";
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
    constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
        super();
        this.type = "BoxBufferGeometry";
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
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        // helper variables
        let numberOfVertices = 0;
        let groupStart = 0;
        const buildPlane = (u, v, w, uDir, vDir, width2, height2, depth2, gridX, gridY, materialIndex) => {
            const segmentWidth = width2 / gridX;
            const segmentHeight = height2 / gridY;
            const widthHalf = width2 / 2;
            const heightHalf = height2 / 2;
            const depthHalf = depth2 / 2;
            const gridX1 = gridX + 1;
            const gridY1 = gridY + 1;
            let vertexCounter = 0;
            let groupCount = 0;
            // generate vertices, normals and uvs
            for (let iy = 0; iy < gridY1; iy++) {
                const y = iy * segmentHeight - heightHalf;
                for (let ix = 0; ix < gridX1; ix++) {
                    const x = ix * segmentWidth - widthHalf;
                    const vector = new Vector3();
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
            for (let iy = 0; iy < gridY; iy++) {
                for (let ix = 0; ix < gridX; ix++) {
                    const a = numberOfVertices + ix + gridX1 * iy;
                    const b = numberOfVertices + ix + gridX1 * (iy + 1);
                    const c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
                    const d = numberOfVertices + (ix + 1) + gridX1 * iy;
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
        buildPlane("z", "y", "x", -1, -1, depth, height, width, depthSegments, heightSegments, 0); // px
        buildPlane("z", "y", "x", 1, -1, depth, height, -width, depthSegments, heightSegments, 1); // nx
        buildPlane("x", "z", "y", 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
        buildPlane("x", "z", "y", 1, -1, width, depth, -height, widthSegments, depthSegments, 3); // ny
        buildPlane("x", "y", "z", 1, -1, width, height, depth, widthSegments, heightSegments, 4); // pz
        buildPlane("x", "y", "z", -1, -1, width, height, -depth, widthSegments, heightSegments, 5); // nz
        // build geometry
        this.setIndex(indices);
        this.addAttribute("position", new Float32BufferAttribute(vertices, 3));
        this.addAttribute("normal", new Float32BufferAttribute(normals, 3));
        this.addAttribute("uv", new Float32BufferAttribute(uvs, 2));
    }
}
