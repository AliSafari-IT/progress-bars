import { useState } from 'react'
import {
  LinearProgress,
  CircularProgress,
  VerticalProgress,
  SegmentedProgress,
  StepProgress,
  ProgressStack,
  Spinner,
  ProgressLabel,
  ProgressLegend,
} from '@asafarim/progress-bars'
import { DemoCard } from '../components/DemoCard'
import { CodeSnippetDialog } from '../components/CodeSnippetDialog'
import styles from './ComponentsPage.module.css'

const codeSnippets = {
  linearDeterminate: `import { LinearProgress, ProgressLabel } from '@asafarim/progress-bars'
import { useState } from 'react'

export function LinearDeterminate() {
  const [value, setValue] = useState(65)

  return (
    <div>
      <ProgressLabel label="Upload progress" value={value} />
      <LinearProgress value={value} />
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  )
}`,
  linearIndeterminate: `import { LinearProgress, ProgressLabel } from '@asafarim/progress-bars'

export function LinearIndeterminate() {
  return (
    <div>
      <ProgressLabel label="Loading" showValue={false} />
      <LinearProgress />
    </div>
  )
}`,
  linearTones: `import { LinearProgress, ProgressLabel } from '@asafarim/progress-bars'

export function LinearTones() {
  return (
    <div>
      <div>
        <ProgressLabel label="Brand" value={80} />
        <LinearProgress value={80} tone="brand" />
      </div>
      <div>
        <ProgressLabel label="Success" value={100} />
        <LinearProgress value={100} tone="success" />
      </div>
      <div>
        <ProgressLabel label="Warning" value={60} />
        <LinearProgress value={60} tone="warning" />
      </div>
      <div>
        <ProgressLabel label="Danger" value={30} />
        <LinearProgress value={30} tone="danger" />
      </div>
    </div>
  )
}`,
  circularDeterminate: `import { CircularProgress } from '@asafarim/progress-bars'
import { useState } from 'react'

export function CircularDeterminate() {
  const [value, setValue] = useState(75)

  return (
    <div>
      <CircularProgress value={value} showLabel />
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  )
}`,
  circularIndeterminate: `import { CircularProgress } from '@asafarim/progress-bars'

export function CircularIndeterminate() {
  return <CircularProgress label="Loading" />
}`,
  circularSizesTones: `import { CircularProgress } from '@asafarim/progress-bars'

export function CircularSizesTones() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <CircularProgress value={75} size={40} tone="brand" />
      <CircularProgress value={85} size={56} tone="success" />
      <CircularProgress value={65} size={72} tone="warning" />
    </div>
  )
}`,
  verticalDeterminate: `import { VerticalProgress } from '@asafarim/progress-bars'
import { useState } from 'react'

export function VerticalDeterminate() {
  const [value, setValue] = useState(50)

  return (
    <div>
      <VerticalProgress value={value} height={200} width={12} />
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  )
}`,
  verticalIndeterminate: `import { VerticalProgress } from '@asafarim/progress-bars'

export function VerticalIndeterminate() {
  return <VerticalProgress height={200} width={12} />
}`,
  verticalTones: `import { VerticalProgress } from '@asafarim/progress-bars'

export function VerticalTones() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
      <VerticalProgress value={80} height={150} tone="brand" />
      <VerticalProgress value={60} height={150} tone="success" />
      <VerticalProgress value={40} height={150} tone="danger" />
    </div>
  )
}`,
  segmentedMulti: `import { SegmentedProgress } from '@asafarim/progress-bars'

export function SegmentedMulti() {
  return (
    <SegmentedProgress
      segments={[
        { value: 30, tone: 'brand', label: 'Completed' },
        { value: 20, tone: 'success', label: 'In Progress' },
        { value: 15, tone: 'warning', label: 'Pending' },
      ]}
      label="Project progress"
    />
  )
}`,
  segmentedLegend: `import { SegmentedProgress, ProgressLegend } from '@asafarim/progress-bars'

export function SegmentedLegend() {
  return (
    <div>
      <SegmentedProgress
        segments={[
          { value: 40, tone: 'brand' },
          { value: 30, tone: 'success' },
          { value: 20, tone: 'danger' },
        ]}
      />
      <ProgressLegend
        items={[
          { tone: 'brand', label: 'Frontend', value: 40 },
          { tone: 'success', label: 'Backend', value: 30 },
          { tone: 'danger', label: 'Testing', value: 20 },
        ]}
      />
    </div>
  )
}`,
  segmentedNoGaps: `import { SegmentedProgress } from '@asafarim/progress-bars'

export function SegmentedNoGaps() {
  return (
    <SegmentedProgress
      segments={[
        { value: 25, tone: 'brand' },
        { value: 25, tone: 'success' },
        { value: 25, tone: 'warning' },
        { value: 25, tone: 'danger' },
      ]}
      gap={0}
    />
  )
}`,
  stepDots: `import { StepProgress } from '@asafarim/progress-bars'
import { useState } from 'react'

export function StepDots() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div>
      <StepProgress
        steps={[
          { label: 'Account' },
          { label: 'Profile' },
          { label: 'Preferences' },
          { label: 'Complete' },
        ]}
        currentStep={currentStep}
        variant="dots"
      />
      <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
        Previous
      </button>
      <button onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}>
        Next
      </button>
    </div>
  )
}`,
  stepBars: `import { StepProgress } from '@asafarim/progress-bars'

export function StepBars() {
  return (
    <StepProgress
      steps={[
        { label: 'Design', tone: 'brand' },
        { label: 'Develop', tone: 'brand' },
        { label: 'Test', tone: 'brand' },
        { label: 'Deploy', tone: 'success' },
      ]}
      currentStep={2}
      variant="bars"
    />
  )
}`,
  stackedProgress: `import { ProgressStack, ProgressLegend } from '@asafarim/progress-bars'

export function StackedProgress() {
  return (
    <div>
      <ProgressStack
        items={[
          { value: 40, tone: 'brand', label: 'Used' },
          { value: 30, tone: 'warning', label: 'Reserved' },
        ]}
        label="Storage usage"
      />
      <ProgressLegend
        items={[
          { tone: 'brand', label: 'Used', value: 40 },
          { tone: 'warning', label: 'Reserved', value: 30 },
          { tone: 'neutral', label: 'Free', value: 30 },
        ]}
      />
    </div>
  )
}`,
  resourceUsage: `import { ProgressStack, ProgressLabel } from '@asafarim/progress-bars'

export function ResourceUsage() {
  return (
    <div>
      <div>
        <ProgressLabel label="CPU" value={75} />
        <ProgressStack
          items={[
            { value: 50, tone: 'brand' },
            { value: 25, tone: 'warning' },
          ]}
        />
      </div>
      <div>
        <ProgressLabel label="Memory" value={60} />
        <ProgressStack items={[{ value: 60, tone: 'success' }]} />
      </div>
      <div>
        <ProgressLabel label="Disk" value={90} />
        <ProgressStack items={[{ value: 90, tone: 'danger' }]} />
      </div>
    </div>
  )
}`,
  spinnerSizes: `import { Spinner } from '@asafarim/progress-bars'

export function SpinnerSizes() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Spinner size={16} label="Small spinner" />
      <Spinner size={24} label="Medium spinner" />
      <Spinner size={32} label="Large spinner" />
      <Spinner size={48} label="Extra large spinner" />
    </div>
  )
}`,
  spinnerTones: `import { Spinner } from '@asafarim/progress-bars'

export function SpinnerTones() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Spinner tone="brand" />
      <Spinner tone="success" />
      <Spinner tone="warning" />
      <Spinner tone="danger" />
      <Spinner tone="neutral" />
    </div>
  )
}`,
  spinnerText: `import { Spinner } from '@asafarim/progress-bars'

export function SpinnerText() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spinner size={32} />
      <p>Loading content...</p>
    </div>
  )
}`,
  labelValue: `import { ProgressLabel } from '@asafarim/progress-bars'

export function LabelValue() {
  return <ProgressLabel label="Download progress" value={85} />
}`,
  labelCustomFormat: `import { ProgressLabel } from '@asafarim/progress-bars'

export function LabelCustomFormat() {
  return (
    <ProgressLabel
      label="Upload"
      value={45}
      format={(v: number) => \`\${v} of 100 MB\`}
    />
  )
}`,
  labelNoValue: `import { ProgressLabel } from '@asafarim/progress-bars'

export function LabelNoValue() {
  return <ProgressLabel label="Processing" showValue={false} />
}`,
  legendRow: `import { ProgressLegend } from '@asafarim/progress-bars'

export function LegendRow() {
  return (
    <ProgressLegend
      items={[
        { tone: 'brand', label: 'Active', value: 45 },
        { tone: 'success', label: 'Completed', value: 30 },
        { tone: 'warning', label: 'Pending', value: 15 },
        { tone: 'danger', label: 'Failed', value: 10 },
      ]}
      layout="row"
    />
  )
}`,
  legendColumn: `import { ProgressLegend } from '@asafarim/progress-bars'

export function LegendColumn() {
  return (
    <ProgressLegend
      items={[
        { tone: 'brand', label: 'JavaScript', value: 40 },
        { tone: 'success', label: 'TypeScript', value: 35 },
        { tone: 'warning', label: 'CSS', value: 15 },
        { tone: 'neutral', label: 'Other', value: 10 },
      ]}
      layout="column"
    />
  )
}`,
}

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
  )
}

export function ComponentsPage() {
  const [linearValue, setLinearValue] = useState(65)
  const [circularValue, setCircularValue] = useState(75)
  const [verticalValue, setVerticalValue] = useState(50)
  const [currentStep, setCurrentStep] = useState(1)
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const handleCloseDialog = () => {
    setOpenDialog(null)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Component Examples</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>LinearProgress</h2>
        <div className={styles.grid}>
          <DemoCard title={<>Determinate <ViewCode handleViewCode={() => setOpenDialog('linearDeterminate')} /></>}>
            <ProgressLabel label="Upload progress" value={linearValue} />
            <LinearProgress value={linearValue} />
            <input
              type="range"
              min="0"
              max="100"
              value={linearValue}
              onChange={(e) => setLinearValue(Number(e.target.value))}
              className={styles.slider}
            />
          </DemoCard>

          <DemoCard title={<>Indeterminate <ViewCode handleViewCode={() => setOpenDialog('linearIndeterminate')} /></>}>
            <ProgressLabel label="Loading" showValue={false} />
            <LinearProgress />
          </DemoCard>

          <DemoCard title={<>Different Tones <ViewCode handleViewCode={() => setOpenDialog('linearTones')} /></>}>
            <div className={styles.stack}>
              <div>
                <ProgressLabel label="Brand" value={80} />
                <LinearProgress value={80} tone="brand" />
              </div>
              <div>
                <ProgressLabel label="Success" value={100} />
                <LinearProgress value={100} tone="success" />
              </div>
              <div>
                <ProgressLabel label="Warning" value={60} />
                <LinearProgress value={60} tone="warning" />
              </div>
              <div>
                <ProgressLabel label="Danger" value={30} />
                <LinearProgress value={30} tone="danger" />
              </div>
            </div>
          </DemoCard>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>CircularProgress</h2>
        <div className={styles.grid}>
          <DemoCard title={<>Determinate <ViewCode handleViewCode={() => setOpenDialog('circularDeterminate')} /></>}>
            <div className={styles.centered}>
              <CircularProgress value={circularValue} showLabel />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={circularValue}
              onChange={(e) => setCircularValue(Number(e.target.value))}
              className={styles.slider}
            />
          </DemoCard>

          <DemoCard title={<>Indeterminate <ViewCode handleViewCode={() => setOpenDialog('circularIndeterminate')} /></>}>
            <div className={styles.centered}>
              <CircularProgress label="Loading" />
            </div>
          </DemoCard>

          <DemoCard title={<>Different Sizes & Tones <ViewCode handleViewCode={() => setOpenDialog('circularSizesTones')} /></>}>
            <div className={styles.row}>
              <CircularProgress value={75} size={40} tone="brand" />
              <CircularProgress value={85} size={56} tone="success" />
              <CircularProgress value={65} size={72} tone="warning" />
            </div>
          </DemoCard>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>VerticalProgress</h2>
        <div className={styles.grid}>
          <DemoCard title={<>Determinate <ViewCode handleViewCode={() => setOpenDialog('verticalDeterminate')} /></>}>
            <div className={styles.centered}>
              <VerticalProgress value={verticalValue} height={200} width={12} />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={verticalValue}
              onChange={(e) => setVerticalValue(Number(e.target.value))}
              className={styles.slider}
            />
          </DemoCard>

          <DemoCard title={<>Indeterminate <ViewCode handleViewCode={() => setOpenDialog('verticalIndeterminate')} /></>}>
            <div className={styles.centered}>
              <VerticalProgress height={200} width={12} />
            </div>
          </DemoCard>

          <DemoCard title={<>Different Tones <ViewCode handleViewCode={() => setOpenDialog('verticalTones')} /></>}>
            <div className={styles.row}>
              <VerticalProgress value={80} height={150} tone="brand" />
              <VerticalProgress value={60} height={150} tone="success" />
              <VerticalProgress value={40} height={150} tone="danger" />
            </div>
          </DemoCard>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>SegmentedProgress</h2>
        <div className={styles.grid}>
          <DemoCard title={<>Multi-Segment <ViewCode handleViewCode={() => setOpenDialog('segmentedMulti')} /></>}>
            <SegmentedProgress
              segments={[
                { value: 30, tone: 'brand', label: 'Completed' },
                { value: 20, tone: 'success', label: 'In Progress' },
                { value: 15, tone: 'warning', label: 'Pending' },
              ]}
              label="Project progress"
            />
          </DemoCard>

          <DemoCard title={<>With Legend <ViewCode handleViewCode={() => setOpenDialog('segmentedLegend')} /></>}>
            <SegmentedProgress
              segments={[
                { value: 40, tone: 'brand' },
                { value: 30, tone: 'success' },
                { value: 20, tone: 'danger' },
              ]}
            />
            <ProgressLegend
              items={[
                { tone: 'brand', label: 'Frontend', value: 40 },
                { tone: 'success', label: 'Backend', value: 30 },
                { tone: 'danger', label: 'Testing', value: 20 },
              ]}
            />
          </DemoCard>

          <DemoCard title={<>No Gaps <ViewCode handleViewCode={() => setOpenDialog('segmentedNoGaps')} /></>}>
            <SegmentedProgress
              segments={[
                { value: 25, tone: 'brand' },
                { value: 25, tone: 'success' },
                { value: 25, tone: 'warning' },
                { value: 25, tone: 'danger' },
              ]}
              gap={0}
            />
          </DemoCard>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>StepProgress</h2>
        <div className={styles.grid}>
          <DemoCard title={<>Dots Variant <ViewCode handleViewCode={() => setOpenDialog('stepDots')} /></>}>
            <StepProgress
              steps={[
                { label: 'Account' },
                { label: 'Profile' },
                { label: 'Preferences' },
                { label: 'Complete' },
              ]}
              currentStep={currentStep}
              variant="dots"
            />
            <div className={styles.buttonRow}>
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className={styles.button}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                disabled={currentStep === 3}
                className={styles.button}
              >
                Next
              </button>
            </div>
          </DemoCard>

          <DemoCard title={<>Bars Variant <ViewCode handleViewCode={() => setOpenDialog('stepBars')} /></>}>
            <StepProgress
              steps={[
                { label: 'Design', tone: 'brand' },
                { label: 'Develop', tone: 'brand' },
                { label: 'Test', tone: 'brand' },
                { label: 'Deploy', tone: 'success' },
              ]}
              currentStep={2}
              variant="bars"
            />
          </DemoCard>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ProgressStack</h2>
        <div className={styles.grid}>
          <DemoCard title={<>Stacked Progress <ViewCode handleViewCode={() => setOpenDialog('stackedProgress')} /></>}>
            <ProgressStack
              items={[
                { value: 40, tone: 'brand', label: 'Used' },
                { value: 30, tone: 'warning', label: 'Reserved' },
              ]}
              label="Storage usage"
            />
            <ProgressLegend
              items={[
                { tone: 'brand', label: 'Used', value: 40 },
                { tone: 'warning', label: 'Reserved', value: 30 },
                { tone: 'neutral', label: 'Free', value: 30 },
              ]}
            />
          </DemoCard>

          <DemoCard title={<>Resource Usage <ViewCode handleViewCode={() => setOpenDialog('resourceUsage')} /></>}>
            <div className={styles.stack}>
              <div>
                <ProgressLabel label="CPU" value={75} />
                <ProgressStack
                  items={[
                    { value: 50, tone: 'brand' },
                    { value: 25, tone: 'warning' },
                  ]}
                />
              </div>
              <div>
                <ProgressLabel label="Memory" value={60} />
                <ProgressStack items={[{ value: 60, tone: 'success' }]} />
              </div>
              <div>
                <ProgressLabel label="Disk" value={90} />
                <ProgressStack items={[{ value: 90, tone: 'danger' }]} />
              </div>
            </div>
          </DemoCard>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Spinner</h2>
        <div className={styles.grid}>
          <DemoCard title={<>Different Sizes <ViewCode handleViewCode={() => setOpenDialog('spinnerSizes')} /></>}>
            <div className={styles.row}>
              <Spinner size={16} label="Small spinner" />
              <Spinner size={24} label="Medium spinner" />
              <Spinner size={32} label="Large spinner" />
              <Spinner size={48} label="Extra large spinner" />
            </div>
          </DemoCard>

          <DemoCard title={<>Different Tones <ViewCode handleViewCode={() => setOpenDialog('spinnerTones')} /></>}>
            <div className={styles.row}>
              <Spinner tone="brand" />
              <Spinner tone="success" />
              <Spinner tone="warning" />
              <Spinner tone="danger" />
              <Spinner tone="neutral" />
            </div>
          </DemoCard>

          <DemoCard title={<>With Text <ViewCode handleViewCode={() => setOpenDialog('spinnerText')} /></>}>
            <div className={styles.centered}>
              <Spinner size={32} />
              <p className={styles.text}>Loading content...</p>
            </div>
          </DemoCard>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ProgressLabel</h2>
        <div className={styles.grid}>
          <DemoCard title={<>With Value <ViewCode handleViewCode={() => setOpenDialog('labelValue')} /></>}>
            <ProgressLabel label="Download progress" value={85} />
          </DemoCard>

          <DemoCard title={<>Custom Format <ViewCode handleViewCode={() => setOpenDialog('labelCustomFormat')} /></>}>
            <ProgressLabel
              label="Upload"
              value={45}
              format={(v: number) => `${v} of 100 MB`}
            />
          </DemoCard>

          <DemoCard title={<>Without Value <ViewCode handleViewCode={() => setOpenDialog('labelNoValue')} /></>}>
            <ProgressLabel label="Processing" showValue={false} />
          </DemoCard>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ProgressLegend</h2>
        <div className={styles.grid}>
          <DemoCard title={<>Row Layout <ViewCode handleViewCode={() => setOpenDialog('legendRow')} /></>}>
            <ProgressLegend
              items={[
                { tone: 'brand', label: 'Active', value: 45 },
                { tone: 'success', label: 'Completed', value: 30 },
                { tone: 'warning', label: 'Pending', value: 15 },
                { tone: 'danger', label: 'Failed', value: 10 },
              ]}
              layout="row"
            />
          </DemoCard>

          <DemoCard title={<>Column Layout <ViewCode handleViewCode={() => setOpenDialog('legendColumn')} /></>}>
            <ProgressLegend
              items={[
                { tone: 'brand', label: 'JavaScript', value: 40 },
                { tone: 'success', label: 'TypeScript', value: 35 },
                { tone: 'warning', label: 'CSS', value: 15 },
                { tone: 'neutral', label: 'Other', value: 10 },
              ]}
              layout="column"
            />
          </DemoCard>
        </div>
      </section>

      <CodeSnippetDialog
        isOpen={openDialog === 'linearDeterminate'}
        onClose={handleCloseDialog}
        code={codeSnippets.linearDeterminate}
        title="Linear Determinate"
        preview={
          <div>
            <ProgressLabel label="Upload progress" value={linearValue} />
            <LinearProgress value={linearValue} />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'linearIndeterminate'}
        onClose={handleCloseDialog}
        code={codeSnippets.linearIndeterminate}
        title="Linear Indeterminate"
        preview={
          <div>
            <ProgressLabel label="Loading" showValue={false} />
            <LinearProgress />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'linearTones'}
        onClose={handleCloseDialog}
        code={codeSnippets.linearTones}
        title="Linear Tones"
        preview={
          <div className={styles.stack}>
            <div>
              <ProgressLabel label="Brand" value={80} />
              <LinearProgress value={80} tone="brand" />
            </div>
            <div>
              <ProgressLabel label="Success" value={100} />
              <LinearProgress value={100} tone="success" />
            </div>
            <div>
              <ProgressLabel label="Warning" value={60} />
              <LinearProgress value={60} tone="warning" />
            </div>
            <div>
              <ProgressLabel label="Danger" value={30} />
              <LinearProgress value={30} tone="danger" />
            </div>
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'circularDeterminate'}
        onClose={handleCloseDialog}
        code={codeSnippets.circularDeterminate}
        title="Circular Determinate"
        preview={
          <div className={styles.centered}>
            <CircularProgress value={circularValue} showLabel />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'circularIndeterminate'}
        onClose={handleCloseDialog}
        code={codeSnippets.circularIndeterminate}
        title="Circular Indeterminate"
        preview={
          <div className={styles.centered}>
            <CircularProgress label="Loading" />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'circularSizesTones'}
        onClose={handleCloseDialog}
        code={codeSnippets.circularSizesTones}
        title="Circular Sizes & Tones"
        preview={
          <div className={styles.row}>
            <CircularProgress value={75} size={40} tone="brand" />
            <CircularProgress value={85} size={56} tone="success" />
            <CircularProgress value={65} size={72} tone="warning" />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'verticalDeterminate'}
        onClose={handleCloseDialog}
        code={codeSnippets.verticalDeterminate}
        title="Vertical Determinate"
        preview={
          <div className={styles.centered}>
            <VerticalProgress value={verticalValue} height={200} width={12} />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'verticalIndeterminate'}
        onClose={handleCloseDialog}
        code={codeSnippets.verticalIndeterminate}
        title="Vertical Indeterminate"
        preview={
          <div className={styles.centered}>
            <VerticalProgress height={200} width={12} />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'verticalTones'}
        onClose={handleCloseDialog}
        code={codeSnippets.verticalTones}
        title="Vertical Tones"
        preview={
          <div className={styles.row}>
            <VerticalProgress value={80} height={150} tone="brand" />
            <VerticalProgress value={60} height={150} tone="success" />
            <VerticalProgress value={40} height={150} tone="danger" />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'segmentedMulti'}
        onClose={handleCloseDialog}
        code={codeSnippets.segmentedMulti}
        title="Segmented Multi"
        preview={
          <SegmentedProgress
            segments={[
              { value: 30, tone: 'brand', label: 'Completed' },
              { value: 20, tone: 'success', label: 'In Progress' },
              { value: 15, tone: 'warning', label: 'Pending' },
            ]}
            label="Project progress"
          />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'segmentedLegend'}
        onClose={handleCloseDialog}
        code={codeSnippets.segmentedLegend}
        title="Segmented Legend"
        preview={
          <div>
            <SegmentedProgress
              segments={[
                { value: 40, tone: 'brand' },
                { value: 30, tone: 'success' },
                { value: 20, tone: 'danger' },
              ]}
            />
            <ProgressLegend
              items={[
                { tone: 'brand', label: 'Frontend', value: 40 },
                { tone: 'success', label: 'Backend', value: 30 },
                { tone: 'danger', label: 'Testing', value: 20 },
              ]}
            />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'segmentedNoGaps'}
        onClose={handleCloseDialog}
        code={codeSnippets.segmentedNoGaps}
        title="Segmented No Gaps"
        preview={
          <SegmentedProgress
            segments={[
              { value: 25, tone: 'brand' },
              { value: 25, tone: 'success' },
              { value: 25, tone: 'warning' },
              { value: 25, tone: 'danger' },
            ]}
            gap={0}
          />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'stepDots'}
        onClose={handleCloseDialog}
        code={codeSnippets.stepDots}
        title="Step Dots"
        preview={
          <StepProgress
            steps={[
              { label: 'Account' },
              { label: 'Profile' },
              { label: 'Preferences' },
              { label: 'Complete' },
            ]}
            currentStep={currentStep}
            variant="dots"
          />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'stepBars'}
        onClose={handleCloseDialog}
        code={codeSnippets.stepBars}
        title="Step Bars"
        preview={
          <StepProgress
            steps={[
              { label: 'Design', tone: 'brand' },
              { label: 'Develop', tone: 'brand' },
              { label: 'Test', tone: 'brand' },
              { label: 'Deploy', tone: 'success' },
            ]}
            currentStep={2}
            variant="bars"
          />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'stackedProgress'}
        onClose={handleCloseDialog}
        code={codeSnippets.stackedProgress}
        title="Stacked Progress"
        preview={
          <div>
            <ProgressStack
              items={[
                { value: 40, tone: 'brand', label: 'Used' },
                { value: 30, tone: 'warning', label: 'Reserved' },
              ]}
              label="Storage usage"
            />
            <ProgressLegend
              items={[
                { tone: 'brand', label: 'Used', value: 40 },
                { tone: 'warning', label: 'Reserved', value: 30 },
                { tone: 'neutral', label: 'Free', value: 30 },
              ]}
            />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'resourceUsage'}
        onClose={handleCloseDialog}
        code={codeSnippets.resourceUsage}
        title="Resource Usage"
        preview={
          <div>
            <div>
              <ProgressLabel label="CPU" value={75} />
              <ProgressStack
                items={[
                  { value: 50, tone: 'brand' },
                  { value: 25, tone: 'warning' },
                ]}
              />
            </div>
            <div>
              <ProgressLabel label="Memory" value={60} />
              <ProgressStack items={[{ value: 60, tone: 'success' }]} />
            </div>
            <div>
              <ProgressLabel label="Disk" value={90} />
              <ProgressStack items={[{ value: 90, tone: 'danger' }]} />
            </div>
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'spinnerSizes'}
        onClose={handleCloseDialog}
        code={codeSnippets.spinnerSizes}
        title="Spinner Sizes"
        preview={
          <div className={styles.row}>
            <Spinner size={16} label="Small spinner" />
            <Spinner size={24} label="Medium spinner" />
            <Spinner size={32} label="Large spinner" />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'spinnerTones'}
        onClose={handleCloseDialog}
        code={codeSnippets.spinnerTones}
        title="Spinner Tones"
        preview={
          <div className={styles.row}>
            <Spinner size={24} tone="brand" label="Brand" />
            <Spinner size={24} tone="success" label="Success" />
            <Spinner size={24} tone="warning" label="Warning" />
            <Spinner size={24} tone="danger" label="Danger" />
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'spinnerText'}
        onClose={handleCloseDialog}
        code={codeSnippets.spinnerText}
        title="Spinner Text"
        preview={
          <div style={{ textAlign: 'center' }}>
            <Spinner size={32} />
            <p>Loading content...</p>
          </div>
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'labelValue'}
        onClose={handleCloseDialog}
        code={codeSnippets.labelValue}
        title="Label Value"
        preview={
          <ProgressLabel label="Download progress" value={85} />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'labelCustomFormat'}
        onClose={handleCloseDialog}
        code={codeSnippets.labelCustomFormat}
        title="Label Custom Format"
        preview={
          <ProgressLabel
            label="Upload"
            value={45}
            format={(v: number) => `${v} of 100 MB`}
          />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'labelNoValue'}
        onClose={handleCloseDialog}
        code={codeSnippets.labelNoValue}
        title="Label No Value"
        preview={
          <ProgressLabel label="Processing" showValue={false} />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'legendRow'}
        onClose={handleCloseDialog}
        code={codeSnippets.legendRow}
        title="Legend Row"
        preview={
          <ProgressLegend
            items={[
              { tone: 'brand', label: 'Active', value: 45 },
              { tone: 'success', label: 'Completed', value: 30 },
              { tone: 'warning', label: 'Pending', value: 15 },
              { tone: 'danger', label: 'Failed', value: 10 },
            ]}
            layout="row"
          />
        }
      />
      <CodeSnippetDialog
        isOpen={openDialog === 'legendColumn'}
        onClose={handleCloseDialog}
        code={codeSnippets.legendColumn}
        title="Legend Column"
        preview={
          <ProgressLegend
            items={[
              { tone: 'brand', label: 'JavaScript', value: 40 },
              { tone: 'success', label: 'TypeScript', value: 35 },
              { tone: 'warning', label: 'CSS', value: 15 },
              { tone: 'neutral', label: 'Other', value: 10 },
            ]}
            layout="column"
          />
        }
      />
    </div>
  )
}
