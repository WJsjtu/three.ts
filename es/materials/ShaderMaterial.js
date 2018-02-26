import { UniformsUtils } from "../renderers/shaders/UniformsUtils";
import { Material } from "./Material";
export class ShaderMaterial extends Material {
    constructor(parameters) {
        super();
        this.type = "ShaderMaterial";
        this.defines = {};
        this.uniforms = {};
        this.vertexShader = `void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}`;
        this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
        this.linewidth = 1;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.fog = false; // set to use scene fog
        this.lights = false; // set to use scene lights
        this.clipping = false; // set to use user-defined clipping planes
        this.skinning = false; // set to use skinning attribute streams
        this.morphTargets = false; // set to use morph targets
        this.morphNormals = false; // set to use morph normals
        this.extensions = {
            derivatives: false,
            drawBuffers: false,
            fragDepth: false,
            shaderTextureLOD: false,
        };
        // When rendered geometry doesn't include these attributes but the material does,
        // use these default values in WebGL. This avoids errors when buffer data is missing.
        this.defaultAttributeValues = {
            color: [1, 1, 1],
            uv: [0, 0],
            uv2: [0, 0],
        };
        /**
         * TODO: WebGLProgram undefined check change
         */
        this.index0AttributeName = null;
        this.setValues(parameters);
    }
    copy(source) {
        this.fragmentShader = source.fragmentShader;
        this.vertexShader = source.vertexShader;
        this.uniforms = UniformsUtils.clone(source.uniforms);
        this.defines = source.defines;
        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;
        this.lights = source.lights;
        this.clipping = source.clipping;
        this.skinning = source.skinning;
        this.morphTargets = source.morphTargets;
        this.morphNormals = source.morphNormals;
        this.extensions = source.extensions;
        return this;
    }
}
