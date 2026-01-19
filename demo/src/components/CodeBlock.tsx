import { ReactNode } from 'react'
import styles from './CodeBlock.module.css'

interface CodeBlockProps {
  children: ReactNode
  inline?: boolean
}

export function CodeBlock({ children, inline = false }: CodeBlockProps) {
  if (inline) {
    return <code className={styles.inline}>{children}</code>
  }

  return (
    <pre className={styles.pre}>
      <code className={styles.code}>{children}</code>
    </pre>
  )
}
