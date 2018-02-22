import { WebGLExtensions } from "./WebGLExtensions";

export interface IWebGLCapabilitiesParameters {
    precision?: string;
    logarithmicDepthBuffer?: boolean;
}

export class WebGLCapabilities {
    public extensions: WebGLExtensions = null;
    public context: WebGLRenderingContext = null;

    public precision: string = null;
    public logarithmicDepthBuffer: boolean = false;
    public maxTextures: number = 0;
    public maxVertexTextures: number = 0;
    public maxTextureSize: number = 0;
    public maxCubemapSize: number = 0;

    public maxAttributes: number = 0;
    public maxVertexUniforms: number = 0;
    public maxVaryings: number = 0;
    public maxFragmentUniforms: number = 0;

    public vertexTextures: boolean = false;
    public floatFragmentTextures: boolean = false;
    public floatVertexTextures: boolean = false;

    public maxAnisotropy: number = 0;
    public maxPrecision: string = null;

    constructor(
        context: WebGLRenderingContext,
        extensions: WebGLExtensions,
        parameters,
    ) {
        this.context = context;
        this.extensions = extensions;
        this.precision =
            parameters.precision !== undefined ? parameters.precision : "highp";
        this.maxPrecision = this.getMaxPrecision(this.precision);
        if (this.maxPrecision !== this.precision) {
            console.warn(
                `THREE.WebGLRenderer: ${this.precision} not supported, using ${
                    this.maxPrecision
                } instead.`,
            );
            this.precision = this.maxPrecision;
        }
        this.logarithmicDepthBuffer =
            parameters.logarithmicDepthBuffer === true;

        this.maxTextures = context.getParameter(
            context.MAX_TEXTURE_IMAGE_UNITS,
        );
        this.maxVertexTextures = context.getParameter(
            context.MAX_VERTEX_TEXTURE_IMAGE_UNITS,
        );
        this.maxTextureSize = context.getParameter(context.MAX_TEXTURE_SIZE);
        this.maxCubemapSize = context.getParameter(
            context.MAX_CUBE_MAP_TEXTURE_SIZE,
        );

        this.maxAttributes = context.getParameter(context.MAX_VERTEX_ATTRIBS);
        this.maxVertexUniforms = context.getParameter(
            context.MAX_VERTEX_UNIFORM_VECTORS,
        );
        this.maxVaryings = context.getParameter(context.MAX_VARYING_VECTORS);
        this.maxFragmentUniforms = context.getParameter(
            context.MAX_FRAGMENT_UNIFORM_VECTORS,
        );

        this.vertexTextures = this.maxVertexTextures > 0;
        this.floatFragmentTextures = !!this.extensions.get("OES_texture_float");
        this.floatVertexTextures =
            this.vertexTextures && this.floatFragmentTextures;

        this.maxAnisotropy = this.getMaxAnisotropy();
    }

    protected getMaxPrecision(precision: string): string {
        const context: WebGLRenderingContext = this.context;
        if (precision === "highp") {
            if (
                context.getShaderPrecisionFormat(
                    context.VERTEX_SHADER,
                    context.HIGH_FLOAT,
                ).precision > 0 &&
                context.getShaderPrecisionFormat(
                    context.FRAGMENT_SHADER,
                    context.HIGH_FLOAT,
                ).precision > 0
            ) {
                return "highp";
            }
            precision = "mediump";
        }
        if (precision === "mediump") {
            if (
                context.getShaderPrecisionFormat(
                    context.VERTEX_SHADER,
                    context.MEDIUM_FLOAT,
                ).precision > 0 &&
                context.getShaderPrecisionFormat(
                    context.FRAGMENT_SHADER,
                    context.MEDIUM_FLOAT,
                ).precision > 0
            ) {
                return "mediump";
            }
        }
        return "lowp";
    }

    protected getMaxAnisotropy(): number {
        const extension = this.extensions.get("EXT_texture_filter_anisotropic");
        if (extension !== null) {
            return this.context.getParameter(
                extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT,
            );
        } else {
            return 0;
        }
    }
}
