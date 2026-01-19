# @asafarim/progress-bars

![npm version](https://img.shields.io/npm/v/@asafarim/progress-bars) ![GitHub release](https://img.shields.io/github/release/alisafari-it/progress-bars)

A comprehensive React component library for displaying progress indicators with multiple styles and configurations. Built with TypeScript, styled with design tokens, and fully accessible.

## Features

- **Multiple Progress Components**: Linear, Circular, Vertical, Segmented, Step, and Spinner variants
- **Fully Accessible**: ARIA attributes and semantic HTML for screen readers
- **Design Token Integration**: Uses `@asafarim/design-tokens` for consistent styling
- **TypeScript Support**: Full type safety with exported interfaces
- **Flexible Styling**: CSS Modules with customizable sizes, tones, and animations
- **React 18+**: Built for modern React with hooks support

## Installation

```bash
npm install @asafarim/progress-bars
```

or with pnpm:

```bash
pnpm add @asafarim/progress-bars
```

## Demo & Examples

- **Live Demo**: [https://alisafari-it.github.io/progress-bars/](https://alisafari-it.github.io/progress-bars/)
- **Interactive Playground**: Test components with live configuration
- **Accessibility Examples**: See ARIA implementations
- **Visual Grid**: Compare all variants and styles

## Quick Start

### LinearProgress

```tsx
import { LinearProgress } from '@asafarim/progress-bars';
import '@asafarim/progress-bars/dist/style.css';

export function MyComponent() {
  return (
    <>
      {/* Determinate progress */}
      <LinearProgress value={65} />

      {/* Indeterminate loading state */}
      <LinearProgress variant="indeterminate" />

      {/* With striped animation */}
      <LinearProgress value={45} striped animated />
    </>
  );
}
```

### CircularProgress

```tsx
import { CircularProgress } from '@asafarim/progress-bars';

export function MyComponent() {
  return (
    <>
      {/* Determinate circular progress */}
      <CircularProgress value={75} size={80} showLabel />

      {/* Indeterminate spinner */}
      <CircularProgress size={56} />
    </>
  );
}
```

## Components

### LinearProgress

Horizontal progress bar with determinate and indeterminate variants.

**Props:**

- `variant?: 'determinate' | 'indeterminate'` - Progress type (default: `'determinate'`)
- `size?: 'sm' | 'md' | 'lg'` - Bar height (default: `'md'`)
- `tone?: ProgressTone` - Color tone (default: `'brand'`)
- `value?: number` - Current progress value (0-100, default: `0`)
- `min?: number` - Minimum value (default: `0`)
- `max?: number` - Maximum value (default: `100`)
- `striped?: boolean` - Show striped pattern (default: `false`)
- `animated?: boolean` - Animate stripes (default: `false`)
- `thickness?: number` - Custom track height in pixels
- `ariaLabel?: string` - Accessible name
- `ariaLabelledBy?: string` - ID of labeling element
- `ariaValueText?: string` - Text for indeterminate state (default: `'Loading'`)

**Usage Example:**

```tsx
<LinearProgress
  value={60}
  size="lg"
  tone="success"
  striped
  animated
  ariaLabel="File upload progress"
/>
```

### CircularProgress

Circular progress indicator with optional label overlay.

**Props:**

- `value?: number` - Progress percentage (0-100, undefined for indeterminate)
- `size?: number` - SVG size in pixels (default: `56`)
- `thickness?: number` - Stroke width in pixels (default: `6`)
- `tone?: ProgressTone` - Color tone (default: `'brand'`)
- `label?: string` - Accessible label
- `showLabel?: boolean` - Display percentage text (default: `false`)
- `formatValue?: (value: number) => string` - Custom value formatter

**Usage Example:**

```tsx
<CircularProgress
  value={85}
  size={120}
  thickness={8}
  tone="success"
  showLabel
  formatValue={(v) => `${v}%`}
/>
```

### VerticalProgress

Vertical progress bar (similar to LinearProgress but vertical orientation).

**Props:** Same as LinearProgress

**Example:**

```tsx
<VerticalProgress value={50} size="lg" />
```

### SegmentedProgress

Progress bar divided into discrete segments.

**Props:**

- `value?: number` - Current progress value
- `segments?: number` - Number of segments (default: `5`)
- `tone?: ProgressTone` - Color tone
- `size?: 'sm' | 'md' | 'lg'` - Bar size

**Example:**

```tsx
<SegmentedProgress value={3} segments={5} />
```

### StepProgress

Multi-step progress indicator showing completion status.

**Props:**

- `steps?: Array<{ label: string; completed?: boolean }>` - Step definitions
- `currentStep?: number` - Current active step
- `tone?: ProgressTone` - Color tone

**Example:**

```tsx
<StepProgress
  steps={[
    { label: 'Step 1', completed: true },
    { label: 'Step 2', completed: true },
    { label: 'Step 3' }
  ]}
  currentStep={2}
/>
```

### Spinner

Animated loading spinner.

**Props:**

- `size?: number` - Size in pixels (default: `40`)
- `tone?: ProgressTone` - Color tone
- `ariaLabel?: string` - Accessible label

**Example:**

```tsx
<Spinner size={48} tone="brand" ariaLabel="Loading" />
```

### ProgressTrack

Base component for custom progress implementations.

### ProgressLabel

Label component for progress indicators.

### ProgressLegend

Legend component for displaying progress information.

### ProgressStack

Container for stacking multiple progress components.

## Tones

Available color tones (from design tokens):

- `'brand'` - Primary brand color
- `'success'` - Success/positive state
- `'warning'` - Warning state
- `'error'` - Error/negative state
- `'info'` - Informational state

## Styling

The package uses CSS Modules and design tokens for styling. Import the styles:

```tsx
import '@asafarim/progress-bars/dist/style.css';
```

Styles are automatically scoped to components and use CSS custom properties from `@asafarim/design-tokens`.

## Accessibility

All components include:

- Proper ARIA roles and attributes
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly labels
- Color-independent progress indication

**Example with accessibility:**

```tsx
<LinearProgress
  value={50}
  ariaLabel="Download progress"
  ariaLabelledBy="progress-label"
/>
<div id="progress-label">Downloading file...</div>
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  LinearProgressProps,
  CircularProgressProps,
  ProgressTone
} from '@asafarim/progress-bars';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Ali Safari <ali@asafarim.com>

## Repository

[GitHub](https://github.com/alisafari-it/progress-bars)

## Homepage

[Demo & Documentation](https://alisafari-it.github.io/progress-bars)
