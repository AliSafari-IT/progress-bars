import { useState, ReactNode } from 'react'
import styles from './CodeSnippetDialog.module.css'

export interface CodeSnippetDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  code: string
  preview: ReactNode
}

export function CodeSnippetDialog({ isOpen, onClose, title, code, preview }: CodeSnippetDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.copyButton}
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.codePanel}>
            <pre className={`${styles.codeBlock}`}>
              <code>{code}</code>
            </pre>
          </div>
          <div className={styles.previewPanel}>
            <div className={`${styles.previewContent}`}>
              {preview}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
