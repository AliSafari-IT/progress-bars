import { CSSProperties } from 'react'
import type { ProgressTone } from '../ProgressTrack'
import styles from './SegmentedProgress.module.css'

export interface SegmentedProgressSegment {
  value: number
  tone?: ProgressTone
  label?: string
}

export interface SegmentedProgressProps {
  segments: SegmentedProgressSegment[]
  max?: number
  height?: number
  gap?: number
  rounded?: boolean
  label?: string
}

export function SegmentedProgress({
  segments,
  max = 100,
  height = 10,
  gap = 2,
  rounded = true,
  label,
}: SegmentedProgressProps) {
  const total = segments.reduce((sum, seg) => sum + seg.value, 0)
  const normalizedSegments = segments.map((seg) => ({
    ...seg,
    percentage: (seg.value / max) * 100,
  }))

  const style: CSSProperties = {
    '--segmented-height': `${height}px`,
    '--segmented-gap': `${gap}px`,
  } as CSSProperties

  return (
    <div
      className={`${styles.segmented} ${rounded ? styles.rounded : ''}`}
      style={style}
      role="progressbar"
      aria-label={label}
      aria-valuenow={total}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      {normalizedSegments.map((seg, idx) => (
        <div
          key={idx}
          className={`${styles.segment} ${styles[seg.tone || 'brand']}`}
          style={{ width: `${seg.percentage}%` }}
          title={seg.label}
        />
      ))}
    </div>
  )
}
