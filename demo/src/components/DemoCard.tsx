import { ReactNode } from 'react'
import styles from './DemoCard.module.css'

interface DemoCardProps {
  title: ReactNode
  children: ReactNode
}

export function DemoCard({ title, children }: DemoCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
