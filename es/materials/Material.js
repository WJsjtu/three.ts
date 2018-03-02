import { AddEquation, FlatShading, FrontSide, LessEqualDepth, NoColors, NormalBlending, OneMinusSrcAlphaFactor, SrcAlphaFactor, } from "../constants";
import { EventDispatcher } from "../core/EventDispatcher";
import { Color } from "../math/Color";
import { MathUtil } from "../math/Math";
import { Vector3 } from "../math/Vector3";
let materialId = 0;
export class Material extends EventDispatcher {
    constructor() {
        super(...arguments);
        this.id = materialId++;
        this.uuid = MathUtil.generateUUID();
        this.type = "Material";
        this.alphaTest = 0;
        this.blending = NormalBlending;
        this.blendDst = OneMinusSrcAlphaFactor;
        this.blendDstAlpha = null;
        this.blendEquation = AddEquation;
        this.blendEquationAlpha = null;
        this.blendSrc = SrcAlphaFactor;
        this.blendSrcAlpha = null;
        this.clipIntersection = false;
        this.clippingPlanes = null;
        this.clipShadows = false;
        this.colorWrite = true;
        this.depthFunc = LessEqualDepth;
        this.depthTest = true;
        this.depthWrite = true;
        this.dithering = false;
        this.flatShading = false;
        this.fog = true;
        this.lights = true;
        /**
         * For mesh type extension
         */
        this.morphTargets = false;
        this.name = "";
        this.needsUpdate = true;
        this.opacity = 1;
        this.overdraw = 0;
        this.polygonOffset = false;
        this.polygonOffsetFactor = 0;
        this.polygonOffsetUnits = 0;
        this.premultipliedAlpha = false;
        this.side = FrontSide;
        this.transparent = false;
        this.userData = {};
        /**
         * THREE.NoColors, THREE.VertexColors, THREE.FaceColors
         */
        this.vertexColors = NoColors;
        /**
         * Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer
         * @type {number}
         */
        this.visible = true;
    }
    setValues(values) {
        if (values === undefined)
            return this;
        for (const key in values) {
            if (!values.hasOwnProperty(key))
                continue;
            const newValue = values[key];
            if (newValue === undefined) {
                console.warn(`THREE.Material: "${key}" parameter is undefined.`);
                continue;
            }
            /**
             * for backward compatability if shading is set in the constructor
             */
            if (key === "shading") {
                console.warn(`THREE.${this.type}: .shading has been removed. Use the boolean .flatShading instead.`);
                this.flatShading = newValue === FlatShading;
                continue;
            }
            const currentValue = this[key];
            if (currentValue === undefined) {
                console.warn(`THREE.${this.type}: "${key}" is not a property of this material.`);
                continue;
            }
            if (currentValue && currentValue instanceof Color) {
                if (newValue instanceof Color)
                    currentValue.copy(newValue);
                else if (typeof newValue === "number") {
                    currentValue.setHex(newValue);
                }
                else if (typeof newValue === "string") {
                    currentValue.setStyle(newValue);
                }
            }
            else if (currentValue && currentValue instanceof Vector3 && (newValue && newValue instanceof Vector3)) {
                currentValue.copy(newValue);
            }
            else if (key === "overdraw") {
                /**
                 * ensure overdraw is backwards-compatible with legacy boolean type
                 * @type {Number}
                 */
                this[key] = Number(newValue);
            }
            else {
                this[key] = newValue;
            }
        }
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
    copy(source) {
        this.name = source.name;
        this.fog = source.fog;
        this.lights = source.lights;
        this.blending = source.blending;
        this.side = source.side;
        this.flatShading = source.flatShading;
        this.vertexColors = source.vertexColors;
        this.opacity = source.opacity;
        this.transparent = source.transparent;
        this.blendSrc = source.blendSrc;
        this.blendDst = source.blendDst;
        this.blendEquation = source.blendEquation;
        this.blendSrcAlpha = source.blendSrcAlpha;
        this.blendDstAlpha = source.blendDstAlpha;
        this.blendEquationAlpha = source.blendEquationAlpha;
        this.depthFunc = source.depthFunc;
        this.depthTest = source.depthTest;
        this.depthWrite = source.depthWrite;
        this.colorWrite = source.colorWrite;
        this.precision = source.precision;
        this.polygonOffset = source.polygonOffset;
        this.polygonOffsetFactor = source.polygonOffsetFactor;
        this.polygonOffsetUnits = source.polygonOffsetUnits;
        this.dithering = source.dithering;
        this.alphaTest = source.alphaTest;
        this.premultipliedAlpha = source.premultipliedAlpha;
        this.overdraw = source.overdraw;
        this.visible = source.visible;
        this.userData = JSON.parse(JSON.stringify(source.userData));
        this.clipShadows = source.clipShadows;
        this.clipIntersection = source.clipIntersection;
        const srcPlanes = source.clippingPlanes;
        let dstPlanes = null;
        if (srcPlanes !== null) {
            const n = srcPlanes.length;
            dstPlanes = new Array(n);
            for (let i = 0; i !== n; ++i) {
                dstPlanes[i] = srcPlanes[i].clone();
            }
        }
        this.clippingPlanes = dstPlanes;
        this.shadowSide = source.shadowSide;
        return this;
    }
    dispose() {
        this.dispatchEvent({ type: "dispose" });
    }
}
