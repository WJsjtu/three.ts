export class AudioContextWrapper {
    static getContext() {
        if (AudioContextWrapper.context === undefined) {
            AudioContextWrapper.context = new (window.AudioContext ||
                window.webkitAudioContext)();
        }
        return AudioContextWrapper.context;
    }
    static setContext(value) {
        AudioContextWrapper.context = value;
    }
}
AudioContextWrapper.context = undefined;
