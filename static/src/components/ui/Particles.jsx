import { useEffect } from 'react'

export default function Particles() {
  useEffect(() => {
    const container = document.createElement('div')
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;'
    document.body.appendChild(container)

    const particles = Array.from({ length: 20 }, (_, i) => {
      const p = document.createElement('div')
      const size = Math.random() * 3 + 1
      const x = Math.random() * 100
      const delay = Math.random() * 10
      const duration = Math.random() * 15 + 10
      p.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:rgba(99,102,241,${Math.random() * 0.3 + 0.1});border-radius:50%;left:${x}%;bottom:-10px;animation:particleFloat ${duration}s ${delay}s linear infinite;`
      return p
    })

    particles.forEach(p => container.appendChild(p))

    const style = document.createElement('style')
    style.textContent = '@keyframes particleFloat{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(-100vh) rotate(720deg);opacity:0}}'
    document.head.appendChild(style)

    return () => { container.remove(); style.remove() }
  }, [])

  return null
}
