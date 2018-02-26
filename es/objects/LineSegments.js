import { Line } from "./Line";
export class LineSegments extends Line {
    constructor() {
        super(...arguments);
        this.type = "LineSegments";
    }
}
