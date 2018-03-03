precision highp float;
precision highp int;
#define SHADER_NAME MeshPhongMaterial
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
attribute vec3 position;
attribute vec3 normal;
varying vec3 vViewPosition;
varying vec3 vNormal;
void main() {
	vNormal = normalize( normalMatrix * normal );
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
	vViewPosition = - mvPosition.xyz;
}