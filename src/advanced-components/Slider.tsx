import React, { useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import styles from './Slider.module.css';

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  range?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  marks?: Record<number, React.ReactNode> | number[];
  included?: boolean;
  tooltipVisible?: boolean;
  tooltipFormatter?: (value: number) => React.ReactNode;
  onChange?: (value: number | [number, number]) => void;
  onAfterChange?: (value: number | [number, number]) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Slider - Advanced value selection within range component
 * 
 * Features:
 * - Single and range selection modes
 * - Vertical and horizontal orientations
 * - Custom step values and marks
 * - Tooltip display with custom formatting
 * - Keyboard navigation support
 * - Touch/mobile support
 * - Accessible with ARIA attributes
 * - Multiple size variants
 */
export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  range = false,
  disabled = false,
  vertical = false,
  marks,
  included = true,
  tooltipVisible = false,
  tooltipFormatter = (val) => val.toString(),
  onChange,
  onAfterChange,
  className,
  size = 'md'
}) => {
  const [internalValue, setInternalValue] = useState<number | [number, number]>(() => {
    if (value !== undefined) return value;
    if (defaultValue !== undefined) return defaultValue;
    return range ? [min, max] : min;
  });

  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  const normalizeValue = (val: number): number => {
    return Math.min(max, Math.max(min, Math.round((val - min) / step) * step + min));
  };

  const getPercentage = (val: number): number => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromPosition = useCallback((clientX: number, clientY: number): number => {
    if (!sliderRef.current) return min;

    const rect = sliderRef.current.getBoundingClientRect();
    const position = vertical 
      ? (rect.bottom - clientY) / rect.height
      : (clientX - rect.left) / rect.width;

    const value = position * (max - min) + min;
    return normalizeValue(value);
  }, [min, max, step, vertical]);

  const updateValue = useCallback((newValue: number, handleIndex?: number) => {
    let updatedValue: number | [number, number];

    if (range && Array.isArray(currentValue)) {
      updatedValue = [...currentValue] as [number, number];
      if (handleIndex !== undefined) {
        updatedValue[handleIndex] = newValue;
        // Ensure proper order
        if (updatedValue[0] > updatedValue[1]) {
          updatedValue = [updatedValue[1], updatedValue[0]];
        }
      }
    } else {
      updatedValue = newValue;
    }

    if (value === undefined) {
      setInternalValue(updatedValue);
    }
    onChange?.(updatedValue);
  }, [currentValue, range, value, onChange]);

  const handleMouseDown = (event: React.MouseEvent, handleIndex?: number) => {
    if (disabled) return;

    event.preventDefault();
    setIsDragging(handleIndex ?? 0);
    setShowTooltip(true);

    const handleMouseMove = (e: MouseEvent) => {
      const newValue = getValueFromPosition(e.clientX, e.clientY);
      updateValue(newValue, handleIndex);
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      setShowTooltip(false);
      onAfterChange?.(currentValue);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleKeyDown = (event: React.KeyboardEvent, handleIndex?: number) => {
    if (disabled) return;

    let delta = 0;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -step;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        delta = step;
        break;
      case 'PageDown':
        delta = -(max - min) / 10;
        break;
      case 'PageUp':
        delta = (max - min) / 10;
        break;
      case 'Home':
        delta = min - (Array.isArray(currentValue) ? currentValue[handleIndex ?? 0] : currentValue);
        break;
      case 'End':
        delta = max - (Array.isArray(currentValue) ? currentValue[handleIndex ?? 0] : currentValue);
        break;
      default:
        return;
    }

    event.preventDefault();
    const currentVal = Array.isArray(currentValue) ? currentValue[handleIndex ?? 0] : currentValue;
    const newValue = normalizeValue(currentVal + delta);
    updateValue(newValue, handleIndex);
  };

  const renderHandle = (val: number, index?: number) => {
    const percentage = getPercentage(val);
    const isActive = isDragging === (index ?? 0);

    return (
      <div
        key={`handle-${index ?? 0}`}
        className={clsx(
          styles.handle,
          styles[size],
          {
            [styles.active]: isActive,
            [styles.disabled]: disabled
          }
        )}
        style={{
          [vertical ? 'bottom' : 'left']: `${percentage}%`
        }}
        onMouseDown={(e) => handleMouseDown(e, index)}
        onKeyDown={(e) => handleKeyDown(e, index)}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={val}
        aria-valuetext={tooltipFormatter(val)?.toString() || val.toString()}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        aria-disabled={disabled}
      >
        {(tooltipVisible || showTooltip) && (
          <div className={clsx(styles.tooltip, styles[size])}>
            {tooltipFormatter(val)}
          </div>
        )}
      </div>
    );
  };

  const renderTrack = () => {
    if (!included) return null;

    let startPercentage = 0;
    let endPercentage = 100;

    if (Array.isArray(currentValue)) {
      startPercentage = getPercentage(currentValue[0]);
      endPercentage = getPercentage(currentValue[1]);
    } else {
      endPercentage = getPercentage(currentValue);
    }

    return (
      <div
        className={clsx(styles.track, styles[size])}
        style={{
          [vertical ? 'bottom' : 'left']: `${startPercentage}%`,
          [vertical ? 'height' : 'width']: `${endPercentage - startPercentage}%`
        }}
      />
    );
  };

  const renderMarks = () => {
    if (!marks) return null;

    const markPositions = Array.isArray(marks) 
      ? marks.map(mark => ({ value: mark, label: mark }))
      : Object.entries(marks).map(([value, label]) => ({ value: Number(value), label }));

    return (
      <div className={styles.marks}>
        {markPositions.map(({ value, label }) => {
          const percentage = getPercentage(value);
          const isIncluded = Array.isArray(currentValue)
            ? value >= currentValue[0] && value <= currentValue[1]
            : value <= currentValue;

          return (
            <div
              key={value}
              className={clsx(
                styles.mark,
                styles[size],
                { [styles.included]: included && isIncluded }
              )}
              style={{
                [vertical ? 'bottom' : 'left']: `${percentage}%`
              }}
            >
              <div className={styles.markDot} />
              <div className={styles.markLabel}>{label}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div 
      className={clsx(
        styles.slider,
        styles[size],
        {
          [styles.vertical]: vertical,
          [styles.disabled]: disabled
        },
        className
      )}
      ref={sliderRef}
    >
      <div className={clsx(styles.rail, styles[size])} />
      {renderTrack()}
      {renderMarks()}
      
      {Array.isArray(currentValue) ? (
        <>
          {renderHandle(currentValue[0], 0)}
          {renderHandle(currentValue[1], 1)}
        </>
      ) : (
        renderHandle(currentValue)
      )}
    </div>
  );
};