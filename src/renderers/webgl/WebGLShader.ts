function addLineNumbers(string: string): string {
    const lines: string[] = string.split("\n");
    for (let i: number = 0; i < lines.length; i++) {
        lines[i] = ( i + 1 ) + ": " + lines[i];
    }
    return lines.join("\n");
}

export class WebGLShader {
    constructor(gl: WebGLRenderingContext, type: number, string: string) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, string);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {
            console.error(`THREE.WebGLShader: Shader couldn't compile.`);
        }
        if (gl.getShaderInfoLog(shader) !== "") {
            console.warn(`THREE.WebGLShader: gl.getShaderInfoLog() ${type === gl.VERTEX_SHADER ? "vertex" : "fragment"} ${gl.getShaderInfoLog(shader)} ${addLineNumbers(string)}`);
        }
    }
}