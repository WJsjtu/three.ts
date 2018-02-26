import { Object3D } from "../core/Object3D";
import { Quaternion } from "../math/Quaternion";
import { Vector3 } from "../math/Vector3";
import { AudioContextWrapper } from "./AudioContext";
export class AudioListenerWrapper extends Object3D {
    constructor() {
        super();
        this.type = "AudioListener";
        this.context = AudioContextWrapper.getContext();
        this.gain = null;
        this.filter = null;
        this.gain = this.context.createGain();
        this.gain.connect(this.context.destination);
    }
    getInput() {
        return this.gain;
    }
    removeFilter() {
        if (this.filter !== null) {
            this.gain.disconnect(this.filter);
            this.filter.disconnect(this.context.destination);
            this.gain.connect(this.context.destination);
            this.filter = null;
        }
    }
    getFilter() {
        return this.filter;
    }
    setFilter(value) {
        if (this.filter !== null) {
            this.gain.disconnect(this.filter);
            this.filter.disconnect(this.context.destination);
        }
        else {
            this.gain.disconnect(this.context.destination);
        }
        this.filter = value;
        this.gain.connect(this.filter);
        this.filter.connect(this.context.destination);
        return this;
    }
    getMasterVolume() {
        return this.gain.gain.value;
    }
    setMasterVolume(value) {
        this.gain.gain.value = value;
        return this;
    }
    updateMatrixWorld(force = false) {
        super.updateMatrixWorld(force);
        const position = new Vector3();
        const quaternion = new Quaternion();
        const scale = new Vector3();
        const orientation = new Vector3();
        const listener = this.context.listener;
        const up = this.up;
        this.matrixWorld.decompose(position, quaternion, scale);
        orientation.set(0, 0, -1).applyQuaternion(quaternion);
        if (listener.positionX) {
            listener.positionX.setValueAtTime(position.x, this.context.currentTime);
            listener.positionY.setValueAtTime(position.y, this.context.currentTime);
            listener.positionZ.setValueAtTime(position.z, this.context.currentTime);
            listener.forwardX.setValueAtTime(orientation.x, this.context.currentTime);
            listener.forwardY.setValueAtTime(orientation.y, this.context.currentTime);
            listener.forwardZ.setValueAtTime(orientation.z, this.context.currentTime);
            listener.upX.setValueAtTime(up.x, this.context.currentTime);
            listener.upY.setValueAtTime(up.y, this.context.currentTime);
            listener.upZ.setValueAtTime(up.z, this.context.currentTime);
        }
        else {
            listener.setPosition(position.x, position.y, position.z);
            listener.setOrientation(orientation.x, orientation.y, orientation.z, up.x, up.y, up.z);
        }
        return this;
    }
}
