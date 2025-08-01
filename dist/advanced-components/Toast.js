var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Toast.module.css';
/**
 * Toast - Individual toast notification component
 */
export var Toast = function (_a) {
    var _b;
    var id = _a.id, title = _a.title, message = _a.message, _c = _a.type, type = _c === void 0 ? 'info' : _c, _d = _a.duration, duration = _d === void 0 ? 5000 : _d, _e = _a.dismissible, dismissible = _e === void 0 ? true : _e, onDismiss = _a.onDismiss, className = _a.className;
    var _f = useState(true), isVisible = _f[0], setIsVisible = _f[1];
    useEffect(function () {
        if (duration > 0) {
            var timer_1 = setTimeout(function () {
                setIsVisible(false);
                setTimeout(function () { return onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(id); }, 300); // Wait for animation
            }, duration);
            return function () { return clearTimeout(timer_1); };
        }
    }, [duration, id, onDismiss]);
    var handleDismiss = function () {
        setIsVisible(false);
        setTimeout(function () { return onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(id); }, 300); // Wait for animation
    };
    var handleKeyDown = function (event) {
        if (event.key === 'Escape' && dismissible) {
            handleDismiss();
        }
    };
    var getIcon = function () {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            case 'info':
            default:
                return 'ℹ';
        }
    };
    return (_jsxs("div", { role: "alert", "aria-live": "assertive", "aria-atomic": "true", className: clsx(styles.toast, styles[type], (_b = {}, _b[styles.visible] = isVisible, _b), className), onKeyDown: handleKeyDown, tabIndex: dismissible ? 0 : -1, children: [_jsxs("div", { className: styles.toastContent, children: [_jsx("div", { className: styles.toastIcon, "aria-hidden": "true", children: getIcon() }), _jsxs("div", { className: styles.toastText, children: [title && _jsx("div", { className: styles.toastTitle, children: title }), _jsx("div", { className: styles.toastMessage, children: message })] }), dismissible && (_jsx("button", { type: "button", className: styles.dismissButton, onClick: handleDismiss, "aria-label": "Dismiss notification", children: "\u2715" }))] }), duration > 0 && (_jsx("div", { className: clsx(styles.progressBar, styles[type]), style: {
                    animationDuration: "".concat(duration, "ms")
                } }))] }));
};
/**
 * ToastContainer - Container component for managing multiple toast notifications
 *
 * Features:
 * - Multiple positioning options
 * - Auto-dismissal with configurable duration
 * - Manual dismissal support
 * - Different notification types (success, error, warning, info)
 * - Progress bars for duration indication
 * - Accessible with ARIA attributes
 * - Smooth animations
 */
export var ToastContainer = function (_a) {
    var toasts = _a.toasts, _b = _a.position, position = _b === void 0 ? 'top-right' : _b, className = _a.className;
    return (_jsx("div", { className: clsx(styles.toastContainer, styles[position], className), "aria-label": "Notifications", children: toasts.map(function (toast) { return (_jsx(Toast, __assign({}, toast), toast.id)); }) }));
};
