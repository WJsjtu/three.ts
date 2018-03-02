import { MathUtil } from "../math/Math";
import { Camera } from "./Camera";
export class PerspectiveCamera extends Camera {
    constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {
        super();
        this.type = "PerspectiveCamera";
        this.focus = 10;
        this._fov = 50;
        this._zoom = 1;
        this._near = 0.1;
        this._far = 2000;
        this._aspect = 1;
        this._view = null;
        /**
         * width of the film (default in millimeters)
         * @type {number}
         */
        this._filmGauge = 35;
        /**
         * horizontal film offset (same unit as gauge)
         * @type {number}
         */
        this._filmOffset = 0;
        this._fov = fov;
        this._aspect = aspect;
        this._near = near;
        this._far = far;
        this.updateProjectionMatrix();
    }
    get fov() {
        return this._fov;
    }
    set fov(_fov) {
        this._fov = _fov;
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
    get aspect() {
        return this._aspect;
    }
    set aspect(_aspect) {
        this._aspect = _aspect;
        this.updateProjectionMatrix();
    }
    get view() {
        return this._view;
    }
    get filmGauge() {
        return this._filmGauge;
    }
    set filmGauge(_filmGauge) {
        this._filmGauge = _filmGauge;
        this.updateProjectionMatrix();
    }
    get filmOffset() {
        return this._filmOffset;
    }
    set filmOffset(_filmOffset) {
        this._filmOffset = _filmOffset;
        this.updateProjectionMatrix();
    }
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
     */
    setFocalLength(focalLength) {
        const vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;
        this._fov = MathUtil.RAD2DEG * 2 * Math.atan(vExtentSlope);
        return this.updateProjectionMatrix();
    }
    getFocalLength() {
        const vExtentSlope = Math.tan(MathUtil.DEG2RAD * 0.5 * this.fov);
        return 0.5 * this.getFilmHeight() / vExtentSlope;
    }
    getEffectiveFOV() {
        return MathUtil.RAD2DEG * 2 * Math.atan(Math.tan(MathUtil.DEG2RAD * 0.5 * this.fov) / this.zoom);
    }
    /**
     * film not completely covered in portrait format (aspect < 1)
     * @returns {number}
     */
    getFilmWidth() {
        return this.filmGauge * Math.min(this.aspect, 1);
    }
    /**
     * film not completely covered in landscape format (aspect > 1)
     * @returns {number}
     */
    getFilmHeight() {
        return this.filmGauge / Math.max(this.aspect, 1);
    }
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
     */
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
        const near = this.near;
        let top = near * Math.tan(MathUtil.DEG2RAD * 0.5 * this.fov) / this.zoom;
        let height = 2 * top;
        let width = this.aspect * height;
        let left = -0.5 * width;
        const view = this.view;
        if (this.view !== null && this.view.enabled) {
            const fullWidth = view.fullWidth, fullHeight = view.fullHeight;
            left += view.offsetX * width / fullWidth;
            top -= view.offsetY * height / fullHeight;
            width *= view.width / fullWidth;
            height *= view.height / fullHeight;
        }
        const skew = this.filmOffset;
        if (skew !== 0)
            left += near * skew / this.getFilmWidth();
        this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);
        return this;
    }
    copy(source) {
        super.copy(source);
        this._fov = source.fov;
        this._zoom = source.zoom;
        this._near = source.near;
        this._far = source.far;
        this.focus = source.focus;
        this._aspect = source.aspect;
        this._view = source.view === null ? null : Object.assign({}, source.view);
        this._filmGauge = source.filmGauge;
        this._filmOffset = source.filmOffset;
        return this.updateProjectionMatrix();
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
