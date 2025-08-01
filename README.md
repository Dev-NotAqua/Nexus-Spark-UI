# Nexus Spark UI

Nexus Spark UI is a modern React UI library that provides a collection of reusable components built with TypeScript and Tailwind CSS. This library aims to streamline the development process by offering a variety of pre-designed, accessible, and customizable components.

## Features
- 🎨 Built with Tailwind CSS for easy customization
- 📱 Responsive and mobile-friendly components
- ♿ Accessible components following best practices
- 🔧 TypeScript support with full type definitions
- 📚 Storybook documentation and examples
- 🎯 Easy to use and integrate into any React project

## Components

### Button
A versatile button component with multiple variants and sizes.
- Variants: `primary`, `secondary`, `danger`, `outline`
- Sizes: `small`, `medium`, `large`
- Features: disabled state, custom click handlers

### Input
A text input component with validation states and helper text.
- Types: `text`, `email`, `password`, `number`, `tel`, `url`
- Sizes: `small`, `medium`, `large`
- Features: labels, helper text, error states, disabled state

### Modal
A dialog/modal component with backdrop and keyboard interaction.
- Sizes: `small`, `medium`, `large`, `fullscreen`
- Features: backdrop click to close, escape key to close, customizable close button

### Card
A container component for displaying content with multiple sections.
- Variants: `default`, `bordered`, `elevated`, `outlined`
- Padding options: `none`, `small`, `medium`, `large`
- Features: clickable cards, hover effects, header/body/footer sections

### Dropdown
A dropdown menu component for selecting options.
- Sizes: `small`, `medium`, `large`
- Features: searchable options, disabled options, error states, helper text

### Navbar
A responsive navigation bar component.
- Variants: `default`, `dark`, `transparent`
- Positions: `static`, `fixed`, `sticky`
- Features: brand logo, mobile menu, active states, disabled items

## Installation
To install Nexus Spark UI, use the following command:
```bash
npm install nexus-spark-ui
```

## Usage
Here's an example of how to use components from the library:

```jsx
import { Button, Input, Card, Modal, Dropdown, Navbar } from 'nexus-spark-ui';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  const navItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
  ];

  return (
    <div>
      <Navbar 
        brand={<span>My App</span>}
        items={navItems}
      />
      
      <Card>
        <h2>Welcome</h2>
        <Input 
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <Dropdown
          label="Choose option"
          options={dropdownOptions}
          placeholder="Select..."
        />
        <Button onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>
      </Card>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <p>This is modal content!</p>
      </Modal>
    </div>
  );
};
```

## Development

### Building the Library
```bash
npm run build
```

### Running Storybook
```bash
npm run storybook
```

### Development Mode
```bash
npm run dev
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request to help improve the library.

## License
This project is licensed under the MIT License.