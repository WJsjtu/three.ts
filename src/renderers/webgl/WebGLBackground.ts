import { BackSide } from "../../constants";
import { WebGLRenderer } from "../WebGLRenderer";
import { Camera } from "../../cameras/Camera";
import { Color } from "../../math/Color";
import { Scene } from "../../scenes/Scene";
import { WebGLState } from "./WebGLState";
import { WebGLGeometries } from "./WebGLGeometries";
import { WebGLRenderList } from "./WebGLRenderLists";
import { Texture } from "../../textures/Texture";
import { CubeTexture } from "../../textures/CubeTexture";
import { Mesh } from "../../objects/Mesh";
import { BoxBufferGeometry } from "../../geometries/Geometries";
import { ShaderMaterial, Material, MeshBasicMaterial } from "../../materials/Materials";
import { ShaderLib } from "../shaders/ShaderLib";
import { BufferGeometry } from "../../core/BufferGeometry";
import { OrthographicCamera } from "../../cameras/OrthographicCamera";
import { PlaneBufferGeometry } from "../../geometries/PlaneGeometry";

export class WebGLBackground {
    protected clearColor: Color = new Color().setHex(0x000000);
    protected clearAlpha: number = 0;
    protected renderer: WebGLRenderer;
    protected state: WebGLState;
    protected geometries: WebGLGeometries;
    protected premultipliedAlpha: boolean;
    protected boxMesh: Mesh;
    protected planeCamera: OrthographicCamera;
    protected planeMesh: Mesh;

    constructor(renderer: WebGLRenderer, state: WebGLState, geometries: WebGLGeometries, premultipliedAlpha: boolean) {
        this.renderer = renderer;
        this.state = state;
        this.geometries = geometries;
        this.premultipliedAlpha = premultipliedAlpha;
    }

    public getClearColor(): Color {
        return this.clearColor;
    }

    public setClearColor(color: Color, alpha: number): void {
        this.clearColor.copy(color);
        this.clearAlpha = alpha !== undefined ? alpha : 1;
        this.setClear(this.clearColor, this.clearAlpha);
    }

    public getClearAlpha(): number {
        return this.clearAlpha;
    }

    public setClearAlpha(alpha: number): void {
        this.clearAlpha = alpha;
        this.setClear(this.clearColor, this.clearAlpha);
    }

    protected setClear(color: Color, alpha: number): void {
        this.state.buffers.color.setClear(color.r, color.g, color.b, alpha, this.premultipliedAlpha);
    }

    public render(renderList: WebGLRenderList, scene: Scene, camera: Camera, forceClear: boolean): void {
        const background: Color | Texture | CubeTexture | null = scene.background;
        const renderer: WebGLRenderer = this.renderer;
        if (background === null) {
            this.setClear(this.clearColor, this.clearAlpha);
        } else if (background && background instanceof Color) {
            this.setClear(background, 1);
            forceClear = true;
        }
        if (this.renderer.autoClear || forceClear) {
            renderer.clear(this.renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
        }
        if (background && background instanceof CubeTexture) {
            if (this.boxMesh === undefined) {
                this.boxMesh = new Mesh(
                    new BoxBufferGeometry(1, 1, 1),
                    new ShaderMaterial({
                        uniforms: ShaderLib.cube.uniforms,
                        vertexShader: ShaderLib.cube.vertexShader,
                        fragmentShader: ShaderLib.cube.fragmentShader,
                        side: BackSide,
                        depthTest: true,
                        depthWrite: false,
                        fog: false,
                    }),
                );
                (this.boxMesh.geometry as BufferGeometry).removeAttribute("normal");
                (this.boxMesh.geometry as BufferGeometry).removeAttribute("uv");
                this.boxMesh.onBeforeRender = function(renderer, scene, camera) {
                    this.matrixWorld.copyPosition(camera.matrixWorld);
                };
                this.geometries.update(this.boxMesh.geometry as BufferGeometry);
            }
            (this.boxMesh.material as ShaderMaterial).uniforms.tCube.value = background;
            renderList.push(
                this.boxMesh,
                this.boxMesh.geometry as BoxBufferGeometry,
                this.boxMesh.material as ShaderMaterial,
                0,
                null,
            );
        } else if (background && background instanceof Texture) {
            if (this.planeCamera === undefined) {
                this.planeCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
                this.planeMesh = new Mesh(
                    new PlaneBufferGeometry(2, 2),
                    new MeshBasicMaterial({ depthTest: false, depthWrite: false, fog: false }),
                );
                this.geometries.update(this.planeMesh.geometry as BufferGeometry);
            }
            this.planeMesh.material.map = background;
            // TODO Push this to renderList
            renderer.renderBufferDirect(
                this.planeCamera,
                null,
                this.planeMesh.geometry as BufferGeometry,
                this.planeMesh.material as MeshBasicMaterial,
                this.planeMesh,
                null,
            );
        }
    }
}
