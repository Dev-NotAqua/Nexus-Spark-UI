# Nexus Spark UI

Nexus Spark UI is a comprehensive UI library that provides a collection of reusable React components built with TypeScript and Tailwind CSS. This library aims to streamline the development process by offering a variety of pre-designed, accessible, and customizable components.

## Features

- **🎨 Modern Design**: Clean, contemporary UI components following modern design principles
- **♿ Accessibility First**: All components follow WAI-ARIA guidelines and support keyboard navigation
- **🎯 TypeScript**: Full TypeScript support with comprehensive type definitions
- **🎨 Tailwind CSS**: Built with Tailwind CSS for easy customization and theming
- **📱 Responsive**: All components are responsive and mobile-friendly
- **🔧 Modular**: Import only what you need to keep bundle sizes small
- **📚 Storybook**: Comprehensive documentation and examples via Storybook

## Components

### Navigation & Layout
- **Tabs**: Horizontal/vertical tabbed navigation with keyboard support
- **Accordion**: Single/multiple collapsible sections with smooth animations

### Data Display
- **Table**: Feature-rich data table with sorting, custom renderers, and responsive design
- **Pagination**: Complete pagination with size changer, quick jumper, and responsive layout

### Feedback & Overlays
- **Tooltip**: Smart-positioned tooltips with customizable content and delays
- **Toast Notifications**: Rich notifications with types, actions, and auto-dismiss

### Form Controls
- **Slider**: Single/range slider with marks, tooltips, and vertical orientation
- **DatePicker**: Calendar interface with optional time picker and constraints
- **FileUpload**: Drag-and-drop file upload with progress tracking and validation

### Indicators
- **Progress Bar**: Linear and circular progress indicators with variants and animations

## Installation

```bash
npm install nexus-spark-ui
```

## Quick Start

```jsx
import { Button, Toast, ToastProvider } from 'nexus-spark-ui';
import 'nexus-spark-ui/dist/style.css'; // Import styles

function App() {
  return (
    <ToastProvider>
      <div className="p-4">
        <Button onClick={() => toast.success('Hello World!')}>
          Click me
        </Button>
      </div>
    </ToastProvider>
  );
}
```

## Documentation

Visit our [Storybook documentation](https://nexus-spark-ui-storybook.vercel.app) for comprehensive examples and API references.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Build library
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## Component Examples

### Tabs
```jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'nexus-spark-ui';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Toast Notifications
```jsx
import { ToastProvider, useToastActions } from 'nexus-spark-ui';

function MyComponent() {
  const { success, error } = useToastActions();
  
  return (
    <button onClick={() => success('Success!', 'Operation completed')}>
      Show Toast
    </button>
  );
}
```

### Data Table
```jsx
import { Table } from 'nexus-spark-ui';

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sorter: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'status', title: 'Status', render: (status) => <Badge>{status}</Badge> }
];

<Table columns={columns} dataSource={data} rowKey="id" />
```

## Browser Support

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.