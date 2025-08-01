import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import styles from './Pagination.module.css';
/**
 * Pagination - Advanced page navigation control component
 *
 * Features:
 * - Configurable page size with options
 * - Quick jumper for direct page navigation
 * - Total count display with customizable format
 * - Keyboard navigation support
 * - Multiple size variants
 * - Accessible with ARIA attributes
 * - Responsive design with ellipsis for large page counts
 */
export var Pagination = function (_a) {
    var _b, _c, _d;
    var current = _a.current, total = _a.total, _e = _a.pageSize, pageSize = _e === void 0 ? 10 : _e, _f = _a.showSizeChanger, showSizeChanger = _f === void 0 ? false : _f, _g = _a.pageSizeOptions, pageSizeOptions = _g === void 0 ? [10, 20, 50, 100] : _g, _h = _a.showQuickJumper, showQuickJumper = _h === void 0 ? false : _h, _j = _a.showTotal, showTotal = _j === void 0 ? false : _j, _k = _a.disabled, disabled = _k === void 0 ? false : _k, _l = _a.size, size = _l === void 0 ? 'md' : _l, onChange = _a.onChange, onShowSizeChange = _a.onShowSizeChange, className = _a.className;
    var totalPages = Math.ceil(total / pageSize);
    var startItem = (current - 1) * pageSize + 1;
    var endItem = Math.min(current * pageSize, total);
    var handlePageChange = function (page) {
        if (page !== current && page >= 1 && page <= totalPages && !disabled) {
            onChange === null || onChange === void 0 ? void 0 : onChange(page, pageSize);
        }
    };
    var handleSizeChange = function (newSize) {
        if (newSize !== pageSize && !disabled) {
            var newPage = Math.ceil((current - 1) * pageSize / newSize) + 1;
            onShowSizeChange === null || onShowSizeChange === void 0 ? void 0 : onShowSizeChange(Math.min(newPage, Math.ceil(total / newSize)), newSize);
        }
    };
    var handleQuickJump = function (event) {
        event.preventDefault();
        var formData = new FormData(event.currentTarget);
        var page = parseInt(formData.get('page'), 10);
        if (!isNaN(page)) {
            handlePageChange(page);
            event.currentTarget.elements.namedItem('page').value = '';
        }
    };
    var handleKeyDown = function (event, page) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handlePageChange(page);
        }
    };
    var renderPageNumbers = function () {
        var pages = [];
        var showEllipsis = totalPages > 7;
        if (!showEllipsis) {
            for (var i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        else {
            // Always show first page
            pages.push(1);
            if (current <= 4) {
                // Show 1-5 and ellipsis and last
                for (var i = 2; i <= Math.min(5, totalPages - 1); i++) {
                    pages.push(i);
                }
                if (totalPages > 5) {
                    pages.push('ellipsis1');
                    pages.push(totalPages);
                }
            }
            else if (current >= totalPages - 3) {
                // Show 1, ellipsis, and last 5
                if (totalPages > 5) {
                    pages.push('ellipsis1');
                    for (var i = Math.max(totalPages - 4, 2); i <= totalPages; i++) {
                        pages.push(i);
                    }
                }
            }
            else {
                // Show 1, ellipsis, current-1, current, current+1, ellipsis, last
                pages.push('ellipsis1');
                for (var i = current - 1; i <= current + 1; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis2');
                pages.push(totalPages);
            }
        }
        return pages.map(function (page, index) {
            var _a;
            if (typeof page === 'string') {
                return (_jsx("span", { className: clsx(styles.ellipsis, styles[size]), "aria-hidden": "true", children: "..." }, page));
            }
            return (_jsx("button", { type: "button", className: clsx(styles.pageButton, styles[size], (_a = {},
                    _a[styles.active] = page === current,
                    _a[styles.disabled] = disabled,
                    _a)), onClick: function () { return handlePageChange(page); }, onKeyDown: function (e) { return handleKeyDown(e, page); }, disabled: disabled, "aria-label": "Go to page ".concat(page), "aria-current": page === current ? 'page' : undefined, children: page }, page));
        });
    };
    var renderTotal = function () {
        if (!showTotal)
            return null;
        if (typeof showTotal === 'function') {
            return (_jsx("div", { className: clsx(styles.totalInfo, styles[size]), children: showTotal(total, [startItem, endItem]) }));
        }
        return (_jsx("div", { className: clsx(styles.totalInfo, styles[size]), children: total > 0 ? "".concat(startItem, "-").concat(endItem, " of ").concat(total, " items") : '0 items' }));
    };
    if (totalPages <= 1 && !showTotal) {
        return null;
    }
    return (_jsxs("div", { className: clsx(styles.pagination, (_b = {}, _b[styles.disabled] = disabled, _b), className), role: "navigation", "aria-label": "Pagination", children: [renderTotal(), _jsxs("div", { className: styles.paginationControls, children: [_jsx("button", { type: "button", className: clsx(styles.navButton, styles[size], (_c = {}, _c[styles.disabled] = current <= 1 || disabled, _c)), onClick: function () { return handlePageChange(current - 1); }, disabled: current <= 1 || disabled, "aria-label": "Go to previous page", children: "\u2039 Prev" }), _jsx("div", { className: styles.pageNumbers, children: renderPageNumbers() }), _jsx("button", { type: "button", className: clsx(styles.navButton, styles[size], (_d = {}, _d[styles.disabled] = current >= totalPages || disabled, _d)), onClick: function () { return handlePageChange(current + 1); }, disabled: current >= totalPages || disabled, "aria-label": "Go to next page", children: "Next \u203A" })] }), showSizeChanger && (_jsxs("div", { className: clsx(styles.sizeChanger, styles[size]), children: [_jsx("label", { htmlFor: "pageSize", children: "Show:" }), _jsx("select", { id: "pageSize", value: pageSize, onChange: function (e) { return handleSizeChange(parseInt(e.target.value, 10)); }, disabled: disabled, className: clsx(styles.sizeSelect, styles[size]), children: pageSizeOptions.map(function (option) { return (_jsx("option", { value: option, children: option }, option)); }) })] })), showQuickJumper && (_jsxs("form", { onSubmit: handleQuickJump, className: clsx(styles.quickJumper, styles[size]), children: [_jsx("label", { htmlFor: "quickPage", children: "Go to:" }), _jsx("input", { id: "quickPage", name: "page", type: "number", min: "1", max: totalPages, disabled: disabled, className: clsx(styles.quickInput, styles[size]), placeholder: totalPages.toString() })] }))] }));
};
