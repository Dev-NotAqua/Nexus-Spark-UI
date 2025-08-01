# Nexus Spark UI

Nexus Spark UI is a modern UI component library built with React, TypeScript, and Tailwind CSS. This library provides a collection of well-designed, accessible, and responsive components that can be easily integrated into your React projects.

## Features
- 🎨 Built with Tailwind CSS for easy customization
- 🔒 Full TypeScript support with comprehensive type definitions
- ♿ Accessibility-first design with ARIA support
- 📱 Responsive and mobile-friendly components
- 🎯 Easy to use and integrate into any React project
- 🎪 Interactive components with keyboard navigation

## Components

### Classic UI Components
- **Button** - Interactive buttons with multiple variants, sizes, and loading states
- **Input** - Text input fields with validation states, labels, and helper text
- **Card** - Flexible content containers with header, body, and footer sections
- **Modal** - Overlay dialogs with backdrop control and keyboard navigation
- **Dropdown** - Selection menus with keyboard navigation and accessibility features
- **Navbar** - Responsive navigation bars with mobile menu support

## Installation
To install Nexus Spark UI, use the following command:
```bash
npm install nexus-spark-ui
```

## Usage

### Basic Example
```tsx
import React from 'react';
import { Button, Input, Card, CardHeader, CardBody } from 'nexus-spark-ui';

const App = () => (
  <Card variant="elevated">
    <CardHeader>
      <h2>Welcome to Nexus Spark UI</h2>
    </CardHeader>
    <CardBody>
      <Input 
        label="Your Name" 
        placeholder="Enter your name" 
        required 
      />
      <Button variant="primary" className="mt-4">
        Submit
      </Button>
    </CardBody>
  </Card>
);
```

### Button Component
```tsx
import { Button } from 'nexus-spark-ui';

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading>Loading...</Button>
```

### Input Component
```tsx
import { Input } from 'nexus-spark-ui';

<Input 
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
  helperText="We'll never share your email"
/>

// Error state
<Input 
  label="Password"
  type="password"
  variant="error"
  error="Password is required"
/>
```

### Modal Component
```tsx
import { useState } from 'react';
import { Modal, Button } from 'nexus-spark-ui';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmation"
        size="md"
      >
        <p>Are you sure you want to continue?</p>
        <div className="flex justify-end space-x-3 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};
```

## Development

### Building the Library
```bash
npm run build
```

### Development Mode
```bash
npm run dev
```

## Tailwind CSS Setup

Make sure your project includes Tailwind CSS. Add the library's path to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/nexus-spark-ui/dist/**/*.{js,jsx,ts,tsx}"
  ],
  // ... rest of your config
};
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request to help improve the library.

## License
This project is licensed under the MIT License.