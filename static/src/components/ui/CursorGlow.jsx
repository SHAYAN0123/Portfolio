import { useEffect } from 'react'

export default function CursorGlow() {
  useEffect(() => {
    const glow = document.createElement('div')
    glow.style.cssText = 'position:fixed;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%);pointer-events:none;z-index:1;transform:translate(-50%,-50%);transition:opacity 0.3s;'
    document.body.appendChild(glow)

    const onMove = (e) => {
      glow.style.left = e.clientX + 'px'
      glow.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); glow.remove() }
  }, [])

  return null
}
