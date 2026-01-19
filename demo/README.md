# Progress Bars Demo Application

Interactive demo and showcase for the `@asafarim/progress-bars` component library. This application demonstrates all available progress components with live examples and interactive controls.

## Overview

The demo app is a React application built with Vite that showcases every component in the progress-bars library. It provides:

- **Live Component Examples**: Interactive demonstrations of all progress components
- **Property Controls**: Adjust component props in real-time to see changes
- **Multiple Variants**: View different sizes, tones, and states
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility Examples**: Shows proper ARIA usage and semantic HTML

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

From the workspace root:

```bash
pnpm install
```

### Development

Run the demo app in development mode:

```bash
pnpm demo
```

This command:

1. Builds the main progress-bars package
2. Starts the Vite dev server on `http://localhost:5173`
3. Hot-reloads on file changes

Alternatively, from the demo directory:

```bash
cd demo
pnpm dev
```

### Build

Build the demo for production:

```bash
pnpm build
```

The built files will be in `demo/dist/`.

### Preview

Preview the production build locally:

```bash
pnpm preview
```

## Project Structure

```text
demo/
├── src/
│   ├── components/          # Demo component pages
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── App.css              # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Features

### Component Showcase Pages

Each progress component has a dedicated showcase page with:

- **Basic Example**: Simple usage pattern
- **Variants**: Different component states and configurations
- **Interactive Controls**: Live property adjustments
- **Code Examples**: Copy-paste ready code snippets
- **Accessibility Notes**: ARIA attributes and best practices

### Demonstrated Components

- **LinearProgress**: Horizontal progress bars with determinate/indeterminate states
- **CircularProgress**: Circular progress indicators with optional labels
- **VerticalProgress**: Vertical progress bars
- **SegmentedProgress**: Discrete segment-based progress
- **StepProgress**: Multi-step progress indicators
- **Spinner**: Animated loading spinners
- **ProgressTrack**: Base progress track component
- **ProgressLabel**: Label overlays for progress
- **ProgressLegend**: Legend and status information
- **ProgressStack**: Stacked progress components

### Interactive Controls

Each component page includes controls to:

- Adjust progress value (0-100)
- Change component size (sm, md, lg)
- Select color tone (brand, success, warning, error, info)
- Toggle variants (determinate/indeterminate)
- Enable/disable animations and effects
- Customize thickness and dimensions

## Technologies

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router**: Navigation between component pages
- **@asafarim/design-tokens**: Design system tokens
- **@asafarim/progress-bars**: Progress components library
- **CSS Modules**: Component styling

## Development Workflow

### Adding a New Component Example

1. Create a new file in `src/components/` (e.g., `NewComponentDemo.tsx`)
2. Import the component from `@asafarim/progress-bars`
3. Create interactive controls using React state
4. Add the page to the router in `App.tsx`
5. Include code examples and documentation

### Styling

The demo uses CSS Modules for component-scoped styling. Global styles are in `App.css` and use design tokens from `@asafarim/design-tokens`.

### Testing Components

To test a component during development:

1. Run `pnpm demo` from the workspace root
2. Navigate to the component's demo page
3. Use interactive controls to test different states
4. Check browser console for any warnings or errors
5. Verify accessibility with screen readers

## Building for Production

The demo is configured to deploy to GitHub Pages. The build process:

1. Builds the main package
2. Compiles TypeScript
3. Bundles with Vite
4. Outputs to `dist/` directory

## Environment Variables

Currently, no environment variables are required. Configuration is handled through `vite.config.ts`.

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, the demo script will attempt to kill the process. If this fails:

```bash
# Manually kill the process on port 5173
# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -ti:5173 | xargs kill -9
```

### Build Errors

If you encounter build errors:

1. Clear node_modules and reinstall:

   ```bash
   pnpm clean
   pnpm install
   ```

2. Clear Vite cache:

   ```bash
   rm -rf demo/dist demo/.vite
   ```

3. Rebuild the package:

   ```bash
   pnpm run build
   ```

### Hot Reload Not Working

Ensure you're running from the workspace root with `pnpm demo`, not from the demo directory.

## Performance

The demo app is optimized for:

- **Fast Development**: Vite's instant HMR (Hot Module Replacement)
- **Small Bundle**: Tree-shaking and code splitting
- **Responsive UI**: Efficient React rendering with proper memoization

## Accessibility

The demo showcases accessible progress components:

- Proper ARIA roles and attributes
- Keyboard navigation support
- Screen reader friendly
- Color-independent progress indication
- Semantic HTML structure

## Contributing

When adding new component examples:

1. Follow existing code style and patterns
2. Include TypeScript types
3. Add accessibility attributes
4. Provide interactive controls
5. Document component usage
6. Test on multiple browsers

## License

MIT

## Related

- [Progress Bars Package](../README.md) - Main component library documentation
- [GitHub Repository](https://github.com/alisafari-it/progress-bars)
- [Live Demo](https://alisafari-it.github.io/progress-bars)
