import { Camera } from "./Camera";
export class OrthographicCamera extends Camera {
    constructor(left = 0, right = 0, top = 0, bottom = 0, near = 0.1, far = 2000) {
        super();
        this.type = "OrthographicCamera";
        this._left = 0;
        this._right = 0;
        this._top = 0;
        this._bottom = 0;
        this._zoom = 1;
        this._near = 0.1;
        this._far = 2000;
        this._view = null;
        this._left = left;
        this._right = right;
        this._top = top;
        this._bottom = bottom;
        this._near = near;
        this._far = far;
        this.updateProjectionMatrix();
    }
    get zoom() {
        return this._zoom;
    }
    set zoom(_zoom) {
        this._zoom = _zoom;
        this.updateProjectionMatrix();
    }
    get near() {
        return this._near;
    }
    set near(_near) {
        this._near = _near;
        this.updateProjectionMatrix();
    }
    get far() {
        return this._far;
    }
    set far(_far) {
        this._far = _far;
        this.updateProjectionMatrix();
    }
    get left() {
        return this._left;
    }
    set left(_left) {
        this._left = _left;
        this.updateProjectionMatrix();
    }
    get right() {
        return this._right;
    }
    set right(_right) {
        this._right = _right;
        this.updateProjectionMatrix();
    }
    get top() {
        return this._top;
    }
    set top(_top) {
        this._top = _top;
        this.updateProjectionMatrix();
    }
    get bottom() {
        return this._bottom;
    }
    set bottom(_bottom) {
        this._bottom = _bottom;
        this.updateProjectionMatrix();
    }
    get view() {
        return this._view;
    }
    setViewOffset(fullWidth, fullHeight, x, y, width, height) {
        this._view = {
            enabled: true,
            fullHeight: fullHeight,
            fullWidth: fullWidth,
            height: height,
            offsetX: x,
            offsetY: y,
            width: width,
        };
        return this.updateProjectionMatrix();
    }
    clearViewOffset() {
        if (this.view !== null) {
            this.view.enabled = false;
        }
        return this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
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
            right = left + scaleW * (this.view.width / zoomW);
            top -= scaleH * (this.view.offsetY / zoomH);
            bottom = top - scaleH * (this.view.height / zoomH);
        }
        this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far);
        return this;
    }
    copy(source) {
        super.copy(source);
        this._top = source.top;
        this._bottom = source.bottom;
        this._left = source.left;
        this._right = source.right;
        this._zoom = source.zoom;
        this._near = source.near;
        this._far = source.far;
        this._view = source.view === null ? null : Object.assign({}, source.view);
        return this.updateProjectionMatrix();
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
