import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '../../utils';

// Types
export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  showTime?: boolean;
  clearable?: boolean;
  size?: 'small' | 'default' | 'large';
  className?: string;
  inputClassName?: string;
  popoverClassName?: string;
}

// DatePicker component
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  minDate,
  maxDate,
  showTime = false,
  clearable = true,
  size = 'default',
  className,
  inputClassName,
  popoverClassName,
}) => {
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue || null);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || defaultValue || new Date());
  const [timeValue, setTimeValue] = useState('00:00');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  const handleDateChange = (date: Date | null) => {
    if (value === undefined) {
      setInternalValue(date);
    }
    onChange?.(date);
  };

  const formatDisplayDate = (date: Date | null): string => {
    if (!date) return '';
    
    // Simple format implementation
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    
    if (showTime) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${month}/${day}/${year} ${hours}:${minutes}`;
    }
    
    return `${month}/${day}/${year}`;
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: Date[] = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const handleDayClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    const newDate = new Date(date);
    
    if (showTime && timeValue) {
      const [hours, minutes] = timeValue.split(':').map(Number);
      newDate.setHours(hours, minutes, 0, 0);
    }

    handleDateChange(newDate);
    if (!showTime) {
      setIsOpen(false);
    }
  };

  const handleTimeChange = (time: string) => {
    setTimeValue(time);
    
    if (currentValue) {
      const [hours, minutes] = time.split(':').map(Number);
      const newDate = new Date(currentValue);
      newDate.setHours(hours, minutes, 0, 0);
      handleDateChange(newDate);
    }
  };

  const handleClear = () => {
    handleDateChange(null);
    setIsOpen(false);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentValue) {
      setViewDate(currentValue);
      if (showTime) {
        const hours = currentValue.getHours().toString().padStart(2, '0');
        const minutes = currentValue.getMinutes().toString().padStart(2, '0');
        setTimeValue(`${hours}:${minutes}`);
      }
    }
  }, [currentValue, showTime]);

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-sm';
      case 'large':
        return 'px-4 py-3 text-base';
      default:
        return 'px-3 py-2 text-sm';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setViewDate(newDate);
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
    setViewDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(viewDate);
  const currentMonth = viewDate.getMonth();

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={formatDisplayDate(currentValue)}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          onClick={handleInputClick}
          className={cn(
            'w-full border border-gray-300 rounded-md bg-white cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            getSizeClasses(),
            inputClassName
          )}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Calendar className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className={cn(
          'absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4',
          'min-w-max',
          popoverClassName
        )}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateYear('prev')}
              className="p-1 hover:bg-gray-100 rounded"
              type="button"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1 hover:bg-gray-100 rounded"
              type="button"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>

            <div className="flex-1 text-center font-semibold">
              {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
            </div>

            <button
              onClick={() => navigateMonth('next')}
              className="p-1 hover:bg-gray-100 rounded"
              type="button"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
            
            <button
              onClick={() => navigateYear('next')}
              className="p-1 hover:bg-gray-100 rounded"
              type="button"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentMonth;
              const isSelected = currentValue && isSameDay(day, currentValue);
              const isToday = isSameDay(day, new Date());
              const isDisabled = isDateDisabled(day);

              return (
                <button
                  key={index}
                  onClick={() => handleDayClick(day)}
                  disabled={isDisabled}
                  className={cn(
                    'w-8 h-8 text-sm rounded transition-colors',
                    'hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                    isSelected && 'bg-blue-500 text-white hover:bg-blue-600',
                    isToday && !isSelected && 'bg-gray-100 font-medium',
                    isDisabled && 'text-gray-300 cursor-not-allowed hover:bg-transparent'
                  )}
                  type="button"
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          {/* Time picker */}
          {showTime && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center">
                <label className="text-sm font-medium text-gray-700 mr-2">
                  Time:
                </label>
                <input
                  type="time"
                  value={timeValue}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            {clearable && currentValue ? (
              <button
                onClick={handleClear}
                className="text-sm text-gray-500 hover:text-gray-700"
                type="button"
              >
                Clear
              </button>
            ) : (
              <div />
            )}
            
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button"
            >
              {showTime ? 'Done' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};