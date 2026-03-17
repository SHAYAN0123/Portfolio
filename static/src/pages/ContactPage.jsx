import { Link } from 'react-router-dom'
import TiltCard from '../components/common/TiltCard.jsx'
import useContactForm from '../hooks/useContactForm.js'

const contactInfo = [
  { icon: '📧', label: 'Email', value: <a href="mailto:12mshayan@gmail.com" className="text-white hover:text-primary-300 transition-colors font-medium text-sm break-all">12mshayan@gmail.com</a>, sub: 'Best for formal inquiries' },
  { icon: '📱', label: 'Phone', value: <a href="tel:+393447744985" className="text-white hover:text-primary-300 transition-colors font-medium text-sm">+39 344 774 4985</a>, sub: 'Available Mon–Fri, 9AM–6PM CET' },
  { icon: '💼', label: 'LinkedIn', value: <a href="https://www.linkedin.com/in/muhammad-shayan-" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-300 transition-colors font-medium text-sm">Connect on LinkedIn</a>, sub: "Let's grow our network!" },
  { icon: '🐙', label: 'GitHub', value: <a href="https://github.com/12mshayan" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-300 transition-colors font-medium text-sm">Check my repos</a>, sub: 'See my code in action' },
  { icon: '📍', label: 'Location', value: <span className="text-white font-medium text-sm">Amsterdam, Netherlands 🇳🇱</span>, sub: 'Open to remote & relocation' },
  { icon: '🌍', label: 'Languages', value: <span className="text-white font-medium text-sm">English • Punjabi • Urdu • Hindi</span>, sub: "Let's communicate!" },
]

export default function ContactPage() {
  const { fields, errors, status, errorMsg, handleChange, handleSubmit, reset } = useContactForm()

  return (
    <section className="section" aria-labelledby="page-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 id="page-title" className="section-title">Let's Connect 🤝</h1>
          <p className="section-subtitle mx-auto">I'm always open to discussing new opportunities, collaborations, or just having a chat!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Contact information">
            {contactInfo.map(c => (
              <TiltCard key={c.label} as="article" className="interactive-card text-center">
                <div className="text-4xl mb-3" aria-hidden="true">{c.icon}</div>
                <h3 className="text-primary-400 font-semibold mb-2">{c.label}</h3>
                {c.value}
                <p className="text-slate-500 text-xs mt-1">{c.sub}</p>
              </TiltCard>
            ))}
          </div>

          {/* Contact Form */}
          <div className="glass-card p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">📬 Send a Message</h2>
              <p className="text-slate-400">Have a project idea or opportunity? I'd love to hear about it!</p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8 space-y-4">
                <div className="text-5xl">🎉</div>
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-slate-400">Thanks for reaching out! I'll get back to you as soon as possible.</p>
                <button onClick={reset} className="btn-secondary mt-4">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                  {[
                    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
                    { name: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?" },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
                      <input
                        id={name} name={name} type={type} value={fields[name]}
                        onChange={handleChange} placeholder={placeholder}
                        className={`input${errors[name] ? ' border-red-500/50' : ''}`}
                      />
                      {errors[name] && <p className="mt-1 text-red-400 text-xs" role="alert">{errors[name]}</p>}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">Message</label>
                    <textarea
                      id="message" name="message" value={fields.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, opportunity, or just say hi!"
                      className={`textarea${errors.message ? ' border-red-500/50' : ''}`}
                      rows={5}
                    />
                    {errors.message && <p className="mt-1 text-red-400 text-xs" role="alert">{errors.message}</p>}
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm text-center" role="alert">{errorMsg}</p>
                  )}

                  <button type="submit" className="btn-primary w-full" disabled={status === 'submitting'}>
                    {status === 'submitting' ? '⏳ Sending...' : '🚀 Send Message'}
                  </button>

                  <p className="text-center text-slate-500 text-xs">
                    🔒 Your data is safe with me. See my{' '}
                    <Link to="/privacy/policy" className="text-primary-400 hover:text-primary-300 transition-colors">Privacy Policy</Link>.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Currently Open For */}
        <div className="glass-card p-8 mt-12 text-center">
          <h2 className="text-xl font-bold text-white mb-6">🎯 Currently Open For</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="btn-primary text-sm animate-pulse-glow">Graduate Positions</span>
            <span className="btn-secondary text-sm">Research Collaborations</span>
            <span className="btn-secondary text-sm">Sustainability Projects</span>
            <span className="btn-secondary text-sm">Freelance Work</span>
            <span className="btn-secondary text-sm">Coffee Chats ☕</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold text-white mb-6">🌐 Find Me Online</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.linkedin.com/in/muhammad-shayan-" target="_blank" rel="noopener noreferrer" className="btn-secondary" aria-label="LinkedIn Profile">💼 LinkedIn</a>
            <a href="https://github.com/12mshayan" target="_blank" rel="noopener noreferrer" className="btn-secondary" aria-label="GitHub Profile">🐙 GitHub</a>
            <a href="mailto:12mshayan@gmail.com" className="btn-secondary" aria-label="Email">📧 Email</a>
          </div>
        </div>
      </div>
    </section>
  )
}
