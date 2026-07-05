import SectionHeader from './ui/SectionHeader';

const About = ({ biography, skills = [] }) => {
  return (
  <section id="about" className="bg-offWhite dark:bg-darkBase py-28 md:py-36">
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

        {/* ── Left: Section label (sticky on desktop) ── */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <SectionHeader eyebrow="About" titlePT="Quem Sou Eu" titleEN="Who I Am" />
        </div>

        {/* ── Right: Body ── */}
        <div className="lg:col-span-8 flex flex-col gap-8">

          {/* Lead paragraph with editorial drop cap */}
          <p className="font-sans text-xl md:text-2xl text-lightInk dark:text-slate-300 leading-relaxed font-light drop-cap">
            Sou intérprete de desporto com uma paixão profunda pelo futebol, pela comunicação
            e por conectar pessoas através de idiomas.
          </p>
 
          {/* Supporting paragraphs */}
          <div className="flex flex-col gap-5 text-lightMuted dark:text-slate-400 font-sans text-base leading-[1.85]">
            <p>
              Over the past several years, I have had the privilege of working alongside
              professional football coaches, technical staff, and elite athletes — translating
              not just words, but the philosophy, emotion, and tactical nuance that defines
              the beautiful game. From training-ground sessions to press conferences, I bridge
              the communication gap with precision and discretion.
            </p>
            <p>
              Beyond the pitch, I create Portuguese-language content about football culture,
              coaching methodologies, and the interpreter's craft — helping a growing community
              of fans and professionals access insights that would otherwise remain behind
              a language barrier.
            </p>
            <p>
              Whether you need a trusted interpreter for your next pre-season tour, a
              multilingual media liaison, or engaging content for a Portuguese-speaking audience,
              I bring fluency, professionalism, and genuine love for the game to every project.
            </p>
          </div>
 
          {/* Skill pills styled as miniature decorative tiles */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-lightBorder dark:border-darkBorder">
            {skills.map((skill) => (
              <span
                key={skill}
                className="
                  font-sans text-xs font-semibold
                  text-ceramicBlue dark:text-blue-300
                  border-[3px] border-double border-ceramicBlue/15 dark:border-blue-400/20
                  bg-lightCard dark:bg-darkCard
                  shadow-sm hover:shadow-md hover:border-goldenYellow/40 dark:hover:border-goldenYellow/40
                  px-4 py-2 rounded-xl
                  transition-all duration-200 cursor-default hover:-translate-y-0.5
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
  );
};

export default About;
