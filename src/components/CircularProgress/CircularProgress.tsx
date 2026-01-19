import { CSSProperties } from 'react'
import type { ProgressTone } from '../ProgressTrack'
import styles from './CircularProgress.module.css'

export interface CircularProgressProps {
  value?: number
  size?: number
  thickness?: number
  tone?: ProgressTone
  label?: string
  showLabel?: boolean
  formatValue?: (value: number) => string
}

export function CircularProgress({
  value,
  size = 56,
  thickness = 6,
  tone = 'brand',
  label,
  showLabel = false,
  formatValue = (v) => `${Math.round(v)}%`,
}: CircularProgressProps) {
  const isIndeterminate = value === undefined
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const progress = isIndeterminate ? 0 : Math.min(100, Math.max(0, value))
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const style: CSSProperties = {
    '--circular-size': `${size}px`,
    '--circular-thickness': `${thickness}px`,
    '--circular-circumference': `${circumference}px`,
    '--circular-offset': `${strokeDashoffset}px`,
  } as CSSProperties

  const ariaProps = isIndeterminate
    ? { role: 'status', 'aria-busy': 'true' as const }
    : {
        role: 'progressbar' as const,
        'aria-valuenow': progress,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
      }

  return (
    <div className={styles.container}>
      <svg
        className={`${styles.circular} ${styles[tone]} ${isIndeterminate ? styles.indeterminate : ''}`}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={style}
        aria-label={label}
        {...ariaProps}
      >
        <circle
          className={styles.track}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          fill="none"
        />
        <circle
          className={styles.progress}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          fill="none"
        />
      </svg>
      {showLabel && !isIndeterminate && (
        <div className={styles.labelOverlay}>{formatValue(progress)}</div>
      )}
    </div>
  )
}
