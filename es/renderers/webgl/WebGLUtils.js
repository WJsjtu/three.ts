import { AddEquation, AlphaFormat, ByteType, ClampToEdgeWrapping, DepthFormat, DepthStencilFormat, DstAlphaFactor, DstColorFactor, FloatType, HalfFloatType, IntType, LinearFilter, LinearMipMapLinearFilter, LinearMipMapNearestFilter, LuminanceAlphaFormat, LuminanceFormat, MaxEquation, MinEquation, MirroredRepeatWrapping, NearestFilter, NearestMipMapLinearFilter, NearestMipMapNearestFilter, OneFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, RGBAFormat, RGBA_ASTC_10x10_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGBFormat, RGB_ETC1_Format, RGB_PVRTC_2BPPV1_Format, RGB_PVRTC_4BPPV1_Format, RGB_S3TC_DXT1_Format, RepeatWrapping, ReverseSubtractEquation, ShortType, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, SubtractEquation, UnsignedByteType, UnsignedInt248Type, UnsignedIntType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShort565Type, UnsignedShortType, ZeroFactor, } from "../../constants";
export class WebGLUtils {
    constructor(context, extensions) {
        this.context = context;
        this.extensions = extensions;
    }
    convert(parameter) {
        const extensions = this.extensions;
        const context = this.context;
        let extension;
        if (parameter === RepeatWrapping) {
            return context.REPEAT;
        }
        if (parameter === ClampToEdgeWrapping) {
            return context.CLAMP_TO_EDGE;
        }
        if (parameter === MirroredRepeatWrapping) {
            return context.MIRRORED_REPEAT;
        }
        if (parameter === NearestFilter) {
            return context.NEAREST;
        }
        if (parameter === NearestMipMapNearestFilter) {
            return context.NEAREST_MIPMAP_NEAREST;
        }
        if (parameter === NearestMipMapLinearFilter) {
            return context.NEAREST_MIPMAP_LINEAR;
        }
        if (parameter === LinearFilter) {
            return context.LINEAR;
        }
        if (parameter === LinearMipMapNearestFilter) {
            return context.LINEAR_MIPMAP_NEAREST;
        }
        if (parameter === LinearMipMapLinearFilter) {
            return context.LINEAR_MIPMAP_LINEAR;
        }
        if (parameter === UnsignedByteType) {
            return context.UNSIGNED_BYTE;
        }
        if (parameter === UnsignedShort4444Type) {
            return context.UNSIGNED_SHORT_4_4_4_4;
        }
        if (parameter === UnsignedShort5551Type) {
            return context.UNSIGNED_SHORT_5_5_5_1;
        }
        if (parameter === UnsignedShort565Type) {
            return context.UNSIGNED_SHORT_5_6_5;
        }
        if (parameter === ByteType) {
            return context.BYTE;
        }
        if (parameter === ShortType) {
            return context.SHORT;
        }
        if (parameter === UnsignedShortType) {
            return context.UNSIGNED_SHORT;
        }
        if (parameter === IntType) {
            return context.INT;
        }
        if (parameter === UnsignedIntType) {
            return context.UNSIGNED_INT;
        }
        if (parameter === FloatType) {
            return context.FLOAT;
        }
        if (parameter === HalfFloatType) {
            extension = extensions.get("OES_texture_half_float");
            if (extension !== null) {
                return extension.HALF_FLOAT_OES;
            }
        }
        if (parameter === AlphaFormat) {
            return context.ALPHA;
        }
        if (parameter === RGBFormat) {
            return context.RGB;
        }
        if (parameter === RGBAFormat) {
            return context.RGBA;
        }
        if (parameter === LuminanceFormat) {
            return context.LUMINANCE;
        }
        if (parameter === LuminanceAlphaFormat) {
            return context.LUMINANCE_ALPHA;
        }
        if (parameter === DepthFormat) {
            return context.DEPTH_COMPONENT;
        }
        if (parameter === DepthStencilFormat) {
            return context.DEPTH_STENCIL;
        }
        if (parameter === AddEquation) {
            return context.FUNC_ADD;
        }
        if (parameter === SubtractEquation) {
            return context.FUNC_SUBTRACT;
        }
        if (parameter === ReverseSubtractEquation) {
            return context.FUNC_REVERSE_SUBTRACT;
        }
        if (parameter === ZeroFactor) {
            return context.ZERO;
        }
        if (parameter === OneFactor) {
            return context.ONE;
        }
        if (parameter === SrcColorFactor) {
            return context.SRC_COLOR;
        }
        if (parameter === OneMinusSrcColorFactor) {
            return context.ONE_MINUS_SRC_COLOR;
        }
        if (parameter === SrcAlphaFactor) {
            return context.SRC_ALPHA;
        }
        if (parameter === OneMinusSrcAlphaFactor) {
            return context.ONE_MINUS_SRC_ALPHA;
        }
        if (parameter === DstAlphaFactor) {
            return context.DST_ALPHA;
        }
        if (parameter === OneMinusDstAlphaFactor) {
            return context.ONE_MINUS_DST_ALPHA;
        }
        if (parameter === DstColorFactor) {
            return context.DST_COLOR;
        }
        if (parameter === OneMinusDstColorFactor) {
            return context.ONE_MINUS_DST_COLOR;
        }
        if (parameter === SrcAlphaSaturateFactor) {
            return context.SRC_ALPHA_SATURATE;
        }
        if (parameter === RGB_S3TC_DXT1_Format ||
            parameter === RGBA_S3TC_DXT1_Format ||
            parameter === RGBA_S3TC_DXT3_Format ||
            parameter === RGBA_S3TC_DXT5_Format) {
            extension = extensions.get("WEBGL_compressed_texture_s3tc");
            if (extension !== null) {
                if (parameter === RGB_S3TC_DXT1_Format) {
                    return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
                }
                if (parameter === RGBA_S3TC_DXT1_Format) {
                    return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                }
                if (parameter === RGBA_S3TC_DXT3_Format) {
                    return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                }
                if (parameter === RGBA_S3TC_DXT5_Format) {
                    return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                }
            }
        }
        if (parameter === RGB_PVRTC_4BPPV1_Format ||
            parameter === RGB_PVRTC_2BPPV1_Format ||
            parameter === RGBA_PVRTC_4BPPV1_Format ||
            parameter === RGBA_PVRTC_2BPPV1_Format) {
            extension = extensions.get("WEBGL_compressed_texture_pvrtc");
            if (extension !== null) {
                if (parameter === RGB_PVRTC_4BPPV1_Format) {
                    return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                }
                if (parameter === RGB_PVRTC_2BPPV1_Format) {
                    return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                }
                if (parameter === RGBA_PVRTC_4BPPV1_Format) {
                    return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                }
                if (parameter === RGBA_PVRTC_2BPPV1_Format) {
                    return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                }
            }
        }
        if (parameter === RGB_ETC1_Format) {
            extension = extensions.get("WEBGL_compressed_texture_etc1");
            if (extension !== null) {
                return extension.COMPRESSED_RGB_ETC1_WEBGL;
            }
        }
        if (parameter === RGBA_ASTC_4x4_Format ||
            parameter === RGBA_ASTC_5x4_Format ||
            parameter === RGBA_ASTC_5x5_Format ||
            parameter === RGBA_ASTC_6x5_Format ||
            parameter === RGBA_ASTC_6x6_Format ||
            parameter === RGBA_ASTC_8x5_Format ||
            parameter === RGBA_ASTC_8x6_Format ||
            parameter === RGBA_ASTC_8x8_Format ||
            parameter === RGBA_ASTC_10x5_Format ||
            parameter === RGBA_ASTC_10x6_Format ||
            parameter === RGBA_ASTC_10x8_Format ||
            parameter === RGBA_ASTC_10x10_Format ||
            parameter === RGBA_ASTC_12x10_Format ||
            parameter === RGBA_ASTC_12x12_Format) {
            extension = extensions.get("WEBGL_compressed_texture_astc");
            if (extension !== null) {
                return parameter;
            }
        }
        if (parameter === MinEquation || parameter === MaxEquation) {
            extension = extensions.get("EXT_blend_minmax");
            if (extension !== null) {
                if (parameter === MinEquation) {
                    return extension.MIN_EXT;
                }
                if (parameter === MaxEquation) {
                    return extension.MAX_EXT;
                }
            }
        }
        if (parameter === UnsignedInt248Type) {
            extension = extensions.get("WEBGL_depth_texture");
            if (extension !== null) {
                return extension.UNSIGNED_INT_24_8_WEBGL;
            }
        }
        return 0;
    }
}
