import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  placeholder?: string;
  format?: string;
  disabled?: boolean;
  clearable?: boolean;
  showToday?: boolean;
  disabledDate?: (date: Date) => boolean;
  onChange?: (date: Date | null) => void;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  locale?: {
    months: string[];
    weekdays: string[];
    today: string;
    clear: string;
  };
}

const DEFAULT_LOCALE = {
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
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  placeholder = 'Select date',
  format = 'MM/DD/YYYY',
  disabled = false,
  clearable = true,
  showToday = true,
  disabledDate,
  onChange,
  onOpenChange,
  className,
  size = 'md',
  locale = DEFAULT_LOCALE
}) => {
  const [internalValue, setInternalValue] = useState<Date | null>(value || defaultValue || null);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const current = value || defaultValue || new Date();
    return new Date(current.getFullYear(), current.getMonth(), 1);
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day);
  };

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    
    // Basic parsing for MM/DD/YYYY format
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const month = parseInt(parts[0], 10) - 1;
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      
      const date = new Date(year, month, day);
      if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
        return date;
      }
    }
    
    return null;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const parsedDate = parseDate(inputValue);
    
    if (parsedDate && (!disabledDate || !disabledDate(parsedDate))) {
      updateValue(parsedDate);
      setViewDate(new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1));
    }
  };

  const updateValue = (newValue: Date | null) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleDateSelect = (date: Date) => {
    updateValue(date);
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const handleClear = () => {
    updateValue(null);
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const handleToday = () => {
    const today = new Date();
    updateValue(today);
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const navigateMonth = (delta: number) => {
    setViewDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + delta);
      return newDate;
    });
  };

  const navigateYear = (delta: number) => {
    setViewDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(newDate.getFullYear() + delta);
      return newDate;
    });
  };

  const isDateDisabled = (date: Date): boolean => {
    return disabledDate ? disabledDate(date) : false;
  };

  const isDateSelected = (date: Date): boolean => {
    if (!currentValue) return false;
    return (
      date.getDate() === currentValue.getDate() &&
      date.getMonth() === currentValue.getMonth() &&
      date.getFullYear() === currentValue.getFullYear()
    );
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getDaysInMonth = (): Date[] => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days: Date[] = [];
    
    // Add previous month's trailing days
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push(date);
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    // Add next month's leading days to complete the calendar grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }
    
    return days;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setIsOpen(!isOpen);
      onOpenChange?.(!isOpen);
    } else if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
      onOpenChange?.(false);
    }
  };

  return (
    <div className={clsx(styles.datePickerContainer, className)}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          value={formatDate(currentValue)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              onOpenChange?.(!isOpen);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            styles.input,
            styles[size],
            { [styles.disabled]: disabled }
          )}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Date picker"
        />
        
        <button
          type="button"
          className={clsx(styles.calendarIcon, styles[size])}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              onOpenChange?.(!isOpen);
            }
          }}
          disabled={disabled}
          aria-label="Open calendar"
        >
          📅
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={clsx(styles.dropdown, styles[size])}
          role="dialog"
          aria-label="Calendar"
        >
          {/* Calendar Header */}
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => navigateYear(-1)}
              aria-label="Previous year"
            >
              ‹‹
            </button>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => navigateMonth(-1)}
              aria-label="Previous month"
            >
              ‹
            </button>
            
            <div className={styles.monthYear}>
              {locale.months[viewDate.getMonth()]} {viewDate.getFullYear()}
            </div>
            
            <button
              type="button"
              className={styles.navButton}
              onClick={() => navigateMonth(1)}
              aria-label="Next month"
            >
              ›
            </button>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => navigateYear(1)}
              aria-label="Next year"
            >
              ››
            </button>
          </div>

          {/* Weekday Headers */}
          <div className={styles.weekdayHeaders}>
            {locale.weekdays.map(weekday => (
              <div key={weekday} className={styles.weekdayHeader}>
                {weekday}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className={styles.calendarGrid}>
            {getDaysInMonth().map((date, index) => {
              const isCurrentMonth = date.getMonth() === viewDate.getMonth();
              const disabled = isDateDisabled(date);
              const selected = isDateSelected(date);
              const today = isToday(date);

              return (
                <button
                  key={index}
                  type="button"
                  className={clsx(
                    styles.dayButton,
                    {
                      [styles.otherMonth]: !isCurrentMonth,
                      [styles.selected]: selected,
                      [styles.today]: today,
                      [styles.disabled]: disabled
                    }
                  )}
                  onClick={() => !disabled && handleDateSelect(date)}
                  disabled={disabled}
                  aria-label={`${date.getDate()} ${locale.months[date.getMonth()]} ${date.getFullYear()}`}
                  aria-selected={selected}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className={styles.calendarFooter}>
            {showToday && (
              <button
                type="button"
                className={styles.footerButton}
                onClick={handleToday}
              >
                {locale.today}
              </button>
            )}
            {clearable && (
              <button
                type="button"
                className={styles.footerButton}
                onClick={handleClear}
              >
                {locale.clear}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};