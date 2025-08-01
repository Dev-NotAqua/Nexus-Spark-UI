import React, { useState } from 'react';
import styles from './Navbar.module.css';

export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface NavbarProps {
  brand?: React.ReactNode;
  items?: NavItem[];
  variant?: 'default' | 'dark' | 'transparent';
  position?: 'static' | 'fixed' | 'sticky';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onBrandClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  items = [],
  variant = 'default',
  position = 'static',
  size = 'medium',
  className = '',
  onBrandClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navbarClasses = `${styles.navbar} ${styles[variant]} ${styles[position]} ${styles[size]} ${className}`.trim();

  const handleItemClick = (item: NavItem) => {
    if (item.disabled) return;
    
    if (item.onClick) {
      item.onClick();
    }
    
    // Close mobile menu when an item is clicked
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={navbarClasses}>
      <div className={styles.container}>
        {/* Brand */}
        {brand && (
          <div className={styles.brand} onClick={onBrandClick}>
            {brand}
          </div>
        )}

        {/* Desktop Navigation */}
        {items.length > 0 && (
          <div className={styles.nav}>
            {items.map((item, index) => (
              <NavLink key={index} item={item} onItemClick={handleItemClick} />
            ))}
          </div>
        )}

        {/* Mobile Menu Button */}
        {items.length > 0 && (
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              className={styles.hamburger}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      {items.length > 0 && isMobileMenuOpen && (
        <div className={styles.mobileNav}>
          {items.map((item, index) => (
            <NavLink key={index} item={item} onItemClick={handleItemClick} mobile />
          ))}
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  item: NavItem;
  onItemClick: (item: NavItem) => void;
  mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onItemClick, mobile = false }) => {
  const linkClasses = `${mobile ? styles.mobileNavItem : styles.navItem} ${item.active ? styles.active : ''} ${item.disabled ? styles.disabled : ''}`.trim();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onItemClick(item);
  };

  if (item.href && !item.onClick) {
    return (
      <a
        href={item.href}
        className={linkClasses}
        onClick={item.disabled ? (e) => e.preventDefault() : undefined}
      >
        {item.label}
      </a>
    );
  }

  return (
    <button
      className={linkClasses}
      onClick={handleClick}
      disabled={item.disabled}
    >
      {item.label}
    </button>
  );
};

export default Navbar;