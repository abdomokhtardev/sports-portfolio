/**
 * SectionHeader — reusable section label + title block.
 *
 * Replaces the duplicated eyebrow/rule/h2/subtitle pattern
 * that previously appeared in every section component.
 *
 * @param {{ eyebrow: string, titlePT: string, titleEN?: string, className?: string }} props
 */
const SectionHeader = ({ eyebrow, titlePT, titleEN, className = '' }) => (
  <div className={`flex flex-col gap-3 ${className}`}>
    {/* Eyebrow label */}
    <span className="font-sans text-xs font-semibold tracking-[0.22em] uppercase text-ceramicBlue dark:text-blue-400">
      {eyebrow}
    </span>

    {/* Decorative rule with dynamic Azulejo tile-flower ornament */}
    <div className="flex items-center gap-3 my-1">
      <div className="w-10 h-0.5 bg-gradient-to-r from-ceramicBlue/80 to-transparent dark:from-blue-400/80 rounded-full" />
      <svg className="w-4 h-4 text-ceramicBlue dark:text-blue-400 flex-shrink-0 animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" rx="1" transform="rotate(45 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
      <div className="w-10 h-0.5 bg-gradient-to-l from-ceramicBlue/80 to-transparent dark:from-blue-400/80 rounded-full" />
    </div>

    {/* Portuguese title */}
    <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
      {titlePT}
    </h2>

    {/* English subtitle */}
    {titleEN && (
      <p className="font-sans text-slate-400 dark:text-slate-500 text-base italic">
        {titleEN}
      </p>
    )}
  </div>
);

export default SectionHeader;
