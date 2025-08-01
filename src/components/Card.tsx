import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant for different styling
   */
  variant?: 'default' | 'outlined' | 'elevated';
  /**
   * Whether the card should be interactive (hoverable)
   */
  interactive?: boolean;
  /**
   * Card content
   */
  children: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  interactive = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'rounded-lg overflow-hidden transition-all';
  
  const variantClasses = {
    default: 'bg-white',
    outlined: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-md'
  };
  
  const interactiveClasses = interactive 
    ? 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1' 
    : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`.trim();
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={`px-6 py-4 border-b border-gray-200 ${className}`.trim()} 
      {...props}
    >
      {children}
    </div>
  );
};

const CardBody: React.FC<CardBodyProps> = ({ 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={`px-6 py-4 ${className}`.trim()} 
      {...props}
    >
      {children}
    </div>
  );
};

const CardFooter: React.FC<CardFooterProps> = ({ 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`.trim()} 
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardBody, CardFooter };