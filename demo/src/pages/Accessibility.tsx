import { useState } from 'react'
import { LinearProgress } from '@asafarim/progress-bars'
import { Card } from '../components/Card'
import { Panel } from '../components/Panel'
import styles from './Accessibility.module.css'

export function Accessibility() {
  const [reducedMotion, setReducedMotion] = useState(false)

  const handleToggleReducedMotion = () => {
    const newValue = !reducedMotion
    setReducedMotion(newValue)
    
    if (newValue) {
      document.documentElement.setAttribute('data-reduced-motion', 'true')
    } else {
      document.documentElement.removeAttribute('data-reduced-motion')
    }
  }

  return (
    <div className={styles.accessibility}>
      <h1 className={styles.title}>Accessibility & Motion</h1>
      <p className={styles.subtitle}>
        Learn about accessibility features, reduced motion support, and ARIA implementation
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Reduced Motion</h2>
        <Card>
          <p className={styles.text}>
            The progress bar respects the <code className={styles.code}>prefers-reduced-motion</code> media query
            and disables animations when users have requested reduced motion in their system settings.
          </p>

          <div className={styles.demo}>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={handleToggleReducedMotion}
              />
              <span>Emulate reduced motion</span>
            </label>

            <div className={styles.progressDemo}>
              <div className={styles.demoLabel}>Indeterminate progress (animated)</div>
              <LinearProgress
                variant="indeterminate"
                size="md"
                aria-label="Loading content"
              />
            </div>
          </div>

          <Panel title="CSS Implementation">
            <pre className={styles.codeBlock}>
{`@media (prefers-reduced-motion: reduce) {
  .progress {
    animation: none;
  }
}

/* Or via data attribute */
[data-reduced-motion="true"] .progress {
  animation: none;
}`}
            </pre>
          </Panel>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ARIA Implementation</h2>
        <Card>
          <div className={styles.ariaSection}>
            <h3 className={styles.subsectionTitle}>Required ARIA Attributes</h3>
            <ul className={styles.list}>
              <li>
                <strong>role="progressbar"</strong> - Identifies the element as a progress indicator
              </li>
              <li>
                <strong>aria-valuenow</strong> - Current value (determinate only)
              </li>
              <li>
                <strong>aria-valuemin</strong> - Minimum value (determinate only)
              </li>
              <li>
                <strong>aria-valuemax</strong> - Maximum value (determinate only)
              </li>
            </ul>

            <h3 className={styles.subsectionTitle}>Accessible Naming</h3>
            <p className={styles.text}>
              Every progress bar must have an accessible name using one of these methods:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>aria-label</strong> - Direct label (e.g., <code className={styles.code}>aria-label="Upload progress"</code>)
              </li>
              <li>
                <strong>aria-labelledby</strong> - Reference to visible label element
              </li>
            </ul>

            <h3 className={styles.subsectionTitle}>Custom Value Text</h3>
            <p className={styles.text}>
              Use <code className={styles.code}>aria-valuetext</code> to provide human-readable progress descriptions:
            </p>
            <ul className={styles.list}>
              <li>"Step 2 of 5"</li>
              <li>"Loading, please wait"</li>
              <li>"75% complete"</li>
            </ul>
          </div>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Keyboard Navigation</h2>
        <Card>
          <p className={styles.text}>
            Progress bars are not interactive elements and do not receive keyboard focus.
            They are purely informational and announced by screen readers when they appear or update.
          </p>
          <p className={styles.text}>
            If you need an interactive progress control, consider using a slider or range input instead.
          </p>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Screen Reader Behavior</h2>
        <Card>
          <div className={styles.srSection}>
            <h3 className={styles.subsectionTitle}>Determinate Progress</h3>
            <p className={styles.text}>
              Screen readers typically announce: <em>"[Label], progress bar, [percentage]"</em>
            </p>
            <div className={styles.example}>
              <div className={styles.exampleLabel}>Example:</div>
              <div className={styles.exampleContent}>
                <div id="sr-example-1" className={styles.visibleLabel}>File upload</div>
                <LinearProgress
                  variant="determinate"
                  value={65}
                  size="md"
                  aria-labelledby="sr-example-1"
                />
                <div className={styles.srAnnouncement}>
                  Announces: "File upload, progress bar, 65%"
                </div>
              </div>
            </div>

            <h3 className={styles.subsectionTitle}>Indeterminate Progress</h3>
            <p className={styles.text}>
              Screen readers announce: <em>"[Label], progress bar"</em> or custom valuetext
            </p>
            <div className={styles.example}>
              <div className={styles.exampleLabel}>Example:</div>
              <div className={styles.exampleContent}>
                <LinearProgress
                  variant="indeterminate"
                  size="md"
                  aria-label="Processing"
                  aria-valuetext="Processing, please wait"
                />
                <div className={styles.srAnnouncement}>
                  Announces: "Processing, progress bar, Processing, please wait"
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Best Practices</h2>
        <Card>
          <ul className={styles.bestPractices}>
            <li>
              <strong>Always provide an accessible name</strong> - Use aria-label or aria-labelledby
            </li>
            <li>
              <strong>Use determinate when possible</strong> - Users prefer knowing how much is left
            </li>
            <li>
              <strong>Provide context</strong> - Tell users what is progressing (e.g., "Upload progress" not just "Progress")
            </li>
            <li>
              <strong>Use aria-valuetext for clarity</strong> - Especially for non-percentage values
            </li>
            <li>
              <strong>Respect reduced motion</strong> - Disable animations when requested
            </li>
            <li>
              <strong>Ensure sufficient contrast</strong> - Progress bars should be visible to all users
            </li>
            <li>
              <strong>Don't rely on color alone</strong> - Use labels and text to convey status
            </li>
          </ul>
        </Card>
      </section>
    </div>
  )
}
