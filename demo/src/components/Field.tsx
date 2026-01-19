import { ReactNode } from 'react'
import styles from './Field.module.css'

interface FieldProps {
  label: string
  children: ReactNode
  hint?: string
  htmlFor?: string
}

export function Field({ label, children, hint, htmlFor }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      <div className={styles.control}>{children}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
    </div>
  )
}
