import Counter from '../components/common/Counter.jsx'

const experiences = [
  {
    icon: '🔬', border: 'border-emerald-500/50', current: true,
    period: 'November 2025 – Present', location: '📍 Amsterdam, Netherlands',
    title: 'Graduate Thesis Research Intern', company: 'Schuberg Philis',
    desc: 'Contributing to innovative projects at a leading mission-critical IT company, leveraging expertise in systems design and large language model development for my Master\'s thesis research.',
    bullets: [],
    tags: ['Systems Design','LLM Development','Research','Python'],
    badges: [],
  },
  {
    icon: '📱', border: 'border-primary-500/50', current: false,
    period: 'February 2025 – June 2025', location: '📍 Finland',
    title: 'Scrum Master', company: 'Elisa',
    bullets: [
      "Directed a 4-member cross-functional team, facilitating sprint planning, retrospectives, and backlog refinement to deliver a cloud-deployed MVP.",
      "Coordinated with 3 Elisa project teams through workshops and joint reviews, aligning system architecture, integration requirements, and responsibilities.",
      "Shaped and prioritized the backlog, enabling delivery of an MVP with automated user story generation, reducing reliance on manual backlog preparation.",
      <>Embedded sustainability and accessibility goals into sprints, meeting <strong className="text-white">WCAG 2.1 AA compliance</strong>.</>,
      <>Ensured quality and stability by guiding the team to implement <strong className="text-white">34+ automated tests</strong> and conduct end-to-end testing across all system components.</>,
    ],
    tags: ['Scrum Master','Cloud MVP','Sprint Planning','Sustainability','WCAG 2.1 AA','Automated Testing'],
    badges: [{ cls: 'badge-success', text: '♿ WCAG 2.1 AA' }, { cls: 'badge-success', text: '🧪 34+ Tests' }],
  },
  {
    icon: '📊', border: 'border-secondary-500/50', current: false,
    period: 'May 2024 – August 2024', location: '📍 Islamabad, Pakistan',
    title: 'Business Analyst', company: 'Oak Street Technologies',
    bullets: [
      'Selected as the only intern to be onboarded on two flagship projects with the product team, contributing to significant project milestones.',
      'Collaborated closely with the product team to create detailed user stories, leading to measurable improvements in project workflows and efficiency.',
      'Demonstrated strong analytical skills by assisting in identifying key areas for process optimization and providing actionable insights to the team.',
      'Exhibited excellent adaptability in a fast-paced environment, quickly integrating into the project team and taking on challenging responsibilities.',
    ],
    tags: ['Business Analysis','User Stories','Requirements','Process Optimization','Cross-functional'],
    badges: [{ cls: 'badge-warning', text: '🏆 Only Intern on 2 Flagship Projects' }],
  },
  {
    icon: '🌿', border: 'border-amber-500/50', current: false,
    period: 'July 2023 – August 2023', location: '📍 Islamabad, Pakistan',
    title: 'Front-End Developer', company: 'MRS Technologies',
    bullets: [
      <>Achieved distinction by being selected as one of the <strong className="text-white">top 15 interns from a competitive pool of 13,000 candidates</strong>.</>,
      <>Led the Frontend team in the development of a web portal for an <strong className="text-white">IoT-based (MVP) microgreens plant system</strong> that tracks plant conditions like soil and ambient temperatures, and humidity.</>,
      'Collaborated with Backend, UI/UX & Embedded teams to create an intelligent node that detects and alerts on deviations in optimal plant conditions.',
      <>Earned the <strong className="text-white">"High Potential Talent" award</strong> for contributions to the MVP project's success.</>,
    ],
    tags: ['Frontend Lead','IoT','MQTT','InfluxDB','Grafana','MVP'],
    badges: [{ cls: 'badge-warning', text: '🏆 Top 15 of 13,000' }, { cls: 'badge-warning', text: '⭐ High Potential Talent Award' }],
  },
  {
    icon: '🎨', border: 'border-slate-500/50', current: false,
    period: 'August 2022 – December 2022', location: '📍 Pakistan',
    title: 'Frontend Web Developer', company: 'The Digital Robe',
    desc: 'Where it all began! Developed, designed, and cloned the company website using HTML, CSS, Bootstrap, and JavaScript. Implemented responsive design techniques ensuring optimal viewing experience across devices.',
    bullets: [],
    tags: ['HTML','CSS','Bootstrap','JavaScript','Responsive Design'],
    badges: [],
  },
]

export default function ProjectsPage() {
  return (
    <section className="section" aria-labelledby="page-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 id="page-title" className="section-title">Experience &amp; Projects 🚀</h1>
          <p className="section-subtitle mx-auto">Building impactful solutions across sustainability, IoT, and enterprise software</p>
        </div>

        <div className="space-y-6 mb-16" aria-label="Work experience timeline">
          {experiences.map(exp => (
            <article key={exp.title} className={`glass-card p-6 md:p-8 relative border-l-4 ${exp.border} hover:translate-x-1 transition-transform duration-300`}>
              {exp.current && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">🟢 Current Role</span>
                </div>
              )}
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl" aria-hidden="true">{exp.icon}</span>
                <div>
                  <div className="flex flex-wrap gap-2 mb-1">
                    <span className="text-primary-400 text-sm font-semibold">{exp.period}</span>
                    <span className="text-slate-500 text-sm">{exp.location}</span>
                  </div>
                  <h2 className="text-xl font-bold gradient-text">{exp.title}</h2>
                  <p className="text-primary-400 font-semibold">{exp.company}</p>
                </div>
              </div>
              {exp.desc && <p className="text-slate-300 leading-relaxed mb-4">{exp.desc}</p>}
              {exp.bullets.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-slate-300 text-sm leading-relaxed">
                      <span className="text-primary-400 mt-0.5 flex-shrink-0">▹</span>{b}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {exp.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
              {exp.badges.length > 0 && (
                <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  {exp.badges.map(b => <span key={b.text} className={`badge ${b.cls}`}>{b.text}</span>)}
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{n:5,s:'',label:'Professional Roles'},{n:4,s:'',label:'Countries Worked'},{n:3,s:'+',label:'Years Experience'},{n:4,s:'',label:'Universities'}].map(({n,s,label}) => (
            <div key={label} className="glass-card p-6 text-center">
              <span className="text-4xl font-black block"><Counter target={n} suffix={s} /></span>
              <span className="text-slate-400 text-sm mt-1 block">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
