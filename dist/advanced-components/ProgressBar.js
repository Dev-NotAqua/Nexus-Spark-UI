import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import styles from './ProgressBar.module.css';
/**
 * ProgressBar - Advanced visual progress representation component
 *
 * Features:
 * - Multiple types (line, circle, dashboard)
 * - Different status states (normal, success, error, warning)
 * - Customizable colors and gradients
 * - Progress text with custom formatting
 * - Animation support
 * - Multiple sizes
 * - Accessible with ARIA attributes
 */
export var ProgressBar = function (_a) {
    var _b;
    var percent = _a.percent, _c = _a.status, status = _c === void 0 ? 'normal' : _c, _d = _a.size, size = _d === void 0 ? 'md' : _d, strokeWidth = _a.strokeWidth, _e = _a.showInfo, showInfo = _e === void 0 ? true : _e, format = _a.format, strokeColor = _a.strokeColor, trailColor = _a.trailColor, _f = _a.type, type = _f === void 0 ? 'line' : _f, _g = _a.width, width = _g === void 0 ? 120 : _g, _h = _a.gapDegree, gapDegree = _h === void 0 ? 75 : _h, _j = _a.gapPosition, gapPosition = _j === void 0 ? 'bottom' : _j, _k = _a.animated, animated = _k === void 0 ? false : _k, className = _a.className;
    var normalizedPercent = Math.min(100, Math.max(0, percent));
    var getStrokeWidth = function () {
        if (strokeWidth)
            return strokeWidth;
        switch (size) {
            case 'sm':
                return type === 'line' ? 4 : 6;
            case 'lg':
                return type === 'line' ? 12 : 8;
            default:
                return type === 'line' ? 8 : 6;
        }
    };
    var getStrokeColor = function () {
        if (strokeColor) {
            return typeof strokeColor === 'string' ? strokeColor : undefined;
        }
        switch (status) {
            case 'success':
                return '#22c55e';
            case 'error':
                return '#ef4444';
            case 'warning':
                return '#f59e0b';
            default:
                return '#3b82f6';
        }
    };
    var formatPercent = function (value) {
        if (format)
            return format(value);
        return "".concat(Math.round(value), "%");
    };
    var renderLineProgress = function () {
        var _a;
        var strokeWidthValue = getStrokeWidth();
        var color = getStrokeColor();
        return (_jsxs("div", { className: clsx(styles.lineContainer, className), children: [_jsx("div", { className: clsx(styles.lineOuter, styles[size]), children: _jsx("div", { className: clsx(styles.lineInner, styles[status]), style: {
                            height: strokeWidthValue,
                            backgroundColor: trailColor
                        }, children: _jsx("div", { className: clsx(styles.lineBg, styles[status], (_a = {}, _a[styles.animated] = animated, _a)), style: {
                                width: "".concat(normalizedPercent, "%"),
                                backgroundColor: color,
                                background: typeof strokeColor === 'object'
                                    ? "linear-gradient(to right, ".concat(strokeColor.from, ", ").concat(strokeColor.to, ")")
                                    : undefined
                            } }) }) }), showInfo && (_jsx("div", { className: clsx(styles.progressText, styles[size]), children: formatPercent(normalizedPercent) }))] }));
    };
    var renderCircleProgress = function () {
        var _a;
        var strokeWidthValue = getStrokeWidth();
        var color = getStrokeColor();
        var radius = (width - strokeWidthValue) / 2;
        var circumference = 2 * Math.PI * radius;
        var strokeDasharray = circumference;
        var strokeDashoffset = circumference - (normalizedPercent / 100) * circumference;
        return (_jsxs("div", { className: clsx(styles.circleContainer, className), style: { width: width, height: width }, children: [_jsxs("svg", { width: width, height: width, className: styles.circleSvg, role: "img", "aria-labelledby": "progress-title", children: [_jsxs("title", { id: "progress-title", children: ["Progress: ", formatPercent(normalizedPercent)] }), _jsx("circle", { cx: width / 2, cy: width / 2, r: radius, strokeWidth: strokeWidthValue, stroke: trailColor || '#f3f4f6', fill: "transparent", className: styles.circleTrail }), _jsx("circle", { cx: width / 2, cy: width / 2, r: radius, strokeWidth: strokeWidthValue, stroke: color, fill: "transparent", strokeDasharray: strokeDasharray, strokeDashoffset: strokeDashoffset, strokeLinecap: "round", className: clsx(styles.circlePath, styles[status], (_a = {}, _a[styles.animated] = animated, _a)), transform: "rotate(-90 ".concat(width / 2, " ").concat(width / 2, ")") })] }), showInfo && (_jsx("div", { className: clsx(styles.circleText, styles[size]), children: formatPercent(normalizedPercent) }))] }));
    };
    var renderDashboardProgress = function () {
        var _a;
        var strokeWidthValue = getStrokeWidth();
        var color = getStrokeColor();
        var radius = (width - strokeWidthValue) / 2;
        var gapRad = (gapDegree * Math.PI) / 180;
        var dashboardCircumference = 2 * Math.PI * radius - gapRad * radius;
        var strokeDasharray = dashboardCircumference;
        var strokeDashoffset = dashboardCircumference - (normalizedPercent / 100) * dashboardCircumference;
        var getRotation = function () {
            switch (gapPosition) {
                case 'left':
                    return 'rotate(135deg)';
                case 'right':
                    return 'rotate(-45deg)';
                case 'top':
                    return 'rotate(225deg)';
                default: // bottom
                    return 'rotate(45deg)';
            }
        };
        return (_jsxs("div", { className: clsx(styles.circleContainer, className), style: { width: width, height: width }, children: [_jsxs("svg", { width: width, height: width, className: styles.circleSvg, role: "img", "aria-labelledby": "progress-title", children: [_jsxs("title", { id: "progress-title", children: ["Progress: ", formatPercent(normalizedPercent)] }), _jsx("circle", { cx: width / 2, cy: width / 2, r: radius, strokeWidth: strokeWidthValue, stroke: trailColor || '#f3f4f6', fill: "transparent", strokeDasharray: strokeDasharray, strokeDashoffset: 0, className: styles.circleTrail, style: { transform: getRotation(), transformOrigin: 'center' } }), _jsx("circle", { cx: width / 2, cy: width / 2, r: radius, strokeWidth: strokeWidthValue, stroke: color, fill: "transparent", strokeDasharray: strokeDasharray, strokeDashoffset: strokeDashoffset, strokeLinecap: "round", className: clsx(styles.circlePath, styles[status], (_a = {}, _a[styles.animated] = animated, _a)), style: { transform: getRotation(), transformOrigin: 'center' } })] }), showInfo && (_jsx("div", { className: clsx(styles.circleText, styles[size]), children: formatPercent(normalizedPercent) }))] }));
    };
    var renderProgress = function () {
        switch (type) {
            case 'circle':
                return renderCircleProgress();
            case 'dashboard':
                return renderDashboardProgress();
            default:
                return renderLineProgress();
        }
    };
    return (_jsx("div", { role: "progressbar", "aria-valuenow": normalizedPercent, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuetext": ((_b = formatPercent(normalizedPercent)) === null || _b === void 0 ? void 0 : _b.toString()) || '', children: renderProgress() }));
};
