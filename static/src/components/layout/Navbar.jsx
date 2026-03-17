import { Link, useLocation } from 'react-router-dom'
import useNavbar from '../../hooks/useNavbar.js'
import useMagnetic from '../../hooks/useMagnetic.js'

function LogoLink() {
  const mag = useMagnetic()
  return (
    <Link
      to="/"
      className="relative group flex items-center gap-3"
      aria-label="Home"
      onMouseMove={mag.handleMouseMove}
      onMouseLeave={mag.handleMouseLeave}
      style={{ transform: mag.transform }}
    >
      <span className="relative">
        <span className="text-2xl font-black bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent tracking-tight">MS</span>
        <span className="absolute -top-0.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-lg shadow-emerald-500/50" title="Available for opportunities" />
      </span>
      <span className="hidden sm:flex flex-col">
        <span className="text-sm font-semibold text-white leading-none">Muhammad Shayan</span>
        <span className="text-[10px] text-emerald-400 font-medium leading-tight mt-0.5">● Available</span>
      </span>
    </Link>
  )
}

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
]

export default function Navbar() {
  const { scrolled, menuOpen, setMenuOpen } = useNavbar()
  const location = useLocation()

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'}`}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <LogoLink />

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="menubar">
            {navItems.map(({ to, label }) => (
              <li key={to} role="none">
                <Link
                  to={to}
                  className={`nav-link${isActive(to) ? ' active' : ''}`}
                  role="menuitem"
                  aria-current={isActive(to) ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li role="none">
              <Link to="/contact" className="btn-primary text-sm" role="menuitem" aria-current={isActive('/contact') ? 'page' : undefined}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 transition-colors hover:bg-white/10"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" className="md:hidden">
            <ul className="py-4 space-y-1 border-t border-white/10">
              {navItems.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`block px-4 py-3 rounded-lg transition-colors hover:bg-white/5 ${isActive(to) ? 'text-primary-400 bg-white/5' : 'text-white'}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="block mx-4 text-center btn-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
