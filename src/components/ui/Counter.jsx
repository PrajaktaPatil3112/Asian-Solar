import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

// Animated number that counts up from 0 when scrolled into view.
export default function Counter({ value, suffix = '', duration = 1600 }) {
  const [display, setDisplay] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const start = performance.now()
    let raf

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
