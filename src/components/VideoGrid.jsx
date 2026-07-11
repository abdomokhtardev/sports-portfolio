import React, { useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import VideoEmbed from './ui/VideoEmbed';


const VideoCard = ({ video }) => (
  <div id={`video-card-${video.id}`} className="glazed-tile p-3 rounded-[1.8rem] flex flex-col animate-fade-in mb-6 lg:mb-8">
    {/* Video Embed Player */}
    <VideoEmbed url={video.video_url} title={video.title} duration={video.duration} />
    
    {/* Title block */}
    {(video.platform || 'youtube') === 'facebook' ? (
      <div className="p-4 pt-5 flex-1 flex flex-col gap-3">
        <h3 className="font-sans text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
          {video.title}
        </h3>
        <div className="flex items-center gap-2 mt-auto">
          <span className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </span>
          {video.duration && (
            <span className="text-xs font-bold text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700">
              {video.duration}
            </span>
          )}
        </div>
      </div>
    ) : (
      <div className="p-3 pt-4 flex-1 flex flex-col justify-between">
        <h3 className="font-sans text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2">
          {video.title}
        </h3>
      </div>
    )}
  </div>
);

/**
 * VideoGrid component
 * @param {{ videos: Array }} props
 */
const VideoGrid = ({ videos }) => {
  const [activePlatform, setActivePlatform] = useState('facebook');

  // Ensure robust filtering even if platform is undefined (defaulting to youtube)
  const filteredVideos = videos.filter(
    (v) => (v.platform || 'youtube') === activePlatform
  );

  return (
    <section id="content" className="bg-offWhite dark:bg-darkBase py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 z-10 relative">
        <SectionHeader eyebrow="Content" titlePT="O Meu Canal" titleEN="My Content" className="mb-10" />

        {/* Platform Toggle Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActivePlatform('facebook')}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${activePlatform === 'facebook'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
          <button
            onClick={() => setActivePlatform('youtube')}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${activePlatform === 'youtube'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YouTube
          </button>
        </div>

        {/* Video grid */}
        {filteredVideos.length > 0 ? (
          <div className={`columns-1 gap-6 lg:gap-8 ${activePlatform === 'facebook' ? 'md:columns-2' : 'md:columns-3'} mb-16`}>
            {filteredVideos.map((video) => (
              <div key={video.id} className="break-inside-avoid">
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-3xl mb-16">
            <p className="text-slate-500 dark:text-slate-400">لا توجد فيديوهات مضافة في هذا القسم حالياً.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default VideoGrid;
