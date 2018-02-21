import {Camera, IFrustumView} from "./Camera";

export class OrthographicCamera extends Camera {
    public readonly type: string = "OrthographicCamera";


    protected _left: number = 0;
    protected _right: number = 0;
    protected _top: number = 0;
    protected _bottom: number = 0;
    protected _zoom: number = 1;
    protected _near: number = 0.1;
    protected _far: number = 2000;
    protected _view: IFrustumView = null;

    constructor(left: number = 0, right: number = 0, top: number = 0, bottom: number = 0, near: number = 0.1, far: number = 2000) {
        super();

        this._left = left;
        this._right = right;
        this._top = top;
        this._bottom = bottom;

        this._near = near;
        this._far = far;

        this.updateProjectionMatrix();
    }

    get zoom(): number {
        return this._zoom;
    }

    set zoom(_zoom: number) {
        this._zoom = _zoom;
        this.updateProjectionMatrix();
    }

    get near(): number {
        return this._near;
    }

    set near(_near: number) {
        this._near = _near;
        this.updateProjectionMatrix();
    }

    get far(): number {
        return this._far;
    }

    set far(_far: number) {
        this._far = _far;
        this.updateProjectionMatrix();
    }

    get left(): number {
        return this._left;
    }

    set left(_left: number) {
        this._left = _left;
        this.updateProjectionMatrix();
    }

    get right(): number {
        return this._right;
    }

    set right(_right: number) {
        this._right = _right;
        this.updateProjectionMatrix();
    }

    get top(): number {
        return this._top;
    }

    set top(_top: number) {
        this._top = _top;
        this.updateProjectionMatrix();
    }

    get bottom(): number {
        return this._bottom;
    }

    set bottom(_bottom: number) {
        this._bottom = _bottom;
        this.updateProjectionMatrix();
    }

    get view(): IFrustumView {
        return this._view;
    }

    public setViewOffset(fullWidth: number, fullHeight: number, x: number, y: number, width: number, height: number): this {
        this._view = {
            enabled: true,
            fullWidth: fullWidth,
            fullHeight: fullHeight,
            offsetX: x,
            offsetY: y,
            width: width,
            height: height
        };
        return this.updateProjectionMatrix();
    }

    public clearViewOffset(): this {
        if (this.view !== null) {
            this.view.enabled = false;
        }
        return this.updateProjectionMatrix();
    }

    public updateProjectionMatrix(): this {
        const dx = (this.right - this.left) / (2 * this.zoom);
        const dy = (this.top - this.bottom) / (2 * this.zoom);
        const cx = (this.right + this.left) / 2;
        const cy = (this.top + this.bottom) / 2;

        let left = cx - dx;
        let right = cx + dx;
        let top = cy + dy;
        let bottom = cy - dy;

        if (this.view !== null && this.view.enabled) {
            const zoomW = this.zoom / (this.view.width / this.view.fullWidth);
            const zoomH = this.zoom / (this.view.height / this.view.fullHeight);
            const scaleW = (this.right - this.left) / this._view.width;
            const scaleH = (this.top - this.bottom) / this._view.height;
            left += scaleW * (this.view.offsetX / zoomW);
            right = left + scaleW * ( this.view.width / zoomW);
            top -= scaleH * (this.view.offsetY / zoomH);
            bottom = top - scaleH * (this.view.height / zoomH);
        }

        this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far);
        return this;
    }

    public copy(source: OrthographicCamera): this {
        super.copy(source);
        this._top = source.top;
        this._bottom = source.bottom;
        this._left = source.left;
        this._right = source.right;
        this._zoom = source.zoom;

        this._near = source.near;
        this._far = source.far;

        this._view = source.view === null ? null : {...source.view};

        return this.updateProjectionMatrix();
    }
}