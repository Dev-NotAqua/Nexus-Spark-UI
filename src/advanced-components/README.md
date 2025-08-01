# Advanced UI Components

This directory contains advanced UI components for the Nexus Spark UI library. Each component is built with TypeScript, React, and Tailwind CSS, following modern accessibility and design principles.

## Components

### 1. Tabs
Tabbed navigation interface with keyboard support and multiple variants.
- **Features**: Multiple variants (default, pills, underline), keyboard navigation, disabled tabs
- **Files**: `Tabs.tsx`, `Tabs.module.css`

### 2. Accordion
Collapsible section interface for organizing content.
- **Features**: Single/multiple expansion, keyboard navigation, smooth animations
- **Files**: `Accordion.tsx`, `Accordion.module.css`

### 3. Tooltip
Hoverable popup for displaying additional information.
- **Features**: Multiple positioning, trigger types, dark/light variants
- **Files**: `Tooltip.tsx`, `Tooltip.module.css`

### 4. Toast Notifications
Temporary auto-disappearing messages for user feedback.
- **Features**: Multiple types, auto-dismiss, progress bars, positioning
- **Files**: `Toast.tsx`, `Toast.module.css`

### 5. Table
Data display table with sorting and custom rendering.
- **Features**: Column sorting, custom cell rendering, loading states, responsive
- **Files**: `Table.tsx`, `Table.module.css`

### 6. Pagination
Page navigation control for large datasets.
- **Features**: Page size options, quick jumper, ellipsis for large page counts
- **Files**: `Pagination.tsx`, `Pagination.module.css`

### 7. Slider
Value selection within a range with draggable handles.
- **Features**: Single/range selection, vertical/horizontal, marks, tooltips
- **Files**: `Slider.tsx`, `Slider.module.css`

### 8. Progress Bar
Visual progress representation with multiple display types.
- **Features**: Line/circle/dashboard types, status colors, animations
- **Files**: `ProgressBar.tsx`, `ProgressBar.module.css`

### 9. Date Picker
Date selection interface with calendar popup.
- **Features**: Calendar navigation, date validation, keyboard support
- **Files**: `DatePicker.tsx`, `DatePicker.module.css`

### 10. File Upload
File input component with drag-and-drop support.
- **Features**: Drag & drop, file validation, previews, progress indication
- **Files**: `FileUpload.tsx`, `FileUpload.module.css`

## Design Principles

### Accessibility
- ARIA attributes and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### Responsive Design
- Mobile-first approach
- Flexible layouts
- Touch-friendly interactions

### TypeScript Support
- Full type definitions
- Strict typing
- IntelliSense support

### Customization
- Multiple size variants (sm, md, lg)
- Theme support through CSS variables
- Configurable behavior
- Custom styling options

## Usage

```typescript
import { Tabs, Accordion, Toast } from 'nexus-spark-ui';

// Tabs example
const tabs = [
  { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
  { id: 'tab2', label: 'Tab 2', content: 'Content 2' }
];

<Tabs tabs={tabs} defaultActiveTab="tab1" />

// Accordion example
const items = [
  { id: 'item1', title: 'Section 1', content: 'Content 1' },
  { id: 'item2', title: 'Section 2', content: 'Content 2' }
];

<Accordion items={items} allowMultiple />

// Toast example
const toasts = [
  { id: '1', message: 'Success!', type: 'success' }
];

<ToastContainer toasts={toasts} position="top-right" />
```

## Development

All components follow the same structure:
- TypeScript component file (.tsx)
- CSS Module file (.module.css)
- Proper prop interfaces
- JSDoc documentation
- Accessibility features
- Responsive design