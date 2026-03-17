import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="text-8xl mb-6" aria-hidden="true">🔍</div>
        <h1 className="text-4xl md:text-5xl font-black gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">🏠 Go Home</Link>
          <Link to="/contact" className="btn-secondary">💬 Contact Me</Link>
        </div>
      </div>
    </div>
  )
}
