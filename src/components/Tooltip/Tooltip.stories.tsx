import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipProvider } from './Tooltip';
import { Info, Settings, HelpCircle, User } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A hoverable popup that provides additional information about an element.',
      },
    },
  },
  argTypes: {
    side: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end'],
    },
    delayDuration: {
      control: { type: 'range', min: 0, max: 2000, step: 100 },
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    side: 'top',
    align: 'center',
    delayDuration: 500,
    disabled: false,
  },
  render: (args) => (
    <TooltipProvider>
      <div className="p-20">
        <Tooltip {...args}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Hover me
          </button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex items-center justify-center space-x-8 p-20">
        <Tooltip content="User information" side="top">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
            <User className="w-5 h-5" />
          </button>
        </Tooltip>
        
        <Tooltip content="Settings and preferences" side="top">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
            <Settings className="w-5 h-5" />
          </button>
        </Tooltip>
        
        <Tooltip content="Get help and support" side="top">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
            <HelpCircle className="w-5 h-5" />
          </button>
        </Tooltip>
        
        <Tooltip content="Additional information about this feature" side="top">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
            <Info className="w-5 h-5" />
          </button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const AllSides: Story = {
  render: () => (
    <TooltipProvider>
      <div className="grid grid-cols-2 gap-8 p-20">
        <div className="flex justify-center">
          <Tooltip content="Tooltip on top" side="top">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
              Top
            </button>
          </Tooltip>
        </div>
        
        <div className="flex justify-center">
          <Tooltip content="Tooltip on bottom" side="bottom">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
              Bottom
            </button>
          </Tooltip>
        </div>
        
        <div className="flex justify-center">
          <Tooltip content="Tooltip on left" side="left">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
              Left
            </button>
          </Tooltip>
        </div>
        
        <div className="flex justify-center">
          <Tooltip content="Tooltip on right" side="right">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
              Right
            </button>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <TooltipProvider>
      <div className="p-20">
        <Tooltip
          content={
            <div className="space-y-1">
              <div className="font-semibold">User Profile</div>
              <div className="text-sm text-gray-300">
                View and edit your profile information
              </div>
            </div>
          }
          side="bottom"
        >
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Profile
          </button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const DifferentAlignments: Story = {
  render: () => (
    <TooltipProvider>
      <div className="space-y-8 p-20">
        <div className="flex justify-center space-x-4">
          <Tooltip content="Start aligned tooltip" side="bottom" align="start">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
              Start
            </button>
          </Tooltip>
          
          <Tooltip content="Center aligned tooltip" side="bottom" align="center">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
              Center
            </button>
          </Tooltip>
          
          <Tooltip content="End aligned tooltip" side="bottom" align="end">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
              End
            </button>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex space-x-4 p-20">
        <Tooltip content="Fast tooltip (100ms delay)" delayDuration={100}>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Fast
          </button>
        </Tooltip>
        
        <Tooltip content="Normal tooltip (500ms delay)" delayDuration={500}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Normal
          </button>
        </Tooltip>
        
        <Tooltip content="Slow tooltip (1000ms delay)" delayDuration={1000}>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Slow
          </button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const Disabled: Story = {
  render: () => (
    <TooltipProvider>
      <div className="p-20">
        <Tooltip content="This tooltip is disabled" disabled>
          <button className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed">
            Disabled Tooltip
          </button>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};