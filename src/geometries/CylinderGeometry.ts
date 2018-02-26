import { Float32BufferAttribute } from "../core/BufferAttribute";
import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { Vector3 } from "../math/Vector3";

export interface ICylinderGeometryParameters {
    radiusTop: number;
    radiusBottom: number;
    height: number;
    radialSegments: number;
    heightSegments: number;
    openEnded: boolean;
    thetaStart: number;
    thetaLength: number;
}

export class CylinderGeometry extends Geometry {
    public readonly type: string = "CylinderGeometry";
    public parameters: ICylinderGeometryParameters;

    constructor(
        radiusTop?: number,
        radiusBottom?: number,
        height?: number,
        radialSegments?: number,
        heightSegments?: number,
        openEnded?: boolean,
        thetaStart?: number,
        thetaLength?: number,
    ) {
        super();
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
        this.fromBufferGeometry(
            new CylinderBufferGeometry(
                radiusTop,
                radiusBottom,
                height,
                radialSegments,
                heightSegments,
                openEnded,
                thetaStart,
                thetaLength,
            ),
        );
        this.mergeVertices();
    }
}

export class CylinderBufferGeometry extends BufferGeometry {
    public readonly type: string = "CylinderBufferGeometry";
    public parameters: ICylinderGeometryParameters;

    constructor(
        radiusTop: number = 1,
        radiusBottom: number = 1,
        height: number = 1,
        radialSegments: number = 9,
        heightSegments: number = 1,
        openEnded: boolean = false,
        thetaStart: number = 0,
        thetaLength: number = Math.PI * 2,
    ) {
        super();
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
        const indices: number[] = [];
        const vertices: number[] = [];
        const normals: number[] = [];
        const uvs: number[] = [];

        // helper variables
        let index: number = 0;
        const indexArray: number[][] = [];
        const halfHeight: number = height / 2;
        let groupStart: number = 0;

        const generateCap = (top: boolean): void => {
            let centerIndexStart: number, centerIndexEnd: number;
            let groupCount: number = 0;
            const radius: number = top ? radiusTop : radiusBottom;
            const sign: number = top ? 1 : -1;
            // save the index of the first center vertex
            centerIndexStart = index;
            // first we generate the center vertex data of the cap.
            // because the geometry needs one set of uvs per face,
            // we must generate a center vertex per face/segment
            for (let x: number = 1; x <= radialSegments; x++) {
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
            for (let x: number = 0; x <= radialSegments; x++) {
                const u: number = x / radialSegments;
                const theta: number = u * thetaLength + thetaStart;
                const cosTheta: number = Math.cos(theta);
                const sinTheta: number = Math.sin(theta);
                // vertex

                vertices.push(
                    radius * sinTheta,
                    halfHeight * sign,
                    radius * cosTheta,
                );
                // normal
                normals.push(0, sign, 0);
                // uv
                uvs.push(cosTheta * 0.5 + 0.5, sinTheta * 0.5 * sign + 0.5);
                // increase index
                index++;
            }
            // generate indices
            for (let x: number = 0; x < radialSegments; x++) {
                const c: number = centerIndexStart + x;
                const i: number = centerIndexEnd + x;
                if (top) {
                    // face top
                    indices.push(i, i + 1, c);
                } else {
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

        const generateTorso = (): void => {
            let groupCount: number = 0;
            // this will be used to calculate the normal
            const slope: number = (radiusBottom - radiusTop) / height;
            // generate vertices, normals and uvs
            for (let y: number = 0; y <= heightSegments; y++) {
                const indexRow: number[] = [];
                const v: number = y / heightSegments;
                // calculate the radius of the current row
                const radius: number =
                    v * (radiusBottom - radiusTop) + radiusTop;
                for (let x: number = 0; x <= radialSegments; x++) {
                    const u: number = x / radialSegments;
                    const theta: number = u * thetaLength + thetaStart;
                    const sinTheta: number = Math.sin(theta);
                    const cosTheta: number = Math.cos(theta);
                    // vertex
                    vertices.push(
                        radius * sinTheta,
                        -v * height + halfHeight,
                        radius * cosTheta,
                    );
                    // normal
                    const normal: Vector3 = new Vector3();
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
            for (let x: number = 0; x < radialSegments; x++) {
                for (let y: number = 0; y < heightSegments; y++) {
                    // we use the index array to access the correct indices
                    const a: number = indexArray[y][x];
                    const b: number = indexArray[y + 1][x];
                    const c: number = indexArray[y + 1][x + 1];
                    const d: number = indexArray[y][x + 1];
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
            if (radiusTop > 0) generateCap(true);
            if (radiusBottom > 0) generateCap(false);
        }
        // build geometry
        this.setIndex(indices);
        this.addAttribute("position", new Float32BufferAttribute(vertices, 3));
        this.addAttribute("normal", new Float32BufferAttribute(normals, 3));
        this.addAttribute("uv", new Float32BufferAttribute(uvs, 2));
    }
}
