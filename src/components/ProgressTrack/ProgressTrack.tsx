import { CSSProperties, ReactNode } from 'react'
import styles from './ProgressTrack.module.css'

export type ProgressTone = 'brand' | 'success' | 'warning' | 'danger' | 'neutral' | 'info'
export type ProgressVariant = 'linear' | 'circular' | 'vertical'

export interface ProgressTrackProps {
  className?: string
  style?: CSSProperties
  thickness?: number
  radius?: number
  variant?: ProgressVariant
  tone?: ProgressTone
  showBg?: boolean
  children?: ReactNode
}

export function ProgressTrack({
  className,
  style,
  thickness = 8,
  radius,
  variant = 'linear',
  tone = 'brand',
  showBg = true,
  children,
}: ProgressTrackProps) {
  const combinedStyle: CSSProperties = {
    ...style,
    '--pb-track-thickness': `${thickness}px`,
    '--pb-track-radius': radius ? `${radius}px` : undefined,
  } as CSSProperties

  return (
    <div
      className={`${styles.track} ${styles[variant]} ${styles[tone]} ${!showBg ? styles.noBg : ''} ${className || ''}`}
      style={combinedStyle}
    >
      {children}
    </div>
  )
}
