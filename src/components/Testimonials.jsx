import { useState }      from 'react';
import SectionHeader    from './ui/SectionHeader';

// Tactical arrow SVG — left-pointing (uses currentColor for easy theme control)
const TacticalArrowLeft = () => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12"
    aria-hidden="true"
  >
    {/* Shaft */}
    <line
      x1="44" y1="28" x2="14" y2="28"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
    />
    {/* Arrowhead — sharp tactical style */}
    <polyline
      points="26,16 14,28 26,40"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
    {/* Small perpendicular notch at tail (tactical board style) */}
    <line
      x1="44" y1="22" x2="44" y2="34"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
    />
  </svg>
);

// Tactical arrow SVG — right-pointing
const TacticalArrowRight = () => (
  <svg
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12"
    aria-hidden="true"
  >
    {/* Shaft */}
    <line
      x1="12" y1="28" x2="42" y2="28"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
    />
    {/* Arrowhead */}
    <polyline
      points="30,16 42,28 30,40"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
    {/* Small perpendicular notch at tail */}
    <line
      x1="12" y1="22" x2="12" y2="34"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
    />
  </svg>
);

// Large decorative quotation mark
const QuoteMark = () => (
  <svg
    viewBox="0 0 80 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 h-12 text-goldenYellow opacity-60 dark:opacity-40"
    aria-hidden="true"
  >
    <text
      x="0" y="56"
      fontFamily="Georgia, serif"
      fontSize="96"
      fill="currentColor"
    >
      "
    </text>
  </svg>
);

const Testimonials = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex] || testimonials[0];

  if (!currentTestimonial) return null;

  return (
    <section id="testimonials" className="bg-offWhite dark:bg-darkBase py-28 md:py-36 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Section header */}
        <SectionHeader eyebrow="Testimonials" titlePT="O que dizem" titleEN="What they say" className="mb-16" />

        {/* Testimonial carousel row */}
        <div className="flex items-center gap-4 md:gap-8 lg:gap-12">

          {/* ── Left Arrow ── */}
          <button
            id="testimonial-prev-button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="
              flex-shrink-0
              w-14 h-14 rounded-full
              flex items-center justify-center
              border border-ceramicBlue/20 dark:border-blue-400/30
              text-ceramicBlue dark:text-blue-400
              hover:border-ceramicBlue/60 dark:hover:border-blue-400/60
              hover:bg-ceramicBlue/[0.04] dark:hover:bg-blue-400/[0.08]
              transition-all duration-250 ease-in-out
              group
            "
          >
            <TacticalArrowLeft />
          </button>

          {/* ── Testimonial Card ── */}
          <div className="
            flex-1
            relative
            glazed-tile
            rounded-[2rem]
            px-8 py-10 md:px-12 md:py-14
            flex flex-col gap-8
            group
          ">
            {/* Corner traditional tile framing ornaments */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-ceramicBlue/25 dark:border-blue-400/35 rounded-tl-sm pointer-events-none z-10" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-ceramicBlue/25 dark:border-blue-400/35 rounded-tr-sm pointer-events-none z-10" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-ceramicBlue/25 dark:border-blue-400/35 rounded-bl-sm pointer-events-none z-10" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-ceramicBlue/25 dark:border-blue-400/35 rounded-br-sm pointer-events-none z-10" />

            {/* Top: quotation mark */}
            <div className="-mb-2 relative z-10">
              <QuoteMark />
            </div>

            {/* Quote text */}
            <blockquote className="font-serif text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-[1.75] font-normal italic max-w-3xl relative z-10">
              {currentTestimonial.quote}
            </blockquote>

            {/* Attribution row */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-darkBorder relative z-10">
              {/* Avatar */}
              <div
                aria-label={`Avatar for ${currentTestimonial.name}`}
                className="
                  flex-shrink-0
                  w-14 h-14 rounded-full
                  bg-ceramicBlue dark:bg-blue-600
                  flex items-center justify-center
                  font-sans text-white font-bold text-base tracking-wide
                  shadow-md shadow-ceramicBlue/20 dark:shadow-blue-900/35
                "
              >
                {currentTestimonial.initials}
              </div>

              {/* Name & title */}
              <div className="flex flex-col gap-0.5">
                <p className="font-sans font-semibold text-slate-900 dark:text-white text-base leading-tight">
                  {currentTestimonial.name}
                </p>
                <p className="font-sans text-sm text-ceramicBlue/80 dark:text-blue-300 tracking-wide">
                  {currentTestimonial.title}
                </p>
              </div>

              {/* Goldenrod accent line spacer */}
              <div className="ml-auto hidden sm:block w-10 h-0.5 bg-goldenYellow rounded-full opacity-60" />
            </div>

            {/* Dot indicators (dynamic slider control) */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-2 -mt-2 relative z-10">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-6 bg-ceramicBlue dark:bg-blue-400'
                        : 'w-1.5 bg-ceramicBlue/25 dark:bg-blue-400/25'
                    }`}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Right Arrow ── */}
          <button
            id="testimonial-next-button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="
              flex-shrink-0
              w-14 h-14 rounded-full
              flex items-center justify-center
              border border-ceramicBlue/20 dark:border-blue-400/30
              text-ceramicBlue dark:text-blue-400
              hover:border-ceramicBlue/60 dark:hover:border-blue-400/60
              hover:bg-ceramicBlue/[0.04] dark:hover:bg-blue-400/[0.08]
              transition-all duration-250 ease-in-out
              group
            "
          >
            <TacticalArrowRight />
          </button>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
