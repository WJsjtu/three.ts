import {Object3D} from "../core/Object3D";
import {AudioListenerWrapper} from "./AudioListener";

export class AudioWrapper extends Object3D {

    public type: string = "Audio";

    public context: AudioContext;

    protected gain: GainNode;

    public autoplay: boolean = false;
    protected buffer: AudioBuffer = null;
    protected loop: boolean = false;
    public startTime: number = 0;
    public offset: number = 0;
    protected playbackRate: number = 1;
    public isPlaying: boolean = false;
    public hasPlaybackControl: boolean = true;
    public source: AudioBufferSourceNode = null;
    public sourceType: string = "empty";
    protected filters: Array<AudioNode> = [];

    constructor(listener: AudioListenerWrapper) {
        super();
        this.context = listener.context;
        this.gain = this.context.createGain();
        this.gain.connect(listener.getInput());
    }

    public getOutput(): AudioNode {
        return (this.gain as AudioNode);
    }

    public setNodeSource(audioNode): AudioWrapper {
        this.hasPlaybackControl = false;
        this.source = audioNode;
        this.sourceType = "audioNode";
        this.connect();
        return this;
    }

    public setBuffer(audioBuffer: AudioBuffer): AudioWrapper {
        this.buffer = audioBuffer;
        this.sourceType = "buffer";
        if (this.autoplay) this.play();
        return this;
    }

    public play(): AudioWrapper {
        if (this.isPlaying === true) {
            console.warn(`THREE.Audio: Audio is already playing.`);
            return;
        }

        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return;
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

    public pause(): AudioWrapper {
        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return;
        }
        if (this.isPlaying === true) {
            this.source.stop();
            this.offset += ( this.context.currentTime - this.startTime ) * this.playbackRate;
            this.isPlaying = false;
        }
        return this;
    }

    public stop(): AudioWrapper {
        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return;

        }
        this.source.stop();
        this.offset = 0;
        this.isPlaying = false;
        return this;
    }

    public connect(): AudioWrapper {
        if (this.filters.length > 0) {
            this.source.connect(this.filters[0]);
            for (let i: number = 1, l: number = this.filters.length; i < l; i++) {
                this.filters[i - 1].connect(this.filters[i]);
            }
            this.filters[this.filters.length - 1].connect(this.getOutput());
        } else {
            this.source.connect(this.getOutput());
        }
        return this;
    }

    public disconnect(): AudioWrapper {
        if (this.filters.length > 0) {
            this.source.disconnect(this.filters[0]);
            for (let i: number = 1, l: number = this.filters.length; i < l; i++) {
                this.filters[i - 1].disconnect(this.filters[i]);
            }
            this.filters[this.filters.length - 1].disconnect(this.getOutput());
        } else {
            this.source.disconnect(this.getOutput());
        }
        return this;
    }

    public getFilters(): Array<AudioNode> {
        return this.filters;
    }

    public setFilters(value: Array<AudioNode> = []): AudioWrapper {
        if (this.isPlaying === true) {
            this.disconnect();
            this.filters = value;
            this.connect();
        } else {
            this.filters = value;
        }
        return this;
    }

    public getFilter(): AudioNode {
        return this.getFilters()[0];
    }

    public setFilter(filter: AudioNode): AudioWrapper {
        return this.setFilters(filter ? [filter] : []);
    }

    public setPlaybackRate(value: number): AudioWrapper {
        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return;
        }
        this.playbackRate = value;
        if (this.isPlaying === true) {
            this.source.playbackRate.setValueAtTime(this.playbackRate, this.context.currentTime);
        }
        return this;
    }

    public getPlaybackRate(): number {
        return this.playbackRate;
    }

    public onEnded(): void {
        this.isPlaying = false;
    }

    public getLoop(): boolean {
        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return false;
        }
        return this.loop;
    }

    public setLoop(value: boolean): AudioWrapper {
        if (this.hasPlaybackControl === false) {
            console.warn(`THREE.Audio: this Audio has no playback control.`);
            return;
        }
        this.loop = value;
        if (this.isPlaying === true) {
            this.source.loop = this.loop;
        }
        return this;
    }

    public getVolume(): number {
        return this.gain.gain.value;
    }

    public setVolume(value: number): AudioWrapper {
        this.gain.gain.value = value;
        return this;
    }
}