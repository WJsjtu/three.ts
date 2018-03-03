precision highp float;
precision highp int;
#define SHADER_NAME MeshDepthMaterial
#define GAMMA_FACTOR 2
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;
	return r * PackUpscale;
}
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	gl_FragColor = packDepthToRGBA( gl_FragCoord.z );
}