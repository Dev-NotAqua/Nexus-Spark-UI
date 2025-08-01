import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './DatePicker.module.css';
var DEFAULT_LOCALE = {
    months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today',
    clear: 'Clear'
};
/**
 * DatePicker - Advanced date selection interface component
 *
 * Features:
 * - Calendar popup with month/year navigation
 * - Date formatting and validation
 * - Disabled dates support
 * - Today button and clear functionality
 * - Keyboard navigation support
 * - Multiple size variants
 * - Customizable locale
 * - Accessible with ARIA attributes
 */
export var DatePicker = function (_a) {
    var _b;
    var value = _a.value, defaultValue = _a.defaultValue, _c = _a.placeholder, placeholder = _c === void 0 ? 'Select date' : _c, _d = _a.format, format = _d === void 0 ? 'MM/DD/YYYY' : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.clearable, clearable = _f === void 0 ? true : _f, _g = _a.showToday, showToday = _g === void 0 ? true : _g, disabledDate = _a.disabledDate, onChange = _a.onChange, onOpenChange = _a.onOpenChange, className = _a.className, _h = _a.size, size = _h === void 0 ? 'md' : _h, _j = _a.locale, locale = _j === void 0 ? DEFAULT_LOCALE : _j;
    var _k = useState(value || defaultValue || null), internalValue = _k[0], setInternalValue = _k[1];
    var _l = useState(false), isOpen = _l[0], setIsOpen = _l[1];
    var _m = useState(function () {
        var current = value || defaultValue || new Date();
        return new Date(current.getFullYear(), current.getMonth(), 1);
    }), viewDate = _m[0], setViewDate = _m[1];
    var inputRef = useRef(null);
    var dropdownRef = useRef(null);
    var currentValue = value !== undefined ? value : internalValue;
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return function () { return document.removeEventListener('mousedown', handleClickOutside); };
        }
    }, [isOpen]);
    var formatDate = function (date) {
        if (!date)
            return '';
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');
        return format
            .replace('YYYY', year.toString())
            .replace('MM', month)
            .replace('DD', day);
    };
    var parseDate = function (dateString) {
        if (!dateString)
            return null;
        // Basic parsing for MM/DD/YYYY format
        var parts = dateString.split('/');
        if (parts.length === 3) {
            var month = parseInt(parts[0], 10) - 1;
            var day = parseInt(parts[1], 10);
            var year = parseInt(parts[2], 10);
            var date = new Date(year, month, day);
            if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
                return date;
            }
        }
        return null;
    };
    var handleInputChange = function (event) {
        var inputValue = event.target.value;
        var parsedDate = parseDate(inputValue);
        if (parsedDate && (!disabledDate || !disabledDate(parsedDate))) {
            updateValue(parsedDate);
            setViewDate(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
        }
    };
    var updateValue = function (newValue) {
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    };
    var handleDateSelect = function (date) {
        updateValue(date);
        setIsOpen(false);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false);
    };
    var handleClear = function () {
        updateValue(null);
        setIsOpen(false);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false);
    };
    var handleToday = function () {
        var today = new Date();
        updateValue(today);
        setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
        setIsOpen(false);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false);
    };
    var navigateMonth = function (delta) {
        setViewDate(function (prev) {
            var newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + delta);
            return newDate;
        });
    };
    var navigateYear = function (delta) {
        setViewDate(function (prev) {
            var newDate = new Date(prev);
            newDate.setFullYear(newDate.getFullYear() + delta);
            return newDate;
        });
    };
    var isDateDisabled = function (date) {
        return disabledDate ? disabledDate(date) : false;
    };
    var isDateSelected = function (date) {
        if (!currentValue)
            return false;
        return (date.getDate() === currentValue.getDate() &&
            date.getMonth() === currentValue.getMonth() &&
            date.getFullYear() === currentValue.getFullYear());
    };
    var isToday = function (date) {
        var today = new Date();
        return (date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear());
    };
    var getDaysInMonth = function () {
        var year = viewDate.getFullYear();
        var month = viewDate.getMonth();
        var firstDay = new Date(year, month, 1);
        var lastDay = new Date(year, month + 1, 0);
        var daysInMonth = lastDay.getDate();
        var days = [];
        // Add previous month's trailing days
        var firstDayOfWeek = firstDay.getDay();
        for (var i = firstDayOfWeek - 1; i >= 0; i--) {
            var date = new Date(year, month, -i);
            days.push(date);
        }
        // Add current month's days
        for (var day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }
        // Add next month's leading days to complete the calendar grid
        var remainingDays = 42 - days.length; // 6 rows × 7 days
        for (var day = 1; day <= remainingDays; day++) {
            days.push(new Date(year, month + 1, day));
        }
        return days;
    };
    var handleKeyDown = function (event) {
        if (event.key === 'Enter') {
            setIsOpen(!isOpen);
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(!isOpen);
        }
        else if (event.key === 'Escape' && isOpen) {
            setIsOpen(false);
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false);
        }
    };
    return (_jsxs("div", { className: clsx(styles.datePickerContainer, className), children: [_jsxs("div", { className: styles.inputWrapper, children: [_jsx("input", { ref: inputRef, type: "text", value: formatDate(currentValue), onChange: handleInputChange, onKeyDown: handleKeyDown, onClick: function () {
                            if (!disabled) {
                                setIsOpen(!isOpen);
                                onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(!isOpen);
                            }
                        }, placeholder: placeholder, disabled: disabled, className: clsx(styles.input, styles[size], (_b = {}, _b[styles.disabled] = disabled, _b)), "aria-haspopup": "dialog", "aria-expanded": isOpen, "aria-label": "Date picker" }), _jsx("button", { type: "button", className: clsx(styles.calendarIcon, styles[size]), onClick: function () {
                            if (!disabled) {
                                setIsOpen(!isOpen);
                                onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(!isOpen);
                            }
                        }, disabled: disabled, "aria-label": "Open calendar", children: "\uD83D\uDCC5" })] }), isOpen && (_jsxs("div", { ref: dropdownRef, className: clsx(styles.dropdown, styles[size]), role: "dialog", "aria-label": "Calendar", children: [_jsxs("div", { className: styles.calendarHeader, children: [_jsx("button", { type: "button", className: styles.navButton, onClick: function () { return navigateYear(-1); }, "aria-label": "Previous year", children: "\u2039\u2039" }), _jsx("button", { type: "button", className: styles.navButton, onClick: function () { return navigateMonth(-1); }, "aria-label": "Previous month", children: "\u2039" }), _jsxs("div", { className: styles.monthYear, children: [locale.months[viewDate.getMonth()], " ", viewDate.getFullYear()] }), _jsx("button", { type: "button", className: styles.navButton, onClick: function () { return navigateMonth(1); }, "aria-label": "Next month", children: "\u203A" }), _jsx("button", { type: "button", className: styles.navButton, onClick: function () { return navigateYear(1); }, "aria-label": "Next year", children: "\u203A\u203A" })] }), _jsx("div", { className: styles.weekdayHeaders, children: locale.weekdays.map(function (weekday) { return (_jsx("div", { className: styles.weekdayHeader, children: weekday }, weekday)); }) }), _jsx("div", { className: styles.calendarGrid, children: getDaysInMonth().map(function (date, index) {
                            var _a;
                            var isCurrentMonth = date.getMonth() === viewDate.getMonth();
                            var disabled = isDateDisabled(date);
                            var selected = isDateSelected(date);
                            var today = isToday(date);
                            return (_jsx("button", { type: "button", className: clsx(styles.dayButton, (_a = {},
                                    _a[styles.otherMonth] = !isCurrentMonth,
                                    _a[styles.selected] = selected,
                                    _a[styles.today] = today,
                                    _a[styles.disabled] = disabled,
                                    _a)), onClick: function () { return !disabled && handleDateSelect(date); }, disabled: disabled, "aria-label": "".concat(date.getDate(), " ").concat(locale.months[date.getMonth()], " ").concat(date.getFullYear()), "aria-selected": selected, children: date.getDate() }, index));
                        }) }), _jsxs("div", { className: styles.calendarFooter, children: [showToday && (_jsx("button", { type: "button", className: styles.footerButton, onClick: handleToday, children: locale.today })), clearable && (_jsx("button", { type: "button", className: styles.footerButton, onClick: handleClear, children: locale.clear }))] })] }))] }));
};
