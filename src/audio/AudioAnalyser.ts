import { AudioWrapper } from "./Audio";

export class AudioAnalyserWrapper {
    public analyser: AnalyserNode;
    public data: Uint8Array;

    constructor(audio: AudioWrapper, fftSize: number = 2048) {
        this.analyser = audio.context.createAnalyser();
        this.analyser.fftSize = fftSize;
        this.data = new Uint8Array(this.analyser.frequencyBinCount);
        audio.getOutput().connect(this.analyser);
    }

    public getFrequencyData(): Uint8Array {
        this.analyser.getByteFrequencyData(this.data);
        return this.data;
    }

    public getAverageFrequency(): number {
        let value: number = 0;
        const data: Uint8Array = this.getFrequencyData();
        for (let i: number = 0; i < data.length; i++) {
            value += data[i];
        }
        return value / data.length;
    }
}
