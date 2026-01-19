import { NavLink } from 'react-router-dom'
import { GlobalControls } from './GlobalControls'
import styles from './Header.module.css'

interface HeaderProps {
  themeContext: {
    theme: string
    setTheme: (theme: 'light' | 'dark') => void
    contrast: string
    setContrast: (contrast: 'normal' | 'high') => void
    density: string
    setDensity: (density: 'comfortable' | 'compact') => void
    direction: string
    setDirection: (direction: 'ltr' | 'rtl') => void
  }
}

const Logo = () => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
      <defs>
        <style>{`
      :root {
        --logo-primary: var(--asm-color-brand-primary-600, #0066cc);
        --logo-success: var(--asm-color-success-600, #28a745);
        --logo-warning: var(--asm-color-warning-600, #ffc107);
        --logo-danger: var(--asm-color-danger-600, #dc3545);
        --logo-bg: var(--asm-color-surface-muted, #e0e0e0);
      }
      
      .logo-bg { fill: var(--logo-bg); }
      .logo-track { fill: none; stroke: var(--logo-bg); stroke-width: 3; }
      .logo-progress-1 { fill: none; stroke: var(--logo-primary); stroke-width: 3; stroke-linecap: round; }
      .logo-progress-2 { fill: none; stroke: var(--logo-success); stroke-width: 3; stroke-linecap: round; }
      .logo-progress-3 { fill: none; stroke: var(--logo-warning); stroke-width: 3; stroke-linecap: round; }
      .logo-progress-4 { fill: none; stroke: var(--logo-danger); stroke-width: 3; stroke-linecap: round; }
      
      @keyframes progress-fill-1 {
        0% { stroke-dashoffset: 50; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes progress-fill-2 {
        0% { stroke-dashoffset: 50; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes progress-fill-3 {
        0% { stroke-dashoffset: 50; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes progress-fill-4 {
        0% { stroke-dashoffset: 50; }
        100% { stroke-dashoffset: 0; }
      }
      
      .logo-progress-1 { animation: progress-fill-1 2s ease-in-out infinite; }
      .logo-progress-2 { animation: progress-fill-2 2.2s ease-in-out infinite 0.2s; }
      .logo-progress-3 { animation: progress-fill-3 2.4s ease-in-out infinite 0.4s; }
      .logo-progress-4 { animation: progress-fill-4 2.6s ease-in-out infinite 0.6s; }
    `}</style>
      </defs>

      <circle cx="100" cy="100" r="95" className="logo-bg" opacity="0.1" />

      <circle cx="100" cy="100" r="30" className="logo-track" />
      <circle
        cx="100"
        cy="100"
        r="30"
        className="logo-progress-1"
        strokeDasharray="50 188.4"
        transform="rotate(-90 100 100)"
      />

      <circle cx="100" cy="100" r="50" className="logo-track" />
      <circle
        cx="100"
        cy="100"
        r="50"
        className="logo-progress-2"
        strokeDasharray="50 264"
        transform="rotate(-90 100 100)"
      />

      <circle cx="100" cy="100" r="70" className="logo-track" />
      <circle
        cx="100"
        cy="100"
        r="70"
        className="logo-progress-3"
        strokeDasharray="50 439.8"
        transform="rotate(-90 100 100)"
      />

      <circle cx="100" cy="100" r="90" className="logo-track" />
      <circle
        cx="100"
        cy="100"
        r="90"
        className="logo-progress-4"
        strokeDasharray="50 565.2"
        transform="rotate(-90 100 100)"
      />

      <circle cx="100" cy="100" r="8" fill="var(--logo-primary)" />
      <text x="100" y="150" textAnchor="middle" fill="var(--asm-color-text)" fontSize="50">Progress</text>
      <text x="100" y="200" textAnchor="middle" fill="var(--asm-color-text)" fontSize="50">Bars</text>
    </svg>

  )
}

export function Header({ themeContext }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <div className={styles.brand}>
          <span className={styles.logo}><Logo /></span>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/linear"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            Linear
          </NavLink>
          <NavLink
            to="/examples"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            Examples
          </NavLink>
          <NavLink
            to="/visual-grid"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            Visual Grid
          </NavLink>
          <NavLink
            to="/a11y"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            A11y
          </NavLink>
          <NavLink
            to="/tokens"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            Tokens
          </NavLink>
          <NavLink
            to="/roadmap"
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            Roadmap
          </NavLink>
        </nav>

        <GlobalControls themeContext={themeContext} />
      </div>
    </header>
  )
}
