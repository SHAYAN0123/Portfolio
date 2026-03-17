import useMagnetic from '../../hooks/useMagnetic.js'

export default function MagneticButton({ children, className = '', as: Tag = 'button', ...props }) {
  const { transform, handleMouseMove, handleMouseLeave } = useMagnetic()
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
