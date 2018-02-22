import { Color } from "../math/Color";
import { IUniform, UniformsUtils } from "../renderers/shaders/UniformsUtils";
import { Texture } from "../textures/Texture";
import { IMaterialParameters, Material } from "./Material";

export interface IShaderMaterialParameters extends IMaterialParameters {
    clipping?: boolean;
    fog?: boolean;
    fragmentShader?: string;
    index0AttributeName?: string;
    linewidth?: number;
    morphNormals?: boolean;
    morphTargets?: boolean;
    skinning?: boolean;
    vertexShader?: string;
    wireframe?: boolean;
    wireframeLinewidth?: number;
}

export class ShaderMaterial extends Material {
    public readonly type: string = "ShaderMaterial";

    public defines: { [key: string]: any } = {};
    public uniforms: { [key: string]: IUniform } = {};

    public vertexShader: string = `void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}`;
    public fragmentShader: string = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";

    public linewidth: number = 1;
    public wireframe: boolean = false;
    public wireframeLinewidth: number = 1;

    public fog: boolean = false; // set to use scene fog
    public lights: boolean = false; // set to use scene lights
    public clipping: boolean = false; // set to use user-defined clipping planes

    public skinning: boolean = false; // set to use skinning attribute streams
    public morphTargets: boolean = false; // set to use morph targets
    public morphNormals: boolean = false; // set to use morph normals

    public extensions: { [key: string]: boolean } = {
        derivatives: false, // set to use derivatives
        drawBuffers: false, // set to use draw buffers
        fragDepth: false, // set to use fragment depth values
        shaderTextureLOD: false, // set to use shader texture LOD
    };

    // When rendered geometry doesn't include these attributes but the material does,
    // use these default values in WebGL. This avoids errors when buffer data is missing.
    public defaultAttributeValues: { [key: string]: number[] } = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv2: [0, 0],
    };

    /**
     * TODO: WebGLProgram undefined check change
     */
    public index0AttributeName: string = null;

    constructor(parameters: IShaderMaterialParameters) {
        super();
        this.setValues(parameters);
    }

    public copy(source: ShaderMaterial): this {
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
