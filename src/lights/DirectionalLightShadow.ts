import {OrthographicCamera} from "../cameras/OrthographicCamera";
import {LightShadow} from "./LightShadow";

export class DirectionalLightShadow extends LightShadow {
    constructor() {
        super(new OrthographicCamera(-5, 5, 5, -5, 0.5, 500));
    }
}
