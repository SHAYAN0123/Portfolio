import { useState } from 'react'

export default function useMagnetic(strength = 0.3) {
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setTransform(`translate(${x * strength}px, ${y * strength}px)`)
  }

  const handleMouseLeave = () => setTransform('')

  return { transform, handleMouseMove, handleMouseLeave }
}
