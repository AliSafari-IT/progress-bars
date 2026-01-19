import { useState } from 'react'
import { LinearProgress } from '@asafarim/progress-bars'
import { Card } from '../components/Card'
import { Panel } from '../components/Panel'
import { Field } from '../components/Field'
import { Badge } from '../components/Badge'
import { getAriaProps, getAccessibilityWarnings, getScreenReaderAnnouncement } from '../utils/aria'
import styles from './LinearPlayground.module.css'

export function LinearPlayground() {
  const [variant, setVariant] = useState<'determinate' | 'indeterminate'>('determinate')
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [value, setValue] = useState(50)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)
  const [showLabel, setShowLabel] = useState(true)
  const [ariaLabel, setAriaLabel] = useState('Upload progress')
  const [ariaValueText, setAriaValueText] = useState('')
  const [width, setWidth] = useState<'auto' | '240' | '480' | '100%'>('480')
  const [intent, setIntent] = useState<'default' | 'success' | 'warning' | 'danger' | 'info'>('default')
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSimulateUpload = () => {
    setIsAnimating(true)
    setValue(0)
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnimating(false)
          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  const handleRandom = () => {
    setValue(Math.floor(Math.random() * 101))
  }

  const ariaProps = getAriaProps(
    variant,
    variant === 'determinate' ? value : undefined,
    min,
    max,
    showLabel ? undefined : ariaLabel,
    showLabel ? 'progress-label' : undefined,
    ariaValueText || undefined
  )

  const warnings = getAccessibilityWarnings(
    showLabel ? 'Progress' : ariaLabel,
    showLabel ? 'progress-label' : undefined
  )

  const srAnnouncement = getScreenReaderAnnouncement(
    variant,
    variant === 'determinate' ? value : undefined,
    min,
    max,
    showLabel ? 'Progress' : ariaLabel,
    ariaValueText || undefined
  )

  const progressStyle = {
    width: width === 'auto' ? 'auto' : width === '100%' ? '100%' : `${width}px`,
  }

  const intentColors: Record<string, Record<string, string>> = {
    success: { '--progress-color': 'var(--asm-color-success-600, #28a745)' },
    warning: { '--progress-color': 'var(--asm-color-warning-600, #ffc107)' },
    danger: { '--progress-color': 'var(--asm-color-danger-600, #dc3545)' },
    info: { '--progress-color': 'var(--asm-color-info-600, #17a2b8)' },
  }

  return (
    <div className={styles.playground}>
      <h1 className={styles.title}>LinearProgress Playground</h1>

      <div className={styles.layout}>
        <div className={styles.controls}>
          <Card>
            <h2 className={styles.sectionTitle}>Controls</h2>
            
            <div className={styles.fieldGroup}>
              <Field label="Variant">
                <select
                  className={styles.select}
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as 'determinate' | 'indeterminate')}
                >
                  <option value="determinate">Determinate</option>
                  <option value="indeterminate">Indeterminate</option>
                </select>
              </Field>

              <Field label="Size">
                <select
                  className={styles.select}
                  value={size}
                  onChange={(e) => setSize(e.target.value as 'sm' | 'md' | 'lg')}
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </Field>

              <Field label="Intent">
                <select
                  className={styles.select}
                  value={intent}
                  onChange={(e) => setIntent(e.target.value as any)}
                >
                  <option value="default">Default</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Danger</option>
                  <option value="info">Info</option>
                </select>
              </Field>

              <Field label="Width">
                <select
                  className={styles.select}
                  value={width}
                  onChange={(e) => setWidth(e.target.value as any)}
                >
                  <option value="auto">Auto</option>
                  <option value="240">240px</option>
                  <option value="480">480px</option>
                  <option value="100%">100%</option>
                </select>
              </Field>

              {variant === 'determinate' && (
                <>
                  <Field label={`Value: ${value}`}>
                    <input
                      type="range"
                      className={styles.slider}
                      min={min}
                      max={max}
                      value={value}
                      onChange={(e) => setValue(Number(e.target.value))}
                    />
                  </Field>

                  <Field label="Min">
                    <input
                      type="number"
                      className={styles.input}
                      value={min}
                      onChange={(e) => setMin(Number(e.target.value))}
                    />
                  </Field>

                  <Field label="Max">
                    <input
                      type="number"
                      className={styles.input}
                      value={max}
                      onChange={(e) => setMax(Number(e.target.value))}
                    />
                  </Field>
                </>
              )}

              <Field label="Show Label">
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={showLabel}
                    onChange={(e) => setShowLabel(e.target.checked)}
                  />
                  <span>Display visible label</span>
                </label>
              </Field>

              {!showLabel && (
                <Field label="aria-label">
                  <input
                    type="text"
                    className={styles.input}
                    value={ariaLabel}
                    onChange={(e) => setAriaLabel(e.target.value)}
                    placeholder="Accessible name"
                  />
                </Field>
              )}

              <Field label="aria-valuetext">
                <input
                  type="text"
                  className={styles.input}
                  value={ariaValueText}
                  onChange={(e) => setAriaValueText(e.target.value)}
                  placeholder="Custom value text"
                />
              </Field>
            </div>

            {variant === 'determinate' && (
              <div className={styles.actions}>
                <button
                  className={styles.button}
                  onClick={handleSimulateUpload}
                  disabled={isAnimating}
                >
                  Simulate Upload
                </button>
                <button
                  className={styles.button}
                  onClick={handleRandom}
                >
                  Random Value
                </button>
              </div>
            )}
          </Card>
        </div>

        <div className={styles.preview}>
          <Card>
            <h2 className={styles.sectionTitle}>Live Preview</h2>
            
            <div className={styles.previewContent}>
              {showLabel && (
                <div id="progress-label" className={styles.label}>
                  Progress
                </div>
              )}
              
              <div 
                style={{
                  ...progressStyle,
                  ...(intent !== 'default' ? intentColors[intent] : {}),
                }}
              >
                <LinearProgress
                  variant={variant}
                  size={size}
                  value={variant === 'determinate' ? value : undefined}
                  min={min}
                  max={max}
                  aria-label={showLabel ? undefined : ariaLabel}
                  aria-labelledby={showLabel ? 'progress-label' : undefined}
                  aria-valuetext={ariaValueText || undefined}
                />
              </div>

              {variant === 'determinate' && (
                <div className={styles.valueDisplay}>
                  {Math.round(((value - min) / (max - min)) * 100)}%
                </div>
              )}
            </div>
          </Card>

          <Panel title="Accessibility Diagnostics">
            <div className={styles.diagnostics}>
              <h3 className={styles.diagnosticsTitle}>Computed ARIA Props</h3>
              <div className={styles.ariaProps}>
                {Object.entries(ariaProps).map(([key, val]) => (
                  <div key={key} className={styles.ariaProp}>
                    <code className={styles.ariaKey}>{key}</code>
                    <code className={styles.ariaValue}>{String(val)}</code>
                  </div>
                ))}
              </div>

              {warnings.length > 0 && (
                <div className={styles.warnings}>
                  <h3 className={styles.diagnosticsTitle}>Warnings</h3>
                  {warnings.map((warning, i) => (
                    <div key={i} className={styles.warning}>
                      <Badge variant="warning">⚠</Badge>
                      <span>{warning}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.srSection}>
                <h3 className={styles.diagnosticsTitle}>Likely SR Announcement</h3>
                <div className={styles.srAnnouncement}>{srAnnouncement}</div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
