import React from 'react';
import clsx from 'clsx';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  percent: number;
  status?: 'normal' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  strokeWidth?: number;
  showInfo?: boolean;
  format?: (percent: number) => React.ReactNode;
  strokeColor?: string | { from: string; to: string };
  trailColor?: string;
  type?: 'line' | 'circle' | 'dashboard';
  width?: number;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  animated?: boolean;
  className?: string;
}

/**
 * ProgressBar - Advanced visual progress representation component
 * 
 * Features:
 * - Multiple types (line, circle, dashboard)
 * - Different status states (normal, success, error, warning)
 * - Customizable colors and gradients
 * - Progress text with custom formatting
 * - Animation support
 * - Multiple sizes
 * - Accessible with ARIA attributes
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  status = 'normal',
  size = 'md',
  strokeWidth,
  showInfo = true,
  format,
  strokeColor,
  trailColor,
  type = 'line',
  width = 120,
  gapDegree = 75,
  gapPosition = 'bottom',
  animated = false,
  className
}) => {
  const normalizedPercent = Math.min(100, Math.max(0, percent));

  const getStrokeWidth = () => {
    if (strokeWidth) return strokeWidth;
    
    switch (size) {
      case 'sm':
        return type === 'line' ? 4 : 6;
      case 'lg':
        return type === 'line' ? 12 : 8;
      default:
        return type === 'line' ? 8 : 6;
    }
  };

  const getStrokeColor = () => {
    if (strokeColor) {
      return typeof strokeColor === 'string' ? strokeColor : undefined;
    }

    switch (status) {
      case 'success':
        return '#22c55e';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      default:
        return '#3b82f6';
    }
  };

  const formatPercent = (value: number): React.ReactNode => {
    if (format) return format(value);
    return `${Math.round(value)}%`;
  };

  const renderLineProgress = () => {
    const strokeWidthValue = getStrokeWidth();
    const color = getStrokeColor();

    return (
      <div className={clsx(styles.lineContainer, className)}>
        <div className={clsx(styles.lineOuter, styles[size])}>
          <div 
            className={clsx(styles.lineInner, styles[status])}
            style={{
              height: strokeWidthValue,
              backgroundColor: trailColor
            }}
          >
            <div
              className={clsx(
                styles.lineBg,
                styles[status],
                { [styles.animated]: animated }
              )}
              style={{
                width: `${normalizedPercent}%`,
                backgroundColor: color,
                background: typeof strokeColor === 'object' 
                  ? `linear-gradient(to right, ${strokeColor.from}, ${strokeColor.to})`
                  : undefined
              }}
            />
          </div>
        </div>
        
        {showInfo && (
          <div className={clsx(styles.progressText, styles[size])}>
            {formatPercent(normalizedPercent)}
          </div>
        )}
      </div>
    );
  };

  const renderCircleProgress = () => {
    const strokeWidthValue = getStrokeWidth();
    const color = getStrokeColor();
    const radius = (width - strokeWidthValue) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (normalizedPercent / 100) * circumference;

    return (
      <div 
        className={clsx(styles.circleContainer, className)}
        style={{ width, height: width }}
      >
        <svg
          width={width}
          height={width}
          className={styles.circleSvg}
          role="img"
          aria-labelledby="progress-title"
        >
          <title id="progress-title">Progress: {formatPercent(normalizedPercent)}</title>
          
          {/* Background circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            strokeWidth={strokeWidthValue}
            stroke={trailColor || '#f3f4f6'}
            fill="transparent"
            className={styles.circleTrail}
          />
          
          {/* Progress circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            strokeWidth={strokeWidthValue}
            stroke={color}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={clsx(
              styles.circlePath,
              styles[status],
              { [styles.animated]: animated }
            )}
            transform={`rotate(-90 ${width / 2} ${width / 2})`}
          />
        </svg>
        
        {showInfo && (
          <div className={clsx(styles.circleText, styles[size])}>
            {formatPercent(normalizedPercent)}
          </div>
        )}
      </div>
    );
  };

  const renderDashboardProgress = () => {
    const strokeWidthValue = getStrokeWidth();
    const color = getStrokeColor();
    const radius = (width - strokeWidthValue) / 2;
    const gapRad = (gapDegree * Math.PI) / 180;
    const dashboardCircumference = 2 * Math.PI * radius - gapRad * radius;
    const strokeDasharray = dashboardCircumference;
    const strokeDashoffset = dashboardCircumference - (normalizedPercent / 100) * dashboardCircumference;

    const getRotation = () => {
      switch (gapPosition) {
        case 'left':
          return 'rotate(135deg)';
        case 'right':
          return 'rotate(-45deg)';
        case 'top':
          return 'rotate(225deg)';
        default: // bottom
          return 'rotate(45deg)';
      }
    };

    return (
      <div 
        className={clsx(styles.circleContainer, className)}
        style={{ width, height: width }}
      >
        <svg
          width={width}
          height={width}
          className={styles.circleSvg}
          role="img"
          aria-labelledby="progress-title"
        >
          <title id="progress-title">Progress: {formatPercent(normalizedPercent)}</title>
          
          {/* Background circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            strokeWidth={strokeWidthValue}
            stroke={trailColor || '#f3f4f6'}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={0}
            className={styles.circleTrail}
            style={{ transform: getRotation(), transformOrigin: 'center' }}
          />
          
          {/* Progress circle */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            strokeWidth={strokeWidthValue}
            stroke={color}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={clsx(
              styles.circlePath,
              styles[status],
              { [styles.animated]: animated }
            )}
            style={{ transform: getRotation(), transformOrigin: 'center' }}
          />
        </svg>
        
        {showInfo && (
          <div className={clsx(styles.circleText, styles[size])}>
            {formatPercent(normalizedPercent)}
          </div>
        )}
      </div>
    );
  };

  const renderProgress = () => {
    switch (type) {
      case 'circle':
        return renderCircleProgress();
      case 'dashboard':
        return renderDashboardProgress();
      default:
        return renderLineProgress();
    }
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={normalizedPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={formatPercent(normalizedPercent)?.toString() || ''}
    >
      {renderProgress()}
    </div>
  );
};