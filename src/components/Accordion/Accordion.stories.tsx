import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A collapsible section interface for organizing content into expandable panels.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
    collapsible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-[500px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and is fully accessible
          with keyboard navigation and screen reader support.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the design system but can
          be customized with CSS or Tailwind classes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. The accordion includes smooth animations for expanding and
          collapsing content with CSS transitions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['item-1', 'item-3'],
  },
  render: (args) => (
    <Accordion {...args} className="w-[500px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Features</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-1 text-sm">
            <li>• Fully accessible with ARIA support</li>
            <li>• Keyboard navigation</li>
            <li>• Smooth animations</li>
            <li>• Customizable styling</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Installation</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm">
            <p>Install the package using npm:</p>
            <code className="block bg-gray-100 p-2 rounded">
              npm install nexus-spark-ui
            </code>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Usage</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm">
            <p>Import and use the components:</p>
            <code className="block bg-gray-100 p-2 rounded text-xs">
              {`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'nexus-spark-ui';`}
            </code>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDisabledItem: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-[500px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Available Feature</AccordionTrigger>
        <AccordionContent>
          This feature is available and can be expanded.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Feature</AccordionTrigger>
        <AccordionContent>
          This feature is currently disabled and cannot be expanded.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another Available Feature</AccordionTrigger>
        <AccordionContent>
          This feature is also available and can be expanded.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const SingleNonCollapsible: Story = {
  args: {
    type: 'single',
    collapsible: false,
    defaultValue: 'item-1',
  },
  render: (args) => (
    <Accordion {...args} className="w-[500px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Always Open Section</AccordionTrigger>
        <AccordionContent>
          In non-collapsible mode, at least one section must always be open.
          You can switch between sections but cannot close all of them.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Alternative Section</AccordionTrigger>
        <AccordionContent>
          Click on this trigger to switch to this section. The previous
          section will automatically close.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>
          This demonstrates the non-collapsible behavior where exactly
          one section is always expanded.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};