import TiltCard from '../components/common/TiltCard.jsx'

const pillars = [
  {
    icon: '👨‍💻', title: 'Software Engineering',
    desc: 'Building robust, scalable, and maintainable software solutions',
    tags: ['Java','Python','JavaScript','TypeScript','OOP','React','Node.js','Express.js','Flask','REST APIs','HTML','CSS','Bootstrap','Tailwind CSS','Git','GitHub','Automated Testing','WCAG 2.1 AA','Responsive Design'],
  },
  {
    icon: '🎯', title: 'Product & Agile Leadership',
    desc: 'Bridging business needs with technical execution',
    tags: ['Scrum Master','Business Analysis','Sprint Planning','Retrospectives','Backlog Refinement','User Story Development','Requirements Gathering','Stakeholder Management','Cross-functional Teams','Process Optimization','Workshop Facilitation'],
  },
  {
    icon: '🤖', title: 'Cloud, Data & AI',
    desc: 'Embracing the future of cloud-native and LLM-driven development',
    tags: ['AWS','Docker','Kubernetes','Cloud Deployment','CI/CD','MongoDB','SQL','PostgreSQL','InfluxDB','Redis','MQTT','Grafana','IoT Systems','Systems Design','Large Language Models','AI-Assisted Development','Data Visualization','MVP Development'],
  },
]

const approach = [
  { icon: '🌍', title: 'Sustainability First', desc: 'Building software with environmental impact in mind. Green coding practices matter.' },
  { icon: '♿', title: 'Accessibility Always', desc: 'Creating inclusive experiences that work for everyone, following WCAG 2.1 AA compliance.' },
  { icon: '🤝', title: 'Collaboration Driven', desc: 'Best solutions come from diverse cross-functional teams working towards shared goals.' },
  { icon: '📈', title: 'Continuous Learning', desc: 'The tech landscape evolves fast. I embrace change and keep growing.' },
]

const exploring = [
  { icon: '🧠', label: 'LLM Development' },
  { icon: '☁️', label: 'Cloud Architecture' },
  { icon: '🌱', label: 'Green Software' },
  { icon: '📊', label: 'Data Engineering' },
]

export default function SkillsPage() {
  return (
    <section className="section" aria-labelledby="page-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 id="page-title" className="section-title">What I Do ✨</h1>
          <p className="section-subtitle mx-auto">Software Engineer × Product Thinker × Cloud &amp; Data Enthusiast</p>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12" aria-label="Skills and expertise">
          {pillars.map(p => (
            <TiltCard key={p.title} as="article" className="interactive-card text-center">
              <div className="text-5xl mb-4" aria-hidden="true">{p.icon}</div>
              <h2 className="text-xl font-bold gradient-text mb-2">{p.title}</h2>
              <p className="text-slate-400 text-sm mb-6">{p.desc}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {p.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Languages */}
        <div className="glass-card p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-white text-center mb-6">🌍 Languages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{flag:'🇬🇧',name:'English',level:'Full Professional'},{flag:'🇵🇰',name:'Punjabi',level:'Native / Bilingual'},{flag:'🇵🇰',name:'Urdu',level:'Native / Bilingual'},{flag:'🇮🇳',name:'Hindi',level:'Native / Bilingual'}].map(l => (
              <div key={l.name} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <span className="text-2xl">{l.flag}</span>
                <div><p className="font-semibold text-white text-sm">{l.name}</p><p className="text-slate-400 text-xs">{l.level}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* Currently Exploring */}
        <div className="glass-card p-6 md:p-8 mb-8 text-center">
          <h2 className="text-xl font-bold text-white mb-6">🚀 Currently Exploring</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {exploring.map(e => (
              <div key={e.label} className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-2xl min-w-[120px] hover:-translate-y-1 transition-transform">
                <span className="text-3xl">{e.icon}</span>
                <span className="text-slate-300 text-sm font-medium">{e.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="glass-card p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">🎓 Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 bg-white/5 rounded-2xl">
              <div className="text-4xl flex-shrink-0">🇪🇺</div>
              <div>
                <h3 className="font-bold text-white mb-1">Erasmus Mundus Joint Master's</h3>
                <p className="text-primary-400 text-sm font-semibold mb-1">Software Engineers for Green Deal (SE4GD)</p>
                <p className="text-slate-400 text-sm mb-2">Computer Science (Joint Degree UvA &amp; VU)</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {['University of Amsterdam','VU Amsterdam','LUT University, Finland',"Università dell'Aquila, Italy"].map(u => (
                    <span key={u} className="px-2 py-0.5 bg-primary-500/15 rounded text-xs text-slate-300">{u}</span>
                  ))}
                </div>
                <p className="text-slate-500 text-xs">September 2024 – September 2026</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-white/5 rounded-2xl">
              <div className="text-4xl flex-shrink-0">🇬🇧</div>
              <div>
                <h3 className="font-bold text-white mb-1">Bachelor of Science</h3>
                <p className="text-primary-400 text-sm font-semibold mb-1">Software Engineering</p>
                <p className="text-slate-400 text-sm mb-2">Liverpool John Moores University</p>
                <p className="text-slate-500 text-xs">October 2021 – July 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Approach */}
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl font-bold text-white text-center mb-6">💡 My Approach</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {approach.map(a => (
              <div key={a.title} className="text-center p-4 bg-white/5 rounded-2xl hover:border hover:border-primary-500/30 transition-all">
                <span className="text-3xl block mb-3">{a.icon}</span>
                <h3 className="font-semibold text-white text-sm mb-2">{a.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
