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
	vec3 objectNormal = vec3( normal );
	vec3 transformedNormal = normalMatrix * objectNormal;
	vNormal = normalize( transformedNormal );
	vec3 transformed = vec3( position );
	vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
	vViewPosition = - mvPosition.xyz;
}