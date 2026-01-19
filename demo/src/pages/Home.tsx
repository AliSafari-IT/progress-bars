import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import { CodeBlock } from '../components/CodeBlock'
import styles from './Home.module.css'

export function Home() {
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
        <CodeBlock>npm install @asafarim/progress-bars</CodeBlock>
        <CodeBlock>pnpm add @asafarim/progress-bars</CodeBlock>
      </section>

      <section className={styles.section}>
        <h2>Quick Links</h2>
        <div className={styles.grid}>
          <Card>
            <h3 className={styles.cardTitle}>Linear Progress</h3>
            <p className={styles.cardText}>
              Interactive playground for LinearProgress with full control over props, variants, and accessibility features.
            </p>
            <Link to="/linear" className={styles.link}>
              Explore Playground →
            </Link>
          </Card>

          <Card>
            <h3 className={styles.cardTitle}>Examples</h3>
            <p className={styles.cardText}>
              Curated examples showing real-world usage patterns and styling techniques.
            </p>
            <Link to="/examples" className={styles.link}>
              View Examples →
            </Link>
          </Card>

          <Card>
            <h3 className={styles.cardTitle}>Visual Grid</h3>
            <p className={styles.cardText}>
              Comprehensive grid of all variants and states for visual regression testing.
            </p>
            <Link to="/visual-grid" className={styles.link}>
              View Grid →
            </Link>
          </Card>

          <Card>
            <h3 className={styles.cardTitle}>Accessibility</h3>
            <p className={styles.cardText}>
              Learn about accessibility features, reduced motion support, and ARIA implementation.
            </p>
            <Link to="/a11y" className={styles.link}>
              Learn More →
            </Link>
          </Card>

          <Card>
            <h3 className={styles.cardTitle}>Design Tokens</h3>
            <p className={styles.cardText}>
              Explore the design token system powering theming and customization.
            </p>
            <Link to="/tokens" className={styles.link}>
              View Tokens →
            </Link>
          </Card>

          <Card>
            <h3 className={styles.cardTitle}>Roadmap</h3>
            <p className={styles.cardText}>
              See what's coming next: CircularProgress, SegmentedProgress, StepProgress, and more.
            </p>
            <Link to="/roadmap" className={styles.link}>
              View Roadmap →
            </Link>
          </Card>
        </div>
      </section>
    </div>
  )
}
