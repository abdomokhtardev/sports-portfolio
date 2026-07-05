// ── Icons ─────────────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
  </svg>
);

// ── Nav links (Portuguese labels for cultural authenticity) ───────────────────

const NAV_LINKS = [
  { href: '#about',        label: 'Sobre'       },
  { href: '#content',      label: 'Conteúdo'    },
  { href: '#experience',   label: 'Experiência' },
  { href: '#testimonials', label: 'Testemunhos' },
  { href: '#contact',      label: 'Contacto'    },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Navbar — sticky top bar with Portuguese-labelled navigation and dark mode toggle.
 *
 * @param {{ isDark: boolean, onToggleTheme: () => void }} props
 */
const Navbar = ({ isDark, onToggleTheme }) => (
  <header className="fixed top-0 inset-x-0 z-50 bg-offWhite/90 dark:bg-darkBase/80 backdrop-blur-md border-b border-lightBorder dark:border-darkBorder/60 transition-colors duration-300">
    {/* Fine-line flag accent top bar */}
    <div className="h-0.5 w-full bg-gradient-to-r from-verdePortugal via-ceramicBlue to-goldenYellow opacity-90" />
    
    <nav
      className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between"
      aria-label="Primary navigation"
    >
      {/* ── Wordmark ── */}
      <a
        href="#hero"
        className="font-serif text-lg font-bold text-ceramicBlue dark:text-white tracking-tight hover:text-goldenYellow dark:hover:text-goldenYellow transition-colors duration-200"
      >
        Intérprete<span className="text-goldenYellow">.</span>
      </a>
 
      {/* ── Links (desktop) ── */}
      <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="font-sans text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-ceramicBlue dark:hover:text-goldenYellow transition-colors duration-200 tracking-wide"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* ── Dark mode toggle ── */}
      <button
        id="theme-toggle"
        onClick={onToggleTheme}
        aria-label={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
        className="
          w-10 h-10 rounded-full flex items-center justify-center
          text-slate-500 dark:text-slate-400
          hover:text-ceramicBlue dark:hover:text-goldenYellow
          hover:bg-ceramicBlue/[0.06] dark:hover:bg-goldenYellow/[0.08]
          border border-slate-200 dark:border-darkBorder
          transition-all duration-200
        "
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  </header>
);

export default Navbar;
