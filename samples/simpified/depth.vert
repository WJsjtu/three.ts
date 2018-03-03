precision highp float;
precision highp int;
#define SHADER_NAME MeshDepthMaterial
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
void main() {
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}