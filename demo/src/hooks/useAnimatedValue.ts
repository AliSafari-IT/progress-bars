import { useState, useEffect, useRef } from 'react'

export function useAnimatedValue(targetValue: number, duration: number = 2000) {
  const [value, setValue] = useState(targetValue)
  const rafRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const startValueRef = useRef<number>(targetValue)

  useEffect(() => {
    startValueRef.current = value
    startTimeRef.current = performance.now()

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) return

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutQuad = 1 - (1 - progress) * (1 - progress)
      const currentValue = startValueRef.current + (targetValue - startValueRef.current) * easeOutQuad

      setValue(currentValue)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [targetValue, duration])

  return value
}
