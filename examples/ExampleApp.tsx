import React, { useState } from 'react';
import { 
  Button, 
  Input, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter,
  Modal,
  Dropdown,
  Navbar 
} from '../src/index';

/**
 * Example component demonstrating usage of all Nexus Spark UI components
 */
const ExampleApp: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  
  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'disabled', label: 'Disabled Option', disabled: true }
  ];
  
  const navItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Disabled', href: '/disabled', disabled: true }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Example */}
      <Navbar
        brand="Nexus Spark UI"
        items={navItems}
        rightContent={
          <Button variant="primary" size="sm">
            Sign In
          </Button>
        }
        onItemClick={(item) => console.log('Clicked:', item.label)}
      />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Component Examples</h1>
        
        {/* Button Examples */}
        <Card variant="elevated">
          <CardHeader>
            <h2 className="text-xl font-semibold">Button Component</h2>
          </CardHeader>
          <CardBody>
            <div className="space-x-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
            <div className="mt-4 space-x-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardBody>
        </Card>
        
        {/* Input Examples */}
        <Card variant="elevated">
          <CardHeader>
            <h2 className="text-xl font-semibold">Input Component</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4 max-w-md">
              <Input
                label="Default Input"
                placeholder="Enter text here"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="Required Input"
                placeholder="Required field"
                required
                helperText="This field is required"
              />
              <Input
                label="Error State"
                placeholder="Invalid input"
                variant="error"
                error="This field has an error"
              />
              <Input
                label="Success State"
                placeholder="Valid input"
                variant="success"
                helperText="This field is valid"
              />
            </div>
          </CardBody>
        </Card>
        
        {/* Dropdown Example */}
        <Card variant="elevated">
          <CardHeader>
            <h2 className="text-xl font-semibold">Dropdown Component</h2>
          </CardHeader>
          <CardBody>
            <div className="max-w-md">
              <Dropdown
                label="Select Option"
                options={dropdownOptions}
                value={dropdownValue}
                onChange={setDropdownValue}
                placeholder="Choose an option"
                required
              />
              <p className="mt-2 text-sm text-gray-600">
                Selected: {dropdownValue || 'None'}
              </p>
            </div>
          </CardBody>
        </Card>
        
        {/* Modal Example */}
        <Card variant="elevated">
          <CardHeader>
            <h2 className="text-xl font-semibold">Modal Component</h2>
          </CardHeader>
          <CardBody>
            <Button onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
          </CardBody>
        </Card>
        
        {/* Card Examples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <h3 className="text-lg font-medium">Default Card</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">This is a default card with no special styling.</p>
            </CardBody>
            <CardFooter>
              <Button variant="outline" size="sm">Action</Button>
            </CardFooter>
          </Card>
          
          <Card variant="outlined">
            <CardHeader>
              <h3 className="text-lg font-medium">Outlined Card</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">This card has a border outline.</p>
            </CardBody>
            <CardFooter>
              <Button variant="primary" size="sm">Action</Button>
            </CardFooter>
          </Card>
          
          <Card variant="elevated" interactive>
            <CardHeader>
              <h3 className="text-lg font-medium">Interactive Card</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">This card is interactive with hover effects.</p>
            </CardBody>
            <CardFooter>
              <Button variant="secondary" size="sm">Action</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Example Modal"
        size="md"
      >
        <div className="space-y-4">
          <p>This is an example modal dialog. You can close it by clicking the X button, pressing Escape, or clicking outside the modal.</p>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExampleApp;