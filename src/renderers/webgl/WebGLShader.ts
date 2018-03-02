function addLineNumbers(str: string): string {
    const lines: string[] = str.split("\n");
    for (let i: number = 0; i < lines.length; i++) {
        lines[i] = i + 1 + ": " + lines[i];
    }
    return lines.join("\n");
}

export class WebGLShaderWrapper {
    public shader: WebGLShader;

    constructor(gl: WebGLRenderingContext, type: number, str: string) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, str);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {
            console.error(`THREE.WebGLShader: Shader couldn't compile.`);
        }
        if (gl.getShaderInfoLog(shader) !== "") {
            console.warn(
                `THREE.WebGLShader: gl.getShaderInfoLog() ${
                    type === gl.VERTEX_SHADER ? "vertex" : "fragment"
                } ${gl.getShaderInfoLog(shader)} ${addLineNumbers(str)}`,
            );
        }
        this.shader = shader;
    }
}
