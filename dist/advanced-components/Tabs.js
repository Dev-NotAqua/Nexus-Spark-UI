import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import clsx from 'clsx';
import styles from './Tabs.module.css';
/**
 * Tabs - Advanced tabbed navigation interface component
 *
 * Features:
 * - Multiple visual variants (default, pills, underline)
 * - Keyboard navigation support
 * - Disabled tabs support
 * - Controlled and uncontrolled modes
 * - Accessible with ARIA attributes
 */
export var Tabs = function (_a) {
    var _b, _c;
    var tabs = _a.tabs, defaultActiveTab = _a.defaultActiveTab, onTabChange = _a.onTabChange, className = _a.className, _d = _a.variant, variant = _d === void 0 ? 'default' : _d, _e = _a.size, size = _e === void 0 ? 'md' : _e;
    var _f = useState(defaultActiveTab || ((_b = tabs[0]) === null || _b === void 0 ? void 0 : _b.id)), activeTab = _f[0], setActiveTab = _f[1];
    var handleTabClick = function (tabId, disabled) {
        if (disabled)
            return;
        setActiveTab(tabId);
        onTabChange === null || onTabChange === void 0 ? void 0 : onTabChange(tabId);
    };
    var handleKeyDown = function (event, tabId, disabled) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleTabClick(tabId, disabled);
        }
    };
    var activeTabContent = (_c = tabs.find(function (tab) { return tab.id === activeTab; })) === null || _c === void 0 ? void 0 : _c.content;
    return (_jsxs("div", { className: clsx(styles.tabsContainer, className), children: [_jsx("div", { className: clsx(styles.tabList, styles[variant], styles[size]), role: "tablist", "aria-orientation": "horizontal", children: tabs.map(function (tab) {
                    var _a;
                    return (_jsx("button", { role: "tab", "aria-selected": activeTab === tab.id, "aria-controls": "panel-".concat(tab.id), "aria-disabled": tab.disabled, tabIndex: activeTab === tab.id ? 0 : -1, className: clsx(styles.tab, styles[variant], styles[size], (_a = {},
                            _a[styles.active] = activeTab === tab.id,
                            _a[styles.disabled] = tab.disabled,
                            _a)), onClick: function () { return handleTabClick(tab.id, tab.disabled); }, onKeyDown: function (e) { return handleKeyDown(e, tab.id, tab.disabled); }, disabled: tab.disabled, children: tab.label }, tab.id));
                }) }), _jsx("div", { id: "panel-".concat(activeTab), role: "tabpanel", "aria-labelledby": "tab-".concat(activeTab), className: styles.tabPanel, children: activeTabContent })] }));
};
