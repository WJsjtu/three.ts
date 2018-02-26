import { Vector3 } from "../math/Vector3";
import { AudioWrapper } from "./Audio";
export class PositionalAudio extends AudioWrapper {
    constructor(listener) {
        super(listener);
        this.panner = null;
        this.panner = this.context.createPanner();
        this.panner.connect(this.gain);
    }
    getOutput() {
        return this.panner;
    }
    getRefDistance() {
        return this.panner.refDistance;
    }
    setRefDistance(value) {
        this.panner.refDistance = value;
    }
    getRolloffFactor() {
        return this.panner.rolloffFactor;
    }
    setRolloffFactor(value) {
        this.panner.rolloffFactor = value;
    }
    getDistanceModel() {
        return this.panner.distanceModel;
    }
    setDistanceModel(value) {
        this.panner.distanceModel = value;
    }
    getMaxDistance() {
        return this.panner.maxDistance;
    }
    setMaxDistance(value) {
        this.panner.maxDistance = value;
    }
    updateMatrixWorld(force = false) {
        super.updateMatrixWorld(force);
        const position = new Vector3();
        position.setFromMatrixPosition(this.matrixWorld);
        this.panner.setPosition(position.x, position.y, position.z);
        return this;
    }
}
