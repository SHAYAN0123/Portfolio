import useTilt from '../../hooks/useTilt.js'

export default function TiltCard({ children, className = '', as: Tag = 'div', ...props }) {
  const { transform, handleMouseMove, handleMouseLeave } = useTilt()
  return (
    <Tag
      className={className}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  )
}
