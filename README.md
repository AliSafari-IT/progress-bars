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

### ThresholdProgressBar

Progress bar that maps numeric ranges to threshold colors, smooth gradients, or sharp status states.

**Props:**

- `value: number` - Current value
- `thresholds: Array<{ threshold: number; color: string }>` - Color breakpoints
- `min?: number` - Minimum range value (default: `0`)
- `max?: number` - Maximum range value (default: `100`)
- `interpolation?: 'smooth' | 'step'` - Gradient interpolation mode
- `markers?: Array<{ value: number; label?: string; color?: string }>` - Target markers
- `showMarkerLabels?: boolean` - Display marker labels
- `size?: 'sm' | 'md' | 'lg'` - Bar size
- `thickness?: number` - Custom track thickness
- `label?: string` - Accessible progress label

**Example:**

```tsx
<ThresholdProgressBar
  value={82}
  thresholds={[
    { threshold: 0, color: 'var(--asm-color-success-700)' },
    { threshold: 75, color: 'var(--asm-color-warning-700)' },
    { threshold: 90, color: 'var(--asm-color-danger-700)' },
  ]}
  markers={[{ value: 80, label: 'Quota target' }]}
  label="Storage usage"
/>
```

### StepProgress

Stepper component showing progress through a multi-step workflow.

**Props:**

- `steps: Array<{ label: string; tone?: ProgressTone; completed?: boolean }>` - Step definitions
- `currentStep: number` - Current active step index
- `variant?: 'dots' | 'bars'` - Indicator style
- `orientation?: 'horizontal' | 'vertical'` - Step layout
- `size?: 'sm' | 'md' | 'lg'` - Indicator size
- `showConnectors?: boolean` - Show lines between steps
- `clickable?: boolean` - Make steps interactive when `onStepClick` is provided
- `onStepClick?: (step: number) => void` - Handle step selection
- `label?: string` - Accessible progress label

**Example:**

```tsx
<StepProgress
  steps={[
    { label: 'Account', completed: true },
    { label: 'Profile', completed: true },
    { label: 'Review' }
  ]}
  currentStep={2}
  orientation="horizontal"
  clickable
  onStepClick={(step) => setCurrentStep(step)}
  label="Setup progress"
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
