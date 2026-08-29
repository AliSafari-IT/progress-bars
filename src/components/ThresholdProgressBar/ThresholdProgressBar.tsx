import { forwardRef, useMemo, type CSSProperties, type HTMLAttributes } from 'react'
import styles from './ThresholdProgressBar.module.css'

export type ThresholdInterpolation = 'smooth' | 'step'
export type ThresholdProgressBarSize = 'sm' | 'md' | 'lg'

export interface ThresholdProgressThreshold {
  threshold: number
  color: string
}

export interface ThresholdProgressMarker {
  value: number
  label?: string
  color?: string
}

export interface ThresholdProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: number
  thresholds: ThresholdProgressThreshold[]
  min?: number
  max?: number
  interpolation?: ThresholdInterpolation
  markers?: ThresholdProgressMarker[]
  showMarkerLabels?: boolean
  size?: ThresholdProgressBarSize
  thickness?: number
  label?: string
}

interface NormalizedThreshold extends ThresholdProgressThreshold {
  position: number
}

interface NormalizedMarker extends ThresholdProgressMarker {
  position: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getRange(value: number, min: number, max: number) {
  const safeMin = Number.isFinite(min) ? min : 0
  const safeMax = Number.isFinite(max) && max > safeMin ? max : safeMin + 100
  const safeValue = Number.isFinite(value) ? clamp(value, safeMin, safeMax) : safeMin

  return {
    min: safeMin,
    max: safeMax,
    value: safeValue,
    percentage: ((safeValue - safeMin) / (safeMax - safeMin)) * 100,
  }
}

function normalizeThresholds(
  thresholds: ThresholdProgressThreshold[],
  min: number,
  max: number,
): NormalizedThreshold[] {
  return thresholds
    .filter((item) => Number.isFinite(item.threshold) && Boolean(item.color))
    .map((item) => ({
      ...item,
      threshold: clamp(item.threshold, min, max),
      position: ((clamp(item.threshold, min, max) - min) / (max - min)) * 100,
    }))
    .sort((a, b) => a.threshold - b.threshold)
}

function normalizeMarkers(
  markers: ThresholdProgressMarker[],
  min: number,
  max: number,
): NormalizedMarker[] {
  return markers
    .filter((marker) => Number.isFinite(marker.value))
    .map((marker) => ({
      ...marker,
      value: clamp(marker.value, min, max),
      position: ((clamp(marker.value, min, max) - min) / (max - min)) * 100,
    }))
}

export const ThresholdProgressBar = forwardRef<HTMLDivElement, ThresholdProgressBarProps>(function ThresholdProgressBar(
  {
    value,
    thresholds,
    min = 0,
    max = 100,
    interpolation = 'smooth',
    markers = [],
    showMarkerLabels = true,
    size = 'md',
    thickness,
    label,
    className,
    style,
    ...rest
  },
  ref,
) {
  const range = useMemo(() => getRange(value, min, max), [value, min, max])
  const normalizedThresholds = useMemo(
    () => normalizeThresholds(thresholds, range.min, range.max),
    [thresholds, range.min, range.max],
  )
  const normalizedMarkers = useMemo(
    () => normalizeMarkers(markers, range.min, range.max),
    [markers, range.min, range.max],
  )

  const currentThreshold = normalizedThresholds.reduce<NormalizedThreshold | undefined>(
    (active, item) => (item.threshold <= range.value ? item : active),
    normalizedThresholds[0],
  )
  const gradient = normalizedThresholds.length > 0
    ? normalizedThresholds.length === 1
      ? normalizedThresholds[0].color
      : `linear-gradient(to right, ${normalizedThresholds
          .map((item) => `${item.color} ${item.position}%`)
          .join(', ')})`
    : 'var(--asm-color-brand-primary-700)'
  const barBackground = interpolation === 'smooth'
    ? gradient
    : currentThreshold?.color ?? 'var(--asm-color-brand-primary-700)'
  const rootClassName = [
    styles.root,
    styles[`size_${size}`],
    showMarkerLabels && normalizedMarkers.some((marker) => marker.label) && styles.withMarkerLabels,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const rootStyle: CSSProperties = {
    ...style,
    ...(thickness ? { '--tp-track-height': `${thickness}px` } as CSSProperties : {}),
  }
  const barStyle: CSSProperties = {
    width: `${range.percentage}%`,
    background: barBackground,
  }

  return (
    <div
      ref={ref}
      className={rootClassName}
      style={rootStyle}
      role="progressbar"
      aria-label={label ?? 'Threshold progress'}
      aria-valuenow={range.value}
      aria-valuemin={range.min}
      aria-valuemax={range.max}
      aria-valuetext={`${range.value} of ${range.max}`}
      data-threshold={currentThreshold?.threshold}
      {...rest}
    >
      <div className={styles.track}>
        <div className={styles.bar} style={barStyle} />
        {normalizedMarkers.length > 0 && (
          <div className={styles.markers} aria-hidden="true">
            {normalizedMarkers.map((marker, index) => (
              <div
                key={`${marker.value}-${index}`}
                className={styles.marker}
                style={{
                  '--tp-marker-position': `${marker.position}%`,
                  '--tp-marker-color': marker.color ?? 'var(--asm-color-text)',
                } as CSSProperties}
              >
                <span className={styles.markerLine} />
                {showMarkerLabels && marker.label && (
                  <span className={styles.markerLabel}>{marker.label}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})
