import {
    AddEquation,
    FlatShading,
    FrontSide,
    LessEqualDepth,
    NoColors,
    NormalBlending,
    OneMinusSrcAlphaFactor,
    SrcAlphaFactor,
} from "../constants";
import { EventDispatcher } from "../core/EventDispatcher";
import { Color } from "../math/Color";
import { MathUtil } from "../math/Math";
import { Plane } from "../math/Plane";
import { Vector3 } from "../math/Vector3";

let materialId: number = 0;

export interface IMaterialParameters {
    alphaTest?: number;
    blending?: number;
    blendDst?: number;
    blendDstAlpha?: number;
    blendEquation?: number;
    blendEquationAlpha?: number;
    blendSrc?: number;
    blendSrcAlpha?: number;
    clipIntersection?: boolean;
    clippingPlanes?: Plane[];
    clipShadows?: boolean;
    colorWrite?: boolean;
    depthFunc?: number;
    depthTest?: boolean;
    depthWrite?: boolean;
    dithering?: boolean;
    flatShading?: boolean;
    fog?: boolean;
    lights?: boolean;
    name?: string;
    needsUpdate?: boolean;
    opacity?: number;
    overdraw?: number;
    polygonOffset?: boolean;
    polygonOffsetFactor?: number;
    polygonOffsetUnits?: number;
    precision?: string;
    premultipliedAlpha?: boolean;
    shadowSide?: number;
    side?: number;
    transparent?: boolean;
    userData?: object;
    vertexColors?: number;
    visible?: boolean;
}

export class Material extends EventDispatcher {
    public readonly id: number = materialId++;
    public readonly uuid: string = MathUtil.generateUUID();
    public readonly type: string = "Material";

    public alphaTest: number = 0;

    public blending: number = NormalBlending;
    public blendDst: number = OneMinusSrcAlphaFactor;
    public blendDstAlpha: number = null;
    public blendEquation: number = AddEquation;
    public blendEquationAlpha: number = null;
    public blendSrc: number = SrcAlphaFactor;
    public blendSrcAlpha: number = null;

    public clipIntersection: boolean = false;
    public clippingPlanes: Plane[] = [];
    public clipShadows: boolean = false;

    public colorWrite: boolean = true;

    public depthFunc: number = LessEqualDepth;
    public depthTest: boolean = true;
    public depthWrite: boolean = true;

    public dithering: boolean = false;
    public flatShading: boolean = false;
    public fog: boolean = true;
    public lights: boolean = true;
    /**
     * For mesh type extension
     */
    public morphTargets: boolean = false;
    public name: string = "";
    public needsUpdate: boolean = true;
    public opacity: number = 1;
    public overdraw: number = 0;
    public polygonOffset: boolean = false;
    public polygonOffsetFactor: number = 0;
    public polygonOffsetUnits: number = 0;

    /**
     * override the renderer's default precision for this material
     * "highp", "mediump" or "lowp"
     * @type {string}
     */
    public precision: string = null;
    public premultipliedAlpha: boolean = false;

    /**
     * For WebGLRenderList
     */
    public program?: any = null;

    /**
     * THREE.FrontSide  back side
     * THREE.BackSide   front side
     * THREE.DoubleSide both sides
     * @type {number}
     */
    public shadowSide: number = null;
    public side: number = FrontSide;
    public transparent: boolean = false;
    public userData: object = {};

    /**
     * THREE.NoColors, THREE.VertexColors, THREE.FaceColors
     */
    public vertexColors: number = NoColors;

    /**
     * Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer
     * @type {number}
     */
    public visible: boolean = true;

    public setValues(values: IMaterialParameters): this {
        if (values === undefined) return this;
        for (const key in values) {
            if (!values.hasOwnProperty(key)) continue;
            const newValue = values[key];
            if (newValue === undefined) {
                console.warn(
                    `THREE.Material: "${key}" parameter is undefined.`,
                );
                continue;
            }
            /**
             * for backward compatability if shading is set in the constructor
             */
            if (key === "shading") {
                console.warn(
                    `THREE.${
                        this.type
                    }: .shading has been removed. Use the boolean .flatShading instead.`,
                );
                this.flatShading = newValue === FlatShading;
                continue;
            }

            const currentValue = this[key];
            if (currentValue === undefined) {
                console.warn(
                    `THREE.${
                        this.type
                    }: "${key}" is not a property of this material.`,
                );
                continue;
            }
            if (currentValue && currentValue instanceof Color) {
                if (newValue instanceof Color) currentValue.copy(newValue);
                else if (typeof newValue === "number") {
                    currentValue.setHex(newValue);
                } else if (typeof newValue === "string") {
                    currentValue.setStyle(newValue);
                }
            } else if (
                currentValue &&
                currentValue instanceof Vector3 &&
                (newValue && newValue instanceof Vector3)
            ) {
                currentValue.copy(newValue);
            } else if (key === "overdraw") {
                /**
                 * ensure overdraw is backwards-compatible with legacy boolean type
                 * @type {Number}
                 */
                this[key] = Number(newValue);
            } else {
                this[key] = newValue;
            }
        }
        return this;
    }

    public clone(): Material {
        return new (this.constructor as new () => Material)().copy(this);
    }

    public copy(source: Material): this {
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
        const srcPlanes: Plane[] = source.clippingPlanes;
        let dstPlanes: Plane[] = null;
        if (srcPlanes !== null) {
            const n: number = srcPlanes.length;
            dstPlanes = new Array(n);
            for (let i: number = 0; i !== n; ++i) {
                dstPlanes[i] = srcPlanes[i].clone();
            }
        }
        this.clippingPlanes = dstPlanes;
        this.shadowSide = source.shadowSide;
        return this;
    }

    public dispose(): void {
        this.dispatchEvent({ type: "dispose" });
    }
}
