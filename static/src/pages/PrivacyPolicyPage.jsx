export default function PrivacyPolicyPage() {
  return (
    <div className="section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="section-title">Privacy Policy</h1>
        <p className="text-slate-500 text-sm">Last updated: February 2026</p>
      </div>
      <div className="space-y-6">
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-3">Introduction</h2>
          <p className="text-slate-300 leading-relaxed">This Privacy Policy explains how we collect, use, and protect your information when you use this portfolio website.</p>
        </div>
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
          <p className="text-slate-300 leading-relaxed mb-4">We collect information you provide through our contact form:</p>
          <ul className="space-y-2 text-slate-300">
            {['Name','Email address','Message content'].map(i => (
              <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />{i}</li>
            ))}
          </ul>
        </div>
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-3">Your Rights (GDPR)</h2>
          <p className="text-slate-300 leading-relaxed mb-4">You have the right to:</p>
          <ul className="space-y-2 text-slate-300">
            {['Access your personal data','Rectify inaccurate data','Request erasure of your data','Object to processing','Data portability'].map(r => (
              <li key={r} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />{r}</li>
            ))}
          </ul>
        </div>
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-3">Data Retention</h2>
          <p className="text-slate-300 leading-relaxed">Contact form submissions are retained for as long as necessary to respond to your inquiry. We do not share your data with third parties.</p>
        </div>
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
          <p className="text-slate-300 leading-relaxed">For privacy concerns, contact us at <a href="mailto:12mshayan@gmail.com" className="text-primary-400 hover:text-primary-300">12mshayan@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  )
}
