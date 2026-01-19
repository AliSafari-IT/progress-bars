import { Card } from '../components/Card'
import { Badge } from '../components/Badge'
import styles from './Roadmap.module.css'

interface ComponentRoadmap {
  name: string
  status: 'planned' | 'in-progress' | 'released'
  description: string
  props: string[]
}

const roadmapItems: ComponentRoadmap[] = [
  {
    name: 'LinearProgress',
    status: 'released',
    description: 'Horizontal progress bar with determinate and indeterminate variants',
    props: [
      'variant: determinate | indeterminate',
      'size: sm | md | lg',
      'value: number (0-100)',
      'min: number',
      'max: number',
      'aria-label: string',
      'aria-labelledby: string',
      'aria-valuetext: string',
    ],
  },
  {
    name: 'CircularProgress',
    status: 'in-progress',
    description: 'Circular/radial progress indicator with determinate and indeterminate variants',
    props: [
      'variant: determinate | indeterminate',
      'size: sm | md | lg | number',
      'value: number (0-100)',
      'thickness: number',
      'showLabel: boolean',
      'aria-label: string',
    ],
  },
  {
    name: 'SegmentedProgress',
    status: 'released',
    description: 'Progress bar divided into discrete segments for multi-step processes',
    props: [
      'segments: number',
      'currentSegment: number',
      'size: sm | md | lg',
      'showLabels: boolean',
      'segmentLabels: string[]',
      'aria-label: string',
    ],
  },
  {
    name: 'StepProgress',
    status: 'in-progress',
    description: 'Stepper component showing progress through a multi-step workflow',
    props: [
      'steps: Step[]',
      'currentStep: number',
      'orientation: horizontal | vertical',
      'size: sm | md | lg',
      'showConnectors: boolean',
      'clickable: boolean',
      'onStepClick: (step: number) => void',
    ],
  },
  {
    name: 'VerticalProgress',
    status: 'planned',
    description: 'Vertical progress bar for space-constrained layouts',
    props: [
      'variant: determinate | indeterminate',
      'size: sm | md | lg',
      'value: number (0-100)',
      'height: number | string',
      'showLabel: boolean',
      'aria-label: string',
    ],
  },
]

export function Roadmap() {
  const getStatusBadge = (status: ComponentRoadmap['status']) => {
    switch (status) {
      case 'released':
        return <Badge variant="success">Released</Badge>
      case 'in-progress':
        return <Badge variant="info">In Progress</Badge>
      case 'planned':
        return <Badge variant="default">Planned</Badge>
    }
  }

  return (
    <div className={styles.roadmap}>
      <h1 className={styles.title}>Component Roadmap</h1>
      <p className={styles.subtitle}>
        Current and planned progress indicator components
      </p>

      <div className={styles.grid}>
        {roadmapItems.map((item) => (
          <Card key={item.name}>
            <div className={styles.cardHeader}>
              <h3 className={styles.componentName}>{item.name}</h3>
              {getStatusBadge(item.status)}
            </div>
            
            <p className={styles.description}>{item.description}</p>

            <div className={styles.propsSection}>
              <h4 className={styles.propsTitle}>Expected Props</h4>
              <ul className={styles.propsList}>
                {item.props.map((prop, index) => (
                  <li key={index} className={styles.propItem}>
                    <code className={styles.propCode}>{prop}</code>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <section className={styles.section}>
        <Card>
          <h2 className={styles.sectionTitle}>Coming Soon</h2>
          <p className={styles.text}>
            The components marked as "Planned" are in the design phase. Each will follow the same
            principles as LinearProgress:
          </p>
          <ul className={styles.principles}>
            <li>Full ARIA support and accessibility compliance</li>
            <li>Respect for prefers-reduced-motion</li>
            <li>Themeable via design tokens</li>
            <li>RTL support</li>
            <li>TypeScript-first with complete type definitions</li>
            <li>Zero runtime dependencies</li>
            <li>Comprehensive test coverage</li>
          </ul>
        </Card>
      </section>
    </div>
  )
}
