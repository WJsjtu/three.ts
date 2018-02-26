export class WebGLCapabilities {
    constructor(context, extensions, parameters) {
        this.extensions = null;
        this.context = null;
        this.precision = null;
        this.logarithmicDepthBuffer = false;
        this.maxTextures = 0;
        this.maxVertexTextures = 0;
        this.maxTextureSize = 0;
        this.maxCubemapSize = 0;
        this.maxAttributes = 0;
        this.maxVertexUniforms = 0;
        this.maxVaryings = 0;
        this.maxFragmentUniforms = 0;
        this.vertexTextures = false;
        this.floatFragmentTextures = false;
        this.floatVertexTextures = false;
        this.maxAnisotropy = 0;
        this.maxPrecision = null;
        this.context = context;
        this.extensions = extensions;
        this.precision =
            parameters.precision !== undefined ? parameters.precision : "highp";
        this.maxPrecision = this.getMaxPrecision(this.precision);
        if (this.maxPrecision !== this.precision) {
            console.warn(`THREE.WebGLRenderer: ${this.precision} not supported, using ${this.maxPrecision} instead.`);
            this.precision = this.maxPrecision;
        }
        this.logarithmicDepthBuffer =
            parameters.logarithmicDepthBuffer === true;
        this.maxTextures = context.getParameter(context.MAX_TEXTURE_IMAGE_UNITS);
        this.maxVertexTextures = context.getParameter(context.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
        this.maxTextureSize = context.getParameter(context.MAX_TEXTURE_SIZE);
        this.maxCubemapSize = context.getParameter(context.MAX_CUBE_MAP_TEXTURE_SIZE);
        this.maxAttributes = context.getParameter(context.MAX_VERTEX_ATTRIBS);
        this.maxVertexUniforms = context.getParameter(context.MAX_VERTEX_UNIFORM_VECTORS);
        this.maxVaryings = context.getParameter(context.MAX_VARYING_VECTORS);
        this.maxFragmentUniforms = context.getParameter(context.MAX_FRAGMENT_UNIFORM_VECTORS);
        this.vertexTextures = this.maxVertexTextures > 0;
        this.floatFragmentTextures = !!this.extensions.get("OES_texture_float");
        this.floatVertexTextures =
            this.vertexTextures && this.floatFragmentTextures;
        this.maxAnisotropy = this.getMaxAnisotropy();
    }
    getMaxPrecision(precision) {
        const context = this.context;
        if (precision === "highp") {
            if (context.getShaderPrecisionFormat(context.VERTEX_SHADER, context.HIGH_FLOAT).precision > 0 &&
                context.getShaderPrecisionFormat(context.FRAGMENT_SHADER, context.HIGH_FLOAT).precision > 0) {
                return "highp";
            }
            precision = "mediump";
        }
        if (precision === "mediump") {
            if (context.getShaderPrecisionFormat(context.VERTEX_SHADER, context.MEDIUM_FLOAT).precision > 0 &&
                context.getShaderPrecisionFormat(context.FRAGMENT_SHADER, context.MEDIUM_FLOAT).precision > 0) {
                return "mediump";
            }
        }
        return "lowp";
    }
    getMaxAnisotropy() {
        const extension = this.extensions.get("EXT_texture_filter_anisotropic");
        if (extension !== null) {
            return this.context.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        }
        else {
            return 0;
        }
    }
}
