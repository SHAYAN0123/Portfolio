import { useRef } from 'react'
import useCounter from '../../hooks/useCounter.js'

export default function Counter({ target, suffix = '', className = '' }) {
  const { count, animate } = useCounter(target)
  const observerRef = useRef(null)

  const setRef = (el) => {
    if (!el || observerRef.current) return
    observerRef.current = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { animate(); observerRef.current.disconnect() } },
      { threshold: 0.1 }
    )
    observerRef.current.observe(el)
  }

  return (
    <span ref={setRef} className={`gradient-text font-black ${className}`}>
      {count}{suffix}
    </span>
  )
}
