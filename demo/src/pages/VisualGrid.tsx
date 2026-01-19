import { useState } from 'react'
import { LinearProgress } from '@asafarim/progress-bars'
import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import { copyToClipboard } from '../utils/clipboard'
import styles from './VisualGrid.module.css'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'determinate' | 'indeterminate'

const sizes: Size[] = ['sm', 'md', 'lg']
const variants: Variant[] = ['determinate', 'indeterminate']
const values = [0, 12, 25, 56, 75, 90, 100]
const intents = ['brand', 'success', 'warning', 'danger', 'info'] as const

export function VisualGrid() {
  const [copied, setCopied] = useState(false)

  const handleCopyConfig = async () => {
    const config = {
      theme: document.documentElement.getAttribute('data-theme'),
      contrast: document.documentElement.getAttribute('data-contrast'),
      density: document.documentElement.getAttribute('data-density'),
      direction: document.documentElement.getAttribute('dir'),
      timestamp: new Date().toISOString(),
    }

    const success = await copyToClipboard(JSON.stringify(config, null, 2))
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }


  return (
    <div className={styles.visualGrid}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Visual Regression Grid</h1>
          <p className={styles.subtitle}>
            Deterministic grid of all variants, sizes, and states for screenshot testing
          </p>
        </div>
        <button className={styles.copyButton} onClick={handleCopyConfig}>
          {copied ? '✓ Copied!' : 'Copy Snapshot Config'}
        </button>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sizes × Variants</h2>
        <Card>
          <div className={styles.grid}>
            {sizes.map((size) => (
              <div key={size} className={styles.column}>
                <div className={styles.columnHeader}>
                  <Badge>{size}</Badge>
                </div>
                {variants.map((variant) => (
                  <div key={variant} className={styles.cell}>
                    <div className={styles.cellLabel}>{variant}</div>
                    <LinearProgress
                      variant={variant}
                      size={size}
                      value={variant === 'determinate' ? 50 : undefined}
                      aria-label={`${size} ${variant}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Determinate Values (Medium)</h2>
        <Card>
          <div className={styles.valueGrid}>
            {values.map((value) => (
              <div key={value} className={styles.valueCell}>
                <div className={styles.valueLabel}>{value}%</div>
                <LinearProgress
                  variant="determinate"
                  size="md"
                  value={value}
                  aria-label={`${value} percent`}
                />
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Intent Colors</h2>
        <Card>
          <div className={styles.intentGrid}>
            {intents.map((intent) => (
              <div key={intent} className={styles.intentCell}>
                <div className={styles.intentLabel}>
                  <Badge variant={intent === 'brand' ? 'default' : intent as any}>
                    {intent}
                  </Badge>
                </div>
                <LinearProgress
                  variant="determinate"
                  size="md"
                  value={65}
                  tone={intent}
                  aria-label={`${intent} progress`}
                />
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>All Combinations (Small Sample)</h2>
        <Card>
          <div className={styles.combinationGrid}>
            {sizes.slice(0, 2).map((size) =>
              values.slice(0, 4).map((value) => (
                <div key={`${size}-${value}`} className={styles.combinationCell}>
                  <div className={styles.combinationLabel}>
                    {size} / {value}%
                  </div>
                  <LinearProgress
                    variant="determinate"
                    size={size}
                    value={value}
                    aria-label={`${size} ${value}%`}
                  />
                </div>
              ))
            )}
          </div>
        </Card>
      </section>
    </div>
  )
}
