import useScrollToTop from '../../hooks/useScrollToTop.js'

export default function ScrollToTop() {
  const { visible, scrollToTop } = useScrollToTop()

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-slate-300 hover:text-white hover:scale-110 transition-all shadow-lg"
      aria-label="Scroll to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
