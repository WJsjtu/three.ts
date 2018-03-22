precision highp float;
precision highp int;
#define SHADER_NAME MeshDepthMaterial
const float PackUpscale = 256. / 255.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	/**
	 * 将浮点数v转成256进制，由于v \in [0, 1]，所以
	 * v 可以表示为 0.abcd，其中a、b、c、d \in [0, 255]
	 * vec4 r = vec4( fract( v * PackFactors ), v );
	 * r = vec4(0.d, 0.cd, 0.bcd, 0.abcd);
	 * r.yzw -= r.xyz * ShiftRight8;
	 * r = vec4(0.d, 0.c, 0.b, 0.a); (0.a|b|c|d) \in [0, 255/256]
	 * 最后将 [0, 255/256] 映射到 [0, 1] 即乘以 256 / 255
	 * 最终 r = 256 / 255 * vec4(0.d, 0.c, 0.b, 0.a)
	 * 恢复v的时候只需要 v = 255 / 256 * dot(r, vec4(1 / (256 * 256 * 256), 1 / (256 * 256), 1 / 256, 1) )
	 */
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;
	return r * PackUpscale;
}
void main() {
	/**
	 * gl_FragCoord.z = 0.5 * (gl_Position.z / gl_Position.w) + 0.5
	 */
	gl_FragColor = packDepthToRGBA( gl_FragCoord.z );
}