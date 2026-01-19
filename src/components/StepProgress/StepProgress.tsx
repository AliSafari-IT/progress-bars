import type { ProgressTone } from '../ProgressTrack'
import styles from './StepProgress.module.css'

export interface StepProgressStep {
  label: string
  tone?: ProgressTone
}

export interface StepProgressProps {
  steps: StepProgressStep[]
  currentStep: number
  variant?: 'dots' | 'bars'
  label?: string
}

export function StepProgress({
  steps,
  currentStep,
  variant = 'dots',
  label,
}: StepProgressProps) {
  return (
    <div
      className={`${styles.stepProgress} ${styles[variant]}`}
      role="progressbar"
      aria-label={label}
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-valuetext={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep]?.label || ''}`}
    >
      {steps.map((step, idx) => {
        const status = idx < currentStep ? 'completed' : idx === currentStep ? 'current' : 'upcoming'
        const tone = step.tone || 'brand'

        return (
          <div key={idx} className={`${styles.step} ${styles[status]}`}>
            <div className={`${styles.indicator} ${styles[tone]}`}>
              {variant === 'dots' && <div className={styles.dot} />}
              {variant === 'bars' && <div className={styles.bar} />}
            </div>
            <div className={styles.label}>{step.label}</div>
            {idx < steps.length - 1 && <div className={styles.connector} />}
          </div>
        )
      })}
    </div>
  )
}
