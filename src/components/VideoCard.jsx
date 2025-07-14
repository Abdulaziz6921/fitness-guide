import React, { useState, memo, useCallback } from "react";
import LiteYouTube from "./LiteYouTube";
import LazyImage from "./LazyImage";
import OptimizedModal from "./OptimizedModal";

const VideoCard = memo(({ exercise }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  const handleWatchHere = useCallback(() => setShowPlayer(true), []);
  const handleClosePlayer = useCallback(() => setShowPlayer(false), []);
  const handleWatchOnYoutube = useCallback(() => {
    if (exercise.url)
      window.open(exercise.url, "_blank", "noopener,noreferrer");
  }, [exercise.url]);

  const getVideoId = useCallback((url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : null;
  }, []);
  const videoId = getVideoId(exercise.url);

  return (
    <>
      <div className="exercise-card p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
          {/* Left section: icon, name, thumbnail */}
          <div className="flex flex-col md:flex-row md:items-start gap-4 flex-1 ">
            {/* Details */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnail */}

                {exercise.thumbnail && (
                  <div
                    className="relative cursor-pointer w-full md:w-5/12 lg:w-3/12 aspect-video rounded-lg overflow-hidden"
                    onClick={handleWatchHere}
                  >
                    <LazyImage
                      src={exercise.thumbnail}
                      alt={exercise.name}
                      className={`w-full h-full object-cover `}
                      loading="lazy"
                      decoding="async"
                      fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-black/30 hover:bg-black/50 transition-opacity duration-200 flex items-center justify-center">
                      <span className="text-white text-2xl">▶️</span>
                    </div>
                  </div>
                )}
                <div className="flex flex-1 items-center">
                  {" "}
                  <h3 className="font-semibold text-sm md:text-base lg:text-2xl text-gray-900 line-clamp-2">
                    {exercise.name}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3 w-full md:w-auto">
            <button
              onClick={handleWatchHere}
              className="btn-primary px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
              disabled={!exercise.url}
              aria-label={`Watch ${exercise.name} video`}
            >
              <span>▶️</span>
              <span>Watch</span>
            </button>

            <button
              onClick={handleWatchOnYoutube}
              className="btn-secondary px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
              disabled={!exercise.url}
              aria-label={`Open ${exercise.name} on YouTube`}
            >
              <span>🎬</span>
              <span>YouTube</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Player */}
      <OptimizedModal
        isOpen={showPlayer && !!videoId}
        onClose={handleClosePlayer}
        className="modal-content max-w-[95vw] md:max-w-5xl w-full max-h-fit overflow-hidden md:mb-3 lg:mb-5"
      >
        {/* Modal Header */}
        <div className="flex items-start sm:items-center justify-between p-4 border-b border-gray-200 gap-2">
          <div className="flex-1">
            <h3 className="text-md md:text-xl font-semibold text-gray-900 line-clamp-2">
              {exercise.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">Exercise demonstration</p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={handleWatchOnYoutube}
              className="btn-secondary px-3 py-1.5 rounded-lg text-sm  items-center gap-2 hidden sm:flex"
              aria-label="Open in YouTube"
            >
              🎬 <span>YouTube</span>
            </button>

            <button
              onClick={handleClosePlayer}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video */}
        <div className="relative aspect-video w-full  flex  justify-center">
          <LiteYouTube
            videoId={videoId}
            title={exercise.name}
            className="w-11/12 h-full md:w-full"
            autoplay
          />
        </div>

        {/* Footer Tip */}
        <div className="p-4 bg-gray-50 text-center">
          <p className="text-gray-700 text-sm">
            💡 <span className="font-medium">Tip:</span> Click "YouTube" to like
            and support the creator!
          </p>
        </div>
      </OptimizedModal>
    </>
  );
});

VideoCard.displayName = "VideoCard";

export default VideoCard;
