import React, { useState } from 'react';
import { 
  Button, 
  Input, 
  Modal, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Dropdown, 
  Navbar 
} from './index';

const Demo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const navItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'Components', href: '/components' },
    { label: 'Documentation', href: '/docs' },
    { label: 'About', href: '/about' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar 
        brand={
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded"></div>
            <span className="text-xl font-bold text-gray-900">Nexus Spark UI</span>
          </div>
        }
        items={navItems}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Hero Card */}
        <Card variant="elevated" className="text-center">
          <CardHeader>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to Nexus Spark UI
            </h1>
          </CardHeader>
          <CardBody>
            <p className="text-lg text-gray-600 mb-6">
              A modern React UI library with beautiful, accessible components
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="primary" size="large">
                Get Started
              </Button>
              <Button variant="outline" size="large">
                View Docs
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Interactive Demo */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Demo */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Form Components</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                label="Your Name"
                placeholder="Enter your name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              
              <Dropdown
                label="Choose an Option"
                options={dropdownOptions}
                value={selectedValue}
                onChange={setSelectedValue}
                placeholder="Select an option..."
              />
              
              <div className="flex space-x-2">
                <Button 
                  variant="primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  Open Modal
                </Button>
                <Button variant="secondary">
                  Submit
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Button Showcase */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Button Variants</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="small">Primary</Button>
                  <Button variant="secondary" size="small">Secondary</Button>
                  <Button variant="danger" size="small">Danger</Button>
                  <Button variant="outline" size="small">Outline</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Sizes</h3>
                <div className="flex flex-wrap gap-2 items-center">
                  <Button size="small">Small</Button>
                  <Button size="medium">Medium</Button>
                  <Button size="large">Large</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Card Showcase */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="default" hover>
            <CardBody>
              <h3 className="font-semibold mb-2">Default Card</h3>
              <p className="text-gray-600 text-sm">Basic card with shadow</p>
            </CardBody>
          </Card>
          
          <Card variant="bordered" hover>
            <CardBody>
              <h3 className="font-semibold mb-2">Bordered Card</h3>
              <p className="text-gray-600 text-sm">Card with border styling</p>
            </CardBody>
          </Card>
          
          <Card variant="elevated" hover>
            <CardBody>
              <h3 className="font-semibold mb-2">Elevated Card</h3>
              <p className="text-gray-600 text-sm">Card with larger shadow</p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        size="medium"
      >
        <div className="space-y-4">
          <p>
            This is an example modal showcasing the Modal component. 
            It features backdrop click to close, escape key support, and customizable content.
          </p>
          
          <Input 
            label="Modal Input"
            placeholder="Try typing here..."
          />
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary"
              onClick={() => setIsModalOpen(false)}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Demo;