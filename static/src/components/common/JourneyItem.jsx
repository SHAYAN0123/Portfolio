import useIntersectionReveal from '../../hooks/useIntersectionReveal.js'

export default function JourneyItem({ children, className = '' }) {
  const ref = useIntersectionReveal('journey-visible')
  return (
    <article ref={ref} className={`journey-reveal ${className}`}>
      {children}
    </article>
  )
}
