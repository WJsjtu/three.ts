import { Object3D } from "../core/Object3D";
export class AudioWrapper extends Object3D {
    constructor(listener) {
        super();
        this.type = "Audio";
        this.startTime = 0;
        this.offset = 0;
        this.isPlaying = false;
        this.hasPlaybackControl = true;
        this.sourceType = "empty";
        this.autoplay = false;
        this.buffer = null;
        this.loop = false;
        this.playbackRate = 1;
        this.filters = [];
        this.context = listener.context;
        this.gain = this.context.createGain();
        this.gain.connect(listener.getInput());
    }
    getOutput() {
        return this.gain;
    }
    setNodeSource(audioNode) {
        this.hasPlaybackControl = false;
        this.source = audioNode;
        this.sourceType = "audioNode";
        this.connect();
        return this;
    }
    setBuffer(audioBuffer) {
        this.buffer = audioBuffer;
        this.sourceType = "buffer";
        if (this.autoplay)
            this.play();
        return this;
    }
    play() {
        if (this.isPlaying === true) {
            console.warn(`THREE.Audio: Audio is already playing.`);
            return this;
        }
        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return this;
        }
        const source = this.context.createBufferSource();
        source.buffer = this.buffer;
        source.loop = this.loop;
        source.onended = this.onEnded.bind(this);
        source.playbackRate.setValueAtTime(this.playbackRate, this.startTime);
        this.startTime = this.context.currentTime;
        source.start(this.startTime, this.offset);
        this.isPlaying = true;
        this.source = source;
        return this.connect();
    }
    pause() {
        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return this;
        }
        if (this.isPlaying === true) {
            this.source.stop();
            this.offset += (this.context.currentTime - this.startTime) * this.playbackRate;
            this.isPlaying = false;
        }
        return this;
    }
    stop() {
        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return this;
        }
        this.source.stop();
        this.offset = 0;
        this.isPlaying = false;
        return this;
    }
    connect() {
        if (this.filters.length > 0) {
            this.source.connect(this.filters[0]);
            for (let i = 1, l = this.filters.length; i < l; i++) {
                this.filters[i - 1].connect(this.filters[i]);
            }
            this.filters[this.filters.length - 1].connect(this.getOutput());
        }
        else {
            this.source.connect(this.getOutput());
        }
        return this;
    }
    disconnect() {
        if (this.filters.length > 0) {
            this.source.disconnect(this.filters[0]);
            for (let i = 1, l = this.filters.length; i < l; i++) {
                this.filters[i - 1].disconnect(this.filters[i]);
            }
            this.filters[this.filters.length - 1].disconnect(this.getOutput());
        }
        else {
            this.source.disconnect(this.getOutput());
        }
        return this;
    }
    getFilters() {
        return this.filters;
    }
    setFilters(value = []) {
        if (this.isPlaying === true) {
            this.disconnect();
            this.filters = value;
            this.connect();
        }
        else {
            this.filters = value;
        }
        return this;
    }
    getFilter() {
        return this.getFilters()[0];
    }
    setFilter(filter) {
        return this.setFilters(filter ? [filter] : []);
    }
    setPlaybackRate(value) {
        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return this;
        }
        this.playbackRate = value;
        if (this.isPlaying === true) {
            this.source.playbackRate.setValueAtTime(this.playbackRate, this.context.currentTime);
        }
        return this;
    }
    getPlaybackRate() {
        return this.playbackRate;
    }
    onEnded() {
        this.isPlaying = false;
    }
    getLoop() {
        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return false;
        }
        return this.loop;
    }
    setLoop(value) {
        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return this;
        }
        this.loop = value;
        if (this.isPlaying === true) {
            this.source.loop = this.loop;
        }
        return this;
    }
    getVolume() {
        return this.gain.gain.value;
    }
    setVolume(value) {
        this.gain.gain.value = value;
        return this;
    }
}
