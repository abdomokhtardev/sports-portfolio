import SectionHeader   from './ui/SectionHeader';

const Experience = ({ timelineEvents = [] }) => {
  return (
    <section id="experience" className="bg-offWhite dark:bg-darkBase py-28 md:py-36 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Section header */}
        <SectionHeader eyebrow="Career" titlePT="Experiência" titleEN="Experience" className="mb-20" />

        {/* Timeline */}
        <div className="relative">
          {/* Wavy/double decorative spine line in gold and blue */}
          <div className="absolute left-[7px] md:left-[9px] top-0 bottom-0 w-[2px] md:w-[3px] bg-gradient-to-b from-ceramicBlue/30 via-goldenYellow/40 to-ceramicBlue/30 dark:from-blue-500/20 dark:via-goldenYellow/30 dark:to-blue-500/20 rounded-full" />

          <div className="flex flex-col gap-0">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                id={`experience-item-${event.id}`}
                className={`relative pl-10 md:pl-16 group ${index !== timelineEvents.length - 1 ? 'pb-14 md:pb-16' : ''}`}
              >
                {/* Diamond-shaped Azulejo tile marker */}
                <div className="absolute left-0 top-2.5 flex items-center justify-center z-10">
                  <div className="w-4 h-4 md:w-5 md:h-5 transform rotate-45 bg-white dark:bg-darkCard border-[3px] border-ceramicBlue dark:border-blue-400 shadow-md flex items-center justify-center ring-4 ring-offWhite dark:ring-darkBase transition-all duration-300 group-hover:scale-110 group-hover:border-goldenYellow dark:group-hover:border-goldenYellow">
                    <div className="w-1.5 h-1.5 rounded-sm bg-goldenYellow" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  {/* Year chip with border */}
                  <span className="inline-block font-sans text-xs font-semibold tracking-widest uppercase text-ceramicBlue dark:text-blue-300 bg-ceramicBlue/[0.06] dark:bg-blue-400/[0.08] border border-ceramicBlue/10 dark:border-blue-400/10 px-3 py-1 rounded-full mb-3">
                    {event.year}
                  </span>

                  {/* Role */}
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-slate-900 dark:text-white leading-snug mb-1 transition-colors duration-200">
                    {event.role}
                  </h3>

                  {/* Club / Organisation */}
                  <p className="font-sans text-sm font-medium text-ceramicBlue/80 dark:text-blue-300/80 mb-3 tracking-wide">
                    {event.club}
                  </p>

                  {/* Description */}
                  <p className="font-sans text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                    {event.description}
                  </p>

                  {/* Subtle divider for last visual separation */}
                  {index !== timelineEvents.length - 1 && (
                    <div className="mt-10 ml-0 w-16 h-px bg-goldenYellow/40 dark:bg-goldenYellow/20" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
