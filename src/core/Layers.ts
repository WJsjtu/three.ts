export class Layers {
    public mask: number = 1 | 0;

    public set(channel: number): void {
        this.mask = (1 << channel) | 0;
    }

    public enable(channel: number): void {
        this.mask |= (1 << channel) | 0;
    }

    public toggle(channel: number): void {
        this.mask ^= (1 << channel) | 0;
    }

    public disable(channel: number): void {
        this.mask &= ~((1 << channel) | 0);
    }

    public test(layers: Layers): boolean {
        return (this.mask & layers.mask) !== 0;
    }
}
