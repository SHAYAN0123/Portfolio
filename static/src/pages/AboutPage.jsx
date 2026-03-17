import { Link } from 'react-router-dom'
import Counter from '../components/common/Counter.jsx'
import TiltCard from '../components/common/TiltCard.jsx'

const education = [
  { flag: '🇳🇱', title: 'University of Amsterdam & VU Amsterdam', degree: "Master's in Computer Science (Joint Degree)", period: 'Sep 2024 – Sep 2026', badge: 'Erasmus Mundus SE4GD' },
  { flag: '🇫🇮', title: 'LUT University', degree: "Master's in Computer Software Engineering", period: 'Sep 2024 – Aug 2026', badge: 'Erasmus Mundus SE4GD' },
  { flag: '🇮🇹', title: "Università degli Studi dell'Aquila", degree: "Master's in Computer Software Engineering", period: 'Sep 2024 – Aug 2026', badge: 'Erasmus Mundus SE4GD' },
  { flag: '🇬🇧', title: 'Liverpool John Moores University', degree: 'BSc Software Engineering', period: 'Oct 2021 – Jul 2024', badge: null },
]

const languages = [
  { flag: '🇬🇧', name: 'English', level: 'Full Professional' },
  { flag: '🇵🇰', name: 'Urdu', level: 'Native' },
  { flag: '🇵🇰', name: 'Punjabi', level: 'Native' },
  { flag: '🇮🇳', name: 'Hindi', level: 'Native' },
]

export default function AboutPage() {
  return (
    <section className="section" aria-labelledby="page-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 id="page-title" className="section-title">👋 About Me</h1>
          <p className="section-subtitle mx-auto">The story behind the code</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-20">
          {/* Avatar */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative" role="img" aria-label="Muhammad Shayan profile photo">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 opacity-20 blur-xl animate-pulse-glow" />
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-primary-500/40 via-secondary-500/40 to-accent-500/40" />
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-3xl glass-card flex flex-col items-center justify-center gap-3">
                <div className="text-7xl md:text-8xl">👨‍💻</div>
                <div className="availability-badge text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Available for Opportunities
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Hi, I'm <span className="gradient-text">Muhammad Shayan</span></h2>
            <p className="text-primary-300 font-medium">🎓 Erasmus Mundus Scholar (SE4GD) | 💻 Software Engineer | ☁️ Cloud Enthusiast</p>
            <p className="text-slate-300 leading-relaxed">
              I'm currently pursuing a Master's degree in Computer Science as part of the{' '}
              <strong className="text-white">Erasmus Mundus Software Engineers for Green Deal (SE4GD)</strong> program
              across four prestigious universities: University of Amsterdam, VU Amsterdam, LUT University, and Università degli Studi dell'Aquila.
            </p>
            <div className="glass-card p-4 border-l-4 border-primary-500">
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-white">What is SE4GD?</strong> It's an EU-funded Erasmus Mundus Joint Master's program that trains software engineers to build sustainable, environmentally-conscious software solutions. The program focuses on green computing, energy-efficient systems, and leveraging technology to address climate challenges — aligning software development with the European Green Deal goals.
              </p>
            </div>
            <p className="text-slate-300 leading-relaxed">
              My academic journey includes a Bachelor of Science in Software Engineering from Liverpool John Moores University, where I built a strong foundation in computer science principles.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Currently, I'm working as a Graduate Thesis Research Intern at <strong className="text-white">Schuberg Philis</strong> in Amsterdam, contributing to innovative projects in systems design and large language model development.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[{n:4,label:'Universities'},{n:5,s:'+',label:'Internships'},{n:4,label:'Languages'},{n:4,label:'Countries'}].map(({n,s='',label}) => (
                <div key={label} className="glass-card p-4 text-center">
                  <span className="text-3xl font-black"><Counter target={n} suffix={s} /></span>
                  <span className="block text-xs text-slate-400 mt-1">{label}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link to="/contact" className="btn-primary">💬 Let's Connect</Link>
            </div>
          </div>
        </div>

        {/* Education */}
        <section aria-labelledby="education-title" className="mb-20">
          <h2 id="education-title" className="section-title text-center mb-10">🎓 Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map(e => (
              <TiltCard key={e.title} as="article" className="interactive-card">
                <div className="text-4xl mb-4" aria-hidden="true">{e.flag}</div>
                <h3 className="text-lg font-bold text-white mb-1">{e.title}</h3>
                <p className="text-primary-400 font-medium text-sm mb-1">{e.degree}</p>
                <p className="text-slate-500 text-sm mb-3">{e.period}</p>
                {e.badge && <span className="badge">{e.badge}</span>}
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section aria-labelledby="languages-title">
          <h2 id="languages-title" className="section-title text-center mb-10">🌍 Languages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map(l => (
              <div key={l.name} className="interactive-card text-center">
                <div className="text-3xl mb-2">{l.flag}</div>
                <p className="font-semibold text-white">{l.name}</p>
                <p className="text-slate-400 text-sm">{l.level}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
