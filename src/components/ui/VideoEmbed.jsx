import { useState } from 'react';

// ── URL detection & parsing ──────────────────────────────────────────────────

/** Detect whether a URL is YouTube or Facebook */
const detectPlatform = (url = '') => {
  if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
  if (/facebook\.com|fb\.watch/.test(url)) return 'facebook';
  return null;
};

/**
 * Extract YouTube video ID from multiple URL formats:
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 *  - https://www.youtube.com/shorts/VIDEO_ID
 */
const getYouTubeId = (url = '') => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&\n?#]+)/
  );
  return match ? match[1] : null;
};

/** Build the autoplay embed src for a given URL + platform */
const buildEmbedSrc = (url, platform) => {
  if (platform === 'youtube') {
    const id = getYouTubeId(url);
    return id
      ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
      : null;
  }
  if (platform === 'facebook') {
    return (
      `https://www.facebook.com/plugins/video.php` +
      `?href=${encodeURIComponent(url)}&show_text=false&autoplay=true&mute=0&width=560`
    );
  }
  return null;
};

/** YouTube automatically provides a high-res thumbnail for any video */
const getYouTubeThumbnail = (url) => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
};

// ── Sub-components ───────────────────────────────────────────────────────────

const PlayButton = () => (
  <svg className="w-16 h-16 drop-shadow-2xl" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="32" fill="white" fillOpacity="0.15" />
    <circle cx="32" cy="32" r="29" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="1.5" />
    {/* Golden play triangle — matches brand goldenYellow */}
    <polygon points="26,20 26,44 46,32" fill="#F4B41A" />
  </svg>
);

const PlatformBadge = ({ platform }) => {
  if (platform === 'youtube') {
    return (
      <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
        YouTube
      </span>
    );
  }
  if (platform === 'facebook') {
    return (
      <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Facebook
      </span>
    );
  }
  return null;
};

// ── Main component ───────────────────────────────────────────────────────────

/**
 * VideoEmbed — Lazy video embed with thumbnail preview.
 *
 * Workflow:
 *  1. Receives a `url` (YouTube or Facebook link).
 *  2. Shows a thumbnail + branded play button (lazy — no iframe load yet).
 *  3. On click, replaces the thumbnail with the live `<iframe>` (autoplay).
 *
 * Supports:
 *  • YouTube: watch, youtu.be short links, /embed/, /shorts/
 *  • Facebook: facebook.com video links, fb.watch short links
 *
 * @param {{ url: string, title: string, duration?: string }} props
 */
const VideoEmbed = ({ url, title, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const platform = detectPlatform(url);
  const embedSrc = buildEmbedSrc(url, platform);
  const thumbnail = platform === 'youtube' ? getYouTubeThumbnail(url) : null;

  // ── Is it an iframe embed code? ──
  if (url && typeof url === 'string' && url.trim().toLowerCase().startsWith('<iframe')) {
    return (
      <div className="relative group w-full flex justify-center items-center rounded-2xl overflow-hidden [&>iframe]:max-w-full [&>iframe]:rounded-2xl">
        <div dangerouslySetInnerHTML={{ __html: url }} className="w-full flex justify-center" />
      </div>
    );
  }

  // ── Invalid or unsupported URL ──
  if (!platform || !embedSrc) {
    return (
      <div className="aspect-video bg-slate-100 dark:bg-darkCard rounded-2xl flex flex-col items-center justify-center gap-2">
        <svg className="w-8 h-8 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
        </svg>
        <p className="text-slate-400 dark:text-slate-500 text-xs font-sans">رابط الفيديو غير صالح</p>
      </div>
    );
  }

  // ── Playing: replace thumbnail with iframe ──
  if (isPlaying) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl animate-fade-in">
        <iframe
          src={embedSrc}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  // ── Idle: thumbnail preview + play overlay ──
  return (
    <button
      onClick={() => setIsPlaying(true)}
      className="group relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 cursor-pointer block focus:outline-none focus-visible:ring-2 focus-visible:ring-goldenYellow"
      aria-label={`تشغيل الفيديو: ${title}`}
    >
      {/* Thumbnail image */}
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      ) : (
        /* Facebook fallback — gradient background */
        <div className="absolute inset-0 bg-gradient-to-br from-ceramicBlue via-azulejoBlue to-ceramicBlue/70" />
      )}

      {/* Darkening overlay */}
      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/55 transition-colors duration-300" />

      {/* Play button — scales up on hover */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          <PlayButton />
        </div>
      </div>

      {/* Platform badge — top left */}
      <div className="absolute top-3 left-3 z-10">
        <PlatformBadge platform={platform} />
      </div>

      {/* Duration — bottom right */}
      {duration && (
        <span className="absolute bottom-3 right-3 z-10 font-sans text-xs font-semibold text-white bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded">
          {duration}
        </span>
      )}
    </button>
  );
};

export default VideoEmbed;
