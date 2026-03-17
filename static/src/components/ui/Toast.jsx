export default function Toast({ message, type = 'info', onDismiss }) {
  const styles = {
    success: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
    error: 'bg-red-500/20 border-red-500/30 text-red-300',
    warning: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
    info: 'bg-primary-500/20 border-primary-500/30 text-primary-300',
  }

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-xl border shadow-lg ${styles[type] || styles.info}`}>
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="p-1 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Dismiss message"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
