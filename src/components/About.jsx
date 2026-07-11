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
            I am a Portuguese language interpreter specializing in sports communication, with experience working at international football and handball events alongside coaches, athletes, and national teams from different countries.
          </p>
 
          {/* Supporting paragraphs */}
          <div className="flex flex-col gap-5 text-lightMuted dark:text-slate-400 font-sans text-base leading-[1.85]">
            <p>
              Over the years, I have had the privilege of serving as an official interpreter at major international sports events, collaborating with renowned football figures and representing Portuguese national teams in world championships.
            </p>
            <p>
              I am also the Founder and Director of Portuguese Way Academy, an academy dedicated to teaching the Portuguese language and creating real opportunities through language learning.
            </p>
            <p>
              I believe that learning a language goes far beyond grammar—it's about building connections, opening doors, and creating opportunities that can change lives.
            </p>
            <p>
              I bring professionalism, discretion, and a genuine passion for communication, sports, and the Portuguese language to every project I undertake.
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
