import styles from './ProgressLabel.module.css'

export interface ProgressLabelProps {
  label?: string
  value?: number
  format?: (value: number) => string
  showValue?: boolean
  srOnly?: boolean
  id?: string
}

export function ProgressLabel({
  label,
  value,
  format = (v) => `${Math.round(v)}%`,
  showValue = true,
  srOnly = false,
  id,
}: ProgressLabelProps) {
  const displayValue = value !== undefined && showValue ? format(value) : null

  if (srOnly) {
    return (
      <span id={id} className={styles.srOnly}>
        {label} {displayValue}
      </span>
    )
  }

  return (
    <div id={id} className={styles.label}>
      {label && <span className={styles.text}>{label}</span>}
      {displayValue && <span className={styles.value}>{displayValue}</span>}
    </div>
  )
}
