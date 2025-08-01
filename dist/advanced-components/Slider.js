var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import styles from './Slider.module.css';
/**
 * Slider - Advanced value selection within range component
 *
 * Features:
 * - Single and range selection modes
 * - Vertical and horizontal orientations
 * - Custom step values and marks
 * - Tooltip display with custom formatting
 * - Keyboard navigation support
 * - Touch/mobile support
 * - Accessible with ARIA attributes
 * - Multiple size variants
 */
export var Slider = function (_a) {
    var _b;
    var _c = _a.min, min = _c === void 0 ? 0 : _c, _d = _a.max, max = _d === void 0 ? 100 : _d, _e = _a.step, step = _e === void 0 ? 1 : _e, value = _a.value, defaultValue = _a.defaultValue, _f = _a.range, range = _f === void 0 ? false : _f, _g = _a.disabled, disabled = _g === void 0 ? false : _g, _h = _a.vertical, vertical = _h === void 0 ? false : _h, marks = _a.marks, _j = _a.included, included = _j === void 0 ? true : _j, _k = _a.tooltipVisible, tooltipVisible = _k === void 0 ? false : _k, _l = _a.tooltipFormatter, tooltipFormatter = _l === void 0 ? function (val) { return val.toString(); } : _l, onChange = _a.onChange, onAfterChange = _a.onAfterChange, className = _a.className, _m = _a.size, size = _m === void 0 ? 'md' : _m;
    var _o = useState(function () {
        if (value !== undefined)
            return value;
        if (defaultValue !== undefined)
            return defaultValue;
        return range ? [min, max] : min;
    }), internalValue = _o[0], setInternalValue = _o[1];
    var _p = useState(null), isDragging = _p[0], setIsDragging = _p[1];
    var _q = useState(false), showTooltip = _q[0], setShowTooltip = _q[1];
    var sliderRef = useRef(null);
    var currentValue = value !== undefined ? value : internalValue;
    var normalizeValue = function (val) {
        return Math.min(max, Math.max(min, Math.round((val - min) / step) * step + min));
    };
    var getPercentage = function (val) {
        return ((val - min) / (max - min)) * 100;
    };
    var getValueFromPosition = useCallback(function (clientX, clientY) {
        if (!sliderRef.current)
            return min;
        var rect = sliderRef.current.getBoundingClientRect();
        var position = vertical
            ? (rect.bottom - clientY) / rect.height
            : (clientX - rect.left) / rect.width;
        var value = position * (max - min) + min;
        return normalizeValue(value);
    }, [min, max, step, vertical]);
    var updateValue = useCallback(function (newValue, handleIndex) {
        var updatedValue;
        if (range && Array.isArray(currentValue)) {
            updatedValue = __spreadArray([], currentValue, true);
            if (handleIndex !== undefined) {
                updatedValue[handleIndex] = newValue;
                // Ensure proper order
                if (updatedValue[0] > updatedValue[1]) {
                    updatedValue = [updatedValue[1], updatedValue[0]];
                }
            }
        }
        else {
            updatedValue = newValue;
        }
        if (value === undefined) {
            setInternalValue(updatedValue);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(updatedValue);
    }, [currentValue, range, value, onChange]);
    var handleMouseDown = function (event, handleIndex) {
        if (disabled)
            return;
        event.preventDefault();
        setIsDragging(handleIndex !== null && handleIndex !== void 0 ? handleIndex : 0);
        setShowTooltip(true);
        var handleMouseMove = function (e) {
            var newValue = getValueFromPosition(e.clientX, e.clientY);
            updateValue(newValue, handleIndex);
        };
        var handleMouseUp = function () {
            setIsDragging(null);
            setShowTooltip(false);
            onAfterChange === null || onAfterChange === void 0 ? void 0 : onAfterChange(currentValue);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    var handleKeyDown = function (event, handleIndex) {
        if (disabled)
            return;
        var delta = 0;
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
                delta = -step;
                break;
            case 'ArrowRight':
            case 'ArrowUp':
                delta = step;
                break;
            case 'PageDown':
                delta = -(max - min) / 10;
                break;
            case 'PageUp':
                delta = (max - min) / 10;
                break;
            case 'Home':
                delta = min - (Array.isArray(currentValue) ? currentValue[handleIndex !== null && handleIndex !== void 0 ? handleIndex : 0] : currentValue);
                break;
            case 'End':
                delta = max - (Array.isArray(currentValue) ? currentValue[handleIndex !== null && handleIndex !== void 0 ? handleIndex : 0] : currentValue);
                break;
            default:
                return;
        }
        event.preventDefault();
        var currentVal = Array.isArray(currentValue) ? currentValue[handleIndex !== null && handleIndex !== void 0 ? handleIndex : 0] : currentValue;
        var newValue = normalizeValue(currentVal + delta);
        updateValue(newValue, handleIndex);
    };
    var renderHandle = function (val, index) {
        var _a, _b;
        var _c;
        var percentage = getPercentage(val);
        var isActive = isDragging === (index !== null && index !== void 0 ? index : 0);
        return (_jsx("div", { className: clsx(styles.handle, styles[size], (_a = {},
                _a[styles.active] = isActive,
                _a[styles.disabled] = disabled,
                _a)), style: (_b = {},
                _b[vertical ? 'bottom' : 'left'] = "".concat(percentage, "%"),
                _b), onMouseDown: function (e) { return handleMouseDown(e, index); }, onKeyDown: function (e) { return handleKeyDown(e, index); }, tabIndex: disabled ? -1 : 0, role: "slider", "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": val, "aria-valuetext": ((_c = tooltipFormatter(val)) === null || _c === void 0 ? void 0 : _c.toString()) || val.toString(), "aria-orientation": vertical ? 'vertical' : 'horizontal', "aria-disabled": disabled, children: (tooltipVisible || showTooltip) && (_jsx("div", { className: clsx(styles.tooltip, styles[size]), children: tooltipFormatter(val) })) }, "handle-".concat(index !== null && index !== void 0 ? index : 0)));
    };
    var renderTrack = function () {
        var _a;
        if (!included)
            return null;
        var startPercentage = 0;
        var endPercentage = 100;
        if (Array.isArray(currentValue)) {
            startPercentage = getPercentage(currentValue[0]);
            endPercentage = getPercentage(currentValue[1]);
        }
        else {
            endPercentage = getPercentage(currentValue);
        }
        return (_jsx("div", { className: clsx(styles.track, styles[size]), style: (_a = {},
                _a[vertical ? 'bottom' : 'left'] = "".concat(startPercentage, "%"),
                _a[vertical ? 'height' : 'width'] = "".concat(endPercentage - startPercentage, "%"),
                _a) }));
    };
    var renderMarks = function () {
        if (!marks)
            return null;
        var markPositions = Array.isArray(marks)
            ? marks.map(function (mark) { return ({ value: mark, label: mark }); })
            : Object.entries(marks).map(function (_a) {
                var value = _a[0], label = _a[1];
                return ({ value: Number(value), label: label });
            });
        return (_jsx("div", { className: styles.marks, children: markPositions.map(function (_a) {
                var _b, _c;
                var value = _a.value, label = _a.label;
                var percentage = getPercentage(value);
                var isIncluded = Array.isArray(currentValue)
                    ? value >= currentValue[0] && value <= currentValue[1]
                    : value <= currentValue;
                return (_jsxs("div", { className: clsx(styles.mark, styles[size], (_b = {}, _b[styles.included] = included && isIncluded, _b)), style: (_c = {},
                        _c[vertical ? 'bottom' : 'left'] = "".concat(percentage, "%"),
                        _c), children: [_jsx("div", { className: styles.markDot }), _jsx("div", { className: styles.markLabel, children: label })] }, value));
            }) }));
    };
    return (_jsxs("div", { className: clsx(styles.slider, styles[size], (_b = {},
            _b[styles.vertical] = vertical,
            _b[styles.disabled] = disabled,
            _b), className), ref: sliderRef, children: [_jsx("div", { className: clsx(styles.rail, styles[size]) }), renderTrack(), renderMarks(), Array.isArray(currentValue) ? (_jsxs(_Fragment, { children: [renderHandle(currentValue[0], 0), renderHandle(currentValue[1], 1)] })) : (renderHandle(currentValue))] }));
};
