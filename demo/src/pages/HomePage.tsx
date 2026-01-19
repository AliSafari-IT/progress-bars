import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.title}>@asafarim/progress-bars</h1>
        <p className={styles.subtitle}>
          Accessible, themeable progress indicators for React applications
        </p>
      </header>

      <section className={styles.section}>
        <h2>Installation</h2>
        <pre className={styles.code}>npm install @asafarim/progress-bars</pre>
        <pre className={styles.code}>pnpm add @asafarim/progress-bars</pre>
      </section>

      <section className={styles.section}>
        <h2>Quick Start</h2>
        <pre className={styles.code}>
{`import { LinearProgress } from '@asafarim/progress-bars'

function App() {
  return <LinearProgress value={75} />
}`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Components</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>LinearProgress</h3>
            <p>Horizontal progress bar with determinate and indeterminate variants</p>
          </div>
          <div className={styles.card}>
            <h3>CircularProgress</h3>
            <p>Circular progress indicator with SVG rendering</p>
          </div>
          <div className={styles.card}>
            <h3>VerticalProgress</h3>
            <p>Vertical progress bar for space-constrained layouts</p>
          </div>
          <div className={styles.card}>
            <h3>SegmentedProgress</h3>
            <p>Multi-segment progress bar with individual tones</p>
          </div>
          <div className={styles.card}>
            <h3>StepProgress</h3>
            <p>Step indicator for multi-step workflows</p>
          </div>
          <div className={styles.card}>
            <h3>ProgressStack</h3>
            <p>Stacked progress bars without gaps</p>
          </div>
          <div className={styles.card}>
            <h3>Spinner</h3>
            <p>Indeterminate loading spinner</p>
          </div>
          <div className={styles.card}>
            <h3>ProgressLabel</h3>
            <p>Accessible label component for progress indicators</p>
          </div>
          <div className={styles.card}>
            <h3>ProgressLegend</h3>
            <p>Legend component with color swatches</p>
          </div>
        </div>
        <Link to="/components" className={styles.link}>
          View Live Examples →
        </Link>
      </section>
    </div>
  )
}
