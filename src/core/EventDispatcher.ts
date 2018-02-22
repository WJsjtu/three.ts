export interface IEventObject {
    target?: EventDispatcher;
    type?: string;
}

export class EventDispatcher {
    protected _listeners: { [key: string]: Array<(args: any) => any> } = {};

    public addEventListener(type: string, listener: (args: any) => any): void {
        const listeners: { [key: string]: Array<(args: any) => any> } = this
            ._listeners;
        if (listeners[type] === undefined) {
            listeners[type] = [];
        }
        if (listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
    }

    public hasEventListener(
        type: string,
        listener: (args: any) => any,
    ): boolean {
        if (this._listeners === undefined) return false;
        const listeners: { [key: string]: Array<(args: any) => any> } = this
            ._listeners;
        return (
            listeners[type] !== undefined &&
            listeners[type].indexOf(listener) !== -1
        );
    }

    public removeEventListener(type: string, listener: (args: any) => any) {
        if (this._listeners === undefined) return;
        const listeners: { [key: string]: Array<(args: any) => any> } = this
            ._listeners;
        const listenerArray: Array<(args: any) => any> = listeners[type];
        if (listenerArray !== undefined) {
            const index = listenerArray.indexOf(listener);
            if (index !== -1) {
                listenerArray.splice(index, 1);
            }
        }
    }

    public dispatchEvent(event: IEventObject = {}) {
        if (this._listeners === undefined) return;
        const listeners: { [key: string]: Array<(args: any) => any> } = this
            ._listeners;
        const listenerArray: Array<(args: any) => any> = listeners[event.type];
        if (listenerArray !== undefined) {
            event.target = this;
            const array: Array<(args: any) => any> = listenerArray.slice(0);
            for (let i = 0, l = array.length; i < l; i++) {
                array[i].call(this, event);
            }
        }
    }
}
