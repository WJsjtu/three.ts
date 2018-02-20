export class Clock {

    public autoStart: boolean = false;
    protected startTime: number = 0;
    protected oldTime: number = 0;
    protected elapsedTime: number = 0;
    protected running: boolean = false;

    constructor(autoStart: boolean = false) {
        this.autoStart = autoStart;
    }

    public start(): void {
        this.startTime = (typeof performance === "undefined" ? Date : performance ).now(); // see #10732
        this.oldTime = this.startTime;
        this.elapsedTime = 0;
        this.running = true;
    }

    public stop(): void {
        this.getElapsedTime();
        this.running = false;
        this.autoStart = false;
    }

    public getElapsedTime(): number {
        this.getDelta();
        return this.elapsedTime;
    }

    public getDelta(): number {
        let diff: number = 0;
        if (this.autoStart && !this.running) {
            this.start();
            return 0;
        }
        if (this.running) {
            const newTime: number = ( typeof performance === "undefined" ? Date : performance ).now();
            diff = (newTime - this.oldTime) / 1000;
            this.oldTime = newTime;
            this.elapsedTime += diff;
        }
        return diff;
    }
}
