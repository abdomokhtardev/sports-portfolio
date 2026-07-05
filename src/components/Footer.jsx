import AzulejoPattern from './ui/AzulejoPattern';
import SocialIcon from './ui/SocialIcon';

// ── Arrow for the CTA submit button ──
const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const Footer = ({
  socialLinks = [],
  whatsapp = '1234567890',
  email = 'contact@example.com',
  languages = ['🇵🇹 Portuguese', '🇬🇧 English', '🇪🇸 Spanish'],
}) => {
  return (
    <div className="relative">
      {/* Calçada wave visual transition at the top of the footer */}
      <div className="h-14 w-full bg-offWhite dark:bg-darkBase relative pointer-events-none transition-colors duration-300">
        <div className="absolute inset-0 calcada-wave" />
        <svg className="absolute bottom-0 left-0 w-full h-14 text-ceramicBlue fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 C300,90 900,-30 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <footer id="contact" className="bg-ceramicBlue text-white relative overflow-hidden z-10">

        {/* Background Azulejo watermark */}
        <div className="absolute inset-0 text-white/5 pointer-events-none z-0">
          <AzulejoPattern opacity={0.18} />
        </div>

        {/* ── Contact form section ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* ── Left: CTA copy ── */}
            <div className="flex flex-col gap-6">
              {/* Eyebrow */}
              <span className="font-sans text-xs font-semibold tracking-[0.22em] uppercase text-goldenYellow">
                Get in Touch
              </span>
              <div className="w-10 h-px bg-goldenYellow/60" />

              {/* Heading */}
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-white leading-[1.05]">
                Vamos<br />
                <span className="text-goldenYellow">Conversar?</span>
              </h2>

              {/* Subtext */}
              <p className="font-sans text-white/70 text-lg leading-relaxed max-w-sm">
                Whether you need an interpreter for your next pre-season, a bilingual media voice,
                or engaging Portuguese content — I'd love to hear from you.
              </p>

              {/* Languages */}
              <div className="flex flex-wrap gap-3 pt-4">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="font-sans text-xs font-semibold text-white/80 border border-white/20 bg-white/5 px-4 py-1.5 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right: Contact form wrapped in a premium card ── */}
            <div className="relative p-7 md:p-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden group">
              {/* Card framing traditional tile corners */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 rounded-br-sm pointer-events-none" />

              {/* ── Direct CTAs ── */}
              <div className="flex flex-col gap-6 relative z-10 h-full justify-center p-4">
                <a
                  href={`https://wa.me/${whatsapp}?text=Olá,%20gostaria%20de%20discutir%20um%20projeto.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-4
                    bg-[#25D366] hover:bg-[#1DA851] text-white
                    font-sans font-bold text-lg
                    px-8 py-5 rounded-2xl
                    transition-all duration-300 ease-in-out
                    shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40
                    group w-full justify-center
                  "
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  Conversar no WhatsApp
                </a>

                <a
                  href={`mailto:${email}`}
                  className="
                    flex items-center gap-4
                    bg-white hover:bg-slate-100 text-ceramicBlue
                    font-sans font-bold text-lg
                    px-8 py-5 rounded-2xl
                    border-2 border-ceramicBlue/10
                    transition-all duration-300 ease-in-out
                    shadow-lg shadow-black/5 hover:shadow-black/10
                    group w-full justify-center
                  "
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Enviar E-mail Direto
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/10 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">

            {/* Copyright & Dev Links */}
            <div className="flex flex-col gap-2 items-center sm:items-start">
              <p className="font-sans text-xs text-white/40 tracking-wide text-center sm:text-left">
                جميع الحقوق محفوظة لدى abdomokhtardev © 2026<a href="/dashboard" aria-hidden="true" tabIndex={-1} className="text-transparent select-none ml-px" style={{ fontSize: '6px', lineHeight: 1, opacity: 0.01, cursor: 'default', userSelect: 'none' }}>·</a>
              </p>
              <div className="flex items-center gap-3">
                <a href="https://github.com/abdomokhtardev" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors" title="GitHub">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="https://linkedin.com/in/abdomokhtardev" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#0a66c2] transition-colors" title="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="https://wa.me/201029060019" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#25D366] transition-colors" title="WhatsApp">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </a>
              </div>
            </div>

            {/* Social icons & Portfolio */}
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              {socialLinks.map(({ id, href, label, platform }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    w-9 h-9 rounded-full
                    border border-white/15 hover:border-goldenYellow/60
                    flex items-center justify-center
                    text-white/40 hover:text-goldenYellow
                    transition-all duration-200
                  "
                >
                  <SocialIcon platform={platform} label={label} className="w-5 h-5 flex items-center justify-center" />
                </a>
              ))}
            </div>

          </div>
        </div>

      </footer>
    </div>
  );
};

export default Footer;
