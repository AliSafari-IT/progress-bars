import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { useTheme } from '../hooks/useTheme'
import styles from './Layout.module.css'

export function Layout() {
  const themeContext = useTheme()

  return (
    <div className={styles.layout}>
      <Header themeContext={themeContext} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
