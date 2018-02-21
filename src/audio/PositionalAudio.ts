import {Object3D} from "../core/Object3D";
import {Vector3} from "../math/Vector3";
import {AudioWrapper} from "./Audio";
import {AudioListenerWrapper} from "./AudioListener";

export class PositionalAudio extends AudioWrapper {
    public panner: PannerNode = null;

    constructor(listener: AudioListenerWrapper) {
        super(listener);
        this.panner = this.context.createPanner();
        this.panner.connect(this.gain);
    }

    public getOutput(): AudioNode {
        return this.panner as AudioNode;
    }

    public getRefDistance(): number {
        return this.panner.refDistance;
    }

    public setRefDistance(value: number): void {
        this.panner.refDistance = value;
    }

    public getRolloffFactor(): number {
        return this.panner.rolloffFactor;
    }

    public setRolloffFactor(value: number): void {
        this.panner.rolloffFactor = value;
    }

    public getDistanceModel(): DistanceModelType {
        return this.panner.distanceModel;
    }

    public setDistanceModel(value: DistanceModelType): void {
        this.panner.distanceModel = value;
    }

    public getMaxDistance(): number {
        return this.panner.maxDistance;
    }

    public setMaxDistance(value: number): void {
        this.panner.maxDistance = value;
    }

    public updateMatrix(): this {
        super.updateMatrix();
        const position = new Vector3();
        position.setFromMatrixPosition(this.matrixWorld);
        this.panner.setPosition(position.x, position.y, position.z);
        return this;
    }
}
