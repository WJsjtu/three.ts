import {
    AdditiveBlending,
    AlwaysDepth,
    BackSide,
    CullFaceFront,
    CullFaceBack,
    CullFaceNone,
    CustomBlending,
    DoubleSide,
    EqualDepth,
    GreaterDepth,
    GreaterEqualDepth,
    LessEqualDepth,
    LessDepth,
    MultiplyBlending,
    NeverDepth,
    NoBlending,
    NormalBlending,
    NotEqualDepth,
    SubtractiveBlending,
} from "../../constants";
import { TypedArray } from "../../core/BufferAttribute";
import { Material } from "../../materials/Material";
import { Vector4 } from "../../math/Vector4";
import { WebGLExtensions } from "./WebGLExtensions";
import { WebGLUtils } from "./WebGLUtils";

export class ColorBuffer {
    protected context: WebGLRenderingContext;
    protected locked: boolean = false;
    protected color: Vector4 = new Vector4();
    protected currentColorMask: boolean | null = null;
    protected currentColorClear: Vector4 = new Vector4(0, 0, 0, 0);

    constructor(context: WebGLRenderingContext) {
        this.context = context;
    }

    public setMask(colorMask: boolean): this {
        if (this.currentColorMask !== colorMask && !this.locked) {
            this.context.colorMask(colorMask, colorMask, colorMask, colorMask);
            this.currentColorMask = colorMask;
        }
        return this;
    }

    public setLocked(lock: boolean): this {
        this.locked = lock;
        return this;
    }

    public setClear(
        r: number,
        g: number,
        b: number,
        a: number,
        premultipliedAlpha: boolean = false,
    ): this {
        if (premultipliedAlpha === true) {
            r *= a;
            g *= a;
            b *= a;
        }
        this.color.set(r, g, b, a);
        if (this.currentColorClear.equals(this.color) === false) {
            this.context.clearColor(r, g, b, a);
            this.currentColorClear.copy(this.color);
        }
        return this;
    }

    public reset(): this {
        this.locked = false;
        this.currentColorMask = null;
        /**
         * set to invalid state
         */
        this.currentColorClear.set(-1, 0, 0, 0);
        return this;
    }
}

export class DepthBuffer {
    protected context: WebGLRenderingContext;
    protected capabilities: { [key: number]: boolean };
    protected locked: boolean = false;
    protected currentDepthMask: boolean | null = null;
    protected currentDepthFunc: number | null = null;
    protected currentDepthClear: number | null = null;

    constructor(
        context: WebGLRenderingContext,
        capabilities: { [key: number]: boolean },
    ) {
        this.context = context;
        this.capabilities = capabilities;
    }

    public setTest(depthTest: boolean = false): this {
        if (depthTest) {
            this.enable(this.context.DEPTH_TEST);
        } else {
            this.disable(this.context.DEPTH_TEST);
        }
        return this;
    }

    public setMask(depthMask: boolean): this {
        if (this.currentDepthMask !== depthMask && !this.locked) {
            this.context.depthMask(depthMask);
            this.currentDepthMask = depthMask;
        }
        return this;
    }

    /**
     * 开启深度测试功能后才能设置对应的比较函数
     * 启用方式gl.enable(gl.DEPTH_TEST)
     * 用于指定深度缓冲比较值）
     GL_NEVER,不通过（输入的深度值不取代参考值）
     GL_LESS,如果输入的深度值小于参考值，则通过
     GL_EQUAL,如果输入的深度值等于参考值，则通过
     GL_LEQUAL,如果输入的深度值小于或等于参考值，则通过
     GL_GREATER,如果输入的深度值大于参考值，则通过
     GL_NOTEQUAL,如果输入的深度值不等于参考值，则通过
     GL_GEQUAL,如果输入的深度值大于或等于参考值，则通过
     GL_ALWAYS,总是通过（输入的深度值取代参考值）
     * Z Buffer 值为具体的比较对象，在不使用深度测试的时候，
     * 如果我们先绘制一个距离较近的物体，再绘制距离较远的物体，则距离远的物体因为后绘制，会把距离近的物体覆盖掉，这样的效果并不是我们所希望的。
     * 而有了深度缓冲以后，绘制物体的顺序就不那么重要了，都能按照远近（Z值）正常显示，这很关键。
     * 实际上，只要存在深度缓冲区，无论是否启用深度测试，OpenGL在像素被绘制时都会尝试将深度数据写入到缓冲区内，
     * 除非调用了glDepthMask(GL_FALSE)来禁止写入。这些深度数据除了用于常规的测试外，还可以有一些有趣的用途，比如绘制阴影等等。
     *
     * 绘制半透明物体时，需注意：在绘制半透明物体时前，还需要利用glDepthMask(GL_FALSE)将深度缓冲区设置为只读形式，
     * 否则可能出现画面错误。为什么呢，因为画透明物体时，将使用混色，这时就不能继续使用深度模式，
     * 而是利用混色函数来进行混合。这一来，就可以使用混合函数绘制半透明物体了。
     *
     * @param depthFunc
     */
    public setFunc(depthFunc: number): this {
        if (this.currentDepthFunc !== depthFunc) {
            const gl: WebGLRenderingContext = this.context;
            if (depthFunc) {
                switch (depthFunc) {
                    case NeverDepth:
                        gl.depthFunc(gl.NEVER);
                        break;
                    case AlwaysDepth:
                        gl.depthFunc(gl.ALWAYS);
                        break;
                    case LessDepth:
                        gl.depthFunc(gl.LESS);
                        break;
                    case LessEqualDepth:
                        gl.depthFunc(gl.LEQUAL);
                        break;
                    case EqualDepth:
                        gl.depthFunc(gl.EQUAL);
                        break;
                    case GreaterEqualDepth:
                        gl.depthFunc(gl.GEQUAL);
                        break;
                    case GreaterDepth:
                        gl.depthFunc(gl.GREATER);
                        break;
                    case NotEqualDepth:
                        gl.depthFunc(gl.NOTEQUAL);
                        break;
                    default:
                        gl.depthFunc(gl.LEQUAL);
                }
            } else {
                gl.depthFunc(gl.LEQUAL);
            }
            this.currentDepthFunc = depthFunc;
        }
        return this;
    }

    public setLocked(lock: boolean = false): this {
        this.locked = lock;
        return this;
    }

    public setClear(depth: number): this {
        if (this.currentDepthClear !== depth) {
            this.context.clearDepth(depth);
            this.currentDepthClear = depth;
        }
        return this;
    }

    public reset(): this {
        this.locked = false;
        this.currentDepthMask = null;
        this.currentDepthFunc = null;
        this.currentDepthClear = null;
        return this;
    }

    protected enable(id: number): this {
        if (this.capabilities[id] !== true) {
            this.context.enable(id);
            this.capabilities[id] = true;
        }
        return this;
    }

    protected disable(id: number): this {
        if (this.capabilities[id] !== false) {
            this.context.disable(id);
            this.capabilities[id] = false;
        }
        return this;
    }
}

export class StencilBuffer {
    protected context: WebGLRenderingContext;
    protected capabilities: { [key: number]: boolean };
    protected locked: boolean = false;
    protected currentStencilMask: number | null = null;
    protected currentStencilFunc: number | null = null;
    protected currentStencilRef: number | null = null;
    protected currentStencilFuncMask: number | null = null;
    protected currentStencilFail: number | null = null;
    protected currentStencilZFail: number | null = null;
    protected currentStencilZPass: number | null = null;
    protected currentStencilClear: number | null = null;

    constructor(
        context: WebGLRenderingContext,
        capabilities: { [key: number]: boolean },
    ) {
        this.context = context;
        this.capabilities = capabilities;
    }

    public setTest(stencilTest: boolean): this {
        if (stencilTest) {
            this.enable(this.context.STENCIL_TEST);
        } else {
            this.disable(this.context.STENCIL_TEST);
        }
        return this;
    }

    public setMask(stencilMask: number): this {
        if (this.currentStencilMask !== stencilMask && !this.locked) {
            this.context.stencilMask(stencilMask);
            this.currentStencilMask = stencilMask;
        }
        return this;
    }

    public setFunc(
        stencilFunc: number,
        stencilRef: number,
        stencilMask: number,
    ): this {
        if (
            this.currentStencilFunc !== stencilFunc ||
            this.currentStencilRef !== stencilRef ||
            this.currentStencilFuncMask !== stencilMask
        ) {
            this.context.stencilFunc(stencilFunc, stencilRef, stencilMask);
            this.currentStencilFunc = stencilFunc;
            this.currentStencilRef = stencilRef;
            this.currentStencilFuncMask = stencilMask;
        }
        return this;
    }

    public setOp(
        stencilFail: number,
        stencilZFail: number,
        stencilZPass: number,
    ): this {
        if (
            this.currentStencilFail !== stencilFail ||
            this.currentStencilZFail !== stencilZFail ||
            this.currentStencilZPass !== stencilZPass
        ) {
            this.context.stencilOp(stencilFail, stencilZFail, stencilZPass);
            this.currentStencilFail = stencilFail;
            this.currentStencilZFail = stencilZFail;
            this.currentStencilZPass = stencilZPass;
        }
        return this;
    }

    public setLocked(lock: boolean): this {
        this.locked = lock;
        return this;
    }

    public setClear(stencil: number): this {
        if (this.currentStencilClear !== stencil) {
            this.context.clearStencil(stencil);
            this.currentStencilClear = stencil;
        }
        return this;
    }

    public reset(): this {
        this.locked = false;
        this.currentStencilMask = null;
        this.currentStencilFunc = null;
        this.currentStencilRef = null;
        this.currentStencilFuncMask = null;
        this.currentStencilFail = null;
        this.currentStencilZFail = null;
        this.currentStencilZPass = null;
        this.currentStencilClear = null;
        return this;
    }

    protected enable(id: number): this {
        if (this.capabilities[id] !== true) {
            this.context.enable(id);
            this.capabilities[id] = true;
        }
        return this;
    }

    protected disable(id: number): this {
        if (this.capabilities[id] !== false) {
            this.context.disable(id);
            this.capabilities[id] = false;
        }
        return this;
    }
}

export class WebGLState {
    public capabilities: { [key: number]: boolean } = {};

    public buffers: {
        color: ColorBuffer | null;
        depth: DepthBuffer | null;
        stencil: StencilBuffer | null;
    } = {
        color: null,
        depth: null,
        stencil: null,
    };

    public maxVertexAttributes: number;
    public newAttributes: Uint8Array;
    public enabledAttributes: Uint8Array;
    public attributeDivisors: Uint8Array;
    public maxTextures: number;
    public version: number;
    public lineWidthAvailable: boolean = false;

    public currentScissor: Vector4 = new Vector4();
    public currentViewport: Vector4 = new Vector4();

    public emptyTextures: { [key: number]: WebGLTexture } = {};

    public currentFlipSided: boolean | null = null;
    public currentCullFace: number | null = null;

    public currentBlending: number | null = null;
    public currentPremultipledAlpha: boolean = false;

    public currentBlendEquation: number | null = null;
    public currentBlendEquationAlpha: number | null = null;

    public currentBlendSrc: number | null = null;
    public currentBlendDst: number | null = null;

    public currentBlendSrcAlpha: number | null = null;
    public currentBlendDstAlpha: number | null = null;

    public compressedTextureFormats: number[] | null = null;

    public currentProgram: WebGLProgram | null = null;

    public currentLineWidth: number | null = null;

    public currentPolygonOffsetFactor: number | null = null;
    public currentPolygonOffsetUnits: number | null = null;

    public currentTextureSlot: number | null = null;

    public currentBoundTextures: {
        [key: number]: { type: number; texture: WebGLTexture };
    } = {};

    protected context: WebGLRenderingContext;
    protected extensions: WebGLExtensions;
    protected utils: WebGLUtils;

    constructor(
        context: WebGLRenderingContext,
        extensions: WebGLExtensions,
        utils: WebGLUtils,
    ) {
        this.context = context;
        this.extensions = extensions;
        this.utils = utils;
        this.buffers.color = new ColorBuffer(context);
        this.buffers.depth = new DepthBuffer(context, this.capabilities);
        this.buffers.stencil = new StencilBuffer(context, this.capabilities);
        this.maxVertexAttributes = context.getParameter(
            context.MAX_VERTEX_ATTRIBS,
        ) as number;
        this.newAttributes = new Uint8Array(this.maxVertexAttributes);
        this.enabledAttributes = new Uint8Array(this.maxVertexAttributes);
        this.attributeDivisors = new Uint8Array(this.maxVertexAttributes);

        this.maxTextures = context.getParameter(
            context.MAX_COMBINED_TEXTURE_IMAGE_UNITS,
        );
        this.version = parseFloat(
            /^WebGL\ ([0-9])/.exec(context.getParameter(context.VERSION))[1],
        );
        this.lineWidthAvailable = this.version >= 1.0;

        this.emptyTextures[context.TEXTURE_2D] = this.createTexture(
            context.TEXTURE_2D,
            context.TEXTURE_2D,
            1,
        );
        this.emptyTextures[context.TEXTURE_CUBE_MAP] = this.createTexture(
            context.TEXTURE_CUBE_MAP,
            context.TEXTURE_CUBE_MAP_POSITIVE_X,
            6,
        );

        /**
         * initialize
         */
        this.buffers.color.setClear(0, 0, 0, 1);
        this.buffers.depth.setClear(1);
        this.buffers.stencil.setClear(0);
        this.enable(context.DEPTH_TEST);
        this.buffers.depth.setFunc(LessEqualDepth);
        this.setFlipSided(false);
        this.setCullFace(CullFaceBack);
        this.enable(context.CULL_FACE);
        this.enable(context.BLEND);
        this.setBlending(NormalBlending);
    }

    public enable(id: number): this {
        if (this.capabilities[id] !== true) {
            this.context.enable(id);
            this.capabilities[id] = true;
        }
        return this;
    }

    public disable(id: number): this {
        if (this.capabilities[id] !== false) {
            this.context.disable(id);
            this.capabilities[id] = false;
        }
        return this;
    }

    /**
     * 设置多边形的正反面（片元着色器？），这个和多边形的顶点连接顺序有关，CW为顺时针包围部分为正面，而CCW表示逆时针围绕部分为正面。
     * @param flipSided
     */
    public setFlipSided(flipSided: boolean = false): this {
        const gl: WebGLRenderingContext = this.context;
        if (this.currentFlipSided !== flipSided) {
            if (flipSided) {
                gl.frontFace(gl.CW);
            } else {
                gl.frontFace(gl.CCW);
            }
            this.currentFlipSided = flipSided;
        }
        return this;
    }

    /**
     * FRONT、BACK两个参数分别表示禁用多边形正面或者背面上的光照、阴影和颜色计算及操作，消除不必要的渲染计算。
     * 例如某对象无论如何位置变化，我们都只能看到构成其组成的多边形的某一面时，可使用该函数。
     *
     * @param cullFace
     */
    public setCullFace(cullFace: number): this {
        const gl: WebGLRenderingContext = this.context;
        if (cullFace !== CullFaceNone) {
            this.enable(gl.CULL_FACE);
            if (cullFace !== this.currentCullFace) {
                if (cullFace === CullFaceBack) {
                    gl.cullFace(gl.BACK);
                } else if (cullFace === CullFaceFront) {
                    gl.cullFace(gl.FRONT);
                } else {
                    gl.cullFace(gl.FRONT_AND_BACK);
                }
            }
        } else {
            this.disable(gl.CULL_FACE);
        }
        this.currentCullFace = cullFace;
        return this;
    }

    /**
     * 采用标准混合方式时, 将帧缓存中的颜色和输入片元的颜色合并起来, 得到新的帧缓存颜色.
     * 上面的函数用来指定其他数学运算,以计算帧缓存颜色和片元颜色的差, 它们中的最大值或最小值.
     * 指定如何混合帧缓存中的颜色和片元颜色.
     * Cs(Sr, Sg, Sb, Sa)和Cd(Dr,Dg,Db,Da)表示源颜色和目标颜色,
     * S(Source)和D(Destination)表示函数glBlendFunc()或glBlendFuncSeparate()指定的源混合因子和目标混合因子.
     *
     * GL_FUNC_ADD                      CsS + CdD
     * GL_FUNC_SUBTRACT                 CsS - CdD
     * GL_FUNC_REVERSE_SUBTRACT        CdD - CsS
     * GL_MIN                           min(CsS, CdD)
     * GL_MAX                           max(CsS, CdD)
     *
     * 将该四元组的各个分量截取到[0,1].
     *
     * 选择源混合因子和目标混合因子的方式:
     * 第一种方式是调用函数glBlendFunc(),并指定两个混合因子, 其中第一个参数为源RGBA的混合因子, 第二个参数为目标RGBA的混合因子.
     * void glBlendFunc(GLenum srcfactor, GLenum destfactor);
     *
     * 第二种方法是调用glBlendFuncSeparate()并指定4个混合因子, 这样可以用不同的方式来混合RGB和alpha值.
     * void glBlendFuncSeparate(GLenum srcRGB, GLenum destRGB, GLenum srcalpha, GLenum destalpha);
     *
     * 常量:                        RGB混合因子                        alpha混合因子
     * GL_ZERO:                    (0, 0, 0)                        0
     * GL_ONE:                    (1, 1, 1)                        1
     * GL_DST_COLOR:            (Rd, Gd, Bd)
     * GL_SRC_COLOR:            (Rs, Gs, Bs)                    A
     * GL_ONE_MINUS_DST_COLOR:    (1, 1, 1) - (Rd, Gd, Bd)
     * GL_ONE_MINUS_SRC_COLOR:    (1, 1, 1) - (Rs, Gs, Bs)        1 - A
     * GL_SRC_ALPHA:            (As,As,As,As)
     * GL_ONE_MINUS_SRC_ALPHA:    (1, 1, 1, 1) - (As,As,As,As)
     * GL_DST_ALPHA:            (Ad, Ad, Ad, Ad)
     * GL_ONE_MINUS_DST_ALPHA:    (1, 1, 1, 1) - (Ad, Ad, Ad, Ad)
     * GL_SRC_ALPHA_STATURATE:    (f, f, f, 1); f = min(As, 1 - Ad)
     *
     * @param blending
     * @param blendEquation
     * @param blendSrc
     * @param blendDst
     * @param blendEquationAlpha
     * @param blendSrcAlpha
     * @param blendDstAlpha
     * @param premultipliedAlpha
     */
    public setBlending(
        blending: number,
        blendEquation: number = 0,
        blendSrc: number = 0,
        blendDst: number = 0,
        blendEquationAlpha: number = 0,
        blendSrcAlpha: number = 0,
        blendDstAlpha: number = 0,
        premultipliedAlpha: boolean = false,
    ): this {
        const gl: WebGLRenderingContext = this.context;
        if (blending !== NoBlending) {
            this.enable(gl.BLEND);
        } else {
            this.disable(gl.BLEND);
        }
        if (blending !== CustomBlending) {
            if (
                blending !== this.currentBlending ||
                premultipliedAlpha !== this.currentPremultipledAlpha
            ) {
                switch (blending) {
                    case AdditiveBlending:
                        if (premultipliedAlpha) {
                            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                            gl.blendFuncSeparate(
                                gl.ONE,
                                gl.ONE,
                                gl.ONE,
                                gl.ONE,
                            );
                        } else {
                            gl.blendEquation(gl.FUNC_ADD);
                            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                        }
                        break;
                    case SubtractiveBlending:
                        if (premultipliedAlpha) {
                            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                            gl.blendFuncSeparate(
                                gl.ZERO,
                                gl.ZERO,
                                gl.ONE_MINUS_SRC_COLOR,
                                gl.ONE_MINUS_SRC_ALPHA,
                            );
                        } else {
                            gl.blendEquation(gl.FUNC_ADD);
                            gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
                        }
                        break;
                    case MultiplyBlending:
                        if (premultipliedAlpha) {
                            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                            gl.blendFuncSeparate(
                                gl.ZERO,
                                gl.SRC_COLOR,
                                gl.ZERO,
                                gl.SRC_ALPHA,
                            );
                        } else {
                            gl.blendEquation(gl.FUNC_ADD);
                            gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
                        }
                        break;
                    default:
                        if (premultipliedAlpha) {
                            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                            gl.blendFuncSeparate(
                                gl.ONE,
                                gl.ONE_MINUS_SRC_ALPHA,
                                gl.ONE,
                                gl.ONE_MINUS_SRC_ALPHA,
                            );
                        } else {
                            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                            gl.blendFuncSeparate(
                                gl.SRC_ALPHA,
                                gl.ONE_MINUS_SRC_ALPHA,
                                gl.ONE,
                                gl.ONE_MINUS_SRC_ALPHA,
                            );
                        }
                }
            }
            this.currentBlendEquation = 0;
            this.currentBlendSrc = 0;
            this.currentBlendDst = 0;
            this.currentBlendEquationAlpha = 0;
            this.currentBlendSrcAlpha = 0;
            this.currentBlendDstAlpha = 0;
        } else {
            blendEquationAlpha = blendEquationAlpha || blendEquation;
            blendSrcAlpha = blendSrcAlpha || blendSrc;
            blendDstAlpha = blendDstAlpha || blendDst;
            if (
                blendEquation !== this.currentBlendEquation ||
                blendEquationAlpha !== this.currentBlendEquationAlpha
            ) {
                gl.blendEquationSeparate(
                    this.utils.convert(blendEquation),
                    this.utils.convert(blendEquationAlpha),
                );
                this.currentBlendEquation = blendEquation;
                this.currentBlendEquationAlpha = blendEquationAlpha;
            }
            if (
                blendSrc !== this.currentBlendSrc ||
                blendDst !== this.currentBlendDst ||
                blendSrcAlpha !== this.currentBlendSrcAlpha ||
                blendDstAlpha !== this.currentBlendDstAlpha
            ) {
                gl.blendFuncSeparate(
                    this.utils.convert(blendSrc),
                    this.utils.convert(blendDst),
                    this.utils.convert(blendSrcAlpha),
                    this.utils.convert(blendDstAlpha),
                );
                this.currentBlendSrc = blendSrc;
                this.currentBlendDst = blendDst;
                this.currentBlendSrcAlpha = blendSrcAlpha;
                this.currentBlendDstAlpha = blendDstAlpha;
            }
        }
        this.currentBlending = blending;
        this.currentPremultipledAlpha = premultipliedAlpha;
        return this;
    }

    public setMaterial(material: Material, frontFaceCW: boolean = false): this {
        const gl: WebGLRenderingContext = this.context;
        material.side === DoubleSide
            ? this.disable(gl.CULL_FACE)
            : this.enable(gl.CULL_FACE);
        let flipSided: boolean = material.side === BackSide;
        if (frontFaceCW) flipSided = !flipSided;
        this.setFlipSided(flipSided);
        material.transparent === true
            ? this.setBlending(
                  material.blending,
                  material.blendEquation,
                  material.blendSrc,
                  material.blendDst,
                  material.blendEquationAlpha,
                  material.blendSrcAlpha,
                  material.blendDstAlpha,
                  material.premultipliedAlpha,
              )
            : this.setBlending(NoBlending);

        this.buffers.depth.setFunc(material.depthFunc);
        this.buffers.depth.setTest(material.depthTest);
        this.buffers.depth.setMask(material.depthWrite);
        this.buffers.depth.setMask(material.colorWrite);
        this.setPolygonOffset(
            material.polygonOffset,
            material.polygonOffsetFactor,
            material.polygonOffsetUnits,
        );
        return this;
    }

    public initAttributes(): this {
        for (let i: number = 0, l = this.newAttributes.length; i < l; i++) {
            this.newAttributes[i] = 0;
        }
        return this;
    }

    public enableAttribute(attribute: number): this {
        return this.enableAttributeAndDivisor(attribute);
    }

    public disableUnusedAttributes(): this {
        const gl: WebGLRenderingContext = this.context;
        for (
            let i: number = 0, l: number = this.enabledAttributes.length;
            i !== l;
            i++
        ) {
            if (this.enabledAttributes[i] !== this.newAttributes[i]) {
                gl.disableVertexAttribArray(i);
                this.enabledAttributes[i] = 0;
            }
        }
        return this;
    }

    /**
     * @param attribute
     * @param meshPerAttribute
     */
    public enableAttributeAndDivisor(
        attribute: number,
        meshPerAttribute: number = 0,
    ): this {
        this.newAttributes[attribute] = 1;
        if (this.enabledAttributes[attribute] === 0) {
            /**
             * 处于性能的考虑默认情况下CPU即使上传数据到GPU，所有顶点着色器的属性（Attribute）变量都是关闭的。
             * glEnableVertexAttribArray决定了着色器能否读取到数据，由是否启用了对应的属性决定。
             * glEnableVertexAttribArray与glVertexAttribPointer是VAO（Vertex Array Objects）的处理函数，
             * glVertexAttribPointer负责告知GPU传入数据（VBO）的类型、大小、单位等信息。
             * glEnableVertexAttribArray与glVertexAttribPointer的调用顺序并不影响，
             * 只要在设置完VBO之后和drawCall之前即可。
             * 参数attribute，代表了需要传入的attribute的location信息。
             * 所以这里可以看出enabledAttributes顾名思义就是记录着那些location的attribute被启用了。
             * 而反观newAttributes，只要是使用过某个location的attribute，那么就会被永久占用为1，
             * 即使是reset也没有用，除非调用initAttributes。
             * 这么做是有道理的，因为MAX_VERTEX_ATTRIBS决定了系统最大的attribute数目，
             * 这就意味着attribute的个数不能超过这一数目。
             * 所以，推测reset的作用只是释放内存，并禁用所有的attribute。
             * 而每次useProgram之后由于shader的改变，所以都需要调用initAttributes，
             * 在Three.js的几个Renderer中，WebGLState的用法都是在切换过program之后，
             * 调用initAttributes，然后使用enableAttribute设置新的attribute，
             * 最后通过disableUnusedAttributes纠正状态。
             */
            this.context.enableVertexAttribArray(attribute);
            this.enabledAttributes[attribute] = 1;
        }
        /**
         * ANGLE_instanced_arrays是属于 WebGL API 的一个扩展API，
         * 如果使用它们提供了相同的顶点数据或者是原始的数目和类型的话，
         * 就可以绘制相同的对象或是被多次使用的相似的对象组。
         */
        if (this.attributeDivisors[attribute] !== meshPerAttribute) {
            const extension: any = this.extensions.get(
                "ANGLE_instanced_arrays",
            );
            extension.vertexAttribDivisorANGLE(attribute, meshPerAttribute);
            this.attributeDivisors[attribute] = meshPerAttribute;
        }
        return this;
    }

    public getCompressedTextureFormats(): number[] {
        if (this.compressedTextureFormats === null) {
            this.compressedTextureFormats = [];
            if (
                this.extensions.get("WEBGL_compressed_texture_pvrtc") ||
                this.extensions.get("WEBGL_compressed_texture_s3tc") ||
                this.extensions.get("WEBGL_compressed_texture_etc1") ||
                this.extensions.get("WEBGL_compressed_texture_astc")
            ) {
                const formats: number[] = this.context.getParameter(
                    this.context.COMPRESSED_TEXTURE_FORMATS,
                );
                for (let i: number = 0; i < formats.length; i++) {
                    this.compressedTextureFormats.push(formats[i]);
                }
            }
        }
        return this.compressedTextureFormats;
    }

    public useProgram(program: WebGLProgram): boolean {
        if (this.currentProgram !== program) {
            this.context.useProgram(program);
            this.currentProgram = program;
            return true;
        }
        return false;
    }

    public setLineWidth(width: number): this {
        if (width !== this.currentLineWidth) {
            if (this.lineWidthAvailable) this.context.lineWidth(width);
            this.currentLineWidth = width;
        }
        return this;
    }

    /**
     * 在OpenGL中，如果想绘制一个多边形同时绘制其边界，可是先使用多边形模式GL_FILL绘制物体，
     * 然后使用多边形模式GL_LINE和不同的颜色再次绘制这个多边形。
     * 但是由于直线和多边形的光栅化方式不同，导致位于同一位置的多边形和直线的深度值并不相同，
     * 进而导致直线有时在多边形的里面，有时在多边形的外面，这种现象就是"Stiching"。
     * 而Z-fighting主要是指当两个面共面时，二者的深度值一样，深度缓冲就不能清楚的将它们两者分离开来，
     * 位于后面的图元上的一些像素就会被渲染到前面的图元上，最终导致图象在帧与帧之间产生微弱的闪光。
     * 解决这两个问题的方法就是使用Polygon Offset，当然你也可以使用模板测试，但Polygon Offset的速度会比模板缓存快。
     * 启用了Polygon Offset，就表示在执行深度测试前多边形的深度值被稍微增加了一点点，
     * 这需要用glPolygonOffset来指定。glPolygonOffset需要2个参数：GLfloat factor 和GLfloat units。
     * 每一个Fragment的深度值都会增加如下所示的偏移量：offset = (m * factor) + (r * units)
     * m是多边形的深度的斜率（在光栅化阶段计算得出）中的最大值。
     * 这句话难以理解，你只需知道，一个多边形越是与近裁剪面（near clipping plan）平行，m就越接近0。
     * r是能产生在窗口坐标系的深度值中可分辨的差异的最小值，r是由具体实现OpenGL的平台指定的一个常量。
     * 一个大于0的offset 会把模型推到离你（摄像机）更远一点的位置，相应地，一个小于0的offset 会把模型拉近。
     * 如果想要非常好地使用Polygon Offset，你需要做一些数学上的研究。
     * 不过一般而言，只需把1.0和0.0这样简单的值赋给glPolygonOffset即可满足需要。
     *
     * @param polygonOffset
     * @param factor
     * @param units
     */
    public setPolygonOffset(
        polygonOffset: boolean,
        factor: number,
        units: number,
    ): this {
        const gl: WebGLRenderingContext = this.context;
        if (polygonOffset) {
            this.enable(gl.POLYGON_OFFSET_FILL);
            if (
                this.currentPolygonOffsetFactor !== factor ||
                this.currentPolygonOffsetUnits !== units
            ) {
                gl.polygonOffset(factor, units);
                this.currentPolygonOffsetFactor = factor;
                this.currentPolygonOffsetUnits = units;
            }
        } else {
            this.disable(gl.POLYGON_OFFSET_FILL);
        }
        return this;
    }

    public setScissorTest(scissorTest: boolean): this {
        if (scissorTest) {
            this.enable(this.context.SCISSOR_TEST);
        } else {
            this.disable(this.context.SCISSOR_TEST);
        }
        return this;
    }

    public activeTexture(slot?: number): this {
        const gl: WebGLRenderingContext = this.context;
        if (slot === undefined) slot = gl.TEXTURE0 + this.maxTextures - 1;
        /**
         * 最后一个贴图空间用来做杂活...
         */
        if (this.currentTextureSlot !== slot) {
            gl.activeTexture(slot);
            this.currentTextureSlot = slot;
        }
        return this;
    }

    public bindTexture(type: number, texture: WebGLTexture): this {
        if (this.currentTextureSlot === null) {
            this.activeTexture();
        }
        let boundTexture = this.currentBoundTextures[this.currentTextureSlot];
        if (boundTexture === undefined) {
            boundTexture = { type: undefined, texture: undefined };
            this.currentBoundTextures[this.currentTextureSlot] = boundTexture;
        }
        if (boundTexture.type !== type || boundTexture.texture !== texture) {
            this.context.bindTexture(type, texture || this.emptyTextures[type]);
            boundTexture.type = type;
            boundTexture.texture = texture;
        }
        return this;
    }

    public compressedTexImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        data: TypedArray | null,
    ): this {
        /**
         * 所支持压缩纹理格式数量可以查询GL_NUM_COMPRESSED_TEXTURE_FORMATS值来获取。
         * 所支持的压缩格式列表可以查询GL_COMPRESSED_TEXTURE_FORMATS值来获取。
         * getCompressedTextureFormats函数也是相关信息的查询工具
         */
        try {
            this.context.compressedTexImage2D(
                target,
                level,
                internalformat,
                width,
                height,
                border,
                data,
            );
        } catch (error) {
            console.error(`THREE.WebGLState: ${error}`);
        }
        return this;
    }

    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        width: number,
        height: number,
        border: number,
        format: number,
        type: number,
        pixels: TypedArray | null,
    ): this;
    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        format: number,
        type: number,
        pixels:
            | ImageBitmap
            | ImageData
            | HTMLVideoElement
            | HTMLImageElement
            | HTMLCanvasElement,
    ): this;
    public texImage2D(
        target: number,
        level: number,
        internalformat: number,
        a: number,
        b: number,
        c: any,
        format?: number,
        type?: number,
        pixels?: TypedArray | null,
    ): this {
        /**
         * 2D贴图，这里有重载是因为DOM的特殊关系，ImageBitmap | ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement这些属性都有width，height属性包含在内，
         * 而border值必须为0 ㄟ( ▔, ▔ )ㄏ
         * 而且实际上internalformat与format的值必须一致 ㄟ( ▔, ▔ )ㄏ
         * target的值必须为TEXTURE_2D与TEXTURE_CUBE_MAP_(NEGATIVE|POSITIVE)_(X|Y|Z)—之一
         *
         * Mipmap是一个功能强大的纹理技术，它可以提高渲染的性能以及提升场景的视觉质量。它可以用来解决使用一般的纹理贴图会出现的两个常见的问题：
         *  1. 闪烁，当屏幕上被渲染物体的表面与它所应用的纹理图像相比显得非常小时，就会出现闪烁。尤其当相机和物体在移动的时候，这种负面效果更容易被看到。
         *  2. 性能问题。加载了大量的纹理数据之后，还要对其进行过滤处理（缩小），在屏幕上显示的只是一小部分。纹理越大，所造成的性能影响就越大。
         * Mipmap就可以解决上面那两个问题。当加载纹理的时候，不单单是加载一个纹理，而是加载一系列从大到小的纹理当mipmapped纹理状态中。
         * 然后OpenGl会根据给定的几何图像的大小选择最合适的纹理。Mipmap是把纹理按照2的倍数进行缩放，直到图像为1x1的大小，然后把这些图都存储起来，当要使用的就选择一个合适的图像。
         * 这会增加一些额外的内存。在正方形的纹理贴图中使用mipmap技术，大概要比原先多出三分之一的内存空间。
         *
         * Mipmap的纹理过滤模式如下表：
         * 常量	描述
         * GL_NEAREST	在mip基层上使用最邻近过滤
         * GL_LINEAR	在mip基层上使用线性过滤
         * GL_NEAREST_MIPMAP_NEAREST	选择最邻近的mip层，并使用最邻近过滤
         * GL_NEAREST_MIPMAP_LINEAR	在mip层之间使用线性插值和最邻近过滤
         * GL_LINEAR_MIPMAP_NEAREST	选择最邻近的mip层，使用线性过滤
         * GL_LINEAR_MIPMAP_LINEAR	在mip层之间使用线性插值和使用线性过滤，又称三线性mipmap
         * 如果纹理过滤选择为GL_NEAREST或GL_LINEAR模式，那么只有基层的纹理会被加载，其他的纹理将会被忽略。
         * 我们必须指定其中一个mipmap过滤器，这样才能使用所有已加载的纹理。
         * 这个mipmap过滤器的常量是GL_[FILTER]_MIPMAP_[SELECTOR[的形式。
         * 其中FLILTER指定了过滤模式，SELECTOR指定了如何选择mipmap层。例如GL_NEAREST_MIPMAP_LINEAR模式，
         * 它的SELECTOR是GL_LINEAR，它会在两个最邻近的mip层中执行线性插值，然后得出的结果又由被选择的过滤器GL_NEAREST进行过滤。
         *
         * 其中GL_NEAREST_MIPMAP_NEAAREST具有很好的性能，也能够解决闪烁的问题，但在视觉效果上会比较差。
         * 其中GL_LINEAR_MIPMAP_NEAREST常用于游戏加速，使用了质量较高的线性过滤，和快速的选择的方式(最邻近方式）。
         * 使用最邻近的方式作为mipmap选择器的效果依然不能令人满意。从某一个角度去看，常常可以看到物体表面从一个mip层到另一个mip层的转变。
         * GL_LINEAR_MIPMAP_LINEAR和GL_NEAREST_MIPMAP_LINEAR过滤器在mip层之间执行一些额外的线性插值，以消除不同层之间的变换痕迹，但也需要一些额外的性能开销。
         * GL_LINEAR_MIPMAP_LINEAR具有最高的精度。
         *
         * 所以level参数就是用来指定这是低级级缩略图的，0代表基本，log_{2}(GL_MAX_TEXTURE_SIZE)为最大允许值
         */
        try {
            this.context.texImage2D(
                target,
                level,
                internalformat,
                a,
                b,
                c,
                format,
                type,
                pixels,
            );
        } catch (error) {
            console.error(`THREE.WebGLState: ${error}`);
        }
        return this;
    }

    public scissor(scissor: Vector4): this {
        /**
         * 对屏幕进行剪裁，x,y为起点，z,w分别表示width和height
         * 剪裁功能
         */
        if (this.currentScissor.equals(scissor) === false) {
            this.context.scissor(scissor.x, scissor.y, scissor.z, scissor.w);
            this.currentScissor.copy(scissor);
        }
        return this;
    }

    public viewport(viewport: Vector4): this {
        /**
         * 打开窗口的整个像素矩形，x,y为起点，z,w分别表示width和height
         * 缩放功能
         */
        if (this.currentViewport.equals(viewport) === false) {
            this.context.viewport(
                viewport.x,
                viewport.y,
                viewport.z,
                viewport.w,
            );
            this.currentViewport.copy(viewport);
        }
        return this;
    }

    public reset(): this {
        for (let i: number = 0; i < this.enabledAttributes.length; i++) {
            if (this.enabledAttributes[i] === 1) {
                this.context.disableVertexAttribArray(i);
                this.enabledAttributes[i] = 0;
            }
        }
        this.capabilities = {};
        this.compressedTextureFormats = null;
        this.currentTextureSlot = null;
        this.currentBoundTextures = {};
        this.currentProgram = null;
        this.currentBlending = null;
        this.currentFlipSided = null;
        this.currentCullFace = null;
        this.buffers.color.reset();
        this.buffers.depth.reset();
        this.buffers.stencil.reset();
        return this;
    }

    protected createTexture(
        type: number,
        target: number,
        count: number,
    ): WebGLTexture {
        const gl: WebGLRenderingContext = this.context;
        /**
         * 4 is required to match default unpack alignment of 4.
         * @type {Uint8Array}
         */
        const data: Uint8Array = new Uint8Array(4);
        const texture: WebGLTexture = gl.createTexture();
        gl.bindTexture(type, texture);
        gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(type, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        for (let i: number = 0; i < count; i++) {
            gl.texImage2D(
                target + i,
                0,
                gl.RGBA,
                1,
                1,
                0,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                data,
            );
        }
        return texture;
    }
}
