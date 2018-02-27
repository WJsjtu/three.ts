(function webpackUniversalModuleDefinition(root,factory){if(typeof exports==="object"&&typeof module==="object")module.exports=factory();else if(typeof define==="function"&&define.amd)define([],factory);else{var a=factory();for(var i in a)(typeof exports==="object"?exports:root)[i]=a[i]}})(window,function(){/******/
return function(modules){// webpackBootstrap
/******/ // The module cache
/******/var installedModules={};
/******/
/******/ // The require function
/******/function __webpack_require__(moduleId){
/******/
/******/ // Check if module is in cache
/******/if(installedModules[moduleId]){
/******/return installedModules[moduleId].exports;
/******/}
/******/ // Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={
/******/i:moduleId,
/******/l:false,
/******/exports:{}
/******/};
/******/
/******/ // Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);
/******/
/******/ // Flag the module as loaded
/******/module.l=true;
/******/
/******/ // Return the exports of the module
/******/return module.exports;
/******/}
/******/
/******/
/******/ // expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;
/******/
/******/ // expose the module cache
/******/__webpack_require__.c=installedModules;
/******/
/******/ // define getter function for harmony exports
/******/__webpack_require__.d=function(exports,name,getter){
/******/if(!__webpack_require__.o(exports,name)){
/******/Object.defineProperty(exports,name,{
/******/configurable:false,
/******/enumerable:true,
/******/get:getter
/******/});
/******/}
/******/};
/******/
/******/ // define __esModule on exports
/******/__webpack_require__.r=function(exports){
/******/Object.defineProperty(exports,"__esModule",{value:true});
/******/};
/******/
/******/ // getDefaultExport function for compatibility with non-harmony modules
/******/__webpack_require__.n=function(module){
/******/var getter=module&&module.__esModule?
/******/function getDefault(){return module["default"]}:
/******/function getModuleExports(){return module};
/******/__webpack_require__.d(getter,"a",getter);
/******/return getter;
/******/};
/******/
/******/ // Object.prototype.hasOwnProperty.call
/******/__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)};
/******/
/******/ // __webpack_public_path__
/******/__webpack_require__.p="";
/******/
/******/
/******/ // Load entry module and return exports
/******/return __webpack_require__(__webpack_require__.s="./src/Three.ts");
/******/}
/************************************************************************/
/******/({
/***/"./src/Three.ts":
/*!**********************!*\
  !*** ./src/Three.ts ***!
  \**********************/
/*! exports provided: WebGLRenderTargetCube, WebGLRenderTarget, WebGLRenderer, ShaderLib, UniformsLib, UniformsUtils, ShaderChunk, FogExp2, Fog, Scene, Sprite, LOD, SkinnedMesh, Skeleton, Bone, Mesh, LineSegments, LineLoop, Line, Points, Group, VideoTexture, DataTexture, CompressedTexture, CubeTexture, CanvasTexture, DepthTexture, Texture, SpotLightShadow, SpotLight, PointLight, RectAreaLight, HemisphereLight, DirectionalLightShadow, DirectionalLight, AmbientLight, LightShadow, Light, PerspectiveCamera, OrthographicCamera, Camera, AudioListener, PositionalAudio, AudioContext, AudioAnalyser, Audio, InstancedBufferGeometry, BufferGeometry, Geometry, InterleavedBufferAttribute, InstancedInterleavedBufferAttribute, InstancedBufferAttribute, Face3, Object3D, Raycaster, Layers, EventDispatcher, Clock, Triangle, Math, Plane, Frustum, Sphere, Ray, Matrix2, Matrix3, Matrix4, Box3, Line3, Euler, Vector4, Vector3, Vector2, Quaternion, Color, WebGLUtils, ConeGeometry, ConeBufferGeometry, CylinderGeometry, CylinderBufferGeometry, CircleGeometry, CircleBufferGeometry, BoxGeometry, BoxBufferGeometry, ShadowMaterial, SpriteMaterial, ShaderMaterial, PointsMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshToonMaterial, MeshNormalMaterial, MeshLambertMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshBasicMaterial, LineDashedMaterial, LineBasicMaterial, Material, BufferAttribute, Int8BufferAttribute, Uint8BufferAttribute, Uint8ClampedBufferAttribute, Int16BufferAttribute, Uint16BufferAttribute, Int32BufferAttribute, Uint32BufferAttribute, Float32BufferAttribute, Float64BufferAttribute, REVISION, MOUSE, CullFaceNone, CullFaceBack, CullFaceFront, CullFaceFrontBack, FrontFaceDirectionCW, FrontFaceDirectionCCW, BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, FrontSide, BackSide, DoubleSide, FlatShading, SmoothShading, NoColors, FaceColors, VertexColors, NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending, AddEquation, SubtractEquation, ReverseSubtractEquation, MinEquation, MaxEquation, ZeroFactor, OneFactor, SrcColorFactor, OneMinusSrcColorFactor, SrcAlphaFactor, OneMinusSrcAlphaFactor, DstAlphaFactor, OneMinusDstAlphaFactor, DstColorFactor, OneMinusDstColorFactor, SrcAlphaSaturateFactor, NeverDepth, AlwaysDepth, LessDepth, LessEqualDepth, EqualDepth, GreaterEqualDepth, GreaterDepth, NotEqualDepth, MultiplyOperation, MixOperation, AddOperation, NoToneMapping, LinearToneMapping, ReinhardToneMapping, Uncharted2ToneMapping, CineonToneMapping, UVMapping, CubeReflectionMapping, CubeRefractionMapping, EquirectangularReflectionMapping, EquirectangularRefractionMapping, SphericalReflectionMapping, CubeUVReflectionMapping, CubeUVRefractionMapping, RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, NearestFilter, NearestMipMapNearestFilter, NearestMipMapLinearFilter, LinearFilter, LinearMipMapNearestFilter, LinearMipMapLinearFilter, UnsignedByteType, ByteType, ShortType, UnsignedShortType, IntType, UnsignedIntType, FloatType, HalfFloatType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShort565Type, UnsignedInt248Type, AlphaFormat, RGBFormat, RGBAFormat, LuminanceFormat, LuminanceAlphaFormat, RGBEFormat, DepthFormat, DepthStencilFormat, RGB_S3TC_DXT1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGB_PVRTC_4BPPV1_Format, RGB_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_PVRTC_2BPPV1_Format, RGB_ETC1_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_10x10_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, LoopOnce, LoopRepeat, LoopPingPong, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, ZeroCurvatureEnding, ZeroSlopeEnding, WrapAroundEnding, TrianglesDrawMode, TriangleStripDrawMode, TriangleFanDrawMode, LinearEncoding, sRGBEncoding, GammaEncoding, RGBEEncoding, LogLuvEncoding, RGBM7Encoding, RGBM16Encoding, RGBDEncoding, BasicDepthPacking, RGBADepthPacking */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony import */var _renderers_WebGLRenderTargetCube__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./renderers/WebGLRenderTargetCube */"./src/renderers/WebGLRenderTargetCube.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"WebGLRenderTargetCube",function(){return _renderers_WebGLRenderTargetCube__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderTargetCube"]});
/* harmony import */var _renderers_WebGLRenderTarget__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./renderers/WebGLRenderTarget */"./src/renderers/WebGLRenderTarget.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"WebGLRenderTarget",function(){return _renderers_WebGLRenderTarget__WEBPACK_IMPORTED_MODULE_1__["WebGLRenderTarget"]});
/* harmony import */var _renderers_WebGLRenderer__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./renderers/WebGLRenderer */"./src/renderers/WebGLRenderer.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"WebGLRenderer",function(){return _renderers_WebGLRenderer__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderer"]});
/* harmony import */var _renderers_shaders_ShaderLib__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./renderers/shaders/ShaderLib */"./src/renderers/shaders/ShaderLib.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ShaderLib",function(){return _renderers_shaders_ShaderLib__WEBPACK_IMPORTED_MODULE_3__["ShaderLib"]});
/* harmony import */var _renderers_shaders_UniformsLib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./renderers/shaders/UniformsLib */"./src/renderers/shaders/UniformsLib.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"UniformsLib",function(){return _renderers_shaders_UniformsLib__WEBPACK_IMPORTED_MODULE_4__["UniformsLib"]});
/* harmony import */var _renderers_shaders_UniformsUtils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ./renderers/shaders/UniformsUtils */"./src/renderers/shaders/UniformsUtils.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"UniformsUtils",function(){return _renderers_shaders_UniformsUtils__WEBPACK_IMPORTED_MODULE_5__["UniformsUtils"]});
/* harmony import */var _renderers_shaders_ShaderChunk__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ./renderers/shaders/ShaderChunk */"./src/renderers/shaders/ShaderChunk.js");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ShaderChunk",function(){return _renderers_shaders_ShaderChunk__WEBPACK_IMPORTED_MODULE_6__["ShaderChunk"]});
/* harmony import */var _scenes_FogExp2__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! ./scenes/FogExp2 */"./src/scenes/FogExp2.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"FogExp2",function(){return _scenes_FogExp2__WEBPACK_IMPORTED_MODULE_7__["FogExp2"]});
/* harmony import */var _scenes_Fog__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(/*! ./scenes/Fog */"./src/scenes/Fog.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Fog",function(){return _scenes_Fog__WEBPACK_IMPORTED_MODULE_8__["Fog"]});
/* harmony import */var _scenes_Scene__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(/*! ./scenes/Scene */"./src/scenes/Scene.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Scene",function(){return _scenes_Scene__WEBPACK_IMPORTED_MODULE_9__["Scene"]});
/* harmony import */var _objects_Sprite__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(/*! ./objects/Sprite */"./src/objects/Sprite.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Sprite",function(){return _objects_Sprite__WEBPACK_IMPORTED_MODULE_10__["Sprite"]});
/* harmony import */var _objects_LOD__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(/*! ./objects/LOD */"./src/objects/LOD.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LOD",function(){return _objects_LOD__WEBPACK_IMPORTED_MODULE_11__["LOD"]});
/* harmony import */var _objects_SkinnedMesh__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(/*! ./objects/SkinnedMesh */"./src/objects/SkinnedMesh.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SkinnedMesh",function(){return _objects_SkinnedMesh__WEBPACK_IMPORTED_MODULE_12__["SkinnedMesh"]});
/* harmony import */var _objects_Skeleton__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(/*! ./objects/Skeleton */"./src/objects/Skeleton.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Skeleton",function(){return _objects_Skeleton__WEBPACK_IMPORTED_MODULE_13__["Skeleton"]});
/* harmony import */var _objects_Bone__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(/*! ./objects/Bone */"./src/objects/Bone.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Bone",function(){return _objects_Bone__WEBPACK_IMPORTED_MODULE_14__["Bone"]});
/* harmony import */var _objects_Mesh__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(/*! ./objects/Mesh */"./src/objects/Mesh.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Mesh",function(){return _objects_Mesh__WEBPACK_IMPORTED_MODULE_15__["Mesh"]});
/* harmony import */var _objects_LineSegments__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(/*! ./objects/LineSegments */"./src/objects/LineSegments.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LineSegments",function(){return _objects_LineSegments__WEBPACK_IMPORTED_MODULE_16__["LineSegments"]});
/* harmony import */var _objects_LineLoop__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(/*! ./objects/LineLoop */"./src/objects/LineLoop.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LineLoop",function(){return _objects_LineLoop__WEBPACK_IMPORTED_MODULE_17__["LineLoop"]});
/* harmony import */var _objects_Line__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(/*! ./objects/Line */"./src/objects/Line.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Line",function(){return _objects_Line__WEBPACK_IMPORTED_MODULE_18__["Line"]});
/* harmony import */var _objects_Points__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(/*! ./objects/Points */"./src/objects/Points.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Points",function(){return _objects_Points__WEBPACK_IMPORTED_MODULE_19__["Points"]});
/* harmony import */var _objects_Group__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(/*! ./objects/Group */"./src/objects/Group.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Group",function(){return _objects_Group__WEBPACK_IMPORTED_MODULE_20__["Group"]});
/* harmony import */var _textures_VideoTexture__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(/*! ./textures/VideoTexture */"./src/textures/VideoTexture.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"VideoTexture",function(){return _textures_VideoTexture__WEBPACK_IMPORTED_MODULE_21__["VideoTexture"]});
/* harmony import */var _textures_DataTexture__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(/*! ./textures/DataTexture */"./src/textures/DataTexture.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"DataTexture",function(){return _textures_DataTexture__WEBPACK_IMPORTED_MODULE_22__["DataTexture"]});
/* harmony import */var _textures_CompressedTexture__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(/*! ./textures/CompressedTexture */"./src/textures/CompressedTexture.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CompressedTexture",function(){return _textures_CompressedTexture__WEBPACK_IMPORTED_MODULE_23__["CompressedTexture"]});
/* harmony import */var _textures_CubeTexture__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__(/*! ./textures/CubeTexture */"./src/textures/CubeTexture.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CubeTexture",function(){return _textures_CubeTexture__WEBPACK_IMPORTED_MODULE_24__["CubeTexture"]});
/* harmony import */var _textures_CanvasTexture__WEBPACK_IMPORTED_MODULE_25__=__webpack_require__(/*! ./textures/CanvasTexture */"./src/textures/CanvasTexture.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CanvasTexture",function(){return _textures_CanvasTexture__WEBPACK_IMPORTED_MODULE_25__["CanvasTexture"]});
/* harmony import */var _textures_DepthTexture__WEBPACK_IMPORTED_MODULE_26__=__webpack_require__(/*! ./textures/DepthTexture */"./src/textures/DepthTexture.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"DepthTexture",function(){return _textures_DepthTexture__WEBPACK_IMPORTED_MODULE_26__["DepthTexture"]});
/* harmony import */var _textures_Texture__WEBPACK_IMPORTED_MODULE_27__=__webpack_require__(/*! ./textures/Texture */"./src/textures/Texture.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Texture",function(){return _textures_Texture__WEBPACK_IMPORTED_MODULE_27__["Texture"]});
/* harmony import */var _geometries_Geometries__WEBPACK_IMPORTED_MODULE_28__=__webpack_require__(/*! ./geometries/Geometries */"./src/geometries/Geometries.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ConeGeometry",function(){return _geometries_Geometries__WEBPACK_IMPORTED_MODULE_28__["ConeGeometry"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ConeBufferGeometry",function(){return _geometries_Geometries__WEBPACK_IMPORTED_MODULE_28__["ConeBufferGeometry"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CylinderGeometry",function(){return _geometries_Geometries__WEBPACK_IMPORTED_MODULE_28__["CylinderGeometry"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CylinderBufferGeometry",function(){return _geometries_Geometries__WEBPACK_IMPORTED_MODULE_28__["CylinderBufferGeometry"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CircleGeometry",function(){return _geometries_Geometries__WEBPACK_IMPORTED_MODULE_28__["CircleGeometry"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CircleBufferGeometry",function(){return _geometries_Geometries__WEBPACK_IMPORTED_MODULE_28__["CircleBufferGeometry"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"BoxGeometry",function(){return _geometries_Geometries__WEBPACK_IMPORTED_MODULE_28__["BoxGeometry"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"BoxBufferGeometry",function(){return _geometries_Geometries__WEBPACK_IMPORTED_MODULE_28__["BoxBufferGeometry"]});
/* harmony import */var _materials_Materials__WEBPACK_IMPORTED_MODULE_29__=__webpack_require__(/*! ./materials/Materials */"./src/materials/Materials.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ShadowMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["ShadowMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SpriteMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["SpriteMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ShaderMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["ShaderMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"PointsMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["PointsMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshPhysicalMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["MeshPhysicalMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshStandardMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["MeshStandardMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshPhongMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["MeshPhongMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshToonMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["MeshToonMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshNormalMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["MeshNormalMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshLambertMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["MeshLambertMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshDepthMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["MeshDepthMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshDistanceMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["MeshDistanceMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshBasicMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["MeshBasicMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LineDashedMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["LineDashedMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LineBasicMaterial",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["LineBasicMaterial"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Material",function(){return _materials_Materials__WEBPACK_IMPORTED_MODULE_29__["Material"]});
/* harmony import */var _lights_SpotLightShadow__WEBPACK_IMPORTED_MODULE_30__=__webpack_require__(/*! ./lights/SpotLightShadow */"./src/lights/SpotLightShadow.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SpotLightShadow",function(){return _lights_SpotLightShadow__WEBPACK_IMPORTED_MODULE_30__["SpotLightShadow"]});
/* harmony import */var _lights_SpotLight__WEBPACK_IMPORTED_MODULE_31__=__webpack_require__(/*! ./lights/SpotLight */"./src/lights/SpotLight.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SpotLight",function(){return _lights_SpotLight__WEBPACK_IMPORTED_MODULE_31__["SpotLight"]});
/* harmony import */var _lights_PointLight__WEBPACK_IMPORTED_MODULE_32__=__webpack_require__(/*! ./lights/PointLight */"./src/lights/PointLight.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"PointLight",function(){return _lights_PointLight__WEBPACK_IMPORTED_MODULE_32__["PointLight"]});
/* harmony import */var _lights_RectAreaLight__WEBPACK_IMPORTED_MODULE_33__=__webpack_require__(/*! ./lights/RectAreaLight */"./src/lights/RectAreaLight.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RectAreaLight",function(){return _lights_RectAreaLight__WEBPACK_IMPORTED_MODULE_33__["RectAreaLight"]});
/* harmony import */var _lights_HemisphereLight__WEBPACK_IMPORTED_MODULE_34__=__webpack_require__(/*! ./lights/HemisphereLight */"./src/lights/HemisphereLight.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"HemisphereLight",function(){return _lights_HemisphereLight__WEBPACK_IMPORTED_MODULE_34__["HemisphereLight"]});
/* harmony import */var _lights_DirectionalLightShadow__WEBPACK_IMPORTED_MODULE_35__=__webpack_require__(/*! ./lights/DirectionalLightShadow */"./src/lights/DirectionalLightShadow.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"DirectionalLightShadow",function(){return _lights_DirectionalLightShadow__WEBPACK_IMPORTED_MODULE_35__["DirectionalLightShadow"]});
/* harmony import */var _lights_DirectionalLight__WEBPACK_IMPORTED_MODULE_36__=__webpack_require__(/*! ./lights/DirectionalLight */"./src/lights/DirectionalLight.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"DirectionalLight",function(){return _lights_DirectionalLight__WEBPACK_IMPORTED_MODULE_36__["DirectionalLight"]});
/* harmony import */var _lights_AmbientLight__WEBPACK_IMPORTED_MODULE_37__=__webpack_require__(/*! ./lights/AmbientLight */"./src/lights/AmbientLight.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"AmbientLight",function(){return _lights_AmbientLight__WEBPACK_IMPORTED_MODULE_37__["AmbientLight"]});
/* harmony import */var _lights_LightShadow__WEBPACK_IMPORTED_MODULE_38__=__webpack_require__(/*! ./lights/LightShadow */"./src/lights/LightShadow.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LightShadow",function(){return _lights_LightShadow__WEBPACK_IMPORTED_MODULE_38__["LightShadow"]});
/* harmony import */var _lights_Light__WEBPACK_IMPORTED_MODULE_39__=__webpack_require__(/*! ./lights/Light */"./src/lights/Light.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Light",function(){return _lights_Light__WEBPACK_IMPORTED_MODULE_39__["Light"]});
/* harmony import */var _cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_40__=__webpack_require__(/*! ./cameras/PerspectiveCamera */"./src/cameras/PerspectiveCamera.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"PerspectiveCamera",function(){return _cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_40__["PerspectiveCamera"]});
/* harmony import */var _cameras_OrthographicCamera__WEBPACK_IMPORTED_MODULE_41__=__webpack_require__(/*! ./cameras/OrthographicCamera */"./src/cameras/OrthographicCamera.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"OrthographicCamera",function(){return _cameras_OrthographicCamera__WEBPACK_IMPORTED_MODULE_41__["OrthographicCamera"]});
/* harmony import */var _cameras_Camera__WEBPACK_IMPORTED_MODULE_42__=__webpack_require__(/*! ./cameras/Camera */"./src/cameras/Camera.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Camera",function(){return _cameras_Camera__WEBPACK_IMPORTED_MODULE_42__["Camera"]});
/* harmony import */var _audio_AudioListener__WEBPACK_IMPORTED_MODULE_43__=__webpack_require__(/*! ./audio/AudioListener */"./src/audio/AudioListener.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"AudioListener",function(){return _audio_AudioListener__WEBPACK_IMPORTED_MODULE_43__["AudioListenerWrapper"]});
/* harmony import */var _audio_PositionalAudio__WEBPACK_IMPORTED_MODULE_44__=__webpack_require__(/*! ./audio/PositionalAudio */"./src/audio/PositionalAudio.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"PositionalAudio",function(){return _audio_PositionalAudio__WEBPACK_IMPORTED_MODULE_44__["PositionalAudio"]});
/* harmony import */var _audio_AudioContext__WEBPACK_IMPORTED_MODULE_45__=__webpack_require__(/*! ./audio/AudioContext */"./src/audio/AudioContext.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"AudioContext",function(){return _audio_AudioContext__WEBPACK_IMPORTED_MODULE_45__["AudioContextWrapper"]});
/* harmony import */var _audio_AudioAnalyser__WEBPACK_IMPORTED_MODULE_46__=__webpack_require__(/*! ./audio/AudioAnalyser */"./src/audio/AudioAnalyser.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"AudioAnalyser",function(){return _audio_AudioAnalyser__WEBPACK_IMPORTED_MODULE_46__["AudioAnalyserWrapper"]});
/* harmony import */var _audio_Audio__WEBPACK_IMPORTED_MODULE_47__=__webpack_require__(/*! ./audio/Audio */"./src/audio/Audio.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Audio",function(){return _audio_Audio__WEBPACK_IMPORTED_MODULE_47__["AudioWrapper"]});
/* harmony import */var _core_InstancedBufferGeometry__WEBPACK_IMPORTED_MODULE_48__=__webpack_require__(/*! ./core/InstancedBufferGeometry */"./src/core/InstancedBufferGeometry.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"InstancedBufferGeometry",function(){return _core_InstancedBufferGeometry__WEBPACK_IMPORTED_MODULE_48__["InstancedBufferGeometry"]});
/* harmony import */var _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_49__=__webpack_require__(/*! ./core/BufferGeometry */"./src/core/BufferGeometry.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"BufferGeometry",function(){return _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_49__["BufferGeometry"]});
/* harmony import */var _core_Geometry__WEBPACK_IMPORTED_MODULE_50__=__webpack_require__(/*! ./core/Geometry */"./src/core/Geometry.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Geometry",function(){return _core_Geometry__WEBPACK_IMPORTED_MODULE_50__["Geometry"]});
/* harmony import */var _core_InterleavedBufferAttribute__WEBPACK_IMPORTED_MODULE_51__=__webpack_require__(/*! ./core/InterleavedBufferAttribute */"./src/core/InterleavedBufferAttribute.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"InterleavedBufferAttribute",function(){return _core_InterleavedBufferAttribute__WEBPACK_IMPORTED_MODULE_51__["InterleavedBufferAttribute"]});
/* harmony import */var _core_InstancedInterleavedBufferAttribute__WEBPACK_IMPORTED_MODULE_52__=__webpack_require__(/*! ./core/InstancedInterleavedBufferAttribute */"./src/core/InstancedInterleavedBufferAttribute.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"InstancedInterleavedBufferAttribute",function(){return _core_InstancedInterleavedBufferAttribute__WEBPACK_IMPORTED_MODULE_52__["InstancedInterleavedBufferAttribute"]});
/* harmony import */var _core_InstancedBufferAttribute__WEBPACK_IMPORTED_MODULE_53__=__webpack_require__(/*! ./core/InstancedBufferAttribute */"./src/core/InstancedBufferAttribute.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"InstancedBufferAttribute",function(){return _core_InstancedBufferAttribute__WEBPACK_IMPORTED_MODULE_53__["InstancedBufferAttribute"]});
/* harmony import */var _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_54__=__webpack_require__(/*! ./core/BufferAttribute */"./src/core/BufferAttribute.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"BufferAttribute",function(){return _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_54__["BufferAttribute"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Int8BufferAttribute",function(){return _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_54__["Int8BufferAttribute"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Uint8BufferAttribute",function(){return _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_54__["Uint8BufferAttribute"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Uint8ClampedBufferAttribute",function(){return _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_54__["Uint8ClampedBufferAttribute"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Int16BufferAttribute",function(){return _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_54__["Int16BufferAttribute"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Uint16BufferAttribute",function(){return _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_54__["Uint16BufferAttribute"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Int32BufferAttribute",function(){return _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_54__["Int32BufferAttribute"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Uint32BufferAttribute",function(){return _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_54__["Uint32BufferAttribute"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Float32BufferAttribute",function(){return _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_54__["Float32BufferAttribute"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Float64BufferAttribute",function(){return _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_54__["Float64BufferAttribute"]});
/* harmony import */var _core_Face3__WEBPACK_IMPORTED_MODULE_55__=__webpack_require__(/*! ./core/Face3 */"./src/core/Face3.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Face3",function(){return _core_Face3__WEBPACK_IMPORTED_MODULE_55__["Face3"]});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_56__=__webpack_require__(/*! ./core/Object3D */"./src/core/Object3D.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Object3D",function(){return _core_Object3D__WEBPACK_IMPORTED_MODULE_56__["Object3D"]});
/* harmony import */var _core_Raycaster__WEBPACK_IMPORTED_MODULE_57__=__webpack_require__(/*! ./core/Raycaster */"./src/core/Raycaster.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Raycaster",function(){return _core_Raycaster__WEBPACK_IMPORTED_MODULE_57__["Raycaster"]});
/* harmony import */var _core_Layers__WEBPACK_IMPORTED_MODULE_58__=__webpack_require__(/*! ./core/Layers */"./src/core/Layers.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Layers",function(){return _core_Layers__WEBPACK_IMPORTED_MODULE_58__["Layers"]});
/* harmony import */var _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_59__=__webpack_require__(/*! ./core/EventDispatcher */"./src/core/EventDispatcher.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"EventDispatcher",function(){return _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_59__["EventDispatcher"]});
/* harmony import */var _core_Clock__WEBPACK_IMPORTED_MODULE_60__=__webpack_require__(/*! ./core/Clock */"./src/core/Clock.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Clock",function(){return _core_Clock__WEBPACK_IMPORTED_MODULE_60__["Clock"]});
/* harmony import */var _math_Triangle__WEBPACK_IMPORTED_MODULE_61__=__webpack_require__(/*! ./math/Triangle */"./src/math/Triangle.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Triangle",function(){return _math_Triangle__WEBPACK_IMPORTED_MODULE_61__["Triangle"]});
/* harmony import */var _math_Math__WEBPACK_IMPORTED_MODULE_62__=__webpack_require__(/*! ./math/Math */"./src/math/Math.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Math",function(){return _math_Math__WEBPACK_IMPORTED_MODULE_62__["MathUtil"]});
/* harmony import */var _math_Plane__WEBPACK_IMPORTED_MODULE_63__=__webpack_require__(/*! ./math/Plane */"./src/math/Plane.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Plane",function(){return _math_Plane__WEBPACK_IMPORTED_MODULE_63__["Plane"]});
/* harmony import */var _math_Frustum__WEBPACK_IMPORTED_MODULE_64__=__webpack_require__(/*! ./math/Frustum */"./src/math/Frustum.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Frustum",function(){return _math_Frustum__WEBPACK_IMPORTED_MODULE_64__["Frustum"]});
/* harmony import */var _math_Sphere__WEBPACK_IMPORTED_MODULE_65__=__webpack_require__(/*! ./math/Sphere */"./src/math/Sphere.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Sphere",function(){return _math_Sphere__WEBPACK_IMPORTED_MODULE_65__["Sphere"]});
/* harmony import */var _math_Ray__WEBPACK_IMPORTED_MODULE_66__=__webpack_require__(/*! ./math/Ray */"./src/math/Ray.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Ray",function(){return _math_Ray__WEBPACK_IMPORTED_MODULE_66__["Ray"]});
/* harmony import */var _math_Matrix2__WEBPACK_IMPORTED_MODULE_67__=__webpack_require__(/*! ./math/Matrix2 */"./src/math/Matrix2.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Matrix2",function(){return _math_Matrix2__WEBPACK_IMPORTED_MODULE_67__["Matrix2"]});
/* harmony import */var _math_Matrix3__WEBPACK_IMPORTED_MODULE_68__=__webpack_require__(/*! ./math/Matrix3 */"./src/math/Matrix3.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Matrix3",function(){return _math_Matrix3__WEBPACK_IMPORTED_MODULE_68__["Matrix3"]});
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_69__=__webpack_require__(/*! ./math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Matrix4",function(){return _math_Matrix4__WEBPACK_IMPORTED_MODULE_69__["Matrix4"]});
/* harmony import */var _math_Box3__WEBPACK_IMPORTED_MODULE_70__=__webpack_require__(/*! ./math/Box3 */"./src/math/Box3.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Box3",function(){return _math_Box3__WEBPACK_IMPORTED_MODULE_70__["Box3"]});
/* harmony import */var _math_Line3__WEBPACK_IMPORTED_MODULE_71__=__webpack_require__(/*! ./math/Line3 */"./src/math/Line3.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Line3",function(){return _math_Line3__WEBPACK_IMPORTED_MODULE_71__["Line3"]});
/* harmony import */var _math_Euler__WEBPACK_IMPORTED_MODULE_72__=__webpack_require__(/*! ./math/Euler */"./src/math/Euler.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Euler",function(){return _math_Euler__WEBPACK_IMPORTED_MODULE_72__["Euler"]});
/* harmony import */var _math_Vector4__WEBPACK_IMPORTED_MODULE_73__=__webpack_require__(/*! ./math/Vector4 */"./src/math/Vector4.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Vector4",function(){return _math_Vector4__WEBPACK_IMPORTED_MODULE_73__["Vector4"]});
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_74__=__webpack_require__(/*! ./math/Vector3 */"./src/math/Vector3.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Vector3",function(){return _math_Vector3__WEBPACK_IMPORTED_MODULE_74__["Vector3"]});
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_75__=__webpack_require__(/*! ./math/Vector2 */"./src/math/Vector2.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Vector2",function(){return _math_Vector2__WEBPACK_IMPORTED_MODULE_75__["Vector2"]});
/* harmony import */var _math_Quaternion__WEBPACK_IMPORTED_MODULE_76__=__webpack_require__(/*! ./math/Quaternion */"./src/math/Quaternion.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Quaternion",function(){return _math_Quaternion__WEBPACK_IMPORTED_MODULE_76__["Quaternion"]});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_77__=__webpack_require__(/*! ./math/Color */"./src/math/Color.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Color",function(){return _math_Color__WEBPACK_IMPORTED_MODULE_77__["Color"]});
/* harmony import */var _renderers_webgl_WebGLUtils__WEBPACK_IMPORTED_MODULE_78__=__webpack_require__(/*! ./renderers/webgl/WebGLUtils */"./src/renderers/webgl/WebGLUtils.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"WebGLUtils",function(){return _renderers_webgl_WebGLUtils__WEBPACK_IMPORTED_MODULE_78__["WebGLUtils"]});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_79__=__webpack_require__(/*! ./constants */"./src/constants.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"REVISION",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["REVISION"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MOUSE",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["MOUSE"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CullFaceNone",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["CullFaceNone"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CullFaceBack",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["CullFaceBack"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CullFaceFront",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["CullFaceFront"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CullFaceFrontBack",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["CullFaceFrontBack"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"FrontFaceDirectionCW",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["FrontFaceDirectionCW"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"FrontFaceDirectionCCW",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["FrontFaceDirectionCCW"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"BasicShadowMap",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["BasicShadowMap"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"PCFShadowMap",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["PCFShadowMap"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"PCFSoftShadowMap",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["PCFSoftShadowMap"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"FrontSide",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["FrontSide"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"BackSide",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["BackSide"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"DoubleSide",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["DoubleSide"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"FlatShading",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["FlatShading"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SmoothShading",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["SmoothShading"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"NoColors",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["NoColors"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"FaceColors",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["FaceColors"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"VertexColors",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["VertexColors"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"NoBlending",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["NoBlending"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"NormalBlending",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["NormalBlending"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"AdditiveBlending",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["AdditiveBlending"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SubtractiveBlending",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["SubtractiveBlending"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MultiplyBlending",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["MultiplyBlending"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CustomBlending",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["CustomBlending"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"AddEquation",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["AddEquation"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SubtractEquation",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["SubtractEquation"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ReverseSubtractEquation",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["ReverseSubtractEquation"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MinEquation",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["MinEquation"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MaxEquation",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["MaxEquation"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ZeroFactor",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["ZeroFactor"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"OneFactor",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["OneFactor"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SrcColorFactor",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["SrcColorFactor"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"OneMinusSrcColorFactor",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["OneMinusSrcColorFactor"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SrcAlphaFactor",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["SrcAlphaFactor"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"OneMinusSrcAlphaFactor",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["OneMinusSrcAlphaFactor"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"DstAlphaFactor",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["DstAlphaFactor"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"OneMinusDstAlphaFactor",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["OneMinusDstAlphaFactor"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"DstColorFactor",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["DstColorFactor"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"OneMinusDstColorFactor",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["OneMinusDstColorFactor"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SrcAlphaSaturateFactor",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["SrcAlphaSaturateFactor"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"NeverDepth",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["NeverDepth"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"AlwaysDepth",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["AlwaysDepth"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LessDepth",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LessDepth"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LessEqualDepth",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LessEqualDepth"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"EqualDepth",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["EqualDepth"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"GreaterEqualDepth",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["GreaterEqualDepth"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"GreaterDepth",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["GreaterDepth"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"NotEqualDepth",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["NotEqualDepth"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MultiplyOperation",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["MultiplyOperation"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MixOperation",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["MixOperation"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"AddOperation",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["AddOperation"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"NoToneMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["NoToneMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LinearToneMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LinearToneMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ReinhardToneMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["ReinhardToneMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Uncharted2ToneMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["Uncharted2ToneMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CineonToneMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["CineonToneMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"UVMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["UVMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CubeReflectionMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["CubeReflectionMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CubeRefractionMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["CubeRefractionMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"EquirectangularReflectionMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["EquirectangularReflectionMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"EquirectangularRefractionMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["EquirectangularRefractionMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SphericalReflectionMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["SphericalReflectionMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CubeUVReflectionMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["CubeUVReflectionMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CubeUVRefractionMapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["CubeUVRefractionMapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RepeatWrapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RepeatWrapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ClampToEdgeWrapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["ClampToEdgeWrapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MirroredRepeatWrapping",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["MirroredRepeatWrapping"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"NearestFilter",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["NearestFilter"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"NearestMipMapNearestFilter",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["NearestMipMapNearestFilter"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"NearestMipMapLinearFilter",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["NearestMipMapLinearFilter"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LinearFilter",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LinearFilter"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LinearMipMapNearestFilter",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LinearMipMapNearestFilter"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LinearMipMapLinearFilter",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LinearMipMapLinearFilter"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"UnsignedByteType",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["UnsignedByteType"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ByteType",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["ByteType"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ShortType",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["ShortType"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"UnsignedShortType",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["UnsignedShortType"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"IntType",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["IntType"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"UnsignedIntType",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["UnsignedIntType"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"FloatType",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["FloatType"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"HalfFloatType",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["HalfFloatType"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"UnsignedShort4444Type",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["UnsignedShort4444Type"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"UnsignedShort5551Type",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["UnsignedShort5551Type"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"UnsignedShort565Type",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["UnsignedShort565Type"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"UnsignedInt248Type",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["UnsignedInt248Type"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"AlphaFormat",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["AlphaFormat"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBFormat",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBFormat"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBAFormat",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBAFormat"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LuminanceFormat",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LuminanceFormat"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LuminanceAlphaFormat",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LuminanceAlphaFormat"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBEFormat",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBEFormat"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"DepthFormat",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["DepthFormat"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"DepthStencilFormat",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["DepthStencilFormat"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGB_S3TC_DXT1_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGB_S3TC_DXT1_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_S3TC_DXT1_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_S3TC_DXT1_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_S3TC_DXT3_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_S3TC_DXT3_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_S3TC_DXT5_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_S3TC_DXT5_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGB_PVRTC_4BPPV1_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGB_PVRTC_4BPPV1_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGB_PVRTC_2BPPV1_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGB_PVRTC_2BPPV1_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_PVRTC_4BPPV1_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_PVRTC_4BPPV1_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_PVRTC_2BPPV1_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_PVRTC_2BPPV1_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGB_ETC1_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGB_ETC1_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_4x4_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_4x4_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_5x4_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_5x4_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_5x5_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_5x5_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_6x5_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_6x5_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_6x6_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_6x6_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_8x5_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_8x5_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_8x6_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_8x6_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_8x8_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_8x8_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_10x5_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_10x5_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_10x6_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_10x6_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_10x8_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_10x8_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_10x10_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_10x10_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_12x10_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_12x10_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_12x12_Format",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBA_ASTC_12x12_Format"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LoopOnce",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LoopOnce"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LoopRepeat",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LoopRepeat"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LoopPingPong",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LoopPingPong"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"InterpolateDiscrete",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["InterpolateDiscrete"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"InterpolateLinear",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["InterpolateLinear"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"InterpolateSmooth",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["InterpolateSmooth"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ZeroCurvatureEnding",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["ZeroCurvatureEnding"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ZeroSlopeEnding",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["ZeroSlopeEnding"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"WrapAroundEnding",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["WrapAroundEnding"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"TrianglesDrawMode",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["TrianglesDrawMode"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"TriangleStripDrawMode",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["TriangleStripDrawMode"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"TriangleFanDrawMode",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["TriangleFanDrawMode"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LinearEncoding",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LinearEncoding"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"sRGBEncoding",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["sRGBEncoding"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"GammaEncoding",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["GammaEncoding"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBEEncoding",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBEEncoding"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LogLuvEncoding",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["LogLuvEncoding"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBM7Encoding",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBM7Encoding"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBM16Encoding",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBM16Encoding"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBDEncoding",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBDEncoding"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"BasicDepthPacking",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["BasicDepthPacking"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"RGBADepthPacking",function(){return _constants__WEBPACK_IMPORTED_MODULE_79__["RGBADepthPacking"]});
// export { WebGL2Renderer } from './renderers/WebGL2Renderer';
/*
export { CompressedTextureLoader } from './loaders/CompressedTextureLoader';
export { DataTextureLoader } from './loaders/DataTextureLoader';
export { CubeTextureLoader } from './loaders/CubeTextureLoader';
export { TextureLoader } from './loaders/TextureLoader';
export { ObjectLoader } from './loaders/ObjectLoader';
export { MaterialLoader } from './loaders/MaterialLoader';
export { BufferGeometryLoader } from './loaders/BufferGeometryLoader';
export { DefaultLoadingManager, LoadingManager } from './loaders/LoadingManager';
export { JSONLoader } from './loaders/JSONLoader';
export { ImageLoader } from './loaders/ImageLoader';
export { ImageBitmapLoader } from './loaders/ImageBitmapLoader';
export { FontLoader } from './loaders/FontLoader';
export { FileLoader } from './loaders/FileLoader';
export { Loader } from './loaders/Loader';
export { LoaderUtils } from './loaders/LoaderUtils';
export { Cache } from './loaders/Cache';
export { AudioLoader } from './loaders/AudioLoader';
*/
//export { StereoCamera } from './cameras/StereoCamera';
//export { CubeCamera } from './cameras/CubeCamera';
//export { ArrayCamera } from './cameras/ArrayCamera';
/*
export { VectorKeyframeTrack } from './animation/tracks/VectorKeyframeTrack';
export { StringKeyframeTrack } from './animation/tracks/StringKeyframeTrack';
export { QuaternionKeyframeTrack } from './animation/tracks/QuaternionKeyframeTrack';
export { NumberKeyframeTrack } from './animation/tracks/NumberKeyframeTrack';
export { ColorKeyframeTrack } from './animation/tracks/ColorKeyframeTrack';
export { BooleanKeyframeTrack } from './animation/tracks/BooleanKeyframeTrack';
export { PropertyMixer } from './animation/PropertyMixer';
export { PropertyBinding } from './animation/PropertyBinding';
export { KeyframeTrack } from './animation/KeyframeTrack';
export { AnimationUtils } from './animation/AnimationUtils';
export { AnimationObjectGroup } from './animation/AnimationObjectGroup';
export { AnimationMixer } from './animation/AnimationMixer';
export { AnimationClip } from './animation/AnimationClip';
*/
/*
export { QuaternionLinearInterpolant } from './math/interpolants/QuaternionLinearInterpolant';
export { LinearInterpolant } from './math/interpolants/LinearInterpolant';
export { DiscreteInterpolant } from './math/interpolants/DiscreteInterpolant';
export { CubicInterpolant } from './math/interpolants/CubicInterpolant';
export { Interpolant } from './math/Interpolant';
*/
//export { Spherical } from './math/Spherical';
//export { Cylindrical } from './math/Cylindrical';
//export { Box2 } from './math/Box2';
/*
export { ImmediateRenderObject } from './extras/objects/ImmediateRenderObject';
export { VertexNormalsHelper } from './helpers/VertexNormalsHelper';
export { SpotLightHelper } from './helpers/SpotLightHelper';
export { SkeletonHelper } from './helpers/SkeletonHelper';
export { PointLightHelper } from './helpers/PointLightHelper';
export { RectAreaLightHelper } from './helpers/RectAreaLightHelper';
export { HemisphereLightHelper } from './helpers/HemisphereLightHelper';
export { GridHelper } from './helpers/GridHelper';
export { PolarGridHelper } from './helpers/PolarGridHelper';
export { FaceNormalsHelper } from './helpers/FaceNormalsHelper';
export { DirectionalLightHelper } from './helpers/DirectionalLightHelper';
export { CameraHelper } from './helpers/CameraHelper';
export { BoxHelper } from './helpers/BoxHelper';
export { Box3Helper } from './helpers/Box3Helper';
export { PlaneHelper } from './helpers/PlaneHelper';
export { ArrowHelper } from './helpers/ArrowHelper';
export { AxesHelper } from './helpers/AxesHelper';
export * from './extras/curves/Curves';
export { Shape } from './extras/core/Shape';
export { Path } from './extras/core/Path';
export { ShapePath } from './extras/core/ShapePath';
export { Font } from './extras/core/Font';
export { CurvePath } from './extras/core/CurvePath';
export { Curve } from './extras/core/Curve';
export { ShapeUtils } from './extras/ShapeUtils';
*/
/***/},
/***/"./src/audio/Audio.ts":
/*!****************************!*\
  !*** ./src/audio/Audio.ts ***!
  \****************************/
/*! exports provided: AudioWrapper */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"AudioWrapper",function(){return AudioWrapper});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");class AudioWrapper extends _core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"]{constructor(listener){super();this.type="Audio";this.startTime=0;this.offset=0;this.isPlaying=false;this.hasPlaybackControl=true;this.sourceType="empty";this.autoplay=false;this.buffer=null;this.loop=false;this.playbackRate=1;this.filters=[];this.context=listener.context;this.gain=this.context.createGain();this.gain.connect(listener.getInput())}getOutput(){return this.gain}setNodeSource(audioNode){this.hasPlaybackControl=false;this.source=audioNode;this.sourceType="audioNode";this.connect();return this}setBuffer(audioBuffer){this.buffer=audioBuffer;this.sourceType="buffer";if(this.autoplay)this.play();return this}play(){if(this.isPlaying===true){console.warn(`THREE.Audio: Audio is already playing.`);return this}if(this.hasPlaybackControl===false){console.warn(`THREE.Audio: this Audio has no playback control.`);return this}const source=this.context.createBufferSource();source.buffer=this.buffer;source.loop=this.loop;source.onended=this.onEnded.bind(this);source.playbackRate.setValueAtTime(this.playbackRate,this.startTime);this.startTime=this.context.currentTime;source.start(this.startTime,this.offset);this.isPlaying=true;this.source=source;return this.connect()}pause(){if(this.hasPlaybackControl===false){console.warn(`THREE.Audio: this Audio has no playback control.`);return this}if(this.isPlaying===true){this.source.stop();this.offset+=(this.context.currentTime-this.startTime)*this.playbackRate;this.isPlaying=false}return this}stop(){if(this.hasPlaybackControl===false){console.warn(`THREE.Audio: this Audio has no playback control.`);return this}this.source.stop();this.offset=0;this.isPlaying=false;return this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let i=1,l=this.filters.length;i<l;i++){this.filters[i-1].connect(this.filters[i])}this.filters[this.filters.length-1].connect(this.getOutput())}else{this.source.connect(this.getOutput())}return this}disconnect(){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let i=1,l=this.filters.length;i<l;i++){this.filters[i-1].disconnect(this.filters[i])}this.filters[this.filters.length-1].disconnect(this.getOutput())}else{this.source.disconnect(this.getOutput())}return this}getFilters(){return this.filters}setFilters(value=[]){if(this.isPlaying===true){this.disconnect();this.filters=value;this.connect()}else{this.filters=value}return this}getFilter(){return this.getFilters()[0]}setFilter(filter){return this.setFilters(filter?[filter]:[])}setPlaybackRate(value){if(this.hasPlaybackControl===false){console.warn(`THREE.Audio: this Audio has no playback control.`);return this}this.playbackRate=value;if(this.isPlaying===true){this.source.playbackRate.setValueAtTime(this.playbackRate,this.context.currentTime)}return this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=false}getLoop(){if(this.hasPlaybackControl===false){console.warn(`THREE.Audio: this Audio has no playback control.`);return false}return this.loop}setLoop(value){if(this.hasPlaybackControl===false){console.warn(`THREE.Audio: this Audio has no playback control.`);return this}this.loop=value;if(this.isPlaying===true){this.source.loop=this.loop}return this}getVolume(){return this.gain.gain.value}setVolume(value){this.gain.gain.value=value;return this}}
/***/},
/***/"./src/audio/AudioAnalyser.ts":
/*!************************************!*\
  !*** ./src/audio/AudioAnalyser.ts ***!
  \************************************/
/*! exports provided: AudioAnalyserWrapper */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"AudioAnalyserWrapper",function(){return AudioAnalyserWrapper});class AudioAnalyserWrapper{constructor(audio,fftSize=2048){this.analyser=audio.context.createAnalyser();this.analyser.fftSize=fftSize;this.data=new Uint8Array(this.analyser.frequencyBinCount);audio.getOutput().connect(this.analyser)}getFrequencyData(){this.analyser.getByteFrequencyData(this.data);return this.data}getAverageFrequency(){let value=0;const data=this.getFrequencyData();for(let i=0;i<data.length;i++){value+=data[i]}return value/data.length}}
/***/},
/***/"./src/audio/AudioContext.ts":
/*!***********************************!*\
  !*** ./src/audio/AudioContext.ts ***!
  \***********************************/
/*! exports provided: AudioContextWrapper */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"AudioContextWrapper",function(){return AudioContextWrapper});class AudioContextWrapper{static getContext(){if(AudioContextWrapper.context===undefined){AudioContextWrapper.context=new(window.AudioContext||window.webkitAudioContext)}return AudioContextWrapper.context}static setContext(value){AudioContextWrapper.context=value}}AudioContextWrapper.context=undefined;
/***/},
/***/"./src/audio/AudioListener.ts":
/*!************************************!*\
  !*** ./src/audio/AudioListener.ts ***!
  \************************************/
/*! exports provided: AudioListenerWrapper */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"AudioListenerWrapper",function(){return AudioListenerWrapper});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");
/* harmony import */var _math_Quaternion__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Quaternion */"./src/math/Quaternion.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _AudioContext__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./AudioContext */"./src/audio/AudioContext.ts");class AudioListenerWrapper extends _core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"]{constructor(){super();this.type="AudioListener";this.context=_AudioContext__WEBPACK_IMPORTED_MODULE_3__["AudioContextWrapper"].getContext();this.filter=null;this.gain=this.context.createGain();this.gain.connect(this.context.destination)}getInput(){return this.gain}removeFilter(){if(this.filter!==null){this.gain.disconnect(this.filter);this.filter.disconnect(this.context.destination);this.gain.connect(this.context.destination);this.filter=null}}getFilter(){return this.filter}setFilter(value){if(this.filter!==null){this.gain.disconnect(this.filter);this.filter.disconnect(this.context.destination)}else{this.gain.disconnect(this.context.destination)}this.filter=value;this.gain.connect(this.filter);this.filter.connect(this.context.destination);return this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(value){this.gain.gain.value=value;return this}updateMatrixWorld(force=false){super.updateMatrixWorld(force);const position=new _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"];const quaternion=new _math_Quaternion__WEBPACK_IMPORTED_MODULE_1__["Quaternion"];const scale=new _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"];const orientation=new _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"];const listener=this.context.listener;const up=this.up;this.matrixWorld.decompose(position,quaternion,scale);orientation.set(0,0,-1).applyQuaternion(quaternion);if(listener.positionX){listener.positionX.setValueAtTime(position.x,this.context.currentTime);listener.positionY.setValueAtTime(position.y,this.context.currentTime);listener.positionZ.setValueAtTime(position.z,this.context.currentTime);listener.forwardX.setValueAtTime(orientation.x,this.context.currentTime);listener.forwardY.setValueAtTime(orientation.y,this.context.currentTime);listener.forwardZ.setValueAtTime(orientation.z,this.context.currentTime);listener.upX.setValueAtTime(up.x,this.context.currentTime);listener.upY.setValueAtTime(up.y,this.context.currentTime);listener.upZ.setValueAtTime(up.z,this.context.currentTime)}else{listener.setPosition(position.x,position.y,position.z);listener.setOrientation(orientation.x,orientation.y,orientation.z,up.x,up.y,up.z)}return this}}
/***/},
/***/"./src/audio/PositionalAudio.ts":
/*!**************************************!*\
  !*** ./src/audio/PositionalAudio.ts ***!
  \**************************************/
/*! exports provided: PositionalAudio */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"PositionalAudio",function(){return PositionalAudio});
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _Audio__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Audio */"./src/audio/Audio.ts");class PositionalAudio extends _Audio__WEBPACK_IMPORTED_MODULE_1__["AudioWrapper"]{constructor(listener){super(listener);this.panner=this.context.createPanner();this.panner.connect(this.gain)}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(value){this.panner.refDistance=value}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(value){this.panner.rolloffFactor=value}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(value){this.panner.distanceModel=value}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(value){this.panner.maxDistance=value}updateMatrixWorld(force=false){super.updateMatrixWorld(force);const position=new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"];position.setFromMatrixPosition(this.matrixWorld);this.panner.setPosition(position.x,position.y,position.z);return this}}
/***/},
/***/"./src/cameras/Camera.ts":
/*!*******************************!*\
  !*** ./src/cameras/Camera.ts ***!
  \*******************************/
/*! exports provided: Camera */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Camera",function(){return Camera});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");class Camera extends _core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"]{constructor(){super();this.type="Camera";this.matrixWorldInverse=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_1__["Matrix4"];this.projectionMatrix=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]}updateMatrixWorld(force=false){super.updateMatrixWorld(force);this.matrixWorldInverse.getInverse(this.matrixWorld);return this}copy(source,recursive=true){super.copy(source,recursive);this.matrixWorldInverse.copy(source.matrixWorldInverse);this.projectionMatrix.copy(source.projectionMatrix);return this}get worldDirection(){return(new _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).set(0,0,-1).applyQuaternion(this.worldQuaternion)}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/cameras/OrthographicCamera.ts":
/*!*******************************************!*\
  !*** ./src/cameras/OrthographicCamera.ts ***!
  \*******************************************/
/*! exports provided: OrthographicCamera */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"OrthographicCamera",function(){return OrthographicCamera});
/* harmony import */var _Camera__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Camera */"./src/cameras/Camera.ts");class OrthographicCamera extends _Camera__WEBPACK_IMPORTED_MODULE_0__["Camera"]{constructor(left=0,right=0,top=0,bottom=0,near=.1,far=2e3){super();this.type="OrthographicCamera";this._left=0;this._right=0;this._top=0;this._bottom=0;this._zoom=1;this._near=.1;this._far=2e3;this._view=null;this._left=left;this._right=right;this._top=top;this._bottom=bottom;this._near=near;this._far=far;this.updateProjectionMatrix()}get zoom(){return this._zoom}set zoom(_zoom){this._zoom=_zoom;this.updateProjectionMatrix()}get near(){return this._near}set near(_near){this._near=_near;this.updateProjectionMatrix()}get far(){return this._far}set far(_far){this._far=_far;this.updateProjectionMatrix()}get left(){return this._left}set left(_left){this._left=_left;this.updateProjectionMatrix()}get right(){return this._right}set right(_right){this._right=_right;this.updateProjectionMatrix()}get top(){return this._top}set top(_top){this._top=_top;this.updateProjectionMatrix()}get bottom(){return this._bottom}set bottom(_bottom){this._bottom=_bottom;this.updateProjectionMatrix()}get view(){return this._view}setViewOffset(fullWidth,fullHeight,x,y,width,height){this._view={enabled:true,fullHeight:fullHeight,fullWidth:fullWidth,height:height,offsetX:x,offsetY:y,width:width};return this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null){this.view.enabled=false}return this.updateProjectionMatrix()}updateProjectionMatrix(){const dx=(this.right-this.left)/(2*this.zoom);const dy=(this.top-this.bottom)/(2*this.zoom);const cx=(this.right+this.left)/2;const cy=(this.top+this.bottom)/2;let left=cx-dx;let right=cx+dx;let top=cy+dy;let bottom=cy-dy;if(this.view!==null&&this.view.enabled){const zoomW=this.zoom/(this.view.width/this.view.fullWidth);const zoomH=this.zoom/(this.view.height/this.view.fullHeight);const scaleW=(this.right-this.left)/this._view.width;const scaleH=(this.top-this.bottom)/this._view.height;left+=scaleW*(this.view.offsetX/zoomW);right=left+scaleW*(this.view.width/zoomW);top-=scaleH*(this.view.offsetY/zoomH);bottom=top-scaleH*(this.view.height/zoomH)}this.projectionMatrix.makeOrthographic(left,right,top,bottom,this.near,this.far);return this}copy(source){super.copy(source);this._top=source.top;this._bottom=source.bottom;this._left=source.left;this._right=source.right;this._zoom=source.zoom;this._near=source.near;this._far=source.far;this._view=source.view===null?null:Object.assign({},source.view);return this.updateProjectionMatrix()}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/cameras/PerspectiveCamera.ts":
/*!******************************************!*\
  !*** ./src/cameras/PerspectiveCamera.ts ***!
  \******************************************/
/*! exports provided: PerspectiveCamera */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"PerspectiveCamera",function(){return PerspectiveCamera});
/* harmony import */var _math_Math__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Math */"./src/math/Math.ts");
/* harmony import */var _Camera__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Camera */"./src/cameras/Camera.ts");class PerspectiveCamera extends _Camera__WEBPACK_IMPORTED_MODULE_1__["Camera"]{constructor(fov=50,aspect=1,near=.1,far=2e3){super();this.type="PerspectiveCamera";this.focus=10;this._fov=50;this._zoom=1;this._near=.1;this._far=2e3;this._aspect=1;this._view=null;
/**
         * width of the film (default in millimeters)
         * @type {number}
         */this._filmGauge=35;
/**
         * horizontal film offset (same unit as gauge)
         * @type {number}
         */this._filmOffset=0;this._fov=fov;this._aspect=aspect;this._near=near;this._far=far;this.updateProjectionMatrix()}get fov(){return this._fov}set fov(_fov){this._fov=_fov;this.updateProjectionMatrix()}get zoom(){return this._zoom}set zoom(_zoom){this._zoom=_zoom;this.updateProjectionMatrix()}get near(){return this._near}set near(_near){this._near=_near;this.updateProjectionMatrix()}get far(){return this._far}set far(_far){this._far=_far;this.updateProjectionMatrix()}get aspect(){return this._aspect}set aspect(_aspect){this._aspect=_aspect;this.updateProjectionMatrix()}get view(){return this._view}get filmGauge(){return this._filmGauge}set filmGauge(_filmGauge){this._filmGauge=_filmGauge;this.updateProjectionMatrix()}get filmOffset(){return this._filmOffset}set filmOffset(_filmOffset){this._filmOffset=_filmOffset;this.updateProjectionMatrix()}
/**
     * see http://www.bobatkins.com/photography/technical/field_of_view.html
     * Sets the FOV by focal length in respect to the current .filmGauge.
     *
     * The default film gauge is 35, so that the focal length can be specified for
     * a 35mm (full frame) camera.
     *
     * Values for focal length and film gauge must have the same unit.
     * @param focalLength
     * @returns {PerspectiveCamera}
     */setFocalLength(focalLength){const vExtentSlope=.5*this.getFilmHeight()/focalLength;this._fov=_math_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].RAD2DEG*2*Math.atan(vExtentSlope);return this.updateProjectionMatrix()}getFocalLength(){const vExtentSlope=Math.tan(_math_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].DEG2RAD*.5*this.fov);return.5*this.getFilmHeight()/vExtentSlope}getEffectiveFOV(){return _math_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].RAD2DEG*2*Math.atan(Math.tan(_math_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].DEG2RAD*.5*this.fov)/this.zoom)}
/**
     * film not completely covered in portrait format (aspect < 1)
     * @returns {number}
     */getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}
/**
     * film not completely covered in landscape format (aspect > 1)
     * @returns {number}
     */getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}
/**
     * Sets an offset in a larger frustum. This is useful for multi-window or
     * multi-monitor/multi-machine setups.
     *
     * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
     * the monitors are in grid like this
     *
     *   +---+---+---+
     *   | A | B | C |
     *   +---+---+---+
     *   | D | E | F |
     *   +---+---+---+
     *
     * then for each monitor you would call it like this
     *
     *   var w = 1920;
     *   var h = 1080;
     *   var fullWidth = w * 3;
     *   var fullHeight = h * 2;
     *
     *   --A--
     *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
     *   --B--
     *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
     *   --C--
     *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
     *   --D--
     *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
     *   --E--
     *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
     *   --F--
     *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
     *
     *   Note there is no reason monitors have to be the same size or in a grid.
     */setViewOffset(fullWidth,fullHeight,x,y,width,height){this._view={enabled:true,fullHeight:fullHeight,fullWidth:fullWidth,height:height,offsetX:x,offsetY:y,width:width};return this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null){this.view.enabled=false}return this.updateProjectionMatrix()}updateProjectionMatrix(){const near=this.near;let top=near*Math.tan(_math_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].DEG2RAD*.5*this.fov)/this.zoom;let height=2*top;let width=this.aspect*height;let left=-.5*width;const view=this.view;if(this.view!==null&&this.view.enabled){const fullWidth=view.fullWidth,fullHeight=view.fullHeight;left+=view.offsetX*width/fullWidth;top-=view.offsetY*height/fullHeight;width*=view.width/fullWidth;height*=view.height/fullHeight}const skew=this.filmOffset;if(skew!==0)left+=near*skew/this.getFilmWidth();this.projectionMatrix.makePerspective(left,left+width,top,top-height,near,this.far);return this}copy(source){super.copy(source);this._fov=source.fov;this._zoom=source.zoom;this._near=source.near;this._far=source.far;this.focus=source.focus;this._aspect=source.aspect;this._view=source.view===null?null:Object.assign({},source.view);this._filmGauge=source.filmGauge;this._filmOffset=source.filmOffset;return this.updateProjectionMatrix()}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! exports provided: REVISION, MOUSE, CullFaceNone, CullFaceBack, CullFaceFront, CullFaceFrontBack, FrontFaceDirectionCW, FrontFaceDirectionCCW, BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, FrontSide, BackSide, DoubleSide, FlatShading, SmoothShading, NoColors, FaceColors, VertexColors, NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending, AddEquation, SubtractEquation, ReverseSubtractEquation, MinEquation, MaxEquation, ZeroFactor, OneFactor, SrcColorFactor, OneMinusSrcColorFactor, SrcAlphaFactor, OneMinusSrcAlphaFactor, DstAlphaFactor, OneMinusDstAlphaFactor, DstColorFactor, OneMinusDstColorFactor, SrcAlphaSaturateFactor, NeverDepth, AlwaysDepth, LessDepth, LessEqualDepth, EqualDepth, GreaterEqualDepth, GreaterDepth, NotEqualDepth, MultiplyOperation, MixOperation, AddOperation, NoToneMapping, LinearToneMapping, ReinhardToneMapping, Uncharted2ToneMapping, CineonToneMapping, UVMapping, CubeReflectionMapping, CubeRefractionMapping, EquirectangularReflectionMapping, EquirectangularRefractionMapping, SphericalReflectionMapping, CubeUVReflectionMapping, CubeUVRefractionMapping, RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, NearestFilter, NearestMipMapNearestFilter, NearestMipMapLinearFilter, LinearFilter, LinearMipMapNearestFilter, LinearMipMapLinearFilter, UnsignedByteType, ByteType, ShortType, UnsignedShortType, IntType, UnsignedIntType, FloatType, HalfFloatType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShort565Type, UnsignedInt248Type, AlphaFormat, RGBFormat, RGBAFormat, LuminanceFormat, LuminanceAlphaFormat, RGBEFormat, DepthFormat, DepthStencilFormat, RGB_S3TC_DXT1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGB_PVRTC_4BPPV1_Format, RGB_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_PVRTC_2BPPV1_Format, RGB_ETC1_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_10x10_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, LoopOnce, LoopRepeat, LoopPingPong, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, ZeroCurvatureEnding, ZeroSlopeEnding, WrapAroundEnding, TrianglesDrawMode, TriangleStripDrawMode, TriangleFanDrawMode, LinearEncoding, sRGBEncoding, GammaEncoding, RGBEEncoding, LogLuvEncoding, RGBM7Encoding, RGBM16Encoding, RGBDEncoding, BasicDepthPacking, RGBADepthPacking */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"REVISION",function(){return REVISION});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MOUSE",function(){return MOUSE});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CullFaceNone",function(){return CullFaceNone});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CullFaceBack",function(){return CullFaceBack});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CullFaceFront",function(){return CullFaceFront});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CullFaceFrontBack",function(){return CullFaceFrontBack});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"FrontFaceDirectionCW",function(){return FrontFaceDirectionCW});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"FrontFaceDirectionCCW",function(){return FrontFaceDirectionCCW});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"BasicShadowMap",function(){return BasicShadowMap});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"PCFShadowMap",function(){return PCFShadowMap});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"PCFSoftShadowMap",function(){return PCFSoftShadowMap});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"FrontSide",function(){return FrontSide});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"BackSide",function(){return BackSide});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"DoubleSide",function(){return DoubleSide});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"FlatShading",function(){return FlatShading});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SmoothShading",function(){return SmoothShading});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"NoColors",function(){return NoColors});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"FaceColors",function(){return FaceColors});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"VertexColors",function(){return VertexColors});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"NoBlending",function(){return NoBlending});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"NormalBlending",function(){return NormalBlending});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"AdditiveBlending",function(){return AdditiveBlending});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SubtractiveBlending",function(){return SubtractiveBlending});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MultiplyBlending",function(){return MultiplyBlending});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CustomBlending",function(){return CustomBlending});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"AddEquation",function(){return AddEquation});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SubtractEquation",function(){return SubtractEquation});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ReverseSubtractEquation",function(){return ReverseSubtractEquation});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MinEquation",function(){return MinEquation});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MaxEquation",function(){return MaxEquation});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ZeroFactor",function(){return ZeroFactor});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"OneFactor",function(){return OneFactor});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SrcColorFactor",function(){return SrcColorFactor});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"OneMinusSrcColorFactor",function(){return OneMinusSrcColorFactor});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SrcAlphaFactor",function(){return SrcAlphaFactor});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"OneMinusSrcAlphaFactor",function(){return OneMinusSrcAlphaFactor});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"DstAlphaFactor",function(){return DstAlphaFactor});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"OneMinusDstAlphaFactor",function(){return OneMinusDstAlphaFactor});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"DstColorFactor",function(){return DstColorFactor});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"OneMinusDstColorFactor",function(){return OneMinusDstColorFactor});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SrcAlphaSaturateFactor",function(){return SrcAlphaSaturateFactor});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"NeverDepth",function(){return NeverDepth});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"AlwaysDepth",function(){return AlwaysDepth});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LessDepth",function(){return LessDepth});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LessEqualDepth",function(){return LessEqualDepth});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"EqualDepth",function(){return EqualDepth});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"GreaterEqualDepth",function(){return GreaterEqualDepth});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"GreaterDepth",function(){return GreaterDepth});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"NotEqualDepth",function(){return NotEqualDepth});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MultiplyOperation",function(){return MultiplyOperation});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MixOperation",function(){return MixOperation});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"AddOperation",function(){return AddOperation});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"NoToneMapping",function(){return NoToneMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LinearToneMapping",function(){return LinearToneMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ReinhardToneMapping",function(){return ReinhardToneMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Uncharted2ToneMapping",function(){return Uncharted2ToneMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CineonToneMapping",function(){return CineonToneMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"UVMapping",function(){return UVMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CubeReflectionMapping",function(){return CubeReflectionMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CubeRefractionMapping",function(){return CubeRefractionMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"EquirectangularReflectionMapping",function(){return EquirectangularReflectionMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"EquirectangularRefractionMapping",function(){return EquirectangularRefractionMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SphericalReflectionMapping",function(){return SphericalReflectionMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CubeUVReflectionMapping",function(){return CubeUVReflectionMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CubeUVRefractionMapping",function(){return CubeUVRefractionMapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RepeatWrapping",function(){return RepeatWrapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ClampToEdgeWrapping",function(){return ClampToEdgeWrapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MirroredRepeatWrapping",function(){return MirroredRepeatWrapping});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"NearestFilter",function(){return NearestFilter});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"NearestMipMapNearestFilter",function(){return NearestMipMapNearestFilter});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"NearestMipMapLinearFilter",function(){return NearestMipMapLinearFilter});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LinearFilter",function(){return LinearFilter});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LinearMipMapNearestFilter",function(){return LinearMipMapNearestFilter});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LinearMipMapLinearFilter",function(){return LinearMipMapLinearFilter});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"UnsignedByteType",function(){return UnsignedByteType});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ByteType",function(){return ByteType});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ShortType",function(){return ShortType});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"UnsignedShortType",function(){return UnsignedShortType});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"IntType",function(){return IntType});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"UnsignedIntType",function(){return UnsignedIntType});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"FloatType",function(){return FloatType});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"HalfFloatType",function(){return HalfFloatType});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"UnsignedShort4444Type",function(){return UnsignedShort4444Type});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"UnsignedShort5551Type",function(){return UnsignedShort5551Type});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"UnsignedShort565Type",function(){return UnsignedShort565Type});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"UnsignedInt248Type",function(){return UnsignedInt248Type});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"AlphaFormat",function(){return AlphaFormat});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBFormat",function(){return RGBFormat});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBAFormat",function(){return RGBAFormat});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LuminanceFormat",function(){return LuminanceFormat});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LuminanceAlphaFormat",function(){return LuminanceAlphaFormat});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBEFormat",function(){return RGBEFormat});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"DepthFormat",function(){return DepthFormat});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"DepthStencilFormat",function(){return DepthStencilFormat});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGB_S3TC_DXT1_Format",function(){return RGB_S3TC_DXT1_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_S3TC_DXT1_Format",function(){return RGBA_S3TC_DXT1_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_S3TC_DXT3_Format",function(){return RGBA_S3TC_DXT3_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_S3TC_DXT5_Format",function(){return RGBA_S3TC_DXT5_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGB_PVRTC_4BPPV1_Format",function(){return RGB_PVRTC_4BPPV1_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGB_PVRTC_2BPPV1_Format",function(){return RGB_PVRTC_2BPPV1_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_PVRTC_4BPPV1_Format",function(){return RGBA_PVRTC_4BPPV1_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_PVRTC_2BPPV1_Format",function(){return RGBA_PVRTC_2BPPV1_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGB_ETC1_Format",function(){return RGB_ETC1_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_4x4_Format",function(){return RGBA_ASTC_4x4_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_5x4_Format",function(){return RGBA_ASTC_5x4_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_5x5_Format",function(){return RGBA_ASTC_5x5_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_6x5_Format",function(){return RGBA_ASTC_6x5_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_6x6_Format",function(){return RGBA_ASTC_6x6_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_8x5_Format",function(){return RGBA_ASTC_8x5_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_8x6_Format",function(){return RGBA_ASTC_8x6_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_8x8_Format",function(){return RGBA_ASTC_8x8_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_10x5_Format",function(){return RGBA_ASTC_10x5_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_10x6_Format",function(){return RGBA_ASTC_10x6_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_10x8_Format",function(){return RGBA_ASTC_10x8_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_10x10_Format",function(){return RGBA_ASTC_10x10_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_12x10_Format",function(){return RGBA_ASTC_12x10_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBA_ASTC_12x12_Format",function(){return RGBA_ASTC_12x12_Format});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LoopOnce",function(){return LoopOnce});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LoopRepeat",function(){return LoopRepeat});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LoopPingPong",function(){return LoopPingPong});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"InterpolateDiscrete",function(){return InterpolateDiscrete});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"InterpolateLinear",function(){return InterpolateLinear});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"InterpolateSmooth",function(){return InterpolateSmooth});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ZeroCurvatureEnding",function(){return ZeroCurvatureEnding});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ZeroSlopeEnding",function(){return ZeroSlopeEnding});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"WrapAroundEnding",function(){return WrapAroundEnding});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"TrianglesDrawMode",function(){return TrianglesDrawMode});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"TriangleStripDrawMode",function(){return TriangleStripDrawMode});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"TriangleFanDrawMode",function(){return TriangleFanDrawMode});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LinearEncoding",function(){return LinearEncoding});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"sRGBEncoding",function(){return sRGBEncoding});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"GammaEncoding",function(){return GammaEncoding});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBEEncoding",function(){return RGBEEncoding});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LogLuvEncoding",function(){return LogLuvEncoding});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBM7Encoding",function(){return RGBM7Encoding});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBM16Encoding",function(){return RGBM16Encoding});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBDEncoding",function(){return RGBDEncoding});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"BasicDepthPacking",function(){return BasicDepthPacking});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RGBADepthPacking",function(){return RGBADepthPacking});
/* tslint:disable */const REVISION="90dev";const MOUSE={LEFT:0,MIDDLE:1,RIGHT:2};const CullFaceNone=0;const CullFaceBack=1;const CullFaceFront=2;const CullFaceFrontBack=3;const FrontFaceDirectionCW=0;const FrontFaceDirectionCCW=1;const BasicShadowMap=0;const PCFShadowMap=1;const PCFSoftShadowMap=2;const FrontSide=0;const BackSide=1;const DoubleSide=2;const FlatShading=1;const SmoothShading=2;const NoColors=0;const FaceColors=1;const VertexColors=2;const NoBlending=0;const NormalBlending=1;const AdditiveBlending=2;const SubtractiveBlending=3;const MultiplyBlending=4;const CustomBlending=5;const AddEquation=100;const SubtractEquation=101;const ReverseSubtractEquation=102;const MinEquation=103;const MaxEquation=104;const ZeroFactor=200;const OneFactor=201;const SrcColorFactor=202;const OneMinusSrcColorFactor=203;const SrcAlphaFactor=204;const OneMinusSrcAlphaFactor=205;const DstAlphaFactor=206;const OneMinusDstAlphaFactor=207;const DstColorFactor=208;const OneMinusDstColorFactor=209;const SrcAlphaSaturateFactor=210;const NeverDepth=0;const AlwaysDepth=1;const LessDepth=2;const LessEqualDepth=3;const EqualDepth=4;const GreaterEqualDepth=5;const GreaterDepth=6;const NotEqualDepth=7;const MultiplyOperation=0;const MixOperation=1;const AddOperation=2;const NoToneMapping=0;const LinearToneMapping=1;const ReinhardToneMapping=2;const Uncharted2ToneMapping=3;const CineonToneMapping=4;const UVMapping=300;const CubeReflectionMapping=301;const CubeRefractionMapping=302;const EquirectangularReflectionMapping=303;const EquirectangularRefractionMapping=304;const SphericalReflectionMapping=305;const CubeUVReflectionMapping=306;const CubeUVRefractionMapping=307;const RepeatWrapping=1e3;const ClampToEdgeWrapping=1001;const MirroredRepeatWrapping=1002;const NearestFilter=1003;const NearestMipMapNearestFilter=1004;const NearestMipMapLinearFilter=1005;const LinearFilter=1006;const LinearMipMapNearestFilter=1007;const LinearMipMapLinearFilter=1008;const UnsignedByteType=1009;const ByteType=1010;const ShortType=1011;const UnsignedShortType=1012;const IntType=1013;const UnsignedIntType=1014;const FloatType=1015;const HalfFloatType=1016;const UnsignedShort4444Type=1017;const UnsignedShort5551Type=1018;const UnsignedShort565Type=1019;const UnsignedInt248Type=1020;const AlphaFormat=1021;const RGBFormat=1022;const RGBAFormat=1023;const LuminanceFormat=1024;const LuminanceAlphaFormat=1025;const RGBEFormat=RGBAFormat;const DepthFormat=1026;const DepthStencilFormat=1027;const RGB_S3TC_DXT1_Format=33776;const RGBA_S3TC_DXT1_Format=33777;const RGBA_S3TC_DXT3_Format=33778;const RGBA_S3TC_DXT5_Format=33779;const RGB_PVRTC_4BPPV1_Format=35840;const RGB_PVRTC_2BPPV1_Format=35841;const RGBA_PVRTC_4BPPV1_Format=35842;const RGBA_PVRTC_2BPPV1_Format=35843;const RGB_ETC1_Format=36196;const RGBA_ASTC_4x4_Format=37808;const RGBA_ASTC_5x4_Format=37809;const RGBA_ASTC_5x5_Format=37810;const RGBA_ASTC_6x5_Format=37811;const RGBA_ASTC_6x6_Format=37812;const RGBA_ASTC_8x5_Format=37813;const RGBA_ASTC_8x6_Format=37814;const RGBA_ASTC_8x8_Format=37815;const RGBA_ASTC_10x5_Format=37816;const RGBA_ASTC_10x6_Format=37817;const RGBA_ASTC_10x8_Format=37818;const RGBA_ASTC_10x10_Format=37819;const RGBA_ASTC_12x10_Format=37820;const RGBA_ASTC_12x12_Format=37821;const LoopOnce=2200;const LoopRepeat=2201;const LoopPingPong=2202;const InterpolateDiscrete=2300;const InterpolateLinear=2301;const InterpolateSmooth=2302;const ZeroCurvatureEnding=2400;const ZeroSlopeEnding=2401;const WrapAroundEnding=2402;const TrianglesDrawMode=0;const TriangleStripDrawMode=1;const TriangleFanDrawMode=2;const LinearEncoding=3e3;const sRGBEncoding=3001;const GammaEncoding=3007;const RGBEEncoding=3002;const LogLuvEncoding=3003;const RGBM7Encoding=3004;const RGBM16Encoding=3005;const RGBDEncoding=3006;const BasicDepthPacking=3200;const RGBADepthPacking=3201;
/***/},
/***/"./src/core/BufferAttribute.ts":
/*!*************************************!*\
  !*** ./src/core/BufferAttribute.ts ***!
  \*************************************/
/*! exports provided: BufferAttribute, Int8BufferAttribute, Uint8BufferAttribute, Uint8ClampedBufferAttribute, Int16BufferAttribute, Uint16BufferAttribute, Int32BufferAttribute, Uint32BufferAttribute, Float32BufferAttribute, Float64BufferAttribute */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"BufferAttribute",function(){return BufferAttribute});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Int8BufferAttribute",function(){return Int8BufferAttribute});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Uint8BufferAttribute",function(){return Uint8BufferAttribute});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Uint8ClampedBufferAttribute",function(){return Uint8ClampedBufferAttribute});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Int16BufferAttribute",function(){return Int16BufferAttribute});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Uint16BufferAttribute",function(){return Uint16BufferAttribute});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Int32BufferAttribute",function(){return Int32BufferAttribute});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Uint32BufferAttribute",function(){return Uint32BufferAttribute});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Float32BufferAttribute",function(){return Float32BufferAttribute});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Float64BufferAttribute",function(){return Float64BufferAttribute});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _math_Math__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Math */"./src/math/Math.ts");
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Vector2 */"./src/math/Vector2.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _math_Vector4__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../math/Vector4 */"./src/math/Vector4.ts");class BufferAttribute{constructor(array,itemSize=0,normalized=false){this.uuid=_math_Math__WEBPACK_IMPORTED_MODULE_1__["MathUtil"].generateUUID();this.name="";this.itemSize=1;this.count=0;this.normalized=false;this.dynamic=false;this.updateRange={offset:0,count:-1};this.version=0;this.array=array;this.itemSize=itemSize;this.count=array!==undefined?array.length/itemSize:0;this.normalized=normalized}set needsUpdate(value){if(value===true)this.version++}setArray(array){this.count=array!==undefined?array.length/this.itemSize:0;this.array=array;return this}setDynamic(value){this.dynamic=value;return this}copy(source){this.array=new source.array.constructor;this.itemSize=source.itemSize;this.count=source.count;this.normalized=source.normalized;this.dynamic=source.dynamic;return this}set(value,offset=0){this.array.set(value,offset);return this}get(offset=0,length=1){return this.array.slice(offset,length)}copyAt(index1,attribute,index2){index1*=this.itemSize;index2*=attribute.itemSize;for(let i=0,l=this.itemSize;i<l;i++){this.array[index1+i]=attribute.array[index2+i]}return this}copyArray(array){this.array.set(array);return this}copyColorsArray(colors){const array=this.array;let offset=0;for(let i=0,l=colors.length;i<l;i++){const color=colors[i]||new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"];array[offset++]=color.r;array[offset++]=color.g;array[offset++]=color.b}return this}
/**
     * TODO question https://discourse.threejs.org/t/question-about-fromdirectgeometry-function-of-buffergeometry/1890/2
     * @param indices
     * @returns {BufferAttribute}
     public copyIndicesArray(indices: Face3[]): BufferAttribute {
        const array: TypedArray = this.array;
        let offset: number = 0;
        for (let i: number = 0, l: number = indices.length; i < l; i++) {
            const index = indices[i];
            array[offset++] = index.a;
            array[offset++] = index.b;
            array[offset++] = index.c;
        }
        return this;
    }
     */copyVector2sArray(vectors){const array=this.array;let offset=0;for(let i=0,l=vectors.length;i<l;i++){const vector=vectors[i]||new _math_Vector2__WEBPACK_IMPORTED_MODULE_2__["Vector2"];array[offset++]=vector.x;array[offset++]=vector.y}return this}copyVector3sArray(vectors){const array=this.array;let offset=0;for(let i=0,l=vectors.length;i<l;i++){const vector=vectors[i]||new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"];array[offset++]=vector.x;array[offset++]=vector.y;array[offset++]=vector.z}return this}copyVector4sArray(vectors){const array=this.array;let offset=0;for(let i=0,l=vectors.length;i<l;i++){const vector=vectors[i]||new _math_Vector4__WEBPACK_IMPORTED_MODULE_4__["Vector4"];array[offset++]=vector.x;array[offset++]=vector.y;array[offset++]=vector.z;array[offset++]=vector.w}return this}setProperty(index,property,value){property=property.toLowerCase();if(property&&property.length<=4&&property.replace(/[xyzw]/g,"").length===0){const offsetMap={x:0,y:1,z:2};if(property.length===1&&typeof value==="number"){this.array[index*this.itemSize+offsetMap[property.charAt(0)]]=value}else if(property.length===2&&value instanceof _math_Vector2__WEBPACK_IMPORTED_MODULE_2__["Vector2"]){this.array[index*this.itemSize+offsetMap[property.charAt(0)]]=value.x;this.array[index*this.itemSize+offsetMap[property.charAt(1)]]=value.y}else if(property.length===3&&value instanceof _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"]){this.array[index*this.itemSize+offsetMap[property.charAt(0)]]=value.x;this.array[index*this.itemSize+offsetMap[property.charAt(1)]]=value.y;this.array[index*this.itemSize+offsetMap[property.charAt(2)]]=value.z}else if(property.length===4&&value instanceof _math_Vector4__WEBPACK_IMPORTED_MODULE_4__["Vector4"]){this.array[index*this.itemSize+offsetMap[property.charAt(0)]]=value.x;this.array[index*this.itemSize+offsetMap[property.charAt(1)]]=value.y;this.array[index*this.itemSize+offsetMap[property.charAt(2)]]=value.z;this.array[index*this.itemSize+offsetMap[property.charAt(3)]]=value.w}}return this}getProperty(index,property){property=property.toLowerCase();if(property&&property.length<=4&&property.replace(/[xyzw]/g,"").length===0){const offsetMap={x:0,y:1,z:2};if(property.length===1){return this.array[index*this.itemSize+offsetMap[property.charAt(0)]]}else if(property.length===2){return new _math_Vector2__WEBPACK_IMPORTED_MODULE_2__["Vector2"](this.array[index*this.itemSize+offsetMap[property.charAt(0)]],this.array[index*this.itemSize+offsetMap[property.charAt(1)]])}else if(property.length===3){return new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"](this.array[index*this.itemSize+offsetMap[property.charAt(0)]],this.array[index*this.itemSize+offsetMap[property.charAt(1)]],this.array[index*this.itemSize+offsetMap[property.charAt(2)]])}else if(property.length===4){return new _math_Vector4__WEBPACK_IMPORTED_MODULE_4__["Vector4"](this.array[index*this.itemSize+offsetMap[property.charAt(0)]],this.array[index*this.itemSize+offsetMap[property.charAt(1)]],this.array[index*this.itemSize+offsetMap[property.charAt(2)]],this.array[index*this.itemSize+offsetMap[property.charAt(3)]])}}return undefined}clone(){return new this.constructor(this.array,this.itemSize,true).copy(this)}}class Int8BufferAttribute extends BufferAttribute{constructor(array,itemSize,normalized){super(new Int8Array(array),itemSize,normalized)}}class Uint8BufferAttribute extends BufferAttribute{constructor(array,itemSize,normalized){super(new Uint8Array(array),itemSize,normalized)}}class Uint8ClampedBufferAttribute extends BufferAttribute{constructor(array,itemSize,normalized){super(new Uint8ClampedArray(array),itemSize,normalized)}}class Int16BufferAttribute extends BufferAttribute{constructor(array,itemSize,normalized){super(new Int16Array(array),itemSize,normalized)}}class Uint16BufferAttribute extends BufferAttribute{constructor(array,itemSize,normalized){super(new Uint16Array(array),itemSize,normalized)}}class Int32BufferAttribute extends BufferAttribute{constructor(array,itemSize,normalized){super(new Int32Array(array),itemSize,normalized)}}class Uint32BufferAttribute extends BufferAttribute{constructor(array,itemSize,normalized){super(new Uint32Array(array),itemSize,normalized)}}class Float32BufferAttribute extends BufferAttribute{constructor(array,itemSize,normalized){super(new Float32Array(array),itemSize,normalized)}}class Float64BufferAttribute extends BufferAttribute{constructor(array,itemSize,normalized){super(new Float64Array(array),itemSize,normalized)}}
/***/},
/***/"./src/core/BufferGeometry.ts":
/*!************************************!*\
  !*** ./src/core/BufferGeometry.ts ***!
  \************************************/
/*! exports provided: BufferGeometry */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"BufferGeometry",function(){return BufferGeometry});
/* harmony import */var _math_Box3__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Box3 */"./src/math/Box3.ts");
/* harmony import */var _math_Math__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Math */"./src/math/Math.ts");
/* harmony import */var _math_Matrix3__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Matrix3 */"./src/math/Matrix3.ts");
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _math_Sphere__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../math/Sphere */"./src/math/Sphere.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _utils__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ../utils */"./src/utils.ts");
/* harmony import */var _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! ./BufferAttribute */"./src/core/BufferAttribute.ts");
/* harmony import */var _DirectGeometry__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(/*! ./DirectGeometry */"./src/core/DirectGeometry.ts");
/* harmony import */var _EventDispatcher__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(/*! ./EventDispatcher */"./src/core/EventDispatcher.ts");
/* harmony import */var _Geometry__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(/*! ./Geometry */"./src/core/Geometry.ts");
/* harmony import */var _Object3D__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(/*! ./Object3D */"./src/core/Object3D.ts");
/* harmony import */var _objects_Mesh__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(/*! ../objects/Mesh */"./src/objects/Mesh.ts");
/* harmony import */var _objects_Line__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(/*! ../objects/Line */"./src/objects/Line.ts");
/* harmony import */var _objects_Points__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(/*! ../objects/Points */"./src/objects/Points.ts");let bufferGeometryId=1;class BufferGeometry extends _EventDispatcher__WEBPACK_IMPORTED_MODULE_9__["EventDispatcher"]{constructor(){super(...arguments);this.id=bufferGeometryId+=2;this.uuid=_math_Math__WEBPACK_IMPORTED_MODULE_1__["MathUtil"].generateUUID();this.name="";this.type="BufferGeometry";this.index=null;this.attributes={};this.morphAttributes={};this.groups=[];this.boundingBox=null;this.boundingSphere=null;this.drawRange={start:0,count:Infinity}}setIndex(index){if(Array.isArray(index)){this.index=new(Object(_utils__WEBPACK_IMPORTED_MODULE_6__["arrayMax"])(index)>65535?_BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["Uint32BufferAttribute"]:_BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["Uint16BufferAttribute"])(index,1)}else{this.index=index}return this}addAttribute(name,attribute){if(name==="index"){this.setIndex(attribute);return this}this.attributes[name]=attribute;return this}getAttribute(name){return this.attributes[name]}removeAttribute(name){delete this.attributes[name];return this}addGroup(start,count,materialIndex=0){this.groups.push({count:count,materialIndex:materialIndex,start:start});return this}clearGroups(){this.groups=[];return this}setDrawRange(start,count){this.drawRange.start=start;this.drawRange.count=count;return this}applyMatrix(matrix){const position=this.attributes.position;if(position!==undefined){Object(_utils__WEBPACK_IMPORTED_MODULE_6__["applyMatrixToBufferAttribute"])(matrix,position);position.needsUpdate=true}const normal=this.attributes.normal;if(normal!==undefined){const normalMatrix=(new _math_Matrix3__WEBPACK_IMPORTED_MODULE_2__["Matrix3"]).getNormalMatrix(matrix);Object(_utils__WEBPACK_IMPORTED_MODULE_6__["applyMatrixToBufferAttribute"])(normalMatrix,normal);normal.needsUpdate=true}if(this.boundingBox!==null){this.computeBoundingBox()}if(this.boundingSphere!==null){this.computeBoundingSphere()}return this}rotateX(angle){return this.applyMatrix((new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]).makeRotationX(angle))}rotateY(angle){return this.applyMatrix((new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]).makeRotationY(angle))}rotateZ(angle){return this.applyMatrix((new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]).makeRotationZ(angle))}translate(x,y,z){return this.applyMatrix((new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]).makeTranslation(x,y,z))}scale(x,y,z){return this.applyMatrix((new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]).makeScale(x,y,z))}lookAt(vector){const obj=(new _Object3D__WEBPACK_IMPORTED_MODULE_11__["Object3D"]).lookAt(vector);obj.updateMatrix();return this.applyMatrix(obj.matrix)}center(){this.computeBoundingBox();const offset=this.boundingBox.getCenter().negate();this.translate(offset.x,offset.y,offset.z);return offset}
/**
     * Same as updateFromObject
     * @param object
     */setFromObject(object){const geometry=object.geometry;if(object instanceof _objects_Points__WEBPACK_IMPORTED_MODULE_14__["Points"]||object instanceof _objects_Line__WEBPACK_IMPORTED_MODULE_13__["Line"]){const positions=new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["Float32BufferAttribute"](geometry.vertices.length*3,3);const colors=new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["Float32BufferAttribute"](geometry.colors.length*3,3);this.addAttribute("position",positions.copyVector3sArray(geometry.vertices));this.addAttribute("color",colors.copyColorsArray(geometry.colors));if(geometry.lineDistances&&geometry.lineDistances.length===geometry.vertices.length){const lineDistances=new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["Float32BufferAttribute"](geometry.lineDistances.length,1);this.addAttribute("lineDistance",lineDistances.copyArray(geometry.lineDistances))}if(geometry.boundingSphere!==null){this.boundingSphere=geometry.boundingSphere.clone()}if(geometry.boundingBox!==null){this.boundingBox=geometry.boundingBox.clone()}}else if(object instanceof _objects_Mesh__WEBPACK_IMPORTED_MODULE_12__["Mesh"]){this.fromGeometry(geometry)}return this}setFromPoints(points){const position=[];for(let i=0,l=points.length;i<l;i++){const point=points[i];position.push(point.x,point.y,point.z||0)}this.addAttribute("position",new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["Float32BufferAttribute"](position,3));return this}
/**
     * This function is a mess.
     * The argument has implicit requirement for arg `object`
     * Since the only use of this function is in `WebGLObjects`,
     * and it requires the object's `geometry` property should be a `Geometry` instance,
     * So we can/must assert the object.geometry as type `Geometry`.
     * So the whole function is dealing with no BufferGeometry instance,
     * which may be the reason why BufferGeometry is faster.
     *
     * @param object
     * @returns {BufferGeometry}
     */updateFromObject(object){let geometry=object.geometry;if(object instanceof _objects_Mesh__WEBPACK_IMPORTED_MODULE_12__["Mesh"]){let direct=geometry.directGeometry;if(geometry.elementsNeedUpdate===true){direct=undefined;geometry.elementsNeedUpdate=false}if(direct===undefined){
// Geometry -> DirectGeometry -> BufferGeometry
return this.fromGeometry(geometry)}direct.verticesNeedUpdate=geometry.verticesNeedUpdate;direct.normalsNeedUpdate=geometry.normalsNeedUpdate;direct.colorsNeedUpdate=geometry.colorsNeedUpdate;direct.uvsNeedUpdate=geometry.uvsNeedUpdate;direct.groupsNeedUpdate=geometry.groupsNeedUpdate;geometry.verticesNeedUpdate=false;geometry.normalsNeedUpdate=false;geometry.colorsNeedUpdate=false;geometry.uvsNeedUpdate=false;geometry.groupsNeedUpdate=false;geometry=direct}
// Used by both Geometry and DirectGeometry
if(geometry.verticesNeedUpdate===true){const attribute=this.attributes.position;if(attribute!==undefined){attribute.copyVector3sArray(geometry.vertices);attribute.needsUpdate=true}geometry.verticesNeedUpdate=false}
// Used only by DirectGeometry
if(geometry instanceof _DirectGeometry__WEBPACK_IMPORTED_MODULE_8__["DirectGeometry"]&&geometry.normalsNeedUpdate===true){const attribute=this.attributes.normal;if(attribute!==undefined){attribute.copyVector3sArray(geometry.normals);attribute.needsUpdate=true}geometry.normalsNeedUpdate=false}
// Used by both Geometry and DirectGeometry
if(geometry.colorsNeedUpdate===true){const attribute=this.attributes.color;if(attribute!==undefined){attribute.copyColorsArray(geometry.colors);attribute.needsUpdate=true}geometry.colorsNeedUpdate=false}
// Used only by DirectGeometry
if(geometry instanceof _DirectGeometry__WEBPACK_IMPORTED_MODULE_8__["DirectGeometry"]&&geometry.uvsNeedUpdate){const attribute=this.attributes.uv;if(attribute!==undefined){attribute.copyVector2sArray(geometry.uvs);attribute.needsUpdate=true}geometry.uvsNeedUpdate=false}
// Used only by Geometry
if(geometry instanceof _Geometry__WEBPACK_IMPORTED_MODULE_10__["Geometry"]&&geometry.lineDistancesNeedUpdate){const attribute=this.attributes.lineDistance;if(attribute!==undefined){attribute.copyArray(geometry.lineDistances);attribute.needsUpdate=true}geometry.lineDistancesNeedUpdate=false}
// Used only by DirectGeometry
if(geometry instanceof _DirectGeometry__WEBPACK_IMPORTED_MODULE_8__["DirectGeometry"]&&geometry.groupsNeedUpdate){geometry.computeGroups(object.geometry);this.groups=geometry.groups;geometry.groupsNeedUpdate=false}
// Well, IMO!!
return this}
/**
     * Geometry of a Mesh
     * @param geometry
     */fromGeometry(geometry){geometry.directGeometry=(new _DirectGeometry__WEBPACK_IMPORTED_MODULE_8__["DirectGeometry"]).fromGeometry(geometry);return this.fromDirectGeometry(geometry.directGeometry)}fromDirectGeometry(geometry){const positions=new Float32Array(geometry.vertices.length*3);this.addAttribute("position",new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["BufferAttribute"](positions,3).copyVector3sArray(geometry.vertices));if(geometry.normals.length>0){const normals=new Float32Array(geometry.normals.length*3);this.addAttribute("normal",new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["BufferAttribute"](normals,3).copyVector3sArray(geometry.normals))}if(geometry.colors.length>0){const colors=new Float32Array(geometry.colors.length*3);this.addAttribute("color",new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["BufferAttribute"](colors,3).copyColorsArray(geometry.colors))}if(geometry.uvs.length>0){const uvs=new Float32Array(geometry.uvs.length*2);this.addAttribute("uv",new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["BufferAttribute"](uvs,2).copyVector2sArray(geometry.uvs))}if(geometry.uvs2.length>0){const uvs2=new Float32Array(geometry.uvs2.length*2);this.addAttribute("uv2",new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["BufferAttribute"](uvs2,2).copyVector2sArray(geometry.uvs2))}
/**
         * TODO question https://discourse.threejs.org/t/question-about-fromdirectgeometry-function-of-buffergeometry/1890/2
         if (geometry.indices.length > 0) {
            const indices: Uint32Array | Uint16Array = new (arrayMax(geometry.indices) > 65535 ? Uint32Array : Uint16Array)(geometry.indices.length * 3);
            this.setIndex(new BufferAttribute(indices, 1).copyIndicesArray(geometry.indices));
        }
         */
// groups
this.groups=geometry.groups;
// morphs
for(const name in geometry.morphTargets){if(!geometry.morphTargets.hasOwnProperty(name))continue;const array=[];const morphTargets=geometry.morphTargets[name];for(let i=0,l=morphTargets.length;i<l;i++){const morphTarget=morphTargets[i];const attribute=new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["Float32BufferAttribute"](new Array(morphTarget.length*3),3);array.push(attribute.copyVector3sArray(morphTarget))}this.morphAttributes[name]=array}
// skinning
if(geometry.skinIndices.length>0){const skinIndices=new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["Float32BufferAttribute"](new Array(geometry.skinIndices.length*4),4);this.addAttribute("skinIndex",skinIndices.copyVector4sArray(geometry.skinIndices))}if(geometry.skinWeights.length>0){const skinWeights=new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["Float32BufferAttribute"](new Array(geometry.skinWeights.length*4),4);this.addAttribute("skinWeight",skinWeights.copyVector4sArray(geometry.skinWeights))}if(geometry.boundingSphere!==null){this.boundingSphere=geometry.boundingSphere.clone()}if(geometry.boundingBox!==null){this.boundingBox=geometry.boundingBox.clone()}return this}computeBoundingBox(){if(this.boundingBox===null){this.boundingBox=new _math_Box3__WEBPACK_IMPORTED_MODULE_0__["Box3"]}const position=this.attributes.position;if(position!==undefined){Object(_utils__WEBPACK_IMPORTED_MODULE_6__["setBoxFromBufferAttribute"])(this.boundingBox,position)}else{this.boundingBox.makeEmpty()}if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z)){console.error(`THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){if(this.boundingSphere===null){this.boundingSphere=new _math_Sphere__WEBPACK_IMPORTED_MODULE_4__["Sphere"]}const position=this.attributes.position;if(position){const box=new _math_Box3__WEBPACK_IMPORTED_MODULE_0__["Box3"];Object(_utils__WEBPACK_IMPORTED_MODULE_6__["setBoxFromBufferAttribute"])(box,position);const center=box.getCenter();
// hoping to find a boundingSphere with a radius smaller than the
// boundingSphere of the boundingBox: sqrt(3) smaller in the best case
let maxRadiusSquare=0;for(let i=0,il=position.count;i<il;i++){const vector=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"];vector.x=position.getProperty(i,"x");vector.y=position.getProperty(i,"y");vector.z=position.getProperty(i,"z");maxRadiusSquare=Math.max(maxRadiusSquare,center.distanceToSquared(vector))}this.boundingSphere.radius=Math.sqrt(maxRadiusSquare);if(isNaN(this.boundingSphere.radius)){console.error(`THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}}computeVertexNormals(){const index=this.index;const attributes=this.attributes;const groups=this.groups;if(attributes.position){const positions=attributes.position.array;if(attributes.normal===undefined){this.addAttribute("normal",new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["BufferAttribute"](new Float32Array(positions.length),3))}else{
// reset existing normals to zero
const array=attributes.normal.array;for(let i=0,il=array.length;i<il;i++){array[i]=0}}const normals=attributes.normal.array;let vA,vB,vC;const pA=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"],pB=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"],pC=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"];const cb=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"],ab=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"];
// indexed elements
if(index){const indices=index.array;if(groups.length===0){this.addGroup(0,indices.length)}for(let j=0,jl=groups.length;j<jl;++j){const group=groups[j];const start=group.start;const count=group.count;for(let i=start,il=start+count;i<il;i+=3){vA=indices[i]*3;vB=indices[i+1]*3;vC=indices[i+2]*3;pA.fromArray(positions,vA);pB.fromArray(positions,vB);pC.fromArray(positions,vC);cb.copy(pC).sub(pB);ab.copy(pA).sub(pB);cb.cross(ab);normals[vA]+=cb.x;normals[vA+1]+=cb.y;normals[vA+2]+=cb.z;normals[vB]+=cb.x;normals[vB+1]+=cb.y;normals[vB+2]+=cb.z;normals[vC]+=cb.x;normals[vC+1]+=cb.y;normals[vC+2]+=cb.z}}}else{
// non-indexed elements (unconnected triangle soup)
for(let i=0,il=positions.length;i<il;i+=9){pA.fromArray(positions,i);pB.fromArray(positions,i+3);pC.fromArray(positions,i+6);cb.copy(pC).sub(pB);ab.copy(pA).sub(pB);cb.cross(ab);normals[i]=cb.x;normals[i+1]=cb.y;normals[i+2]=cb.z;normals[i+3]=cb.x;normals[i+4]=cb.y;normals[i+5]=cb.z;normals[i+6]=cb.x;normals[i+7]=cb.y;normals[i+8]=cb.z}}this.normalizeNormals();attributes.normal.needsUpdate=true}}normalizeNormals(){const vector=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"];const normals=this.attributes.normal;for(let i=0,il=normals.count;i<il;i++){vector.x=normals.getProperty(i,"x");vector.y=normals.getProperty(i,"y");vector.z=normals.getProperty(i,"z");vector.normalize();normals.setProperty(i,"xyz",vector)}}toNonIndexed(){if(this.index===null){console.warn(`THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed.`);return this}const geometry2=new BufferGeometry;const indices=this.index.array;const attributes=this.attributes;for(const name in attributes){if(!attributes.hasOwnProperty(name))continue;const attribute=attributes[name];const array=attribute.array;const itemSize=attribute.itemSize;const array2=new array.constructor(indices.length*itemSize);let index=0,index2=0;for(let i=0,l=indices.length;i<l;i++){index=indices[i]*itemSize;for(let j=0;j<itemSize;j++){array2[index2++]=array[index++]}}geometry2.addAttribute(name,new _BufferAttribute__WEBPACK_IMPORTED_MODULE_7__["BufferAttribute"](array2,itemSize))}return geometry2}clone(){return(new this.constructor).copy(this)}copy(source){
// reset
this.index=null;this.attributes={};this.morphAttributes={};this.groups=[];this.boundingBox=null;this.boundingSphere=null;
// name
this.name=source.name;
// index
const index=source.index;if(index!==null){this.setIndex(index.clone())}
// attributes
const attributes=source.attributes;for(const name in attributes){if(!attributes.hasOwnProperty(name))continue;const attribute=attributes[name];this.addAttribute(name,attribute.clone())}
// morph attributes
const morphAttributes=source.morphAttributes;for(const name in morphAttributes){if(!attributes.hasOwnProperty(name))continue;const array=[];const morphAttribute=morphAttributes[name];// morphAttribute: array of Float32BufferAttributes
for(let i=0,l=morphAttribute.length;i<l;i++){array.push(morphAttribute[i].clone())}this.morphAttributes[name]=array}
// groups
const groups=source.groups;for(let i=0,l=groups.length;i<l;i++){const group=groups[i];this.addGroup(group.start,group.count,group.materialIndex)}
// bounding box
const boundingBox=source.boundingBox;if(boundingBox!==null){this.boundingBox=boundingBox.clone()}
// bounding sphere
const boundingSphere=source.boundingSphere;if(boundingSphere!==null){this.boundingSphere=boundingSphere.clone()}
// draw range
this.drawRange.start=source.drawRange.start;this.drawRange.count=source.drawRange.count;return this}dispose(){this.dispatchEvent({type:"dispose"})}}
/***/},
/***/"./src/core/Clock.ts":
/*!***************************!*\
  !*** ./src/core/Clock.ts ***!
  \***************************/
/*! exports provided: Clock */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Clock",function(){return Clock});class Clock{constructor(autoStart=false){this.autoStart=false;this.startTime=0;this.oldTime=0;this.elapsedTime=0;this.running=false;this.autoStart=autoStart}start(){this.startTime=(typeof performance==="undefined"?Date:performance).now();// see #10732
this.oldTime=this.startTime;this.elapsedTime=0;this.running=true}stop(){this.getElapsedTime();this.running=false;this.autoStart=false}getElapsedTime(){this.getDelta();return this.elapsedTime}getDelta(){let diff=0;if(this.autoStart&&!this.running){this.start();return 0}if(this.running){const newTime=(typeof performance==="undefined"?Date:performance).now();diff=(newTime-this.oldTime)/1e3;this.oldTime=newTime;this.elapsedTime+=diff}return diff}}
/***/},
/***/"./src/core/DirectGeometry.ts":
/*!************************************!*\
  !*** ./src/core/DirectGeometry.ts ***!
  \************************************/
/*! exports provided: DirectGeometry */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"DirectGeometry",function(){return DirectGeometry});
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Vector2 */"./src/math/Vector2.ts");class DirectGeometry{constructor(){this.vertices=[];this.normals=[];this.colors=[];this.uvs=[];this.uvs2=[];this.groups=[];this.morphTargets={};this.skinWeights=[];this.skinIndices=[];this.boundingSphere=null;this.boundingBox=null;this.verticesNeedUpdate=false;this.uvsNeedUpdate=false;this.normalsNeedUpdate=false;this.colorsNeedUpdate=false;this.groupsNeedUpdate=false}computeGroups(geometry){let group;const groups=[];let materialIndex;const faces=geometry.faces;let i=0;for(;i<faces.length;i++){const face=faces[i];
// materials
if(face.materialIndex!==materialIndex){materialIndex=face.materialIndex;if(group!==undefined){group.count=i*3-group.start;groups.push(group)}group={materialIndex:materialIndex,start:i*3}}}if(group!==undefined){group.count=i*3-group.start;groups.push(group)}this.groups=groups}fromGeometry(geometry){const faces=geometry.faces;const vertices=geometry.vertices;const faceVertexUvs=geometry.faceVertexUvs;const hasFaceVertexUv=faceVertexUvs[0]&&faceVertexUvs[0].length>0;const hasFaceVertexUv2=faceVertexUvs[1]&&faceVertexUvs[1].length>0;
// morphs
const morphTargets=geometry.morphTargets;const morphTargetsLength=morphTargets.length;if(morphTargetsLength>0){this.morphTargets.position=[];for(let i=0;i<morphTargetsLength;i++){this.morphTargets.position[i]=[]}}const morphNormals=geometry.morphNormals;const morphNormalsLength=morphNormals.length;if(morphNormalsLength>0){this.morphTargets.normal=[];for(let i=0;i<morphNormalsLength;i++){this.morphTargets.normal[i]=[]}}
// skins
const skinIndices=geometry.skinIndices;const skinWeights=geometry.skinWeights;const hasSkinIndices=skinIndices.length===vertices.length;const hasSkinWeights=skinWeights.length===vertices.length;for(let i=0;i<faces.length;i++){const face=faces[i];this.vertices.push(vertices[face.a],vertices[face.b],vertices[face.c]);const vertexNormals=face.vertexNormals;if(vertexNormals.length===3){this.normals.push(vertexNormals[0],vertexNormals[1],vertexNormals[2])}else{const normal=face.normal;this.normals.push(normal,normal,normal)}const vertexColors=face.vertexColors;if(vertexColors.length===3){this.colors.push(vertexColors[0],vertexColors[1],vertexColors[2])}else{const color=face.color;this.colors.push(color,color,color)}if(hasFaceVertexUv===true){const vertexUvs=faceVertexUvs[0][i];if(vertexUvs!==undefined){this.uvs.push(vertexUvs[0],vertexUvs[1],vertexUvs[2])}else{console.warn(`THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ${i}`);this.uvs.push(new _math_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"],new _math_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"],new _math_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"])}}if(hasFaceVertexUv2===true){const vertexUvs=faceVertexUvs[1][i];if(vertexUvs!==undefined){this.uvs2.push(vertexUvs[0],vertexUvs[1],vertexUvs[2])}else{console.warn(`THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ${i}`);this.uvs2.push(new _math_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"],new _math_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"],new _math_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"])}}
// morphs
for(let j=0;j<morphTargetsLength;j++){const morphTarget=morphTargets[j].vertices;this.morphTargets.position[j].push(morphTarget[face.a],morphTarget[face.b],morphTarget[face.c])}for(let j=0;j<morphNormalsLength;j++){const morphNormal=morphNormals[j].vertexNormals[i];this.morphTargets.normal[j].push(morphNormal.a,morphNormal.b,morphNormal.c)}
// skins
if(hasSkinIndices){this.skinIndices.push(skinIndices[face.a],skinIndices[face.b],skinIndices[face.c])}if(hasSkinWeights){this.skinWeights.push(skinWeights[face.a],skinWeights[face.b],skinWeights[face.c])}}if(geometry.boundingSphere!==null){this.boundingSphere=geometry.boundingSphere.clone()}if(geometry.boundingBox!==null){this.boundingBox=geometry.boundingBox.clone()}this.computeGroups(geometry);this.verticesNeedUpdate=geometry.verticesNeedUpdate;this.normalsNeedUpdate=geometry.normalsNeedUpdate;this.colorsNeedUpdate=geometry.colorsNeedUpdate;this.uvsNeedUpdate=geometry.uvsNeedUpdate;this.groupsNeedUpdate=geometry.groupsNeedUpdate;return this}}
/***/},
/***/"./src/core/EventDispatcher.ts":
/*!*************************************!*\
  !*** ./src/core/EventDispatcher.ts ***!
  \*************************************/
/*! exports provided: EventDispatcher */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"EventDispatcher",function(){return EventDispatcher});class EventDispatcher{constructor(){this._listeners={}}addEventListener(type,listener){const listeners=this._listeners;if(listeners[type]===undefined){listeners[type]=[]}if(listeners[type].indexOf(listener)===-1){listeners[type].push(listener)}}hasEventListener(type,listener){if(this._listeners===undefined)return false;const listeners=this._listeners;return listeners[type]!==undefined&&listeners[type].indexOf(listener)!==-1}removeEventListener(type,listener){if(this._listeners===undefined)return;const listeners=this._listeners;const listenerArray=listeners[type];if(listenerArray!==undefined){const index=listenerArray.indexOf(listener);if(index!==-1){listenerArray.splice(index,1)}}}dispatchEvent(event={}){if(this._listeners===undefined)return;const listeners=this._listeners;const listenerArray=listeners[event.type];if(listenerArray!==undefined){event.target=this;const array=listenerArray.slice(0);for(let i=0,l=array.length;i<l;i++){array[i].call(this,event)}}}}
/***/},
/***/"./src/core/Face3.ts":
/*!***************************!*\
  !*** ./src/core/Face3.ts ***!
  \***************************/
/*! exports provided: Face3 */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Face3",function(){return Face3});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");class Face3{constructor(a=0,b=0,c=0,normal=new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"],color=new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"],materialIndex=0){this.a=0;this.b=0;this.c=0;this.normal=new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];this.vertexNormals=[];this.color=new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"];this.vertexColors=[];this.materialIndex=0;this.a=a;this.b=b;this.c=c;if(normal instanceof _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"])this.normal=normal;if(Array.isArray(normal))this.vertexNormals=normal;if(color instanceof _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"])this.color=color;if(Array.isArray(color))this.vertexColors=color;this.materialIndex=materialIndex}copy(source){this.a=source.a;this.b=source.b;this.c=source.c;this.normal.copy(source.normal);this.color.copy(source.color);this.materialIndex=source.materialIndex;for(let i=0,il=source.vertexNormals.length;i<il;i++){this.vertexNormals[i]=source.vertexNormals[i].clone()}for(let i=0,il=source.vertexColors.length;i<il;i++){this.vertexColors[i]=source.vertexColors[i].clone()}return this}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/core/Geometry.ts":
/*!******************************!*\
  !*** ./src/core/Geometry.ts ***!
  \******************************/
/*! exports provided: GeometryFace, Geometry */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"GeometryFace",function(){return GeometryFace});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Geometry",function(){return Geometry});
/* harmony import */var _math_Box3__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Box3 */"./src/math/Box3.ts");
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _math_Math__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Math */"./src/math/Math.ts");
/* harmony import */var _math_Matrix3__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../math/Matrix3 */"./src/math/Matrix3.ts");
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _math_Sphere__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ../math/Sphere */"./src/math/Sphere.ts");
/* harmony import */var _math_Triangle__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ../math/Triangle */"./src/math/Triangle.ts");
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! ../math/Vector2 */"./src/math/Vector2.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _EventDispatcher__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(/*! ./EventDispatcher */"./src/core/EventDispatcher.ts");
/* harmony import */var _Face3__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(/*! ./Face3 */"./src/core/Face3.ts");
/* harmony import */var _Object3D__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(/*! ./Object3D */"./src/core/Object3D.ts");class GeometryFace extends _Face3__WEBPACK_IMPORTED_MODULE_10__["Face3"]{}let geometryId=0;class Geometry extends _EventDispatcher__WEBPACK_IMPORTED_MODULE_9__["EventDispatcher"]{constructor(){super(...arguments);this.id=geometryId+=2;this.uuid=_math_Math__WEBPACK_IMPORTED_MODULE_2__["MathUtil"].generateUUID();this.name="";this.type="Geometry";this.vertices=[];this.colors=[];this.faces=[];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphNormals=[];this.skinWeights=[];this.skinIndices=[];this.lineDistances=[];this.boundingBox=null;this.boundingSphere=null;this.elementsNeedUpdate=false;this.verticesNeedUpdate=false;this.uvsNeedUpdate=false;this.normalsNeedUpdate=false;this.colorsNeedUpdate=false;this.lineDistancesNeedUpdate=false;this.groupsNeedUpdate=false}applyMatrix(matrix){const normalMatrix=(new _math_Matrix3__WEBPACK_IMPORTED_MODULE_3__["Matrix3"]).getNormalMatrix(matrix);for(let i=0,il=this.vertices.length;i<il;i++){this.vertices[i].applyMatrix4(matrix)}for(let i=0,il=this.faces.length;i<il;i++){const face=this.faces[i];face.normal.applyMatrix3(normalMatrix).normalize();for(let j=0,jl=face.vertexNormals.length;j<jl;j++){face.vertexNormals[j].applyMatrix3(normalMatrix).normalize()}}if(this.boundingBox!==null){this.computeBoundingBox()}if(this.boundingSphere!==null){this.computeBoundingSphere()}this.verticesNeedUpdate=true;this.normalsNeedUpdate=true;return this}rotateX(angle){return this.applyMatrix((new _math_Matrix4__WEBPACK_IMPORTED_MODULE_4__["Matrix4"]).makeRotationX(angle))}rotateY(angle){return this.applyMatrix((new _math_Matrix4__WEBPACK_IMPORTED_MODULE_4__["Matrix4"]).makeRotationY(angle))}rotateZ(angle){return this.applyMatrix((new _math_Matrix4__WEBPACK_IMPORTED_MODULE_4__["Matrix4"]).makeRotationZ(angle))}translate(x,y,z){return this.applyMatrix((new _math_Matrix4__WEBPACK_IMPORTED_MODULE_4__["Matrix4"]).makeTranslation(x,y,z))}scale(x,y,z){return this.applyMatrix((new _math_Matrix4__WEBPACK_IMPORTED_MODULE_4__["Matrix4"]).makeScale(x,y,z))}lookAt(vector){const obj=(new _Object3D__WEBPACK_IMPORTED_MODULE_11__["Object3D"]).lookAt(vector);obj.updateMatrix();return this.applyMatrix(obj.matrix)}fromBufferGeometry(geometry){const indices=geometry.index!==null?geometry.index.array:undefined;const attributes=geometry.attributes;const positions=attributes.position.array;const normals=attributes.normal!==undefined?attributes.normal.array:undefined;const colors=attributes.color!==undefined?attributes.color.array:undefined;const uvs=attributes.uv!==undefined?attributes.uv.array:undefined;const uvs2=attributes.uv2!==undefined?attributes.uv2.array:undefined;if(uvs2!==undefined)this.faceVertexUvs[1]=[];const tempNormals=[];const tempUVs=[];const tempUVs2=[];for(let i=0,j=0;i<positions.length;i+=3,j+=2){this.vertices.push(new _math_Vector3__WEBPACK_IMPORTED_MODULE_8__["Vector3"](positions[i],positions[i+1],positions[i+2]));if(normals!==undefined){tempNormals.push(new _math_Vector3__WEBPACK_IMPORTED_MODULE_8__["Vector3"](normals[i],normals[i+1],normals[i+2]))}if(colors!==undefined){this.colors.push(new _math_Color__WEBPACK_IMPORTED_MODULE_1__["Color"](colors[i],colors[i+1],colors[i+2]))}if(uvs!==undefined){tempUVs.push(new _math_Vector2__WEBPACK_IMPORTED_MODULE_7__["Vector2"](uvs[j],uvs[j+1]))}if(uvs2!==undefined){tempUVs2.push(new _math_Vector2__WEBPACK_IMPORTED_MODULE_7__["Vector2"](uvs2[j],uvs2[j+1]))}}const addFace=(a,b,c,materialIndex)=>{const vertexNormals=normals!==undefined?[tempNormals[a].clone(),tempNormals[b].clone(),tempNormals[c].clone()]:[];const vertexColors=colors!==undefined?[this.colors[a].clone(),this.colors[b].clone(),this.colors[c].clone()]:[];const face=new _Face3__WEBPACK_IMPORTED_MODULE_10__["Face3"](a,b,c,vertexNormals,vertexColors,materialIndex);this.faces.push(face);if(uvs!==undefined){this.faceVertexUvs[0].push([tempUVs[a].clone(),tempUVs[b].clone(),tempUVs[c].clone()])}if(uvs2!==undefined){this.faceVertexUvs[1].push([tempUVs2[a].clone(),tempUVs2[b].clone(),tempUVs2[c].clone()])}};const groups=geometry.groups;if(groups.length>0){for(let i=0;i<groups.length;i++){const group=groups[i];const start=group.start;const count=group.count;for(let j=start,jl=start+count;j<jl;j+=3){if(indices!==undefined){addFace(indices[j],indices[j+1],indices[j+2],group.materialIndex)}else{addFace(j,j+1,j+2,group.materialIndex)}}}}else{if(indices!==undefined){for(let i=0;i<indices.length;i+=3){addFace(indices[i],indices[i+1],indices[i+2])}}else{for(let i=0;i<positions.length/3;i+=3){addFace(i,i+1,i+2)}}}this.computeFaceNormals();if(geometry.boundingBox!==null){this.boundingBox=geometry.boundingBox.clone()}if(geometry.boundingSphere!==null){this.boundingSphere=geometry.boundingSphere.clone()}return this}center(){this.computeBoundingBox();const offset=this.boundingBox.getCenter().negate();this.translate(offset.x,offset.y,offset.z);return offset}normalize(){this.computeBoundingSphere();const center=this.boundingSphere.center;const radius=this.boundingSphere.radius;const s=radius===0?1:1/radius;const matrix=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_4__["Matrix4"];matrix.set(s,0,0,-s*center.x,0,s,0,-s*center.y,0,0,s,-s*center.z,0,0,0,1);return this.applyMatrix(matrix)}computeFaceNormals(){const cb=new _math_Vector3__WEBPACK_IMPORTED_MODULE_8__["Vector3"],ab=new _math_Vector3__WEBPACK_IMPORTED_MODULE_8__["Vector3"];for(let f=0,fl=this.faces.length;f<fl;f++){const face=this.faces[f];const vA=this.vertices[face.a];const vB=this.vertices[face.b];const vC=this.vertices[face.c];cb.copy(vC).sub(vB);ab.copy(vA).sub(vB);cb.cross(ab);cb.normalize();face.normal.copy(cb)}return this}computeVertexNormals(areaWeighted=true){const vertices=new Array(this.vertices.length);for(let v=0,vl=this.vertices.length;v<vl;v++){vertices[v]=new _math_Vector3__WEBPACK_IMPORTED_MODULE_8__["Vector3"]}if(areaWeighted){
// vertex normals weighted by triangle areas
// http://www.iquilezles.org/www/articles/normals/normals.htm
for(let f=0,fl=this.faces.length;f<fl;f++){const face=this.faces[f];const vA=this.vertices[face.a];const vB=this.vertices[face.b];const vC=this.vertices[face.c];const cb=(new _math_Vector3__WEBPACK_IMPORTED_MODULE_8__["Vector3"]).copy(vC).sub(vB);const ab=(new _math_Vector3__WEBPACK_IMPORTED_MODULE_8__["Vector3"]).copy(vA).sub(vB);cb.cross(ab);vertices[face.a].add(cb);vertices[face.b].add(cb);vertices[face.c].add(cb)}}else{this.computeFaceNormals();for(let f=0,fl=this.faces.length;f<fl;f++){const face=this.faces[f];vertices[face.a].add(face.normal);vertices[face.b].add(face.normal);vertices[face.c].add(face.normal)}}for(let v=0,vl=this.vertices.length;v<vl;v++){vertices[v].normalize()}for(let f=0,fl=this.faces.length;f<fl;f++){const face=this.faces[f];const vertexNormals=face.vertexNormals;if(vertexNormals.length===3){vertexNormals[0].copy(vertices[face.a]);vertexNormals[1].copy(vertices[face.b]);vertexNormals[2].copy(vertices[face.c])}else{vertexNormals[0]=vertices[face.a].clone();vertexNormals[1]=vertices[face.b].clone();vertexNormals[2]=vertices[face.c].clone()}}if(this.faces.length>0){this.normalsNeedUpdate=true}return this}computeFlatVertexNormals(){this.computeFaceNormals();for(let f=0,fl=this.faces.length;f<fl;f++){const face=this.faces[f];const vertexNormals=face.vertexNormals;if(vertexNormals.length===3){vertexNormals[0].copy(face.normal);vertexNormals[1].copy(face.normal);vertexNormals[2].copy(face.normal)}else{vertexNormals[0]=face.normal.clone();vertexNormals[1]=face.normal.clone();vertexNormals[2]=face.normal.clone()}}if(this.faces.length>0){this.normalsNeedUpdate=true}return this}computeMorphNormals(){
// save original normals
// - create temp variables on first access
//   otherwise just copy (for faster repeated calls)
for(let f=0,fl=this.faces.length;f<fl;f++){const face=this.faces[f];if(!face.originalFaceNormal){face.originalFaceNormal=face.normal.clone()}else{face.originalFaceNormal.copy(face.normal)}if(!face.originalVertexNormals)face.originalVertexNormals=[];for(let i=0,il=face.vertexNormals.length;i<il;i++){if(!face.originalVertexNormals[i]){face.originalVertexNormals[i]=face.vertexNormals[i].clone()}else{face.originalVertexNormals[i].copy(face.vertexNormals[i])}}}
// use temp geometry to compute face and vertex normals for each morph
const tmpGeo=new Geometry;tmpGeo.faces=this.faces;for(let i=0,il=this.morphTargets.length;i<il;i++){
// create on first access
if(!this.morphNormals[i]){this.morphNormals[i]={faceNormals:[],vertexNormals:[]};for(let f=0,fl=this.faces.length;f<fl;f++){this.morphNormals[i].faceNormals.push(new _math_Vector3__WEBPACK_IMPORTED_MODULE_8__["Vector3"]);this.morphNormals[i].vertexNormals.push(new _math_Triangle__WEBPACK_IMPORTED_MODULE_6__["Triangle"])}}const morphNormals=this.morphNormals[i];
// set vertices to morph target
tmpGeo.vertices=this.morphTargets[i].vertices;
// compute morph normals
tmpGeo.computeFaceNormals();tmpGeo.computeVertexNormals();
// store morph normals
for(let f=0,fl=this.faces.length;f<fl;f++){const face=this.faces[f];const faceNormal=morphNormals.faceNormals[f];const vertexNormals=morphNormals.vertexNormals[f];faceNormal.copy(face.normal);vertexNormals.a.copy(face.vertexNormals[0]);vertexNormals.b.copy(face.vertexNormals[1]);vertexNormals.c.copy(face.vertexNormals[2])}}
// restore original normals
for(let f=0,fl=this.faces.length;f<fl;f++){const face=this.faces[f];face.normal=face.originalFaceNormal;face.vertexNormals=face.originalVertexNormals}return this}computeLineDistances(){let d=0;const vertices=this.vertices;for(let i=0,il=vertices.length;i<il;i++){if(i>0){d+=vertices[i].distanceTo(vertices[i-1])}this.lineDistances[i]=d}return this}computeBoundingBox(){if(this.boundingBox===null){this.boundingBox=new _math_Box3__WEBPACK_IMPORTED_MODULE_0__["Box3"]}this.boundingBox.setFromPoints(this.vertices);return this}computeBoundingSphere(){if(this.boundingSphere===null){this.boundingSphere=new _math_Sphere__WEBPACK_IMPORTED_MODULE_5__["Sphere"]}this.boundingSphere.setFromPoints(this.vertices);return this}merge(geometry,matrix,materialIndexOffset=0){let normalMatrix;const vertexOffset=this.vertices.length,thisVertices=this.vertices,thatVertices=geometry.vertices,thisFaces=this.faces,thatFaces=geometry.faces,thisUvs=this.faceVertexUvs[0],thatUvs=geometry.faceVertexUvs[0],thisColors=this.colors,thatColors=geometry.colors;if(matrix!==undefined){normalMatrix=(new _math_Matrix3__WEBPACK_IMPORTED_MODULE_3__["Matrix3"]).getNormalMatrix(matrix)}
// vertices
for(let i=0,il=thatVertices.length;i<il;i++){const vertexCopy=thatVertices[i].clone();if(matrix!==undefined)vertexCopy.applyMatrix4(matrix);thisVertices.push(vertexCopy)}
// colors
for(let i=0,il=thatColors.length;i<il;i++){thisColors.push(thatColors[i].clone())}
// faces
for(let i=0,il=thatFaces.length;i<il;i++){const face=thatFaces[i],faceVertexNormals=face.vertexNormals,faceVertexColors=face.vertexColors;const faceCopy=new GeometryFace(face.a+vertexOffset,face.b+vertexOffset,face.c+vertexOffset);faceCopy.normal.copy(face.normal);if(normalMatrix!==undefined){faceCopy.normal.applyMatrix3(normalMatrix).normalize()}for(let j=0,jl=faceVertexNormals.length;j<jl;j++){const normal=faceVertexNormals[j].clone();if(normalMatrix!==undefined){normal.applyMatrix3(normalMatrix).normalize()}faceCopy.vertexNormals.push(normal)}faceCopy.color.copy(face.color);for(let j=0,jl=faceVertexColors.length;j<jl;j++){const color=faceVertexColors[j];faceCopy.vertexColors.push(color.clone())}faceCopy.materialIndex=face.materialIndex+materialIndexOffset;thisFaces.push(faceCopy)}
// uvs
for(let i=0,il=thatUvs.length;i<il;i++){const uv=thatUvs[i],uvCopy=[];if(uv===undefined){continue}for(let j=0,jl=uv.length;j<jl;j++){uvCopy.push(uv[j].clone())}thisUvs.push(uvCopy)}return this}mergeMesh(mesh){if(mesh.geometry instanceof Geometry){if(mesh.matrixAutoUpdate){mesh.updateMatrix()}this.merge(mesh.geometry,mesh.matrix)}else{console.error(`THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.`,mesh.geometry)}}
/**
     * Checks for duplicate vertices with hashmap.
     * Duplicated vertices are removed
     * and faces' vertices are updated.
     * @returns {number}
     */mergeVertices(){
/**
         * Hashmap for looking up vertices by position coordinates (and making sure they are unique)
         * @type {{}}
         */
const verticesMap={};const unique=[],changes=[];
/**
         * number of decimal points, e.g. 4 for epsilon of 0.0001
         * @type {number}
         */const precisionPoints=4;const precision=Math.pow(10,precisionPoints);for(let i=0,il=this.vertices.length;i<il;i++){const v=this.vertices[i];const key=[Math.round(v.x*precision),Math.round(v.y*precision),Math.round(v.z*precision)].join("_");if(verticesMap[key]===undefined){verticesMap[key]=i;unique.push(this.vertices[i]);changes[i]=unique.length-1}else{
// console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
changes[i]=changes[verticesMap[key]]}}
// if faces are completely degenerate after merging vertices, we
// have to remove them from the geometry.
const faceIndicesToRemove=[];for(let i=0,il=this.faces.length;i<il;i++){const face=this.faces[i];face.a=changes[face.a];face.b=changes[face.b];face.c=changes[face.c];const indices=[face.a,face.b,face.c];
// if any duplicate vertices are found in a Face3
// we have to remove the face as nothing can be saved
for(let n=0;n<3;n++){if(indices[n]===indices[(n+1)%3]){faceIndicesToRemove.push(i);break}}}for(let i=faceIndicesToRemove.length-1;i>=0;i--){const idx=faceIndicesToRemove[i];this.faces.splice(idx,1);for(let j=0,jl=this.faceVertexUvs.length;j<jl;j++){this.faceVertexUvs[j].splice(idx,1)}}
// Use unique set of vertices
const diff=this.vertices.length-unique.length;this.vertices=unique;return diff}setFromPoints(points){this.vertices=[];for(let i=0,l=points.length;i<l;i++){const point=points[i];this.vertices.push(new _math_Vector3__WEBPACK_IMPORTED_MODULE_8__["Vector3"](point.x,point.y,point.z||0))}return this}sortFacesByMaterialIndex(){const faces=this.faces;const length=faces.length;
// tag faces
for(let i=0;i<length;i++){faces[i].id=i}
// sort faces
faces.sort((a,b)=>{return a.materialIndex-b.materialIndex});
// sort uvs
const uvs1=this.faceVertexUvs[0];const uvs2=this.faceVertexUvs[1];let newUvs1,newUvs2;if(uvs1&&uvs1.length===length)newUvs1=[];if(uvs2&&uvs2.length===length)newUvs2=[];for(let i=0;i<length;i++){const id=faces[i].id;if(newUvs1)newUvs1.push(uvs1[id]);if(newUvs2)newUvs2.push(uvs2[id])}if(newUvs1)this.faceVertexUvs[0]=newUvs1;if(newUvs2)this.faceVertexUvs[1]=newUvs2;return this}copy(source){
// reset
this.vertices=[];this.colors=[];this.faces=[];this.faceVertexUvs=[[]];this.morphTargets=[];this.morphNormals=[];this.skinWeights=[];this.skinIndices=[];this.lineDistances=[];this.boundingBox=null;this.boundingSphere=null;
// name
this.name=source.name;
// vertices
const vertices=source.vertices;for(let i=0,il=vertices.length;i<il;i++){this.vertices.push(vertices[i].clone())}
// colors
const colors=source.colors;for(let i=0,il=colors.length;i<il;i++){this.colors.push(colors[i].clone())}
// faces
const faces=source.faces;for(let i=0,il=faces.length;i<il;i++){this.faces.push(faces[i].clone())}
// face vertex uvs
for(let i=0,il=source.faceVertexUvs.length;i<il;i++){const faceVertexUvs=source.faceVertexUvs[i];if(this.faceVertexUvs[i]===undefined){this.faceVertexUvs[i]=[]}for(let j=0,jl=faceVertexUvs.length;j<jl;j++){const uvs=faceVertexUvs[j];const uvsCopy=[];for(let k=0,kl=uvs.length;k<kl;k++){uvsCopy.push(uvs[k].clone())}this.faceVertexUvs[i].push(uvsCopy)}}
// morph targets
const morphTargets=source.morphTargets;for(let i=0,il=morphTargets.length;i<il;i++){const morphTarget={name:morphTargets[i].name};
// vertices
if(morphTargets[i].vertices!==undefined){morphTarget.vertices=[];for(let j=0,jl=morphTargets[i].vertices.length;j<jl;j++){morphTarget.vertices.push(morphTargets[i].vertices[j].clone())}}
// normals
if(morphTargets[i].normals!==undefined){morphTarget.normals=[];for(let j=0,jl=morphTargets[i].normals.length;j<jl;j++){morphTarget.normals.push(morphTargets[i].normals[j].clone())}}this.morphTargets.push(morphTarget)}
// morph normals
const morphNormals=source.morphNormals;for(let i=0,il=morphNormals.length;i<il;i++){const morphNormal={};
// vertex normals
if(morphNormals[i].vertexNormals!==undefined){morphNormal.vertexNormals=[];for(let j=0,jl=morphNormals[i].vertexNormals.length;j<jl;j++){morphNormal.vertexNormals.push(morphNormals[i].vertexNormals[j].clone())}}
// face normals
if(morphNormals[i].faceNormals!==undefined){morphNormal.faceNormals=[];for(let j=0,jl=morphNormals[i].faceNormals.length;j<jl;j++){morphNormal.faceNormals.push(morphNormals[i].faceNormals[j].clone())}}this.morphNormals.push(morphNormal)}
// skin weights
const skinWeights=source.skinWeights;for(let i=0,il=skinWeights.length;i<il;i++){this.skinWeights.push(skinWeights[i].clone())}
// skin indices
const skinIndices=source.skinIndices;for(let i=0,il=skinIndices.length;i<il;i++){this.skinIndices.push(skinIndices[i].clone())}
// line distances
const lineDistances=source.lineDistances;for(let i=0,il=lineDistances.length;i<il;i++){this.lineDistances.push(lineDistances[i])}
// bounding box
const boundingBox=source.boundingBox;if(boundingBox!==null){this.boundingBox=boundingBox.clone()}
// bounding sphere
const boundingSphere=source.boundingSphere;if(boundingSphere!==null){this.boundingSphere=boundingSphere.clone()}
// update flags
this.elementsNeedUpdate=source.elementsNeedUpdate;this.verticesNeedUpdate=source.verticesNeedUpdate;this.uvsNeedUpdate=source.uvsNeedUpdate;this.normalsNeedUpdate=source.normalsNeedUpdate;this.colorsNeedUpdate=source.colorsNeedUpdate;this.lineDistancesNeedUpdate=source.lineDistancesNeedUpdate;this.groupsNeedUpdate=source.groupsNeedUpdate;return this}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/core/InstancedBufferAttribute.ts":
/*!**********************************************!*\
  !*** ./src/core/InstancedBufferAttribute.ts ***!
  \**********************************************/
/*! exports provided: InstancedBufferAttribute */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"InstancedBufferAttribute",function(){return InstancedBufferAttribute});
/* harmony import */var _BufferAttribute__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./BufferAttribute */"./src/core/BufferAttribute.ts");class InstancedBufferAttribute extends _BufferAttribute__WEBPACK_IMPORTED_MODULE_0__["BufferAttribute"]{constructor(array,itemSize,normalized=false,meshPerAttribute=1){super(array,itemSize,normalized);this.meshPerAttribute=1;this.meshPerAttribute=meshPerAttribute}copy(source){super.copy(source);this.meshPerAttribute=source.meshPerAttribute;return this}}
/***/},
/***/"./src/core/InstancedBufferGeometry.ts":
/*!*********************************************!*\
  !*** ./src/core/InstancedBufferGeometry.ts ***!
  \*********************************************/
/*! exports provided: InstancedBufferGeometry */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"InstancedBufferGeometry",function(){return InstancedBufferGeometry});
/* harmony import */var _BufferGeometry__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./BufferGeometry */"./src/core/BufferGeometry.ts");class InstancedBufferGeometry extends _BufferGeometry__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"]{constructor(){super(...arguments);this.type="InstancedBufferGeometry"}copy(source){super.copy(source);this.maxInstancedCount=source.maxInstancedCount;return this}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/core/InstancedInterleavedBufferAttribute.ts":
/*!*********************************************************!*\
  !*** ./src/core/InstancedInterleavedBufferAttribute.ts ***!
  \*********************************************************/
/*! exports provided: InstancedInterleavedBufferAttribute */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"InstancedInterleavedBufferAttribute",function(){return InstancedInterleavedBufferAttribute});
/* harmony import */var _InterleavedBufferAttribute__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./InterleavedBufferAttribute */"./src/core/InterleavedBufferAttribute.ts");class InstancedInterleavedBufferAttribute extends _InterleavedBufferAttribute__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]{constructor(array,stride,itemSize,offset,normalized=false,meshPerAttribute=1){super(array,stride,itemSize,offset,normalized);this.meshPerAttribute=1;this.meshPerAttribute=meshPerAttribute}copy(source){super.copy(source);this.meshPerAttribute=source.meshPerAttribute;return this}}
/***/},
/***/"./src/core/InterleavedBufferAttribute.ts":
/*!************************************************!*\
  !*** ./src/core/InterleavedBufferAttribute.ts ***!
  \************************************************/
/*! exports provided: InterleavedBufferAttribute */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"InterleavedBufferAttribute",function(){return InterleavedBufferAttribute});
/* harmony import */var _math_Math__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Math */"./src/math/Math.ts");
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Vector2 */"./src/math/Vector2.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _math_Vector4__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../math/Vector4 */"./src/math/Vector4.ts");class InterleavedBufferAttribute{constructor(array,stride,itemSize,offset,normalized=false){this.uuid=_math_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].generateUUID();this.array=undefined;this.stride=1;this.count=0;this.dynamic=false;this.updateRange={offset:0,count:-1};this.version=0;this.normalized=false;this.array=array;this.stride=stride;this.count=array!==undefined?array.length/stride:0;this.itemSize=itemSize;this.offset=offset;this.normalized=normalized}set needsUpdate(value){if(value===true)this.version++}setArray(array){this.count=array!==undefined?array.length/this.stride:0;this.array=array;return this}setDynamic(value){this.dynamic=value;return this}copy(source){this.array=new source.array.constructor(source.array);this.stride=source.stride;this.count=source.count;this.dynamic=source.dynamic;return this}set(value,offset=0){this.array.set(value,offset);return this}get(offset=0,length=1){return this.array.slice(offset,length)}copyAt(index1,attribute,index2){index1*=this.stride;index2*=attribute.stride;for(let i=0,l=this.stride;i<l;i++){this.array[index1+i]=attribute.array[index2+i]}return this}clone(){return new this.constructor(this.array,this.stride).copy(this)}setProperty(index,property,value){property=property.toLowerCase();if(property&&property.length<=4&&property.replace(/[xyzw]/g,"").length===0){const offsetMap={x:0,y:1,z:2};if(property.length===1&&typeof value==="number"){this.array[index*this.stride+this.offset+offsetMap[property.charAt(0)]]=value}else if(property.length===2&&value instanceof _math_Vector2__WEBPACK_IMPORTED_MODULE_1__["Vector2"]){this.array[index*this.stride+this.offset+offsetMap[property.charAt(0)]]=value.x;this.array[index*this.stride+this.offset+offsetMap[property.charAt(1)]]=value.y}else if(property.length===3&&value instanceof _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]){this.array[index*this.stride+this.offset+offsetMap[property.charAt(0)]]=value.x;this.array[index*this.stride+this.offset+offsetMap[property.charAt(1)]]=value.y;this.array[index*this.stride+this.offset+offsetMap[property.charAt(2)]]=value.z}else if(property.length===4&&value instanceof _math_Vector4__WEBPACK_IMPORTED_MODULE_3__["Vector4"]){this.array[index*this.stride+this.offset+offsetMap[property.charAt(0)]]=value.x;this.array[index*this.stride+this.offset+offsetMap[property.charAt(1)]]=value.y;this.array[index*this.stride+this.offset+offsetMap[property.charAt(2)]]=value.z;this.array[index*this.stride+this.offset+offsetMap[property.charAt(3)]]=value.w}}return this}getProperty(index,property){property=property.toLowerCase();if(property&&property.length<=4&&property.replace(/[xyzw]/g,"").length===0){const offsetMap={x:0,y:1,z:2};if(property.length===1){return this.array[index*this.stride+this.offset+offsetMap[property.charAt(0)]]}else if(property.length===2){return new _math_Vector2__WEBPACK_IMPORTED_MODULE_1__["Vector2"](this.array[index*this.stride+this.offset+offsetMap[property.charAt(0)]],this.array[index*this.stride+this.offset+offsetMap[property.charAt(1)]])}else if(property.length===3){return new _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"](this.array[index*this.stride+this.offset+offsetMap[property.charAt(0)]],this.array[index*this.stride+this.offset+offsetMap[property.charAt(1)]],this.array[index*this.stride+this.offset+offsetMap[property.charAt(2)]])}else if(property.length===4){return new _math_Vector4__WEBPACK_IMPORTED_MODULE_3__["Vector4"](this.array[index*this.stride+this.offset+offsetMap[property.charAt(0)]],this.array[index*this.stride+this.offset+offsetMap[property.charAt(1)]],this.array[index*this.stride+this.offset+offsetMap[property.charAt(2)]],this.array[index*this.stride+this.offset+offsetMap[property.charAt(3)]])}}return undefined}}
/***/},
/***/"./src/core/Layers.ts":
/*!****************************!*\
  !*** ./src/core/Layers.ts ***!
  \****************************/
/*! exports provided: Layers */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Layers",function(){return Layers});class Layers{constructor(){this.mask=1|0}set(channel){this.mask=1<<channel|0}enable(channel){this.mask|=1<<channel|0}toggle(channel){this.mask^=1<<channel|0}disable(channel){this.mask&=~(1<<channel|0)}test(layers){return(this.mask&layers.mask)!==0}}
/***/},
/***/"./src/core/Object3D.ts":
/*!******************************!*\
  !*** ./src/core/Object3D.ts ***!
  \******************************/
/*! exports provided: Object3D */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Object3D",function(){return Object3D});
/* harmony import */var _cameras_Camera__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../cameras/Camera */"./src/cameras/Camera.ts");
/* harmony import */var _math_Euler__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Euler */"./src/math/Euler.ts");
/* harmony import */var _math_Math__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Math */"./src/math/Math.ts");
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _math_Quaternion__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../math/Quaternion */"./src/math/Quaternion.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _EventDispatcher__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ./EventDispatcher */"./src/core/EventDispatcher.ts");
/* harmony import */var _Layers__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! ./Layers */"./src/core/Layers.ts");let object3DId=0;class Object3D extends _EventDispatcher__WEBPACK_IMPORTED_MODULE_6__["EventDispatcher"]{constructor(){super(...arguments);this.id=object3DId++;this.uuid=_math_Math__WEBPACK_IMPORTED_MODULE_2__["MathUtil"].generateUUID();this.name="";this.type="Object3D";this.parent=null;this.children=[];this.up=(new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"]).copy(Object3D.DefaultUp);this.matrix=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"];this.matrixWorld=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"];this.matrixAutoUpdate=Object3D.DefaultMatrixAutoUpdate;this.matrixWorldNeedsUpdate=false;this.layers=new _Layers__WEBPACK_IMPORTED_MODULE_7__["Layers"];this.visible=true;this.castShadow=false;this.receiveShadow=false;this.frustumCulled=true;this.renderOrder=0;this.userData={};this.position=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"];this.rotation=new _math_Euler__WEBPACK_IMPORTED_MODULE_1__["Euler"];this.quaternion=new _math_Quaternion__WEBPACK_IMPORTED_MODULE_4__["Quaternion"];this.scale=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"](1,1,1);this.modelViewMatrix=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"];this.normalMatrix=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);this.matrixWorldNeedsUpdate=true;return this}updateMatrixWorld(force=false){if(this.matrixAutoUpdate){return this.updateMatrix()}if(this.matrixWorldNeedsUpdate||force){if(this.parent===null){this.matrixWorld.copy(this.matrix)}else{this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)}this.matrixWorldNeedsUpdate=false;force=true}
// update children
const children=this.children;for(let i=0,l=children.length;i<l;i++){children[i].updateMatrixWorld(force)}return this}raycast(raycaster,intersections){}applyMatrix(matrix){this.matrix.multiplyMatrices(matrix,this.matrix);this.matrix.decompose(this.position,this.quaternion,this.scale);return this}applyQuaternion(q){this.quaternion.premultiply(q);return this}
/**
     * assumes axis is normalized
     * @param axis
     * @param angle
     * @returns {Object3D}
     */setRotationFromAxisAngle(axis,angle){this.quaternion.setFromAxisAngle(axis,angle);return this}setRotationFromEuler(euler){this.quaternion.setFromEuler(euler);return this}
/**
     * assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
     * @param m
     * @returns {Object3D}
     */setRotationFromMatrix(m){this.quaternion.setFromRotationMatrix(m);return this}
/**
     * assumes q is normalized
     * @param q
     * @returns {Object3D}
     */setRotationFromQuaternion(q){this.quaternion.copy(q);return this}rotateOnAxis(axis,angle){const q=new _math_Quaternion__WEBPACK_IMPORTED_MODULE_4__["Quaternion"];q.setFromAxisAngle(axis,angle);this.quaternion.multiply(q);return this}
/**
     * rotate object on axis in world space
     * axis is assumed to be normalized
     * method assumes no rotated parent
     * @param axis
     * @param angle
     * @returns {Object3D}
     */rotateOnWorldAxis(axis,angle){const q=new _math_Quaternion__WEBPACK_IMPORTED_MODULE_4__["Quaternion"];q.setFromAxisAngle(axis,angle);this.quaternion.premultiply(q);return this}rotateX(angle){return this.rotateOnAxis(new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"](1,0,0),angle)}rotateY(angle){return this.rotateOnAxis(new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"](0,1,0),angle)}rotateZ(angle){return this.rotateOnAxis(new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"](0,0,1),angle)}
/**
     * translate object by distance along axis in object space
     * axis is assumed to be normalized
     * @param axis
     * @param distance
     * @returns {Object3D}
     */translateOnAxis(axis,distance){const vec=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"];vec.copy(axis).applyQuaternion(this.quaternion);this.position.add(vec.multiplyScalar(distance));return this}translateX(distance){return this.translateOnAxis(new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"](1,0,0),distance)}translateY(distance){return this.translateOnAxis(new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"](0,1,0),distance)}translateZ(distance){return this.translateOnAxis(new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"](0,0,1),distance)}localToWorld(vector){return vector.applyMatrix4(this.matrixWorld)}worldToLocal(vector){return vector.applyMatrix4((new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]).getInverse(this.matrixWorld))}lookAt(vec){const mat=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"];const vector=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"];if(this instanceof _cameras_Camera__WEBPACK_IMPORTED_MODULE_0__["Camera"]){mat.lookAt(this.position,vector,this.up)}else{mat.lookAt(vector,this.position,this.up)}this.quaternion.setFromRotationMatrix(mat);return this}add(object,...objects){if(objects.length>1){for(let i=0;i<objects.length;i++){this.add(objects[i])}return this}if(object===this){console.error(`THREE.Object3D.add: object can't be added as a child of itself. ${object}`);return this}if(object.parent!==null){object.parent.remove(object)}object.parent=this;object.dispatchEvent({type:"added"});this.children.push(object);return this}remove(object,...objects){if(objects.length>1){for(let i=0;i<objects.length;i++){this.remove(objects[i])}return this}const index=this.children.indexOf(object);if(index!==-1){object.parent=null;object.dispatchEvent({type:"removed"});this.children.splice(index,1)}return this}get worldPosition(){this.updateMatrixWorld(true);return(new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"]).setFromMatrixPosition(this.matrixWorld)}get worldQuaternion(){const position=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"];const scale=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"];const result=new _math_Quaternion__WEBPACK_IMPORTED_MODULE_4__["Quaternion"];this.updateMatrixWorld(true);this.matrixWorld.decompose(position,result,scale);return result}get worldRotation(){return(new _math_Euler__WEBPACK_IMPORTED_MODULE_1__["Euler"]).setFromQuaternion(this.worldQuaternion,this.rotation.order)}get worldScale(){const position=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"];const quaternion=new _math_Quaternion__WEBPACK_IMPORTED_MODULE_4__["Quaternion"];const result=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"];this.updateMatrixWorld(true);this.matrixWorld.decompose(position,quaternion,result);return result}get worldDirection(){return(new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"]).set(0,0,1).applyQuaternion(this.worldQuaternion)}traverse(callback){callback(this);for(let i=0,l=this.children.length;i<l;i++){this.children[i].traverse(callback)}}traverseVisible(callback){if(this.visible===false)return;callback(this);for(let i=0,l=this.children.length;i<l;i++){this.children[i].traverseVisible(callback)}}traverseAncestors(callback){if(this.parent!==null){callback(this.parent);this.parent.traverseAncestors(callback)}}clone(recursive=false){return(new this.constructor).copy(this,recursive)}copy(source,recursive=true){this.name=source.name;this.up.copy(source.up);this.position.copy(source.position);this.quaternion.copy(source.quaternion);this.scale.copy(source.scale);this.matrix.copy(source.matrix);this.matrixWorld.copy(source.matrixWorld);this.matrixAutoUpdate=source.matrixAutoUpdate;this.matrixWorldNeedsUpdate=source.matrixWorldNeedsUpdate;this.layers.mask=source.layers.mask;this.visible=source.visible;this.castShadow=source.castShadow;this.receiveShadow=source.receiveShadow;this.frustumCulled=source.frustumCulled;this.renderOrder=source.renderOrder;this.userData=JSON.parse(JSON.stringify(source.userData));if(recursive===true){for(let i=0;i<source.children.length;i++){this.add(source.children[i].clone())}}return this}}Object3D.DefaultUp=new _math_Vector3__WEBPACK_IMPORTED_MODULE_5__["Vector3"](0,1,0);Object3D.DefaultMatrixAutoUpdate=true;
/***/},
/***/"./src/core/Raycaster.ts":
/*!*******************************!*\
  !*** ./src/core/Raycaster.ts ***!
  \*******************************/
/*! exports provided: Raycaster */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Raycaster",function(){return Raycaster});
/* harmony import */var _cameras_OrthographicCamera__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../cameras/OrthographicCamera */"./src/cameras/OrthographicCamera.ts");
/* harmony import */var _cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../cameras/PerspectiveCamera */"./src/cameras/PerspectiveCamera.ts");
/* harmony import */var _math_Ray__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Ray */"./src/math/Ray.ts");
/* harmony import */var _utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../utils */"./src/utils.ts");function intersectObject(object,raycaster,intersects,recursive=false){if(object.visible===false)return;object.raycast(raycaster,intersects);if(recursive===true){const children=object.children;for(let i=0,l=children.length;i<l;i++){intersectObject(children[i],raycaster,intersects,true)}}}class Raycaster{constructor(origin,direction,near=0,far=Infinity){this.params={LOD:{},Line:{},Mesh:{},Points:{threshold:1},Sprite:{}};this.near=0;this.far=Infinity;this.linePrecision=1;this.ray=new _math_Ray__WEBPACK_IMPORTED_MODULE_2__["Ray"](origin,direction);this.near=near;this.far=far}set(origin,direction){this.ray.set(origin,direction);return this}setFromCamera(coords,camera){if(camera&&camera instanceof _cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_1__["PerspectiveCamera"]){this.ray.origin.setFromMatrixPosition(camera.matrixWorld);this.ray.direction.set(coords.x,coords.y,.5);Object(_utils__WEBPACK_IMPORTED_MODULE_3__["unprojectVector3onCamera"])(this.ray.direction,camera);this.ray.direction.sub(this.ray.origin).normalize()}else if(camera&&camera instanceof _cameras_OrthographicCamera__WEBPACK_IMPORTED_MODULE_0__["OrthographicCamera"]){this.ray.origin.set(coords.x,coords.y,(camera.near+camera.far)/(camera.near-camera.far));Object(_utils__WEBPACK_IMPORTED_MODULE_3__["unprojectVector3onCamera"])(this.ray.origin,camera);// set origin in plane of camera
this.ray.direction.set(0,0,-1).transformDirection(camera.matrixWorld)}else{console.error(`THREE.Raycaster: Unsupported camera type.`)}return this}intersectObject(object,recursive=false){const intersects=[];intersectObject(object,this,intersects,recursive);intersects.sort((a,b)=>a.distance-b.distance);return intersects}intersectObjects(objects,recursive=false){const intersects=[];for(let i=0,l=objects.length;i<l;i++){intersectObject(objects[i],this,intersects,recursive)}intersects.sort((a,b)=>a.distance-b.distance);return intersects}}
/***/},
/***/"./src/geometries/BoxGeometry.ts":
/*!***************************************!*\
  !*** ./src/geometries/BoxGeometry.ts ***!
  \***************************************/
/*! exports provided: BoxGeometry, BoxBufferGeometry */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"BoxGeometry",function(){return BoxGeometry});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"BoxBufferGeometry",function(){return BoxBufferGeometry});
/* harmony import */var _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/BufferAttribute */"./src/core/BufferAttribute.ts");
/* harmony import */var _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../core/BufferGeometry */"./src/core/BufferGeometry.ts");
/* harmony import */var _core_Geometry__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../core/Geometry */"./src/core/Geometry.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");class BoxGeometry extends _core_Geometry__WEBPACK_IMPORTED_MODULE_2__["Geometry"]{constructor(width,height,depth,widthSegments,heightSegments,depthSegments){super();this.type="BoxGeometry";this.parameters={depth:depth,depthSegments:depthSegments,height:height,heightSegments:heightSegments,width:width,widthSegments:widthSegments}}}class BoxBufferGeometry extends _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__["BufferGeometry"]{constructor(width=1,height=1,depth=1,widthSegments=1,heightSegments=1,depthSegments=1){super();this.type="BoxBufferGeometry";this.parameters={depth:depth,depthSegments:depthSegments,height:height,heightSegments:heightSegments,width:width,widthSegments:widthSegments};widthSegments=Math.floor(widthSegments);heightSegments=Math.floor(heightSegments);depthSegments=Math.floor(depthSegments);
// buffers
const indices=[];const vertices=[];const normals=[];const uvs=[];
// helper variables
let numberOfVertices=0;let groupStart=0;const buildPlane=(u,v,w,uDir,vDir,width2,height2,depth2,gridX,gridY,materialIndex)=>{const segmentWidth=width2/gridX;const segmentHeight=height2/gridY;const widthHalf=width2/2;const heightHalf=height2/2;const depthHalf=depth2/2;const gridX1=gridX+1;const gridY1=gridY+1;let vertexCounter=0;let groupCount=0;
// generate vertices, normals and uvs
for(let iy=0;iy<gridY1;iy++){const y=iy*segmentHeight-heightHalf;for(let ix=0;ix<gridX1;ix++){const x=ix*segmentWidth-widthHalf;const vector=new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"];
// set values to correct vector component
vector[u]=x*uDir;vector[v]=y*vDir;vector[w]=depthHalf;
// now apply vector to vertex buffer
vertices.push(vector.x,vector.y,vector.z);
// set values to correct vector component
vector[u]=0;vector[v]=0;vector[w]=depth2>0?1:-1;
// now apply vector to normal buffer
normals.push(vector.x,vector.y,vector.z);
// uvs
uvs.push(ix/gridX);uvs.push(1-iy/gridY);
// counters
vertexCounter+=1}}
// indices
// 1. you need three indices to draw a single face
// 2. a single segment consists of two faces
// 3. so we need to generate six (2*3) indices per segment
for(let iy=0;iy<gridY;iy++){for(let ix=0;ix<gridX;ix++){const a=numberOfVertices+ix+gridX1*iy;const b=numberOfVertices+ix+gridX1*(iy+1);const c=numberOfVertices+(ix+1)+gridX1*(iy+1);const d=numberOfVertices+(ix+1)+gridX1*iy;
// faces
indices.push(a,b,d);indices.push(b,c,d);
// increase counter
groupCount+=6}}
// add a group to the geometry. this will ensure multi material support
this.addGroup(groupStart,groupCount,materialIndex);
// calculate new start value for groups
groupStart+=groupCount;
// update total number of vertices
numberOfVertices+=vertexCounter};
// build each side of the box geometry
buildPlane("z","y","x",-1,-1,depth,height,width,depthSegments,heightSegments,0);// px
buildPlane("z","y","x",1,-1,depth,height,-width,depthSegments,heightSegments,1);// nx
buildPlane("x","z","y",1,1,width,depth,height,widthSegments,depthSegments,2);// py
buildPlane("x","z","y",1,-1,width,depth,-height,widthSegments,depthSegments,3);// ny
buildPlane("x","y","z",1,-1,width,height,depth,widthSegments,heightSegments,4);// pz
buildPlane("x","y","z",-1,-1,width,height,-depth,widthSegments,heightSegments,5);// nz
// build geometry
this.setIndex(indices);this.addAttribute("position",new _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](vertices,3));this.addAttribute("normal",new _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](normals,3));this.addAttribute("uv",new _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](uvs,2))}}
/***/},
/***/"./src/geometries/CircleGeometry.ts":
/*!******************************************!*\
  !*** ./src/geometries/CircleGeometry.ts ***!
  \******************************************/
/*! exports provided: CircleGeometry, CircleBufferGeometry */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CircleGeometry",function(){return CircleGeometry});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CircleBufferGeometry",function(){return CircleBufferGeometry});
/* harmony import */var _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/BufferAttribute */"./src/core/BufferAttribute.ts");
/* harmony import */var _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../core/BufferGeometry */"./src/core/BufferGeometry.ts");
/* harmony import */var _core_Geometry__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../core/Geometry */"./src/core/Geometry.ts");class CircleGeometry extends _core_Geometry__WEBPACK_IMPORTED_MODULE_2__["Geometry"]{constructor(radius,segments,thetaStart,thetaLength){super();this.type="CircleGeometry";this.parameters={radius:radius,segments:segments,thetaLength:thetaLength,thetaStart:thetaStart};this.fromBufferGeometry(new CircleBufferGeometry(radius,segments,thetaStart,thetaLength));this.mergeVertices()}}class CircleBufferGeometry extends _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__["BufferGeometry"]{constructor(radius=1,segments,thetaStart=0,thetaLength=Math.PI*2){super();this.type="CircleBufferGeometry";this.parameters={radius:radius,segments:segments,thetaLength:thetaLength,thetaStart:thetaStart};segments=segments!==undefined?Math.max(3,segments):8;
// buffers
const indices=[];const vertices=[];const normals=[];const uvs=[];
// center point
vertices.push(0,0,0);normals.push(0,0,1);uvs.push(.5,.5);for(let s=0,i=3;s<=segments;s++,i+=3){const segment=thetaStart+s/segments*thetaLength;
// vertex
vertices.push(radius*Math.cos(segment),radius*Math.sin(segment),0);
// normal
normals.push(0,0,1);
// uvs
uvs.push((vertices[i]/radius+1)/2,(vertices[i+1]/radius+1)/2)}
// indices
for(let i=1;i<=segments;i++){indices.push(i,i+1,0)}
// build geometry
this.setIndex(indices);this.addAttribute("position",new _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](vertices,3));this.addAttribute("normal",new _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](normals,3));this.addAttribute("uv",new _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](uvs,2))}}
/***/},
/***/"./src/geometries/ConeGeometry.ts":
/*!****************************************!*\
  !*** ./src/geometries/ConeGeometry.ts ***!
  \****************************************/
/*! exports provided: ConeGeometry, ConeBufferGeometry */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ConeGeometry",function(){return ConeGeometry});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ConeBufferGeometry",function(){return ConeBufferGeometry});
/* harmony import */var _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/BufferGeometry */"./src/core/BufferGeometry.ts");
/* harmony import */var _core_Geometry__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../core/Geometry */"./src/core/Geometry.ts");
/* harmony import */var _CylinderGeometry__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./CylinderGeometry */"./src/geometries/CylinderGeometry.ts");class ConeGeometry extends _core_Geometry__WEBPACK_IMPORTED_MODULE_1__["Geometry"]{constructor(radius,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength){super();this.type="ConeGeometry";_CylinderGeometry__WEBPACK_IMPORTED_MODULE_2__["CylinderGeometry"].call(this,0,radius,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength);this.parameters={height:height,heightSegments:heightSegments,openEnded:openEnded,radialSegments:radialSegments,radius:radius,thetaLength:thetaLength,thetaStart:thetaStart}}}class ConeBufferGeometry extends _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"]{constructor(radius,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength){super();this.type="ConeBufferGeometry";_CylinderGeometry__WEBPACK_IMPORTED_MODULE_2__["CylinderBufferGeometry"].call(this,0,radius,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength);this.parameters={height:height,heightSegments:heightSegments,openEnded:openEnded,radialSegments:radialSegments,radius:radius,thetaLength:thetaLength,thetaStart:thetaStart}}}
/***/},
/***/"./src/geometries/CylinderGeometry.ts":
/*!********************************************!*\
  !*** ./src/geometries/CylinderGeometry.ts ***!
  \********************************************/
/*! exports provided: CylinderGeometry, CylinderBufferGeometry */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CylinderGeometry",function(){return CylinderGeometry});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CylinderBufferGeometry",function(){return CylinderBufferGeometry});
/* harmony import */var _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/BufferAttribute */"./src/core/BufferAttribute.ts");
/* harmony import */var _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../core/BufferGeometry */"./src/core/BufferGeometry.ts");
/* harmony import */var _core_Geometry__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../core/Geometry */"./src/core/Geometry.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");class CylinderGeometry extends _core_Geometry__WEBPACK_IMPORTED_MODULE_2__["Geometry"]{constructor(radiusTop,radiusBottom,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength){super();this.type="CylinderGeometry";this.parameters={height:height,heightSegments:heightSegments,openEnded:openEnded,radialSegments:radialSegments,radiusBottom:radiusBottom,radiusTop:radiusTop,thetaLength:thetaLength,thetaStart:thetaStart};this.fromBufferGeometry(new CylinderBufferGeometry(radiusTop,radiusBottom,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength));this.mergeVertices()}}class CylinderBufferGeometry extends _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__["BufferGeometry"]{constructor(radiusTop=1,radiusBottom=1,height=1,radialSegments=9,heightSegments=1,openEnded=false,thetaStart=0,thetaLength=Math.PI*2){super();this.type="CylinderBufferGeometry";this.parameters={height:height,heightSegments:heightSegments,openEnded:openEnded,radialSegments:radialSegments,radiusBottom:radiusBottom,radiusTop:radiusTop,thetaLength:thetaLength,thetaStart:thetaStart};radialSegments=Math.floor(radialSegments);heightSegments=Math.floor(heightSegments);
// buffers
const indices=[];const vertices=[];const normals=[];const uvs=[];
// helper variables
let index=0;const indexArray=[];const halfHeight=height/2;let groupStart=0;const generateCap=top=>{let centerIndexStart,centerIndexEnd;let groupCount=0;const radius=top?radiusTop:radiusBottom;const sign=top?1:-1;
// save the index of the first center vertex
centerIndexStart=index;
// first we generate the center vertex data of the cap.
// because the geometry needs one set of uvs per face,
// we must generate a center vertex per face/segment
for(let x=1;x<=radialSegments;x++){
// vertex
vertices.push(0,halfHeight*sign,0);
// normal
normals.push(0,sign,0);
// uv
uvs.push(.5,.5);
// increase index
index++}
// save the index of the last center vertex
centerIndexEnd=index;
// now we generate the surrounding vertices, normals and uvs
for(let x=0;x<=radialSegments;x++){const u=x/radialSegments;const theta=u*thetaLength+thetaStart;const cosTheta=Math.cos(theta);const sinTheta=Math.sin(theta);
// vertex
vertices.push(radius*sinTheta,halfHeight*sign,radius*cosTheta);
// normal
normals.push(0,sign,0);
// uv
uvs.push(cosTheta*.5+.5,sinTheta*.5*sign+.5);
// increase index
index++}
// generate indices
for(let x=0;x<radialSegments;x++){const c=centerIndexStart+x;const i=centerIndexEnd+x;if(top){
// face top
indices.push(i,i+1,c)}else{
// face bottom
indices.push(i+1,i,c)}groupCount+=3}
// add a group to the geometry. this will ensure multi material support
this.addGroup(groupStart,groupCount,top===true?1:2);
// calculate new start value for groups
groupStart+=groupCount};const generateTorso=()=>{let groupCount=0;
// this will be used to calculate the normal
const slope=(radiusBottom-radiusTop)/height;
// generate vertices, normals and uvs
for(let y=0;y<=heightSegments;y++){const indexRow=[];const v=y/heightSegments;
// calculate the radius of the current row
const radius=v*(radiusBottom-radiusTop)+radiusTop;for(let x=0;x<=radialSegments;x++){const u=x/radialSegments;const theta=u*thetaLength+thetaStart;const sinTheta=Math.sin(theta);const cosTheta=Math.cos(theta);
// vertex
vertices.push(radius*sinTheta,-v*height+halfHeight,radius*cosTheta);
// normal
const normal=new _math_Vector3__WEBPACK_IMPORTED_MODULE_3__["Vector3"];normal.set(sinTheta,slope,cosTheta).normalize();normals.push(normal.x,normal.y,normal.z);
// uv
uvs.push(u,1-v);
// save index of vertex in respective row
indexRow.push(index++)}
// now save vertices of the row in our index array
indexArray.push(indexRow)}
// generate indices
for(let x=0;x<radialSegments;x++){for(let y=0;y<heightSegments;y++){
// we use the index array to access the correct indices
const a=indexArray[y][x];const b=indexArray[y+1][x];const c=indexArray[y+1][x+1];const d=indexArray[y][x+1];
// faces
indices.push(a,b,d);indices.push(b,c,d);
// update group counter
groupCount+=6}}
// add a group to the geometry. this will ensure multi material support
this.addGroup(groupStart,groupCount,0);
// calculate new start value for groups
groupStart+=groupCount};
// generate geometry
generateTorso();if(openEnded===false){if(radiusTop>0)generateCap(true);if(radiusBottom>0)generateCap(false)}
// build geometry
this.setIndex(indices);this.addAttribute("position",new _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](vertices,3));this.addAttribute("normal",new _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](normals,3));this.addAttribute("uv",new _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"](uvs,2))}}
/***/},
/***/"./src/geometries/Geometries.ts":
/*!**************************************!*\
  !*** ./src/geometries/Geometries.ts ***!
  \**************************************/
/*! exports provided: ConeGeometry, ConeBufferGeometry, CylinderGeometry, CylinderBufferGeometry, CircleGeometry, CircleBufferGeometry, BoxGeometry, BoxBufferGeometry */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony import */var _ConeGeometry__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./ConeGeometry */"./src/geometries/ConeGeometry.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ConeGeometry",function(){return _ConeGeometry__WEBPACK_IMPORTED_MODULE_0__["ConeGeometry"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ConeBufferGeometry",function(){return _ConeGeometry__WEBPACK_IMPORTED_MODULE_0__["ConeBufferGeometry"]});
/* harmony import */var _CylinderGeometry__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./CylinderGeometry */"./src/geometries/CylinderGeometry.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CylinderGeometry",function(){return _CylinderGeometry__WEBPACK_IMPORTED_MODULE_1__["CylinderGeometry"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CylinderBufferGeometry",function(){return _CylinderGeometry__WEBPACK_IMPORTED_MODULE_1__["CylinderBufferGeometry"]});
/* harmony import */var _CircleGeometry__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./CircleGeometry */"./src/geometries/CircleGeometry.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CircleGeometry",function(){return _CircleGeometry__WEBPACK_IMPORTED_MODULE_2__["CircleGeometry"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"CircleBufferGeometry",function(){return _CircleGeometry__WEBPACK_IMPORTED_MODULE_2__["CircleBufferGeometry"]});
/* harmony import */var _BoxGeometry__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./BoxGeometry */"./src/geometries/BoxGeometry.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"BoxGeometry",function(){return _BoxGeometry__WEBPACK_IMPORTED_MODULE_3__["BoxGeometry"]});
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"BoxBufferGeometry",function(){return _BoxGeometry__WEBPACK_IMPORTED_MODULE_3__["BoxBufferGeometry"]});
/*
export { WireframeGeometry } from './WireframeGeometry';
export { ParametricGeometry, ParametricBufferGeometry } from './ParametricGeometry';
export { TetrahedronGeometry, TetrahedronBufferGeometry } from './TetrahedronGeometry';
export { OctahedronGeometry, OctahedronBufferGeometry } from './OctahedronGeometry';
export { IcosahedronGeometry, IcosahedronBufferGeometry } from './IcosahedronGeometry';
export { DodecahedronGeometry, DodecahedronBufferGeometry } from './DodecahedronGeometry';
export { PolyhedronGeometry, PolyhedronBufferGeometry } from './PolyhedronGeometry';
export { TubeGeometry, TubeBufferGeometry } from './TubeGeometry';
export { TorusKnotGeometry, TorusKnotBufferGeometry } from './TorusKnotGeometry';
export { TorusGeometry, TorusBufferGeometry } from './TorusGeometry';
export { TextGeometry, TextBufferGeometry } from './TextGeometry';
export { SphereGeometry, SphereBufferGeometry } from './SphereGeometry';
export { RingGeometry, RingBufferGeometry } from './RingGeometry';
export { PlaneGeometry, PlaneBufferGeometry } from './PlaneGeometry';
export { LatheGeometry, LatheBufferGeometry } from './LatheGeometry';
export { ShapeGeometry, ShapeBufferGeometry } from './ShapeGeometry';
export { ExtrudeGeometry, ExtrudeBufferGeometry } from './ExtrudeGeometry';
export { EdgesGeometry } from './EdgesGeometry';
*/
/***/},
/***/"./src/lights/AmbientLight.ts":
/*!************************************!*\
  !*** ./src/lights/AmbientLight.ts ***!
  \************************************/
/*! exports provided: AmbientLight */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"AmbientLight",function(){return AmbientLight});
/* harmony import */var _Light__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Light */"./src/lights/Light.ts");class AmbientLight extends _Light__WEBPACK_IMPORTED_MODULE_0__["Light"]{constructor(color,intensity){super(color,intensity);this.type="AmbientLight";this.castShadow=false}}
/***/},
/***/"./src/lights/DirectionalLight.ts":
/*!****************************************!*\
  !*** ./src/lights/DirectionalLight.ts ***!
  \****************************************/
/*! exports provided: DirectionalLight */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"DirectionalLight",function(){return DirectionalLight});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");
/* harmony import */var _DirectionalLightShadow__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./DirectionalLightShadow */"./src/lights/DirectionalLightShadow.ts");
/* harmony import */var _Light__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./Light */"./src/lights/Light.ts");class DirectionalLight extends _Light__WEBPACK_IMPORTED_MODULE_2__["Light"]{constructor(color,intensity){super(color,intensity);this.type="DirectionalLight";this.target=new _core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"];this.shadow=new _DirectionalLightShadow__WEBPACK_IMPORTED_MODULE_1__["DirectionalLightShadow"];this.position=_core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"].DefaultUp.clone();this.updateMatrix()}copy(source){super.copy(source);this.target=source.target.clone();this.shadow=source.shadow.clone();return this}}
/***/},
/***/"./src/lights/DirectionalLightShadow.ts":
/*!**********************************************!*\
  !*** ./src/lights/DirectionalLightShadow.ts ***!
  \**********************************************/
/*! exports provided: DirectionalLightShadow */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"DirectionalLightShadow",function(){return DirectionalLightShadow});
/* harmony import */var _cameras_OrthographicCamera__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../cameras/OrthographicCamera */"./src/cameras/OrthographicCamera.ts");
/* harmony import */var _LightShadow__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./LightShadow */"./src/lights/LightShadow.ts");class DirectionalLightShadow extends _LightShadow__WEBPACK_IMPORTED_MODULE_1__["LightShadow"]{constructor(){super(new _cameras_OrthographicCamera__WEBPACK_IMPORTED_MODULE_0__["OrthographicCamera"](-5,5,5,-5,.5,500))}}
/***/},
/***/"./src/lights/HemisphereLight.ts":
/*!***************************************!*\
  !*** ./src/lights/HemisphereLight.ts ***!
  \***************************************/
/*! exports provided: HemisphereLight */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"HemisphereLight",function(){return HemisphereLight});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");
/* harmony import */var _Light__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Light */"./src/lights/Light.ts");class HemisphereLight extends _Light__WEBPACK_IMPORTED_MODULE_1__["Light"]{constructor(skyColor,groundColor,intensity){super(skyColor,intensity);this.type="HemisphereLight";this.castShadow=false;this.groundColor=groundColor;this.position=_core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"].DefaultUp.clone();this.updateMatrix()}copy(source){super.copy(source);this.groundColor.copy(source.groundColor);return this}}
/***/},
/***/"./src/lights/Light.ts":
/*!*****************************!*\
  !*** ./src/lights/Light.ts ***!
  \*****************************/
/*! exports provided: Light */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Light",function(){return Light});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");class Light extends _core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"]{constructor(color=new _math_Color__WEBPACK_IMPORTED_MODULE_1__["Color"],intensity=1){super();this.type="Light";this.intensity=1;this.receiveShadow=false;this.color=color;this.intensity=intensity}copy(source){super.copy(source);this.color.copy(source.color);this.intensity=source.intensity;return this}}
/***/},
/***/"./src/lights/LightShadow.ts":
/*!***********************************!*\
  !*** ./src/lights/LightShadow.ts ***!
  \***********************************/
/*! exports provided: LightShadow */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LightShadow",function(){return LightShadow});
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Vector2 */"./src/math/Vector2.ts");class LightShadow{constructor(camera){this.bias=0;this.radius=1;this.mapSize=new _math_Vector2__WEBPACK_IMPORTED_MODULE_1__["Vector2"](512,512);this.map=null;this.matrix=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__["Matrix4"];this.camera=camera}copy(source){this.camera=source.camera.clone();this.bias=source.bias;this.radius=source.radius;this.mapSize.copy(source.mapSize);return this}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/lights/PointLight.ts":
/*!**********************************!*\
  !*** ./src/lights/PointLight.ts ***!
  \**********************************/
/*! exports provided: PointLight */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"PointLight",function(){return PointLight});
/* harmony import */var _cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../cameras/PerspectiveCamera */"./src/cameras/PerspectiveCamera.ts");
/* harmony import */var _Light__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Light */"./src/lights/Light.ts");
/* harmony import */var _LightShadow__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./LightShadow */"./src/lights/LightShadow.ts");class PointLight extends _Light__WEBPACK_IMPORTED_MODULE_1__["Light"]{constructor(color,intensity,distance=0,decay=1){super(color,intensity);this.type="PointLight";this.distance=0;this.decay=1;this.distance=distance;this.decay=decay;this.shadow=new _LightShadow__WEBPACK_IMPORTED_MODULE_2__["LightShadow"](new _cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](90,1,.5,500))}
/**
     * ntensity = power per solid angle.
     * ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
     * @returns {number}
     */get power(){return this.intensity*4*Math.PI}set power(power){this.intensity=power/(4*Math.PI)}copy(source){super.copy(source);this.distance=source.distance;this.decay=source.decay;this.shadow=source.shadow.clone();return this}}
/***/},
/***/"./src/lights/RectAreaLight.ts":
/*!*************************************!*\
  !*** ./src/lights/RectAreaLight.ts ***!
  \*************************************/
/*! exports provided: RectAreaLight */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"RectAreaLight",function(){return RectAreaLight});
/* harmony import */var _Light__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Light */"./src/lights/Light.ts");class RectAreaLight extends _Light__WEBPACK_IMPORTED_MODULE_0__["Light"]{constructor(color,intensity,width=10,height=10){super(color,intensity);this.type="RectAreaLight";this.width=10;this.height=10;this.width=width;this.height=height}copy(source){super.copy(source);this.width=source.width;this.height=source.height;return this}}
/***/},
/***/"./src/lights/SpotLight.ts":
/*!*********************************!*\
  !*** ./src/lights/SpotLight.ts ***!
  \*********************************/
/*! exports provided: SpotLight */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SpotLight",function(){return SpotLight});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");
/* harmony import */var _Light__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Light */"./src/lights/Light.ts");
/* harmony import */var _SpotLightShadow__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./SpotLightShadow */"./src/lights/SpotLightShadow.ts");class SpotLight extends _Light__WEBPACK_IMPORTED_MODULE_1__["Light"]{constructor(color,intensity,distance=0,angle=Math.PI/3,penumbra=0,decay=1){super(color,intensity);this.type="SpotLight";this.target=new _core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"];this.distance=0;this.angle=Math.PI/3;this.penumbra=0;this.decay=0;this.position=_core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"].DefaultUp.clone();this.updateMatrix();this.distance=distance;this.angle=angle;this.penumbra=penumbra;this.decay=decay;this.shadow=new _SpotLightShadow__WEBPACK_IMPORTED_MODULE_2__["SpotLightShadow"]}get power(){return this.intensity*Math.PI}set power(power){this.intensity=power/Math.PI}copy(source){super.copy(source);this.distance=source.distance;this.angle=source.angle;this.penumbra=source.penumbra;this.decay=source.decay;this.target=source.target.clone();this.shadow=source.shadow.clone();return this}}
/***/},
/***/"./src/lights/SpotLightShadow.ts":
/*!***************************************!*\
  !*** ./src/lights/SpotLightShadow.ts ***!
  \***************************************/
/*! exports provided: SpotLightShadow */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SpotLightShadow",function(){return SpotLightShadow});
/* harmony import */var _cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../cameras/PerspectiveCamera */"./src/cameras/PerspectiveCamera.ts");
/* harmony import */var _math_Math__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Math */"./src/math/Math.ts");
/* harmony import */var _LightShadow__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./LightShadow */"./src/lights/LightShadow.ts");class SpotLightShadow extends _LightShadow__WEBPACK_IMPORTED_MODULE_2__["LightShadow"]{constructor(){super(new _cameras_PerspectiveCamera__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](50,1,.5,500))}update(light){const camera=this.camera;const fov=_math_Math__WEBPACK_IMPORTED_MODULE_1__["MathUtil"].RAD2DEG*2*light.angle;const aspect=this.mapSize.width/this.mapSize.height;const far=light.distance||camera.far;if(fov!==camera.fov||aspect!==camera.aspect||far!==camera.far){camera.fov=fov;camera.aspect=aspect;camera.far=far}return this}clone(){return super.clone()}}
/***/},
/***/"./src/materials/LineBasicMaterial.ts":
/*!********************************************!*\
  !*** ./src/materials/LineBasicMaterial.ts ***!
  \********************************************/
/*! exports provided: LineBasicMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LineBasicMaterial",function(){return LineBasicMaterial});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");class LineBasicMaterial extends _Material__WEBPACK_IMPORTED_MODULE_1__["Material"]{constructor(parameters){super();this.type="LineBasicMaterial";this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).setHex(16777215);this.lights=false;this.linecap="round";this.linejoin="round";this.linewidth=1;this.setValues(parameters)}copy(source){super.copy(source);this.color.copy(source.color);this.linewidth=source.linewidth;this.linecap=source.linecap;this.linejoin=source.linejoin;return this}}
/***/},
/***/"./src/materials/LineDashedMaterial.ts":
/*!*********************************************!*\
  !*** ./src/materials/LineDashedMaterial.ts ***!
  \*********************************************/
/*! exports provided: LineDashedMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LineDashedMaterial",function(){return LineDashedMaterial});
/* harmony import */var _LineBasicMaterial__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./LineBasicMaterial */"./src/materials/LineBasicMaterial.ts");class LineDashedMaterial extends _LineBasicMaterial__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"]{constructor(parameters){super(parameters);this.type="LineDashedMaterial";this.dashSize=3;this.gapSize=1;this.scale=1;this.setValues(parameters)}copy(source){this.scale=source.scale;this.dashSize=source.dashSize;this.gapSize=source.gapSize;return this}}
/***/},
/***/"./src/materials/Material.ts":
/*!***********************************!*\
  !*** ./src/materials/Material.ts ***!
  \***********************************/
/*! exports provided: Material */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Material",function(){return Material});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../constants */"./src/constants.ts");
/* harmony import */var _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../core/EventDispatcher */"./src/core/EventDispatcher.ts");
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _math_Math__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../math/Math */"./src/math/Math.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");let materialId=0;class Material extends _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__["EventDispatcher"]{constructor(){super(...arguments);this.id=materialId++;this.uuid=_math_Math__WEBPACK_IMPORTED_MODULE_3__["MathUtil"].generateUUID();this.type="Material";this.alphaTest=0;this.blending=_constants__WEBPACK_IMPORTED_MODULE_0__["NormalBlending"];this.blendDst=_constants__WEBPACK_IMPORTED_MODULE_0__["OneMinusSrcAlphaFactor"];this.blendDstAlpha=null;this.blendEquation=_constants__WEBPACK_IMPORTED_MODULE_0__["AddEquation"];this.blendEquationAlpha=null;this.blendSrc=_constants__WEBPACK_IMPORTED_MODULE_0__["SrcAlphaFactor"];this.blendSrcAlpha=null;this.clipIntersection=false;this.clippingPlanes=null;this.clipShadows=false;this.colorWrite=true;this.depthFunc=_constants__WEBPACK_IMPORTED_MODULE_0__["LessEqualDepth"];this.depthTest=true;this.depthWrite=true;this.dithering=false;this.flatShading=false;this.fog=true;this.lights=true;
/**
         * For mesh type extension
         */this.morphTargets=false;this.name="";this.needsUpdate=true;this.opacity=1;this.overdraw=0;this.polygonOffset=false;this.polygonOffsetFactor=0;this.polygonOffsetUnits=0;this.premultipliedAlpha=false;this.side=_constants__WEBPACK_IMPORTED_MODULE_0__["FrontSide"];this.transparent=false;this.userData={};
/**
         * THREE.NoColors, THREE.VertexColors, THREE.FaceColors
         */this.vertexColors=_constants__WEBPACK_IMPORTED_MODULE_0__["NoColors"];
/**
         * Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer
         * @type {number}
         */this.visible=true}setValues(values){if(values===undefined)return this;for(const key in values){if(!values.hasOwnProperty(key))continue;const newValue=values[key];if(newValue===undefined){console.warn(`THREE.Material: "${key}" parameter is undefined.`);continue}
/**
             * for backward compatability if shading is set in the constructor
             */if(key==="shading"){console.warn(`THREE.${this.type}: .shading has been removed. Use the boolean .flatShading instead.`);this.flatShading=newValue===_constants__WEBPACK_IMPORTED_MODULE_0__["FlatShading"];continue}const currentValue=this[key];if(currentValue===undefined){console.warn(`THREE.${this.type}: "${key}" is not a property of this material.`);continue}if(currentValue&&currentValue instanceof _math_Color__WEBPACK_IMPORTED_MODULE_2__["Color"]){if(newValue instanceof _math_Color__WEBPACK_IMPORTED_MODULE_2__["Color"])currentValue.copy(newValue);else if(typeof newValue==="number"){currentValue.setHex(newValue)}else if(typeof newValue==="string"){currentValue.setStyle(newValue)}}else if(currentValue&&currentValue instanceof _math_Vector3__WEBPACK_IMPORTED_MODULE_4__["Vector3"]&&(newValue&&newValue instanceof _math_Vector3__WEBPACK_IMPORTED_MODULE_4__["Vector3"])){currentValue.copy(newValue)}else if(key==="overdraw"){
/**
                 * ensure overdraw is backwards-compatible with legacy boolean type
                 * @type {Number}
                 */
this[key]=Number(newValue)}else{this[key]=newValue}}return this}clone(){return(new this.constructor).copy(this)}copy(source){this.name=source.name;this.fog=source.fog;this.lights=source.lights;this.blending=source.blending;this.side=source.side;this.flatShading=source.flatShading;this.vertexColors=source.vertexColors;this.opacity=source.opacity;this.transparent=source.transparent;this.blendSrc=source.blendSrc;this.blendDst=source.blendDst;this.blendEquation=source.blendEquation;this.blendSrcAlpha=source.blendSrcAlpha;this.blendDstAlpha=source.blendDstAlpha;this.blendEquationAlpha=source.blendEquationAlpha;this.depthFunc=source.depthFunc;this.depthTest=source.depthTest;this.depthWrite=source.depthWrite;this.colorWrite=source.colorWrite;this.precision=source.precision;this.polygonOffset=source.polygonOffset;this.polygonOffsetFactor=source.polygonOffsetFactor;this.polygonOffsetUnits=source.polygonOffsetUnits;this.dithering=source.dithering;this.alphaTest=source.alphaTest;this.premultipliedAlpha=source.premultipliedAlpha;this.overdraw=source.overdraw;this.visible=source.visible;this.userData=JSON.parse(JSON.stringify(source.userData));this.clipShadows=source.clipShadows;this.clipIntersection=source.clipIntersection;const srcPlanes=source.clippingPlanes;let dstPlanes=null;if(srcPlanes!==null){const n=srcPlanes.length;dstPlanes=new Array(n);for(let i=0;i!==n;++i){dstPlanes[i]=srcPlanes[i].clone()}}this.clippingPlanes=dstPlanes;this.shadowSide=source.shadowSide;return this}dispose(){this.dispatchEvent({type:"dispose"})}}
/***/},
/***/"./src/materials/Materials.ts":
/*!************************************!*\
  !*** ./src/materials/Materials.ts ***!
  \************************************/
/*! exports provided: ShadowMaterial, SpriteMaterial, ShaderMaterial, PointsMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshToonMaterial, MeshNormalMaterial, MeshLambertMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshBasicMaterial, LineDashedMaterial, LineBasicMaterial, Material */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony import */var _ShadowMaterial__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./ShadowMaterial */"./src/materials/ShadowMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ShadowMaterial",function(){return _ShadowMaterial__WEBPACK_IMPORTED_MODULE_0__["ShadowMaterial"]});
/* harmony import */var _SpriteMaterial__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./SpriteMaterial */"./src/materials/SpriteMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"SpriteMaterial",function(){return _SpriteMaterial__WEBPACK_IMPORTED_MODULE_1__["SpriteMaterial"]});
/* harmony import */var _ShaderMaterial__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./ShaderMaterial */"./src/materials/ShaderMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"ShaderMaterial",function(){return _ShaderMaterial__WEBPACK_IMPORTED_MODULE_2__["ShaderMaterial"]});
/* harmony import */var _PointsMaterial__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./PointsMaterial */"./src/materials/PointsMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"PointsMaterial",function(){return _PointsMaterial__WEBPACK_IMPORTED_MODULE_3__["PointsMaterial"]});
/* harmony import */var _MeshPhysicalMaterial__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./MeshPhysicalMaterial */"./src/materials/MeshPhysicalMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshPhysicalMaterial",function(){return _MeshPhysicalMaterial__WEBPACK_IMPORTED_MODULE_4__["MeshPhysicalMaterial"]});
/* harmony import */var _MeshStandardMaterial__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ./MeshStandardMaterial */"./src/materials/MeshStandardMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshStandardMaterial",function(){return _MeshStandardMaterial__WEBPACK_IMPORTED_MODULE_5__["MeshStandardMaterial"]});
/* harmony import */var _MeshPhongMaterial__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ./MeshPhongMaterial */"./src/materials/MeshPhongMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshPhongMaterial",function(){return _MeshPhongMaterial__WEBPACK_IMPORTED_MODULE_6__["MeshPhongMaterial"]});
/* harmony import */var _MeshToonMaterial__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! ./MeshToonMaterial */"./src/materials/MeshToonMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshToonMaterial",function(){return _MeshToonMaterial__WEBPACK_IMPORTED_MODULE_7__["MeshToonMaterial"]});
/* harmony import */var _MeshNormalMaterial__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(/*! ./MeshNormalMaterial */"./src/materials/MeshNormalMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshNormalMaterial",function(){return _MeshNormalMaterial__WEBPACK_IMPORTED_MODULE_8__["MeshNormalMaterial"]});
/* harmony import */var _MeshLambertMaterial__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(/*! ./MeshLambertMaterial */"./src/materials/MeshLambertMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshLambertMaterial",function(){return _MeshLambertMaterial__WEBPACK_IMPORTED_MODULE_9__["MeshLambertMaterial"]});
/* harmony import */var _MeshDepthMaterial__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(/*! ./MeshDepthMaterial */"./src/materials/MeshDepthMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshDepthMaterial",function(){return _MeshDepthMaterial__WEBPACK_IMPORTED_MODULE_10__["MeshDepthMaterial"]});
/* harmony import */var _MeshDistanceMaterial__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(/*! ./MeshDistanceMaterial */"./src/materials/MeshDistanceMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshDistanceMaterial",function(){return _MeshDistanceMaterial__WEBPACK_IMPORTED_MODULE_11__["MeshDistanceMaterial"]});
/* harmony import */var _MeshBasicMaterial__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(/*! ./MeshBasicMaterial */"./src/materials/MeshBasicMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"MeshBasicMaterial",function(){return _MeshBasicMaterial__WEBPACK_IMPORTED_MODULE_12__["MeshBasicMaterial"]});
/* harmony import */var _LineDashedMaterial__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(/*! ./LineDashedMaterial */"./src/materials/LineDashedMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LineDashedMaterial",function(){return _LineDashedMaterial__WEBPACK_IMPORTED_MODULE_13__["LineDashedMaterial"]});
/* harmony import */var _LineBasicMaterial__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(/*! ./LineBasicMaterial */"./src/materials/LineBasicMaterial.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"LineBasicMaterial",function(){return _LineBasicMaterial__WEBPACK_IMPORTED_MODULE_14__["LineBasicMaterial"]});
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");
/* harmony reexport (safe) */__webpack_require__.d(__webpack_exports__,"Material",function(){return _Material__WEBPACK_IMPORTED_MODULE_15__["Material"]});
/***/},
/***/"./src/materials/MeshBasicMaterial.ts":
/*!********************************************!*\
  !*** ./src/materials/MeshBasicMaterial.ts ***!
  \********************************************/
/*! exports provided: MeshBasicMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MeshBasicMaterial",function(){return MeshBasicMaterial});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../constants */"./src/constants.ts");
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");class MeshBasicMaterial extends _Material__WEBPACK_IMPORTED_MODULE_2__["Material"]{constructor(parameters){super();this.type="MeshBasicMaterial";this.alphaMap=null;this.aoMap=null;this.aoMapIntensity=1;this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_1__["Color"]).setHex(16777215);this.combine=_constants__WEBPACK_IMPORTED_MODULE_0__["MultiplyOperation"];this.envMap=null;this.lights=false;this.lightMap=null;this.lightMapIntensity=1;this.map=null;this.morphTargets=false;this.reflectivity=1;this.refractionRatio=.98;this.skinning=false;this.specularMap=null;this.wireframe=false;this.wireframeLinecap="round";this.wireframeLinejoin="round";this.wireframeLinewidth=1;this.setValues(parameters)}copy(source){super.copy(source);this.color.copy(source.color);this.map=source.map;this.lightMap=source.lightMap;this.lightMapIntensity=source.lightMapIntensity;this.aoMap=source.aoMap;this.aoMapIntensity=source.aoMapIntensity;this.specularMap=source.specularMap;this.alphaMap=source.alphaMap;this.envMap=source.envMap;this.combine=source.combine;this.reflectivity=source.reflectivity;this.refractionRatio=source.refractionRatio;this.wireframe=source.wireframe;this.wireframeLinewidth=source.wireframeLinewidth;this.wireframeLinecap=source.wireframeLinecap;this.wireframeLinejoin=source.wireframeLinejoin;this.skinning=source.skinning;this.morphTargets=source.morphTargets;return this}}
/***/},
/***/"./src/materials/MeshDepthMaterial.ts":
/*!********************************************!*\
  !*** ./src/materials/MeshDepthMaterial.ts ***!
  \********************************************/
/*! exports provided: MeshDepthMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MeshDepthMaterial",function(){return MeshDepthMaterial});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../constants */"./src/constants.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");class MeshDepthMaterial extends _Material__WEBPACK_IMPORTED_MODULE_1__["Material"]{constructor(parameters){super();this.type="MeshDepthMaterial";this.alphaMap=null;this.depthPacking=_constants__WEBPACK_IMPORTED_MODULE_0__["BasicDepthPacking"];this.displacementMap=null;this.displacementScale=1;this.displacementBias=0;this.fog=false;this.lights=false;this.map=null;this.morphTargets=false;this.skinning=false;this.wireframe=false;this.wireframeLinewidth=1;this.setValues(parameters)}copy(source){super.copy(source);this.depthPacking=source.depthPacking;this.skinning=source.skinning;this.morphTargets=source.morphTargets;this.map=source.map;this.alphaMap=source.alphaMap;this.displacementMap=source.displacementMap;this.displacementScale=source.displacementScale;this.displacementBias=source.displacementBias;this.wireframe=source.wireframe;this.wireframeLinewidth=source.wireframeLinewidth;return this}}
/***/},
/***/"./src/materials/MeshDistanceMaterial.ts":
/*!***********************************************!*\
  !*** ./src/materials/MeshDistanceMaterial.ts ***!
  \***********************************************/
/*! exports provided: MeshDistanceMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MeshDistanceMaterial",function(){return MeshDistanceMaterial});
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");class MeshDistanceMaterial extends _Material__WEBPACK_IMPORTED_MODULE_1__["Material"]{constructor(parameters){super();this.type="MeshDepthMaterial";this.alphaMap=null;this.displacementMap=null;this.displacementScale=1;this.displacementBias=0;this.farDistance=1;this.fog=false;this.lights=false;this.map=null;this.morphTargets=false;this.nearDistance=1;this.referencePosition=new _math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"];this.skinning=false;this.setValues(parameters)}copy(source){super.copy(source);this.referencePosition.copy(source.referencePosition);this.nearDistance=source.nearDistance;this.farDistance=source.farDistance;this.skinning=source.skinning;this.morphTargets=source.morphTargets;this.map=source.map;this.alphaMap=source.alphaMap;this.displacementMap=source.displacementMap;this.displacementScale=source.displacementScale;this.displacementBias=source.displacementBias;return this}}
/***/},
/***/"./src/materials/MeshLambertMaterial.ts":
/*!**********************************************!*\
  !*** ./src/materials/MeshLambertMaterial.ts ***!
  \**********************************************/
/*! exports provided: MeshLambertMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MeshLambertMaterial",function(){return MeshLambertMaterial});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../constants */"./src/constants.ts");
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");class MeshLambertMaterial extends _Material__WEBPACK_IMPORTED_MODULE_2__["Material"]{constructor(parameters){super();this.type="MeshLambertMaterial";this.aoMap=null;this.aoMapIntensity=1;this.alphaMap=null;this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_1__["Color"]).setHex(16777215);this.combine=_constants__WEBPACK_IMPORTED_MODULE_0__["MultiplyOperation"];this.emissive=(new _math_Color__WEBPACK_IMPORTED_MODULE_1__["Color"]).setHex(0);this.emissiveIntensity=1;this.emissiveMap=null;this.envMap=null;this.map=null;this.morphNormals=true;this.morphTargets=true;this.lightMap=null;this.lightMapIntensity=1;this.skinning=false;this.specularMap=null;this.reflectivity=1;this.refractionRatio=.98;this.wireframe=false;this.wireframeLinecap="round";this.wireframeLinejoin="round";this.wireframeLinewidth=1;this.setValues(parameters)}copy(source){super.copy(source);this.color.copy(source.color);this.map=source.map;this.lightMap=source.lightMap;this.lightMapIntensity=source.lightMapIntensity;this.aoMap=source.aoMap;this.aoMapIntensity=source.aoMapIntensity;this.emissive.copy(source.emissive);this.emissiveMap=source.emissiveMap;this.emissiveIntensity=source.emissiveIntensity;this.specularMap=source.specularMap;this.alphaMap=source.alphaMap;this.envMap=source.envMap;this.combine=source.combine;this.reflectivity=source.reflectivity;this.refractionRatio=source.refractionRatio;this.wireframe=source.wireframe;this.wireframeLinewidth=source.wireframeLinewidth;this.wireframeLinecap=source.wireframeLinecap;this.wireframeLinejoin=source.wireframeLinejoin;this.skinning=source.skinning;this.morphTargets=source.morphTargets;this.morphNormals=source.morphNormals;return this}}
/***/},
/***/"./src/materials/MeshNormalMaterial.ts":
/*!*********************************************!*\
  !*** ./src/materials/MeshNormalMaterial.ts ***!
  \*********************************************/
/*! exports provided: MeshNormalMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MeshNormalMaterial",function(){return MeshNormalMaterial});
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Vector2 */"./src/math/Vector2.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");class MeshNormalMaterial extends _Material__WEBPACK_IMPORTED_MODULE_1__["Material"]{constructor(paramenters){super();this.type="MeshNormalMaterial";this.bumpMap=null;this.bumpScale=1;this.normalMap=null;this.normalScale=new _math_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"](1,1);this.displacementMap=null;this.displacementScale=1;this.displacementBias=0;this.wireframe=false;this.wireframeLinewidth=1;this.fog=false;this.lights=false;this.skinning=false;this.morphTargets=false;this.morphNormals=false;this.setValues(paramenters)}}
/***/},
/***/"./src/materials/MeshPhongMaterial.ts":
/*!********************************************!*\
  !*** ./src/materials/MeshPhongMaterial.ts ***!
  \********************************************/
/*! exports provided: MeshPhongMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MeshPhongMaterial",function(){return MeshPhongMaterial});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../constants */"./src/constants.ts");
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Vector2 */"./src/math/Vector2.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");
/**
 * parameters = {
 *  color: <hex>,
 *  specular: <hex>,
 *  shininess: <float>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  emissive: <hex>,
 *  emissiveIntensity: <float>
 *  emissiveMap: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalScale: <Vector2>,
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>,
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */class MeshPhongMaterial extends _Material__WEBPACK_IMPORTED_MODULE_3__["Material"]{constructor(parameters){super();this.type="MeshPhongMaterial";this.alphaMap=null;this.aoMap=null;this.aoMapIntensity=1;this.bumpMap=null;this.bumpScale=1;this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_1__["Color"]).setHex(16777215);this.combine=_constants__WEBPACK_IMPORTED_MODULE_0__["MultiplyOperation"];this.displacementBias=0;this.displacementMap=null;this.displacementScale=1;this.emissive=(new _math_Color__WEBPACK_IMPORTED_MODULE_1__["Color"]).setHex(0);this.emissiveIntensity=1;this.emissiveMap=null;this.envMap=null;this.lightMap=null;this.lightMapIntensity=1;this.map=null;this.morphNormals=false;this.morphTargets=false;this.normalMap=null;this.normalScale=new _math_Vector2__WEBPACK_IMPORTED_MODULE_2__["Vector2"](1,1);this.reflectivity=1;this.refractionRatio=.98;this.shininess=30;this.skinning=false;this.specular=(new _math_Color__WEBPACK_IMPORTED_MODULE_1__["Color"]).setHex(1118481);this.specularMap=null;this.wireframe=false;this.wireframeLinecap="round";this.wireframeLinejoin="round";this.wireframeLinewidth=1;this.setValues(parameters)}copy(source){super.copy(source);this.color.copy(source.color);this.specular.copy(source.specular);this.shininess=source.shininess;this.map=source.map;this.lightMap=source.lightMap;this.lightMapIntensity=source.lightMapIntensity;this.aoMap=source.aoMap;this.aoMapIntensity=source.aoMapIntensity;this.emissive.copy(source.emissive);this.emissiveMap=source.emissiveMap;this.emissiveIntensity=source.emissiveIntensity;this.bumpMap=source.bumpMap;this.bumpScale=source.bumpScale;this.normalMap=source.normalMap;this.normalScale.copy(source.normalScale);this.displacementMap=source.displacementMap;this.displacementScale=source.displacementScale;this.displacementBias=source.displacementBias;this.specularMap=source.specularMap;this.alphaMap=source.alphaMap;this.envMap=source.envMap;this.combine=source.combine;this.reflectivity=source.reflectivity;this.refractionRatio=source.refractionRatio;this.wireframe=source.wireframe;this.wireframeLinewidth=source.wireframeLinewidth;this.wireframeLinecap=source.wireframeLinecap;this.wireframeLinejoin=source.wireframeLinejoin;this.skinning=source.skinning;this.morphTargets=source.morphTargets;this.morphNormals=source.morphNormals;return this}}
/***/},
/***/"./src/materials/MeshPhysicalMaterial.ts":
/*!***********************************************!*\
  !*** ./src/materials/MeshPhysicalMaterial.ts ***!
  \***********************************************/
/*! exports provided: MeshPhysicalMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MeshPhysicalMaterial",function(){return MeshPhysicalMaterial});
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");class MeshPhysicalMaterial extends _Material__WEBPACK_IMPORTED_MODULE_0__["Material"]{constructor(parameters){super();this.type="MeshPhysicalMaterial";
// maps to F0 = 0.04
this.clearCoat=0;this.clearCoatRoughness=0;this.defines={PHYSICAL:""};this.reflectivity=.5;this.setValues(parameters)}copy(source){this.defines={PHYSICAL:""};this.reflectivity=source.reflectivity;this.clearCoat=source.clearCoat;this.clearCoatRoughness=source.clearCoatRoughness;return this}}
/***/},
/***/"./src/materials/MeshStandardMaterial.ts":
/*!***********************************************!*\
  !*** ./src/materials/MeshStandardMaterial.ts ***!
  \***********************************************/
/*! exports provided: MeshStandardMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MeshStandardMaterial",function(){return MeshStandardMaterial});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Vector2 */"./src/math/Vector2.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");
/**
 *
 * parameters = {
 *  color: <hex>,
 *  roughness: <float>,
 *  metalness: <float>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  emissive: <hex>,
 *  emissiveIntensity: <float>
 *  emissiveMap: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalScale: <Vector2>,
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>,
 *
 *  roughnessMap: new THREE.Texture( <Image> ),
 *
 *  metalnessMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
 *  envMapIntensity: <float>
 *
 *  refractionRatio: <float>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */class MeshStandardMaterial extends _Material__WEBPACK_IMPORTED_MODULE_2__["Material"]{constructor(parameters){super();this.type="MeshStandardMaterial";this.alphaMap=null;this.aoMap=null;this.aoMapIntensity=1;this.bumpMap=null;this.bumpScale=1;this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).setHex(16777215);this.defines={STANDARD:""};this.displacementBias=0;this.displacementMap=null;this.displacementScale=1;this.emissive=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).setHex(0);this.emissiveIntensity=1;this.emissiveMap=null;this.envMap=null;this.envMapIntensity=1;this.lightMap=null;this.lightMapIntensity=1;this.map=null;this.metalness=.5;this.metalnessMap=null;this.morphNormals=false;this.morphTargets=false;this.normalMap=null;this.normalScale=new _math_Vector2__WEBPACK_IMPORTED_MODULE_1__["Vector2"](1,1);this.refractionRatio=.98;this.roughness=.5;this.roughnessMap=null;this.skinning=false;this.wireframe=false;this.wireframeLinecap="round";this.wireframeLinejoin="round";this.wireframeLinewidth=1;this.setValues(parameters)}copy(source){super.copy(source);this.defines={STANDARD:""};this.color.copy(source.color);this.roughness=source.roughness;this.metalness=source.metalness;this.map=source.map;this.lightMap=source.lightMap;this.lightMapIntensity=source.lightMapIntensity;this.aoMap=source.aoMap;this.aoMapIntensity=source.aoMapIntensity;this.emissive.copy(source.emissive);this.emissiveMap=source.emissiveMap;this.emissiveIntensity=source.emissiveIntensity;this.bumpMap=source.bumpMap;this.bumpScale=source.bumpScale;this.normalMap=source.normalMap;this.normalScale.copy(source.normalScale);this.displacementMap=source.displacementMap;this.displacementScale=source.displacementScale;this.displacementBias=source.displacementBias;this.roughnessMap=source.roughnessMap;this.metalnessMap=source.metalnessMap;this.alphaMap=source.alphaMap;this.envMap=source.envMap;this.envMapIntensity=source.envMapIntensity;this.refractionRatio=source.refractionRatio;this.wireframe=source.wireframe;this.wireframeLinewidth=source.wireframeLinewidth;this.wireframeLinecap=source.wireframeLinecap;this.wireframeLinejoin=source.wireframeLinejoin;this.skinning=source.skinning;this.morphTargets=source.morphTargets;this.morphNormals=source.morphNormals;return this}}
/***/},
/***/"./src/materials/MeshToonMaterial.ts":
/*!*******************************************!*\
  !*** ./src/materials/MeshToonMaterial.ts ***!
  \*******************************************/
/*! exports provided: MeshToonMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MeshToonMaterial",function(){return MeshToonMaterial});
/* harmony import */var _MeshPhongMaterial__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./MeshPhongMaterial */"./src/materials/MeshPhongMaterial.ts");class MeshToonMaterial extends _MeshPhongMaterial__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]{constructor(parameters){super(parameters);this.type="MeshToonMaterial";this.defines={TOON:""};this.gradientMap=null;this.setValues(parameters)}copy(source){super.copy(source);this.gradientMap=source.gradientMap;return this}}
/***/},
/***/"./src/materials/PointsMaterial.ts":
/*!*****************************************!*\
  !*** ./src/materials/PointsMaterial.ts ***!
  \*****************************************/
/*! exports provided: PointsMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"PointsMaterial",function(){return PointsMaterial});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");class PointsMaterial extends _Material__WEBPACK_IMPORTED_MODULE_1__["Material"]{constructor(parameters){super();this.type="PointsMaterial";this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).setHex(16777215);this.lights=false;this.map=null;this.size=1;this.sizeAttenuation=true;this.setValues(parameters)}copy(source){super.copy(source);this.color.copy(source.color);this.map=source.map;this.size=source.size;this.sizeAttenuation=source.sizeAttenuation;return this}}
/***/},
/***/"./src/materials/ShaderMaterial.ts":
/*!*****************************************!*\
  !*** ./src/materials/ShaderMaterial.ts ***!
  \*****************************************/
/*! exports provided: ShaderMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ShaderMaterial",function(){return ShaderMaterial});
/* harmony import */var _renderers_shaders_UniformsUtils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../renderers/shaders/UniformsUtils */"./src/renderers/shaders/UniformsUtils.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");class ShaderMaterial extends _Material__WEBPACK_IMPORTED_MODULE_1__["Material"]{constructor(parameters){super();this.type="ShaderMaterial";this.defines={};this.uniforms={};this.vertexShader=`void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}`;this.fragmentShader="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";this.linewidth=1;this.wireframe=false;this.wireframeLinewidth=1;this.fog=false;// set to use scene fog
this.lights=false;// set to use scene lights
this.clipping=false;// set to use user-defined clipping planes
this.skinning=false;// set to use skinning attribute streams
this.morphTargets=false;// set to use morph targets
this.morphNormals=false;// set to use morph normals
this.extensions={derivatives:false,drawBuffers:false,fragDepth:false,shaderTextureLOD:false};
// When rendered geometry doesn't include these attributes but the material does,
// use these default values in WebGL. This avoids errors when buffer data is missing.
this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]};this.setValues(parameters)}copy(source){this.fragmentShader=source.fragmentShader;this.vertexShader=source.vertexShader;this.uniforms=_renderers_shaders_UniformsUtils__WEBPACK_IMPORTED_MODULE_0__["UniformsUtils"].clone(source.uniforms);this.defines=source.defines;this.wireframe=source.wireframe;this.wireframeLinewidth=source.wireframeLinewidth;this.lights=source.lights;this.clipping=source.clipping;this.skinning=source.skinning;this.morphTargets=source.morphTargets;this.morphNormals=source.morphNormals;this.extensions=source.extensions;return this}}
/***/},
/***/"./src/materials/ShadowMaterial.ts":
/*!*****************************************!*\
  !*** ./src/materials/ShadowMaterial.ts ***!
  \*****************************************/
/*! exports provided: ShadowMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ShadowMaterial",function(){return ShadowMaterial});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");class ShadowMaterial extends _Material__WEBPACK_IMPORTED_MODULE_1__["Material"]{constructor(parameters){super();this.type="ShadowMaterial";this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).setHex(0);this.transparent=true;this.setValues(parameters)}copy(source){super.copy(source);this.color.copy(source.color);return this}}
/***/},
/***/"./src/materials/SpriteMaterial.ts":
/*!*****************************************!*\
  !*** ./src/materials/SpriteMaterial.ts ***!
  \*****************************************/
/*! exports provided: SpriteMaterial */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SpriteMaterial",function(){return SpriteMaterial});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");
/* harmony import */var _Material__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Material */"./src/materials/Material.ts");class SpriteMaterial extends _Material__WEBPACK_IMPORTED_MODULE_1__["Material"]{constructor(parameters){super();this.type="SpriteMaterial";this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).setHex(16777215);this.fog=false;this.lights=false;this.map=null;this.rotation=0;this.setValues(parameters)}copy(source){super.copy(source);this.color.copy(source.color);this.map=source.map;this.rotation=source.rotation;return this}}
/***/},
/***/"./src/math/Box3.ts":
/*!**************************!*\
  !*** ./src/math/Box3.ts ***!
  \**************************/
/*! exports provided: Box3 */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Box3",function(){return Box3});
/* harmony import */var _Sphere__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Sphere */"./src/math/Sphere.ts");
/* harmony import */var _Vector3__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../utils */"./src/utils.ts");
/* harmony import */var _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../core/BufferGeometry */"./src/core/BufferGeometry.ts");
/* harmony import */var _core_Geometry__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../core/Geometry */"./src/core/Geometry.ts");class Box3{constructor(min=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"](+Infinity,+Infinity,+Infinity),max=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"](-Infinity,-Infinity,-Infinity)){this.min=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"](+Infinity,+Infinity,+Infinity);this.max=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"](-Infinity,-Infinity,-Infinity);this.max=max;this.min=min}set(min,max){this.min.copy(min);this.max.copy(max);return this}setFromArray(array){let minX=+Infinity,minY=+Infinity,minZ=+Infinity;let maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;for(let i=0,l=array.length;i<l;i+=3){const x=array[i],y=array[i+1],z=array[i+2];if(x<minX)minX=x;if(y<minY)minY=y;if(z<minZ)minZ=z;if(x>maxX)maxX=x;if(y>maxY)maxY=y;if(z>maxZ)maxZ=z}this.min.set(minX,minY,minZ);this.max.set(maxX,maxY,maxZ);return this}setFromPoints(points){this.makeEmpty();for(let i=0,il=points.length;i<il;i++){this.expandByPoint(points[i])}return this}setFromCenterAndSize(center,size){const halfSize=(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).copy(size).multiplyScalar(.5);this.min.copy(center).sub(halfSize);this.max.copy(center).add(halfSize);return this}setFromObject(object){this.makeEmpty();return this.expandByObject(object)}clone(){return(new this.constructor).copy(this)}copy(box){this.min.copy(box.min);this.max.copy(box.max);return this}makeEmpty(){this.min.x=this.min.y=this.min.z=+Infinity;this.max.x=this.max.y=this.max.z=-Infinity;return this}
/**
     * this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
     * @returns {boolean}
     */isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(){const result=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];return this.isEmpty()?result.set(0,0,0):result.copy(this.min).add(this.max).multiplyScalar(.5)}getSize(){const result=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];return this.isEmpty()?result.set(0,0,0):result.copy(this.max).sub(this.min)}expandByPoint(point){this.min.min(point);this.max.max(point);return this}expandByVector(vector){this.min.sub(vector);this.max.add(vector);return this}expandByScalar(scalar){this.min.addScalar(-scalar);this.max.addScalar(scalar);return this}
/**
     * TODO expandByObject
     * @param object
     * @returns {Box3}
     */expandByObject(object){
// Computes the world-axis-aligned bounding box of an object (including its children),
// accounting for both the object's, and children's, world transforms
const traverse=node=>{const geometry=node.geometry;if(geometry!==undefined){if(geometry instanceof _core_Geometry__WEBPACK_IMPORTED_MODULE_4__["Geometry"]){const vertices=geometry.vertices;for(let i=0,l=vertices.length;i<l;i++){const v1=(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).copy(vertices[i]);v1.applyMatrix4(node.matrixWorld);this.expandByPoint(v1)}}else if(geometry instanceof _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_3__["BufferGeometry"]){const attribute=geometry.attributes.position;if(attribute!==undefined){for(let i=0,l=attribute.count;i<l;i++){const v1=Object(_utils__WEBPACK_IMPORTED_MODULE_2__["vectorFromBufferAttribute"])(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"],attribute,i).applyMatrix4(node.matrixWorld);this.expandByPoint(v1)}}}}};object.updateMatrixWorld(true);object.traverse(traverse);return this}containsPoint(point){return!(point.x<this.min.x||point.x>this.max.x||point.y<this.min.y||point.y>this.max.y||point.z<this.min.z||point.z>this.max.z)}containsBox(box){return this.min.x<=box.min.x&&box.max.x<=this.max.x&&this.min.y<=box.min.y&&box.max.y<=this.max.y&&this.min.z<=box.min.z&&box.max.z<=this.max.z}
/**
     * This can potentially have a divide by zero if the box has a size dimension of 0.
     * @param point
     * @returns {Vector3}
     */getParameter(point){const result=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];return result.set((point.x-this.min.x)/(this.max.x-this.min.x),(point.y-this.min.y)/(this.max.y-this.min.y),(point.z-this.min.z)/(this.max.z-this.min.z))}
/**
     * using 6 splitting planes to rule out intersections
     * @param box
     * @returns {boolean}
     */intersectsBox(box){return!(box.max.x<this.min.x||box.min.x>this.max.x||box.max.y<this.min.y||box.min.y>this.max.y||box.max.z<this.min.z||box.min.z>this.max.z)}
/**
     * Find the point on the AABB closest to the sphere center.
     * If that point is inside the sphere, the AABB and sphere intersect.
     * @param sphere
     * @returns {boolean}
     */intersectsSphere(sphere){const closestPoint=this.clampPoint(sphere.center);return closestPoint.distanceToSquared(sphere.center)<=sphere.radius*sphere.radius}
/**
     * We compute the minimum and maximum dot product values. If those values
     * are on the same side (back or front) of the plane, then there is no intersection.
     * @param plane
     * @returns {boolean}
     */intersectsPlane(plane){let min,max;if(plane.normal.x>0){min=plane.normal.x*this.min.x;max=plane.normal.x*this.max.x}else{min=plane.normal.x*this.max.x;max=plane.normal.x*this.min.x}if(plane.normal.y>0){min+=plane.normal.y*this.min.y;max+=plane.normal.y*this.max.y}else{min+=plane.normal.y*this.max.y;max+=plane.normal.y*this.min.y}if(plane.normal.z>0){min+=plane.normal.z*this.min.z;max+=plane.normal.z*this.max.z}else{min+=plane.normal.z*this.max.z;max+=plane.normal.z*this.min.z}return min<=plane.constant&&max>=plane.constant}clampPoint(point){return(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).copy(point).clamp(this.min,this.max)}distanceToPoint(point){const clampedPoint=(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).copy(point).clamp(this.min,this.max);return clampedPoint.sub(point).length()}getBoundingSphere(){const result=new _Sphere__WEBPACK_IMPORTED_MODULE_0__["Sphere"];result.center=this.getCenter();result.radius=this.getSize().length()*.5;return result}intersect(box){this.min.max(box.min);this.max.min(box.max);
// ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
if(this.isEmpty())this.makeEmpty();return this}union(box){this.min.min(box.min);this.max.max(box.max);return this}applyMatrix4(matrix){
// transform of empty box is an empty box.
if(this.isEmpty())return this;const points=[new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"],new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"],new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"],new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"],new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"],new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"],new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"],new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]];
// NOTE: I am using a binary pattern to specify all 2^3 combinations below
points[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(matrix);// 000
points[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(matrix);// 001
points[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(matrix);// 010
points[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(matrix);// 011
points[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(matrix);// 100
points[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(matrix);// 101
points[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(matrix);// 110
points[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(matrix);// 111
this.setFromPoints(points);return this}translate(offset){this.min.add(offset);this.max.add(offset);return this}equals(box){return box.min.equals(this.min)&&box.max.equals(this.max)}}
/***/},
/***/"./src/math/Color.ts":
/*!***************************!*\
  !*** ./src/math/Color.ts ***!
  \***************************/
/*! exports provided: Color */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Color",function(){return Color});
/* harmony import */var _Math__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Math */"./src/math/Math.ts");function HUE_TO_RGB(p,q,t){if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*6*(2/3-t);return p}class Color{constructor(r=0,g=0,b=0){this.r=1;this.g=1;this.b=1;this.setRGB(r,g,b)}copy(color){this.r=color.r;this.g=color.g;this.b=color.b;return this}setScalar(scalar){this.r=scalar;this.g=scalar;this.b=scalar;return this}setHex(hex){hex=Math.floor(hex);this.r=(hex>>16&255)/255;this.g=(hex>>8&255)/255;this.b=(hex&255)/255;return this}setRGB(r,g,b){this.r=r;this.g=g;this.b=b;return this}
/**
     * HSL即是代表色相，饱和度，明度三个通道的颜色
     * H: Hue 色相 S：Saturation 饱和度 L Lightness 明度
     * @param h
     * @param s
     * @param l
     * @returns {Color}
     */setHSL(h,s,l){
// h,s,l ranges are in 0.0 - 1.0
h=_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].euclideanModulo(h,1);s=_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].clamp(s,0,1);l=_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].clamp(l,0,1);if(s===0){this.r=this.g=this.b=l}else{const p=l<=.5?l*(1+s):l+s-l*s;const q=2*l-p;this.r=HUE_TO_RGB(q,p,h+1/3);this.g=HUE_TO_RGB(q,p,h);this.b=HUE_TO_RGB(q,p,h-1/3)}return this}setStyle(style){let matches;
/**
         * rgb || hsl
         */if(matches=/^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)){let color;const name=matches[1];const components=matches[2];switch(name){case"rgb":case"rgba":if(color=/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)){
// rgb(255,0,0) rgba(255,0,0,0.5)
this.r=Math.min(255,parseInt(color[1],10))/255;this.g=Math.min(255,parseInt(color[2],10))/255;this.b=Math.min(255,parseInt(color[3],10))/255;
// handleAlpha(color[5]);
return this}if(color=/^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)){
// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
this.r=Math.min(100,parseInt(color[1],10))/100;this.g=Math.min(100,parseInt(color[2],10))/100;this.b=Math.min(100,parseInt(color[3],10))/100;
// handleAlpha(color[5]);
return this}break;case"hsl":case"hsla":if(color=/^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)){
// hsl(120,50%,50%) hsla(120,50%,50%,0.5)
const h=parseFloat(color[1])/360;const s=parseInt(color[2],10)/100;const l=parseInt(color[3],10)/100;
// handleAlpha(color[5]);
return this.setHSL(h,s,l)}break}}else if(matches=/^\#([A-Fa-f0-9]+)$/.exec(style)){
// hex color
const hex=matches[1];const size=hex.length;if(size===3){
// #ff0
this.r=parseInt(hex.charAt(0)+hex.charAt(0),16)/255;this.g=parseInt(hex.charAt(1)+hex.charAt(1),16)/255;this.b=parseInt(hex.charAt(2)+hex.charAt(2),16)/255;return this}else if(size===6){
// #ff0000
this.r=parseInt(hex.charAt(0)+hex.charAt(1),16)/255;this.g=parseInt(hex.charAt(2)+hex.charAt(3),16)/255;this.b=parseInt(hex.charAt(4)+hex.charAt(5),16)/255;return this}}if(style&&style.length>0){
// color keywords
const hex=Color.ColorKeywords[style];if(hex!==undefined){
// red
this.setHex(hex)}else{console.warn("THREE.Color: Unknown color "+style)}}return this}convertGammaToLinear(color,gammaFactor=2){return this.setRGB(Math.pow(color.r,gammaFactor),Math.pow(color.g,gammaFactor),Math.pow(color.b,gammaFactor))}convertLinearToGamma(color,gammaFactor=2){const safeInverse=gammaFactor>0?1/gammaFactor:1;return this.setRGB(Math.pow(color.r,safeInverse),Math.pow(color.g,safeInverse),Math.pow(color.b,safeInverse))}getHex(){return this.r*255<<16^this.g*255<<8^this.b*255<<0}getHexString(){return("000000"+this.getHex().toString(16)).slice(-6)}getHSL(hsl={h:0,s:0,l:0}){
// h,s,l ranges are in 0.0 - 1.0
const{r:r,g:g,b:b}=this;const max=Math.max(r,g,b);const min=Math.min(r,g,b);let hue,saturation;const lightness=(min+max)/2;if(min===max){hue=0;saturation=0}else{const delta=max-min;saturation=lightness<=.5?delta/(max+min):delta/(2-max-min);switch(max){case r:hue=(g-b)/delta+(g<b?6:0);break;case g:hue=(b-r)/delta+2;break;case b:hue=(r-g)/delta+4;break}hue/=6}hsl.h=hue;hsl.s=saturation;hsl.l=lightness;return hsl}getStyle(){const{r:r,g:g,b:b}=this;return"rgb("+(r*255|0)+","+(g*255|0)+","+(b*255|0)+")"}offsetHSL(h,s,l){const hsl=this.getHSL();hsl.h+=h;hsl.s+=s;hsl.l+=l;return this.setHSL(hsl.h,hsl.s,hsl.l)}add(color){this.r=Math.min(1,this.r+color.r);this.g=Math.min(1,this.g+color.g);this.b=Math.min(1,this.b+color.b);return this}addScalar(scalar){this.r=Math.min(1,this.r+scalar);this.g=Math.min(1,this.g+scalar);this.b=Math.min(1,this.b+scalar);return this}sub(color){this.r=Math.max(0,this.r-color.r);this.g=Math.max(0,this.g-color.g);this.b=Math.max(0,this.b-color.b);return this}subScalar(scalar){this.r=Math.min(1,this.r-scalar);this.g=Math.min(1,this.g-scalar);this.b=Math.min(1,this.b-scalar);return this}multiply(color){this.r*=color.r;this.g*=color.g;this.b*=color.b;return this}multiplyScalar(scalar){this.r=Math.min(1,this.r*scalar);this.g=Math.min(1,this.g*scalar);this.b=Math.min(1,this.b*scalar);return this}lerp(color,alpha){this.r+=(color.r-this.r)*alpha;this.g+=(color.g-this.g)*alpha;this.b+=(color.b-this.b)*alpha;return this}equals(c){return c.r===this.r&&c.g===this.g&&c.b===this.b}clone(){return(new this.constructor).copy(this)}}Color.ColorKeywords={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};
/***/},
/***/"./src/math/Euler.ts":
/*!***************************!*\
  !*** ./src/math/Euler.ts ***!
  \***************************/
/*! exports provided: EulerOrder, Euler */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"EulerOrder",function(){return EulerOrder});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Euler",function(){return Euler});
/* harmony import */var _Math__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Math */"./src/math/Math.ts");
/* harmony import */var _Matrix4__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _Quaternion__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./Quaternion */"./src/math/Quaternion.ts");var EulerOrder;(function(EulerOrder){EulerOrder[EulerOrder["XYZ"]=0]="XYZ";EulerOrder[EulerOrder["YZX"]=1]="YZX";EulerOrder[EulerOrder["ZXY"]=2]="ZXY";EulerOrder[EulerOrder["XZY"]=3]="XZY";EulerOrder[EulerOrder["YXZ"]=4]="YXZ";EulerOrder[EulerOrder["ZYX"]=5]="ZYX"})(EulerOrder||(EulerOrder={}));
/**
 * TODO: setFromVector3
 */class Euler{constructor(x=0,y=0,z=0){this._order=Euler.DefaultOrder;this._x=x;this._y=y;this._z=z}get x(){return this._x}set x(x){this._x=x}get y(){return this._y}set y(y){this._y=y}get z(){return this._z}set z(z){this._z=z}get order(){return this._order}set order(_order){this._order=_order}set(x,y,z,order){this._x=x;this._y=y;this._z=z;this._order=order;return this}copy(euler){return this.set(euler.x,euler.y,euler.z,euler.order)}
/**
     * assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
     * @param m
     * @param order
     * @returns {Euler}
     */setFromRotationMatrix(m,order=this.order){const clamp=_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].clamp;const te=m.elements;const m11=te[0],m12=te[4],m13=te[8];const m21=te[1],m22=te[5],m23=te[9];const m31=te[2],m32=te[6],m33=te[10];if(order===EulerOrder.XYZ){this._y=Math.asin(clamp(m13,-1,1));if(Math.abs(m13)<.99999){this._x=Math.atan2(-m23,m33);this._z=Math.atan2(-m12,m11)}else{this._x=Math.atan2(m32,m22);this._z=0}}else if(order===EulerOrder.YXZ){this._x=Math.asin(-clamp(m23,-1,1));if(Math.abs(m23)<.99999){this._y=Math.atan2(m13,m33);this._z=Math.atan2(m21,m22)}else{this._y=Math.atan2(-m31,m11);this._z=0}}else if(order===EulerOrder.ZXY){this._x=Math.asin(clamp(m32,-1,1));if(Math.abs(m32)<.99999){this._y=Math.atan2(-m31,m33);this._z=Math.atan2(-m12,m22)}else{this._y=0;this._z=Math.atan2(m21,m11)}}else if(order===EulerOrder.ZYX){this._y=Math.asin(-clamp(m31,-1,1));if(Math.abs(m31)<.99999){this._x=Math.atan2(m32,m33);this._z=Math.atan2(m21,m11)}else{this._x=0;this._z=Math.atan2(-m12,m22)}}else if(order===EulerOrder.YZX){this._z=Math.asin(clamp(m21,-1,1));if(Math.abs(m21)<.99999){this._x=Math.atan2(-m23,m22);this._y=Math.atan2(-m31,m11)}else{this._x=0;this._y=Math.atan2(m13,m33)}}else if(order===EulerOrder.XZY){this._z=Math.asin(-clamp(m12,-1,1));if(Math.abs(m12)<.99999){this._x=Math.atan2(m32,m22);this._y=Math.atan2(m13,m11)}else{this._x=Math.atan2(-m23,m33);this._y=0}}this.order=order;return this}setFromQuaternion(q,order){const matrix=new _Matrix4__WEBPACK_IMPORTED_MODULE_1__["Matrix4"];matrix.makeRotationFromQuaternion(q);return this.setFromRotationMatrix(matrix,order)}
/**
     * this discards revolution information -bhouston
     * @param newOrder
     * @returns {Euler}
     */reorder(newOrder){const q=new _Quaternion__WEBPACK_IMPORTED_MODULE_2__["Quaternion"];q.setFromEuler(this);return this.setFromQuaternion(q,newOrder)}equals(euler){return euler.x===this.x&&euler.y===this.y&&euler.z===this.z&&euler.order===this.order}fromArray(array){return this.set(array[0],array[1],array[2],array[3]||this.order)}toArray(array=[],offset=0){array[offset]=this.x;array[offset+1]=this.y;array[offset+2]=this.z;array[offset+3]=this.order;return array}clone(){return(new this.constructor).copy(this)}}Euler.DefaultOrder=EulerOrder.XYZ;
/***/},
/***/"./src/math/Frustum.ts":
/*!*****************************!*\
  !*** ./src/math/Frustum.ts ***!
  \*****************************/
/*! exports provided: Frustum */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Frustum",function(){return Frustum});
/* harmony import */var _Plane__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Plane */"./src/math/Plane.ts");
/* harmony import */var _Sphere__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Sphere */"./src/math/Sphere.ts");
/* harmony import */var _Vector3__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./Vector3 */"./src/math/Vector3.ts");class Frustum{constructor(p0=new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"],p1=new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"],p2=new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"],p3=new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"],p4=new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"],p5=new _Plane__WEBPACK_IMPORTED_MODULE_0__["Plane"]){this.planes=[p0,p1,p2,p3,p4,p5]}set(p0,p1,p2,p3,p4,p5){const planes=this.planes;planes[0].copy(p0);planes[1].copy(p1);planes[2].copy(p2);planes[3].copy(p3);planes[4].copy(p4);planes[5].copy(p5);return this}copy(frustum){const planes=this.planes;for(let i=0;i<6;i++){planes[i].copy(frustum.planes[i])}return this}clone(){return(new this.constructor).copy(this)}setFromMatrix(m){const planes=this.planes;const me=m.elements;const me0=me[0],me1=me[1],me2=me[2],me3=me[3];const me4=me[4],me5=me[5],me6=me[6],me7=me[7];const me8=me[8],me9=me[9],me10=me[10],me11=me[11];const me12=me[12],me13=me[13],me14=me[14],me15=me[15];const setPlane=(plane,x,y,z,w)=>{plane.normal.set(x,y,z);plane.constant=w;plane.normalize()};setPlane(planes[0],me3-me0,me7-me4,me11-me8,me15-me12);setPlane(planes[1],me3+me0,me7+me4,me11+me8,me15+me12);setPlane(planes[2],me3+me1,me7+me5,me11+me9,me15+me13);setPlane(planes[3],me3-me1,me7-me5,me11-me9,me15-me13);setPlane(planes[4],me3-me2,me7-me6,me11-me10,me15-me14);setPlane(planes[5],me3+me2,me7+me6,me11+me10,me15+me14);return this}intersectsObject(object){const geometry=object.geometry;if(geometry.boundingSphere===null){geometry.computeBoundingSphere()}const sphere=(new _Sphere__WEBPACK_IMPORTED_MODULE_1__["Sphere"]).copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);return this.intersectsSphere(sphere)}intersectsSprite(sprite){const sphere=new _Sphere__WEBPACK_IMPORTED_MODULE_1__["Sphere"];sphere.center.set(0,0,0);sphere.radius=.7071067811865476;sphere.applyMatrix4(sprite.matrixWorld);return this.intersectsSphere(sphere)}intersectsSphere(sphere){const planes=this.planes;const center=sphere.center;const negRadius=-sphere.radius;for(let i=0;i<6;i++){const distance=planes[i].distanceToPoint(center);if(distance<negRadius){return false}}return true}intersectsBox(box){const p1=new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"],p2=new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"];const planes=this.planes;for(let i=0;i<6;i++){const plane=planes[i];p1.x=plane.normal.x>0?box.min.x:box.max.x;p2.x=plane.normal.x>0?box.max.x:box.min.x;p1.y=plane.normal.y>0?box.min.y:box.max.y;p2.y=plane.normal.y>0?box.max.y:box.min.y;p1.z=plane.normal.z>0?box.min.z:box.max.z;p2.z=plane.normal.z>0?box.max.z:box.min.z;const d1=plane.distanceToPoint(p1);const d2=plane.distanceToPoint(p2);
// if both outside plane, no intersection
if(d1<0&&d2<0){return false}}return true}containsPoint(point){const planes=this.planes;for(let i=0;i<6;i++){if(planes[i].distanceToPoint(point)<0){return false}}return true}}
/***/},
/***/"./src/math/Line3.ts":
/*!***************************!*\
  !*** ./src/math/Line3.ts ***!
  \***************************/
/*! exports provided: Line3 */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Line3",function(){return Line3});
/* harmony import */var _Math__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Math */"./src/math/Math.ts");
/* harmony import */var _Vector3__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Vector3 */"./src/math/Vector3.ts");class Line3{constructor(start=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"],end=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]){this.start=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];this.end=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];this.start=start;this.end=end}set(start,end){this.start.copy(start);this.end.copy(end);return this}clone(){return(new this.constructor).copy(this)}copy(line){this.start.copy(line.start);this.end.copy(line.end);return this}getCenter(){return(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).copy(this.start).add(this.end).multiplyScalar(.5)}delta(){return(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).copy(this.end).sub(this.start)}distanceSquared(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t){return this.delta().multiplyScalar(t).add(this.start)}closestPointToPointParameter(point,clampToLine=false){const startP=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];const startEnd=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];startP.copy(point).sub(this.start);startEnd.copy(this.end).sub(this.start);const startEnd2=startEnd.dot(startEnd);const startEndStartP=startEnd.dot(startP);let t=startEndStartP/startEnd2;if(clampToLine){t=_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].clamp(t,0,1)}return t}closestPointToPoint(point,clampToLine=false){const t=this.closestPointToPointParameter(point,clampToLine);return this.delta().multiplyScalar(t).add(this.start)}applyMatrix4(matrix){this.start.applyMatrix4(matrix);this.end.applyMatrix4(matrix);return this}equals(line){return line.start.equals(this.start)&&line.end.equals(this.end)}}
/***/},
/***/"./src/math/Math.ts":
/*!**************************!*\
  !*** ./src/math/Math.ts ***!
  \**************************/
/*! exports provided: MathUtil */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"MathUtil",function(){return MathUtil});const lut=[];for(let i=0;i<256;i++){lut[i]=(i<16?"0":"")+i.toString(16).toUpperCase()}
/**
 * Finished
 */class MathUtil{
/**
     * 产生一个UUID的算法，主要是遵循UUID的规范来产生字符串
     * http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
     * @returns {string}
     */
static generateUUID(){const d0=Math.random()*4294967295|0;const d1=Math.random()*4294967295|0;const d2=Math.random()*4294967295|0;const d3=Math.random()*4294967295|0;return lut[d0&255]+lut[d0>>8&255]+lut[d0>>16&255]+lut[d0>>24&255]+"-"+lut[d1&255]+lut[d1>>8&255]+"-"+lut[d1>>16&15|64]+lut[d1>>24&255]+"-"+lut[d2&63|128]+lut[d2>>8&255]+"-"+lut[d2>>16&255]+lut[d2>>24&255]+lut[d3&255]+lut[d3>>8&255]+lut[d3>>16&255]+lut[d3>>24&255]}
/**
     * 在一定范围内截断value的数值
     * @param value
     * @param min
     * @param max
     * @returns {number}
     */static clamp(value,min,max){return Math.max(min,Math.min(max,value))}
/**
     * 计算欧几里得取模算法
     * 详见 https://en.wikipedia.org/wiki/Modulo_operation
     * 这里还需要+m的原因是考虑负数取模的原因
     * @param n
     * @param m
     * @returns {number}
     */static euclideanModulo(n,m){return(n%m+m)%m}
/**
     * 将x在a范围内的值映射到b范围中
     * @param x
     * @param a1
     * @param a2
     * @param b1
     * @param b2
     * @returns {number}
     */static mapLinear(x,a1,a2,b1,b2){return b1+(x-a1)*(b2-b1)/(a2-a1)}
/**
     * 线性插值
     * https://en.wikipedia.org/wiki/Linear_interpolation
     * @param x
     * @param y
     * @param t
     * @returns {number}
     */static lerp(x,y,t){return(1-t)*x+t*y}
/**
     * 这个插值过程是将点原本的线性插值的点映射到f(x) = 3 * x^2 - 2 * x^3上，
     * f"(x) = 6 * x - 6 * x^2 x \in [0, 1] \geq 0
     * 所以f(x)在[0, 1]上单调递增，
     * 观察其二阶导可知f(x)在[0, 0.5]和[0.5 , 1]上分别为下凸和上凸函数，
     * 所以其形状类似于电梯
     * http://en.wikipedia.org/wiki/Smoothstep
     * @param x
     * @param min
     * @param max
     * @returns {number}
     */static smoothstep(x,min,max){if(x<=min)return 0;if(x>=max)return 1;x=(x-min)/(max-min);return x*x*(3-2*x)}
/**
     * 类似与上面的函数，计算量更大
     * @param x
     * @param min
     * @param max
     * @returns {number}
     */static smootherstep(x,min,max){if(x<=min)return 0;if(x>=max)return 1;x=(x-min)/(max-min);return x*x*x*(x*(x*6-15)+10)}
/**
     * 随机整数
     * @param low
     * @param high
     * @returns {number}
     */static randInt(low,high){return low+Math.floor(Math.random()*(high-low+1))}
/**
     * 随机浮点数
     * @param low
     * @param high
     * @returns {number}
     */static randFloat(low,high){return low+Math.random()*(high-low)}
/**
     * [-range/2, range/2]的随机浮点数
     * @param range
     * @returns {number}
     */static randFloatSpread(range){return range*(.5-Math.random())}
/***************************** 下面的太简单了不说明了 *******************************/static degToRad(degrees){return degrees*MathUtil.DEG2RAD}static radToDeg(radians){return radians*MathUtil.RAD2DEG}
/**
     * 这里用到了二进制的技巧
     * @param value
     * @returns {boolean}
     */static isPowerOfTwo(value){return(value&value-1)===0&&value!==0}static ceilPowerOfTwo(value){return Math.pow(2,Math.ceil(Math.log(value)/Math.LN2))}static floorPowerOfTwo(value){return Math.pow(2,Math.floor(Math.log(value)/Math.LN2))}}
/**
 * 弧度/角度
 * @type {number}
 */MathUtil.DEG2RAD=Math.PI/180;
/**
 * 角度/弧度
 * @type {number}
 */MathUtil.RAD2DEG=180/Math.PI;
/***/},
/***/"./src/math/Matrix2.ts":
/*!*****************************!*\
  !*** ./src/math/Matrix2.ts ***!
  \*****************************/
/*! exports provided: Matrix2 */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Matrix2",function(){return Matrix2});class Matrix2{constructor(){this.elements=[1,0,0,1]}set(n11,n12,n21,n22){const te=this.elements;te[0]=n11;te[1]=n21;te[3]=n12;te[4]=n22;return this}identity(){return this.set(1,0,0,1)}copy(mat2){const te=this.elements;const me=mat2.elements;te[0]=me[0];te[1]=me[1];te[2]=me[2];te[3]=me[3];return this}setFromMatrix4(mat2){const me=mat2.elements;return this.set(me[0],me[2],me[1],me[3])}multiply(mat2){return this.multiplyMatrices(this,mat2)}premultiply(m){return this.multiplyMatrices(m,this)}multiplyMatrices(a,b){const ae=a.elements;const be=b.elements;const te=this.elements;const a11=ae[0],a12=ae[2];const a21=ae[1],a22=ae[3];const b11=be[0],b12=be[2];const b21=be[1],b22=be[3];te[0]=a11*b11+a12*b21;te[2]=a11*b12+a12*b22;te[1]=a21*b11+a22*b21;te[3]=a21*b12+a22*b22;return this}multiplyScalar(s){const te=this.elements;te[0]*=s;te[2]*=s;te[1]*=s;te[3]*=s;return this}determinant(){const te=this.elements;const a=te[0],b=te[1],c=te[2],d=te[3];return a*d-b*c}
// getInverse
transpose(){let tmp;const m=this.elements;tmp=m[1];m[1]=m[2];m[2]=tmp;return this}equals(matrix){const te=this.elements;const me=matrix.elements;for(let i=0;i<4;i++){if(te[i]!==me[i])return false}return true}fromArray(array,offset=0){for(let i=0;i<4;i++){this.elements[i]=array[i+offset]}return this}toArray(array=[],offset=0){const te=this.elements;array[offset]=te[0];array[offset+1]=te[1];array[offset+2]=te[2];array[offset+3]=te[3];return array}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/math/Matrix3.ts":
/*!*****************************!*\
  !*** ./src/math/Matrix3.ts ***!
  \*****************************/
/*! exports provided: Matrix3 */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Matrix3",function(){return Matrix3});class Matrix3{constructor(){this.elements=[1,0,0,0,1,0,0,0,1]}set(n11,n12,n13,n21,n22,n23,n31,n32,n33){const te=this.elements;te[0]=n11;te[1]=n21;te[2]=n31;te[3]=n12;te[4]=n22;te[5]=n32;te[6]=n13;te[7]=n23;te[8]=n33;return this}identity(){return this.set(1,0,0,0,1,0,0,0,1)}copy(mat3){const te=this.elements;const me=mat3.elements;te[0]=me[0];te[1]=me[1];te[2]=me[2];te[3]=me[3];te[4]=me[4];te[5]=me[5];te[6]=me[6];te[7]=me[7];te[8]=me[8];return this}setFromMatrix4(mat4){const me=mat4.elements;return this.set(me[0],me[4],me[8],me[1],me[5],me[9],me[2],me[6],me[10])}multiply(mat3){return this.multiplyMatrices(this,mat3)}premultiply(m){return this.multiplyMatrices(m,this)}multiplyMatrices(a,b){const ae=a.elements;const be=b.elements;const te=this.elements;const a11=ae[0],a12=ae[3],a13=ae[6];const a21=ae[1],a22=ae[4],a23=ae[7];const a31=ae[2],a32=ae[5],a33=ae[8];const b11=be[0],b12=be[3],b13=be[6];const b21=be[1],b22=be[4],b23=be[7];const b31=be[2],b32=be[5],b33=be[8];te[0]=a11*b11+a12*b21+a13*b31;te[3]=a11*b12+a12*b22+a13*b32;te[6]=a11*b13+a12*b23+a13*b33;te[1]=a21*b11+a22*b21+a23*b31;te[4]=a21*b12+a22*b22+a23*b32;te[7]=a21*b13+a22*b23+a23*b33;te[2]=a31*b11+a32*b21+a33*b31;te[5]=a31*b12+a32*b22+a33*b32;te[8]=a31*b13+a32*b23+a33*b33;return this}multiplyScalar(s){const te=this.elements;te[0]*=s;te[3]*=s;te[6]*=s;te[1]*=s;te[4]*=s;te[7]*=s;te[2]*=s;te[5]*=s;te[8]*=s;return this}determinant(){const te=this.elements;const a=te[0],b=te[1],c=te[2],d=te[3],e=te[4],f=te[5],g=te[6],h=te[7],i=te[8];return a*e*i-a*f*h-b*d*i+b*f*g+c*d*h-c*e*g}getInverse(matrix,throwOnDegenerate=false){const me=matrix.elements,te=this.elements,n11=me[0],n21=me[1],n31=me[2],n12=me[3],n22=me[4],n32=me[5],n13=me[6],n23=me[7],n33=me[8],t11=n33*n22-n32*n23,t12=n32*n13-n33*n12,t13=n23*n12-n22*n13,det=n11*t11+n21*t12+n31*t13;if(det===0){const msg=`THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0`;if(throwOnDegenerate===true){throw new Error(msg)}else{console.warn(msg)}return this.identity()}const detInv=1/det;te[0]=t11*detInv;te[1]=(n31*n23-n33*n21)*detInv;te[2]=(n32*n21-n31*n22)*detInv;te[3]=t12*detInv;te[4]=(n33*n11-n31*n13)*detInv;te[5]=(n31*n12-n32*n11)*detInv;te[6]=t13*detInv;te[7]=(n21*n13-n23*n11)*detInv;te[8]=(n22*n11-n21*n12)*detInv;return this}transpose(){let tmp;const m=this.elements;tmp=m[1];m[1]=m[3];m[3]=tmp;tmp=m[2];m[2]=m[6];m[6]=tmp;tmp=m[5];m[5]=m[7];m[7]=tmp;return this}getNormalMatrix(matrix4){return this.setFromMatrix4(matrix4).getInverse(this).transpose()}setUvTransform(tx,ty,sx,sy,rotation,cx,cy){const c=Math.cos(rotation);const s=Math.sin(rotation);return this.set(sx*c,sx*s,-sx*(c*cx+s*cy)+cx+tx,-sy*s,sy*c,-sy*(-s*cx+c*cy)+cy+ty,0,0,1)}scale(sx,sy){const te=this.elements;te[0]*=sx;te[3]*=sx;te[6]*=sx;te[1]*=sy;te[4]*=sy;te[7]*=sy;return this}rotate(theta){const c=Math.cos(theta);const s=Math.sin(theta);const te=this.elements;const a11=te[0],a12=te[3],a13=te[6];const a21=te[1],a22=te[4],a23=te[7];te[0]=c*a11+s*a21;te[3]=c*a12+s*a22;te[6]=c*a13+s*a23;te[1]=-s*a11+c*a21;te[4]=-s*a12+c*a22;te[7]=-s*a13+c*a23;return this}translate(tx,ty){const te=this.elements;te[0]+=tx*te[2];te[3]+=tx*te[5];te[6]+=tx*te[8];te[1]+=ty*te[2];te[4]+=ty*te[5];te[7]+=ty*te[8];return this}equals(matrix){const te=this.elements;const me=matrix.elements;for(let i=0;i<9;i++){if(te[i]!==me[i])return false}return true}fromArray(array,offset=0){for(let i=0;i<9;i++){this.elements[i]=array[i+offset]}return this}toArray(array=[],offset=0){const te=this.elements;array[offset]=te[0];array[offset+1]=te[1];array[offset+2]=te[2];array[offset+3]=te[3];array[offset+4]=te[4];array[offset+5]=te[5];array[offset+6]=te[6];array[offset+7]=te[7];array[offset+8]=te[8];return array}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/math/Matrix4.ts":
/*!*****************************!*\
  !*** ./src/math/Matrix4.ts ***!
  \*****************************/
/*! exports provided: Matrix4 */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Matrix4",function(){return Matrix4});
/* harmony import */var _Euler__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Euler */"./src/math/Euler.ts");
/* harmony import */var _Vector3__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Vector3 */"./src/math/Vector3.ts");
/**
 * TODO: applyToBufferAttribute
 */class Matrix4{constructor(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}copy(mat4){const te=this.elements;const me=mat4.elements;te[0]=me[0];te[1]=me[1];te[2]=me[2];te[3]=me[3];te[4]=me[4];te[5]=me[5];te[6]=me[6];te[7]=me[7];te[8]=me[8];te[9]=me[9];te[10]=me[10];te[11]=me[11];te[12]=me[12];te[13]=me[13];te[14]=me[14];te[15]=me[15];return this}set(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44){const te=this.elements;te[0]=n11;te[4]=n12;te[8]=n13;te[12]=n14;te[1]=n21;te[5]=n22;te[9]=n23;te[13]=n24;te[2]=n31;te[6]=n32;te[10]=n33;te[14]=n34;te[3]=n41;te[7]=n42;te[11]=n43;te[15]=n44;return this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}copyPosition(m){const te=this.elements,me=m.elements;te[12]=me[12];te[13]=me[13];te[14]=me[14];return this}extractBasis(xAxis,yAxis,zAxis){xAxis.fromArray(this.elements,0);yAxis.fromArray(this.elements,4);zAxis.fromArray(this.elements,8);return this}makeBasis(xAxis,yAxis,zAxis){return this.set(xAxis.x,yAxis.x,zAxis.x,0,xAxis.y,yAxis.y,zAxis.y,0,xAxis.z,yAxis.z,zAxis.z,0,0,0,0,1)}extractRotation(mat4){const vec=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];const te=this.elements;const me=mat4.elements;const scaleX=1/vec.fromArray(mat4.elements,0).length();const scaleY=1/vec.fromArray(mat4.elements,4).length();const scaleZ=1/vec.fromArray(mat4.elements,8).length();te[0]=me[0]*scaleX;te[1]=me[1]*scaleX;te[2]=me[2]*scaleX;te[4]=me[4]*scaleY;te[5]=me[5]*scaleY;te[6]=me[6]*scaleY;te[8]=me[8]*scaleZ;te[9]=me[9]*scaleZ;te[10]=me[10]*scaleZ;return this}makeRotationFromEuler(euler){const te=this.elements;const x=euler.x,y=euler.y,z=euler.z;const a=Math.cos(x),b=Math.sin(x);const c=Math.cos(y),d=Math.sin(y);const e=Math.cos(z),f=Math.sin(z);if(euler.order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].XYZ){const ae=a*e,af=a*f,be=b*e,bf=b*f;te[0]=c*e;te[4]=-c*f;te[8]=d;te[1]=af+be*d;te[5]=ae-bf*d;te[9]=-b*c;te[2]=bf-ae*d;te[6]=be+af*d;te[10]=a*c}else if(euler.order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].YXZ){const ce=c*e,cf=c*f,de=d*e,df=d*f;te[0]=ce+df*b;te[4]=de*b-cf;te[8]=a*d;te[1]=a*f;te[5]=a*e;te[9]=-b;te[2]=cf*b-de;te[6]=df+ce*b;te[10]=a*c}else if(euler.order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].ZXY){const ce=c*e,cf=c*f,de=d*e,df=d*f;te[0]=ce-df*b;te[4]=-a*f;te[8]=de+cf*b;te[1]=cf+de*b;te[5]=a*e;te[9]=df-ce*b;te[2]=-a*d;te[6]=b;te[10]=a*c}else if(euler.order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].ZYX){const ae=a*e,af=a*f,be=b*e,bf=b*f;te[0]=c*e;te[4]=be*d-af;te[8]=ae*d+bf;te[1]=c*f;te[5]=bf*d+ae;te[9]=af*d-be;te[2]=-d;te[6]=b*c;te[10]=a*c}else if(euler.order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].YZX){const ac=a*c,ad=a*d,bc=b*c,bd=b*d;te[0]=c*e;te[4]=bd-ac*f;te[8]=bc*f+ad;te[1]=f;te[5]=a*e;te[9]=-b*e;te[2]=-d*e;te[6]=ad*f+bc;te[10]=ac-bd*f}else if(euler.order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].XZY){const ac=a*c,ad=a*d,bc=b*c,bd=b*d;te[0]=c*e;te[4]=-f;te[8]=d*e;te[1]=ac*f+bd;te[5]=a*e;te[9]=ad*f-bc;te[2]=bc*f-ad;te[6]=b*e;te[10]=bd*f+ac}
// last column
te[3]=0;te[7]=0;te[11]=0;
// bottom row
te[12]=0;te[13]=0;te[14]=0;te[15]=1;return this}makeRotationFromQuaternion(quaternion){const te=this.elements;const x=quaternion.x,y=quaternion.y,z=quaternion.z,w=quaternion.w;const x2=x+x,y2=y+y,z2=z+z;const xx=x*x2,xy=x*y2,xz=x*z2;const yy=y*y2,yz=y*z2,zz=z*z2;const wx=w*x2,wy=w*y2,wz=w*z2;te[0]=1-(yy+zz);te[4]=xy-wz;te[8]=xz+wy;te[1]=xy+wz;te[5]=1-(xx+zz);te[9]=yz-wx;te[2]=xz-wy;te[6]=yz+wx;te[10]=1-(xx+yy);
// last column
te[3]=0;te[7]=0;te[11]=0;
// bottom row
te[12]=0;te[13]=0;te[14]=0;te[15]=1;return this}lookAt(eye,target,up){const x=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];const y=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];const z=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];const te=this.elements;z.copy(eye).cross(target);if(z.lengthSquared()===0){
// eye and target are in the same position
z.z=1}z.normalize();x.copy(up).cross(z);if(x.lengthSquared()===0){
// up and z are parallel
if(Math.abs(up.z)===1){z.x+=1e-4}else{z.z+=1e-4}z.normalize();x.copy(up).cross(z)}x.normalize();y.copy(z).cross(x);te[0]=x.x;te[4]=y.x;te[8]=z.x;te[1]=x.y;te[5]=y.y;te[9]=z.y;te[2]=x.z;te[6]=y.z;te[10]=z.z;return this}multiply(mat){return this.multiplyMatrices(this,mat)}premultiply(mat){return this.multiplyMatrices(mat,this)}multiplyMatrices(matA,matB){const ae=matA.elements;const be=matB.elements;const te=this.elements;const a11=ae[0],a12=ae[4],a13=ae[8],a14=ae[12];const a21=ae[1],a22=ae[5],a23=ae[9],a24=ae[13];const a31=ae[2],a32=ae[6],a33=ae[10],a34=ae[14];const a41=ae[3],a42=ae[7],a43=ae[11],a44=ae[15];const b11=be[0],b12=be[4],b13=be[8],b14=be[12];const b21=be[1],b22=be[5],b23=be[9],b24=be[13];const b31=be[2],b32=be[6],b33=be[10],b34=be[14];const b41=be[3],b42=be[7],b43=be[11],b44=be[15];te[0]=a11*b11+a12*b21+a13*b31+a14*b41;te[4]=a11*b12+a12*b22+a13*b32+a14*b42;te[8]=a11*b13+a12*b23+a13*b33+a14*b43;te[12]=a11*b14+a12*b24+a13*b34+a14*b44;te[1]=a21*b11+a22*b21+a23*b31+a24*b41;te[5]=a21*b12+a22*b22+a23*b32+a24*b42;te[9]=a21*b13+a22*b23+a23*b33+a24*b43;te[13]=a21*b14+a22*b24+a23*b34+a24*b44;te[2]=a31*b11+a32*b21+a33*b31+a34*b41;te[6]=a31*b12+a32*b22+a33*b32+a34*b42;te[10]=a31*b13+a32*b23+a33*b33+a34*b43;te[14]=a31*b14+a32*b24+a33*b34+a34*b44;te[3]=a41*b11+a42*b21+a43*b31+a44*b41;te[7]=a41*b12+a42*b22+a43*b32+a44*b42;te[11]=a41*b13+a42*b23+a43*b33+a44*b43;te[15]=a41*b14+a42*b24+a43*b34+a44*b44;return this}multiplyScalar(s){const te=this.elements;te[0]*=s;te[4]*=s;te[8]*=s;te[12]*=s;te[1]*=s;te[5]*=s;te[9]*=s;te[13]*=s;te[2]*=s;te[6]*=s;te[10]*=s;te[14]*=s;te[3]*=s;te[7]*=s;te[11]*=s;te[15]*=s;return this}
/**
     * http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
     * @returns {number}
     */determinant(){const te=this.elements;const n11=te[0],n12=te[4],n13=te[8],n14=te[12];const n21=te[1],n22=te[5],n23=te[9],n24=te[13];const n31=te[2],n32=te[6],n33=te[10],n34=te[14];const n41=te[3],n42=te[7],n43=te[11],n44=te[15];return n41*(+n14*n23*n32-n13*n24*n32-n14*n22*n33+n12*n24*n33+n13*n22*n34-n12*n23*n34)+n42*(+n11*n23*n34-n11*n24*n33+n14*n21*n33-n13*n21*n34+n13*n24*n31-n14*n23*n31)+n43*(+n11*n24*n32-n11*n22*n34-n14*n21*n32+n12*n21*n34+n14*n22*n31-n12*n24*n31)+n44*(-n13*n22*n31-n11*n23*n32+n11*n22*n33+n13*n21*n32-n12*n21*n33+n12*n23*n31)}transpose(){const te=this.elements;let tmp;tmp=te[1];te[1]=te[4];te[4]=tmp;tmp=te[2];te[2]=te[8];te[8]=tmp;tmp=te[6];te[6]=te[9];te[9]=tmp;tmp=te[3];te[3]=te[12];te[12]=tmp;tmp=te[7];te[7]=te[13];te[13]=tmp;tmp=te[11];te[11]=te[14];te[14]=tmp;return this}setPosition(v){const te=this.elements;te[12]=v.x;te[13]=v.y;te[14]=v.z;return this}
/**
     * http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
     * @param m
     * @param throwOnDegenerate
     * @returns {Matrix4}
     */getInverse(m,throwOnDegenerate=false){const te=this.elements,me=m.elements;const n11=me[0],n21=me[1],n31=me[2],n41=me[3],n12=me[4],n22=me[5],n32=me[6],n42=me[7],n13=me[8],n23=me[9],n33=me[10],n43=me[11],n14=me[12],n24=me[13],n34=me[14],n44=me[15],t11=n23*n34*n42-n24*n33*n42+n24*n32*n43-n22*n34*n43-n23*n32*n44+n22*n33*n44,t12=n14*n33*n42-n13*n34*n42-n14*n32*n43+n12*n34*n43+n13*n32*n44-n12*n33*n44,t13=n13*n24*n42-n14*n23*n42+n14*n22*n43-n12*n24*n43-n13*n22*n44+n12*n23*n44,t14=n14*n23*n32-n13*n24*n32-n14*n22*n33+n12*n24*n33+n13*n22*n34-n12*n23*n34;const det=n11*t11+n21*t12+n31*t13+n41*t14;if(det===0){const msg=`THREE.Matrix4: .getInverse() can"t invert matrix, determinant is 0`;if(throwOnDegenerate===true){throw new Error(msg)}else{console.warn(msg)}return this.identity()}const detInv=1/det;te[0]=t11*detInv;te[1]=(n24*n33*n41-n23*n34*n41-n24*n31*n43+n21*n34*n43+n23*n31*n44-n21*n33*n44)*detInv;te[2]=(n22*n34*n41-n24*n32*n41+n24*n31*n42-n21*n34*n42-n22*n31*n44+n21*n32*n44)*detInv;te[3]=(n23*n32*n41-n22*n33*n41-n23*n31*n42+n21*n33*n42+n22*n31*n43-n21*n32*n43)*detInv;te[4]=t12*detInv;te[5]=(n13*n34*n41-n14*n33*n41+n14*n31*n43-n11*n34*n43-n13*n31*n44+n11*n33*n44)*detInv;te[6]=(n14*n32*n41-n12*n34*n41-n14*n31*n42+n11*n34*n42+n12*n31*n44-n11*n32*n44)*detInv;te[7]=(n12*n33*n41-n13*n32*n41+n13*n31*n42-n11*n33*n42-n12*n31*n43+n11*n32*n43)*detInv;te[8]=t13*detInv;te[9]=(n14*n23*n41-n13*n24*n41-n14*n21*n43+n11*n24*n43+n13*n21*n44-n11*n23*n44)*detInv;te[10]=(n12*n24*n41-n14*n22*n41+n14*n21*n42-n11*n24*n42-n12*n21*n44+n11*n22*n44)*detInv;te[11]=(n13*n22*n41-n12*n23*n41-n13*n21*n42+n11*n23*n42+n12*n21*n43-n11*n22*n43)*detInv;te[12]=t14*detInv;te[13]=(n13*n24*n31-n14*n23*n31+n14*n21*n33-n11*n24*n33-n13*n21*n34+n11*n23*n34)*detInv;te[14]=(n14*n22*n31-n12*n24*n31-n14*n21*n32+n11*n24*n32+n12*n21*n34-n11*n22*n34)*detInv;te[15]=(n12*n23*n31-n13*n22*n31+n13*n21*n32-n11*n23*n32-n12*n21*n33+n11*n22*n33)*detInv;return this}scale(v){const te=this.elements;const x=v.x,y=v.y,z=v.z;te[0]*=x;te[4]*=y;te[8]*=z;te[1]*=x;te[5]*=y;te[9]*=z;te[2]*=x;te[6]*=y;te[10]*=z;te[3]*=x;te[7]*=y;te[11]*=z;return this}getMaxScaleOnAxis(){const te=this.elements;const scaleXSq=te[0]*te[0]+te[1]*te[1]+te[2]*te[2];const scaleYSq=te[4]*te[4]+te[5]*te[5]+te[6]*te[6];const scaleZSq=te[8]*te[8]+te[9]*te[9]+te[10]*te[10];return Math.sqrt(Math.max(scaleXSq,scaleYSq,scaleZSq))}makeTranslation(x,y,z){return this.set(1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1)}makeRotationX(theta){const c=Math.cos(theta),s=Math.sin(theta);return this.set(1,0,0,0,0,c,-s,0,0,s,c,0,0,0,0,1)}makeRotationY(theta){const c=Math.cos(theta),s=Math.sin(theta);return this.set(c,0,s,0,0,1,0,0,-s,0,c,0,0,0,0,1)}makeRotationZ(theta){const c=Math.cos(theta),s=Math.sin(theta);return this.set(c,-s,0,0,s,c,0,0,0,0,1,0,0,0,0,1)}
/**
     * http://www.gamedev.net/reference/articles/article1199.asp
     * @param axis
     * @param angle
     * @returns {Matrix4}
     */makeRotationAxis(axis,angle){const c=Math.cos(angle);const s=Math.sin(angle);const t=1-c;const x=axis.x,y=axis.y,z=axis.z;const tx=t*x,ty=t*y;return this.set(tx*x+c,tx*y-s*z,tx*z+s*y,0,tx*y+s*z,ty*y+c,ty*z-s*x,0,tx*z-s*y,ty*z+s*x,t*z*z+c,0,0,0,0,1)}makeScale(x,y,z){return this.set(x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1)}makeShear(x,y,z){return this.set(1,y,z,0,x,1,z,0,x,y,1,0,0,0,0,1)}compose(position,quaternion,scale){this.makeRotationFromQuaternion(quaternion);this.scale(scale);this.setPosition(position);return this}decompose(position,quaternion,scale){const vector=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];const matrix=new Matrix4;const te=this.elements;let sx=vector.set(te[0],te[1],te[2]).length();const sy=vector.set(te[4],te[5],te[6]).length();const sz=vector.set(te[8],te[9],te[10]).length();
// if determine is negative, we need to invert one scale
const det=this.determinant();if(det<0)sx=-sx;position.x=te[12];position.y=te[13];position.z=te[14];
// scale the rotation part
matrix.copy(this);const invSX=1/sx;const invSY=1/sy;const invSZ=1/sz;matrix.elements[0]*=invSX;matrix.elements[1]*=invSX;matrix.elements[2]*=invSX;matrix.elements[4]*=invSY;matrix.elements[5]*=invSY;matrix.elements[6]*=invSY;matrix.elements[8]*=invSZ;matrix.elements[9]*=invSZ;matrix.elements[10]*=invSZ;quaternion.setFromRotationMatrix(matrix);scale.set(sx,sy,sz);return this}makePerspective(left,right,top,bottom,near,far){return this.set(2*near/(right-left),0,(right+left)/(right-left),0,0,2*near/(top-bottom),(top+bottom)/(top-bottom),0,0,0,-(far+near)/(far-near),-2*far*near/(far-near),0,0,-1,0)}makeOrthographic(left,right,top,bottom,near,far){const w=1/(right-left);const h=1/(top-bottom);const p=1/(far-near);const x=(right+left)*w;const y=(top+bottom)*h;const z=(far+near)*p;return this.set(2*w,0,0,-x,0,2*h,0,-y,0,0,-2*p,-z,0,0,0,1)}equals(matrix){const me=matrix.elements;for(let i=0;i<16;i++){if(this.elements[i]!==me[i])return false}return true}fromArray(array,offset=0){for(let i=0;i<16;i++){this.elements[i]=array[i+offset]}return this}toArray(array=[],offset=0){const te=this.elements;array[offset]=te[0];array[offset+1]=te[1];array[offset+2]=te[2];array[offset+3]=te[3];array[offset+4]=te[4];array[offset+5]=te[5];array[offset+6]=te[6];array[offset+7]=te[7];array[offset+8]=te[8];array[offset+9]=te[9];array[offset+10]=te[10];array[offset+11]=te[11];array[offset+12]=te[12];array[offset+13]=te[13];array[offset+14]=te[14];array[offset+15]=te[15];return array}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/math/Plane.ts":
/*!***************************!*\
  !*** ./src/math/Plane.ts ***!
  \***************************/
/*! exports provided: Plane */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Plane",function(){return Plane});
/* harmony import */var _Matrix3__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Matrix3 */"./src/math/Matrix3.ts");
/* harmony import */var _Vector3__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Vector3 */"./src/math/Vector3.ts");class Plane{constructor(normal=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"](1,0,0),constant=0){this.normal=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"](1,0,0);this.constant=0;this.normal=normal;this.constant=constant}set(normal,constant){this.normal.copy(normal);this.constant=constant;return this}setFromNormalAndCoplanarPoint(normal,point){this.normal.copy(normal);this.constant=-point.dot(this.normal);return this}setFromCoplanarPoints(a,b,c){const v1=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];const v2=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];const normal=v1.copy(c).sub(b).cross(v2.copy(a).sub(b)).normalize();
// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?
this.setFromNormalAndCoplanarPoint(normal,a);return this}clone(){return(new this.constructor).copy(this)}copy(plane){this.normal.copy(plane.normal);this.constant=plane.constant;return this}
/**
     * Note: will lead to a divide by zero if the plane is invalid
     * @returns {Plane}
     */normalize(){const inverseNormalLength=1/this.normal.length();this.normal.multiplyScalar(inverseNormalLength);this.constant*=inverseNormalLength;return this}negate(){this.constant*=-1;this.normal.negate();return this}distanceToPoint(point){return this.normal.dot(point)+this.constant}distanceToSphere(sphere){return this.distanceToPoint(sphere.center)-sphere.radius}projectPoint(point){return(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point)}intersectLine(line){const direction=line.delta();const denominator=this.normal.dot(direction);if(denominator===0){
// line is coplanar, return origin
if(this.distanceToPoint(line.start)===0){return(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).copy(line.start)}
// Unsure if this is the correct method to handle this case.
return undefined}const t=-(line.start.dot(this.normal)+this.constant)/denominator;if(t<0||t>1){return undefined}return(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).copy(direction).multiplyScalar(t).add(line.start)}intersectsLine(line){
// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.
const startSign=this.distanceToPoint(line.start);const endSign=this.distanceToPoint(line.end);return startSign<0&&endSign>0||endSign<0&&startSign>0}intersectsBox(box){return box.intersectsPlane(this)}intersectsSphere(sphere){return sphere.intersectsPlane(this)}coplanarPoint(){return(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(matrix){const normalMatrix=(new _Matrix3__WEBPACK_IMPORTED_MODULE_0__["Matrix3"]).getNormalMatrix(matrix);const referencePoint=this.coplanarPoint().applyMatrix4(matrix);const normal=this.normal.applyMatrix3(normalMatrix).normalize();this.constant=-referencePoint.dot(normal);return this}translate(offset){this.constant-=offset.dot(this.normal);return this}equals(plane){return plane.normal.equals(this.normal)&&plane.constant===this.constant}}
/***/},
/***/"./src/math/Quaternion.ts":
/*!********************************!*\
  !*** ./src/math/Quaternion.ts ***!
  \********************************/
/*! exports provided: Quaternion */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Quaternion",function(){return Quaternion});
/* harmony import */var _Euler__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Euler */"./src/math/Euler.ts");
/* harmony import */var _Vector3__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Vector3 */"./src/math/Vector3.ts");class Quaternion{constructor(x=0,y=0,z=0,w=1){this._x=x;this._y=y;this._z=z;this._w=w}get x(){return this._x}set x(_x){this._x=_x}get y(){return this._y}set y(_y){this._y=_y}get z(){return this._z}set z(_z){this._z=_z}get w(){return this._w}set w(_w){this._w=_w}set(x,y,z,w){this._x=x;this._y=y;this._z=z;this._w=w;return this}copy(quaternion){return this.set(quaternion.x,quaternion.y,quaternion.z,quaternion.w)}setFromEuler(euler){const{x:x,y:y,z:z,order:order}=euler;const cos=Math.cos;const sin=Math.sin;const c1=cos(x/2);const c2=cos(y/2);const c3=cos(z/2);const s1=sin(x/2);const s2=sin(y/2);const s3=sin(z/2);if(order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].XYZ){return this.set(s1*c2*c3+c1*s2*s3,c1*s2*c3-s1*c2*s3,c1*c2*s3+s1*s2*c3,c1*c2*c3-s1*s2*s3)}else if(order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].YXZ){return this.set(s1*c2*c3+c1*s2*s3,c1*s2*c3-s1*c2*s3,c1*c2*s3-s1*s2*c3,c1*c2*c3+s1*s2*s3)}else if(order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].ZXY){return this.set(s1*c2*c3-c1*s2*s3,c1*s2*c3+s1*c2*s3,c1*c2*s3+s1*s2*c3,c1*c2*c3-s1*s2*s3)}else if(order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].ZYX){return this.set(s1*c2*c3-c1*s2*s3,c1*s2*c3+s1*c2*s3,c1*c2*s3-s1*s2*c3,c1*c2*c3+s1*s2*s3)}else if(order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].YZX){return this.set(s1*c2*c3+c1*s2*s3,c1*s2*c3+s1*c2*s3,c1*c2*s3-s1*s2*c3,c1*c2*c3-s1*s2*s3)}else if(order===_Euler__WEBPACK_IMPORTED_MODULE_0__["EulerOrder"].XZY){return this.set(s1*c2*c3-c1*s2*s3,c1*s2*c3-s1*c2*s3,c1*c2*s3+s1*s2*c3,c1*c2*c3+s1*s2*s3)}return this}
/**
     * !!! assumes axis is normalized
     * http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
     * @param axis
     * @param angle
     * @returns {Quaternion}
     */setFromAxisAngle(axis,angle){const halfAngle=angle/2,s=Math.sin(halfAngle);return this.set(axis.x*s,axis.y*s,axis.z*s,Math.cos(halfAngle))}
/**
     * !!! assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
     * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
     * @param m
     * @returns {Quaternion}
     */setFromRotationMatrix(m){const te=m.elements,m11=te[0],m12=te[4],m13=te[8],m21=te[1],m22=te[5],m23=te[9],m31=te[2],m32=te[6],m33=te[10],trace=m11+m22+m33;let s;if(trace>0){s=.5/Math.sqrt(trace+1);return this.set((m32-m23)*s,(m13-m31)*s,(m21-m12)*s,.25/s)}else if(m11>m22&&m11>m33){s=2*Math.sqrt(1+m11-m22-m33);return this.set(.25*s,(m12+m21)/s,(m13+m31)/s,(m32-m23)/s)}else if(m22>m33){s=2*Math.sqrt(1+m22-m11-m33);return this.set((m12+m21)/s,.25*s,(m23+m32)/s,(m13-m31)/s)}else{s=2*Math.sqrt(1+m33-m11-m22);return this.set((m13+m31)/s,(m23+m32)/s,.25*s,(m21-m12)/s)}}
/**
     * !! assumes direction vectors vFrom and vTo are normalized
     * @param vFrom
     * @param vTo
     * @returns {Quaternion}
     */setFromUnitVectors(vFrom,vTo){const vec=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];const EPS=1e-6;let r=vFrom.dot(vTo)+1;if(r<EPS){r=0;if(Math.abs(vFrom.x)>Math.abs(vFrom.z)){vec.set(-vFrom.y,vFrom.x,0)}else{vec.set(0,-vFrom.z,vFrom.y)}}else{vec.copy(vFrom).cross(vTo)}this._x=vec.x;this._y=vec.y;this._z=vec.z;this._w=r;return this.normalize()}inverse(){return this.conjugate().normalize()}conjugate(){return this.set(this.x*-1,this.y*-1,this.z*-1,this.w)}dot(vec){return this.x*vec.x+this.y*vec.y+this.z*vec.z+this.w*vec.w}lengthSquared(){const{x:x,y:y,z:z,w:w}=this;return x*x+y*y+z*z+w*w}length(){return Math.sqrt(this.lengthSquared())}normalize(){let l=this.length();if(l===0){return this.set(0,0,0,1)}else{l=1/l;return this.set(this.x*l,this.y*l,this.z*l,this.w*l)}}multiply(quaternion){return this.multiplyQuaternions(this,quaternion)}premultiply(quaternion){return this.multiplyQuaternions(quaternion,this)}
/**
     * http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
     * @param a
     * @param b
     * @returns {Quaternion}
     */multiplyQuaternions(a,b){const qax=a.x,qay=a.y,qaz=a.z,qaw=a.w;const qbx=b.x,qby=b.y,qbz=b.z,qbw=b.w;return this.set(qax*qbw+qaw*qbx+qay*qbz-qaz*qby,qay*qbw+qaw*qby+qaz*qbx-qax*qbz,qaz*qbw+qaw*qbz+qax*qby-qay*qbx,qaw*qbw-qax*qbx-qay*qby-qaz*qbz)}
/**
     * http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
     * @param qb
     * @param t
     * @returns {Quaternion}
     */slerp(qb,t){if(t===0)return this;if(t===1)return this.copy(qb);const{x:x,y:y,z:z,w:w}=this;let cosHalfTheta=w*qb.w+x*qb.x+y*qb.y+z*qb.z;if(cosHalfTheta<0){this.set(-qb.x,-qb.y,-qb.z,-qb.w);cosHalfTheta=-cosHalfTheta}else{this.copy(qb)}if(cosHalfTheta>=1){return this.set(x,y,z,w)}const sinHalfTheta=Math.sqrt(1-cosHalfTheta*cosHalfTheta);if(Math.abs(sinHalfTheta)<.001){return this.set(.5*(x+this.x),.5*(y+this.y),.5*(z+this.z),.5*(w+this.w))}const halfTheta=Math.atan2(sinHalfTheta,cosHalfTheta);const ratioA=Math.sin((1-t)*halfTheta)/sinHalfTheta,ratioB=Math.sin(t*halfTheta)/sinHalfTheta;return this.set(x*ratioA+this.x*ratioB,y*ratioA+this.y*ratioB,z*ratioA+this.z*ratioB,w*ratioA+this.w*ratioB)}equals(quaternion){const{x:x,y:y,z:z,w:w}=this;return quaternion.x===x&&quaternion.y===y&&quaternion.z===z&&quaternion.w===w}fromArray(array,offset=0){return this.set(array[offset],array[offset+1],array[offset+2],array[offset+3])}toArray(array=[],offset=0){array[offset]=this.x;array[offset+1]=this.y;array[offset+2]=this.z;array[offset+3]=this.w;return array}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/math/Ray.ts":
/*!*************************!*\
  !*** ./src/math/Ray.ts ***!
  \*************************/
/*! exports provided: Ray */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Ray",function(){return Ray});
/* harmony import */var _Vector3__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Vector3 */"./src/math/Vector3.ts");class Ray{constructor(origin=new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"],direction=new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]){this.origin=new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"];this.direction=new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"];this.origin=origin;this.direction=direction}set(origin,direction){this.origin.copy(origin);this.direction.copy(direction);return this}clone(){return(new this.constructor).copy(this)}copy(ray){this.origin.copy(ray.origin);this.direction.copy(ray.direction);return this}at(t){return(new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]).copy(this.direction).multiplyScalar(t).add(this.origin)}lookAt(v){this.direction.copy(v).sub(this.origin).normalize();return this}recast(t){this.origin.copy(this.at(t));return this}closestPointToPoint(point){const result=(new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]).copy(point).sub(this.origin);const directionDistance=result.dot(this.direction);if(directionDistance<0){return result.copy(this.origin)}return result.copy(this.direction).multiplyScalar(directionDistance).add(this.origin)}distanceToPoint(point){return Math.sqrt(this.distanceSquaredToPoint(point))}distanceSquaredToPoint(point){const directionDistance=(new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]).copy(point).sub(this.origin).dot(this.direction);
// point behind the ray
if(directionDistance<0){return this.origin.distanceToSquared(point)}return(new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]).copy(this.direction).multiplyScalar(directionDistance).add(this.origin).distanceToSquared(point)}distanceSqToSegment(v0,v1,optionalPointOnRay,optionalPointOnSegment){const segCenter=new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"];const segDir=new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"];const diff=new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"];
// from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
// It returns the min distance between the ray and the segment
// defined by v0 and v1
// It can also set two optional targets :
// - The closest point on the ray
// - The closest point on the segment
segCenter.copy(v0).add(v1).multiplyScalar(.5);segDir.copy(v1).sub(v0).normalize();diff.copy(this.origin).sub(segCenter);const segExtent=v0.distanceTo(v1)*.5;const a01=-this.direction.dot(segDir);const b0=diff.dot(this.direction);const b1=-diff.dot(segDir);const c=diff.lengthSquared();const det=Math.abs(1-a01*a01);let s0,s1,sqrDist,extDet;if(det>0){
// The ray and segment are not parallel.
s0=a01*b1-b0;s1=a01*b0-b1;extDet=segExtent*det;if(s0>=0){if(s1>=-extDet){if(s1<=extDet){
// region 0
// Minimum at interior points of ray and segment.
const invDet=1/det;s0*=invDet;s1*=invDet;sqrDist=s0*(s0+a01*s1+2*b0)+s1*(a01*s0+s1+2*b1)+c}else{
// region 1
s1=segExtent;s0=Math.max(0,-(a01*s1+b0));sqrDist=-s0*s0+s1*(s1+2*b1)+c}}else{
// region 5
s1=-segExtent;s0=Math.max(0,-(a01*s1+b0));sqrDist=-s0*s0+s1*(s1+2*b1)+c}}else{if(s1<=-extDet){
// region 4
s0=Math.max(0,-(-a01*segExtent+b0));s1=s0>0?-segExtent:Math.min(Math.max(-segExtent,-b1),segExtent);sqrDist=-s0*s0+s1*(s1+2*b1)+c}else if(s1<=extDet){
// region 3
s0=0;s1=Math.min(Math.max(-segExtent,-b1),segExtent);sqrDist=s1*(s1+2*b1)+c}else{
// region 2
s0=Math.max(0,-(a01*segExtent+b0));s1=s0>0?segExtent:Math.min(Math.max(-segExtent,-b1),segExtent);sqrDist=-s0*s0+s1*(s1+2*b1)+c}}}else{
// Ray and segment are parallel.
s1=a01>0?-segExtent:segExtent;s0=Math.max(0,-(a01*s1+b0));sqrDist=-s0*s0+s1*(s1+2*b1)+c}if(optionalPointOnRay){optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin)}if(optionalPointOnSegment){optionalPointOnSegment.copy(segDir).multiplyScalar(s1).add(segCenter)}return sqrDist}intersectSphere(sphere){const vec=(new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]).copy(sphere.center).sub(this.origin);const tca=vec.dot(this.direction);const d2=vec.dot(vec)-tca*tca;const radius2=sphere.radius*sphere.radius;if(d2>radius2)return null;const thc=Math.sqrt(radius2-d2);
// t0 = first intersect point - entrance on front of sphere
const t0=tca-thc;
// t1 = second intersect point - exit point on back of sphere
const t1=tca+thc;
// test to see if both t0 and t1 are behind the ray - if so, return null
if(t0<0&&t1<0)return null;
// test to see if t0 is behind the ray:
// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
// in order to always return an intersect point that is in front of the ray.
if(t0<0)return this.at(t1);
// else t0 is in front of the ray, so return the first collision point scaled by t0
return this.at(t0)}intersectsSphere(sphere){return this.distanceToPoint(sphere.center)<=sphere.radius}distanceToPlane(plane){const denominator=plane.normal.dot(this.direction);if(denominator===0){
// line is coplanar, return origin
if(plane.distanceToPoint(this.origin)===0){return 0}
// Null is preferable to undefined since undefined means.... it is undefined
return Infinity}const t=-(this.origin.dot(plane.normal)+plane.constant)/denominator;
// Return if the ray never intersects the plane
return t>=0?t:Infinity}intersectPlane(plane){const t=this.distanceToPlane(plane);if(!isFinite(t)){return null}return this.at(t)}intersectsPlane(plane){
// check if the ray lies on the plane first
const distToPoint=plane.distanceToPoint(this.origin);if(distToPoint===0){return true}const denominator=plane.normal.dot(this.direction);if(denominator*distToPoint<0){return true}
// ray origin is behind the plane (and is pointing behind it)
return false}intersectBox(box){let tmin,tmax,tymin,tymax,tzmin,tzmax;const invdirx=1/this.direction.x,invdiry=1/this.direction.y,invdirz=1/this.direction.z;const origin=this.origin;if(invdirx>=0){tmin=(box.min.x-origin.x)*invdirx;tmax=(box.max.x-origin.x)*invdirx}else{tmin=(box.max.x-origin.x)*invdirx;tmax=(box.min.x-origin.x)*invdirx}if(invdiry>=0){tymin=(box.min.y-origin.y)*invdiry;tymax=(box.max.y-origin.y)*invdiry}else{tymin=(box.max.y-origin.y)*invdiry;tymax=(box.min.y-origin.y)*invdiry}if(tmin>tymax||tymin>tmax)return null;
// These lines also handle the case where tmin or tmax is NaN
// (result of 0 * Infinity). x !== x returns true if x is NaN
if(tymin>tmin||tmin!==tmin)tmin=tymin;if(tymax<tmax||tmax!==tmax)tmax=tymax;if(invdirz>=0){tzmin=(box.min.z-origin.z)*invdirz;tzmax=(box.max.z-origin.z)*invdirz}else{tzmin=(box.max.z-origin.z)*invdirz;tzmax=(box.min.z-origin.z)*invdirz}if(tmin>tzmax||tzmin>tmax)return null;if(tzmin>tmin||tmin!==tmin)tmin=tzmin;if(tzmax<tmax||tmax!==tmax)tmax=tzmax;
// return point closest to the ray (positive side)
if(tmax<0)return null;return this.at(tmin>=0?tmin:tmax)}intersectsBox(box){return this.intersectBox(box)!==null}intersectTriangle(triangle,backFaceCulling=false){
// Compute the offset origin, edges, and normal.
const a=triangle.a,b=triangle.b,c=triangle.c;const edge1=(new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]).copy(b).sub(a);const edge2=(new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]).copy(c).sub(a);const normal=(new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]).copy(edge1).cross(edge2);
// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
let DdN=this.direction.dot(normal);let sign;if(DdN>0){if(backFaceCulling)return null;sign=1}else if(DdN<0){sign=-1;DdN=-DdN}else{return null}const diff=(new _Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"]).copy(this.origin).sub(a);const DdQxE2=sign*this.direction.dot(edge2.copy(diff).cross(edge2));
// b1 < 0, no intersection
if(DdQxE2<0){return null}const DdE1xQ=sign*this.direction.dot(edge1.cross(diff));
// b2 < 0, no intersection
if(DdE1xQ<0){return null}
// b1+b2 > 1, no intersection
if(DdQxE2+DdE1xQ>DdN){return null}
// Line intersects triangle, check if ray does.
const QdN=-sign*diff.dot(normal);
// t < 0, no intersection
if(QdN<0){return null}
// Ray intersects triangle.
return this.at(QdN/DdN)}intersectsTriangle(triangle){return this.intersectTriangle(triangle)!==null}applyMatrix4(matrix4){this.origin.applyMatrix4(matrix4);this.direction.transformDirection(matrix4);return this}equals(ray){return ray.origin.equals(this.origin)&&ray.direction.equals(this.direction)}}
/***/},
/***/"./src/math/Sphere.ts":
/*!****************************!*\
  !*** ./src/math/Sphere.ts ***!
  \****************************/
/*! exports provided: Sphere */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Sphere",function(){return Sphere});
/* harmony import */var _Box3__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Box3 */"./src/math/Box3.ts");
/* harmony import */var _Vector3__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Vector3 */"./src/math/Vector3.ts");class Sphere{constructor(center=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"],radius=0){this.center=new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"];this.radius=0;this.center=center;this.radius=radius}set(center,radius){this.center.copy(center);this.radius=radius;return this}setFromPoints(points,optionalCenter){if(optionalCenter!==undefined){this.center.copy(optionalCenter)}else{this.center=(new _Box3__WEBPACK_IMPORTED_MODULE_0__["Box3"]).setFromPoints(points).getCenter()}let maxRadiusSq=0;for(let i=0,il=points.length;i<il;i++){maxRadiusSq=Math.max(maxRadiusSq,this.center.distanceToSquared(points[i]))}this.radius=Math.sqrt(maxRadiusSq);return this}clone(){return(new this.constructor).copy(this)}copy(sphere){this.center.copy(sphere.center);this.radius=sphere.radius;return this}empty(){return this.radius<=0}containsPoint(point){return point.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(point){return point.distanceTo(this.center)-this.radius}intersectsSphere(sphere){const radiusSum=this.radius+sphere.radius;return sphere.center.distanceToSquared(this.center)<=radiusSum*radiusSum}intersectsBox(box){return box.intersectsSphere(this)}intersectsPlane(plane){return Math.abs(plane.distanceToPoint(this.center))<=this.radius}clampPoint(point){const deltaLengthSquared=this.center.distanceToSquared(point);const result=(new _Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).copy(point);if(deltaLengthSquared>this.radius*this.radius){result.sub(this.center).normalize();result.multiplyScalar(this.radius).add(this.center)}return result}getBoundingBox(){return(new _Box3__WEBPACK_IMPORTED_MODULE_0__["Box3"]).set(this.center,this.center).expandByScalar(this.radius)}applyMatrix4(matrix){this.center.applyMatrix4(matrix);this.radius=this.radius*matrix.getMaxScaleOnAxis();return this}translate(offset){this.center.add(offset);return this}equals(sphere){return sphere.center.equals(this.center)&&sphere.radius===this.radius}}
/***/},
/***/"./src/math/Triangle.ts":
/*!******************************!*\
  !*** ./src/math/Triangle.ts ***!
  \******************************/
/*! exports provided: Triangle */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Triangle",function(){return Triangle});
/* harmony import */var _Line3__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Line3 */"./src/math/Line3.ts");
/* harmony import */var _Plane__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Plane */"./src/math/Plane.ts");
/* harmony import */var _Vector3__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./Vector3 */"./src/math/Vector3.ts");class Triangle{constructor(a=new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"],b=new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"],c=new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]){this.a=new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"];this.b=new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"];this.c=new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"];this.a=a;this.b=b;this.c=c}set(a,b,c){this.a.copy(a);this.b.copy(b);this.c.copy(c);return this}clone(){return(new this.constructor).copy(this)}copy(triangle){this.a.copy(triangle.a);this.b.copy(triangle.b);this.c.copy(triangle.c);return this}area(){const v0=(new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).copy(this.c).sub(this.b);const v1=(new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).copy(this.a).sub(this.b);return v0.cross(v1).length()*.5}midpoint(){return(new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).copy(this.a).add(this.b).add(this.c).multiplyScalar(1/3)}normal(){const vec=(new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).copy(this.a).sub(this.b);const result=(new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).copy(this.c).sub(this.b).cross(vec);const resultLengthSquared=result.lengthSquared();if(resultLengthSquared>0){return result.multiplyScalar(1/Math.sqrt(resultLengthSquared))}return result.set(0,0,0)}plane(){return(new _Plane__WEBPACK_IMPORTED_MODULE_1__["Plane"]).setFromCoplanarPoints(this.a,this.b,this.c)}
/**
     * based on: http://www.blackpawn.com/texts/pointinpoly/default.html
     * @param point
     */barycoordFromPoint(point){const v0=(new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).copy(this.c).sub(this.a);const v1=(new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).copy(this.b).sub(this.a);const v2=(new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).copy(point).sub(this.a);const dot00=v0.dot(v0);const dot01=v0.dot(v1);const dot02=v0.dot(v2);const dot11=v1.dot(v1);const dot12=v1.dot(v2);const denom=dot00*dot11-dot01*dot01;
// collinear or singular triangle
if(denom===0){
// arbitrary location outside of triangle?
// not sure if this is the best idea, maybe should be returning undefined
return(new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).set(-2,-1,-1)}const invDenom=1/denom;const u=(dot11*dot02-dot01*dot12)*invDenom;const v=(dot00*dot12-dot01*dot02)*invDenom;
// barycentric coordinates must always sum to 1
return(new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).set(1-u-v,v,u)}containsPoint(point){const result=this.barycoordFromPoint(point);return result.x>=0&&result.y>=0&&result.x+result.y<=1}closestPointToPoint(point){
// project the point onto the plane of the triangle
const plane=(new _Plane__WEBPACK_IMPORTED_MODULE_1__["Plane"]).setFromCoplanarPoints(this.a,this.b,this.c);const projectedPoint=plane.projectPoint(point);
// check if the projection lies within the triangle
if(this.containsPoint(projectedPoint)===true){
// if so, this is the closest point
return(new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).copy(projectedPoint)}else{const result=new _Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"];let minDistance=Infinity;
// if not, the point falls outside the triangle. the result is the closest point to the triangle's edges or vertices
const edgeList=[new _Line3__WEBPACK_IMPORTED_MODULE_0__["Line3"](this.a,this.b),new _Line3__WEBPACK_IMPORTED_MODULE_0__["Line3"](this.b,this.c),new _Line3__WEBPACK_IMPORTED_MODULE_0__["Line3"](this.c,this.a)];for(let i=0;i<edgeList.length;i++){const closestPoint=edgeList[i].closestPointToPoint(projectedPoint,true);const distance=projectedPoint.distanceToSquared(closestPoint);if(distance<minDistance){minDistance=distance;result.copy(closestPoint)}}return result}}equals(triangle){return triangle.a.equals(this.a)&&triangle.b.equals(this.b)&&triangle.c.equals(this.c)}}
/***/},
/***/"./src/math/Vector2.ts":
/*!*****************************!*\
  !*** ./src/math/Vector2.ts ***!
  \*****************************/
/*! exports provided: Vector2 */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Vector2",function(){return Vector2});class Vector2{get x(){return this._x}set x(x){this._x=x}get y(){return this._y}set y(y){this._y=y}get width(){return this.x}set width(width){this._x=width}get height(){return this.y}set height(height){this._y=height}constructor(x=0,y=0){this._x=x;this._y=y}set(x,y){this._x=x;this._y=y;return this}setScalar(scalar){return this.set(scalar,scalar)}copy(v){return this.set(v.x,v.y)}add(v){return this.set(this.x+v.x,this.y+v.y)}addScalar(s){return this.set(this.x+s,this.y+s)}sub(v){return this.set(this.x-v.x,this.y-v.y)}subScalar(s){return this.set(this.x-s,this.y-s)}multiply(v){return this.set(this.x*v.x,this.y*v.y)}multiplyScalar(s){return this.set(this.x*s,this.y*s)}divide(v){return this.set(this.x/v.x,this.y/v.y)}divideScalar(s){return this.set(this.x/s,this.y/s)}applyMatrix3(m){const x=this.x,y=this.y;const e=m.elements;return this.set(e[0]*x+e[3]*y+e[6],e[1]*x+e[4]*y+e[7])}min(v){this.x=Math.min(this.x,v.x);this.y=Math.min(this.y,v.y);return this}max(v){this.x=Math.max(this.x,v.x);this.y=Math.max(this.y,v.y);return this}clamp(min,max){return this.set(Math.max(min.x,Math.min(max.x,this.x)),Math.max(min.y,Math.min(max.y,this.y)))}negate(){return this.set(-this.x,-this.y)}dot(v){return this.x*v.x+this.y*v.y}lengthSquared(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.lengthSquared())}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}setLength(length){return this.normalize().multiplyScalar(length)}lerp(v,alpha){return this.set(this.x+(v.x-this.x)*alpha,this.y+(v.y-this.y)*alpha)}lerpVectors(v1,v2,alpha){return this.copy(v2).sub(v1).multiplyScalar(alpha).add(v1)}equals(v){return v.x===this.x&&v.y===this.y}fromArray(array,offset=0){return this.set(array[offset],array[offset+1])}toArray(array=[],offset=0){array[offset]=this.x;array[offset+1]=this.y;return array}rotateAround(center,angle){const c=Math.cos(angle),s=Math.sin(angle);const x=this.x-center.x;const y=this.y-center.y;return this.set(x*c-y*s+center.x,x*s+y*c+center.y)}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/math/Vector3.ts":
/*!*****************************!*\
  !*** ./src/math/Vector3.ts ***!
  \*****************************/
/*! exports provided: Vector3 */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Vector3",function(){return Vector3});
/* harmony import */var _Math__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Math */"./src/math/Math.ts");
/* harmony import */var _Quaternion__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Quaternion */"./src/math/Quaternion.ts");class Vector3{constructor(x=0,y=0,z=0){this._x=x;this._y=y;this._z=z}get x(){return this._x}set x(x){this._x=x}get y(){return this._y}set y(y){this._y=y}get z(){return this._z}set z(z){this._z=z}set(x,y,z){this._x=x;this._y=y;this._z=z;return this}setScalar(scalar){return this.set(scalar,scalar,scalar)}copy(vec){return this.set(vec.x,vec.y,vec.z)}add(vec){return this.set(this.x+vec.x,this.y+vec.y,this.z+vec.z)}addScalar(scalar){return this.set(this.x+scalar,this.y+scalar,this.z+scalar)}sub(vec){return this.set(this.x-vec.x,this.y-vec.y,this.z-vec.z)}subScalar(scalar){return this.set(this.x-scalar,this.y-scalar,this.z-scalar)}multiply(vec){return this.set(this.x*vec.x,this.y*vec.y,this.z*vec.z)}multiplyScalar(scalar){return this.set(this.x*scalar,this.y*scalar,this.z*scalar)}divide(vec){return this.set(this.x/vec.x,this.y/vec.y,this.z/vec.z)}divideScalar(scalar){return this.set(this.x/scalar,this.y/scalar,this.z/scalar)}applyEuler(euler){const quaternion=new _Quaternion__WEBPACK_IMPORTED_MODULE_1__["Quaternion"];return this.applyQuaternion(quaternion.setFromEuler(euler))}applyAxisAngle(axis,angle){const quaternion=new _Quaternion__WEBPACK_IMPORTED_MODULE_1__["Quaternion"];return this.applyQuaternion(quaternion.setFromAxisAngle(axis,angle))}applyMatrix3(m){const x=this.x,y=this.y,z=this.z;const e=m.elements;return this.set(e[0]*x+e[3]*y+e[6]*z,e[1]*x+e[4]*y+e[7]*z,e[2]*x+e[5]*y+e[8]*z)}applyMatrix4(matrix){const x=this.x,y=this.y,z=this.z;const e=matrix.elements;const w=1/(e[3]*x+e[7]*y+e[11]*z+e[15]);return this.set((e[0]*x+e[4]*y+e[8]*z+e[12])*w,(e[1]*x+e[5]*y+e[9]*z+e[13])*w,(e[2]*x+e[6]*y+e[10]*z+e[14])*w)}applyQuaternion(quaternion){const x=this.x,y=this.y,z=this.z;const qx=quaternion.x,qy=quaternion.y,qz=quaternion.z,qw=quaternion.w;
// calculate quat * vector
const ix=qw*x+qy*z-qz*y;const iy=qw*y+qz*x-qx*z;const iz=qw*z+qx*y-qy*x;const iw=-qx*x-qy*y-qz*z;
// calculate result * inverse quat
return this.set(ix*qw+iw*-qx+iy*-qz-iz*-qy,iy*qw+iw*-qy+iz*-qx-ix*-qz,iz*qw+iw*-qz+ix*-qy-iy*-qx)}transformDirection(mat4){const x=this.x,y=this.y,z=this.z;const e=mat4.elements;return this.set(e[0]*x+e[4]*y+e[8]*z,e[1]*x+e[5]*y+e[9]*z,e[2]*x+e[6]*y+e[10]*z).normalize()}min(vec){return this.set(Math.min(this.x,vec.x),Math.min(this.y,vec.y),Math.min(this.z,vec.z))}max(vec){return this.set(Math.max(this.x,vec.x),Math.max(this.y,vec.y),Math.max(this.z,vec.z))}clamp(min,max){return this.set(Math.max(min.x,Math.min(max.x,this.x)),Math.max(min.y,Math.min(max.y,this.y)),Math.max(min.z,Math.min(max.z,this.z)))}negate(){return this.set(-this.x,-this.y,-this.z)}dot(v){return this.x*v.x+this.y*v.y+this.z*v.z}lengthSquared(){const x=this.x,y=this.y,z=this.z;return x*x+y*y+z*z}length(){const x=this.x,y=this.y,z=this.z;return Math.sqrt(x*x+y*y+z*z)}setLength(length){return this.normalize().multiplyScalar(length)}manhattanLength(){const x=this.x,y=this.y,z=this.z;return Math.abs(x)+Math.abs(y)+Math.abs(z)}normalize(){return this.divideScalar(this.length()||1)}lerp(vec,alpha){return this.set((vec.x-this.x)*alpha,(vec.y-this.y)*alpha,(vec.z-this.z)*alpha)}lerpVectors(v1,v2,alpha){return this.set(v2.x-v1.x,v2.y-v1.y,v2.z-v1.z).multiplyScalar(alpha).add(v1)}cross(vec){const ax=this.x,ay=this.y,az=this.z;const bx=vec.x,by=vec.y,bz=vec.z;return this.set(ay*bz-az*by,az*bx-ax*bz,ax*by-ay*bx)}projectOnVector(vector){const scalar=vector.dot(this)/vector.lengthSquared();return this.copy(vector).multiplyScalar(scalar)}projectOnPlane(planeNormal){const vec=new Vector3;vec.copy(this).projectOnVector(planeNormal);return this.sub(vec)}
/**
     * reflect incident vector off plane orthogonal to normal
     * normal is assumed to have unit length
     * @param normal
     * @returns {Vector3}
     */reflect(normal){const vec=new Vector3;return this.sub(vec.copy(normal).multiplyScalar(2*this.dot(normal)))}angleTo(v){const theta=this.dot(v)/Math.sqrt(this.lengthSquared()*v.lengthSquared());return Math.acos(_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].clamp(theta,-1,1))}distanceTo(vec){return Math.sqrt(this.distanceToSquared(vec))}distanceToSquared(vec){const dx=this.x-vec.x,dy=this.y-vec.y,dz=this.z-vec.z;return dx*dx+dy*dy+dz*dz}equals(vec){return vec.x===this.x&&vec.y===this.y&&vec.z===this.z}setFromMatrixPosition(m){const e=m.elements;return this.set(e[12],e[13],e[14])}setFromMatrixScale(m){const sx=this.setFromMatrixColumn(m,0).length();const sy=this.setFromMatrixColumn(m,1).length();const sz=this.setFromMatrixColumn(m,2).length();this.x=sx;this.y=sy;this.z=sz;return this}setFromMatrixColumn(m,index){return this.fromArray(m.elements,index*4)}fromArray(array,offset=0){return this.set(array[offset],array[offset+1],array[offset+2])}toArray(array=[],offset=0){array[offset]=this.x;array[offset+1]=this.y;array[offset+2]=this.z;return array}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/math/Vector4.ts":
/*!*****************************!*\
  !*** ./src/math/Vector4.ts ***!
  \*****************************/
/*! exports provided: Vector4 */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Vector4",function(){return Vector4});class Vector4{constructor(x=0,y=0,z=0,w=0){this._x=x;this._y=y;this._z=z;this._w=w}get x(){return this._x}set x(x){this._x=x}get y(){return this._y}set y(y){this._y=y}get z(){return this._z}set z(z){this._z=z}get w(){return this._w}set w(w){this._w=w}set(x,y,z,w){this._x=x;this._y=y;this._z=z;this._w=w;return this}setScalar(scalar){return this.set(scalar,scalar,scalar,scalar)}copy(v){return this.set(v.x,v.y,v.z,(v instanceof Vector4?v.w:undefined)||1)}add(v){return this.set(this.x+v.x,this.y+v.y,this.z+v.z,this.w+v.w)}addScalar(s){return this.set(this.x+s,this.y+s,this.z+s,this.w+s)}sub(v){return this.set(this.x-v.x,this.y-v.y,this.z-v.z,this.w-v.w)}subScalar(s){return this.set(this.x-s,this.y-s,this.z-s,this.w-s)}multiplyScalar(s){return this.set(this.x*s,this.y*s,this.z*s,this.w*s)}divideScalar(s){return this.set(this.x/s,this.y/s,this.z/s,this.w/s)}applyMatrix4(m){const x=this.x,y=this.y,z=this.z,w=this.w;const e=m.elements;return this.set(e[0]*x+e[4]*y+e[8]*z+e[12]*w,e[1]*x+e[5]*y+e[9]*z+e[13]*w,e[2]*x+e[6]*y+e[10]*z+e[14]*w,e[3]*x+e[7]*y+e[11]*z+e[15]*w)}
/**
     * http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
     * q is assumed to be normalized
     * @param q
     * @returns {Vector4}
     */setAxisAngleFromQuaternion(q){const s=Math.sqrt(1-q.w*q.w);if(s<1e-4){return this.set(1,0,0,2*Math.acos(q.w))}else{return this.set(q.x/s,q.y/s,q.z/s,2*Math.acos(q.w))}}
/**
     * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
     * @param m
     * @returns {Vector4}
     */setAxisAngleFromRotationMatrix(m){
// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
let angle,x,y,z;// variables for result
const epsilon=.01,// margin to allow for rounding errors
epsilon2=.1,// margin to distinguish between 0 and 180 degrees
te=m.elements,m11=te[0],m12=te[4],m13=te[8],m21=te[1],m22=te[5],m23=te[9],m31=te[2],m32=te[6],m33=te[10];if(Math.abs(m12-m21)<epsilon&&Math.abs(m13-m31)<epsilon&&Math.abs(m23-m32)<epsilon){
// singularity found
// first check for identity matrix which must have +1 for all terms
// in leading diagonal and zero in other terms
if(Math.abs(m12+m21)<epsilon2&&Math.abs(m13+m31)<epsilon2&&Math.abs(m23+m32)<epsilon2&&Math.abs(m11+m22+m33-3)<epsilon2){
// this singularity is identity matrix so angle = 0
// zero angle, arbitrary axis
return this.set(1,0,0,0)}
// otherwise this singularity is angle = 180
angle=Math.PI;const xx=(m11+1)/2;const yy=(m22+1)/2;const zz=(m33+1)/2;const xy=(m12+m21)/4;const xz=(m13+m31)/4;const yz=(m23+m32)/4;if(xx>yy&&xx>zz){
// m11 is the largest diagonal term
if(xx<epsilon){x=0;y=.707106781;z=.707106781}else{x=Math.sqrt(xx);y=xy/x;z=xz/x}}else if(yy>zz){
// m22 is the largest diagonal term
if(yy<epsilon){x=.707106781;y=0;z=.707106781}else{y=Math.sqrt(yy);x=xy/y;z=yz/y}}else{
// m33 is the largest diagonal term so base result on this
if(zz<epsilon){x=.707106781;y=.707106781;z=0}else{z=Math.sqrt(zz);x=xz/z;y=yz/z}}
// return 180 deg rotation
return this.set(x,y,z,angle)}
// as we have reached here there are no singularities so we can handle normally
let s=Math.sqrt((m32-m23)*(m32-m23)+(m13-m31)*(m13-m31)+(m21-m12)*(m21-m12));// used to normalize
if(Math.abs(s)<.001)s=1;
// prevent divide by zero, should not happen if matrix is orthogonal and should be
// caught by singularity test above, but I"ve left it in just in case
return this.set((m32-m23)/s,(m13-m31)/s,(m21-m12)/s,Math.acos((m11+m22+m33-1)/2))}min(v){return this.set(Math.min(this.x,v.x),Math.min(this.y,v.y),Math.min(this.z,v.z),Math.min(this.w,v.w))}max(v){return this.set(Math.max(this.x,v.x),Math.max(this.y,v.y),Math.max(this.z,v.z),Math.max(this.w,v.w))}clamp(min,max){return this.set(Math.max(min.x,Math.min(max.x,this.x)),Math.max(min.y,Math.min(max.y,this.y)),Math.max(min.z,Math.min(max.z,this.z)),Math.max(min.w,Math.min(max.w,this.w)))}negate(){return this.set(-this.x,-this.y,-this.z,-this.w)}dot(v){return this.x*v.x+this.y*v.y+this.z*v.z+this.w*v.w}lengthSquared(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.lengthSquared())}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(length){return this.normalize().multiplyScalar(length)}lerp(v,alpha){return this.set(this.x+(v.x-this.x)*alpha,this.y+(v.y-this.y)*alpha,this.z+(v.z-this.z)*alpha,this.w+(v.w-this.w)*alpha)}lerpVectors(v1,v2,alpha){return this.copy(v2).sub(v1).multiplyScalar(alpha).add(v1)}equals(v){return v.x===this.x&&v.y===this.y&&v.z===this.z&&v.w===this.w}fromArray(array,offset=0){return this.set(array[offset],array[offset+1],array[offset+2],array[offset+3])}toArray(array=[],offset=0){array[offset]=this.x;array[offset+1]=this.y;array[offset+2]=this.z;array[offset+3]=this.w;return array}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/objects/Bone.ts":
/*!*****************************!*\
  !*** ./src/objects/Bone.ts ***!
  \*****************************/
/*! exports provided: Bone */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Bone",function(){return Bone});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");class Bone extends _core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"]{constructor(){super(...arguments);this.type="Bone"}}
/***/},
/***/"./src/objects/Group.ts":
/*!******************************!*\
  !*** ./src/objects/Group.ts ***!
  \******************************/
/*! exports provided: Group */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Group",function(){return Group});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");class Group extends _core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"]{constructor(){super(...arguments);this.type="IGroup"}}
/***/},
/***/"./src/objects/LOD.ts":
/*!****************************!*\
  !*** ./src/objects/LOD.ts ***!
  \****************************/
/*! exports provided: LOD */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LOD",function(){return LOD});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");class LOD extends _core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"]{constructor(){super(...arguments);this.type="LOD";this.levels=[]}addLevel(object,distance=0){const levels=this.levels;distance=Math.abs(distance);let l=0;for(;l<levels.length;l++){if(distance<levels[l].distance){break}}levels.splice(l,0,{distance:distance,object:object});this.add(object);return this}getObjectForDistance(distance){const levels=this.levels;let i=1;for(const l=levels.length;i<l;i++){if(distance<levels[i].distance){break}}return levels[i-1].object}raycast(raycaster,intersects=[]){const matrixPosition=(new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).setFromMatrixPosition(this.matrixWorld);const distance=raycaster.ray.origin.distanceTo(matrixPosition);this.getObjectForDistance(distance).raycast(raycaster,intersects);return intersects}update(camera){const levels=this.levels;if(levels.length>1){const v1=(new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).setFromMatrixPosition(camera.matrixWorld);const v2=(new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]).setFromMatrixPosition(this.matrixWorld);const distance=v1.distanceTo(v2);levels[0].object.visible=true;let i=1;const l=levels.length;for(;i<l;i++){if(distance>=levels[i].distance){levels[i-1].object.visible=false;levels[i].object.visible=true}else{break}}for(;i<l;i++){levels[i].object.visible=false}}return this}copy(source){super.copy(source);const levels=source.levels;for(let i=0,l=levels.length;i<l;i++){const level=levels[i];this.addLevel(level.object.clone(),level.distance)}return this}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/objects/Line.ts":
/*!*****************************!*\
  !*** ./src/objects/Line.ts ***!
  \*****************************/
/*! exports provided: Line */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Line",function(){return Line});
/* harmony import */var _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/BufferGeometry */"./src/core/BufferGeometry.ts");
/* harmony import */var _core_Geometry__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../core/Geometry */"./src/core/Geometry.ts");
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");
/* harmony import */var _materials_LineBasicMaterial__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../materials/LineBasicMaterial */"./src/materials/LineBasicMaterial.ts");
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _math_Ray__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ../math/Ray */"./src/math/Ray.ts");
/* harmony import */var _math_Sphere__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ../math/Sphere */"./src/math/Sphere.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _LineSegments__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(/*! ./LineSegments */"./src/objects/LineSegments.ts");class Line extends _core_Object3D__WEBPACK_IMPORTED_MODULE_2__["Object3D"]{constructor(geometry=new _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"],material=new _materials_LineBasicMaterial__WEBPACK_IMPORTED_MODULE_3__["LineBasicMaterial"]({color:Math.random()*16777215})){super();this.type="Line";this.geometry=geometry;this.material=material}raycast(raycaster,intersects){const precision=raycaster.linePrecision;const precisionSquared=precision*precision;const geometry=this.geometry;const matrixWorld=this.matrixWorld;
// Checking boundingSphere distance to ray
if(geometry.boundingSphere===null)geometry.computeBoundingSphere();const sphere=(new _math_Sphere__WEBPACK_IMPORTED_MODULE_6__["Sphere"]).copy(geometry.boundingSphere);sphere.applyMatrix4(matrixWorld);if(raycaster.ray.intersectsSphere(sphere)===false)return;const inverseMatrix=(new _math_Matrix4__WEBPACK_IMPORTED_MODULE_4__["Matrix4"]).getInverse(matrixWorld);const ray=new _math_Ray__WEBPACK_IMPORTED_MODULE_5__["Ray"];ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);const vStart=new _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"];const vEnd=new _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"];const interSegment=new _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"];const interRay=new _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"];const step=this instanceof _LineSegments__WEBPACK_IMPORTED_MODULE_8__["LineSegments"]?2:1;if(geometry instanceof _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"]){const index=geometry.index;const attributes=geometry.attributes;const positions=attributes.position.array;if(index!==null){const indices=index.array;for(let i=0,l=indices.length-1;i<l;i+=step){const a=indices[i];const b=indices[i+1];vStart.fromArray(positions,a*3);vEnd.fromArray(positions,b*3);const distSquared=ray.distanceSqToSegment(vStart,vEnd,interRay,interSegment);if(distSquared>precisionSquared)continue;interRay.applyMatrix4(this.matrixWorld);// Move back to world space for distance calculation
const distance=raycaster.ray.origin.distanceTo(interRay);if(distance<raycaster.near||distance>raycaster.far){continue}intersects.push({distance:distance,index:i,object:this,
// What do we want? intersection point on the ray or on the segment??
// point: raycaster.ray.at( distance ),
point:interSegment.clone().applyMatrix4(this.matrixWorld)})}}else{for(let i=0,l=positions.length/3-1;i<l;i+=step){vStart.fromArray(positions,3*i);vEnd.fromArray(positions,3*i+3);const distSquared=ray.distanceSqToSegment(vStart,vEnd,interRay,interSegment);if(distSquared>precisionSquared)continue;interRay.applyMatrix4(this.matrixWorld);// Move back to world space for distance calculation
const distance=raycaster.ray.origin.distanceTo(interRay);if(distance<raycaster.near||distance>raycaster.far){continue}intersects.push({distance:distance,face:null,faceIndex:null,index:i,object:this,
// What do we want? intersection point on the ray or on the segment??
// point: raycaster.ray.at( distance ),
point:interSegment.clone().applyMatrix4(this.matrixWorld)})}}}else if(geometry instanceof _core_Geometry__WEBPACK_IMPORTED_MODULE_1__["Geometry"]){const vertices=geometry.vertices;const nbVertices=vertices.length;for(let i=0;i<nbVertices-1;i+=step){const distSquared=ray.distanceSqToSegment(vertices[i],vertices[i+1],interRay,interSegment);if(distSquared>precisionSquared)continue;interRay.applyMatrix4(this.matrixWorld);// Move back to world space for distance calculation
const distance=raycaster.ray.origin.distanceTo(interRay);if(distance<raycaster.near||distance>raycaster.far){continue}intersects.push({distance:distance,face:null,faceIndex:null,index:i,object:this,
// What do we want? intersection point on the ray or on the segment??
// point: raycaster.ray.at( distance ),
point:interSegment.clone().applyMatrix4(this.matrixWorld)})}}}clone(){return new this.constructor(this.geometry,this.material).copy(this)}}
/***/},
/***/"./src/objects/LineLoop.ts":
/*!*********************************!*\
  !*** ./src/objects/LineLoop.ts ***!
  \*********************************/
/*! exports provided: LineLoop */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LineLoop",function(){return LineLoop});
/* harmony import */var _Line__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Line */"./src/objects/Line.ts");class LineLoop extends _Line__WEBPACK_IMPORTED_MODULE_0__["Line"]{constructor(){super(...arguments);this.type="LineLoop"}}
/***/},
/***/"./src/objects/LineSegments.ts":
/*!*************************************!*\
  !*** ./src/objects/LineSegments.ts ***!
  \*************************************/
/*! exports provided: LineSegments */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"LineSegments",function(){return LineSegments});
/* harmony import */var _Line__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Line */"./src/objects/Line.ts");class LineSegments extends _Line__WEBPACK_IMPORTED_MODULE_0__["Line"]{constructor(){super(...arguments);this.type="LineSegments"}}
/***/},
/***/"./src/objects/Mesh.ts":
/*!*****************************!*\
  !*** ./src/objects/Mesh.ts ***!
  \*****************************/
/*! exports provided: Mesh */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Mesh",function(){return Mesh});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../constants */"./src/constants.ts");
/* harmony import */var _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../core/BufferGeometry */"./src/core/BufferGeometry.ts");
/* harmony import */var _core_Face3__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../core/Face3 */"./src/core/Face3.ts");
/* harmony import */var _core_Geometry__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../core/Geometry */"./src/core/Geometry.ts");
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");
/* harmony import */var _materials_MeshBasicMaterial__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ../materials/MeshBasicMaterial */"./src/materials/MeshBasicMaterial.ts");
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ../math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _math_Ray__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! ../math/Ray */"./src/math/Ray.ts");
/* harmony import */var _math_Sphere__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(/*! ../math/Sphere */"./src/math/Sphere.ts");
/* harmony import */var _math_Triangle__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(/*! ../math/Triangle */"./src/math/Triangle.ts");
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(/*! ../math/Vector2 */"./src/math/Vector2.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _utils__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(/*! ../utils */"./src/utils.ts");class Mesh extends _core_Object3D__WEBPACK_IMPORTED_MODULE_4__["Object3D"]{constructor(geometry=new _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__["BufferGeometry"],material=new _materials_MeshBasicMaterial__WEBPACK_IMPORTED_MODULE_5__["MeshBasicMaterial"]({color:Math.random()*16777215})){super();this.type="Mesh";this.drawMode=_constants__WEBPACK_IMPORTED_MODULE_0__["TrianglesDrawMode"];this.morphTargetInfluences=[];this.morphTargetDictionary={};this.geometry=geometry;this.material=material;this.updateMorphTargets()}static uvIntersection(point,triangle,uv1,uv2,uv3){const baryCoord=triangle.barycoordFromPoint(point);uv1.multiplyScalar(baryCoord.x);uv2.multiplyScalar(baryCoord.y);uv3.multiplyScalar(baryCoord.z);uv1.add(uv2).add(uv3);return uv1.clone()}static checkIntersection(object,material,raycaster,ray,pA,pB,pC,point){let intersect;const intersectionPointWorld=new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"];if(material.side===_constants__WEBPACK_IMPORTED_MODULE_0__["BackSide"]){intersect=ray.intersectTriangle(new _math_Triangle__WEBPACK_IMPORTED_MODULE_9__["Triangle"](pC,pB,pA),true)}else{intersect=ray.intersectTriangle(new _math_Triangle__WEBPACK_IMPORTED_MODULE_9__["Triangle"](pC,pB,pA),material.side!==_constants__WEBPACK_IMPORTED_MODULE_0__["DoubleSide"])}if(intersect===null)return null;point.copy(intersect);intersectionPointWorld.copy(point);intersectionPointWorld.applyMatrix4(object.matrixWorld);const distance=raycaster.ray.origin.distanceTo(intersectionPointWorld);if(distance<raycaster.near||distance>raycaster.far)return null;return{distance:distance,object:object,point:intersectionPointWorld.clone()}}static checkBufferGeometryIntersection(object,raycaster,ray,position,uv,a,b,c){const intersectionPoint=new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"];const vA=Object(_utils__WEBPACK_IMPORTED_MODULE_12__["vectorFromBufferAttribute"])(new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"],position,a);const vB=Object(_utils__WEBPACK_IMPORTED_MODULE_12__["vectorFromBufferAttribute"])(new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"],position,b);const vC=Object(_utils__WEBPACK_IMPORTED_MODULE_12__["vectorFromBufferAttribute"])(new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"],position,c);const triangle=new _math_Triangle__WEBPACK_IMPORTED_MODULE_9__["Triangle"](Object(_utils__WEBPACK_IMPORTED_MODULE_12__["vectorFromBufferAttribute"])(new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"],position,a),Object(_utils__WEBPACK_IMPORTED_MODULE_12__["vectorFromBufferAttribute"])(new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"],position,b),Object(_utils__WEBPACK_IMPORTED_MODULE_12__["vectorFromBufferAttribute"])(new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"],position,c));const intersection=Mesh.checkIntersection(object,object.material,raycaster,ray,vA,vB,vC,intersectionPoint);if(intersection){if(uv){const uvA=Object(_utils__WEBPACK_IMPORTED_MODULE_12__["vectorFromBufferAttribute"])(new _math_Vector2__WEBPACK_IMPORTED_MODULE_10__["Vector2"],uv,a);const uvB=Object(_utils__WEBPACK_IMPORTED_MODULE_12__["vectorFromBufferAttribute"])(new _math_Vector2__WEBPACK_IMPORTED_MODULE_10__["Vector2"],uv,b);const uvC=Object(_utils__WEBPACK_IMPORTED_MODULE_12__["vectorFromBufferAttribute"])(new _math_Vector2__WEBPACK_IMPORTED_MODULE_10__["Vector2"],uv,c);intersection.uv=Mesh.uvIntersection(intersectionPoint,triangle,uvA,uvB,uvC)}intersection.face=new _core_Face3__WEBPACK_IMPORTED_MODULE_2__["Face3"](a,b,c,triangle.normal());intersection.faceIndex=a}return intersection}setDrawMode(value){this.drawMode=value;return this}updateMorphTargets(){const geometry=this.geometry;if(geometry instanceof _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__["BufferGeometry"]){const morphAttributes=geometry.morphAttributes;const keys=Object.keys(morphAttributes);if(keys.length>0){const morphAttribute=morphAttributes[keys[0]];if(morphAttribute!==undefined){for(let m=0,ml=morphAttribute.length;m<ml;m++){const name=morphAttribute[m].name||String(m);this.morphTargetInfluences.push(0);this.morphTargetDictionary[name]=m}}}}else if(geometry instanceof _core_Geometry__WEBPACK_IMPORTED_MODULE_3__["Geometry"]){const morphTargets=geometry.morphTargets;if(morphTargets!==undefined&&morphTargets.length>0){for(let m=0,ml=morphTargets.length;m<ml;m++){const name=morphTargets[m].name||String(m);this.morphTargetInfluences.push(0);this.morphTargetDictionary[name]=m}}}return this}raycast(raycaster,intersects){const geometry=this.geometry;const material=this.material;const matrixWorld=this.matrixWorld;if(material===undefined)return;
// Checking boundingSphere distance to ray
if(geometry.boundingSphere===null)geometry.computeBoundingSphere();const sphere=(new _math_Sphere__WEBPACK_IMPORTED_MODULE_8__["Sphere"]).copy(geometry.boundingSphere).applyMatrix4(matrixWorld);if(raycaster.ray.intersectsSphere(sphere)===false)return;const inverseMatrix=(new _math_Matrix4__WEBPACK_IMPORTED_MODULE_6__["Matrix4"]).getInverse(matrixWorld);const ray=(new _math_Ray__WEBPACK_IMPORTED_MODULE_7__["Ray"]).copy(raycaster.ray).applyMatrix4(inverseMatrix);
// Check boundingBox before continuing
if(geometry.boundingBox!==null){if(ray.intersectsBox(geometry.boundingBox)===false)return}if(geometry instanceof _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__["BufferGeometry"]){const index=geometry.index;const position=geometry.attributes.position;const uv=geometry.attributes.uv;if(index!==null){
// indexed buffer geometry
for(let i=0,l=index.count;i<l;i+=3){const a=index.getProperty(i,"x");const b=index.getProperty(i+1,"x");const c=index.getProperty(i+2,"x");const intersection=Mesh.checkBufferGeometryIntersection(this,raycaster,ray,position,uv,a,b,c);if(intersection){intersection.faceIndex=Math.floor(i/3);// triangle number in indices buffer semantics
intersects.push(intersection)}}}else if(position!==undefined){
// non-indexed buffer geometry
for(let i=0,l=position.count;i<l;i+=3){const a=i;const b=i+1;const c=i+2;const intersection=Mesh.checkBufferGeometryIntersection(this,raycaster,ray,position,uv,a,b,c);if(intersection){intersection.index=a;// triangle number in positions buffer semantics
intersects.push(intersection)}}}}else if(geometry instanceof _core_Geometry__WEBPACK_IMPORTED_MODULE_3__["Geometry"]){const vertices=geometry.vertices;const faces=geometry.faces;let uvs;const faceVertexUvs=geometry.faceVertexUvs[0];if(faceVertexUvs.length>0)uvs=faceVertexUvs;for(let f=0,fl=faces.length;f<fl;f++){const face=faces[f];const faceMaterial=Array.isArray(material)?material[face.materialIndex]:material;if(faceMaterial===undefined)continue;let fvA=vertices[face.a];let fvB=vertices[face.b];let fvC=vertices[face.c];if(faceMaterial.morphTargets===true){const morphTargets=geometry.morphTargets;const vA=new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"],vB=new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"],vC=new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"];for(let t=0,tl=morphTargets.length;t<tl;t++){const influence=this.morphTargetInfluences[t];if(influence===0)continue;const targets=morphTargets[t].vertices;vA.add((new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"]).copy(targets[face.a]).sub(fvA).multiplyScalar(influence));vB.add((new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"]).copy(targets[face.b]).sub(fvB).multiplyScalar(influence));vC.add((new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"]).copy(targets[face.c]).sub(fvC).multiplyScalar(influence))}vA.add(fvA);vB.add(fvB);vC.add(fvC);fvA=vA;fvB=vB;fvC=vC}const intersectionPoint=new _math_Vector3__WEBPACK_IMPORTED_MODULE_11__["Vector3"];const intersection=Mesh.checkIntersection(this,faceMaterial,raycaster,ray,fvA,fvB,fvC,intersectionPoint);if(intersection){if(uvs&&uvs[f]){const uvsF=uvs[f];const uvA=(new _math_Vector2__WEBPACK_IMPORTED_MODULE_10__["Vector2"]).copy(uvsF[0]);const uvB=(new _math_Vector2__WEBPACK_IMPORTED_MODULE_10__["Vector2"]).copy(uvsF[1]);const uvC=(new _math_Vector2__WEBPACK_IMPORTED_MODULE_10__["Vector2"]).copy(uvsF[2]);intersection.uv=Mesh.uvIntersection(intersectionPoint,new _math_Triangle__WEBPACK_IMPORTED_MODULE_9__["Triangle"](fvA,fvB,fvC),uvA,uvB,uvC)}intersection.face=face;intersection.faceIndex=f;intersects.push(intersection)}}}}clone(){return new this.constructor(this.geometry,this.material).copy(this)}}
/***/},
/***/"./src/objects/Points.ts":
/*!*******************************!*\
  !*** ./src/objects/Points.ts ***!
  \*******************************/
/*! exports provided: Points */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Points",function(){return Points});
/* harmony import */var _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/BufferGeometry */"./src/core/BufferGeometry.ts");
/* harmony import */var _core_Geometry__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../core/Geometry */"./src/core/Geometry.ts");
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");
/* harmony import */var _materials_PointsMaterial__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../materials/PointsMaterial */"./src/materials/PointsMaterial.ts");
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _math_Ray__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ../math/Ray */"./src/math/Ray.ts");
/* harmony import */var _math_Sphere__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ../math/Sphere */"./src/math/Sphere.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");class Points extends _core_Object3D__WEBPACK_IMPORTED_MODULE_2__["Object3D"]{constructor(geometry=new _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"],material=new _materials_PointsMaterial__WEBPACK_IMPORTED_MODULE_3__["PointsMaterial"]({color:Math.random()*16777215})){super();this.type="Points";this.geometry=geometry;this.material=material}raycast(raycaster,intersects){const geometry=this.geometry;const matrixWorld=this.matrixWorld;const threshold=raycaster.params.Points.threshold;
// Checking boundingSphere distance to ray
if(geometry.boundingSphere===null)geometry.computeBoundingSphere();const sphere=(new _math_Sphere__WEBPACK_IMPORTED_MODULE_6__["Sphere"]).copy(geometry.boundingSphere);sphere.applyMatrix4(matrixWorld);sphere.radius+=threshold;if(raycaster.ray.intersectsSphere(sphere)===false)return;const inverseMatrix=(new _math_Matrix4__WEBPACK_IMPORTED_MODULE_4__["Matrix4"]).getInverse(matrixWorld);const ray=(new _math_Ray__WEBPACK_IMPORTED_MODULE_5__["Ray"]).copy(raycaster.ray).applyMatrix4(inverseMatrix);const testPoint=(point,index2)=>{const localThreshold=threshold/((this.scale.x+this.scale.y+this.scale.z)/3);const localThresholdSquare=localThreshold*localThreshold;const rayPointDistanceSquare=ray.distanceSquaredToPoint(point);if(rayPointDistanceSquare<localThresholdSquare){const intersectPoint=ray.closestPointToPoint(point);intersectPoint.applyMatrix4(matrixWorld);const distance=raycaster.ray.origin.distanceTo(intersectPoint);if(distance<raycaster.near||distance>raycaster.far){return}intersects.push({distance:distance,distanceToRay:Math.sqrt(rayPointDistanceSquare),face:null,index:index2,object:this,point:intersectPoint.clone()})}};if(geometry instanceof _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"]){const position=new _math_Vector3__WEBPACK_IMPORTED_MODULE_7__["Vector3"];const index=geometry.index;const positions=geometry.attributes.position.array;if(index!==null){const indices=index.array;for(let i=0,il=indices.length;i<il;i++){const a=indices[i];position.fromArray(positions,a*3);testPoint(position,a)}}else{for(let i=0,l=positions.length/3;i<l;i++){position.fromArray(positions,i*3);testPoint(position,i)}}}else if(geometry instanceof _core_Geometry__WEBPACK_IMPORTED_MODULE_1__["Geometry"]){const vertices=geometry.vertices;for(let i=0,l=vertices.length;i<l;i++){testPoint(vertices[i],i)}}}clone(){return new this.constructor(this.geometry,this.material).copy(this)}}
/***/},
/***/"./src/objects/Skeleton.ts":
/*!*********************************!*\
  !*** ./src/objects/Skeleton.ts ***!
  \*********************************/
/*! exports provided: Skeleton */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Skeleton",function(){return Skeleton});
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _Bone__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Bone */"./src/objects/Bone.ts");const offsetMatrix=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__["Matrix4"];const identityMatrix=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__["Matrix4"];class Skeleton{constructor(bones=[],boneInverses){this.bones=[];this.boneInverses=[];this.bones=bones.slice(0);this.boneMatrices=new Float32Array(this.bones.length*16);if(boneInverses===undefined){this.calculateInverses()}else{if(this.bones.length===boneInverses.length){this.boneInverses=boneInverses.slice(0)}else{console.warn("THREE.Skeleton boneInverses is the wrong length.");for(let i=0,il=this.bones.length;i<il;i++){this.boneInverses.push(new _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__["Matrix4"])}}}}calculateInverses(){this.boneInverses=[];for(let i=0,il=this.bones.length;i<il;i++){const inverse=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__["Matrix4"];if(this.bones[i]){inverse.getInverse(this.bones[i].matrixWorld)}this.boneInverses.push(inverse)}}pose(){
// recover the bind-time world matrices
for(let i=0,il=this.bones.length;i<il;i++){const bone=this.bones[i];if(bone){bone.matrixWorld.getInverse(this.boneInverses[i])}}
// compute the local matrices, positions, rotations and scales
for(let i=0,il=this.bones.length;i<il;i++){const bone=this.bones[i];if(bone){if(bone.parent&&bone.parent instanceof _Bone__WEBPACK_IMPORTED_MODULE_1__["Bone"]){bone.matrix.getInverse(bone.parent.matrixWorld);bone.matrix.multiply(bone.matrixWorld)}else{bone.matrix.copy(bone.matrixWorld)}bone.matrix.decompose(bone.position,bone.quaternion,bone.scale)}}}update(){const bones=this.bones;const boneInverses=this.boneInverses;const boneMatrices=this.boneMatrices;const boneTexture=this.boneTexture;
// flatten bone matrices to array
for(let i=0,il=bones.length;i<il;i++){
// compute the offset between the current and the original transform
const matrix=bones[i]?bones[i].matrixWorld:identityMatrix;offsetMatrix.multiplyMatrices(matrix,boneInverses[i]);offsetMatrix.toArray(boneMatrices,i*16)}if(boneTexture!==undefined){boneTexture.needsUpdate=true}}getBoneByName(name){for(let i=0,il=this.bones.length;i<il;i++){const bone=this.bones[i];if(bone.name===name){return bone}}return undefined}clone(){return new this.constructor(this.bones,this.boneInverses)}}
/***/},
/***/"./src/objects/SkinnedMesh.ts":
/*!************************************!*\
  !*** ./src/objects/SkinnedMesh.ts ***!
  \************************************/
/*! exports provided: SkinnedMesh */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"SkinnedMesh",function(){return SkinnedMesh});
/* harmony import */var _Mesh__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Mesh */"./src/objects/Mesh.ts");
/* harmony import */var _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../core/BufferGeometry */"./src/core/BufferGeometry.ts");
/* harmony import */var _core_Geometry__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../core/Geometry */"./src/core/Geometry.ts");
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _Bone__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./Bone */"./src/objects/Bone.ts");
/* harmony import */var _Skeleton__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ./Skeleton */"./src/objects/Skeleton.ts");
/* harmony import */var _math_Vector4__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ../math/Vector4 */"./src/math/Vector4.ts");class SkinnedMesh extends _Mesh__WEBPACK_IMPORTED_MODULE_0__["Mesh"]{
/**
     * skinIndices and skinWeights should be set to true on the Geometry
     * skinIndex and skinWeights attribute on BufferGeometry
     * @param geometry
     * @param material
     */
constructor(geometry,material){super(geometry,material);this.type="SkinnedMesh";this.bindMode="attached";this.bindMatrix=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"];this.bindMatrixInverse=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_3__["Matrix4"];const bones=this.initBones();const skeleton=new _Skeleton__WEBPACK_IMPORTED_MODULE_5__["Skeleton"](bones);this.bind(skeleton,this.matrixWorld);this.normalizeSkinWeights()}initBones(){const bones=[];if(this.geometry&&this.geometry instanceof _core_Geometry__WEBPACK_IMPORTED_MODULE_2__["Geometry"]&&this.geometry.bones!==undefined){
// first, create array of 'Bone' objects from geometry data
for(let i=0,il=this.geometry.bones.length;i<il;i++){const gbone=this.geometry.bones[i];
// create new 'Bone' object
const bone=new _Bone__WEBPACK_IMPORTED_MODULE_4__["Bone"];bones.push(bone);
// apply values
bone.name=gbone.name;bone.position.fromArray(gbone.pos);bone.quaternion.fromArray(gbone.rotq);if(gbone.scl!==undefined){bone.scale.fromArray(gbone.scl)}}
// second, create bone hierarchy
for(let i=0,il=this.geometry.bones.length;i<il;i++){const gbone=this.geometry.bones[i];if(gbone.parent!==-1&&gbone.parent!==null&&bones[gbone.parent]!==undefined){
// subsequent bones in the hierarchy
bones[gbone.parent].add(bones[i])}else{
// topmost bone, immediate child of the skinned mesh
this.add(bones[i])}}}
// now the bones are part of the scene graph and children of the skinned mesh.
// let's update the corresponding matrices
this.updateMatrixWorld(true);return bones}bind(skeleton,bindMatrix){this.skeleton=skeleton;if(bindMatrix===undefined){this.updateMatrixWorld(true);this.skeleton.calculateInverses();bindMatrix=this.matrixWorld}this.bindMatrix.copy(bindMatrix);this.bindMatrixInverse.getInverse(bindMatrix)}pose(){this.skeleton.pose()}normalizeSkinWeights(){if(this.geometry&&this.geometry instanceof _core_Geometry__WEBPACK_IMPORTED_MODULE_2__["Geometry"]){for(let i=0;i<this.geometry.skinWeights.length;i++){const sw=this.geometry.skinWeights[i];const scale=1/sw.manhattanLength();if(scale!==Infinity){sw.multiplyScalar(scale)}else{sw.set(1,0,0,0);// do something reasonable
}}}else if(this.geometry&&this.geometry instanceof _core_BufferGeometry__WEBPACK_IMPORTED_MODULE_1__["BufferGeometry"]){const vec=new _math_Vector4__WEBPACK_IMPORTED_MODULE_6__["Vector4"];const skinWeight=this.geometry.attributes.skinWeight;for(let i=0;i<skinWeight.count;i++){vec.x=skinWeight.getProperty(i,"x");vec.y=skinWeight.getProperty(i,"y");vec.z=skinWeight.getProperty(i,"z");vec.w=skinWeight.getProperty(i,"w");const scale=1/vec.manhattanLength();if(scale!==Infinity){vec.multiplyScalar(scale)}else{vec.set(1,0,0,0);// do something reasonable
}skinWeight.setProperty(i,"xyzw",vec)}}}updateMatrixWorld(force=false){super.updateMatrixWorld(force);if(this.bindMode==="attached"){this.bindMatrixInverse.getInverse(this.matrixWorld)}else if(this.bindMode==="detached"){this.bindMatrixInverse.getInverse(this.bindMatrix)}else{console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}return this}clone(){return new this.constructor(this.geometry,this.material).copy(this)}}
/***/},
/***/"./src/objects/Sprite.ts":
/*!*******************************!*\
  !*** ./src/objects/Sprite.ts ***!
  \*******************************/
/*! exports provided: Sprite */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Sprite",function(){return Sprite});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");
/* harmony import */var _materials_Materials__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../materials/Materials */"./src/materials/Materials.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Vector3 */"./src/math/Vector3.ts");class Sprite extends _core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"]{constructor(material=new _materials_Materials__WEBPACK_IMPORTED_MODULE_1__["SpriteMaterial"]){super();this.type="Sprite";this.material=material}raycast(raycaster,intersects){const worldPosition=(new _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).setFromMatrixPosition(this.matrixWorld);const intersectPoint=raycaster.ray.closestPointToPoint(worldPosition);const worldScale=(new _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]).setFromMatrixScale(this.matrixWorld);const guessSizeSq=worldScale.x*worldScale.y/4;if(worldPosition.distanceToSquared(intersectPoint)>guessSizeSq){return}const distance=raycaster.ray.origin.distanceTo(intersectPoint);if(distance<raycaster.near||distance>raycaster.far){return}intersects.push({distance:distance,face:null,point:intersectPoint.clone(),object:this})}clone(){return new this.constructor(this.material).copy(this)}}
/***/},
/***/"./src/renderers/WebGLRenderTarget.ts":
/*!********************************************!*\
  !*** ./src/renderers/WebGLRenderTarget.ts ***!
  \********************************************/
/*! exports provided: WebGLRenderTarget */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"WebGLRenderTarget",function(){return WebGLRenderTarget});
/* harmony import */var _math_Math__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Math */"./src/math/Math.ts");
/* harmony import */var _math_Vector4__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../math/Vector4 */"./src/math/Vector4.ts");
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../constants */"./src/constants.ts");
/* harmony import */var _textures_Texture__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../textures/Texture */"./src/textures/Texture.ts");
/* harmony import */var _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../core/EventDispatcher */"./src/core/EventDispatcher.ts");class WebGLRenderTarget extends _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_4__["EventDispatcher"]{constructor(width,height,options={}){super();this.uuid=_math_Math__WEBPACK_IMPORTED_MODULE_0__["MathUtil"].generateUUID();this.scissorTest=false;this.width=width;this.height=height;this.scissor=new _math_Vector4__WEBPACK_IMPORTED_MODULE_1__["Vector4"](0,0,width,height);this.viewport=new _math_Vector4__WEBPACK_IMPORTED_MODULE_1__["Vector4"](0,0,width,height);if(options.minFilter===undefined){options.minFilter=_constants__WEBPACK_IMPORTED_MODULE_2__["LinearFilter"]}this.texture=new _textures_Texture__WEBPACK_IMPORTED_MODULE_3__["Texture"](undefined,undefined,options.wrapS,options.wrapT,options.magFilter,options.minFilter,options.format,options.type,options.anisotropy,options.encoding);this.depthBuffer=options.depthBuffer!==undefined?options.depthBuffer:true;this.stencilBuffer=options.stencilBuffer!==undefined?options.stencilBuffer:true;this.depthTexture=options.depthTexture!==undefined?options.depthTexture:null}setSize(width,height){if(this.width!==width||this.height!==height){this.width=width;this.height=height;this.dispose()}this.viewport.set(0,0,width,height);this.scissor.set(0,0,width,height)}copy(source){this.width=source.width;this.height=source.height;this.viewport.copy(source.viewport);this.texture=source.texture.clone();this.depthBuffer=source.depthBuffer;this.stencilBuffer=source.stencilBuffer;this.depthTexture=source.depthTexture;return this}clone(){return(new this.constructor).copy(this)}dispose(){this.dispatchEvent({type:"dispose"})}}
/***/},
/***/"./src/renderers/WebGLRenderTargetCube.ts":
/*!************************************************!*\
  !*** ./src/renderers/WebGLRenderTargetCube.ts ***!
  \************************************************/
/*! exports provided: WebGLRenderTargetCube */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"WebGLRenderTargetCube",function(){return WebGLRenderTargetCube});
/* harmony import */var _WebGLRenderTarget__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./WebGLRenderTarget */"./src/renderers/WebGLRenderTarget.ts");class WebGLRenderTargetCube extends _WebGLRenderTarget__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderTarget"]{constructor(width,height,options={}){super(width,height,options);
// PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5
this.activeCubeFace=0;this.activeMipMapLevel=0}}
/***/},
/***/"./src/renderers/WebGLRenderer.ts":
/*!****************************************!*\
  !*** ./src/renderers/WebGLRenderer.ts ***!
  \****************************************/
/*! exports provided: WebGLRenderer */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"WebGLRenderer",function(){return WebGLRenderer});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../constants */"./src/constants.ts");class WebGLRenderer{constructor(){this.localClippingEnabled=false;this.physicallyCorrectLights=false;this.toneMapping=_constants__WEBPACK_IMPORTED_MODULE_0__["LinearToneMapping"];this.currentRendererTarget=null}allocTextureUnit(){return 0}renderBufferDirect(camera,fog,geometry,material,object,group){}setTexture2D(texture,unit){}setTextureCube(cubeTexture,unit){}getRenderTarget(){return this.currentRendererTarget}setRenderTarget(currentRendererTarget){}clear(){}}
/***/},
/***/"./src/renderers/shaders/ShaderChunk.js":
/*!**********************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk.js ***!
  \**********************************************/
/*! exports provided: ShaderChunk */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ShaderChunk",function(){return ShaderChunk});
/* harmony import */var _ShaderChunk_alphamap_fragment_glsl__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./ShaderChunk/alphamap_fragment.glsl */"./src/renderers/shaders/ShaderChunk/alphamap_fragment.glsl");
/* harmony import */var _ShaderChunk_alphamap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./ShaderChunk/alphamap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/alphamap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_alphatest_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./ShaderChunk/alphatest_fragment.glsl */"./src/renderers/shaders/ShaderChunk/alphatest_fragment.glsl");
/* harmony import */var _ShaderChunk_aomap_fragment_glsl__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./ShaderChunk/aomap_fragment.glsl */"./src/renderers/shaders/ShaderChunk/aomap_fragment.glsl");
/* harmony import */var _ShaderChunk_aomap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./ShaderChunk/aomap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/aomap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_begin_vertex_glsl__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ./ShaderChunk/begin_vertex.glsl */"./src/renderers/shaders/ShaderChunk/begin_vertex.glsl");
/* harmony import */var _ShaderChunk_beginnormal_vertex_glsl__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ./ShaderChunk/beginnormal_vertex.glsl */"./src/renderers/shaders/ShaderChunk/beginnormal_vertex.glsl");
/* harmony import */var _ShaderChunk_bsdfs_glsl__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(/*! ./ShaderChunk/bsdfs.glsl */"./src/renderers/shaders/ShaderChunk/bsdfs.glsl");
/* harmony import */var _ShaderChunk_bumpmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(/*! ./ShaderChunk/bumpmap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/bumpmap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_clipping_planes_fragment_glsl__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(/*! ./ShaderChunk/clipping_planes_fragment.glsl */"./src/renderers/shaders/ShaderChunk/clipping_planes_fragment.glsl");
/* harmony import */var _ShaderChunk_clipping_planes_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(/*! ./ShaderChunk/clipping_planes_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/clipping_planes_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_clipping_planes_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(/*! ./ShaderChunk/clipping_planes_pars_vertex.glsl */"./src/renderers/shaders/ShaderChunk/clipping_planes_pars_vertex.glsl");
/* harmony import */var _ShaderChunk_clipping_planes_vertex_glsl__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(/*! ./ShaderChunk/clipping_planes_vertex.glsl */"./src/renderers/shaders/ShaderChunk/clipping_planes_vertex.glsl");
/* harmony import */var _ShaderChunk_color_fragment_glsl__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(/*! ./ShaderChunk/color_fragment.glsl */"./src/renderers/shaders/ShaderChunk/color_fragment.glsl");
/* harmony import */var _ShaderChunk_color_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(/*! ./ShaderChunk/color_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/color_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_color_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(/*! ./ShaderChunk/color_pars_vertex.glsl */"./src/renderers/shaders/ShaderChunk/color_pars_vertex.glsl");
/* harmony import */var _ShaderChunk_color_vertex_glsl__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(/*! ./ShaderChunk/color_vertex.glsl */"./src/renderers/shaders/ShaderChunk/color_vertex.glsl");
/* harmony import */var _ShaderChunk_common_glsl__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(/*! ./ShaderChunk/common.glsl */"./src/renderers/shaders/ShaderChunk/common.glsl");
/* harmony import */var _ShaderChunk_cube_uv_reflection_fragment_glsl__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(/*! ./ShaderChunk/cube_uv_reflection_fragment.glsl */"./src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl");
/* harmony import */var _ShaderChunk_defaultnormal_vertex_glsl__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(/*! ./ShaderChunk/defaultnormal_vertex.glsl */"./src/renderers/shaders/ShaderChunk/defaultnormal_vertex.glsl");
/* harmony import */var _ShaderChunk_displacementmap_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(/*! ./ShaderChunk/displacementmap_pars_vertex.glsl */"./src/renderers/shaders/ShaderChunk/displacementmap_pars_vertex.glsl");
/* harmony import */var _ShaderChunk_displacementmap_vertex_glsl__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(/*! ./ShaderChunk/displacementmap_vertex.glsl */"./src/renderers/shaders/ShaderChunk/displacementmap_vertex.glsl");
/* harmony import */var _ShaderChunk_emissivemap_fragment_glsl__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(/*! ./ShaderChunk/emissivemap_fragment.glsl */"./src/renderers/shaders/ShaderChunk/emissivemap_fragment.glsl");
/* harmony import */var _ShaderChunk_emissivemap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(/*! ./ShaderChunk/emissivemap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/emissivemap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_encodings_fragment_glsl__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__(/*! ./ShaderChunk/encodings_fragment.glsl */"./src/renderers/shaders/ShaderChunk/encodings_fragment.glsl");
/* harmony import */var _ShaderChunk_encodings_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_25__=__webpack_require__(/*! ./ShaderChunk/encodings_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/encodings_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_envmap_fragment_glsl__WEBPACK_IMPORTED_MODULE_26__=__webpack_require__(/*! ./ShaderChunk/envmap_fragment.glsl */"./src/renderers/shaders/ShaderChunk/envmap_fragment.glsl");
/* harmony import */var _ShaderChunk_envmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_27__=__webpack_require__(/*! ./ShaderChunk/envmap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/envmap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_envmap_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_28__=__webpack_require__(/*! ./ShaderChunk/envmap_pars_vertex.glsl */"./src/renderers/shaders/ShaderChunk/envmap_pars_vertex.glsl");
/* harmony import */var _ShaderChunk_envmap_vertex_glsl__WEBPACK_IMPORTED_MODULE_29__=__webpack_require__(/*! ./ShaderChunk/envmap_vertex.glsl */"./src/renderers/shaders/ShaderChunk/envmap_vertex.glsl");
/* harmony import */var _ShaderChunk_fog_vertex_glsl__WEBPACK_IMPORTED_MODULE_30__=__webpack_require__(/*! ./ShaderChunk/fog_vertex.glsl */"./src/renderers/shaders/ShaderChunk/fog_vertex.glsl");
/* harmony import */var _ShaderChunk_fog_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_31__=__webpack_require__(/*! ./ShaderChunk/fog_pars_vertex.glsl */"./src/renderers/shaders/ShaderChunk/fog_pars_vertex.glsl");
/* harmony import */var _ShaderChunk_fog_fragment_glsl__WEBPACK_IMPORTED_MODULE_32__=__webpack_require__(/*! ./ShaderChunk/fog_fragment.glsl */"./src/renderers/shaders/ShaderChunk/fog_fragment.glsl");
/* harmony import */var _ShaderChunk_fog_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_33__=__webpack_require__(/*! ./ShaderChunk/fog_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/fog_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_gradientmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_34__=__webpack_require__(/*! ./ShaderChunk/gradientmap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/gradientmap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_lightmap_fragment_glsl__WEBPACK_IMPORTED_MODULE_35__=__webpack_require__(/*! ./ShaderChunk/lightmap_fragment.glsl */"./src/renderers/shaders/ShaderChunk/lightmap_fragment.glsl");
/* harmony import */var _ShaderChunk_lightmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_36__=__webpack_require__(/*! ./ShaderChunk/lightmap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/lightmap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_lights_lambert_vertex_glsl__WEBPACK_IMPORTED_MODULE_37__=__webpack_require__(/*! ./ShaderChunk/lights_lambert_vertex.glsl */"./src/renderers/shaders/ShaderChunk/lights_lambert_vertex.glsl");
/* harmony import */var _ShaderChunk_lights_pars_glsl__WEBPACK_IMPORTED_MODULE_38__=__webpack_require__(/*! ./ShaderChunk/lights_pars.glsl */"./src/renderers/shaders/ShaderChunk/lights_pars.glsl");
/* harmony import */var _ShaderChunk_lights_phong_fragment_glsl__WEBPACK_IMPORTED_MODULE_39__=__webpack_require__(/*! ./ShaderChunk/lights_phong_fragment.glsl */"./src/renderers/shaders/ShaderChunk/lights_phong_fragment.glsl");
/* harmony import */var _ShaderChunk_lights_phong_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_40__=__webpack_require__(/*! ./ShaderChunk/lights_phong_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/lights_phong_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_lights_physical_fragment_glsl__WEBPACK_IMPORTED_MODULE_41__=__webpack_require__(/*! ./ShaderChunk/lights_physical_fragment.glsl */"./src/renderers/shaders/ShaderChunk/lights_physical_fragment.glsl");
/* harmony import */var _ShaderChunk_lights_physical_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_42__=__webpack_require__(/*! ./ShaderChunk/lights_physical_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/lights_physical_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_lights_template_glsl__WEBPACK_IMPORTED_MODULE_43__=__webpack_require__(/*! ./ShaderChunk/lights_template.glsl */"./src/renderers/shaders/ShaderChunk/lights_template.glsl");
/* harmony import */var _ShaderChunk_logdepthbuf_fragment_glsl__WEBPACK_IMPORTED_MODULE_44__=__webpack_require__(/*! ./ShaderChunk/logdepthbuf_fragment.glsl */"./src/renderers/shaders/ShaderChunk/logdepthbuf_fragment.glsl");
/* harmony import */var _ShaderChunk_logdepthbuf_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_45__=__webpack_require__(/*! ./ShaderChunk/logdepthbuf_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/logdepthbuf_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_logdepthbuf_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_46__=__webpack_require__(/*! ./ShaderChunk/logdepthbuf_pars_vertex.glsl */"./src/renderers/shaders/ShaderChunk/logdepthbuf_pars_vertex.glsl");
/* harmony import */var _ShaderChunk_logdepthbuf_vertex_glsl__WEBPACK_IMPORTED_MODULE_47__=__webpack_require__(/*! ./ShaderChunk/logdepthbuf_vertex.glsl */"./src/renderers/shaders/ShaderChunk/logdepthbuf_vertex.glsl");
/* harmony import */var _ShaderChunk_map_fragment_glsl__WEBPACK_IMPORTED_MODULE_48__=__webpack_require__(/*! ./ShaderChunk/map_fragment.glsl */"./src/renderers/shaders/ShaderChunk/map_fragment.glsl");
/* harmony import */var _ShaderChunk_map_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_49__=__webpack_require__(/*! ./ShaderChunk/map_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/map_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_map_particle_fragment_glsl__WEBPACK_IMPORTED_MODULE_50__=__webpack_require__(/*! ./ShaderChunk/map_particle_fragment.glsl */"./src/renderers/shaders/ShaderChunk/map_particle_fragment.glsl");
/* harmony import */var _ShaderChunk_map_particle_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_51__=__webpack_require__(/*! ./ShaderChunk/map_particle_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/map_particle_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_metalnessmap_fragment_glsl__WEBPACK_IMPORTED_MODULE_52__=__webpack_require__(/*! ./ShaderChunk/metalnessmap_fragment.glsl */"./src/renderers/shaders/ShaderChunk/metalnessmap_fragment.glsl");
/* harmony import */var _ShaderChunk_metalnessmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_53__=__webpack_require__(/*! ./ShaderChunk/metalnessmap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/metalnessmap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_morphnormal_vertex_glsl__WEBPACK_IMPORTED_MODULE_54__=__webpack_require__(/*! ./ShaderChunk/morphnormal_vertex.glsl */"./src/renderers/shaders/ShaderChunk/morphnormal_vertex.glsl");
/* harmony import */var _ShaderChunk_morphtarget_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_55__=__webpack_require__(/*! ./ShaderChunk/morphtarget_pars_vertex.glsl */"./src/renderers/shaders/ShaderChunk/morphtarget_pars_vertex.glsl");
/* harmony import */var _ShaderChunk_morphtarget_vertex_glsl__WEBPACK_IMPORTED_MODULE_56__=__webpack_require__(/*! ./ShaderChunk/morphtarget_vertex.glsl */"./src/renderers/shaders/ShaderChunk/morphtarget_vertex.glsl");
/* harmony import */var _ShaderChunk_normal_fragment_glsl__WEBPACK_IMPORTED_MODULE_57__=__webpack_require__(/*! ./ShaderChunk/normal_fragment.glsl */"./src/renderers/shaders/ShaderChunk/normal_fragment.glsl");
/* harmony import */var _ShaderChunk_normalmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_58__=__webpack_require__(/*! ./ShaderChunk/normalmap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/normalmap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_packing_glsl__WEBPACK_IMPORTED_MODULE_59__=__webpack_require__(/*! ./ShaderChunk/packing.glsl */"./src/renderers/shaders/ShaderChunk/packing.glsl");
/* harmony import */var _ShaderChunk_premultiplied_alpha_fragment_glsl__WEBPACK_IMPORTED_MODULE_60__=__webpack_require__(/*! ./ShaderChunk/premultiplied_alpha_fragment.glsl */"./src/renderers/shaders/ShaderChunk/premultiplied_alpha_fragment.glsl");
/* harmony import */var _ShaderChunk_project_vertex_glsl__WEBPACK_IMPORTED_MODULE_61__=__webpack_require__(/*! ./ShaderChunk/project_vertex.glsl */"./src/renderers/shaders/ShaderChunk/project_vertex.glsl");
/* harmony import */var _ShaderChunk_dithering_fragment_glsl__WEBPACK_IMPORTED_MODULE_62__=__webpack_require__(/*! ./ShaderChunk/dithering_fragment.glsl */"./src/renderers/shaders/ShaderChunk/dithering_fragment.glsl");
/* harmony import */var _ShaderChunk_dithering_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_63__=__webpack_require__(/*! ./ShaderChunk/dithering_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/dithering_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_roughnessmap_fragment_glsl__WEBPACK_IMPORTED_MODULE_64__=__webpack_require__(/*! ./ShaderChunk/roughnessmap_fragment.glsl */"./src/renderers/shaders/ShaderChunk/roughnessmap_fragment.glsl");
/* harmony import */var _ShaderChunk_roughnessmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_65__=__webpack_require__(/*! ./ShaderChunk/roughnessmap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/roughnessmap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_shadowmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_66__=__webpack_require__(/*! ./ShaderChunk/shadowmap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/shadowmap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_shadowmap_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_67__=__webpack_require__(/*! ./ShaderChunk/shadowmap_pars_vertex.glsl */"./src/renderers/shaders/ShaderChunk/shadowmap_pars_vertex.glsl");
/* harmony import */var _ShaderChunk_shadowmap_vertex_glsl__WEBPACK_IMPORTED_MODULE_68__=__webpack_require__(/*! ./ShaderChunk/shadowmap_vertex.glsl */"./src/renderers/shaders/ShaderChunk/shadowmap_vertex.glsl");
/* harmony import */var _ShaderChunk_shadowmask_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_69__=__webpack_require__(/*! ./ShaderChunk/shadowmask_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/shadowmask_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_skinbase_vertex_glsl__WEBPACK_IMPORTED_MODULE_70__=__webpack_require__(/*! ./ShaderChunk/skinbase_vertex.glsl */"./src/renderers/shaders/ShaderChunk/skinbase_vertex.glsl");
/* harmony import */var _ShaderChunk_skinning_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_71__=__webpack_require__(/*! ./ShaderChunk/skinning_pars_vertex.glsl */"./src/renderers/shaders/ShaderChunk/skinning_pars_vertex.glsl");
/* harmony import */var _ShaderChunk_skinning_vertex_glsl__WEBPACK_IMPORTED_MODULE_72__=__webpack_require__(/*! ./ShaderChunk/skinning_vertex.glsl */"./src/renderers/shaders/ShaderChunk/skinning_vertex.glsl");
/* harmony import */var _ShaderChunk_skinnormal_vertex_glsl__WEBPACK_IMPORTED_MODULE_73__=__webpack_require__(/*! ./ShaderChunk/skinnormal_vertex.glsl */"./src/renderers/shaders/ShaderChunk/skinnormal_vertex.glsl");
/* harmony import */var _ShaderChunk_specularmap_fragment_glsl__WEBPACK_IMPORTED_MODULE_74__=__webpack_require__(/*! ./ShaderChunk/specularmap_fragment.glsl */"./src/renderers/shaders/ShaderChunk/specularmap_fragment.glsl");
/* harmony import */var _ShaderChunk_specularmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_75__=__webpack_require__(/*! ./ShaderChunk/specularmap_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/specularmap_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_tonemapping_fragment_glsl__WEBPACK_IMPORTED_MODULE_76__=__webpack_require__(/*! ./ShaderChunk/tonemapping_fragment.glsl */"./src/renderers/shaders/ShaderChunk/tonemapping_fragment.glsl");
/* harmony import */var _ShaderChunk_tonemapping_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_77__=__webpack_require__(/*! ./ShaderChunk/tonemapping_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/tonemapping_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_uv_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_78__=__webpack_require__(/*! ./ShaderChunk/uv_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/uv_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_uv_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_79__=__webpack_require__(/*! ./ShaderChunk/uv_pars_vertex.glsl */"./src/renderers/shaders/ShaderChunk/uv_pars_vertex.glsl");
/* harmony import */var _ShaderChunk_uv_vertex_glsl__WEBPACK_IMPORTED_MODULE_80__=__webpack_require__(/*! ./ShaderChunk/uv_vertex.glsl */"./src/renderers/shaders/ShaderChunk/uv_vertex.glsl");
/* harmony import */var _ShaderChunk_uv2_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_81__=__webpack_require__(/*! ./ShaderChunk/uv2_pars_fragment.glsl */"./src/renderers/shaders/ShaderChunk/uv2_pars_fragment.glsl");
/* harmony import */var _ShaderChunk_uv2_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_82__=__webpack_require__(/*! ./ShaderChunk/uv2_pars_vertex.glsl */"./src/renderers/shaders/ShaderChunk/uv2_pars_vertex.glsl");
/* harmony import */var _ShaderChunk_uv2_vertex_glsl__WEBPACK_IMPORTED_MODULE_83__=__webpack_require__(/*! ./ShaderChunk/uv2_vertex.glsl */"./src/renderers/shaders/ShaderChunk/uv2_vertex.glsl");
/* harmony import */var _ShaderChunk_worldpos_vertex_glsl__WEBPACK_IMPORTED_MODULE_84__=__webpack_require__(/*! ./ShaderChunk/worldpos_vertex.glsl */"./src/renderers/shaders/ShaderChunk/worldpos_vertex.glsl");
/* harmony import */var _ShaderLib_cube_frag_glsl__WEBPACK_IMPORTED_MODULE_85__=__webpack_require__(/*! ./ShaderLib/cube_frag.glsl */"./src/renderers/shaders/ShaderLib/cube_frag.glsl");
/* harmony import */var _ShaderLib_cube_vert_glsl__WEBPACK_IMPORTED_MODULE_86__=__webpack_require__(/*! ./ShaderLib/cube_vert.glsl */"./src/renderers/shaders/ShaderLib/cube_vert.glsl");
/* harmony import */var _ShaderLib_depth_frag_glsl__WEBPACK_IMPORTED_MODULE_87__=__webpack_require__(/*! ./ShaderLib/depth_frag.glsl */"./src/renderers/shaders/ShaderLib/depth_frag.glsl");
/* harmony import */var _ShaderLib_depth_vert_glsl__WEBPACK_IMPORTED_MODULE_88__=__webpack_require__(/*! ./ShaderLib/depth_vert.glsl */"./src/renderers/shaders/ShaderLib/depth_vert.glsl");
/* harmony import */var _ShaderLib_distanceRGBA_frag_glsl__WEBPACK_IMPORTED_MODULE_89__=__webpack_require__(/*! ./ShaderLib/distanceRGBA_frag.glsl */"./src/renderers/shaders/ShaderLib/distanceRGBA_frag.glsl");
/* harmony import */var _ShaderLib_distanceRGBA_vert_glsl__WEBPACK_IMPORTED_MODULE_90__=__webpack_require__(/*! ./ShaderLib/distanceRGBA_vert.glsl */"./src/renderers/shaders/ShaderLib/distanceRGBA_vert.glsl");
/* harmony import */var _ShaderLib_equirect_frag_glsl__WEBPACK_IMPORTED_MODULE_91__=__webpack_require__(/*! ./ShaderLib/equirect_frag.glsl */"./src/renderers/shaders/ShaderLib/equirect_frag.glsl");
/* harmony import */var _ShaderLib_equirect_vert_glsl__WEBPACK_IMPORTED_MODULE_92__=__webpack_require__(/*! ./ShaderLib/equirect_vert.glsl */"./src/renderers/shaders/ShaderLib/equirect_vert.glsl");
/* harmony import */var _ShaderLib_linedashed_frag_glsl__WEBPACK_IMPORTED_MODULE_93__=__webpack_require__(/*! ./ShaderLib/linedashed_frag.glsl */"./src/renderers/shaders/ShaderLib/linedashed_frag.glsl");
/* harmony import */var _ShaderLib_linedashed_vert_glsl__WEBPACK_IMPORTED_MODULE_94__=__webpack_require__(/*! ./ShaderLib/linedashed_vert.glsl */"./src/renderers/shaders/ShaderLib/linedashed_vert.glsl");
/* harmony import */var _ShaderLib_meshbasic_frag_glsl__WEBPACK_IMPORTED_MODULE_95__=__webpack_require__(/*! ./ShaderLib/meshbasic_frag.glsl */"./src/renderers/shaders/ShaderLib/meshbasic_frag.glsl");
/* harmony import */var _ShaderLib_meshbasic_vert_glsl__WEBPACK_IMPORTED_MODULE_96__=__webpack_require__(/*! ./ShaderLib/meshbasic_vert.glsl */"./src/renderers/shaders/ShaderLib/meshbasic_vert.glsl");
/* harmony import */var _ShaderLib_meshlambert_frag_glsl__WEBPACK_IMPORTED_MODULE_97__=__webpack_require__(/*! ./ShaderLib/meshlambert_frag.glsl */"./src/renderers/shaders/ShaderLib/meshlambert_frag.glsl");
/* harmony import */var _ShaderLib_meshlambert_vert_glsl__WEBPACK_IMPORTED_MODULE_98__=__webpack_require__(/*! ./ShaderLib/meshlambert_vert.glsl */"./src/renderers/shaders/ShaderLib/meshlambert_vert.glsl");
/* harmony import */var _ShaderLib_meshphong_frag_glsl__WEBPACK_IMPORTED_MODULE_99__=__webpack_require__(/*! ./ShaderLib/meshphong_frag.glsl */"./src/renderers/shaders/ShaderLib/meshphong_frag.glsl");
/* harmony import */var _ShaderLib_meshphong_vert_glsl__WEBPACK_IMPORTED_MODULE_100__=__webpack_require__(/*! ./ShaderLib/meshphong_vert.glsl */"./src/renderers/shaders/ShaderLib/meshphong_vert.glsl");
/* harmony import */var _ShaderLib_meshphysical_frag_glsl__WEBPACK_IMPORTED_MODULE_101__=__webpack_require__(/*! ./ShaderLib/meshphysical_frag.glsl */"./src/renderers/shaders/ShaderLib/meshphysical_frag.glsl");
/* harmony import */var _ShaderLib_meshphysical_vert_glsl__WEBPACK_IMPORTED_MODULE_102__=__webpack_require__(/*! ./ShaderLib/meshphysical_vert.glsl */"./src/renderers/shaders/ShaderLib/meshphysical_vert.glsl");
/* harmony import */var _ShaderLib_normal_frag_glsl__WEBPACK_IMPORTED_MODULE_103__=__webpack_require__(/*! ./ShaderLib/normal_frag.glsl */"./src/renderers/shaders/ShaderLib/normal_frag.glsl");
/* harmony import */var _ShaderLib_normal_vert_glsl__WEBPACK_IMPORTED_MODULE_104__=__webpack_require__(/*! ./ShaderLib/normal_vert.glsl */"./src/renderers/shaders/ShaderLib/normal_vert.glsl");
/* harmony import */var _ShaderLib_points_frag_glsl__WEBPACK_IMPORTED_MODULE_105__=__webpack_require__(/*! ./ShaderLib/points_frag.glsl */"./src/renderers/shaders/ShaderLib/points_frag.glsl");
/* harmony import */var _ShaderLib_points_vert_glsl__WEBPACK_IMPORTED_MODULE_106__=__webpack_require__(/*! ./ShaderLib/points_vert.glsl */"./src/renderers/shaders/ShaderLib/points_vert.glsl");
/* harmony import */var _ShaderLib_shadow_frag_glsl__WEBPACK_IMPORTED_MODULE_107__=__webpack_require__(/*! ./ShaderLib/shadow_frag.glsl */"./src/renderers/shaders/ShaderLib/shadow_frag.glsl");
/* harmony import */var _ShaderLib_shadow_vert_glsl__WEBPACK_IMPORTED_MODULE_108__=__webpack_require__(/*! ./ShaderLib/shadow_vert.glsl */"./src/renderers/shaders/ShaderLib/shadow_vert.glsl");const ShaderChunk={alphamap_fragment:_ShaderChunk_alphamap_fragment_glsl__WEBPACK_IMPORTED_MODULE_0__["default"],alphamap_pars_fragment:_ShaderChunk_alphamap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_1__["default"],alphatest_fragment:_ShaderChunk_alphatest_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__["default"],aomap_fragment:_ShaderChunk_aomap_fragment_glsl__WEBPACK_IMPORTED_MODULE_3__["default"],aomap_pars_fragment:_ShaderChunk_aomap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_4__["default"],begin_vertex:_ShaderChunk_begin_vertex_glsl__WEBPACK_IMPORTED_MODULE_5__["default"],beginnormal_vertex:_ShaderChunk_beginnormal_vertex_glsl__WEBPACK_IMPORTED_MODULE_6__["default"],bsdfs:_ShaderChunk_bsdfs_glsl__WEBPACK_IMPORTED_MODULE_7__["default"],bumpmap_pars_fragment:_ShaderChunk_bumpmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_8__["default"],clipping_planes_fragment:_ShaderChunk_clipping_planes_fragment_glsl__WEBPACK_IMPORTED_MODULE_9__["default"],clipping_planes_pars_fragment:_ShaderChunk_clipping_planes_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_10__["default"],clipping_planes_pars_vertex:_ShaderChunk_clipping_planes_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_11__["default"],clipping_planes_vertex:_ShaderChunk_clipping_planes_vertex_glsl__WEBPACK_IMPORTED_MODULE_12__["default"],color_fragment:_ShaderChunk_color_fragment_glsl__WEBPACK_IMPORTED_MODULE_13__["default"],color_pars_fragment:_ShaderChunk_color_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_14__["default"],color_pars_vertex:_ShaderChunk_color_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_15__["default"],color_vertex:_ShaderChunk_color_vertex_glsl__WEBPACK_IMPORTED_MODULE_16__["default"],common:_ShaderChunk_common_glsl__WEBPACK_IMPORTED_MODULE_17__["default"],cube_uv_reflection_fragment:_ShaderChunk_cube_uv_reflection_fragment_glsl__WEBPACK_IMPORTED_MODULE_18__["default"],defaultnormal_vertex:_ShaderChunk_defaultnormal_vertex_glsl__WEBPACK_IMPORTED_MODULE_19__["default"],displacementmap_pars_vertex:_ShaderChunk_displacementmap_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_20__["default"],displacementmap_vertex:_ShaderChunk_displacementmap_vertex_glsl__WEBPACK_IMPORTED_MODULE_21__["default"],emissivemap_fragment:_ShaderChunk_emissivemap_fragment_glsl__WEBPACK_IMPORTED_MODULE_22__["default"],emissivemap_pars_fragment:_ShaderChunk_emissivemap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_23__["default"],encodings_fragment:_ShaderChunk_encodings_fragment_glsl__WEBPACK_IMPORTED_MODULE_24__["default"],encodings_pars_fragment:_ShaderChunk_encodings_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_25__["default"],envmap_fragment:_ShaderChunk_envmap_fragment_glsl__WEBPACK_IMPORTED_MODULE_26__["default"],envmap_pars_fragment:_ShaderChunk_envmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_27__["default"],envmap_pars_vertex:_ShaderChunk_envmap_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_28__["default"],envmap_vertex:_ShaderChunk_envmap_vertex_glsl__WEBPACK_IMPORTED_MODULE_29__["default"],fog_vertex:_ShaderChunk_fog_vertex_glsl__WEBPACK_IMPORTED_MODULE_30__["default"],fog_pars_vertex:_ShaderChunk_fog_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_31__["default"],fog_fragment:_ShaderChunk_fog_fragment_glsl__WEBPACK_IMPORTED_MODULE_32__["default"],fog_pars_fragment:_ShaderChunk_fog_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_33__["default"],gradientmap_pars_fragment:_ShaderChunk_gradientmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_34__["default"],lightmap_fragment:_ShaderChunk_lightmap_fragment_glsl__WEBPACK_IMPORTED_MODULE_35__["default"],lightmap_pars_fragment:_ShaderChunk_lightmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_36__["default"],lights_lambert_vertex:_ShaderChunk_lights_lambert_vertex_glsl__WEBPACK_IMPORTED_MODULE_37__["default"],lights_pars:_ShaderChunk_lights_pars_glsl__WEBPACK_IMPORTED_MODULE_38__["default"],lights_phong_fragment:_ShaderChunk_lights_phong_fragment_glsl__WEBPACK_IMPORTED_MODULE_39__["default"],lights_phong_pars_fragment:_ShaderChunk_lights_phong_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_40__["default"],lights_physical_fragment:_ShaderChunk_lights_physical_fragment_glsl__WEBPACK_IMPORTED_MODULE_41__["default"],lights_physical_pars_fragment:_ShaderChunk_lights_physical_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_42__["default"],lights_template:_ShaderChunk_lights_template_glsl__WEBPACK_IMPORTED_MODULE_43__["default"],logdepthbuf_fragment:_ShaderChunk_logdepthbuf_fragment_glsl__WEBPACK_IMPORTED_MODULE_44__["default"],logdepthbuf_pars_fragment:_ShaderChunk_logdepthbuf_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_45__["default"],logdepthbuf_pars_vertex:_ShaderChunk_logdepthbuf_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_46__["default"],logdepthbuf_vertex:_ShaderChunk_logdepthbuf_vertex_glsl__WEBPACK_IMPORTED_MODULE_47__["default"],map_fragment:_ShaderChunk_map_fragment_glsl__WEBPACK_IMPORTED_MODULE_48__["default"],map_pars_fragment:_ShaderChunk_map_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_49__["default"],map_particle_fragment:_ShaderChunk_map_particle_fragment_glsl__WEBPACK_IMPORTED_MODULE_50__["default"],map_particle_pars_fragment:_ShaderChunk_map_particle_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_51__["default"],metalnessmap_fragment:_ShaderChunk_metalnessmap_fragment_glsl__WEBPACK_IMPORTED_MODULE_52__["default"],metalnessmap_pars_fragment:_ShaderChunk_metalnessmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_53__["default"],morphnormal_vertex:_ShaderChunk_morphnormal_vertex_glsl__WEBPACK_IMPORTED_MODULE_54__["default"],morphtarget_pars_vertex:_ShaderChunk_morphtarget_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_55__["default"],morphtarget_vertex:_ShaderChunk_morphtarget_vertex_glsl__WEBPACK_IMPORTED_MODULE_56__["default"],normal_fragment:_ShaderChunk_normal_fragment_glsl__WEBPACK_IMPORTED_MODULE_57__["default"],normalmap_pars_fragment:_ShaderChunk_normalmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_58__["default"],packing:_ShaderChunk_packing_glsl__WEBPACK_IMPORTED_MODULE_59__["default"],premultiplied_alpha_fragment:_ShaderChunk_premultiplied_alpha_fragment_glsl__WEBPACK_IMPORTED_MODULE_60__["default"],project_vertex:_ShaderChunk_project_vertex_glsl__WEBPACK_IMPORTED_MODULE_61__["default"],dithering_fragment:_ShaderChunk_dithering_fragment_glsl__WEBPACK_IMPORTED_MODULE_62__["default"],dithering_pars_fragment:_ShaderChunk_dithering_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_63__["default"],roughnessmap_fragment:_ShaderChunk_roughnessmap_fragment_glsl__WEBPACK_IMPORTED_MODULE_64__["default"],roughnessmap_pars_fragment:_ShaderChunk_roughnessmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_65__["default"],shadowmap_pars_fragment:_ShaderChunk_shadowmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_66__["default"],shadowmap_pars_vertex:_ShaderChunk_shadowmap_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_67__["default"],shadowmap_vertex:_ShaderChunk_shadowmap_vertex_glsl__WEBPACK_IMPORTED_MODULE_68__["default"],shadowmask_pars_fragment:_ShaderChunk_shadowmask_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_69__["default"],skinbase_vertex:_ShaderChunk_skinbase_vertex_glsl__WEBPACK_IMPORTED_MODULE_70__["default"],skinning_pars_vertex:_ShaderChunk_skinning_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_71__["default"],skinning_vertex:_ShaderChunk_skinning_vertex_glsl__WEBPACK_IMPORTED_MODULE_72__["default"],skinnormal_vertex:_ShaderChunk_skinnormal_vertex_glsl__WEBPACK_IMPORTED_MODULE_73__["default"],specularmap_fragment:_ShaderChunk_specularmap_fragment_glsl__WEBPACK_IMPORTED_MODULE_74__["default"],specularmap_pars_fragment:_ShaderChunk_specularmap_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_75__["default"],tonemapping_fragment:_ShaderChunk_tonemapping_fragment_glsl__WEBPACK_IMPORTED_MODULE_76__["default"],tonemapping_pars_fragment:_ShaderChunk_tonemapping_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_77__["default"],uv_pars_fragment:_ShaderChunk_uv_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_78__["default"],uv_pars_vertex:_ShaderChunk_uv_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_79__["default"],uv_vertex:_ShaderChunk_uv_vertex_glsl__WEBPACK_IMPORTED_MODULE_80__["default"],uv2_pars_fragment:_ShaderChunk_uv2_pars_fragment_glsl__WEBPACK_IMPORTED_MODULE_81__["default"],uv2_pars_vertex:_ShaderChunk_uv2_pars_vertex_glsl__WEBPACK_IMPORTED_MODULE_82__["default"],uv2_vertex:_ShaderChunk_uv2_vertex_glsl__WEBPACK_IMPORTED_MODULE_83__["default"],worldpos_vertex:_ShaderChunk_worldpos_vertex_glsl__WEBPACK_IMPORTED_MODULE_84__["default"],cube_frag:_ShaderLib_cube_frag_glsl__WEBPACK_IMPORTED_MODULE_85__["default"],cube_vert:_ShaderLib_cube_vert_glsl__WEBPACK_IMPORTED_MODULE_86__["default"],depth_frag:_ShaderLib_depth_frag_glsl__WEBPACK_IMPORTED_MODULE_87__["default"],depth_vert:_ShaderLib_depth_vert_glsl__WEBPACK_IMPORTED_MODULE_88__["default"],distanceRGBA_frag:_ShaderLib_distanceRGBA_frag_glsl__WEBPACK_IMPORTED_MODULE_89__["default"],distanceRGBA_vert:_ShaderLib_distanceRGBA_vert_glsl__WEBPACK_IMPORTED_MODULE_90__["default"],equirect_frag:_ShaderLib_equirect_frag_glsl__WEBPACK_IMPORTED_MODULE_91__["default"],equirect_vert:_ShaderLib_equirect_vert_glsl__WEBPACK_IMPORTED_MODULE_92__["default"],linedashed_frag:_ShaderLib_linedashed_frag_glsl__WEBPACK_IMPORTED_MODULE_93__["default"],linedashed_vert:_ShaderLib_linedashed_vert_glsl__WEBPACK_IMPORTED_MODULE_94__["default"],meshbasic_frag:_ShaderLib_meshbasic_frag_glsl__WEBPACK_IMPORTED_MODULE_95__["default"],meshbasic_vert:_ShaderLib_meshbasic_vert_glsl__WEBPACK_IMPORTED_MODULE_96__["default"],meshlambert_frag:_ShaderLib_meshlambert_frag_glsl__WEBPACK_IMPORTED_MODULE_97__["default"],meshlambert_vert:_ShaderLib_meshlambert_vert_glsl__WEBPACK_IMPORTED_MODULE_98__["default"],meshphong_frag:_ShaderLib_meshphong_frag_glsl__WEBPACK_IMPORTED_MODULE_99__["default"],meshphong_vert:_ShaderLib_meshphong_vert_glsl__WEBPACK_IMPORTED_MODULE_100__["default"],meshphysical_frag:_ShaderLib_meshphysical_frag_glsl__WEBPACK_IMPORTED_MODULE_101__["default"],meshphysical_vert:_ShaderLib_meshphysical_vert_glsl__WEBPACK_IMPORTED_MODULE_102__["default"],normal_frag:_ShaderLib_normal_frag_glsl__WEBPACK_IMPORTED_MODULE_103__["default"],normal_vert:_ShaderLib_normal_vert_glsl__WEBPACK_IMPORTED_MODULE_104__["default"],points_frag:_ShaderLib_points_frag_glsl__WEBPACK_IMPORTED_MODULE_105__["default"],points_vert:_ShaderLib_points_vert_glsl__WEBPACK_IMPORTED_MODULE_106__["default"],shadow_frag:_ShaderLib_shadow_frag_glsl__WEBPACK_IMPORTED_MODULE_107__["default"],shadow_vert:_ShaderLib_shadow_vert_glsl__WEBPACK_IMPORTED_MODULE_108__["default"]};
/***/},
/***/"./src/renderers/shaders/ShaderChunk/alphamap_fragment.glsl":
/*!******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/alphamap_fragment.glsl ***!
  \******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/alphamap_pars_fragment.glsl":
/*!***********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/alphamap_pars_fragment.glsl ***!
  \***********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/alphatest_fragment.glsl":
/*!*******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/alphatest_fragment.glsl ***!
  \*******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef ALPHATEST\n\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/aomap_fragment.glsl":
/*!***************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/aomap_fragment.glsl ***!
  \***************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_AOMAP\n\n\t// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\n\t#endif\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/aomap_pars_fragment.glsl":
/*!********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/aomap_pars_fragment.glsl ***!
  \********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_AOMAP\n\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/begin_vertex.glsl":
/*!*************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/begin_vertex.glsl ***!
  \*************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="\nvec3 transformed = vec3( position );\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/beginnormal_vertex.glsl":
/*!*******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/beginnormal_vertex.glsl ***!
  \*******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="\nvec3 objectNormal = vec3( normal );\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/bsdfs.glsl":
/*!******************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/bsdfs.glsl ***!
  \******************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]='float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\n\tif( decayExponent > 0.0 ) {\n\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\n\t\t// based upon Frostbite 3 Moving to Physically-based Rendering\n\t\t// page 32, equation 26: E[window1]\n\t\t// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\n\t\t// this is intended to be used on spot and point lights who are represented as luminous intensity\n\t\t// but who must be converted to luminous irradiance for surface lighting calculation\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n\n#else\n\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\n#endif\n\n\t}\n\n\treturn 1.0;\n\n}\n\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\n\treturn RECIPROCAL_PI * diffuseColor;\n\n} // validated\n\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\n\t// Original approximation by Christophe Schlick \'94\n\t// float fresnel = pow( 1.0 - dotLH, 5.0 );\n\n\t// Optimized variant (presented by Epic at SIGGRAPH \'13)\n\t// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n\n} // validated\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (34)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is "roughness squared" in Disney’s reparameterization\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n\t// geometry term (normalized) = G(l)⋅G(v) / 4(n⋅l)(n⋅v)\n\t// also see #12151\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\n\treturn 1.0 / ( gl * gv );\n\n} // validated\n\n// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2\n// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n\tfloat a2 = pow2( alpha );\n\n\t// dotNL and dotNV are explicitly swapped. This is not a mistake.\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\n\treturn 0.5 / max( gv + gl, EPSILON );\n\n}\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (33)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is "roughness squared" in Disney’s reparameterization\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1\n\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n\n}\n\n// GGX Distribution, Schlick Fresnel, GGX-Smith Visibility\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\n\tfloat alpha = pow2( roughness ); // UE4\'s roughness\n\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\n\tfloat D = D_GGX( alpha, dotNH );\n\n\treturn F * ( G * D );\n\n} // validated\n\n// Rect Area Light\n\n// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines\n// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt\n// code: https://github.com/selfshadow/ltc_code/\n\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\n\tfloat dotNV = saturate( dot( N, V ) );\n\n\t// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\n\treturn uv;\n\n}\n\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\n\t// Real-Time Area Lighting: a Journey from Research to Production (p.102)\n\t// An approximation of the form factor of a horizon-clipped rectangle.\n\n\tfloat l = length( f );\n\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n\n}\n\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\n\tfloat x = dot( v1, v2 );\n\n\tfloat y = abs( x );\n\n\t// rational polynomial approximation to theta / sin( theta ) / 2PI\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\n\treturn cross( v1, v2 ) * theta_sintheta;\n\n}\n\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\n\t// bail if point is on back side of plane of light\n\t// assumes ccw winding order of light vertices\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\n\t// construct orthonormal basis around N\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system\n\n\t// compute transform\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\n\t// transform rect\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\n\t// project rect onto sphere\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\n\t// calculate vector form factor\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\n\t// adjust for horizon clipping\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\n\n\n\treturn vec3( result );\n\n}\n\n// End Rect Area Light\n\n// ref: https://www.unrealengine.com/blog/physically-based-shading-on-mobile - environmentBRDF for GGX on mobile\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\n\tvec4 r = roughness * c0 + c1;\n\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\n\treturn specularColor * AB.x + AB.y;\n\n} // validated\n\n\nfloat G_BlinnPhong_Implicit( ) {\n\n\t// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)\n\treturn 0.25;\n\n}\n\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n\n}\n\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\n\t//float dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\t//float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\n\tfloat G = G_BlinnPhong_Implicit( );\n\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\n\treturn F * ( G * D );\n\n} // validated\n\n// source: http://simonstechblog.blogspot.ca/2011/12/microfacet-brdf.html\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\n\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n';
/***/},
/***/"./src/renderers/shaders/ShaderChunk/bumpmap_pars_fragment.glsl":
/*!**********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/bumpmap_pars_fragment.glsl ***!
  \**********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_BUMPMAP\n\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\n\t// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n\t// http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n\t// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n\tvec2 dHdxy_fwd() {\n\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n\t\treturn vec2( dBx, dBy );\n\n\t}\n\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n\t\t// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\t\t// normalized\n\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\n\t}\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/clipping_planes_fragment.glsl":
/*!*************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/clipping_planes_fragment.glsl ***!
  \*************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if NUM_CLIPPING_PLANES > 0\n\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; ++ i ) {\n\n\t\tvec4 plane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\n\t}\n\t\t\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\n\t\tbool clipped = true;\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; ++ i ) {\n\t\t\tvec4 plane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\n\t\tif ( clipped ) discard;\n\t\n\t#endif\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/clipping_planes_pars_fragment.glsl":
/*!******************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/clipping_planes_pars_fragment.glsl ***!
  \******************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if NUM_CLIPPING_PLANES > 0\n\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/clipping_planes_pars_vertex.glsl":
/*!****************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/clipping_planes_pars_vertex.glsl ***!
  \****************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/clipping_planes_vertex.glsl":
/*!***********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/clipping_planes_vertex.glsl ***!
  \***********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/color_fragment.glsl":
/*!***************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/color_fragment.glsl ***!
  \***************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_COLOR\n\n\tdiffuseColor.rgb *= vColor;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/color_pars_fragment.glsl":
/*!********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/color_pars_fragment.glsl ***!
  \********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_COLOR\n\n\tvarying vec3 vColor;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/color_pars_vertex.glsl":
/*!******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/color_pars_vertex.glsl ***!
  \******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_COLOR\n\n\tvarying vec3 vColor;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/color_vertex.glsl":
/*!*************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/color_vertex.glsl ***!
  \*************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_COLOR\n\n\tvColor.xyz = color.xyz;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/common.glsl":
/*!*******************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/common.glsl ***!
  \*******************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\n\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\n// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.\n// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\n\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\n\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n}\n\n// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n\n}\n\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\n\treturn - distance * planeNormal + point;\n\n}\n\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n\n}\n\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n\n}\n\nmat3 transposeMat3( const in mat3 m ) {\n\n\tmat3 tmp;\n\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\n\treturn tmp;\n\n}\n\n// https://en.wikipedia.org/wiki/Relative_luminance\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\n\treturn dot( weights, color.rgb );\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl":
/*!****************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl ***!
  \****************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef ENVMAP_TYPE_CUBE_UV\n\n#define cubeUV_textureSize (1024.0)\n\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\n\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\t// Clamp the value to the max mip level counts. hard coded to 6 mips\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\n\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\t// float powScale = exp2(roughnessLevel + mipLevel);\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\t// float scale =  1.0 / exp2(roughnessLevel + 2.0 + mipLevel);\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\t// float mipOffset = 0.75*(1.0 - 1.0/exp2(mipLevel))/exp2(roughnessLevel);\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\n\tfloat rcpPowScale = 1.0 / powScale;\n\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\n\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\n\t// round to nearest mipmap if we are not interpolating.\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\n\t// Tri linear interpolation.\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\n\tvec4 result = mix(color10, color20, t);\n\n\treturn vec4(result.rgb, 1.0);\n}\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/defaultnormal_vertex.glsl":
/*!*********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/defaultnormal_vertex.glsl ***!
  \*********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="vec3 transformedNormal = normalMatrix * objectNormal;\n\n#ifdef FLIP_SIDED\n\n\ttransformedNormal = - transformedNormal;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/displacementmap_pars_vertex.glsl":
/*!****************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/displacementmap_pars_vertex.glsl ***!
  \****************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_DISPLACEMENTMAP\n\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/displacementmap_vertex.glsl":
/*!***********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/displacementmap_vertex.glsl ***!
  \***********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_DISPLACEMENTMAP\n\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/dithering_fragment.glsl":
/*!*******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/dithering_fragment.glsl ***!
  \*******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( DITHERING )\n\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/dithering_pars_fragment.glsl":
/*!************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/dithering_pars_fragment.glsl ***!
  \************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( DITHERING )\n\n\t// based on https://www.shadertoy.com/view/MslGR8\n\tvec3 dithering( vec3 color ) {\n\t\t//Calculate grid position\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\n\t\t//Shift the individual colors differently, thus making it even harder to see the dithering pattern\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\n\t\t//modify shift acording to grid position.\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\n\t\t//shift the color by dither_shift\n\t\treturn color + dither_shift_RGB;\n\t}\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/emissivemap_fragment.glsl":
/*!*********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/emissivemap_fragment.glsl ***!
  \*********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_EMISSIVEMAP\n\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/emissivemap_pars_fragment.glsl":
/*!**************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/emissivemap_pars_fragment.glsl ***!
  \**************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_EMISSIVEMAP\n\n\tuniform sampler2D emissiveMap;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/encodings_fragment.glsl":
/*!*******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/encodings_fragment.glsl ***!
  \*******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="  gl_FragColor = linearToOutputTexel( gl_FragColor );\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/encodings_pars_fragment.glsl":
/*!************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/encodings_pars_fragment.glsl ***!
  \************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="// For a discussion of what this is, please read this: http://lousodrome.net/blog/light/2013/05/26/gamma-correct-and-hdr-rendering-in-a-32-bits-buffer/\n\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\n\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\n\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\n\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n//  return vec4( value.brg, ( 3.0 + 128.0 ) / 256.0 );\n}\n\n// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM            = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\n\n// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat D      = max( maxRange / maxRGB, 1.0 );\n\tD            = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\n\n// LogLuv reference: http://graphicrants.blogspot.ca/2009/04/rgbm-color-encoding.html\n\n// M matrix, for encoding\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract(Le);\n\tvResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n\treturn vResult;\n}\n\n// Inverse M matrix, for decoding\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max(vRGB, 0.0), 1.0 );\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/envmap_fragment.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/envmap_fragment.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n\t\t// Transforming Normal Vectors with the Inverse Transformation\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#else\n\n\t\tvec3 reflectVec = vReflect;\n\n\t#endif\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\n\t\tvec2 sampleUV;\n\n\t\treflectVec = normalize( reflectVec );\n\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\n\t\treflectVec = normalize( reflectVec );\n\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\n\t#else\n\n\t\tvec4 envColor = vec4( 0.0 );\n\n\t#endif\n\n\tenvColor = envMapTexelToLinear( envColor );\n\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n\t#endif\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/envmap_pars_fragment.glsl":
/*!*********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/envmap_pars_fragment.glsl ***!
  \*********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n\n#ifdef USE_ENVMAP\n\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/envmap_pars_vertex.glsl":
/*!*******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/envmap_pars_vertex.glsl ***!
  \*******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\n\t#else\n\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\n\t#endif\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/envmap_vertex.glsl":
/*!**************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/envmap_vertex.glsl ***!
  \**************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\tvWorldPosition = worldPosition.xyz;\n\n\t#else\n\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\n\t\t#else\n\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#endif\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/fog_fragment.glsl":
/*!*************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/fog_fragment.glsl ***!
  \*************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_FOG\n\n\t#ifdef FOG_EXP2\n\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\n\t#else\n\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\n\t#endif\n\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/fog_pars_fragment.glsl":
/*!******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/fog_pars_fragment.glsl ***!
  \******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_FOG\n\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\n\t#ifdef FOG_EXP2\n\n\t\tuniform float fogDensity;\n\n\t#else\n\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\n\t#endif\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/fog_pars_vertex.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/fog_pars_vertex.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_FOG\n\n  varying float fogDepth;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/fog_vertex.glsl":
/*!***********************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/fog_vertex.glsl ***!
  \***********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="\n#ifdef USE_FOG\nfogDepth = -mvPosition.z;\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/gradientmap_pars_fragment.glsl":
/*!**************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/gradientmap_pars_fragment.glsl ***!
  \**************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef TOON\n\n\tuniform sampler2D gradientMap;\n\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\n\t\t// dotNL will be from -1.0 to 1.0\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\n\t\t#ifdef USE_GRADIENTMAP\n\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\n\t\t#else\n\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\n\t\t#endif\n\n\n\t}\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/lightmap_fragment.glsl":
/*!******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/lightmap_fragment.glsl ***!
  \******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_LIGHTMAP\n\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity; // factor of PI should not be present; included here to prevent breakage\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/lightmap_pars_fragment.glsl":
/*!***********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/lightmap_pars_fragment.glsl ***!
  \***********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_LIGHTMAP\n\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/lights_lambert_vertex.glsl":
/*!**********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/lights_lambert_vertex.glsl ***!
  \**********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="vec3 diffuse = vec3( 1.0 );\n\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\n\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\n\nvLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\n\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n\n#if NUM_POINT_LIGHTS > 0\n\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\n\t}\n\n#endif\n\n#if NUM_SPOT_LIGHTS > 0\n\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\t}\n\n#endif\n\n\n\n#if NUM_DIR_LIGHTS > 0\n\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\n\t\t#endif\n\n\t}\n\n#endif\n\n#if NUM_HEMI_LIGHTS > 0\n\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\n\t\t#endif\n\n\t}\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/lights_pars.glsl":
/*!************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/lights_pars.glsl ***!
  \************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="uniform vec3 ambientLightColor;\n\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\n\tvec3 irradiance = ambientLightColor;\n\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\tirradiance *= PI;\n\n\t#endif\n\n\treturn irradiance;\n\n}\n\n#if NUM_DIR_LIGHTS > 0\n\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\n\t}\n\n#endif\n\n\n#if NUM_POINT_LIGHTS > 0\n\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\n\t// directLight is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\n\t\tfloat lightDistance = length( lVector );\n\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\n\t}\n\n#endif\n\n\n#if NUM_SPOT_LIGHTS > 0\n\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\n\t// directLight is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\n\t\tif ( angleCos > spotLight.coneCos ) {\n\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\n\t\t} else {\n\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\n\t\t}\n\t}\n\n#endif\n\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\n\t// Pre-computed values of LinearTransformedCosine approximation of BRDF\n\t// BRDF approximation Texture is 64x64\n\tuniform sampler2D ltc_1; // RGBA Float\n\tuniform sampler2D ltc_2; // RGBA Float\n\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n\n#endif\n\n\n#if NUM_HEMI_LIGHTS > 0\n\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\t\tirradiance *= PI;\n\n\t\t#endif\n\n\t\treturn irradiance;\n\n\t}\n\n#endif\n\n\n#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\n\t\t\t// TODO: replace with properly filtered cubemaps and access the irradiance LOD level, be it the last LOD level\n\t\t\t// of a specular cubemap, or just the default level of a specially created irradiance cubemap.\n\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\n\t\t\t#else\n\n\t\t\t\t// force the bias high to get the last LOD level as it is the most blurred.\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\n\t\t\t#endif\n\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\n\t\t#else\n\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\n\t\t#endif\n\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\n\t}\n\n\t// taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\n\t\t//float envMapWidth = pow( 2.0, maxMIPLevelScalar );\n\t\t//float desiredMIPLevel = log2( envMapWidth * sqrt( 3.0 ) ) - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\n\t\t// clamp to allowable LOD ranges.\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\n\t}\n\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\n\t\t#endif\n\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\n\t\t\t#else\n\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\n\t\t\t#endif\n\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\n\t\t\t#else\n\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\n\t\t\t#endif\n\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\n\t\t\t#else\n\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\n\t\t\t#endif\n\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\n\t\t#endif\n\n\t\treturn envMapColor.rgb * envMapIntensity;\n\n\t}\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/lights_phong_fragment.glsl":
/*!**********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/lights_phong_fragment.glsl ***!
  \**********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/lights_phong_pars_fragment.glsl":
/*!***************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/lights_phong_pars_fragment.glsl ***!
  \***************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="varying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n\nstruct BlinnPhongMaterial {\n\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n\n};\n\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\t#ifdef TOON\n\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\n\t#else\n\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\n\t#endif\n\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\tirradiance *= PI; // punctual light\n\n\t#endif\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n\n}\n\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n\n#define Material_LightProbeLOD( material )\t(0)\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/lights_physical_fragment.glsl":
/*!*************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/lights_physical_fragment.glsl ***!
  \*************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat ); // Burley clearcoat model\n\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/lights_physical_pars_fragment.glsl":
/*!******************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/lights_physical_pars_fragment.glsl ***!
  \******************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="struct PhysicalMaterial {\n\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n\n};\n\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\n\n// Clear coat directional hemishperical reflectance (this approximation should be improved)\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n\n}\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight; // counterclockwise\n\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\n\t\t// LTC Fresnel Approximation by Stephen Hill\n\t\t// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\n\t}\n\n#endif\n\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\n\tvec3 irradiance = dotNL * directLight.color;\n\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\tirradiance *= PI; // punctual light\n\n\t#endif\n\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n\t#ifndef STANDARD\n\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\n\t#endif\n\n}\n\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\n\t#ifndef STANDARD\n\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\n\t#endif\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\n\n// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/lights_template.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/lights_template.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="\n\nGeometricContext geometry;\n\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\n\nIncidentLight directLight;\n\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tPointLight pointLight;\n\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tpointLight = pointLights[ i ];\n\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\n#endif\n\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tSpotLight spotLight;\n\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tspotLight = spotLights[ i ];\n\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\n#endif\n\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tDirectionalLight directionalLight;\n\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tdirectionalLight = directionalLights[ i ];\n\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\n\t}\n\n#endif\n\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n\tRectAreaLight rectAreaLight;\n\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\n\t}\n\n#endif\n\n#if defined( RE_IndirectDiffuse )\n\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n\t#ifdef USE_LIGHTMAP\n\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\n\t\t\tlightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage\n\n\t\t#endif\n\n\t\tirradiance += lightMapIrradiance;\n\n\t#endif\n\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\n\t\t}\n\n\t#endif\n\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\t// TODO, replace 8 with the real maxMIPLevel\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, 8 );\n\n\t#endif\n\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n\n#endif\n\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\n\t// TODO, replace 8 with the real maxMIPLevel\n\tvec3 radiance = getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), 8 );\n\n\t#ifndef STANDARD\n\t\tvec3 clearCoatRadiance = getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), 8 );\n\t#else\n\t\tvec3 clearCoatRadiance = vec3( 0.0 );\n\t#endif\n\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/logdepthbuf_fragment.glsl":
/*!*********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/logdepthbuf_fragment.glsl ***!
  \*********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/logdepthbuf_pars_fragment.glsl":
/*!**************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/logdepthbuf_pars_fragment.glsl ***!
  \**************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_LOGDEPTHBUF\n\n\tuniform float logDepthBufFC;\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvarying float vFragDepth;\n\n\t#endif\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/logdepthbuf_pars_vertex.glsl":
/*!************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/logdepthbuf_pars_vertex.glsl ***!
  \************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvarying float vFragDepth;\n\n\t#endif\n\n\tuniform float logDepthBufFC;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/logdepthbuf_vertex.glsl":
/*!*******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/logdepthbuf_vertex.glsl ***!
  \*******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\n\t#else\n\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\n\t\tgl_Position.z *= gl_Position.w;\n\n\t#endif\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/map_fragment.glsl":
/*!*************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/map_fragment.glsl ***!
  \*************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_MAP\n\n\tvec4 texelColor = texture2D( map, vUv );\n\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/map_pars_fragment.glsl":
/*!******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/map_pars_fragment.glsl ***!
  \******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/map_particle_fragment.glsl":
/*!**********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/map_particle_fragment.glsl ***!
  \**********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_MAP\n\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/map_particle_pars_fragment.glsl":
/*!***************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/map_particle_pars_fragment.glsl ***!
  \***************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_MAP\n\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/metalnessmap_fragment.glsl":
/*!**********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/metalnessmap_fragment.glsl ***!
  \**********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="float metalnessFactor = metalness;\n\n#ifdef USE_METALNESSMAP\n\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\n\t// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tmetalnessFactor *= texelMetalness.b;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/metalnessmap_pars_fragment.glsl":
/*!***************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/metalnessmap_pars_fragment.glsl ***!
  \***************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_METALNESSMAP\n\n\tuniform sampler2D metalnessMap;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/morphnormal_vertex.glsl":
/*!*******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/morphnormal_vertex.glsl ***!
  \*******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_MORPHNORMALS\n\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/morphtarget_pars_vertex.glsl":
/*!************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/morphtarget_pars_vertex.glsl ***!
  \************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_MORPHTARGETS\n\n\t#ifndef USE_MORPHNORMALS\n\n\tuniform float morphTargetInfluences[ 8 ];\n\n\t#else\n\n\tuniform float morphTargetInfluences[ 4 ];\n\n\t#endif\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/morphtarget_vertex.glsl":
/*!*******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/morphtarget_vertex.glsl ***!
  \*******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_MORPHTARGETS\n\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n\t#ifndef USE_MORPHNORMALS\n\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n\t#endif\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/normal_fragment.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/normal_fragment.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef FLAT_SHADED\n\n\t// Workaround for Adreno/Nexus5 not able able to do dFdx( vViewPosition ) ...\n\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n\n#else\n\n\tvec3 normal = normalize( vNormal );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\n\t#endif\n\n#endif\n\n#ifdef USE_NORMALMAP\n\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/normalmap_pars_fragment.glsl":
/*!************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/normalmap_pars_fragment.glsl ***!
  \************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_NORMALMAP\n\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\n\t// Per-Pixel Tangent Space Normal Mapping\n\t// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n\t\t// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988\n\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\n\t}\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/packing.glsl":
/*!********************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/packing.glsl ***!
  \********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\n\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\n\nconst float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)\nconst float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)\n\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n\nconst float ShiftRight8 = 1. / 256.;\n\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8; // tidy overflow\n\treturn r * PackUpscale;\n}\n\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\n\n// NOTE: viewZ/eyeZ is < 0 when in front of the camera per OpenGL conventions\n\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\n\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/premultiplied_alpha_fragment.glsl":
/*!*****************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/premultiplied_alpha_fragment.glsl ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef PREMULTIPLIED_ALPHA\n\n\t// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.\n\tgl_FragColor.rgb *= gl_FragColor.a;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/project_vertex.glsl":
/*!***************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/project_vertex.glsl ***!
  \***************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n\ngl_Position = projectionMatrix * mvPosition;\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/roughnessmap_fragment.glsl":
/*!**********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/roughnessmap_fragment.glsl ***!
  \**********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="float roughnessFactor = roughness;\n\n#ifdef USE_ROUGHNESSMAP\n\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\n\t// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\troughnessFactor *= texelRoughness.g;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/roughnessmap_pars_fragment.glsl":
/*!***************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/roughnessmap_pars_fragment.glsl ***!
  \***************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_ROUGHNESSMAP\n\n\tuniform sampler2D roughnessMap;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/shadowmap_pars_fragment.glsl":
/*!************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/shadowmap_pars_fragment.glsl ***!
  \************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHTS > 0\n\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHTS > 0\n\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHTS > 0\n\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\n\t#endif\n\n\t\n\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\n\t}\n\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\n\t\tvec2 f = fract( uv * size + 0.5 );\n\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\n\t\treturn c;\n\n\t}\n\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\n\t\tfloat shadow = 1.0;\n\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\n\t\t// if ( something && something ) breaks ATI OpenGL shader compiler\n\t\t// if ( all( something, something ) ) using this instead\n\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n\t\tbool frustumTest = all( frustumTestVec );\n\n\t\tif ( frustumTest ) {\n\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#else // no percentage-closer filtering:\n\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\n\t\t#endif\n\n\t\t}\n\n\t\treturn shadow;\n\n\t}\n\n\t// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D\n\t// vector suitable for 2D texture mapping. This code uses the following layout for the\n\t// 2D texture:\n\t//\n\t// xzXZ\n\t//  y Y\n\t//\n\t// Y - Positive y direction\n\t// y - Negative y direction\n\t// X - Positive x direction\n\t// x - Negative x direction\n\t// Z - Positive z direction\n\t// z - Negative z direction\n\t//\n\t// Source and test bed:\n\t// https://gist.github.com/tschw/da10c43c467ce8afd0c4\n\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\n\t\t// Number of texels to avoid at the edge of each square\n\n\t\tvec3 absV = abs( v );\n\n\t\t// Intersect unit cube\n\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\n\t\t// Apply scale to avoid seams\n\n\t\t// two texels less per square (one texel will do for NEAREST)\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\n\t\t// Unwrap\n\n\t\t// space: -1 ... 1 range for each square\n\t\t//\n\t\t// #X##\t\tdim    := ( 4 , 2 )\n\t\t//  # #\t\tcenter := ( 1 , 1 )\n\n\t\tvec2 planar = v.xy;\n\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\n\t\tif ( absV.z >= almostOne ) {\n\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\n\t\t} else if ( absV.x >= almostOne ) {\n\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\n\t\t} else if ( absV.y >= almostOne ) {\n\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\n\t\t}\n\n\t\t// Transform to UV space\n\n\t\t// scale := 0.5 / dim\n\t\t// translate := ( center + 0.5 ) / dim\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\n\t}\n\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\n\t\t// for point lights, the uniform @vShadowCoord is re-purposed to hold\n\t\t// the vector from the light to the world-space position of the fragment.\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\n\t\t// dp = normalized distance from light to fragment position\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?\n\t\tdp += shadowBias;\n\n\t\t// bd3D = base direction 3D\n\t\tvec3 bd3D = normalize( lightToPosition );\n\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#else // no percentage-closer filtering\n\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\n\t\t#endif\n\n\t}\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/shadowmap_pars_vertex.glsl":
/*!**********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/shadowmap_pars_vertex.glsl ***!
  \**********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHTS > 0\n\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHTS > 0\n\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHTS > 0\n\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\n\t#endif\n\n\t\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/shadowmap_vertex.glsl":
/*!*****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/shadowmap_vertex.glsl ***!
  \*****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHTS > 0\n\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\n\t}\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHTS > 0\n\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\n\t}\n\n\t#endif\n\n\t#if NUM_POINT_LIGHTS > 0\n\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\n\t}\n\n\t#endif\n\n\t\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/shadowmask_pars_fragment.glsl":
/*!*************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/shadowmask_pars_fragment.glsl ***!
  \*************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="float getShadowMask() {\n\n\tfloat shadow = 1.0;\n\n\t#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHTS > 0\n\n\tDirectionalLight directionalLight;\n\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\n\t}\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHTS > 0\n\n\tSpotLight spotLight;\n\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\n\t}\n\n\t#endif\n\n\t#if NUM_POINT_LIGHTS > 0\n\n\tPointLight pointLight;\n\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\n\t}\n\n\t#endif\n\n\t\n\n\t#endif\n\n\treturn shadow;\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/skinbase_vertex.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/skinbase_vertex.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_SKINNING\n\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/skinning_pars_vertex.glsl":
/*!*********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/skinning_pars_vertex.glsl ***!
  \*********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_SKINNING\n\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\n\t#ifdef BONE_TEXTURE\n\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\n\t\t\ty = dy * ( y + 0.5 );\n\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\n\t\t\treturn bone;\n\n\t\t}\n\n\t#else\n\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\n\t\t}\n\n\t#endif\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/skinning_vertex.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/skinning_vertex.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_SKINNING\n\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/skinnormal_vertex.glsl":
/*!******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/skinnormal_vertex.glsl ***!
  \******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_SKINNING\n\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/specularmap_fragment.glsl":
/*!*********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/specularmap_fragment.glsl ***!
  \*********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n\n#else\n\n\tspecularStrength = 1.0;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/specularmap_pars_fragment.glsl":
/*!**************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/specularmap_pars_fragment.glsl ***!
  \**************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifdef USE_SPECULARMAP\n\n\tuniform sampler2D specularMap;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/tonemapping_fragment.glsl":
/*!*********************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/tonemapping_fragment.glsl ***!
  \*********************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( TONE_MAPPING )\n\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/tonemapping_pars_fragment.glsl":
/*!**************************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/tonemapping_pars_fragment.glsl ***!
  \**************************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\n\n// exposure only\nvec3 LinearToneMapping( vec3 color ) {\n\n\treturn toneMappingExposure * color;\n\n}\n\n// source: https://www.cs.utah.edu/~reinhard/cdrom/\nvec3 ReinhardToneMapping( vec3 color ) {\n\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n\n}\n\n// source: http://filmicgames.com/archives/75\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\n\t// John Hable's filmic operator from Uncharted 2 video game\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n\n}\n\n// source: http://filmicgames.com/archives/75\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\n\t// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/uv2_pars_fragment.glsl":
/*!******************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/uv2_pars_fragment.glsl ***!
  \******************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tvarying vec2 vUv2;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/uv2_pars_vertex.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/uv2_pars_vertex.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/uv2_vertex.glsl":
/*!***********************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/uv2_vertex.glsl ***!
  \***********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\n\tvUv2 = uv2;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/uv_pars_fragment.glsl":
/*!*****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/uv_pars_fragment.glsl ***!
  \*****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\n\tvarying vec2 vUv;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/uv_pars_vertex.glsl":
/*!***************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/uv_pars_vertex.glsl ***!
  \***************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/uv_vertex.glsl":
/*!**********************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/uv_vertex.glsl ***!
  \**********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\n#endif";
/***/},
/***/"./src/renderers/shaders/ShaderChunk/worldpos_vertex.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderChunk/worldpos_vertex.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n\n#endif\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib.ts":
/*!********************************************!*\
  !*** ./src/renderers/shaders/ShaderLib.ts ***!
  \********************************************/
/*! exports provided: ShaderLib */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"ShaderLib",function(){return ShaderLib});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../../math/Color */"./src/math/Color.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _ShaderChunk__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./ShaderChunk */"./src/renderers/shaders/ShaderChunk.js");
/* harmony import */var _UniformsLib__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./UniformsLib */"./src/renderers/shaders/UniformsLib.ts");
/* harmony import */var _UniformsUtils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./UniformsUtils */"./src/renderers/shaders/UniformsUtils.ts");const ShaderLib={basic:{uniforms:_UniformsUtils__WEBPACK_IMPORTED_MODULE_4__["UniformsUtils"].merge([_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].common,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].specularmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].envmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].aomap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].lightmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].fog]),vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].meshbasic_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].meshbasic_frag},lambert:{uniforms:_UniformsUtils__WEBPACK_IMPORTED_MODULE_4__["UniformsUtils"].merge([_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].common,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].specularmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].envmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].aomap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].lightmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].emissivemap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].fog,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].lights,{emissive:{value:new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"](0)}}]),vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].meshlambert_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].meshlambert_frag},phong:{uniforms:_UniformsUtils__WEBPACK_IMPORTED_MODULE_4__["UniformsUtils"].merge([_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].common,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].specularmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].envmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].aomap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].lightmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].emissivemap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].bumpmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].normalmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].displacementmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].gradientmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].fog,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].lights,{emissive:{value:new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"](0)},specular:{value:new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"](1118481)},shininess:{value:30}}]),vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].meshphong_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].meshphong_frag},standard:{uniforms:_UniformsUtils__WEBPACK_IMPORTED_MODULE_4__["UniformsUtils"].merge([_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].common,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].envmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].aomap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].lightmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].emissivemap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].bumpmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].normalmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].displacementmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].roughnessmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].metalnessmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].fog,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].lights,{emissive:{value:new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"](0)},roughness:{value:.5},metalness:{value:.5},envMapIntensity:{value:1}}]),vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].meshphysical_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].meshphysical_frag},points:{uniforms:_UniformsUtils__WEBPACK_IMPORTED_MODULE_4__["UniformsUtils"].merge([_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].points,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].fog]),vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].points_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].points_frag},dashed:{uniforms:_UniformsUtils__WEBPACK_IMPORTED_MODULE_4__["UniformsUtils"].merge([_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].common,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].linedashed_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].linedashed_frag},depth:{uniforms:_UniformsUtils__WEBPACK_IMPORTED_MODULE_4__["UniformsUtils"].merge([_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].common,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].displacementmap]),vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].depth_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].depth_frag},normal:{uniforms:_UniformsUtils__WEBPACK_IMPORTED_MODULE_4__["UniformsUtils"].merge([_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].common,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].bumpmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].normalmap,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].displacementmap,{opacity:{value:1}}]),vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].normal_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].normal_frag},
/* -------------------------------------------------------------------------
     //	Cube map shader
     ------------------------------------------------------------------------- */
cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].cube_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].equirect_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].equirect_frag},distanceRGBA:{uniforms:_UniformsUtils__WEBPACK_IMPORTED_MODULE_4__["UniformsUtils"].merge([_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].common,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].displacementmap,{referencePosition:{value:new _math_Vector3__WEBPACK_IMPORTED_MODULE_1__["Vector3"]},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].distanceRGBA_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].distanceRGBA_frag},shadow:{uniforms:_UniformsUtils__WEBPACK_IMPORTED_MODULE_4__["UniformsUtils"].merge([_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].lights,_UniformsLib__WEBPACK_IMPORTED_MODULE_3__["UniformsLib"].fog,{color:{value:new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"](0)},opacity:{value:1}}]),vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].shadow_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].shadow_frag}};ShaderLib.physical={uniforms:_UniformsUtils__WEBPACK_IMPORTED_MODULE_4__["UniformsUtils"].merge([ShaderLib.standard.uniforms,{clearCoat:{value:0},clearCoatRoughness:{value:0}}]),vertexShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].meshphysical_vert,fragmentShader:_ShaderChunk__WEBPACK_IMPORTED_MODULE_2__["ShaderChunk"].meshphysical_frag};
/***/},
/***/"./src/renderers/shaders/ShaderLib/cube_frag.glsl":
/*!********************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/cube_frag.glsl ***!
  \********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\n\nvarying vec3 vWorldPosition;\n\nvoid main() {\n\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/cube_vert.glsl":
/*!********************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/cube_vert.glsl ***!
  \********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="varying vec3 vWorldPosition;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n\tgl_Position.z = gl_Position.w; // set z to camera.far\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/depth_frag.glsl":
/*!*********************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/depth_frag.glsl ***!
  \*********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#if DEPTH_PACKING == 3200\n\n\tuniform float opacity;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tdiffuseColor.a = opacity;\n\n\t#endif\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\n\t#include <logdepthbuf_fragment>\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tgl_FragColor = vec4( vec3( gl_FragCoord.z ), opacity );\n\n\t#elif DEPTH_PACKING == 3201\n\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\n\t#endif\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/depth_vert.glsl":
/*!*********************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/depth_vert.glsl ***!
  \*********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/distanceRGBA_frag.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/distanceRGBA_frag.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#define DISTANCE\n\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main () {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist ); // clamp to [ 0, 1 ]\n\n\tgl_FragColor = packDepthToRGBA( dist );\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/distanceRGBA_vert.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/distanceRGBA_vert.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#define DISTANCE\n\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvWorldPosition = worldPosition.xyz;\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/equirect_frag.glsl":
/*!************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/equirect_frag.glsl ***!
  \************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="uniform sampler2D tEquirect;\n\nvarying vec3 vWorldPosition;\n\n#include <common>\n\nvoid main() {\n\n\tvec3 direction = normalize( vWorldPosition );\n\n\tvec2 sampleUV;\n\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/equirect_vert.glsl":
/*!************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/equirect_vert.glsl ***!
  \************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="varying vec3 vWorldPosition;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/linedashed_frag.glsl":
/*!**************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/linedashed_frag.glsl ***!
  \**************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="uniform vec3 diffuse;\nuniform float opacity;\n\nuniform float dashSize;\nuniform float totalSize;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\n\t\tdiscard;\n\n\t}\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\n\toutgoingLight = diffuseColor.rgb; // simple shader\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/linedashed_vert.glsl":
/*!**************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/linedashed_vert.glsl ***!
  \**************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="uniform float scale;\nattribute float lineDistance;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <color_vertex>\n\n\tvLineDistance = scale * lineDistance;\n\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/meshbasic_frag.glsl":
/*!*************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/meshbasic_frag.glsl ***!
  \*************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="uniform vec3 diffuse;\nuniform float opacity;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\n\t// accumulation (baked indirect lighting only)\n\t#ifdef USE_LIGHTMAP\n\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\n\t#else\n\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\n\t#endif\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\n\t#include <envmap_fragment>\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/meshbasic_vert.glsl":
/*!*************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/meshbasic_vert.glsl ***!
  \*************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_ENVMAP\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/meshlambert_frag.glsl":
/*!***************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/meshlambert_frag.glsl ***!
  \***************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n\nvarying vec3 vLightFront;\n\n#ifdef DOUBLE_SIDED\n\n\tvarying vec3 vLightBack;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\n\t#include <lightmap_fragment>\n\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\n\t#else\n\n\t\treflectedLight.directDiffuse = vLightFront;\n\n\t#endif\n\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/meshlambert_vert.glsl":
/*!***************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/meshlambert_vert.glsl ***!
  \***************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#define LAMBERT\n\nvarying vec3 vLightFront;\n\n#ifdef DOUBLE_SIDED\n\n\tvarying vec3 vLightBack;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/meshphong_frag.glsl":
/*!*************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/meshphong_frag.glsl ***!
  \*************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_phong_fragment>\n\t#include <lights_template>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/meshphong_vert.glsl":
/*!*************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/meshphong_vert.glsl ***!
  \*************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#define PHONG\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/meshphysical_frag.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/meshphysical_frag.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#define PHYSICAL\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_physical_fragment>\n\t#include <lights_template>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/meshphysical_vert.glsl":
/*!****************************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/meshphysical_vert.glsl ***!
  \****************************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#define PHYSICAL\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/normal_frag.glsl":
/*!**********************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/normal_frag.glsl ***!
  \**********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#define NORMAL\n\nuniform float opacity;\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n\nvoid main() {\n\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment>\n\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/normal_vert.glsl":
/*!**********************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/normal_vert.glsl ***!
  \**********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#define NORMAL\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\n\tvViewPosition = - mvPosition.xyz;\n\n#endif\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/points_frag.glsl":
/*!**********************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/points_frag.glsl ***!
  \**********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="uniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\n\toutgoingLight = diffuseColor.rgb;\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/points_vert.glsl":
/*!**********************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/points_vert.glsl ***!
  \**********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="uniform float size;\nuniform float scale;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/shadow_frag.glsl":
/*!**********************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/shadow_frag.glsl ***!
  \**********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="uniform vec3 color;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n\nvoid main() {\n\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\n\t#include <fog_fragment>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/ShaderLib/shadow_vert.glsl":
/*!**********************************************************!*\
  !*** ./src/renderers/shaders/ShaderLib/shadow_vert.glsl ***!
  \**********************************************************/
/*! exports provided: default */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony default export */__webpack_exports__["default"]="#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n\nvoid main() {\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n";
/***/},
/***/"./src/renderers/shaders/UniformsLib.ts":
/*!**********************************************!*\
  !*** ./src/renderers/shaders/UniformsLib.ts ***!
  \**********************************************/
/*! exports provided: UniformsLib */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"UniformsLib",function(){return UniformsLib});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../../math/Color */"./src/math/Color.ts");
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../../math/Vector2 */"./src/math/Vector2.ts");
/* harmony import */var _math_Matrix3__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../../math/Matrix3 */"./src/math/Matrix3.ts");
/**
 * Uniforms library for shared webgl shaders
 */const UniformsLib={common:{diffuse:{value:new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"](15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new _math_Matrix3__WEBPACK_IMPORTED_MODULE_2__["Matrix3"]},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new _math_Vector2__WEBPACK_IMPORTED_MODULE_1__["Vector2"](1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"](16777215)}},lights:{ambientLightColor:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},
// TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}}},points:{diffuse:{value:new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"](15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},uvTransform:{value:new _math_Matrix3__WEBPACK_IMPORTED_MODULE_2__["Matrix3"]}}};
/***/},
/***/"./src/renderers/shaders/UniformsUtils.ts":
/*!************************************************!*\
  !*** ./src/renderers/shaders/UniformsUtils.ts ***!
  \************************************************/
/*! exports provided: UniformsUtils */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"UniformsUtils",function(){return UniformsUtils});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../../math/Color */"./src/math/Color.ts");
/* harmony import */var _math_Matrix3__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../../math/Matrix3 */"./src/math/Matrix3.ts");
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../../math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../../math/Vector2 */"./src/math/Vector2.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../../math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _math_Vector4__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(/*! ../../math/Vector4 */"./src/math/Vector4.ts");
/* harmony import */var _textures_Texture__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(/*! ../../textures/Texture */"./src/textures/Texture.ts");class UniformsUtils{static merge(uniforms){const merged={};for(let u=0;u<uniforms.length;u++){const tmp=this.clone(uniforms[u]);for(const p in tmp){if(tmp.hasOwnProperty(p)){merged[p]=tmp[p]}}}return merged}static clone(uniformsSrc){const uniformsDst={};for(const u in uniformsSrc){if(!uniformsSrc.hasOwnProperty(u))continue;uniformsDst[u]={};for(const p in uniformsSrc[u]){if(!uniformsSrc[u].hasOwnProperty(p))continue;const parameterSrc=uniformsSrc[u][p];if(parameterSrc&&(parameterSrc instanceof _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]||parameterSrc instanceof _math_Matrix3__WEBPACK_IMPORTED_MODULE_1__["Matrix3"]||parameterSrc instanceof _math_Matrix4__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]||parameterSrc instanceof _math_Vector2__WEBPACK_IMPORTED_MODULE_3__["Vector2"]||parameterSrc instanceof _math_Vector3__WEBPACK_IMPORTED_MODULE_4__["Vector3"]||parameterSrc instanceof _math_Vector4__WEBPACK_IMPORTED_MODULE_5__["Vector4"]||parameterSrc instanceof _textures_Texture__WEBPACK_IMPORTED_MODULE_6__["Texture"])){uniformsDst[u][p]=parameterSrc.clone()}else if(Array.isArray(parameterSrc)){uniformsDst[u][p]=parameterSrc.slice()}else{uniformsDst[u][p]=parameterSrc}}}return uniformsDst}}
/***/},
/***/"./src/renderers/webgl/WebGLUtils.ts":
/*!*******************************************!*\
  !*** ./src/renderers/webgl/WebGLUtils.ts ***!
  \*******************************************/
/*! exports provided: WebGLUtils */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"WebGLUtils",function(){return WebGLUtils});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../../constants */"./src/constants.ts");class WebGLUtils{constructor(context,extensions){this.context=context;this.extensions=extensions}convert(parameter){const extensions=this.extensions;const context=this.context;let extension;if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RepeatWrapping"]){return context.REPEAT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["ClampToEdgeWrapping"]){return context.CLAMP_TO_EDGE}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["MirroredRepeatWrapping"]){return context.MIRRORED_REPEAT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["NearestFilter"]){return context.NEAREST}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["NearestMipMapNearestFilter"]){return context.NEAREST_MIPMAP_NEAREST}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["NearestMipMapLinearFilter"]){return context.NEAREST_MIPMAP_LINEAR}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["LinearFilter"]){return context.LINEAR}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["LinearMipMapNearestFilter"]){return context.LINEAR_MIPMAP_NEAREST}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["LinearMipMapLinearFilter"]){return context.LINEAR_MIPMAP_LINEAR}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["UnsignedByteType"]){return context.UNSIGNED_BYTE}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["UnsignedShort4444Type"]){return context.UNSIGNED_SHORT_4_4_4_4}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["UnsignedShort5551Type"]){return context.UNSIGNED_SHORT_5_5_5_1}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["UnsignedShort565Type"]){return context.UNSIGNED_SHORT_5_6_5}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["ByteType"]){return context.BYTE}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["ShortType"]){return context.SHORT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["UnsignedShortType"]){return context.UNSIGNED_SHORT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["IntType"]){return context.INT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["UnsignedIntType"]){return context.UNSIGNED_INT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["FloatType"]){return context.FLOAT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["HalfFloatType"]){extension=extensions.get("OES_texture_half_float");if(extension!==null){return extension.HALF_FLOAT_OES}}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["AlphaFormat"]){return context.ALPHA}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBFormat"]){return context.RGB}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBAFormat"]){return context.RGBA}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["LuminanceFormat"]){return context.LUMINANCE}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["LuminanceAlphaFormat"]){return context.LUMINANCE_ALPHA}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["DepthFormat"]){return context.DEPTH_COMPONENT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["DepthStencilFormat"]){return context.DEPTH_STENCIL}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["AddEquation"]){return context.FUNC_ADD}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["SubtractEquation"]){return context.FUNC_SUBTRACT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["ReverseSubtractEquation"]){return context.FUNC_REVERSE_SUBTRACT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["ZeroFactor"]){return context.ZERO}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["OneFactor"]){return context.ONE}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["SrcColorFactor"]){return context.SRC_COLOR}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["OneMinusSrcColorFactor"]){return context.ONE_MINUS_SRC_COLOR}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["SrcAlphaFactor"]){return context.SRC_ALPHA}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["OneMinusSrcAlphaFactor"]){return context.ONE_MINUS_SRC_ALPHA}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["DstAlphaFactor"]){return context.DST_ALPHA}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["OneMinusDstAlphaFactor"]){return context.ONE_MINUS_DST_ALPHA}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["DstColorFactor"]){return context.DST_COLOR}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["OneMinusDstColorFactor"]){return context.ONE_MINUS_DST_COLOR}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["SrcAlphaSaturateFactor"]){return context.SRC_ALPHA_SATURATE}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGB_S3TC_DXT1_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_S3TC_DXT1_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_S3TC_DXT3_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_S3TC_DXT5_Format"]){extension=extensions.get("WEBGL_compressed_texture_s3tc");if(extension!==null){if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGB_S3TC_DXT1_Format"]){return extension.COMPRESSED_RGB_S3TC_DXT1_EXT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_S3TC_DXT1_Format"]){return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_S3TC_DXT3_Format"]){return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_S3TC_DXT5_Format"]){return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT}}}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGB_PVRTC_4BPPV1_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGB_PVRTC_2BPPV1_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_PVRTC_4BPPV1_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_PVRTC_2BPPV1_Format"]){extension=extensions.get("WEBGL_compressed_texture_pvrtc");if(extension!==null){if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGB_PVRTC_4BPPV1_Format"]){return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGB_PVRTC_2BPPV1_Format"]){return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_PVRTC_4BPPV1_Format"]){return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_PVRTC_2BPPV1_Format"]){return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}}}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGB_ETC1_Format"]){extension=extensions.get("WEBGL_compressed_texture_etc1");if(extension!==null){return extension.COMPRESSED_RGB_ETC1_WEBGL}}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_4x4_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_5x4_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_5x5_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_6x5_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_6x6_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_8x5_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_8x6_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_8x8_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_10x5_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_10x6_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_10x8_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_10x10_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_12x10_Format"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA_ASTC_12x12_Format"]){extension=extensions.get("WEBGL_compressed_texture_astc");if(extension!==null){return parameter}}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["MinEquation"]||parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["MaxEquation"]){extension=extensions.get("EXT_blend_minmax");if(extension!==null){if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["MinEquation"]){return extension.MIN_EXT}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["MaxEquation"]){return extension.MAX_EXT}}}if(parameter===_constants__WEBPACK_IMPORTED_MODULE_0__["UnsignedInt248Type"]){extension=extensions.get("WEBGL_depth_texture");if(extension!==null){return extension.UNSIGNED_INT_24_8_WEBGL}}return 0}}
/***/},
/***/"./src/scenes/Fog.ts":
/*!***************************!*\
  !*** ./src/scenes/Fog.ts ***!
  \***************************/
/*! exports provided: Fog */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Fog",function(){return Fog});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");class Fog{constructor(color,near=1,far=1e3){this.name="";this.near=1;this.far=1e3;if(color instanceof _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]){this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).copy(color)}else if(typeof color==="number"){this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).setHex(color)}else if(typeof color==="string"){this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).setStyle(color)}this.near=near;this.far=far}copy(source){this.color.copy(source.color);this.near=source.near;this.far=source.far;return this}clone(){return new this.constructor(this.color,this.near,this.far).copy(this)}}
/***/},
/***/"./src/scenes/FogExp2.ts":
/*!*******************************!*\
  !*** ./src/scenes/FogExp2.ts ***!
  \*******************************/
/*! exports provided: FogExp2 */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"FogExp2",function(){return FogExp2});
/* harmony import */var _math_Color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../math/Color */"./src/math/Color.ts");class FogExp2{constructor(color,density=1){this.name="";this.density=25e-5;if(color instanceof _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]){this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).copy(color)}else if(typeof color==="number"){this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).setHex(color)}else if(typeof color==="string"){this.color=(new _math_Color__WEBPACK_IMPORTED_MODULE_0__["Color"]).setStyle(color)}this.density=density}copy(source){this.color.copy(source.color);this.density=source.density;return this}clone(){return new this.constructor(this.color,this.density).copy(this)}}
/***/},
/***/"./src/scenes/Scene.ts":
/*!*****************************!*\
  !*** ./src/scenes/Scene.ts ***!
  \*****************************/
/*! exports provided: Scene */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Scene",function(){return Scene});
/* harmony import */var _core_Object3D__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../core/Object3D */"./src/core/Object3D.ts");class Scene extends _core_Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"]{constructor(){super(...arguments);this.type="Scene";this.background=null;this.fog=null;this.overrideMaterial=null;this.autoUpdate=true;// checked by the renderer
}copy(source){super.copy(source);if(source.background!==null){this.background=source.background.clone()}if(source.fog!==null){this.fog=source.fog.clone()}if(source.overrideMaterial!==null){this.overrideMaterial=source.overrideMaterial.clone()}this.autoUpdate=source.autoUpdate;
// this.matrixAutoUpdate = source.matrixAutoUpdate;
return this}clone(){return(new this.constructor).copy(this)}}
/***/},
/***/"./src/textures/CanvasTexture.ts":
/*!***************************************!*\
  !*** ./src/textures/CanvasTexture.ts ***!
  \***************************************/
/*! exports provided: CanvasTexture */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CanvasTexture",function(){return CanvasTexture});
/* harmony import */var _Texture__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Texture */"./src/textures/Texture.ts");class CanvasTexture extends _Texture__WEBPACK_IMPORTED_MODULE_0__["Texture"]{constructor(canvas,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy){super(canvas,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy);this.needsUpdate=true}}
/***/},
/***/"./src/textures/CompressedTexture.ts":
/*!*******************************************!*\
  !*** ./src/textures/CompressedTexture.ts ***!
  \*******************************************/
/*! exports provided: CompressedTexture */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CompressedTexture",function(){return CompressedTexture});
/* harmony import */var _Texture__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Texture */"./src/textures/Texture.ts");class CompressedTexture extends _Texture__WEBPACK_IMPORTED_MODULE_0__["Texture"]{constructor(mipmaps,width,height,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy,encoding){super(null,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy,encoding);this.image={width:width,height:height};this.mipmaps=mipmaps;
/**
         * no flipping for cube textures
         * (also flipping doesn't work for compressed textures )
         * @type {boolean}
         */this.flipY=false;
/**
         * can't generate mipmaps for compressed textures
         * mips must be embedded in DDS files
         * @type {boolean}
         */this.generateMipmaps=false}}
/***/},
/***/"./src/textures/CubeTexture.ts":
/*!*************************************!*\
  !*** ./src/textures/CubeTexture.ts ***!
  \*************************************/
/*! exports provided: CubeTexture */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"CubeTexture",function(){return CubeTexture});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../constants */"./src/constants.ts");
/* harmony import */var _Texture__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Texture */"./src/textures/Texture.ts");class CubeTexture extends _Texture__WEBPACK_IMPORTED_MODULE_1__["Texture"]{constructor(images=[],mapping=_constants__WEBPACK_IMPORTED_MODULE_0__["CubeReflectionMapping"],wrapS,wrapT,magFilter,minFilter,format,type,anisotropy,encoding){super(images,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy,encoding);this.flipY=false}get images(){return this.image}set images(images){this.image=images}}
/***/},
/***/"./src/textures/DataTexture.ts":
/*!*************************************!*\
  !*** ./src/textures/DataTexture.ts ***!
  \*************************************/
/*! exports provided: DataTexture */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"DataTexture",function(){return DataTexture});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../constants */"./src/constants.ts");
/* harmony import */var _Texture__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Texture */"./src/textures/Texture.ts");class DataTexture extends _Texture__WEBPACK_IMPORTED_MODULE_1__["Texture"]{constructor(data,width,height,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy,encoding){super(null,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy,encoding);this.image={data:data,width:width,height:height};this.magFilter=magFilter!==undefined?magFilter:_constants__WEBPACK_IMPORTED_MODULE_0__["NearestFilter"];this.minFilter=minFilter!==undefined?minFilter:_constants__WEBPACK_IMPORTED_MODULE_0__["NearestFilter"];this.generateMipmaps=false;this.flipY=false;this.unpackAlignment=1}}
/***/},
/***/"./src/textures/DepthTexture.ts":
/*!**************************************!*\
  !*** ./src/textures/DepthTexture.ts ***!
  \**************************************/
/*! exports provided: DepthTexture */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"DepthTexture",function(){return DepthTexture});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../constants */"./src/constants.ts");
/* harmony import */var _Texture__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./Texture */"./src/textures/Texture.ts");class DepthTexture extends _Texture__WEBPACK_IMPORTED_MODULE_1__["Texture"]{constructor(width,height,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy,encoding){format=format!==undefined?format:_constants__WEBPACK_IMPORTED_MODULE_0__["DepthFormat"];if(format!==_constants__WEBPACK_IMPORTED_MODULE_0__["DepthFormat"]&&format!==_constants__WEBPACK_IMPORTED_MODULE_0__["DepthStencilFormat"]){throw new Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`)}if(type===undefined&&format===_constants__WEBPACK_IMPORTED_MODULE_0__["DepthFormat"]){type=_constants__WEBPACK_IMPORTED_MODULE_0__["UnsignedShortType"]}if(type===undefined&&format===_constants__WEBPACK_IMPORTED_MODULE_0__["DepthStencilFormat"]){type=_constants__WEBPACK_IMPORTED_MODULE_0__["UnsignedInt248Type"]}super(null,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy,encoding);this.image={width:width,height:height};this.magFilter=magFilter!==undefined?magFilter:_constants__WEBPACK_IMPORTED_MODULE_0__["NearestFilter"];this.minFilter=minFilter!==undefined?minFilter:_constants__WEBPACK_IMPORTED_MODULE_0__["NearestFilter"];this.flipY=false;this.generateMipmaps=false}}
/***/},
/***/"./src/textures/Texture.ts":
/*!*********************************!*\
  !*** ./src/textures/Texture.ts ***!
  \*********************************/
/*! exports provided: Texture */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"Texture",function(){return Texture});
/* harmony import */var _constants__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ../constants */"./src/constants.ts");
/* harmony import */var _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ../core/EventDispatcher */"./src/core/EventDispatcher.ts");
/* harmony import */var _math_Math__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ../math/Math */"./src/math/Math.ts");
/* harmony import */var _math_Matrix3__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ../math/Matrix3 */"./src/math/Matrix3.ts");
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ../math/Vector2 */"./src/math/Vector2.ts");let textureId=0;class Texture extends _core_EventDispatcher__WEBPACK_IMPORTED_MODULE_1__["EventDispatcher"]{constructor(image=Texture.DEFAULT_IMAGE,mapping=Texture.DEFAULT_MAPPING,wrapS=_constants__WEBPACK_IMPORTED_MODULE_0__["ClampToEdgeWrapping"],wrapT=_constants__WEBPACK_IMPORTED_MODULE_0__["ClampToEdgeWrapping"],magFilter=_constants__WEBPACK_IMPORTED_MODULE_0__["LinearFilter"],minFilter=_constants__WEBPACK_IMPORTED_MODULE_0__["LinearMipMapLinearFilter"],format=_constants__WEBPACK_IMPORTED_MODULE_0__["RGBAFormat"],type=_constants__WEBPACK_IMPORTED_MODULE_0__["UnsignedByteType"],anisotropy=1,encoding=_constants__WEBPACK_IMPORTED_MODULE_0__["LinearEncoding"]){super();this.id=textureId++;this.uuid=_math_Math__WEBPACK_IMPORTED_MODULE_2__["MathUtil"].generateUUID();this.name="";this.image=Texture.DEFAULT_IMAGE;this.mipmaps=[];this.mapping=Texture.DEFAULT_MAPPING;this.wrapS=_constants__WEBPACK_IMPORTED_MODULE_0__["ClampToEdgeWrapping"];this.wrapT=_constants__WEBPACK_IMPORTED_MODULE_0__["ClampToEdgeWrapping"];this.magFilter=_constants__WEBPACK_IMPORTED_MODULE_0__["LinearFilter"];this.minFilter=_constants__WEBPACK_IMPORTED_MODULE_0__["LinearMipMapLinearFilter"];this.anisotropy=1;this.format=_constants__WEBPACK_IMPORTED_MODULE_0__["RGBAFormat"];this.type=_constants__WEBPACK_IMPORTED_MODULE_0__["UnsignedByteType"];this.offset=new _math_Vector2__WEBPACK_IMPORTED_MODULE_4__["Vector2"](0,0);this.repeat=new _math_Vector2__WEBPACK_IMPORTED_MODULE_4__["Vector2"](1,1);this.center=new _math_Vector2__WEBPACK_IMPORTED_MODULE_4__["Vector2"](0,0);this.rotation=0;this.matrix=new _math_Matrix3__WEBPACK_IMPORTED_MODULE_3__["Matrix3"];this.matrixAutoUpdate=true;this.generateMipmaps=true;this.premultiplyAlpha=false;this.flipY=true;
/**
         * valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)
         * @type {number}
         */this.unpackAlignment=4;
/**
         * Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
         * Also changing the encoding after already used by a Material will not automatically make the Material update.
         * You need to explicitly call Material.needsUpdate to trigger it to recompile.
         */this.encoding=_constants__WEBPACK_IMPORTED_MODULE_0__["LinearEncoding"];this.version=0;this.image=image;this.mapping=mapping;this.wrapS=wrapS;this.wrapT=wrapT;this.magFilter=magFilter;this.minFilter=minFilter;this.format=format;this.type=type;this.anisotropy=anisotropy;this.encoding=encoding}set needsUpdate(value){if(value===true)this.version++}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(uv){if(this.mapping!==_constants__WEBPACK_IMPORTED_MODULE_0__["UVMapping"])return this;uv.applyMatrix3(this.matrix);if(uv.x<0||uv.x>1){switch(this.wrapS){case _constants__WEBPACK_IMPORTED_MODULE_0__["RepeatWrapping"]:uv.x=uv.x-Math.floor(uv.x);break;case _constants__WEBPACK_IMPORTED_MODULE_0__["ClampToEdgeWrapping"]:uv.x=uv.x<0?0:1;break;case _constants__WEBPACK_IMPORTED_MODULE_0__["MirroredRepeatWrapping"]:if(Math.abs(Math.floor(uv.x)%2)===1){uv.x=Math.ceil(uv.x)-uv.x}else{uv.x=uv.x-Math.floor(uv.x)}break}}if(uv.y<0||uv.y>1){switch(this.wrapT){case _constants__WEBPACK_IMPORTED_MODULE_0__["RepeatWrapping"]:uv.y=uv.y-Math.floor(uv.y);break;case _constants__WEBPACK_IMPORTED_MODULE_0__["ClampToEdgeWrapping"]:uv.y=uv.y<0?0:1;break;case _constants__WEBPACK_IMPORTED_MODULE_0__["MirroredRepeatWrapping"]:if(Math.abs(Math.floor(uv.y)%2)===1){uv.y=Math.ceil(uv.y)-uv.y}else{uv.y=uv.y-Math.floor(uv.y)}break}}if(this.flipY){uv.y=1-uv.y}return this}clone(){return(new this.constructor).copy(this)}copy(source){this.name=source.name;this.image=source.image;this.mipmaps=source.mipmaps.slice(0);this.mapping=source.mapping;this.wrapS=source.wrapS;this.wrapT=source.wrapT;this.magFilter=source.magFilter;this.minFilter=source.minFilter;this.anisotropy=source.anisotropy;this.format=source.format;this.type=source.type;this.offset.copy(source.offset);this.repeat.copy(source.repeat);this.center.copy(source.center);this.rotation=source.rotation;this.matrixAutoUpdate=source.matrixAutoUpdate;this.matrix.copy(source.matrix);this.generateMipmaps=source.generateMipmaps;this.premultiplyAlpha=source.premultiplyAlpha;this.flipY=source.flipY;this.unpackAlignment=source.unpackAlignment;this.encoding=source.encoding;return this}}Texture.DEFAULT_MAPPING=_constants__WEBPACK_IMPORTED_MODULE_0__["UVMapping"];
/***/},
/***/"./src/textures/VideoTexture.ts":
/*!**************************************!*\
  !*** ./src/textures/VideoTexture.ts ***!
  \**************************************/
/*! exports provided: VideoTexture */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"VideoTexture",function(){return VideoTexture});
/* harmony import */var _Texture__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./Texture */"./src/textures/Texture.ts");class VideoTexture extends _Texture__WEBPACK_IMPORTED_MODULE_0__["Texture"]{constructor(video,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy){super(video,mapping,wrapS,wrapT,magFilter,minFilter,format,type,anisotropy);this.generateMipmaps=false}update(){const video=this.image;if(video.readyState>=video.HAVE_CURRENT_DATA){this.needsUpdate=true}return this}}
/***/},
/***/"./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: arrayMin, arrayMax, applyMatrixToBufferAttribute, setBoxFromBufferAttribute, unprojectVector3onCamera, vectorFromBufferAttribute */
/***/function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"arrayMin",function(){return arrayMin});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"arrayMax",function(){return arrayMax});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"applyMatrixToBufferAttribute",function(){return applyMatrixToBufferAttribute});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"setBoxFromBufferAttribute",function(){return setBoxFromBufferAttribute});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"unprojectVector3onCamera",function(){return unprojectVector3onCamera});
/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"vectorFromBufferAttribute",function(){return vectorFromBufferAttribute});
/* harmony import */var _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(/*! ./math/Matrix4 */"./src/math/Matrix4.ts");
/* harmony import */var _math_Matrix3__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(/*! ./math/Matrix3 */"./src/math/Matrix3.ts");
/* harmony import */var _math_Vector3__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(/*! ./math/Vector3 */"./src/math/Vector3.ts");
/* harmony import */var _math_Vector2__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(/*! ./math/Vector2 */"./src/math/Vector2.ts");
/* harmony import */var _math_Vector4__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(/*! ./math/Vector4 */"./src/math/Vector4.ts");function arrayMin(array){if(array.length===0)return Infinity;let min=array[0];for(let i=1,l=array.length;i<l;++i){if(array[i]<min)min=array[i]}return min}function arrayMax(array){if(array.length===0)return-Infinity;let max=array[0];for(let i=1,l=array.length;i<l;++i){if(array[i]>max)max=array[i]}return max}function applyMatrixToBufferAttribute(matrix,attribute){const vec=new _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"];for(let i=0,l=attribute.count;i<l;i++){vec.x=attribute.getProperty(i,"x");vec.y=attribute.getProperty(i,"y");vec.z=attribute.getProperty(i,"z");if(matrix instanceof _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__["Matrix4"]){vec.applyMatrix4(matrix)}else if(matrix instanceof _math_Matrix3__WEBPACK_IMPORTED_MODULE_1__["Matrix3"]){vec.applyMatrix3(matrix)}attribute.setProperty(i,"xyz",vec)}return attribute}function setBoxFromBufferAttribute(target,attribute){let minX=+Infinity;let minY=+Infinity;let minZ=+Infinity;let maxX=-Infinity;let maxY=-Infinity;let maxZ=-Infinity;for(let i=0,l=attribute.count;i<l;i++){const x=attribute.getProperty(i,"x");const y=attribute.getProperty(i,"y");const z=attribute.getProperty(i,"z");if(x<minX)minX=x;if(y<minY)minY=y;if(z<minZ)minZ=z;if(x>maxX)maxX=x;if(y>maxY)maxY=y;if(z>maxZ)maxZ=z}target.min.set(minX,minY,minZ);target.max.set(maxX,maxY,maxZ)}function unprojectVector3onCamera(vector,camera){const matrix=new _math_Matrix4__WEBPACK_IMPORTED_MODULE_0__["Matrix4"];vector.applyMatrix4(matrix.multiplyMatrices(camera.matrixWorld,matrix.getInverse(camera.projectionMatrix)));return vector}function vectorFromBufferAttribute(vector,attribute,index=0){if(vector instanceof _math_Vector2__WEBPACK_IMPORTED_MODULE_3__["Vector2"]){return vector.set(attribute.getProperty(index,"x"),attribute.getProperty(index,"y"))}else if(vector instanceof _math_Vector3__WEBPACK_IMPORTED_MODULE_2__["Vector3"]){return vector.set(attribute.getProperty(index,"x"),attribute.getProperty(index,"y"),attribute.getProperty(index,"z"))}else if(vector instanceof _math_Vector4__WEBPACK_IMPORTED_MODULE_4__["Vector4"]){return vector.set(attribute.getProperty(index,"x"),attribute.getProperty(index,"y"),attribute.getProperty(index,"z"),attribute.getProperty(index,"w"))}return vector}
/***/}
/******/})});
//# sourceMappingURL=Three.js.map