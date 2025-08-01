import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import clsx from 'clsx';
import styles from './Accordion.module.css';
/**
 * Accordion - Advanced collapsible section interface component
 *
 * Features:
 * - Single or multiple item expansion
 * - Keyboard navigation support
 * - Disabled items support
 * - Controlled and uncontrolled modes
 * - Accessible with ARIA attributes
 * - Smooth animations
 */
export var Accordion = function (_a) {
    var items = _a.items, _b = _a.allowMultiple, allowMultiple = _b === void 0 ? false : _b, _c = _a.defaultOpenItems, defaultOpenItems = _c === void 0 ? [] : _c, onItemToggle = _a.onItemToggle, className = _a.className, _d = _a.size, size = _d === void 0 ? 'md' : _d;
    var _e = useState(new Set(defaultOpenItems)), openItems = _e[0], setOpenItems = _e[1];
    var toggleItem = function (itemId, disabled) {
        if (disabled)
            return;
        setOpenItems(function (prev) {
            var newOpenItems = new Set(prev);
            var isCurrentlyOpen = newOpenItems.has(itemId);
            if (isCurrentlyOpen) {
                newOpenItems.delete(itemId);
            }
            else {
                if (!allowMultiple) {
                    newOpenItems.clear();
                }
                newOpenItems.add(itemId);
            }
            onItemToggle === null || onItemToggle === void 0 ? void 0 : onItemToggle(itemId, !isCurrentlyOpen);
            return newOpenItems;
        });
    };
    var handleKeyDown = function (event, itemId, disabled) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleItem(itemId, disabled);
        }
    };
    return (_jsx("div", { className: clsx(styles.accordion, className), children: items.map(function (item, index) {
            var _a, _b, _c, _d;
            var isOpen = openItems.has(item.id);
            return (_jsxs("div", { className: clsx(styles.accordionItem, (_a = {},
                    _a[styles.disabled] = item.disabled,
                    _a[styles.open] = isOpen,
                    _a)), children: [_jsxs("button", { type: "button", "aria-expanded": isOpen, "aria-controls": "content-".concat(item.id), "aria-disabled": item.disabled, className: clsx(styles.accordionHeader, styles[size], (_b = {},
                            _b[styles.disabled] = item.disabled,
                            _b)), onClick: function () { return toggleItem(item.id, item.disabled); }, onKeyDown: function (e) { return handleKeyDown(e, item.id, item.disabled); }, disabled: item.disabled, children: [_jsx("span", { className: styles.accordionTitle, children: item.title }), _jsx("span", { className: clsx(styles.accordionIcon, (_c = {}, _c[styles.rotated] = isOpen, _c)), "aria-hidden": "true", children: "\u25BC" })] }), _jsx("div", { id: "content-".concat(item.id), className: clsx(styles.accordionContent, (_d = {}, _d[styles.open] = isOpen, _d)), "aria-hidden": !isOpen, children: _jsx("div", { className: clsx(styles.accordionContentInner, styles[size]), children: item.content }) })] }, item.id));
        }) }));
};
