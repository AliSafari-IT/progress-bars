import type { ProgressTone } from '../ProgressTrack'
import styles from './StepProgress.module.css'

export type StepProgressVariant = 'dots' | 'bars'
export type StepProgressOrientation = 'horizontal' | 'vertical'
export type StepProgressSize = 'sm' | 'md' | 'lg'

export interface StepProgressStep {
  label: string
  tone?: ProgressTone
  completed?: boolean
}

export interface StepProgressProps {
  steps: StepProgressStep[]
  currentStep: number
  variant?: StepProgressVariant
  orientation?: StepProgressOrientation
  size?: StepProgressSize
  showConnectors?: boolean
  clickable?: boolean
  onStepClick?: (step: number) => void
  label?: string
}

export function StepProgress({
  steps,
  currentStep,
  variant = 'dots',
  orientation = 'horizontal',
  size = 'md',
  showConnectors = true,
  clickable = false,
  onStepClick,
  label,
}: StepProgressProps) {
  const activeStep = steps.length === 0
    ? -1
    : Number.isFinite(currentStep)
      ? Math.min(Math.max(Math.trunc(currentStep), 0), steps.length - 1)
      : 0
  const isClickable = clickable && Boolean(onStepClick)
  const currentLabel = activeStep >= 0 ? steps[activeStep]?.label ?? '' : 'No steps'

  return (
    <div
      className={`${styles.stepProgress} ${styles[orientation]} ${styles[size]} ${styles[variant]}`}
      role="progressbar"
      aria-label={label ?? 'Progress steps'}
      aria-valuenow={activeStep >= 0 ? activeStep + 1 : 0}
      aria-valuemin={steps.length > 0 ? 1 : 0}
      aria-valuemax={steps.length}
      aria-valuetext={
        activeStep >= 0
          ? `Step ${activeStep + 1} of ${steps.length}: ${currentLabel}`
          : 'No steps'
      }
    >
      {steps.map((step, idx) => {
        const isCompleted = step.completed ?? idx < activeStep
        const status = isCompleted
          ? 'completed'
          : idx === activeStep
            ? 'current'
            : 'upcoming'
        const tone = step.tone ?? 'brand'
        const content = (
          <>
            <div className={styles.indicator}>
              {variant === 'dots' && <div className={styles.dot} />}
              {variant === 'bars' && <div className={styles.bar} />}
            </div>
            <div className={styles.label}>{step.label}</div>
          </>
        )

        return (
          <div
            key={idx}
            className={`${styles.step} ${styles[status]} ${styles[tone]}`}
            aria-current={status === 'current' ? 'step' : undefined}
          >
            {isClickable ? (
              <button
                type="button"
                className={styles.stepButton}
                onClick={() => onStepClick?.(idx)}
              >
                {content}
              </button>
            ) : content}
            {showConnectors && idx < steps.length - 1 && (
              <div className={styles.connector} aria-hidden="true" />
            )}
          </div>
        )
      })}
    </div>
  )
}
