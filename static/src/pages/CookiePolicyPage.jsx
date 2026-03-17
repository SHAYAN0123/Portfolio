export default function CookiePolicyPage() {
  return (
    <div className="section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="section-title">Cookie Policy</h1>
        <p className="text-slate-500 text-sm">Last updated: February 2026</p>
      </div>
      <div className="space-y-6">
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-3">What Are Cookies?</h2>
          <p className="text-slate-300 leading-relaxed">Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your experience.</p>
        </div>
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-4">Cookies We Use</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th scope="col" className="py-3 pr-4 text-slate-300 font-semibold">Cookie</th>
                  <th scope="col" className="py-3 pr-4 text-slate-300 font-semibold">Purpose</th>
                  <th scope="col" className="py-3 text-slate-300 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody className="text-slate-400">
                {[
                  { name: 'session', purpose: 'Maintains your session', duration: 'Session' },
                  { name: 'csrf_token', purpose: 'Security protection', duration: 'Session' },
                  { name: 'cookie_consent', purpose: 'Remembers your preferences', duration: '1 year' },
                ].map(c => (
                  <tr key={c.name} className="border-b border-white/5">
                    <td className="py-3 pr-4 font-mono text-primary-400">{c.name}</td>
                    <td className="py-3 pr-4">{c.purpose}</td>
                    <td className="py-3">{c.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-3">Managing Cookies</h2>
          <p className="text-slate-300 leading-relaxed">You can control cookies through your browser settings or our cookie consent banner. Note that disabling certain cookies may affect website functionality.</p>
        </div>
      </div>
    </div>
  )
}
