export default function TermsPage() {
  return (
    <div className="section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="section-title">Terms of Use</h1>
        <p className="text-slate-500 text-sm">Last updated: February 2026</p>
      </div>
      <div className="space-y-6">
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-3">Acceptance of Terms</h2>
          <p className="text-slate-300 leading-relaxed">By accessing this portfolio website, you agree to these terms of use. If you disagree with any part, please do not use this website.</p>
        </div>
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-3">Intellectual Property</h2>
          <p className="text-slate-300 leading-relaxed">All content on this website, including text, code, and design, is the intellectual property of Muhammad Shayan unless otherwise noted.</p>
        </div>
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-3">Disclaimer</h2>
          <p className="text-slate-300 leading-relaxed">This website is provided "as is" without warranties of any kind. We reserve the right to modify these terms at any time.</p>
        </div>
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
          <p className="text-slate-300 leading-relaxed">For questions about these terms, contact <a href="mailto:12mshayan@gmail.com" className="text-primary-400 hover:text-primary-300">12mshayan@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  )
}
