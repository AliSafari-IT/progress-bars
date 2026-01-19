import styles from './GlobalControls.module.css'

interface GlobalControlsProps {
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

export function GlobalControls({ themeContext }: GlobalControlsProps) {
  return (
    <div className={styles.controls}>
      <label className={styles.control}>
        <span className={styles.label}>Theme</span>
        <select 
          className={styles.select}
          value={themeContext.theme}
          onChange={(e) => themeContext.setTheme(e.target.value as 'light' | 'dark')}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>

      <label className={styles.control}>
        <span className={styles.label}>Contrast</span>
        <select 
          className={styles.select}
          value={themeContext.contrast}
          onChange={(e) => themeContext.setContrast(e.target.value as 'normal' | 'high')}
        >
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </label>

      <label className={styles.control}>
        <span className={styles.label}>Density</span>
        <select 
          className={styles.select}
          value={themeContext.density}
          onChange={(e) => themeContext.setDensity(e.target.value as 'comfortable' | 'compact')}
        >
          <option value="comfortable">Comfortable</option>
          <option value="compact">Compact</option>
        </select>
      </label>

      <label className={styles.control}>
        <span className={styles.label}>Dir</span>
        <select 
          className={styles.select}
          value={themeContext.direction}
          onChange={(e) => themeContext.setDirection(e.target.value as 'ltr' | 'rtl')}
        >
          <option value="ltr">LTR</option>
          <option value="rtl">RTL</option>
        </select>
      </label>
    </div>
  )
}
