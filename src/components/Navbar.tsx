import React, { useState } from 'react';

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  disabled?: boolean;
}

export interface NavbarProps {
  /**
   * Brand/logo content (text or component)
   */
  brand?: React.ReactNode;
  /**
   * Navigation items
   */
  items?: NavItem[];
  /**
   * Additional content to display on the right side
   */
  rightContent?: React.ReactNode;
  /**
   * Whether the navbar has a border bottom
   */
  bordered?: boolean;
  /**
   * Whether the navbar is fixed to the top
   */
  fixed?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Function called when a nav item is clicked
   */
  onItemClick?: (item: NavItem) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  brand,
  items = [],
  rightContent,
  bordered = true,
  fixed = false,
  className = '',
  onItemClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleItemClick = (item: NavItem) => {
    if (item.disabled) return;
    onItemClick?.(item);
    setIsMobileMenuOpen(false); // Close mobile menu on item click
  };
  
  const baseClasses = 'bg-white';
  const fixedClasses = fixed ? 'fixed top-0 left-0 right-0 z-40' : '';
  const borderClasses = bordered ? 'border-b border-gray-200' : '';
  
  const navbarClasses = `${baseClasses} ${fixedClasses} ${borderClasses} ${className}`.trim();
  
  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand/Logo */}
          {brand && (
            <div className="flex-shrink-0">
              <div className="text-xl font-bold text-gray-900">
                {brand}
              </div>
            </div>
          )}
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item);
                  }}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${item.disabled 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : item.active
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }
                  `.trim()}
                  aria-current={item.active ? 'page' : undefined}
                  tabIndex={item.disabled ? -1 : 0}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          
          {/* Right Content */}
          {rightContent && (
            <div className="hidden md:block">
              {rightContent}
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 bg-gray-50">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item);
                }}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium transition-colors
                  ${item.disabled 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : item.active
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }
                `.trim()}
                aria-current={item.active ? 'page' : undefined}
                tabIndex={item.disabled ? -1 : 0}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile Right Content */}
            {rightContent && (
              <div className="pt-4 pb-3 border-t border-gray-200">
                {rightContent}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export { Navbar };