import { CSSProperties, ReactNode } from 'react'
import type { ProgressTone } from '../ProgressTrack'
import styles from './ConcentricRingProgress.module.css'

export interface ConcentricRing {
  value?: number
  tone?: ProgressTone
  label?: string
  thickness?: number
}

export interface ConcentricRingProgressProps {
  rings: ConcentricRing[]
  size?: number
  ringThickness?: number
  ringGap?: number
  center?: ReactNode
  animate?: boolean
  label?: string
}

export function ConcentricRingProgress({
  rings,
  size = 120,
  ringThickness = 8,
  ringGap = 4,
  center,
  animate = true,
  label,
}: ConcentricRingProgressProps) {
  if (rings.length < 2 || rings.length > 4) {
    console.warn('ConcentricRingProgress: expected between 2 and 4 rings')
  }

  let ringOffset = 0
  const ringData = rings.map((ring) => {
    const thickness = ring.thickness ?? ringThickness
    const radius = size / 2 - ringOffset - thickness / 2
    ringOffset += thickness + ringGap
    const circumference = 2 * Math.PI * radius
    const value = Math.min(100, Math.max(0, ring.value ?? 0))
    return {
      ...ring,
      radius,
      thickness,
      circumference,
      dashoffset: circumference - (value / 100) * circumference,
      value,
    }
  })

  const style: CSSProperties = {
    '--rings-size': `${size}px`,
  } as CSSProperties

  return (
    <div className={styles.container} style={style}>
      <svg
        className={styles.rings}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="group"
        aria-label={label}
      >
        {ringData.map((ring, index) => (
          <g key={index}>
            <circle
              className={styles.track}
              cx={size / 2}
              cy={size / 2}
              r={ring.radius}
              strokeWidth={ring.thickness}
            />
            <circle
              className={`${styles.progress} ${styles[ring.tone || 'brand']} ${
                animate ? '' : styles.noTransition
              }`}
              cx={size / 2}
              cy={size / 2}
              r={ring.radius}
              strokeWidth={ring.thickness}
              strokeDasharray={ring.circumference}
              strokeDashoffset={ring.dashoffset}
              role="progressbar"
              aria-label={ring.label}
              aria-valuenow={ring.value}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </g>
        ))}
      </svg>
      {center && <div className={styles.center}>{center}</div>}
    </div>
  )
}
