import { useState } from 'react'
import { 
  LinearProgress, 
  CircularProgress, 
  Spinner, 
  VerticalProgress, 
  SegmentedProgress, 
  StepProgress, 
  ProgressLegend, 
  ProgressStack 
} from '@asafarim/progress-bars'
import { Card } from '../components/Card'
import { CodeSnippetDialog } from '../components/CodeSnippetDialog'
import styles from './Examples.module.css'

const codeSnippets = {
  withLabel: `import { LinearProgress } from '@asafarim/progress-bars'

export function UploadProgress() {
  return (
    <div>
      <label htmlFor="upload-progress">Uploading document.pdf</label>
      <LinearProgress
        id="upload-progress"
        variant="determinate"
        value={75}
        size="md"
      />
      <span>75%</span>
    </div>
  )
}`,
  largeThickBar: `import { LinearProgress } from '@asafarim/progress-bars'

export function DownloadProgress() {
  return (
    <LinearProgress
      variant="determinate"
      value={60}
      thickness={16}
      aria-label="Download progress"
    />
  )
}`,
  stripedAnimation: `import { LinearProgress } from '@asafarim/progress-bars'

export function ProcessingProgress() {
  return (
    <LinearProgress
      variant="determinate"
      value={65}
      size="md"
      striped
      animated
      aria-label="Processing"
    />
  )
}`,
  insideCard: `import { LinearProgress } from '@asafarim/progress-bars'

export function BuildCard() {
  return (
    <div style={{ padding: '1rem', backgroundColor: '#f3f4f6' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Build Process</span>
        <span>Running...</span>
      </div>
      <LinearProgress
        variant="indeterminate"
        size="sm"
        aria-label="Build in progress"
      />
    </div>
  )
}`,
  stackedTasks: `import { LinearProgress } from '@asafarim/progress-bars'

export function TaskList() {
  const tasks = [
    { label: 'Compiling TypeScript', value: 100 },
    { label: 'Bundling assets', value: 68 },
    { label: 'Optimizing images', value: 32 },
    { label: 'Running tests', value: undefined },
  ]

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{task.label}</span>
            <span>{task.value ?? '...'}</span>
          </div>
          <LinearProgress
            variant={task.value === undefined ? 'indeterminate' : 'determinate'}
            value={task.value}
            size="sm"
          />
        </div>
      ))}
    </div>
  )
}`,
  successState: `import { LinearProgress } from '@asafarim/progress-bars'

export function UploadComplete() {
  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={100}
        size="md"
        tone="success"
        aria-label="Upload complete"
      />
      <p>✓ Upload complete</p>
    </div>
  )
}`,
  circularProgress: `import { CircularProgress } from '@asafarim/progress-bars'

export function DownloadIndicators() {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <CircularProgress
        value={75}
        size={80}
        thickness={8}
        tone="brand"
        showLabel
        label="Download progress"
      />
      <CircularProgress
        size={60}
        thickness={6}
        tone="info"
        label="Loading"
      />
    </div>
  )
}`,
  spinner: `import { Spinner } from '@asafarim/progress-bars'

export function LoadingIndicators() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Spinner size={16} tone="brand" label="Loading small" />
      <Spinner size={24} tone="success" label="Loading medium" />
      <Spinner size={32} tone="warning" label="Loading large" />
    </div>
  )
}`,
  verticalProgress: `import { VerticalProgress } from '@asafarim/progress-bars'

export function ResourceMetrics() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
      <VerticalProgress
        value={30}
        height={120}
        tone="brand"
        label="Storage 30%"
      />
      <VerticalProgress
        value={65}
        height={120}
        tone="success"
        label="Memory 65%"
      />
      <VerticalProgress
        value={90}
        height={120}
        tone="warning"
        label="CPU 90%"
      />
    </div>
  )
}`,
  segmentedProgress: `import { SegmentedProgress } from '@asafarim/progress-bars'

export function ProjectPhases() {
  return (
    <SegmentedProgress
      segments={[
        { value: 25, tone: 'success' },
        { value: 30, tone: 'brand' },
        { value: 20, tone: 'warning' },
      ]}
      rounded
      aria-label="Project phases"
    />
  )
}`,
  stepProgress: `import { StepProgress } from '@asafarim/progress-bars'

export function SetupWizard() {
  return (
    <StepProgress
      steps={[
        { label: 'Account' },
        { label: 'Profile' },
        { label: 'Preferences' },
        { label: 'Review' },
      ]}
      currentStep={2}
      variant="dots"
      label="Setup progress"
    />
  )
}`,
  progressStack: `import { ProgressStack, ProgressLegend } from '@asafarim/progress-bars'

export function TaskDistribution() {
  return (
    <div>
      <ProgressStack
        items={[
          { value: 40, tone: 'success', label: 'Completed' },
          { value: 30, tone: 'brand', label: 'In Progress' },
          { value: 20, tone: 'warning', label: 'Pending' },
          { value: 10, tone: 'danger', label: 'Blocked' },
        ]}
        aria-label="Task distribution"
      />
      <ProgressLegend
        items={[
          { label: 'Completed', tone: 'success', value: 40 },
          { label: 'In Progress', tone: 'brand', value: 30 },
          { label: 'Pending', tone: 'warning', value: 20 },
          { label: 'Blocked', tone: 'danger', value: 10 },
        ]}
        layout="row"
      />
    </div>
  )
}`,
}

export function Examples() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const ViewCode = ({ handleViewCode }: { handleViewCode: () => void }) => {
    return (
      <button onClick={handleViewCode} className={styles.viewCodeButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <style>{`
                .eye-icon {
                  stroke: var(--asm-color-text);
                  stroke-width: 2;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  transition: stroke var(--asm-motion-duration-fast) var(--asm-motion-easing-standard);
                }
                .viewCodeButton:hover .eye-icon {
                  stroke: var(--asm-color-text);
                }
              `}</style>
              <path className="eye-icon" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle className="eye-icon" cx="12" cy="12" r="3"/>
            </svg>
          </button>
    );
  }

  return (
    <div className={styles.examples}>
      <h1 className={styles.title}>Examples Gallery</h1>
      <p className={styles.subtitle}>
        Curated examples showing real-world usage patterns for all progress components
      </p>

      <div className={styles.grid}>
        <Card>
          <h3 className={styles.exampleTitle}>With Label <ViewCode handleViewCode={() => setOpenDialog('withLabel')} /></h3>
          <p className={styles.exampleDesc}>
            Progress bar with a visible label for context
          </p>
          <div className={styles.exampleContent}>
            <div id="example-1-label" className={styles.label}>
              Uploading document.pdf
            </div>
            <LinearProgress
              variant="determinate"
              value={75}
              size="md"
              aria-labelledby="example-1-label"
            />
            <div className={styles.percentage}>75%</div>
          </div>
          
        </Card>

        <Card>
          <h3 className={styles.exampleTitle}>Large Thick Bar <ViewCode handleViewCode={() => setOpenDialog('largeThickBar')} /></h3>
          <p className={styles.exampleDesc}>
            Large size for prominent display
          </p>
          <div className={styles.exampleContent}>
            <LinearProgress
              variant="determinate"
              value={60}
              thickness={16}
              aria-label="Download progress"
            />
          </div>
        </Card>

        <Card>
          <h3 className={styles.exampleTitle}>Striped Animation <ViewCode handleViewCode={() => setOpenDialog('stripedAnimation')} /></h3>
          <p className={styles.exampleDesc}>
            Custom styling with striped pattern using CSS
          </p>
          <div className={styles.exampleContent}>
            <LinearProgress
              variant="determinate"
              value={65}
              size="md"
              striped
              animated
              aria-label="Processing"
            />
          </div>
        </Card>

        <Card>
          <h3 className={styles.exampleTitle}>Inside Card <ViewCode handleViewCode={() => setOpenDialog('insideCard')} /></h3>
          <p className={styles.exampleDesc}>
            Progress bar integrated into a card layout
          </p>
          <div className={styles.taskCard}>
            <div className={styles.taskHeader}>
              <span className={styles.taskName}>Build Process</span>
              <span className={styles.taskStatus}>Running...</span>
            </div>
            <LinearProgress
              variant="indeterminate"
              size="sm"
              aria-label="Build in progress"
            />
          </div>
        </Card>

        <Card>
          <h3 className={styles.exampleTitle}>Stacked Tasks <ViewCode handleViewCode={() => setOpenDialog('stackedTasks')} /></h3>
          <p className={styles.exampleDesc}>
            Multiple progress bars showing different tasks
          </p>
          <div className={styles.exampleContent}>
            <div className={styles.taskList}>
              <div className={styles.taskItem}>
                <div className={styles.taskInfo}>
                  <span className={styles.taskLabel}>Compiling TypeScript</span>
                  <span className={styles.taskValue}>100%</span>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={100}
                  size="sm"
                  aria-label="Compiling TypeScript"
                />
              </div>

              <div className={styles.taskItem}>
                <div className={styles.taskInfo}>
                  <span className={styles.taskLabel}>Bundling assets</span>
                  <span className={styles.taskValue}>68%</span>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={68}
                  size="sm"
                  aria-label="Bundling assets"
                />
              </div>

              <div className={styles.taskItem}>
                <div className={styles.taskInfo}>
                  <span className={styles.taskLabel}>Optimizing images</span>
                  <span className={styles.taskValue}>32%</span>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={32}
                  size="sm"
                  aria-label="Optimizing images"
                />
              </div>

              <div className={styles.taskItem}>
                <div className={styles.taskInfo}>
                  <span className={styles.taskLabel}>Running tests</span>
                  <span className={styles.taskValue}>...</span>
                </div>
                <LinearProgress
                  variant="indeterminate"
                  size="sm"
                  aria-label="Running tests"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className={styles.exampleTitle}>Success State <ViewCode handleViewCode={() => setOpenDialog('successState')} /></h3>
          <p className={styles.exampleDesc}>
            Completed progress with success styling
          </p>
          <div className={styles.exampleContent}>
            <LinearProgress
              variant="determinate"
              value={100}
              size="md"
              tone="success"
              aria-label="Upload complete"
            />
            <div className={styles.successMessage}>✓ Upload complete</div>
          </div>

        </Card>

        <Card>
          <h3 className={styles.exampleTitle}>Circular Progress <ViewCode handleViewCode={() => setOpenDialog('circularProgress')} /></h3>
          <p className={styles.exampleDesc}>
            Circular progress indicator for compact displays
          </p>
          <div className={styles.exampleContent}>
            <div className={styles.circularWrapper}>
              <CircularProgress
                value={75}
                size={80}
                thickness={8}
                tone="brand"
                showLabel
                label="Download progress"
              />
              <CircularProgress
                size={60}
                thickness={6}
                tone="info"
                label="Loading"
              />
            </div>
          </div>

        </Card>

        <Card>
          <h3 className={styles.exampleTitle}>Spinner <ViewCode handleViewCode={() => setOpenDialog('spinner')} /></h3>
          <p className={styles.exampleDesc}>
            Loading spinner for async operations
          </p>
          <div className={styles.exampleContent}>
            <div className={styles.spinnerWrapper}>
              <Spinner size={16} tone="brand" label="Loading small" />
              <Spinner size={24} tone="success" label="Loading medium" />
              <Spinner size={32} tone="warning" label="Loading large" />
            </div>
          </div>

        </Card>

        <Card>
          <h3 className={styles.exampleTitle}>Vertical Progress <ViewCode handleViewCode={() => setOpenDialog('verticalProgress')} /></h3>
          <p className={styles.exampleDesc}>
            Vertical progress bars for height-based displays
          </p>
          <div className={styles.exampleContent}>
            <div className={styles.verticalWrapper}>
              <VerticalProgress
                value={30}
                height={120}
                tone="brand"
                label="Storage 30%"
              />
              <VerticalProgress
                value={65}
                height={120}
                tone="success"
                label="Memory 65%"
              />
              <VerticalProgress
                value={90}
                height={120}
                tone="warning"
                label="CPU 90%"
              />
            </div>
          </div>

        </Card>

        <Card>
          <h3 className={styles.exampleTitle}>Segmented Progress <ViewCode handleViewCode={() => setOpenDialog('segmentedProgress')} /></h3>
          <p className={styles.exampleDesc}>
            Progress divided into discrete segments
          </p>
          <div className={styles.exampleContent}>
            <SegmentedProgress
              segments={[
                { value: 25, tone: 'success' },
                { value: 30, tone: 'brand' },
                { value: 20, tone: 'warning' },
              ]}
              rounded
              aria-label="Project phases"
            />
          </div>

        </Card>

        <Card>
          <h3 className={styles.exampleTitle}>Step Progress <ViewCode handleViewCode={() => setOpenDialog('stepProgress')} /></h3>
          <p className={styles.exampleDesc}>
            Multi-step progress indicator
          </p>
          <div className={styles.exampleContent}>
            <StepProgress
              steps={[
                { label: 'Account' },
                { label: 'Profile' },
                { label: 'Preferences' },
                { label: 'Review' },
              ]}
              currentStep={2}
              variant="dots"
              label="Setup progress"
            />
          </div>
        </Card>

        <Card>
          <h3 className={styles.exampleTitle}>Progress Stack <ViewCode handleViewCode={() => setOpenDialog('progressStack')} /></h3>
          <p className={styles.exampleDesc}>
            Stacked progress showing multiple values
          </p>
          <div className={styles.exampleContent}>
            <ProgressStack
              items={[
                { value: 40, tone: 'success', label: 'Completed' },
                { value: 30, tone: 'brand', label: 'In Progress' },
                { value: 20, tone: 'warning', label: 'Pending' },
                { value: 10, tone: 'danger', label: 'Blocked' },
              ]}
              aria-label="Task distribution"
            />
            <ProgressLegend
              items={[
                { label: 'Completed', tone: 'success', value: 40 },
                { label: 'In Progress', tone: 'brand', value: 30 },
                { label: 'Pending', tone: 'warning', value: 20 },
                { label: 'Blocked', tone: 'danger', value: 10 },
              ]}
              layout="row"
            />
          </div>
        </Card>
      </div>

      <CodeSnippetDialog
        isOpen={openDialog === 'withLabel'}
        onClose={() => setOpenDialog(null)}
        title="With Label"
        code={codeSnippets.withLabel}
        preview={
          <div>
            <div className={styles.label}>Uploading document.pdf</div>
            <LinearProgress variant="determinate" value={75} size="md" />
            <div className={styles.percentage}>75%</div>
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'largeThickBar'}
        onClose={() => setOpenDialog(null)}
        title="Large Thick Bar"
        code={codeSnippets.largeThickBar}
        preview={
          <LinearProgress variant="determinate" value={60} thickness={16} />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'stripedAnimation'}
        onClose={() => setOpenDialog(null)}
        title="Striped Animation"
        code={codeSnippets.stripedAnimation}
        preview={
          <LinearProgress variant="determinate" value={65} size="md" striped animated />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'insideCard'}
        onClose={() => setOpenDialog(null)}
        title="Inside Card"
        code={codeSnippets.insideCard}
        preview={
          <div className={styles.taskCard}>
            <div className={styles.taskHeader}>
              <span className={styles.taskName}>Build Process</span>
              <span className={styles.taskStatus}>Running...</span>
            </div>
            <LinearProgress variant="indeterminate" size="sm" />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'stackedTasks'}
        onClose={() => setOpenDialog(null)}
        title="Stacked Tasks"
        code={codeSnippets.stackedTasks}
        preview={
          <div className={styles.taskList}>
            <div className={styles.taskItem}>
              <div className={styles.taskInfo}>
                <span className={styles.taskLabel}>Compiling TypeScript</span>
                <span className={styles.taskValue}>100%</span>
              </div>
              <LinearProgress variant="determinate" value={100} size="sm" />
            </div>
            <div className={styles.taskItem}>
              <div className={styles.taskInfo}>
                <span className={styles.taskLabel}>Bundling assets</span>
                <span className={styles.taskValue}>68%</span>
              </div>
              <LinearProgress variant="determinate" value={68} size="sm" />
            </div>
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'successState'}
        onClose={() => setOpenDialog(null)}
        title="Success State"
        code={codeSnippets.successState}
        preview={
          <div>
            <LinearProgress variant="determinate" value={100} size="md" tone="success" />
            <div className={styles.successMessage}>✓ Upload complete</div>
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'circularProgress'}
        onClose={() => setOpenDialog(null)}
        title="Circular Progress"
        code={codeSnippets.circularProgress}
        preview={
          <div className={styles.circularWrapper}>
            <CircularProgress value={75} size={80} thickness={8} tone="brand" showLabel label="Download progress" />
            <CircularProgress size={60} thickness={6} tone="info" label="Loading" />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'spinner'}
        onClose={() => setOpenDialog(null)}
        title="Spinner"
        code={codeSnippets.spinner}
        preview={
          <div className={styles.spinnerWrapper}>
            <Spinner size={16} tone="brand" label="Loading small" />
            <Spinner size={24} tone="success" label="Loading medium" />
            <Spinner size={32} tone="warning" label="Loading large" />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'verticalProgress'}
        onClose={() => setOpenDialog(null)}
        title="Vertical Progress"
        code={codeSnippets.verticalProgress}
        preview={
          <div className={styles.verticalWrapper}>
            <VerticalProgress value={30} height={120} tone="brand" label="Storage 30%" />
            <VerticalProgress value={65} height={120} tone="success" label="Memory 65%" />
            <VerticalProgress value={90} height={120} tone="warning" label="CPU 90%" />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'segmentedProgress'}
        onClose={() => setOpenDialog(null)}
        title="Segmented Progress"
        code={codeSnippets.segmentedProgress}
        preview={
          <SegmentedProgress
            segments={[
              { value: 25, tone: 'success' },
              { value: 30, tone: 'brand' },
              { value: 20, tone: 'warning' },
            ]}
            rounded
          />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'stepProgress'}
        onClose={() => setOpenDialog(null)}
        title="Step Progress"
        code={codeSnippets.stepProgress}
        preview={
          <StepProgress
            steps={[
              { label: 'Account' },
              { label: 'Profile' },
              { label: 'Preferences' },
              { label: 'Review' },
            ]}
            currentStep={2}
            variant="dots"
          />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'progressStack'}
        onClose={() => setOpenDialog(null)}
        title="Progress Stack"
        code={codeSnippets.progressStack}
        preview={
          <div style={{ width: '100%' }}>
            <ProgressStack
              items={[
                { value: 40, tone: 'success', label: 'Completed' },
                { value: 30, tone: 'brand', label: 'In Progress' },
                { value: 20, tone: 'warning', label: 'Pending' },
                { value: 10, tone: 'danger', label: 'Blocked' },
              ]}
            />
            <ProgressLegend
              items={[
                { label: 'Completed', tone: 'success', value: 40 },
                { label: 'In Progress', tone: 'brand', value: 30 },
                { label: 'Pending', tone: 'warning', value: 20 },
                { label: 'Blocked', tone: 'danger', value: 10 },
              ]}
              layout="row"
            />
          </div>
        }
      />
    </div>
  )
}
