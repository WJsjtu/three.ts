const lut = [];
for (let i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? "0" : "") + i.toString(16).toUpperCase();
}
/**
 * Finished
 */
export class MathUtil {
    /**
     * 产生一个UUID的算法，主要是遵循UUID的规范来产生字符串
     * http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
     * @returns {string}
     */
    static generateUUID() {
        const d0 = (Math.random() * 0xffffffff) | 0;
        const d1 = (Math.random() * 0xffffffff) | 0;
        const d2 = (Math.random() * 0xffffffff) | 0;
        const d3 = (Math.random() * 0xffffffff) | 0;
        return (lut[d0 & 0xff] +
            lut[(d0 >> 8) & 0xff] +
            lut[(d0 >> 16) & 0xff] +
            lut[(d0 >> 24) & 0xff] +
            "-" +
            lut[d1 & 0xff] +
            lut[(d1 >> 8) & 0xff] +
            "-" +
            lut[((d1 >> 16) & 0x0f) | 0x40] +
            lut[(d1 >> 24) & 0xff] +
            "-" +
            lut[(d2 & 0x3f) | 0x80] +
            lut[(d2 >> 8) & 0xff] +
            "-" +
            lut[(d2 >> 16) & 0xff] +
            lut[(d2 >> 24) & 0xff] +
            lut[d3 & 0xff] +
            lut[(d3 >> 8) & 0xff] +
            lut[(d3 >> 16) & 0xff] +
            lut[(d3 >> 24) & 0xff]);
    }
    /**
     * 在一定范围内截断value的数值
     * @param value
     * @param min
     * @param max
     * @returns {number}
     */
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    /**
     * 计算欧几里得取模算法
     * 详见 https://en.wikipedia.org/wiki/Modulo_operation
     * 这里还需要+m的原因是考虑负数取模的原因
     * @param n
     * @param m
     * @returns {number}
     */
    static euclideanModulo(n, m) {
        return (n % m + m) % m;
    }
    /**
     * 将x在a范围内的值映射到b范围中
     * @param x
     * @param a1
     * @param a2
     * @param b1
     * @param b2
     * @returns {number}
     */
    static mapLinear(x, a1, a2, b1, b2) {
        return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
    }
    /**
     * 线性插值
     * https://en.wikipedia.org/wiki/Linear_interpolation
     * @param x
     * @param y
     * @param t
     * @returns {number}
     */
    static lerp(x, y, t) {
        return (1 - t) * x + t * y;
    }
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
     */
    static smoothstep(x, min, max) {
        if (x <= min)
            return 0;
        if (x >= max)
            return 1;
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x);
    }
    /**
     * 类似与上面的函数，计算量更大
     * @param x
     * @param min
     * @param max
     * @returns {number}
     */
    static smootherstep(x, min, max) {
        if (x <= min)
            return 0;
        if (x >= max)
            return 1;
        x = (x - min) / (max - min);
        return x * x * x * (x * (x * 6 - 15) + 10);
    }
    /**
     * 随机整数
     * @param low
     * @param high
     * @returns {number}
     */
    static randInt(low, high) {
        return low + Math.floor(Math.random() * (high - low + 1));
    }
    /**
     * 随机浮点数
     * @param low
     * @param high
     * @returns {number}
     */
    static randFloat(low, high) {
        return low + Math.random() * (high - low);
    }
    /**
     * [-range/2, range/2]的随机浮点数
     * @param range
     * @returns {number}
     */
    static randFloatSpread(range) {
        return range * (0.5 - Math.random());
    }
    /***************************** 下面的太简单了不说明了 *******************************/
    static degToRad(degrees) {
        return degrees * MathUtil.DEG2RAD;
    }
    static radToDeg(radians) {
        return radians * MathUtil.RAD2DEG;
    }
    /**
     * 这里用到了二进制的技巧
     * @param value
     * @returns {boolean}
     */
    static isPowerOfTwo(value) {
        return (value & (value - 1)) === 0 && value !== 0;
    }
    static ceilPowerOfTwo(value) {
        return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
    }
    static floorPowerOfTwo(value) {
        return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
    }
}
/**
 * 弧度/角度
 * @type {number}
 */
MathUtil.DEG2RAD = Math.PI / 180;
/**
 * 角度/弧度
 * @type {number}
 */
MathUtil.RAD2DEG = 180 / Math.PI;
