import { CSSProperties } from 'react'
import type { ProgressTone } from '../ProgressTrack'
import styles from './VerticalProgress.module.css'

export interface VerticalProgressProps {
  value?: number
  height?: number | string
  width?: number
  tone?: ProgressTone
  label?: string
}

export function VerticalProgress({
  value,
  height = 200,
  width = 8,
  tone = 'brand',
  label,
}: VerticalProgressProps) {
  const isIndeterminate = value === undefined
  const progress = isIndeterminate ? 0 : Math.min(100, Math.max(0, value))

  const style: CSSProperties = {
    '--vertical-height': typeof height === 'number' ? `${height}px` : height,
    '--vertical-width': `${width}px`,
    '--vertical-progress': `${progress}%`,
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
    <div
      className={`${styles.vertical} ${styles[tone]} ${isIndeterminate ? styles.indeterminate : ''}`}
      style={style}
      aria-label={label}
      {...ariaProps}
    >
      <div className={styles.fill} />
    </div>
  )
}
