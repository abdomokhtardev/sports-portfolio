import { useId } from 'react';

/**
 * AzulejoPattern — SVG inline tile pattern inspired by Portuguese azulejo tiles.
 *
 * Renders as a full-coverage background watermark. Uses `currentColor` so
 * the colour is controlled by the parent's Tailwind `text-*` class,
 * making dark-mode adaptation effortless.
 *
 * Each instance generates a unique pattern ID via React's useId to avoid
 * conflicts when multiple instances appear on the same page.
 *
 * @param {{ opacity?: number, className?: string }} props
 */
const AzulejoPattern = ({ opacity = 0.06, className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const patternId = `azulejo-${uid}`;

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern id={patternId} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          {/* Outer square frame */}
          <rect x="2" y="2" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Inner diamond */}
          <polygon points="30,8 52,30 30,52 8,30" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Corner decorative diagonals */}
          <line x1="2"  y1="2"  x2="10" y2="10" stroke="currentColor" strokeWidth="0.8" />
          <line x1="58" y1="2"  x2="50" y2="10" stroke="currentColor" strokeWidth="0.8" />
          <line x1="2"  y1="58" x2="10" y2="50" stroke="currentColor" strokeWidth="0.8" />
          <line x1="58" y1="58" x2="50" y2="50" stroke="currentColor" strokeWidth="0.8" />
          {/* Center floral motif */}
          <circle cx="30" cy="30" r="5" fill="none"        stroke="currentColor" strokeWidth="1" />
          <circle cx="30" cy="30" r="2" fill="currentColor" />
          {/* Cardinal petals */}
          <line x1="30" y1="25" x2="30" y2="15" stroke="currentColor" strokeWidth="0.8" />
          <line x1="30" y1="35" x2="30" y2="45" stroke="currentColor" strokeWidth="0.8" />
          <line x1="25" y1="30" x2="15" y2="30" stroke="currentColor" strokeWidth="0.8" />
          <line x1="35" y1="30" x2="45" y2="30" stroke="currentColor" strokeWidth="0.8" />
          {/* Corner anchor dots */}
          <circle cx="2"  cy="2"  r="1.5" fill="currentColor" />
          <circle cx="58" cy="2"  r="1.5" fill="currentColor" />
          <circle cx="2"  cy="58" r="1.5" fill="currentColor" />
          <circle cx="58" cy="58" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

export default AzulejoPattern;
