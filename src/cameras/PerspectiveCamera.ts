import { MathUtil } from "../math/Math";
import { Camera, IFrustumView } from "./Camera";

export class PerspectiveCamera extends Camera {
    public readonly type: string = "PerspectiveCamera";
    public focus: number = 10;

    protected _fov: number = 50;
    protected _zoom: number = 1;
    protected _near: number = 0.1;
    protected _far: number = 2000;
    protected _aspect: number = 1;
    protected _view: IFrustumView | null = null;

    /**
     * width of the film (default in millimeters)
     * @type {number}
     */
    protected _filmGauge: number = 35;

    /**
     * horizontal film offset (same unit as gauge)
     * @type {number}
     */
    protected _filmOffset: number = 0;

    get fov(): number {
        return this._fov;
    }

    set fov(_fov: number) {
        this._fov = _fov;
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

    get aspect(): number {
        return this._aspect;
    }

    set aspect(_aspect: number) {
        this._aspect = _aspect;
        this.updateProjectionMatrix();
    }

    get view(): IFrustumView | null {
        return this._view;
    }

    get filmGauge(): number {
        return this._filmGauge;
    }

    set filmGauge(_filmGauge: number) {
        this._filmGauge = _filmGauge;
        this.updateProjectionMatrix();
    }

    get filmOffset(): number {
        return this._filmOffset;
    }

    set filmOffset(_filmOffset: number) {
        this._filmOffset = _filmOffset;
        this.updateProjectionMatrix();
    }

    constructor(
        fov: number = 50,
        aspect: number = 1,
        near: number = 0.1,
        far: number = 2000,
    ) {
        super();
        this._fov = fov;
        this._aspect = aspect;
        this._near = near;
        this._far = far;
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
    public setFocalLength(focalLength: number): this {
        const vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;
        this._fov = MathUtil.RAD2DEG * 2 * Math.atan(vExtentSlope);
        return this.updateProjectionMatrix();
    }

    public getFocalLength(): number {
        const vExtentSlope = Math.tan(MathUtil.DEG2RAD * 0.5 * this.fov);
        return 0.5 * this.getFilmHeight() / vExtentSlope;
    }

    public getEffectiveFOV(): number {
        return (
            MathUtil.RAD2DEG *
            2 *
            Math.atan(Math.tan(MathUtil.DEG2RAD * 0.5 * this.fov) / this.zoom)
        );
    }

    /**
     * film not completely covered in portrait format (aspect < 1)
     * @returns {number}
     */
    public getFilmWidth(): number {
        return this.filmGauge * Math.min(this.aspect, 1);
    }

    /**
     * film not completely covered in landscape format (aspect > 1)
     * @returns {number}
     */
    public getFilmHeight(): number {
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
    public setViewOffset(
        fullWidth: number,
        fullHeight: number,
        x: number,
        y: number,
        width: number,
        height: number,
    ): this {
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

    public clearViewOffset(): this {
        if (this.view !== null) {
            this.view.enabled = false;
        }
        return this.updateProjectionMatrix();
    }

    public updateProjectionMatrix(): this {
        const near: number = this.near;
        let top: number =
            near * Math.tan(MathUtil.DEG2RAD * 0.5 * this.fov) / this.zoom;
        let height: number = 2 * top;
        let width: number = this.aspect * height;
        let left: number = -0.5 * width;
        const view: IFrustumView = this.view;
        if (this.view !== null && this.view.enabled) {
            const fullWidth: number = view.fullWidth,
                fullHeight: number = view.fullHeight;
            left += view.offsetX * width / fullWidth;
            top -= view.offsetY * height / fullHeight;
            width *= view.width / fullWidth;
            height *= view.height / fullHeight;
        }
        const skew: number = this.filmOffset;
        if (skew !== 0) left += near * skew / this.getFilmWidth();
        this.projectionMatrix.makePerspective(
            left,
            left + width,
            top,
            top - height,
            near,
            this.far,
        );
        return this;
    }

    public copy(source: PerspectiveCamera): this {
        super.copy(source);
        this._fov = source.fov;
        this._zoom = source.zoom;

        this._near = source.near;
        this._far = source.far;
        this.focus = source.focus;

        this._aspect = source.aspect;
        this._view = source.view === null ? null : { ...source.view };

        this._filmGauge = source.filmGauge;
        this._filmOffset = source.filmOffset;
        return this.updateProjectionMatrix();
    }

    public clone(): PerspectiveCamera {
        return new (this.constructor as new () => PerspectiveCamera)().copy(
            this,
        );
    }
}
