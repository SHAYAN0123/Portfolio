export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div className="absolute -top-64 -right-64 w-[700px] h-[700px] rounded-full bg-primary-600/10 blur-[120px] animate-blob" />
      <div className="absolute top-1/2 -left-64 w-[500px] h-[500px] rounded-full bg-secondary-600/8 blur-[100px] animate-blob" style={{ animationDelay: '3s' }} />
      <div className="absolute -bottom-64 right-1/4 w-[600px] h-[600px] rounded-full bg-accent-600/6 blur-[120px] animate-blob" style={{ animationDelay: '6s' }} />
    </div>
  )
}
