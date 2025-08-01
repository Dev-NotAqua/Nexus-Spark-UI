import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  hover?: boolean;
  clickable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  hover = false,
  clickable = false,
  onClick,
  className = '',
}) => {
  const baseClasses = `${styles.card} ${styles[variant]} ${styles[`padding-${padding}`]}`;
  const hoverClass = hover ? styles.hover : '';
  const clickableClass = clickable ? styles.clickable : '';
  const finalClasses = `${baseClasses} ${hoverClass} ${clickableClass} ${className}`.trim();

  const CardElement = clickable ? 'button' : 'div';

  return (
    <CardElement
      className={finalClasses}
      onClick={clickable ? onClick : undefined}
    >
      {children}
    </CardElement>
  );
};

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`${styles.header} ${className}`}>
    {children}
  </div>
);

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div className={`${styles.body} ${className}`}>
    {children}
  </div>
);

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`${styles.footer} ${className}`}>
    {children}
  </div>
);

export default Card;