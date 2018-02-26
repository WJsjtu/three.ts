import { Float32BufferAttribute } from "../core/BufferAttribute";
import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Vector3 } from "../math/Vector3";
export class CylinderGeometry extends Geometry {
    constructor(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
        super();
        this.type = "CylinderGeometry";
        this.parameters = {
            height: height,
            heightSegments: heightSegments,
            openEnded: openEnded,
            radialSegments: radialSegments,
            radiusBottom: radiusBottom,
            radiusTop: radiusTop,
            thetaLength: thetaLength,
            thetaStart: thetaStart,
        };
        this.fromBufferGeometry(new CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength));
        this.mergeVertices();
    }
}
export class CylinderBufferGeometry extends BufferGeometry {
    constructor(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 9, heightSegments = 1, openEnded = false, thetaStart = 0, thetaLength = Math.PI * 2) {
        super();
        this.type = "CylinderBufferGeometry";
        this.parameters = {
            height: height,
            heightSegments: heightSegments,
            openEnded: openEnded,
            radialSegments: radialSegments,
            radiusBottom: radiusBottom,
            radiusTop: radiusTop,
            thetaLength: thetaLength,
            thetaStart: thetaStart,
        };
        radialSegments = Math.floor(radialSegments);
        heightSegments = Math.floor(heightSegments);
        // buffers
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        // helper variables
        let index = 0;
        const indexArray = [];
        const halfHeight = height / 2;
        let groupStart = 0;
        const generateCap = (top) => {
            let centerIndexStart, centerIndexEnd;
            let groupCount = 0;
            const radius = top ? radiusTop : radiusBottom;
            const sign = top ? 1 : -1;
            // save the index of the first center vertex
            centerIndexStart = index;
            // first we generate the center vertex data of the cap.
            // because the geometry needs one set of uvs per face,
            // we must generate a center vertex per face/segment
            for (let x = 1; x <= radialSegments; x++) {
                // vertex
                vertices.push(0, halfHeight * sign, 0);
                // normal
                normals.push(0, sign, 0);
                // uv
                uvs.push(0.5, 0.5);
                // increase index
                index++;
            }
            // save the index of the last center vertex
            centerIndexEnd = index;
            // now we generate the surrounding vertices, normals and uvs
            for (let x = 0; x <= radialSegments; x++) {
                const u = x / radialSegments;
                const theta = u * thetaLength + thetaStart;
                const cosTheta = Math.cos(theta);
                const sinTheta = Math.sin(theta);
                // vertex
                vertices.push(radius * sinTheta, halfHeight * sign, radius * cosTheta);
                // normal
                normals.push(0, sign, 0);
                // uv
                uvs.push(cosTheta * 0.5 + 0.5, sinTheta * 0.5 * sign + 0.5);
                // increase index
                index++;
            }
            // generate indices
            for (let x = 0; x < radialSegments; x++) {
                const c = centerIndexStart + x;
                const i = centerIndexEnd + x;
                if (top) {
                    // face top
                    indices.push(i, i + 1, c);
                }
                else {
                    // face bottom
                    indices.push(i + 1, i, c);
                }
                groupCount += 3;
            }
            // add a group to the geometry. this will ensure multi material support
            this.addGroup(groupStart, groupCount, top === true ? 1 : 2);
            // calculate new start value for groups
            groupStart += groupCount;
        };
        const generateTorso = () => {
            let groupCount = 0;
            // this will be used to calculate the normal
            const slope = (radiusBottom - radiusTop) / height;
            // generate vertices, normals and uvs
            for (let y = 0; y <= heightSegments; y++) {
                const indexRow = [];
                const v = y / heightSegments;
                // calculate the radius of the current row
                const radius = v * (radiusBottom - radiusTop) + radiusTop;
                for (let x = 0; x <= radialSegments; x++) {
                    const u = x / radialSegments;
                    const theta = u * thetaLength + thetaStart;
                    const sinTheta = Math.sin(theta);
                    const cosTheta = Math.cos(theta);
                    // vertex
                    vertices.push(radius * sinTheta, -v * height + halfHeight, radius * cosTheta);
                    // normal
                    const normal = new Vector3();
                    normal.set(sinTheta, slope, cosTheta).normalize();
                    normals.push(normal.x, normal.y, normal.z);
                    // uv
                    uvs.push(u, 1 - v);
                    // save index of vertex in respective row
                    indexRow.push(index++);
                }
                // now save vertices of the row in our index array
                indexArray.push(indexRow);
            }
            // generate indices
            for (let x = 0; x < radialSegments; x++) {
                for (let y = 0; y < heightSegments; y++) {
                    // we use the index array to access the correct indices
                    const a = indexArray[y][x];
                    const b = indexArray[y + 1][x];
                    const c = indexArray[y + 1][x + 1];
                    const d = indexArray[y][x + 1];
                    // faces
                    indices.push(a, b, d);
                    indices.push(b, c, d);
                    // update group counter
                    groupCount += 6;
                }
            }
            // add a group to the geometry. this will ensure multi material support
            this.addGroup(groupStart, groupCount, 0);
            // calculate new start value for groups
            groupStart += groupCount;
        };
        // generate geometry
        generateTorso();
        if (openEnded === false) {
            if (radiusTop > 0)
                generateCap(true);
            if (radiusBottom > 0)
                generateCap(false);
        }
        // build geometry
        this.setIndex(indices);
        this.addAttribute("position", new Float32BufferAttribute(vertices, 3));
        this.addAttribute("normal", new Float32BufferAttribute(normals, 3));
        this.addAttribute("uv", new Float32BufferAttribute(uvs, 2));
    }
}
