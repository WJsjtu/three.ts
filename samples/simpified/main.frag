precision highp float;
precision highp int;
#define SHADER_NAME MeshPhongMaterial
#define GAMMA_FACTOR 2
#define saturate(a) clamp( a, 0.0, 1.0 )
uniform float toneMappingExposure;
uniform float toneMappingWhitePoint;

vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}

vec3 toneMapping( vec3 color ) {
	return LinearToneMapping( color );
}

vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );
}
vec4 linearToOutputTexel( vec4 value ) {
	return LinearToGamma( value, float( GAMMA_FACTOR ) );
}

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#define PI 3.14159265359
#define RECIPROCAL_PI 0.31830988618

#define saturate(a) clamp( a, 0.0, 1.0 )
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract(sin(sn) * c);
}
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
};
vec3 dithering( vec3 color ) {
	float grid_position = rand( gl_FragCoord.xy );
	vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
	dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
	return color + dither_shift_RGB;
}

float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	if( decayExponent > 0.0 ) {
		return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );
	}
	return 1.0;
}
vec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {
	float fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );
	return ( 1.0 - specularColor ) * fresnel + specularColor;
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );
	float dotNH = saturate( dot( geometry.normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
uniform vec3 ambientLightColor;
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	irradiance *= PI;
	return irradiance;
}
struct SpotLight {
	vec3 position;
	vec3 direction;
	vec3 color;
	float distance;
	float decay;
	float coneCos;
	float penumbraCos;
	int shadow;
	float shadowBias;
	float shadowRadius;
	vec2 shadowMapSize;
};
uniform SpotLight spotLights[ 1 ];
void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {
	vec3 lVector = spotLight.position - geometry.position;
	directLight.direction = normalize( lVector );
	float lightDistance = length( lVector );
	float angleCos = dot( directLight.direction, spotLight.direction );
	if ( angleCos > spotLight.coneCos ) {
		float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		directLight.color = spotLight.color;
		directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );
		directLight.visible = true;
	} else {
		directLight.color = vec3( 0.0 );
		directLight.visible = false;
	}
}

varying vec3 vViewPosition;
varying vec3 vNormal;
struct BlinnPhongMaterial {
	vec3	diffuseColor;
	vec3	specularColor;
	float	specularShininess;
	float	specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	irradiance *= PI;
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}

void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	float specularStrength = 1.0;
	vec3 normal = normalize( vNormal );
	BlinnPhongMaterial material;
	material.diffuseColor = diffuseColor.rgb;
	material.specularColor = specular;
	material.specularShininess = shininess;
	material.specularStrength = specularStrength;
	GeometricContext geometry;
	geometry.position = - vViewPosition;
	geometry.normal = normal;
	geometry.viewDir = normalize( vViewPosition );
	IncidentLight directLight;
	SpotLight spotLight = spotLights[ 0 ];
	getSpotDirectLightIrradiance( spotLight, geometry, directLight );
	RE_Direct_BlinnPhong( directLight, geometry, material, reflectedLight );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	RE_IndirectDiffuse_BlinnPhong( irradiance, geometry, material, reflectedLight );
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
	gl_FragColor = linearToOutputTexel( gl_FragColor );
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
}