import React from 'react';
import { CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';
import { cn } from '../../utils';

// Types
export interface ProgressBarProps {
  value: number;
  max?: number;
  min?: number;
  size?: 'small' | 'default' | 'large';
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  showLabel?: boolean;
  showPercentage?: boolean;
  showValue?: boolean;
  label?: string;
  indeterminate?: boolean;
  striped?: boolean;
  animated?: boolean;
  className?: string;
  barClassName?: string;
  labelClassName?: string;
}

// ProgressBar component
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  min = 0,
  size = 'default',
  variant = 'default',
  showLabel = false,
  showPercentage = false,
  showValue = false,
  label,
  indeterminate = false,
  striped = false,
  animated = false,
  className,
  barClassName,
  labelClassName,
}) => {
  // Calculate percentage
  const normalizedValue = Math.max(min, Math.min(max, value));
  const percentage = ((normalizedValue - min) / (max - min)) * 100;

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-1';
      case 'large':
        return 'h-4';
      default:
        return 'h-2';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getVariantIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getVariantTextColor = () => {
    switch (variant) {
      case 'success':
        return 'text-green-700';
      case 'warning':
        return 'text-yellow-700';
      case 'error':
        return 'text-red-700';
      case 'info':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  };

  const renderLabel = () => {
    if (!showLabel && !label && !showPercentage && !showValue) return null;

    const displayText = label || '';
    const percentageText = showPercentage ? `${Math.round(percentage)}%` : '';
    const valueText = showValue ? `${normalizedValue}/${max}` : '';
    
    const parts = [displayText, valueText, percentageText].filter(Boolean);
    const text = parts.join(' ');

    return (
      <div className={cn(
        'flex items-center justify-between mb-1 text-sm',
        getVariantTextColor(),
        labelClassName
      )}>
        <div className="flex items-center gap-2">
          {getVariantIcon()}
          <span>{text}</span>
        </div>
        {(showPercentage || showValue) && !label && (
          <span className="font-medium">
            {showValue && `${normalizedValue}/${max}`}
            {showValue && showPercentage && ' '}
            {showPercentage && `${Math.round(percentage)}%`}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={cn('w-full', className)} role="progressbar" aria-valuenow={normalizedValue} aria-valuemin={min} aria-valuemax={max}>
      {renderLabel()}
      
      <div className={cn(
        'relative overflow-hidden rounded-full bg-gray-200',
        getSizeClasses()
      )}>
        {indeterminate ? (
          <div
            className={cn(
              'absolute inset-y-0 w-1/3 rounded-full',
              getVariantClasses(),
              'animate-pulse'
            )}
            style={{
              animation: 'progress-indeterminate 2s ease-in-out infinite',
            }}
          />
        ) : (
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-out',
              getVariantClasses(),
              striped && 'bg-stripes',
              animated && striped && 'animate-stripes',
              barClassName
            )}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
};

// CircularProgress component
export interface CircularProgressProps {
  value: number;
  max?: number;
  min?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  showLabel?: boolean;
  showPercentage?: boolean;
  label?: string;
  indeterminate?: boolean;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  min = 0,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showLabel = true,
  showPercentage = true,
  label,
  indeterminate = false,
  className,
}) => {
  const normalizedValue = Math.max(min, Math.min(max, value));
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return 'stroke-green-500';
      case 'warning':
        return 'stroke-yellow-500';
      case 'error':
        return 'stroke-red-500';
      case 'info':
        return 'stroke-blue-500';
      default:
        return 'stroke-blue-500';
    }
  };

  const getVariantTextColor = () => {
    switch (variant) {
      case 'success':
        return 'text-green-700';
      case 'warning':
        return 'text-yellow-700';
      case 'error':
        return 'text-red-700';
      case 'info':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        role="progressbar"
        aria-valuenow={normalizedValue}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-gray-200"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={cn(
            'fill-none transition-all duration-300 ease-out',
            getVariantColor(),
            indeterminate && 'animate-spin'
          )}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: indeterminate ? circumference * 0.75 : strokeDashoffset,
            strokeLinecap: 'round',
          }}
        />
      </svg>
      
      {(showLabel || showPercentage) && (
        <div className={cn(
          'absolute inset-0 flex flex-col items-center justify-center text-center',
          getVariantTextColor()
        )}>
          {showPercentage && (
            <div className="text-lg font-semibold">
              {indeterminate ? '...' : `${Math.round(percentage)}%`}
            </div>
          )}
          {label && showLabel && (
            <div className="text-xs text-gray-500 mt-1">
              {label}
            </div>
          )}
        </div>
      )}
    </div>
  );
};