import { BufferGeometry } from "../core/BufferGeometry";
import { Geometry } from "../core/Geometry";
import { CylinderBufferGeometry, CylinderGeometry } from "./CylinderGeometry";

export interface IConeGeometryParameters {
    radius: number;
    height: number;
    radialSegments: number;
    heightSegments: number;
    openEnded: boolean;
    thetaStart: number;
    thetaLength: number;
}

export class ConeGeometry extends Geometry {
    public readonly type: string = "ConeGeometry";
    public parameters: IConeGeometryParameters;

    constructor(
        radius?: number,
        height?: number,
        radialSegments?: number,
        heightSegments?: number,
        openEnded?: boolean,
        thetaStart?: number,
        thetaLength?: number,
    ) {
        super();
        CylinderGeometry.call(
            this,
            0,
            radius,
            height,
            radialSegments,
            heightSegments,
            openEnded,
            thetaStart,
            thetaLength,
        );
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
    public readonly type: string = "ConeBufferGeometry";
    public parameters: IConeGeometryParameters;

    constructor(
        radius?: number,
        height?: number,
        radialSegments?: number,
        heightSegments?: number,
        openEnded?: boolean,
        thetaStart?: number,
        thetaLength?: number,
    ) {
        super();
        CylinderBufferGeometry.call(
            this,
            0,
            radius,
            height,
            radialSegments,
            heightSegments,
            openEnded,
            thetaStart,
            thetaLength,
        );
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
