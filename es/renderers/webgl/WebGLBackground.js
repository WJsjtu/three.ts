import { BackSide } from "../../constants";
import { Color } from "../../math/Color";
import { Texture } from "../../textures/Texture";
import { CubeTexture } from "../../textures/CubeTexture";
import { Mesh } from "../../objects/Mesh";
import { BoxBufferGeometry } from "../../geometries/Geometries";
import { ShaderMaterial, MeshBasicMaterial } from "../../materials/Materials";
import { ShaderLib } from "../shaders/ShaderLib";
import { OrthographicCamera } from "../../cameras/OrthographicCamera";
import { PlaneBufferGeometry } from "../../geometries/PlaneGeometry";
export class WebGLBackground {
    constructor(renderer, state, geometries, premultipliedAlpha) {
        this.clearColor = new Color().setHex(0x000000);
        this.clearAlpha = 0;
        this.renderer = renderer;
        this.state = state;
        this.geometries = geometries;
        this.premultipliedAlpha = premultipliedAlpha;
    }
    getClearColor() {
        return this.clearColor;
    }
    setClearColor(color, alpha) {
        this.clearColor.copy(color);
        this.clearAlpha = alpha !== undefined ? alpha : 1;
        this.setClear(this.clearColor, this.clearAlpha);
    }
    getClearAlpha() {
        return this.clearAlpha;
    }
    setClearAlpha(alpha) {
        this.clearAlpha = alpha;
        this.setClear(this.clearColor, this.clearAlpha);
    }
    setClear(color, alpha) {
        this.state.buffers.color.setClear(color.r, color.g, color.b, alpha, this.premultipliedAlpha);
    }
    render(renderList, scene, camera, forceClear) {
        const background = scene.background;
        const renderer = this.renderer;
        if (background === null) {
            this.setClear(this.clearColor, this.clearAlpha);
        }
        else if (background && background instanceof Color) {
            this.setClear(background, 1);
            forceClear = true;
        }
        if (this.renderer.autoClear || forceClear) {
            renderer.clear(this.renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
        }
        if (background && background instanceof CubeTexture) {
            if (this.boxMesh === undefined) {
                this.boxMesh = new Mesh(new BoxBufferGeometry(1, 1, 1), new ShaderMaterial({
                    uniforms: ShaderLib.cube.uniforms,
                    vertexShader: ShaderLib.cube.vertexShader,
                    fragmentShader: ShaderLib.cube.fragmentShader,
                    side: BackSide,
                    depthTest: true,
                    depthWrite: false,
                    fog: false,
                }));
                this.boxMesh.geometry.removeAttribute("normal");
                this.boxMesh.geometry.removeAttribute("uv");
                this.boxMesh.onBeforeRender = function (renderer, scene, camera) {
                    this.matrixWorld.copyPosition(camera.matrixWorld);
                };
                this.geometries.update(this.boxMesh.geometry);
            }
            this.boxMesh.material.uniforms.tCube.value = background;
            renderList.push(this.boxMesh, this.boxMesh.geometry, this.boxMesh.material, 0, null);
        }
        else if (background && background instanceof Texture) {
            if (this.planeCamera === undefined) {
                this.planeCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
                this.planeMesh = new Mesh(new PlaneBufferGeometry(2, 2), new MeshBasicMaterial({ depthTest: false, depthWrite: false, fog: false }));
                this.geometries.update(this.planeMesh.geometry);
            }
            this.planeMesh.material.map = background;
            // TODO Push this to renderList
            renderer.renderBufferDirect(this.planeCamera, null, this.planeMesh.geometry, this.planeMesh.material, this.planeMesh, null);
        }
    }
}
