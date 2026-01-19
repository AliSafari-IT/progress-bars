import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.text}>Page not found</p>
          <Link to="/" className={styles.link}>
            Return to Home
          </Link>
        </div>
      </Card>
    </div>
  )
}
