import { Link, Outlet, useLocation } from 'react-router-dom'
import styles from './DemoLayout.module.css'

export function DemoLayout() {
  const location = useLocation()

  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <Link to="/" className={styles.brand}>
            Progress Bars Demo
          </Link>
          <div className={styles.links}>
            <Link
              to="/"
              className={location.pathname === '/' ? `${styles.link} ${styles.active}` : styles.link}
            >
              Home
            </Link>
            <Link
              to="/components"
              className={location.pathname === '/components' ? `${styles.link} ${styles.active}` : styles.link}
            >
              Components
            </Link>
          </div>
        </div>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
