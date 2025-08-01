import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The variant/state of the input
   */
  variant?: 'default' | 'error' | 'success';
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Error message displayed when variant is 'error'
   */
  error?: string;
  /**
   * Whether the input is required
   */
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  variant = 'default',
  label,
  helperText,
  error,
  required = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm';
  
  const variantClasses = {
    default: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
    error: 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500',
    success: 'border-green-300 text-green-900 placeholder-green-300 focus:ring-green-500 focus:border-green-500'
  };
  
  const inputClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();
  const displayError = variant === 'error' && error;
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        className={inputClasses}
        aria-invalid={variant === 'error'}
        aria-describedby={
          displayError ? `${inputId}-error` : 
          helperText ? `${inputId}-helper` : undefined
        }
        required={required}
        {...props}
      />
      
      {displayError && (
        <p 
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
      
      {helperText && !displayError && (
        <p 
          id={`${inputId}-helper`}
          className="mt-1 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export { Input };