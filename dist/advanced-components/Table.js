var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Table.module.css';
/**
 * Table - Advanced data display table component
 *
 * Features:
 * - Column sorting functionality
 * - Custom cell rendering
 * - Row selection support
 * - Loading states
 * - Responsive design
 * - Multiple size variants
 * - Accessible with ARIA attributes
 * - Row hover and striping options
 */
export var Table = function (_a) {
    var _b;
    var columns = _a.columns, data = _a.data, _c = _a.rowKey, rowKey = _c === void 0 ? 'id' : _c, _d = _a.loading, loading = _d === void 0 ? false : _d, _e = _a.striped, striped = _e === void 0 ? false : _e, _f = _a.bordered, bordered = _f === void 0 ? false : _f, _g = _a.hover, hover = _g === void 0 ? false : _g, _h = _a.size, size = _h === void 0 ? 'md' : _h, onRowClick = _a.onRowClick, className = _a.className, _j = _a.emptyText, emptyText = _j === void 0 ? 'No data available' : _j;
    var _k = useState({ key: null, direction: null }), sortState = _k[0], setSortState = _k[1];
    var getRowKey = function (record, index) {
        if (typeof rowKey === 'function') {
            return rowKey(record, index);
        }
        return record[rowKey] || index.toString();
    };
    var handleSort = function (columnKey) {
        setSortState(function (prev) {
            if (prev.key === columnKey) {
                // Cycle through: asc -> desc -> null
                var direction = prev.direction === 'asc' ? 'desc' : prev.direction === 'desc' ? null : 'asc';
                return { key: direction ? columnKey : null, direction: direction };
            }
            return { key: columnKey, direction: 'asc' };
        });
    };
    var sortedData = React.useMemo(function () {
        if (!sortState.key || !sortState.direction)
            return data;
        var column = columns.find(function (col) { return col.key === sortState.key; });
        if (!column || !column.sortable)
            return data;
        return __spreadArray([], data, true).sort(function (a, b) {
            var aValue = column.dataIndex ? a[column.dataIndex] : a[column.key];
            var bValue = column.dataIndex ? b[column.dataIndex] : b[column.key];
            if (aValue < bValue)
                return sortState.direction === 'asc' ? -1 : 1;
            if (aValue > bValue)
                return sortState.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortState, columns]);
    var renderCell = function (column, record, index) {
        if (column.render) {
            return column.render(column.dataIndex ? record[column.dataIndex] : record[column.key], record, index);
        }
        return column.dataIndex ? record[column.dataIndex] : record[column.key];
    };
    var getSortIcon = function (columnKey) {
        if (sortState.key !== columnKey)
            return '⇅';
        return sortState.direction === 'asc' ? '↑' : '↓';
    };
    return (_jsx("div", { className: clsx(styles.tableContainer, className), children: _jsxs("table", { className: clsx(styles.table, styles[size], (_b = {},
                _b[styles.striped] = striped,
                _b[styles.bordered] = bordered,
                _b[styles.hover] = hover,
                _b[styles.loading] = loading,
                _b)), role: "table", children: [_jsx("thead", { className: styles.tableHead, children: _jsx("tr", { role: "row", children: columns.map(function (column) {
                            var _a;
                            return (_jsx("th", { role: "columnheader", className: clsx(styles.tableHeader, styles[size], styles[column.align || 'left'], (_a = {},
                                    _a[styles.sortable] = column.sortable,
                                    _a)), style: { width: column.width }, onClick: function () { return column.sortable && handleSort(column.key); }, onKeyDown: function (e) {
                                    if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                                        e.preventDefault();
                                        handleSort(column.key);
                                    }
                                }, tabIndex: column.sortable ? 0 : -1, "aria-sort": sortState.key === column.key
                                    ? sortState.direction === 'asc' ? 'ascending' : 'descending'
                                    : column.sortable ? 'none' : undefined, children: _jsxs("div", { className: styles.headerContent, children: [_jsx("span", { children: column.title }), column.sortable && (_jsx("span", { className: styles.sortIcon, "aria-hidden": "true", children: getSortIcon(column.key) }))] }) }, column.key));
                        }) }) }), _jsx("tbody", { className: styles.tableBody, children: loading ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length, className: styles.loadingCell, children: _jsx("div", { className: styles.loadingSpinner, "aria-label": "Loading...", children: "Loading..." }) }) })) : sortedData.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length, className: styles.emptyCell, children: emptyText }) })) : (sortedData.map(function (record, index) {
                        var _a;
                        return (_jsx("tr", { role: "row", className: clsx(styles.tableRow, (_a = {},
                                _a[styles.clickable] = !!onRowClick,
                                _a)), onClick: function () { return onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(record, index); }, onKeyDown: function (e) {
                                if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                                    e.preventDefault();
                                    onRowClick(record, index);
                                }
                            }, tabIndex: onRowClick ? 0 : -1, children: columns.map(function (column) { return (_jsx("td", { role: "cell", className: clsx(styles.tableCell, styles[size], styles[column.align || 'left']), children: renderCell(column, record, index) }, column.key)); }) }, getRowKey(record, index)));
                    })) })] }) }));
};
