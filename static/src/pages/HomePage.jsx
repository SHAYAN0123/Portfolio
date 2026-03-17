import { Link } from 'react-router-dom'
import Counter from '../components/common/Counter.jsx'
import Typewriter from '../components/common/Typewriter.jsx'
import TiltCard from '../components/common/TiltCard.jsx'
import MagneticButton from '../components/common/MagneticButton.jsx'
import SectionReveal from '../components/common/SectionReveal.jsx'
import JourneyItem from '../components/common/JourneyItem.jsx'

const techStack = [
  '🐍 Python','☕ Java','🟦 TypeScript','🟨 JavaScript','⚛️ React','🌶️ Flask',
  '🟢 Node.js','🐳 Docker','☸️ Kubernetes','☁️ AWS','🐘 PostgreSQL','🍃 MongoDB',
  '📊 Grafana','🌿 Redis','🎨 Tailwind CSS',
]

const whatIDo = [
  {
    icon: '💻', title: 'Software Engineering', color: 'primary',
    desc: 'Building scalable, maintainable software solutions, focusing on clean architecture and best practices.',
    tags: ['Java','Python','TypeScript','React'],
  },
  {
    icon: '📊', title: 'Data & Analytics', color: 'secondary',
    desc: 'Experience with InfluxDB, Grafana, and data pipelines. Passionate about turning data into actionable insights.',
    tags: ['InfluxDB','Grafana','PostgreSQL','SQL'],
  },
  {
    icon: '☁️', title: 'Cloud & DevOps', color: 'accent',
    desc: 'Cloud deployment, CI/CD pipelines, and containerization. Building sustainable, accessible applications.',
    tags: ['AWS','Docker','Kubernetes','CI/CD'],
  },
]

const journey = [
  {
    icon: '🔬', border: 'border-emerald-500/60 hover:border-emerald-500', iconBg: 'bg-emerald-500/15 border-emerald-500/20',
    period: 'November 2025 – Present', location: '📍 Amsterdam, Netherlands',
    title: 'Graduate Thesis Research Intern', company: 'Schuberg Philis', current: true,
    desc: 'Contributing to innovative projects at a leading mission-critical IT company, leveraging expertise in systems design and large language model development for my Master\'s thesis research.',
    tags: ['LLM Development','Systems Design','Research','Python'],
    badges: [],
  },
  {
    icon: '📱', border: 'border-primary-500/60 hover:border-primary-500', iconBg: 'bg-primary-500/15 border-primary-500/20',
    period: 'February 2025 – June 2025', location: '📍 Finland',
    title: 'Scrum Master', company: 'Elisa', current: false,
    bullets: [
      'Directed a 4-member cross-functional team, delivering a cloud-deployed MVP',
      <>Met <strong className="text-white">WCAG 2.1 AA compliance</strong> for full accessibility</>,
      <>Guided the team to implement <strong className="text-white">34+ automated tests</strong> across all system components</>,
    ],
    tags: ['Scrum','Cloud MVP','WCAG 2.1 AA','Automated Testing'],
    badges: [{ cls: 'badge-success', text: '♿ WCAG 2.1 AA' }, { cls: 'badge-success', text: '🧪 34+ Tests' }],
  },
  {
    icon: '📊', border: 'border-secondary-500/60 hover:border-secondary-500', iconBg: 'bg-secondary-500/15 border-secondary-500/20',
    period: 'May 2024 – August 2024', location: '📍 Islamabad, Pakistan',
    title: 'Business Analyst', company: 'Oak Street Technologies', current: false,
    bullets: [
      'Selected as the only intern onboarded on two flagship projects with the product team',
      'Created detailed user stories improving project workflows and efficiency',
      'Identified key areas for process optimization, providing actionable insights',
    ],
    tags: ['Business Analysis','User Stories','Agile'],
    badges: [{ cls: 'badge-warning', text: '🏆 Only Intern on 2 Flagship Projects' }],
  },
  {
    icon: '🌿', border: 'border-amber-500/60 hover:border-amber-500', iconBg: 'bg-amber-500/15 border-amber-500/20',
    period: 'July 2023 – August 2023', location: '📍 Islamabad, Pakistan',
    title: 'Front-End Developer', company: 'MRS Technologies', current: false,
    highlight: '⭐ Top 15 out of 13,000 candidates · "High Potential Talent" Award',
    highlightCls: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
    bullets: [
      'Led Frontend team for IoT-based microgreens plant monitoring system',
      'Collaborated with Backend, UI/UX & Embedded teams',
    ],
    tags: ['IoT','MQTT','InfluxDB','Grafana'],
    badges: [{ cls: 'badge-warning', text: '🏆 Top 15 of 13,000' }, { cls: 'badge-warning', text: '⭐ High Potential Talent Award' }],
  },
  {
    icon: '🚀', border: 'border-slate-500/60 hover:border-slate-400', iconBg: 'bg-white/5 border-white/10',
    period: 'August 2022 – December 2022', location: '📍 Pakistan',
    title: 'Frontend Web Developer', company: 'The Digital Robe', current: false,
    desc: 'Where it all began! Developed responsive company website using HTML, CSS, Bootstrap, and JavaScript.',
    tags: ['HTML','CSS','Bootstrap','JavaScript'],
    badges: [{ cls: '', text: '🌟 The Beginning' }],
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden" aria-labelledby="hero-title">
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-orb hero-orb-3" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-5xl mx-auto">
            <div className="availability-badge mb-8 animate-fade-in" style={{ animationFillMode: 'both' }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              Open to Graduate Positions &amp; Research Opportunities
            </div>

            <h1 id="hero-title" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-[0.95] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <span className="gradient-text block">Muhammad</span>
              <span className="gradient-text block">Shayan</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-6 font-light min-h-[2em] animate-fade-in-up" style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
              <Typewriter text="Software Engineer  ·  Erasmus Mundus Scholar  ·  Cloud Enthusiast" speed={35} ariaLabel="Software Engineer · Erasmus Mundus Scholar · Cloud Enthusiast" />
            </p>

            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.35s', animationFillMode: 'both' }}>
              Passionate about solving complex problems through Software, Data &amp; Cloud technologies.
              Currently pursuing my Master's in Computer Science at University of Amsterdam.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-14 animate-fade-in-up" style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>
              <MagneticButton as={Link} to="/projects" className="btn-primary text-base px-8 py-3.5 group">
                <span className="group-hover:translate-x-[-2px] transition-transform inline-block">🚀</span> View My Work
              </MagneticButton>
              <MagneticButton as={Link} to="/contact" className="btn-secondary text-base px-8 py-3.5 group">
                <span className="group-hover:scale-110 transition-transform inline-block">💬</span> Get in Touch
              </MagneticButton>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.55s', animationFillMode: 'both' }}>
              {[{n:5,s:'+',label:'Internships'},{n:4,s:'',label:'Universities'},{n:4,s:'',label:'Countries'},{n:3,s:'+',label:'Years Exp.'}].map(({n,s,label}) => (
                <div key={label} className="stat-card">
                  <div className="text-3xl font-black"><Counter target={n} suffix={s} /></div>
                  <div className="text-slate-500 text-xs mt-1 uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.65s', animationFillMode: 'both' }}>
              <span className="badge">🎓 Erasmus Mundus SE4GD</span>
              <span className="badge">💻 Software Engineering</span>
              <span className="badge">☁️ Cloud &amp; DevOps</span>
              <span className="badge">📊 Data &amp; AI</span>
              <span className="badge">🌱 Green Software</span>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 animate-bounce opacity-50" aria-hidden="true">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Scroll</span>
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Tech Stack Strip */}
      <div className="relative border-y border-white/5 bg-white/[0.015] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-xs uppercase tracking-[0.2em] mb-6 font-semibold">Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techStack.map(t => <span key={t} className="tech-badge">{t}</span>)}
          </div>
        </div>
      </div>

      {/* What I Do */}
      <section className="section" aria-labelledby="featured-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 id="featured-title" className="section-title">What I Do ✨</h2>
            <p className="section-subtitle mx-auto">Building impactful software at the intersection of engineering, data, and cloud</p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whatIDo.map(({ icon, title, color, desc, tags }, i) => (
              <TiltCard key={title} as="article" className="interactive-card text-center group section-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-${color}-500/15 border border-${color}-500/20 flex items-center justify-center text-3xl group-hover:bg-${color}-500/25 transition-colors`}>{icon}</div>
                <h3 className="text-xl font-bold gradient-text mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{desc}</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {tags.map(t => <span key={t} className="skill-tag text-xs">{t}</span>)}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section" aria-labelledby="journey-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 id="journey-title" className="section-title">💼 My Journey</h2>
            <p className="section-subtitle mx-auto">From my first lines of code to building cloud-deployed MVPs — here's my professional journey so far.</p>
          </SectionReveal>

          <div className="space-y-5">
            {journey.map((j) => (
              <JourneyItem key={j.title} className={`glass-card p-6 md:p-8 relative border-l-4 ${j.border} hover:translate-x-1 transition-all duration-300`}>
                {j.current && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse-glow">
                      🟢 Current Role
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${j.iconBg} flex items-center justify-center text-2xl flex-shrink-0`}>{j.icon}</div>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-1">
                      <span className="text-primary-400 text-sm font-semibold">{j.period}</span>
                      <span className="text-slate-500 text-sm">{j.location}</span>
                    </div>
                    <h3 className="text-xl font-bold gradient-text">{j.title}</h3>
                    <p className="text-primary-400 font-semibold text-sm">{j.company}</p>
                  </div>
                </div>
                {j.highlight && (
                  <div className={`p-3 mb-4 rounded-xl border text-sm font-semibold ${j.highlightCls}`}>{j.highlight}</div>
                )}
                {j.desc && <p className="text-slate-300 text-sm leading-relaxed mb-4">{j.desc}</p>}
                {j.bullets && (
                  <ul className="space-y-1.5 mb-4">
                    {j.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-slate-300 text-sm leading-relaxed">
                        <span className="text-primary-400 mt-0.5 flex-shrink-0">▹</span>{b}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2">
                  {j.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
                </div>
                {j.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 mt-3 border-t border-white/10">
                    {j.badges.map(b => <span key={b.text} className={`badge ${b.cls}`}>{b.text}</span>)}
                  </div>
                )}
              </JourneyItem>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" aria-labelledby="cta-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="relative glass-card p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
              <div className="relative z-10">
                <div className="text-4xl mb-4" aria-hidden="true">🤝</div>
                <h2 id="cta-title" className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Work Together?</h2>
                <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">Let's build something great. I'm always open to new opportunities, collaborations, and challenging ideas.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="btn-primary text-base px-8 py-3.5">💬 Get in Touch</Link>
                  <Link to="/projects" className="btn-secondary text-base px-8 py-3.5">🚀 See My Work</Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
