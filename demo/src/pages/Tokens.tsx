import { useState, useEffect } from 'react'
import { Card } from '../components/Card'
import styles from './Tokens.module.css'

interface TokenGroup {
  title: string
  tokens: { name: string; value: string }[]
}

export function Tokens() {
  const [tokenGroups, setTokenGroups] = useState<TokenGroup[]>([])

  useEffect(() => {
    const computedStyle = getComputedStyle(document.documentElement)

    const groups: TokenGroup[] = [
      {
        title: 'Spacing',
        tokens: [
          { name: '--asm-space-0-5', value: computedStyle.getPropertyValue('--asm-space-0-5') || '0.125rem' },
          { name: '--asm-space-1', value: computedStyle.getPropertyValue('--asm-space-1') || '0.25rem' },
          { name: '--asm-space-2', value: computedStyle.getPropertyValue('--asm-space-2') || '0.5rem' },
          { name: '--asm-space-3', value: computedStyle.getPropertyValue('--asm-space-3') || '0.75rem' },
          { name: '--asm-space-4', value: computedStyle.getPropertyValue('--asm-space-4') || '1rem' },
          { name: '--asm-space-6', value: computedStyle.getPropertyValue('--asm-space-6') || '2rem' },
          { name: '--asm-space-8', value: computedStyle.getPropertyValue('--asm-space-8') || '2.5rem' },
        ],
      },
      {
        title: 'Border Radius',
        tokens: [
          { name: '--asm-radius-sm', value: computedStyle.getPropertyValue('--asm-radius-sm') || '0.25rem' },
          { name: '--asm-radius-md', value: computedStyle.getPropertyValue('--asm-radius-md') || '0.375rem' },
          { name: '--asm-radius-lg', value: computedStyle.getPropertyValue('--asm-radius-lg') || '0.5rem' },
          { name: '--asm-radius-full', value: computedStyle.getPropertyValue('--asm-radius-full') || '9999px' },
        ],
      },
      {
        title: 'Motion Duration',
        tokens: [
          { name: '--asm-motion-duration-fast', value: computedStyle.getPropertyValue('--asm-motion-duration-fast') || '150ms' },
          { name: '--asm-motion-duration-normal', value: computedStyle.getPropertyValue('--asm-motion-duration-normal') || '250ms' },
          { name: '--asm-motion-duration-slow', value: computedStyle.getPropertyValue('--asm-motion-duration-slow') || '350ms' },
        ],
      },
      {
        title: 'Colors - Brand',
        tokens: [
          { name: '--asm-color-brand-primary-100', value: computedStyle.getPropertyValue('--asm-color-brand-primary-100') || '#e6f2ff' },
          { name: '--asm-color-brand-primary-600', value: computedStyle.getPropertyValue('--asm-color-brand-primary-600') || '#0066cc' },
          { name: '--asm-color-brand-primary-700', value: computedStyle.getPropertyValue('--asm-color-brand-primary-700') || '#0052a3' },
        ],
      },
      {
        title: 'Colors - Surface',
        tokens: [
          { name: '--asm-color-surface-base', value: computedStyle.getPropertyValue('--asm-color-surface-base') || '#ffffff' },
          { name: '--asm-color-surface-raised', value: computedStyle.getPropertyValue('--asm-color-surface-raised') || '#f5f5f5' },
          { name: '--asm-color-surface-muted', value: computedStyle.getPropertyValue('--asm-color-surface-muted') || '#f5f5f5' },
          { name: '--asm-color-surface-hover', value: computedStyle.getPropertyValue('--asm-color-surface-hover') || '#e8e8e8' },
        ],
      },
      {
        title: 'Colors - Text',
        tokens: [
          { name: '--asm-color-text-primary', value: computedStyle.getPropertyValue('--asm-color-text-primary') || '#000000' },
          { name: '--asm-color-text-secondary', value: computedStyle.getPropertyValue('--asm-color-text-secondary') || '#666666' },
        ],
      },
      {
        title: 'Colors - Border',
        tokens: [
          { name: '--asm-color-border', value: computedStyle.getPropertyValue('--asm-color-border') || '#e0e0e0' },
          { name: '--asm-color-border-hover', value: computedStyle.getPropertyValue('--asm-color-border-hover') || '#b0b0b0' },
          { name: '--asm-color-focus-ring', value: computedStyle.getPropertyValue('--asm-color-focus-ring') || '#0066cc' },
        ],
      },
      {
        title: 'Colors - Semantic',
        tokens: [
          { name: '--asm-color-success-600', value: computedStyle.getPropertyValue('--asm-color-success-600') || '#28a745' },
          { name: '--asm-color-warning-600', value: computedStyle.getPropertyValue('--asm-color-warning-600') || '#ffc107' },
          { name: '--asm-color-danger-600', value: computedStyle.getPropertyValue('--asm-color-danger-600') || '#dc3545' },
          { name: '--asm-color-info-600', value: computedStyle.getPropertyValue('--asm-color-info-600') || '#17a2b8' },
        ],
      },
    ]

    setTokenGroups(groups)
  }, [])

  return (
    <div className={styles.tokens}>
      <h1 className={styles.title}>Design Tokens</h1>
      <p className={styles.subtitle}>
        Explore the design token system powering theming and customization. Values update live when you change theme, contrast, density, or direction.
      </p>

      <div className={styles.grid}>
        {tokenGroups.map((group) => (
          <Card key={group.title}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            <div className={styles.tokenList}>
              {group.tokens.map((token) => (
                <div key={token.name} className={styles.tokenItem}>
                  <div className={styles.tokenName}>
                    <code>{token.name}</code>
                  </div>
                  <div className={styles.tokenValue}>
                    {token.name.includes('color') && (
                      <div
                        className={styles.colorSwatch}
                        style={{ backgroundColor: token.value.trim() }}
                      />
                    )}
                    <code>{token.value.trim() || 'not set'}</code>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Usage</h2>
        <Card>
          <p className={styles.text}>
            Import the design tokens CSS file in your application entry point:
          </p>
          <pre className={styles.codeBlock}>
{`import '@asafarim/design-tokens/css'`}
          </pre>
          <p className={styles.text}>
            Then use the CSS custom properties in your styles:
          </p>
          <pre className={styles.codeBlock}>
{`.myComponent {
  padding: var(--asm-space-4);
  border-radius: var(--asm-radius-md);
  color: var(--asm-color-text-primary);
  background-color: var(--asm-color-surface-base);
  transition: all var(--asm-motion-duration-normal) ease;
}`}
          </pre>
        </Card>
      </section>
    </div>
  )
}
