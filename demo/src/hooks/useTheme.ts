import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export type Theme = 'light' | 'dark'
export type Contrast = 'normal' | 'high'
export type Density = 'comfortable' | 'compact'
export type Direction = 'ltr' | 'rtl'

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light')
  const [contrast, setContrast] = useLocalStorage<Contrast>('contrast', 'normal')
  const [density, setDensity] = useLocalStorage<Density>('density', 'comfortable')
  const [direction, setDirection] = useLocalStorage<Direction>('direction', 'ltr')

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    
    if (contrast === 'high') {
      root.setAttribute('data-contrast', 'high')
    } else {
      root.removeAttribute('data-contrast')
    }
    
    root.setAttribute('data-density', density)
    root.setAttribute('dir', direction)
  }, [theme, contrast, density, direction])

  return {
    theme,
    setTheme,
    contrast,
    setContrast,
    density,
    setDensity,
    direction,
    setDirection,
  }
}
