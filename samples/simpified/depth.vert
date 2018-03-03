precision highp float;
precision highp int;
#define SHADER_NAME MeshDepthMaterial
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
void main() {
	vec3 transformed = vec3( position );
	vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}