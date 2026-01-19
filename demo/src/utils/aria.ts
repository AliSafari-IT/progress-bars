export interface AriaProgressProps {
  role: string
  'aria-valuenow'?: number
  'aria-valuemin'?: number
  'aria-valuemax'?: number
  'aria-valuetext'?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

export function getAriaProps(
  variant: 'determinate' | 'indeterminate',
  value?: number,
  min?: number,
  max?: number,
  ariaLabel?: string,
  ariaLabelledBy?: string,
  ariaValueText?: string
): AriaProgressProps {
  const props: AriaProgressProps = {
    role: 'progressbar',
  }

  if (variant === 'determinate' && value !== undefined) {
    props['aria-valuenow'] = value
    props['aria-valuemin'] = min ?? 0
    props['aria-valuemax'] = max ?? 100
  }

  if (ariaValueText) {
    props['aria-valuetext'] = ariaValueText
  }

  if (ariaLabelledBy) {
    props['aria-labelledby'] = ariaLabelledBy
  } else if (ariaLabel) {
    props['aria-label'] = ariaLabel
  }

  return props
}

export function getAccessibilityWarnings(
  ariaLabel?: string,
  ariaLabelledBy?: string
): string[] {
  const warnings: string[] = []

  if (!ariaLabel && !ariaLabelledBy) {
    warnings.push('Missing accessible name: provide either aria-label or aria-labelledby')
  }

  return warnings
}

export function getScreenReaderAnnouncement(
  variant: 'determinate' | 'indeterminate',
  value?: number,
  min?: number,
  max?: number,
  ariaLabel?: string,
  ariaValueText?: string
): string {
  const name = ariaLabel || 'Progress'
  
  if (variant === 'indeterminate') {
    return ariaValueText 
      ? `${name}: ${ariaValueText}`
      : `${name}: Loading`
  }

  if (value !== undefined) {
    const minVal = min ?? 0
    const maxVal = max ?? 100
    const percentage = Math.round(((value - minVal) / (maxVal - minVal)) * 100)
    
    return ariaValueText
      ? `${name}: ${ariaValueText}`
      : `${name}: ${percentage}%`
  }

  return name
}
