import React, { useState, memo, useCallback } from "react";

const LiteYouTube = memo(
  ({ videoId, title, className = "", autoplay = false, onLoad, ...props }) => {
    const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${
      autoplay ? 1 : 0
    }&rel=0&modestbranding=1&playsinline=1`;

    const handlePlayClick = useCallback(() => {
      setIsLoading(true);
      setIsPlayerLoaded(true);
      onLoad?.();
    }, [onLoad]);

    return (
      <div
        className={`relative bg-black rounded-lg overflow-hidden ${className}`}
        style={{ paddingBottom: "56.25%", height: 0 }}
        {...props}
      >
        {!isPlayerLoaded ? (
          <>
            {/* Thumbnail */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              fetchpriority="high"
            />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayClick}
                className="w-16 h-16 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
                aria-label={`Play ${title}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-6 h-6 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <h3 className="text-white font-medium text-sm line-clamp-2">
                {title}
              </h3>
            </div>
          </>
        ) : (
          <iframe
            src={embedUrl}
            title={title}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            loading="lazy"
          />
        )}
      </div>
    );
  }
);

LiteYouTube.displayName = "LiteYouTube";

export default LiteYouTube;
