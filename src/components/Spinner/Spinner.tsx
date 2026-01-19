import { CSSProperties } from 'react'
import type { ProgressTone } from '../ProgressTrack'
import styles from './Spinner.module.css'

export interface SpinnerProps {
  size?: number
  thickness?: number
  tone?: ProgressTone
  label?: string
}

export function Spinner({
  size = 24,
  thickness = 3,
  tone = 'brand',
  label = 'Loading',
}: SpinnerProps) {
  const style: CSSProperties = {
    '--spinner-size': `${size}px`,
    '--spinner-thickness': `${thickness}px`,
  } as CSSProperties

  return (
    <div
      className={`${styles.spinner} ${styles[tone]}`}
      style={style}
      role="status"
      aria-label={label}
      aria-busy="true"
    >
      <div className={styles.circle} />
    </div>
  )
}
