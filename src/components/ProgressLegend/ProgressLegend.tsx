import type { ProgressTone } from '../ProgressTrack'
import styles from './ProgressLegend.module.css'

export interface ProgressLegendItem {
  tone?: ProgressTone
  label: string
  value?: number
}

export interface ProgressLegendProps {
  items: ProgressLegendItem[]
  layout?: 'row' | 'column'
}

export function ProgressLegend({ items, layout = 'row' }: ProgressLegendProps) {
  return (
    <div className={`${styles.legend} ${styles[layout]}`}>
      {items.map((item, idx) => (
        <div key={idx} className={styles.item}>
          <div className={`${styles.swatch} ${styles[item.tone || 'brand']}`} />
          <span className={styles.label}>{item.label}</span>
          {item.value !== undefined && (
            <span className={styles.value}>{item.value}%</span>
          )}
        </div>
      ))}
    </div>
  )
}
