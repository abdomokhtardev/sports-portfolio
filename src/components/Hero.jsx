import profileImg     from '../assets/profile.png';
import AzulejoPattern from './ui/AzulejoPattern';

const CompassRose = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.4" />
    <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1,2" />
    {/* Cardinal North */}
    <polygon points="50,4 52.5,47.5 50,50" />
    <polygon points="50,4 47.5,47.5 50,50" opacity="0.5" />
    {/* Cardinal South */}
    <polygon points="50,96 47.5,52.5 50,50" />
    <polygon points="50,96 52.5,52.5 50,50" opacity="0.5" />
    {/* Cardinal East */}
    <polygon points="96,50 52.5,47.5 50,50" />
    <polygon points="96,50 52.5,52.5 50,50" opacity="0.5" />
    {/* Cardinal West */}
    <polygon points="4,50 47.5,52.5 50,50" />
    <polygon points="4,50 47.5,47.5 50,50" opacity="0.5" />
    {/* diagonals */}
    <polygon points="82.5,17.5 51.2,46.2 50,50" opacity="0.8" />
    <polygon points="82.5,17.5 48.8,48.8 50,50" opacity="0.4" />
    <polygon points="17.5,82.5 48.8,53.8 50,50" opacity="0.8" />
    <polygon points="17.5,82.5 51.2,51.2 50,50" opacity="0.4" />
    <polygon points="82.5,82.5 53.8,48.8 50,50" opacity="0.8" />
    <polygon points="82.5,82.5 51.2,51.2 50,50" opacity="0.4" />
    <polygon points="17.5,17.5 46.2,51.2 50,50" opacity="0.8" />
    <polygon points="17.5,17.5 48.8,48.8 50,50" opacity="0.4" />
    {/* center rings */}
    <circle cx="50" cy="50" r="7" fill="none" stroke="currentColor" strokeWidth="0.4" />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
  </svg>
);

const Hero = ({ personalInfo = {} }) => {
  const {
    name = "Your Name",
    title = "Sports Interpreter & Content Creator",
    highlightText = "Through Sport.",
    description = "Bridging the gap between elite coaches and players across languages — interpreting passion, tactics, and culture on the world stage.",
    languages = ["🇵🇹 Portuguese", "🇬🇧 English", "🇪🇸 Spanish"],
    profileImageUrl = '',
  } = personalInfo;

  // الصورة من Supabase/رابط خارجي، أو الصورة الافتراضية المحلية
  const imageSrc = profileImageUrl || profileImg;

  return (
    <section id="hero" className="min-h-screen flex items-center bg-offWhite dark:bg-darkBase relative overflow-hidden">

      {/* Full-section Azulejo watermark */}
      <div className="absolute inset-0 text-ceramicBlue dark:text-blue-900">
        <AzulejoPattern opacity={0.035} />
      </div>

      {/* Slowly spinning Compass Rose background element representing navigation & bridging language barriers */}
      <CompassRose className="absolute -right-24 md:-right-36 -top-24 md:-top-36 w-[450px] md:w-[680px] h-[450px] md:h-[680px] text-goldenYellow/[0.07] dark:text-fatimaGold/[0.04] pointer-events-none z-10" />

      {/* Portugal flag vertical stripe — left edge accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-verdePortugal via-ceramicBlue to-goldenYellow opacity-65 z-10 dark:opacity-40 shadow-sm" />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-20">

          {/* ── Left: Text Content ── */}
          <div className="flex-1 flex flex-col items-start gap-8 text-left">

            {/* Eyebrow */}
            <span className="inline-block text-xs font-sans font-semibold tracking-[0.2em] uppercase text-ceramicBlue dark:text-blue-400 border border-ceramicBlue/20 dark:border-blue-400/20 px-4 py-1.5 rounded-full bg-ceramicBlue/[0.02] dark:bg-blue-400/[0.02]">
              {title}
            </span>

            {/* Name heading with Portuguese gradient branding */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-lightInk dark:text-white tracking-tight">
              {name}<br />
              <span className="bg-gradient-to-r from-ceramicBlue via-azulejoBlue to-goldenYellow dark:from-blue-400 dark:via-blue-300 dark:to-goldenYellow bg-clip-text text-transparent">
                {highlightText}
              </span>
            </h1>

            {/* Description */}
            <p className="font-sans text-lg md:text-xl text-lightMuted dark:text-slate-400 leading-relaxed max-w-md">
              {description}
            </p>

          {/* CTA button */}
          <a
            id="hero-cta-button"
            href="#contact"
            className="
              inline-flex items-center gap-3
              bg-ceramicBlue hover:bg-goldenYellow
              dark:bg-blue-600 dark:hover:bg-goldenYellow
              text-white hover:text-slate-900
              font-sans font-semibold text-base
              px-8 py-4 rounded-full
              transition-all duration-300 ease-in-out
              shadow-lg shadow-ceramicBlue/15 hover:shadow-goldenYellow/30
              group
            "
          >
            <span>Vamos conversar? / Let's Talk</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Language social proof */}
          <p className="font-sans text-sm text-slate-400 dark:text-slate-500 font-medium tracking-wide">
            🌍 Portuguese · English · Spanish
          </p>
        </div>

        {/* ── Right: Profile Image inside traditional Azulejo frame ── */}
        <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md xl:max-w-lg">
          <div className="relative p-3.5 bg-lightCard dark:bg-darkCard border-[5px] border-double border-ceramicBlue/25 dark:border-blue-400/20 rounded-[2rem] shadow-2xl shadow-ceramicBlue/10 dark:shadow-blue-950/40 group overflow-hidden">
            
            {/* Glossy glazed tile effect overlay */}
            <div className="absolute inset-0 glazed-tile pointer-events-none rounded-[1.8rem] opacity-30 group-hover:opacity-100 transition-opacity duration-700 z-20" />

            {/* Corner traditional tile framing ornaments */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-ceramicBlue/45 dark:border-blue-400/40 rounded-tl-sm pointer-events-none z-20" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-ceramicBlue/45 dark:border-blue-400/40 rounded-tr-sm pointer-events-none z-20" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-ceramicBlue/45 dark:border-blue-400/40 rounded-bl-sm pointer-events-none z-20" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-ceramicBlue/45 dark:border-blue-400/40 rounded-br-sm pointer-events-none z-20" />

            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] z-10">
              {/* Azulejo tile background (visible before image loads) */}
              <div className="absolute inset-0 bg-gradient-to-br from-ceramicBlue/5 via-slate-100 to-goldenYellow/5 dark:from-blue-900/20 dark:via-darkCard dark:to-goldenYellow/10 text-ceramicBlue dark:text-blue-500">
                <AzulejoPattern opacity={0.09} />
              </div>

              {/* Photo */}
              <img
                src={imageSrc}
                alt="Professional profile photo"
                className="relative z-10 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />

              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-ceramicBlue/20 dark:from-darkBase/40 to-transparent z-20 pointer-events-none" />

              {/* Floating availability badge */}
              <div className="absolute bottom-5 left-5 z-30 bg-lightCard/95 dark:bg-darkCard/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg border border-lightBorder dark:border-darkBorder">
                <p className="font-sans text-xs font-semibold text-ceramicBlue dark:text-blue-400 tracking-wide uppercase">
                  Available for projects
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="font-sans text-xs text-lightMuted dark:text-slate-400">
                    Open to collaboration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
  );
};

export default Hero;
