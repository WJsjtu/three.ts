import { Line } from "./Line";
export class LineLoop extends Line {
    constructor() {
        super(...arguments);
        this.type = "LineLoop";
    }
}
