import useScrollProgress from '../../hooks/useScrollProgress.js'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-primary-500 via-secondary-400 to-accent-500 pointer-events-none transition-none"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  )
}
