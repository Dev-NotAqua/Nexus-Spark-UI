import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '../../utils';

// Types
export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  range?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  marks?: Record<number, React.ReactNode> | number[];
  included?: boolean;
  tooltip?: boolean | 'always';
  formatTooltip?: (value: number) => React.ReactNode;
  onChange?: (value: number | [number, number]) => void;
  onAfterChange?: (value: number | [number, number]) => void;
  className?: string;
}

// Slider component
export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  range = false,
  disabled = false,
  vertical = false,
  reverse = false,
  marks,
  included = true,
  tooltip = false,
  formatTooltip = (val) => val.toString(),
  onChange,
  onAfterChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState<number | [number, number]>(() => {
    if (value !== undefined) return value;
    if (defaultValue !== undefined) return defaultValue;
    return range ? [min, min] : min;
  });

  const [dragging, setDragging] = useState<'start' | 'end' | null>(null);
  const [showTooltip, setShowTooltip] = useState(tooltip === 'always');
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  const getValues = (): [number, number] => {
    if (Array.isArray(currentValue)) {
      return currentValue;
    }
    return [currentValue, currentValue];
  };

  const [startValue, endValue] = getValues();

  const handleValueChange = useCallback((newValue: number | [number, number]) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [value, onChange]);

  const getPositionFromValue = (val: number): number => {
    const percentage = ((val - min) / (max - min)) * 100;
    return reverse ? 100 - percentage : percentage;
  };

  const getValueFromPosition = (position: number): number => {
    const percentage = reverse ? 100 - position : position;
    const rawValue = min + (percentage / 100) * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const getPositionFromEvent = (event: MouseEvent | TouchEvent): number => {
    if (!sliderRef.current) return 0;

    const rect = sliderRef.current.getBoundingClientRect();
    const clientPos = 'touches' in event ? event.touches[0] : event;
    
    let position: number;
    if (vertical) {
      position = ((rect.bottom - clientPos.clientY) / rect.height) * 100;
    } else {
      position = ((clientPos.clientX - rect.left) / rect.width) * 100;
    }

    return Math.max(0, Math.min(100, position));
  };

  const handleMouseDown = (handleType: 'start' | 'end') => (event: React.MouseEvent) => {
    if (disabled) return;
    
    event.preventDefault();
    setDragging(handleType);
    setShowTooltip(true);
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!dragging || disabled) return;

    const position = getPositionFromEvent(event);
    const newValue = getValueFromPosition(position);

    if (range) {
      const [start, end] = getValues();
      if (dragging === 'start') {
        handleValueChange([Math.min(newValue, end), end]);
      } else {
        handleValueChange([start, Math.max(newValue, start)]);
      }
    } else {
      handleValueChange(newValue);
    }
  }, [dragging, disabled, range, handleValueChange, getValues]);

  const handleMouseUp = useCallback(() => {
    if (dragging) {
      setDragging(null);
      if (tooltip !== 'always') {
        setShowTooltip(false);
      }
      onAfterChange?.(currentValue);
    }
  }, [dragging, tooltip, currentValue, onAfterChange]);

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove as any);
      document.addEventListener('touchend', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove as any);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  const handleTrackClick = (event: React.MouseEvent) => {
    if (disabled || event.target !== event.currentTarget) return;

    const position = getPositionFromEvent(event.nativeEvent);
    const newValue = getValueFromPosition(position);

    if (range) {
      const [start, end] = getValues();
      const startDistance = Math.abs(newValue - start);
      const endDistance = Math.abs(newValue - end);
      
      if (startDistance < endDistance) {
        handleValueChange([newValue, end]);
      } else {
        handleValueChange([start, newValue]);
      }
    } else {
      handleValueChange(newValue);
    }
  };

  const renderMarks = () => {
    if (!marks) return null;

    const markItems = Array.isArray(marks) 
      ? marks.map(mark => ({ value: mark, label: mark }))
      : Object.entries(marks).map(([value, label]) => ({ 
          value: Number(value), 
          label 
        }));

    return (
      <div className="absolute inset-0 pointer-events-none">
        {markItems.map(({ value, label }) => {
          const position = getPositionFromValue(value);
          const isInRange = range 
            ? value >= startValue && value <= endValue
            : value <= (Array.isArray(currentValue) ? currentValue[0] : currentValue);

          return (
            <div
              key={value}
              className={cn(
                'absolute transform',
                vertical ? 'bottom-0 -translate-x-1/2' : 'top-0 -translate-y-1/2'
              )}
              style={{
                [vertical ? 'bottom' : 'left']: `${position}%`,
              }}
            >
              <div
                className={cn(
                  'w-2 h-2 rounded-full border-2 border-white',
                  isInRange && included ? 'bg-blue-500' : 'bg-gray-300'
                )}
              />
              <div
                className={cn(
                  'absolute text-xs text-gray-600 whitespace-nowrap',
                  vertical 
                    ? 'left-4 top-1/2 -translate-y-1/2' 
                    : 'top-4 left-1/2 -translate-x-1/2'
                )}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderHandle = (val: number, type: 'start' | 'end') => {
    const position = getPositionFromValue(val);
    const isActive = dragging === type;
    const shouldShowTooltip = showTooltip || isActive;

    return (
      <div
        className={cn(
          'absolute z-10 transform',
          vertical ? 'bottom-0 -translate-x-1/2' : 'top-0 -translate-y-1/2'
        )}
        style={{
          [vertical ? 'bottom' : 'left']: `${position}%`,
        }}
      >
        <div
          className={cn(
            'w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-grab shadow-md',
            'hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            isActive && 'cursor-grabbing ring-2 ring-blue-500 ring-offset-2',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          onMouseDown={handleMouseDown(type)}
          onTouchStart={handleMouseDown(type) as any}
          tabIndex={disabled ? -1 : 0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={val}
          aria-label={`${type} handle`}
        />
        
        {shouldShowTooltip && (
          <div
            className={cn(
              'absolute z-20 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap',
              vertical 
                ? 'left-8 top-1/2 -translate-y-1/2' 
                : 'bottom-8 left-1/2 -translate-x-1/2'
            )}
          >
            {formatTooltip(val)}
          </div>
        )}
      </div>
    );
  };

  const trackStyle = range ? {
    [vertical ? 'bottom' : 'left']: `${getPositionFromValue(startValue)}%`,
    [vertical ? 'height' : 'width']: `${getPositionFromValue(endValue) - getPositionFromValue(startValue)}%`,
  } : {
    [vertical ? 'height' : 'width']: `${getPositionFromValue(Array.isArray(currentValue) ? currentValue[0] : currentValue)}%`,
  };

  return (
    <div
      className={cn(
        'relative',
        vertical ? 'h-48 w-6 py-2' : 'w-full h-6 px-2',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Track */}
      <div
        ref={sliderRef}
        className={cn(
          'relative bg-gray-200 rounded-full',
          vertical ? 'w-2 h-full mx-auto' : 'h-2 w-full my-auto',
          !disabled && 'cursor-pointer'
        )}
        onClick={handleTrackClick}
      >
        {/* Active track */}
        {included && (
          <div
            className={cn(
              'absolute bg-blue-500 rounded-full',
              vertical ? 'w-full bottom-0' : 'h-full left-0'
            )}
            style={trackStyle}
          />
        )}

        {/* Marks */}
        {renderMarks()}
      </div>

      {/* Handles */}
      {range ? (
        <>
          {renderHandle(startValue, 'start')}
          {renderHandle(endValue, 'end')}
        </>
      ) : (
        renderHandle(Array.isArray(currentValue) ? currentValue[0] : currentValue, 'start')
      )}
    </div>
  );
};