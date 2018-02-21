export class AudioContextWrapper {
    public static context: AudioContext | undefined = undefined;

    public static getContext(): AudioContext {
        if (AudioContextWrapper.context === undefined) {
            AudioContextWrapper.context = new ((window as any).AudioContext ||
                (window as any).webkitAudioContext)() as AudioContext;
        }
        return AudioContextWrapper.context;
    }

    public static setContext(value: AudioContext) {
        AudioContextWrapper.context = value;
    }
}
