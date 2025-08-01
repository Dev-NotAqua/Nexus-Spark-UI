import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownOption } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: DropdownOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

const countryOptions: DropdownOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

const optionsWithDisabled: DropdownOption[] = [
  { value: 'available1', label: 'Available Option 1' },
  { value: 'available2', label: 'Available Option 2' },
  { value: 'disabled1', label: 'Disabled Option', disabled: true },
  { value: 'available3', label: 'Available Option 3' },
  { value: 'disabled2', label: 'Another Disabled Option', disabled: true },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Choose an option...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
  },
};

export const PreSelected: Story = {
  args: {
    label: 'Preferred Country',
    options: countryOptions,
    value: 'us',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    helperText: 'Choose your current country of residence',
  },
};

export const Error: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    error: true,
    helperText: 'Please select a country',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Dropdown',
    options: sampleOptions,
    placeholder: 'This dropdown is disabled',
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Options with Some Disabled',
    options: optionsWithDisabled,
    placeholder: 'Select an option',
    helperText: 'Some options are disabled and cannot be selected',
  },
};

export const Small: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Small dropdown',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Large dropdown',
    size: 'large',
  },
};