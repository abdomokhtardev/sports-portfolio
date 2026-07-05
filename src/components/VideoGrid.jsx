import SectionHeader from './ui/SectionHeader';
import VideoEmbed from './ui/VideoEmbed';


const VideoCard = ({ video }) => (
  <div id={`video-card-${video.id}`} className="glazed-tile p-3 rounded-[1.8rem] flex flex-col h-full">
    {/* Video Embed Player */}
    <VideoEmbed url={video.video_url} title={video.title} duration={video.duration} />
    {/* Title block */}
    <div className="p-3 pt-4 flex-1 flex flex-col justify-between">
      <h3 className="font-sans text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2">
        {video.title}
      </h3>
    </div>
  </div>
);

/**
 * VideoGrid component
 * @param {{ videos: Array }} props
 */
const VideoGrid = ({ videos }) => {


  return (
    <section id="content" className="bg-offWhite dark:bg-darkBase py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 z-10 relative">
        <SectionHeader eyebrow="Content" titlePT="O Meu Canal" titleEN="My Content" className="mb-16" />
        {/* Video grid */}
        <div className="grid grid-cols-1 mb-16 md:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default VideoGrid;
