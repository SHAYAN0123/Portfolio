import useIntersectionReveal from '../../hooks/useIntersectionReveal.js'

export default function SectionReveal({ children, className = '', as: Tag = 'div' }) {
  const ref = useIntersectionReveal('section-visible')
  return (
    <Tag ref={ref} className={`section-reveal ${className}`}>
      {children}
    </Tag>
  )
}
