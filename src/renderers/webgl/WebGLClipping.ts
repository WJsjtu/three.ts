import { Plane } from "../../math/Plane";
import { Matrix3 } from "../../math/Matrix3";
import { Matrix4 } from "../../math/Matrix4";
import { IUniform } from "../shaders/UniformsUtils";
import { Camera } from "../../cameras/Camera";
import { IMaterialProperties } from "./WebGLProperties";

export class WebGLClipping {
    protected globalState: Float32Array | null = null;
    protected numGlobalPlanes: number = 0;
    protected localClippingEnabled: boolean = false;
    protected renderingShadows: boolean = false;

    public uniform: IUniform = {
        value: null,
        needsUpdate: false,
    };

    public numPlanes: number = 0;
    public numIntersection: number = 0;

    public projectPlanes(
        planes: Plane[] | null,
        camera?: Camera,
        dstOffset?: number,
        skipTransform: boolean = false,
    ): Float32Array | null {
        const nPlanes: number = planes !== null ? planes.length : 0;
        let dstArray: Float32Array | null = null;
        if (nPlanes !== 0) {
            dstArray = this.uniform.value as Float32Array | null;
            if (skipTransform !== true || dstArray === null) {
                const flatSize: number = dstOffset + nPlanes * 4;
                const viewMatrix: Matrix4 = camera.matrixWorldInverse;
                const viewNormalMatrix: Matrix3 = new Matrix3().getNormalMatrix(viewMatrix);
                if (dstArray === null || dstArray.length < flatSize) {
                    dstArray = new Float32Array(flatSize);
                }
                for (let i: number = 0, i4: number = dstOffset; i !== nPlanes; ++i, i4 += 4) {
                    const plane: Plane = new Plane().copy(planes[i]).applyMatrix4(viewMatrix, viewNormalMatrix);
                    plane.normal.toArray(dstArray, i4);
                    dstArray[i4 + 3] = plane.constant;
                }
            }
            this.uniform.value = dstArray;
            this.uniform.needsUpdate = true;
        }
        this.numPlanes = nPlanes;
        return dstArray;
    }

    public init(planes: Plane[], enableLocalClipping: boolean, camera: Camera): boolean {
        const enabled: boolean =
            planes.length !== 0 ||
            enableLocalClipping ||
            // enable state of previous frame - the clipping code has to
            // run another frame in order to reset the state:
            this.numGlobalPlanes !== 0 ||
            this.localClippingEnabled;

        this.localClippingEnabled = enableLocalClipping;

        this.globalState = this.projectPlanes(planes, camera, 0);
        this.numGlobalPlanes = planes.length;

        return enabled;
    }

    public beginShadows(): void {
        this.renderingShadows = true;
        this.projectPlanes(null);
    }

    public endShadows(): void {
        this.renderingShadows = false;
        this.resetGlobalState();
    }

    public resetGlobalState(): void {
        if (this.uniform.value !== this.globalState) {
            this.uniform.value = this.globalState;
            this.uniform.needsUpdate = this.numGlobalPlanes > 0;
        }
        this.numPlanes = this.numGlobalPlanes;
        this.numIntersection = 0;
    }

    public setState(
        planes: Plane[] | null,
        clipIntersection: boolean,
        clipShadows: boolean,
        camera: Camera,
        cache: IMaterialProperties,
        fromCache: boolean,
    ) {
        if (
            !this.localClippingEnabled ||
            planes === null ||
            planes.length === 0 ||
            (this.renderingShadows && !clipShadows)
        ) {
            // there's no local clipping
            if (this.renderingShadows) {
                // there's no global clipping
                this.projectPlanes(null);
            } else {
                this.resetGlobalState();
            }
        } else {
            const nGlobal: number = this.renderingShadows ? 0 : this.numGlobalPlanes,
                lGlobal = nGlobal * 4;
            let dstArray: Float32Array | null = cache.clippingState || null;
            this.uniform.value = dstArray; // ensure unique state
            dstArray = this.projectPlanes(planes, camera, lGlobal, fromCache);
            for (let i: number = 0; i !== lGlobal; ++i) {
                dstArray[i] = this.globalState[i];
            }
            cache.clippingState = dstArray;
            this.numIntersection = clipIntersection ? this.numPlanes : 0;
            this.numPlanes += nGlobal;
        }
    }
}
