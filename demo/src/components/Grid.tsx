import { ReactNode, CSSProperties } from 'react'
import styles from './Grid.module.css'

interface GridProps {
  children: ReactNode
  columns?: number
  gap?: string
  className?: string
}

export function Grid({ children, columns = 2, gap, className }: GridProps) {
  const style: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  }
  
  if (gap) {
    style.gap = gap
  }

  return (
    <div 
      className={className ? `${styles.grid} ${className}` : styles.grid}
      style={style}
    >
      {children}
    </div>
  )
}
