import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  size?: 'small' | 'medium' | 'large';
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
  name?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder = 'Select an option...',
  disabled = false,
  error = false,
  label,
  helperText,
  size = 'medium',
  onChange,
  className = '',
  id,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownId = id || `dropdown-${Math.random().toString(36).substr(2, 9)}`;

  const selectedOption = options.find(option => option.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: DropdownOption) => {
    if (!option.disabled) {
      setSelectedValue(option.value);
      setIsOpen(false);
      onChange?.(option.value);
    }
  };

  const triggerClasses = `${styles.trigger} ${styles[size]} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''} ${className}`.trim();

  return (
    <div className={styles.dropdownContainer}>
      {label && (
        <label htmlFor={dropdownId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.dropdown} ref={dropdownRef}>
        <button
          id={dropdownId}
          type="button"
          className={triggerClasses}
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={selectedOption ? styles.selectedText : styles.placeholderText}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className={styles.menu}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`${styles.option} ${option.disabled ? styles.optionDisabled : ''} ${selectedValue === option.value ? styles.optionSelected : ''}`}
                onClick={() => handleSelect(option)}
                disabled={option.disabled}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {helperText && (
        <span className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Dropdown;