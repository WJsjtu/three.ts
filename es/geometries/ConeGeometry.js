import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { CylinderBufferGeometry, CylinderGeometry } from "./CylinderGeometry";
export class ConeGeometry extends Geometry {
    constructor(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
        super();
        this.type = "ConeGeometry";
        CylinderGeometry.call(this, 0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
        this.parameters = {
            height: height,
            heightSegments: heightSegments,
            openEnded: openEnded,
            radialSegments: radialSegments,
            radius: radius,
            thetaLength: thetaLength,
            thetaStart: thetaStart,
        };
    }
}
export class ConeBufferGeometry extends BufferGeometry {
    constructor(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength) {
        super();
        this.type = "ConeBufferGeometry";
        CylinderBufferGeometry.call(this, 0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
        this.parameters = {
            height: height,
            heightSegments: heightSegments,
            openEnded: openEnded,
            radialSegments: radialSegments,
            radius: radius,
            thetaLength: thetaLength,
            thetaStart: thetaStart,
        };
    }
}
