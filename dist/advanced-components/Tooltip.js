import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './Tooltip.module.css';
/**
 * Tooltip - Advanced hoverable popup component for additional information
 *
 * Features:
 * - Multiple positioning options
 * - Multiple trigger types (hover, click, focus)
 * - Configurable delay
 * - Dark and light variants
 * - Accessible with ARIA attributes
 * - Responsive positioning
 */
export var Tooltip = function (_a) {
    var content = _a.content, children = _a.children, _b = _a.position, position = _b === void 0 ? 'top' : _b, _c = _a.trigger, trigger = _c === void 0 ? 'hover' : _c, _d = _a.delay, delay = _d === void 0 ? 500 : _d, className = _a.className, _e = _a.size, size = _e === void 0 ? 'md' : _e, _f = _a.variant, variant = _f === void 0 ? 'dark' : _f;
    var _g = useState(false), isVisible = _g[0], setIsVisible = _g[1];
    var _h = useState(null), timeoutId = _h[0], setTimeoutId = _h[1];
    var triggerRef = useRef(null);
    var showTooltip = function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        var id = window.setTimeout(function () { return setIsVisible(true); }, delay);
        setTimeoutId(id);
    };
    var hideTooltip = function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setIsVisible(false);
    };
    var toggleTooltip = function () {
        if (isVisible) {
            hideTooltip();
        }
        else {
            showTooltip();
        }
    };
    var handleMouseEnter = function () {
        if (trigger === 'hover') {
            showTooltip();
        }
    };
    var handleMouseLeave = function () {
        if (trigger === 'hover') {
            hideTooltip();
        }
    };
    var handleClick = function () {
        if (trigger === 'click') {
            toggleTooltip();
        }
    };
    var handleFocus = function () {
        if (trigger === 'focus') {
            showTooltip();
        }
    };
    var handleBlur = function () {
        if (trigger === 'focus') {
            hideTooltip();
        }
    };
    var handleKeyDown = function (event) {
        if (event.key === 'Escape' && isVisible) {
            hideTooltip();
        }
    };
    return (_jsxs("div", { className: clsx(styles.tooltipContainer, className), ref: triggerRef, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onClick: handleClick, onFocus: handleFocus, onBlur: handleBlur, onKeyDown: handleKeyDown, children: [_jsx("div", { role: "button", "aria-describedby": isVisible ? 'tooltip' : undefined, "aria-expanded": trigger === 'click' ? isVisible : undefined, tabIndex: trigger !== 'hover' ? 0 : undefined, className: styles.tooltipTrigger, children: children }), isVisible && (_jsxs("div", { id: "tooltip", role: "tooltip", className: clsx(styles.tooltip, styles[position], styles[size], styles[variant]), "aria-hidden": !isVisible, children: [_jsx("div", { className: styles.tooltipContent, children: content }), _jsx("div", { className: clsx(styles.tooltipArrow, styles[position], styles[variant]) })] }))] }));
};
