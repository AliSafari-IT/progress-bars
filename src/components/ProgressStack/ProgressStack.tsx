import { CSSProperties } from 'react'
import type { ProgressTone } from '../ProgressTrack'
import styles from './ProgressStack.module.css'

export interface ProgressStackItem {
  value: number
  tone?: ProgressTone
  label?: string
}

export interface ProgressStackProps {
  items: ProgressStackItem[]
  height?: number
  label?: string
}

export function ProgressStack({ items, height = 12, label }: ProgressStackProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0)
  const normalizedItems = items.map((item) => ({
    ...item,
    percentage: (item.value / 100) * 100,
  }))

  const style: CSSProperties = {
    '--stack-height': `${height}px`,
  } as CSSProperties

  return (
    <div
      className={styles.stack}
      style={style}
      role="progressbar"
      aria-label={label}
      aria-valuenow={total}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {normalizedItems.map((item, idx) => (
        <div
          key={idx}
          className={`${styles.item} ${styles[item.tone || 'brand']}`}
          style={{ width: `${item.percentage}%` }}
          title={item.label}
        />
      ))}
    </div>
  )
}
