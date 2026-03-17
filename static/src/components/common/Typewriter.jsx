import { useRef } from 'react'
import useTypewriter from '../../hooks/useTypewriter.js'

export default function Typewriter({ text, speed = 35, className = '', ariaLabel }) {
  const { displayText, done, start } = useTypewriter(text, speed)
  const observerRef = useRef(null)

  const setRef = (el) => {
    if (!el || observerRef.current) return
    observerRef.current = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { start(); observerRef.current.disconnect() } },
      { threshold: 0.1 }
    )
    observerRef.current.observe(el)
  }

  return (
    <span ref={setRef} className={className} aria-label={ariaLabel || text}>
      {displayText}
      {!done && <span className="typewriter-cursor">|</span>}
    </span>
  )
}
