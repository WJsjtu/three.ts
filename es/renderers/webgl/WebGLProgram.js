import { ShaderChunk } from "../shaders/ShaderChunk";
import { NoToneMapping, AddOperation, MixOperation, MultiplyOperation, EquirectangularRefractionMapping, CubeRefractionMapping, SphericalReflectionMapping, EquirectangularReflectionMapping, CubeUVRefractionMapping, CubeUVReflectionMapping, CubeReflectionMapping, PCFSoftShadowMap, PCFShadowMap, CineonToneMapping, Uncharted2ToneMapping, ReinhardToneMapping, LinearToneMapping, GammaEncoding, RGBDEncoding, RGBM16Encoding, RGBM7Encoding, RGBEEncoding, sRGBEncoding, LinearEncoding, } from "../../constants";
import { RawShaderMaterial } from "../../materials/RawShaderMaterial";
import { WebGLShaderWrapper } from "./WebGLShader";
import { WebGLUniformsWrapper } from "./WebGLUniforms";
import { ShaderMaterial } from "../../materials/Materials";
function generateDefines(defines) {
    const chunks = [];
    for (const name in defines) {
        if (!defines.hasOwnProperty(name) || defines[name]) {
            chunks.push("#define " + name + " " + defines[name]);
        }
    }
    return chunks.join("\n");
}
function generateExtensions(extensions, parameters, rendererExtensions) {
    extensions = extensions || {};
    const chunks = [
        extensions.derivatives ||
            parameters.envMapCubeUV ||
            parameters.bumpMap ||
            parameters.normalMap ||
            parameters.flatShading
            ? "#extension GL_OES_standard_derivatives : enable"
            : "",
        (extensions.fragDepth || parameters.logarithmicDepthBuffer) && rendererExtensions.get("EXT_frag_depth")
            ? "#extension GL_EXT_frag_depth : enable"
            : "",
        extensions.drawBuffers && rendererExtensions.get("WEBGL_draw_buffers")
            ? "#extension GL_EXT_draw_buffers : require"
            : "",
        (extensions.shaderTextureLOD || parameters.envMap) && rendererExtensions.get("EXT_shader_texture_lod")
            ? "#extension GL_EXT_shader_texture_lod : enable"
            : "",
    ];
    return chunks.filter(filterEmptyLine).join("\n");
}
function getToneMappingFunction(functionName, toneMapping) {
    let toneMappingName;
    switch (toneMapping) {
        case LinearToneMapping:
            toneMappingName = "Linear";
            break;
        case ReinhardToneMapping:
            toneMappingName = "Reinhard";
            break;
        case Uncharted2ToneMapping:
            toneMappingName = "Uncharted2";
            break;
        case CineonToneMapping:
            toneMappingName = "OptimizedCineon";
            break;
        default:
            throw new Error("unsupported toneMapping: " + toneMapping);
    }
    return "vec3 " + functionName + "( vec3 color ) { return " + toneMappingName + "ToneMapping( color ); }";
}
function filterEmptyLine(str) {
    return str !== "";
}
function getEncodingComponents(encoding) {
    switch (encoding) {
        case LinearEncoding:
            return ["Linear", "( value )"];
        case sRGBEncoding:
            return ["sRGB", "( value )"];
        case RGBEEncoding:
            return ["RGBE", "( value )"];
        case RGBM7Encoding:
            return ["RGBM", "( value, 7.0 )"];
        case RGBM16Encoding:
            return ["RGBM", "( value, 16.0 )"];
        case RGBDEncoding:
            return ["RGBD", "( value, 256.0 )"];
        case GammaEncoding:
            return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
        default:
            throw new Error("unsupported encoding: " + encoding);
    }
}
function getTexelDecodingFunction(functionName, encoding) {
    const components = getEncodingComponents(encoding);
    return "vec4 " + functionName + "( vec4 value ) { return " + components[0] + "ToLinear" + components[1] + "; }";
}
function getTexelEncodingFunction(functionName, encoding) {
    const components = getEncodingComponents(encoding);
    return "vec4 " + functionName + "( vec4 value ) { return LinearTo" + components[0] + components[1] + "; }";
}
function replaceLightNums(str, parameters) {
    return str
        .replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights + "")
        .replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights + "")
        .replace(/NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights + "")
        .replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights + "")
        .replace(/NUM_HEMI_LIGHTS/g, parameters.numHemiLights + "");
}
function parseIncludes(str) {
    return str.replace(/^[ \t]*#include +<([\w\d.]+)>/gm, (match, include) => {
        const replace = ShaderChunk[include];
        if (replace === undefined) {
            throw new Error("Can not resolve #include <" + include + ">");
        }
        return parseIncludes(replace);
    });
}
function unrollLoops(str) {
    const pattern = /for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
    function replace(match, start, end, snippet) {
        let unroll = "";
        for (let i = parseInt(start, 10); i < parseInt(end, 10); i++) {
            unroll += snippet.replace(/\[ i \]/g, "[ " + i + " ]");
        }
        return unroll;
    }
    return str.replace(pattern, replace);
}
function fetchAttributeLocations(gl, program) {
    const attributes = {};
    const n = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < n; i++) {
        const info = gl.getActiveAttrib(program, i);
        const name = info.name;
        attributes[name] = gl.getAttribLocation(program, name);
    }
    return attributes;
}
let programIdCount = 0;
export class WebGLProgramWrapper {
    constructor(renderer, extensions, code, material, shader, parameters) {
        this.usedTimes = 1;
        this.id = programIdCount++;
        this.renderer = renderer;
        const gl = renderer.context;
        const defines = material.defines;
        let vertexShader = shader.vertexShader;
        let fragmentShader = shader.fragmentShader;
        let shadowMapTypeDefine = "SHADOWMAP_TYPE_BASIC";
        if (parameters.shadowMapType === PCFShadowMap) {
            shadowMapTypeDefine = "SHADOWMAP_TYPE_PCF";
        }
        else if (parameters.shadowMapType === PCFSoftShadowMap) {
            shadowMapTypeDefine = "SHADOWMAP_TYPE_PCF_SOFT";
        }
        let envMapTypeDefine = "ENVMAP_TYPE_CUBE";
        let envMapModeDefine = "ENVMAP_MODE_REFLECTION";
        let envMapBlendingDefine = "ENVMAP_BLENDING_MULTIPLY";
        if (parameters.envMap) {
            switch (material.envMap.mapping) {
                case CubeReflectionMapping:
                case CubeRefractionMapping:
                    envMapTypeDefine = "ENVMAP_TYPE_CUBE";
                    break;
                case CubeUVReflectionMapping:
                case CubeUVRefractionMapping:
                    envMapTypeDefine = "ENVMAP_TYPE_CUBE_UV";
                    break;
                case EquirectangularReflectionMapping:
                case EquirectangularRefractionMapping:
                    envMapTypeDefine = "ENVMAP_TYPE_EQUIREC";
                    break;
                case SphericalReflectionMapping:
                    envMapTypeDefine = "ENVMAP_TYPE_SPHERE";
                    break;
            }
            switch (material.envMap.mapping) {
                case CubeRefractionMapping:
                case EquirectangularRefractionMapping:
                    envMapModeDefine = "ENVMAP_MODE_REFRACTION";
                    break;
            }
            switch (material.combine) {
                case MultiplyOperation:
                    envMapBlendingDefine = "ENVMAP_BLENDING_MULTIPLY";
                    break;
                case MixOperation:
                    envMapBlendingDefine = "ENVMAP_BLENDING_MIX";
                    break;
                case AddOperation:
                    envMapBlendingDefine = "ENVMAP_BLENDING_ADD";
                    break;
            }
        }
        const gammaFactorDefine = renderer.gammaFactor > 0 ? renderer.gammaFactor : 1.0;
        const customExtensions = generateExtensions(material.extensions, parameters, extensions);
        const customDefines = generateDefines(defines);
        const program = gl.createProgram();
        let prefixVertex, prefixFragment;
        if (material instanceof RawShaderMaterial) {
            prefixVertex = [customDefines].filter(filterEmptyLine).join("\n");
            if (prefixVertex.length > 0) {
                prefixVertex += "\n";
            }
            prefixFragment = [customExtensions, customDefines].filter(filterEmptyLine).join("\n");
            if (prefixFragment.length > 0) {
                prefixFragment += "\n";
            }
        }
        else {
            prefixVertex = [
                "precision " + parameters.precision + " float;",
                "precision " + parameters.precision + " int;",
                "#define SHADER_NAME " + shader.name,
                customDefines,
                parameters.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "",
                "#define GAMMA_FACTOR " + gammaFactorDefine,
                "#define MAX_BONES " + parameters.maxBones,
                parameters.useFog && parameters.fog ? "#define USE_FOG" : "",
                parameters.useFog && parameters.fogExp ? "#define FOG_EXP2" : "",
                parameters.map ? "#define USE_MAP" : "",
                parameters.envMap ? "#define USE_ENVMAP" : "",
                parameters.envMap ? "#define " + envMapModeDefine : "",
                parameters.lightMap ? "#define USE_LIGHTMAP" : "",
                parameters.aoMap ? "#define USE_AOMAP" : "",
                parameters.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
                parameters.bumpMap ? "#define USE_BUMPMAP" : "",
                parameters.normalMap ? "#define USE_NORMALMAP" : "",
                parameters.displacementMap && parameters.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "",
                parameters.specularMap ? "#define USE_SPECULARMAP" : "",
                parameters.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
                parameters.metalnessMap ? "#define USE_METALNESSMAP" : "",
                parameters.alphaMap ? "#define USE_ALPHAMAP" : "",
                parameters.vertexColors ? "#define USE_COLOR" : "",
                parameters.flatShading ? "#define FLAT_SHADED" : "",
                parameters.skinning ? "#define USE_SKINNING" : "",
                parameters.useVertexTexture ? "#define BONE_TEXTURE" : "",
                parameters.morphTargets ? "#define USE_MORPHTARGETS" : "",
                parameters.morphNormals && parameters.flatShading === false ? "#define USE_MORPHNORMALS" : "",
                parameters.doubleSided ? "#define DOUBLE_SIDED" : "",
                parameters.flipSided ? "#define FLIP_SIDED" : "",
                "#define NUM_CLIPPING_PLANES " + parameters.numClippingPlanes,
                parameters.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
                parameters.shadowMapEnabled ? "#define " + shadowMapTypeDefine : "",
                parameters.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
                parameters.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
                parameters.logarithmicDepthBuffer && extensions.get("EXT_frag_depth")
                    ? "#define USE_LOGDEPTHBUF_EXT"
                    : "",
                "uniform mat4 modelMatrix;",
                "uniform mat4 modelViewMatrix;",
                "uniform mat4 projectionMatrix;",
                "uniform mat4 viewMatrix;",
                "uniform mat3 normalMatrix;",
                "uniform vec3 cameraPosition;",
                "attribute vec3 position;",
                "attribute vec3 normal;",
                "attribute vec2 uv;",
                "#ifdef USE_COLOR",
                "	attribute vec3 color;",
                "#endif",
                "#ifdef USE_MORPHTARGETS",
                "	attribute vec3 morphTarget0;",
                "	attribute vec3 morphTarget1;",
                "	attribute vec3 morphTarget2;",
                "	attribute vec3 morphTarget3;",
                "	#ifdef USE_MORPHNORMALS",
                "		attribute vec3 morphNormal0;",
                "		attribute vec3 morphNormal1;",
                "		attribute vec3 morphNormal2;",
                "		attribute vec3 morphNormal3;",
                "	#else",
                "		attribute vec3 morphTarget4;",
                "		attribute vec3 morphTarget5;",
                "		attribute vec3 morphTarget6;",
                "		attribute vec3 morphTarget7;",
                "	#endif",
                "#endif",
                "#ifdef USE_SKINNING",
                "	attribute vec4 skinIndex;",
                "	attribute vec4 skinWeight;",
                "#endif",
                "\n",
            ]
                .filter(filterEmptyLine)
                .join("\n");
            prefixFragment = [
                customExtensions,
                "precision " + parameters.precision + " float;",
                "precision " + parameters.precision + " int;",
                "#define SHADER_NAME " + shader.name,
                customDefines,
                parameters.alphaTest ? "#define ALPHATEST " + parameters.alphaTest : "",
                "#define GAMMA_FACTOR " + gammaFactorDefine,
                parameters.useFog && parameters.fog ? "#define USE_FOG" : "",
                parameters.useFog && parameters.fogExp ? "#define FOG_EXP2" : "",
                parameters.map ? "#define USE_MAP" : "",
                parameters.envMap ? "#define USE_ENVMAP" : "",
                parameters.envMap ? "#define " + envMapTypeDefine : "",
                parameters.envMap ? "#define " + envMapModeDefine : "",
                parameters.envMap ? "#define " + envMapBlendingDefine : "",
                parameters.lightMap ? "#define USE_LIGHTMAP" : "",
                parameters.aoMap ? "#define USE_AOMAP" : "",
                parameters.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
                parameters.bumpMap ? "#define USE_BUMPMAP" : "",
                parameters.normalMap ? "#define USE_NORMALMAP" : "",
                parameters.specularMap ? "#define USE_SPECULARMAP" : "",
                parameters.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
                parameters.metalnessMap ? "#define USE_METALNESSMAP" : "",
                parameters.alphaMap ? "#define USE_ALPHAMAP" : "",
                parameters.vertexColors ? "#define USE_COLOR" : "",
                parameters.gradientMap ? "#define USE_GRADIENTMAP" : "",
                parameters.flatShading ? "#define FLAT_SHADED" : "",
                parameters.doubleSided ? "#define DOUBLE_SIDED" : "",
                parameters.flipSided ? "#define FLIP_SIDED" : "",
                "#define NUM_CLIPPING_PLANES " + parameters.numClippingPlanes,
                "#define UNION_CLIPPING_PLANES " + (parameters.numClippingPlanes - parameters.numClipIntersection),
                parameters.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
                parameters.shadowMapEnabled ? "#define " + shadowMapTypeDefine : "",
                parameters.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
                parameters.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "",
                parameters.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
                parameters.logarithmicDepthBuffer && extensions.get("EXT_frag_depth")
                    ? "#define USE_LOGDEPTHBUF_EXT"
                    : "",
                parameters.envMap && extensions.get("EXT_shader_texture_lod") ? "#define TEXTURE_LOD_EXT" : "",
                "uniform mat4 viewMatrix;",
                "uniform vec3 cameraPosition;",
                parameters.toneMapping !== NoToneMapping ? "#define TONE_MAPPING" : "",
                parameters.toneMapping !== NoToneMapping ? ShaderChunk["tonemapping_pars_fragment"] : "",
                parameters.toneMapping !== NoToneMapping
                    ? getToneMappingFunction("toneMapping", parameters.toneMapping)
                    : "",
                parameters.dithering ? "#define DITHERING" : "",
                parameters.outputEncoding ||
                    parameters.mapEncoding ||
                    parameters.envMapEncoding ||
                    parameters.emissiveMapEncoding
                    ? ShaderChunk["encodings_pars_fragment"]
                    : "",
                // this code is required here because it is used by the various encoding/decoding function defined below
                parameters.mapEncoding ? getTexelDecodingFunction("mapTexelToLinear", parameters.mapEncoding) : "",
                parameters.envMapEncoding
                    ? getTexelDecodingFunction("envMapTexelToLinear", parameters.envMapEncoding)
                    : "",
                parameters.emissiveMapEncoding
                    ? getTexelDecodingFunction("emissiveMapTexelToLinear", parameters.emissiveMapEncoding)
                    : "",
                parameters.outputEncoding
                    ? getTexelEncodingFunction("linearToOutputTexel", parameters.outputEncoding)
                    : "",
                parameters.depthPacking ? "#define DEPTH_PACKING " + material.depthPacking : "",
                "\n",
            ]
                .filter(filterEmptyLine)
                .join("\n");
        }
        vertexShader = parseIncludes(vertexShader);
        vertexShader = replaceLightNums(vertexShader, parameters);
        fragmentShader = parseIncludes(fragmentShader);
        fragmentShader = replaceLightNums(fragmentShader, parameters);
        if (!(material instanceof ShaderMaterial)) {
            vertexShader = unrollLoops(vertexShader);
            fragmentShader = unrollLoops(fragmentShader);
        }
        const vertexGlsl = prefixVertex + vertexShader;
        const fragmentGlsl = prefixFragment + fragmentShader;
        const glVertexShader = new WebGLShaderWrapper(gl, gl.VERTEX_SHADER, vertexGlsl);
        const glFragmentShader = new WebGLShaderWrapper(gl, gl.FRAGMENT_SHADER, fragmentGlsl);
        gl.attachShader(program, glVertexShader);
        gl.attachShader(program, glFragmentShader);
        // Force a particular attribute to index 0.
        if (material.index0AttributeName !== undefined) {
            gl.bindAttribLocation(program, 0, material.index0AttributeName);
        }
        else if (parameters.morphTargets === true) {
            // programs with morphTargets displace position out of attribute 0
            gl.bindAttribLocation(program, 0, "position");
        }
        gl.linkProgram(program);
        const programLog = gl.getProgramInfoLog(program).trim();
        const vertexLog = gl.getShaderInfoLog(glVertexShader).trim();
        const fragmentLog = gl.getShaderInfoLog(glFragmentShader).trim();
        let runnable = true;
        let haveDiagnostics = true;
        // console.log( '**VERTEX**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glVertexShader ) );
        // console.log( '**FRAGMENT**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( glFragmentShader ) );
        if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
            runnable = false;
            console.error("THREE.WebGLProgram: shader error: ", gl.getError(), "gl.VALIDATE_STATUS", gl.getProgramParameter(program, gl.VALIDATE_STATUS), "gl.getProgramInfoLog", programLog, vertexLog, fragmentLog);
        }
        else if (programLog !== "") {
            console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", programLog);
        }
        else if (vertexLog === "" || fragmentLog === "") {
            haveDiagnostics = false;
        }
        if (haveDiagnostics) {
            this.diagnostics = {
                runnable: runnable,
                material: material,
                programLog: programLog,
                vertexShader: {
                    log: vertexLog,
                    prefix: prefixVertex,
                },
                fragmentShader: {
                    log: fragmentLog,
                    prefix: prefixFragment,
                },
            };
        }
        // clean up
        gl.deleteShader(glVertexShader);
        gl.deleteShader(glFragmentShader);
        this.code = code;
        this.program = program;
        this.vertexShader = glVertexShader;
        this.fragmentShader = glFragmentShader;
    }
    getAttributes() {
        if (this.cachedAttributes === undefined) {
            this.cachedAttributes = fetchAttributeLocations(this.renderer.context, this.program);
        }
        return this.cachedAttributes;
    }
    getUniforms() {
        if (this.cachedUniforms === undefined) {
            this.cachedUniforms = new WebGLUniformsWrapper(this.renderer, this.program);
        }
        return this.cachedUniforms;
    }
    // free resource
    destroy() {
        this.renderer.context.deleteProgram(this.program);
        this.program = undefined;
    }
}
