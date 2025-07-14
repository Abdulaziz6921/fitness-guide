// YouTube service for fetching exercise videos
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "";
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

// Caching for API responses to reduce redundant requests
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Optimized fallback exercise data with better thumbnails
const fallbackExercises = {
  chest: [
    {
      name: "Push-ups",
      url: "https://www.youtube.com/watch?v=IODxDxX7oi4",
      thumbnail: "https://i.ytimg.com/vi/IODxDxX7oi4/mqdefault.jpg",
    },
    {
      name: "Bench Press",
      url: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
      thumbnail: "https://i.ytimg.com/vi/rT7DgCr-3pg/mqdefault.jpg",
    },
    {
      name: "Dumbbell Flyes",
      url: "https://www.youtube.com/watch?v=eozdVDA78K0",
      thumbnail: "https://i.ytimg.com/vi/eozdVDA78K0/mqdefault.jpg",
    },
    {
      name: "Cable Flyes",
      url: "https://www.youtube.com/watch?v=QENKPHhQVi4",
      thumbnail: "https://i.ytimg.com/vi/QENKPHhQVi4/mqdefault.jpg",
    },
  ],
  shoulders: [
    {
      name: "Shoulder Press",
      url: "https://www.youtube.com/watch?v=qEwKCR5JCog",
      thumbnail: "https://i.ytimg.com/vi/qEwKCR5JCog/mqdefault.jpg",
    },
    {
      name: "Lateral Raises",
      url: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
      thumbnail: "https://i.ytimg.com/vi/3VcKaXpzqRo/mqdefault.jpg",
    },
    {
      name: "Front Raises",
      url: "https://www.youtube.com/watch?v=qzaDoqFTz2E",
      thumbnail: "https://i.ytimg.com/vi/qzaDoqFTz2E/mqdefault.jpg",
    },
  ],
  biceps: [
    {
      name: "Bicep Curls",
      url: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
      thumbnail: "https://i.ytimg.com/vi/ykJmrZ5v0Oo/mqdefault.jpg",
    },
    {
      name: "Hammer Curls",
      url: "https://www.youtube.com/watch?v=zC3nLlEvin4",
      thumbnail: "https://i.ytimg.com/vi/zC3nLlEvin4/mqdefault.jpg",
    },
  ],
  triceps: [
    {
      name: "Tricep Dips",
      url: "https://www.youtube.com/watch?v=6kALZikXxLc",
      thumbnail: "https://i.ytimg.com/vi/6kALZikXxLc/mqdefault.jpg",
    },
    {
      name: "Tricep Extensions",
      url: "https://www.youtube.com/watch?v=YbX7Wd8jQ-Q",
      thumbnail: "https://i.ytimg.com/vi/YbX7Wd8jQ-Q/mqdefault.jpg",
    },
  ],
  abs: [
    {
      name: "Crunches",
      url: "https://www.youtube.com/watch?v=Xyd_fa5zoEU",
      thumbnail: "https://i.ytimg.com/vi/Xyd_fa5zoEU/mqdefault.jpg",
    },
    {
      name: "Plank",
      url: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
      thumbnail: "https://i.ytimg.com/vi/ASdvN_XEl_c/mqdefault.jpg",
    },
  ],
  back: [
    {
      name: "Pull-ups",
      url: "https://www.youtube.com/watch?v=eGo4IYlbE5g",
      thumbnail: "https://i.ytimg.com/vi/eGo4IYlbE5g/mqdefault.jpg",
    },
    {
      name: "Rows",
      url: "https://www.youtube.com/watch?v=kBWAon7ItDw",
      thumbnail: "https://i.ytimg.com/vi/kBWAon7ItDw/mqdefault.jpg",
    },
  ],
  quadriceps: [
    {
      name: "Squats",
      url: "https://www.youtube.com/watch?v=YaXPRqUwItQ",
      thumbnail: "https://i.ytimg.com/vi/YaXPRqUwItQ/mqdefault.jpg",
    },
    {
      name: "Lunges",
      url: "https://www.youtube.com/watch?v=QOVaHwm-Q6U",
      thumbnail: "https://i.ytimg.com/vi/QOVaHwm-Q6U/mqdefault.jpg",
    },
  ],
  hamstrings: [
    {
      name: "Deadlifts",
      url: "https://www.youtube.com/watch?v=ytGaGIn3SjE",
      thumbnail: "https://i.ytimg.com/vi/ytGaGIn3SjE/mqdefault.jpg",
    },
  ],
  calves: [
    {
      name: "Calf Raises",
      url: "https://www.youtube.com/watch?v=gwLzBJYoWlI",
      thumbnail: "https://i.ytimg.com/vi/gwLzBJYoWlI/mqdefault.jpg",
    },
  ],
  glutes: [
    {
      name: "Hip Thrusts",
      url: "https://www.youtube.com/watch?v=SEdqd1n0cvg",
      thumbnail: "https://i.ytimg.com/vi/SEdqd1n0cvg/mqdefault.jpg",
    },
  ],
  forearms: [
    {
      name: "Wrist Curls",
      url: "https://www.youtube.com/watch?v=7dQRcNNONq8",
      thumbnail: "https://i.ytimg.com/vi/7dQRcNNONq8/mqdefault.jpg",
    },
  ],
  obliques: [
    {
      name: "Russian Twists",
      url: "https://www.youtube.com/watch?v=wkD8rjkodUI",
      thumbnail: "https://i.ytimg.com/vi/wkD8rjkodUI/mqdefault.jpg",
    },
  ],
  hands: [
    {
      name: "Grip Strengthening",
      url: "https://www.youtube.com/watch?v=FGuVJAj96SE",
      thumbnail: "https://i.ytimg.com/vi/FGuVJAj96SE/mqdefault.jpg",
    },
  ],
  traps: [
    {
      name: "Shrugs",
      url: "https://www.youtube.com/watch?v=cJRVVxmytaM",
      thumbnail: "https://i.ytimg.com/vi/cJRVVxmytaM/mqdefault.jpg",
    },
  ],
  "lower back": [
    {
      name: "Superman Exercise",
      url: "https://www.youtube.com/watch?v=cc6UVRS7PW4",
      thumbnail: "https://i.ytimg.com/vi/cc6UVRS7PW4/mqdefault.jpg",
    },
  ],
};

// Optimized fetch function with caching and error handling
export async function fetchExerciseVideos(muscleName) {
  const cacheKey = `exercises_${muscleName}`;
  const cachedData = cache.get(cacheKey);

  // Return cached data if it's still valid
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  try {
    // Return fallback data immediately if no API key
    if (!YOUTUBE_API_KEY) {
      const fallbackData = fallbackExercises[muscleName] || [];
      cache.set(cacheKey, { data: fallbackData, timestamp: Date.now() });
      return fallbackData;
    }

    const searchQuery = `${muscleName} exercises workout form technique`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&maxResults=8&q=${encodeURIComponent(
        searchQuery
      )}&type=video&videoDuration=medium&videoDefinition=high&key=${YOUTUBE_API_KEY}`,
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`YouTube API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error("No videos found");
    }

    const exercises = data.items.map((item, index) => ({
      name:
        item.snippet.title.length > 60
          ? item.snippet.title.substring(0, 60) + "..."
          : item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail:
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.standard?.url ||
        `https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg` || // 480x360
        `https://i.ytimg.com/vi/${item.id.videoId}/mqdefault.jpg` || // 320x180
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.default?.url,
    }));

    // Cache the successful response
    cache.set(cacheKey, { data: exercises, timestamp: Date.now() });
    return exercises;
  } catch (error) {
    console.warn(
      "YouTube API error, falling back to predefined exercises:",
      error.message
    );

    // Fallback to predefined exercises
    const fallbackData = fallbackExercises[muscleName] || [];
    cache.set(cacheKey, { data: fallbackData, timestamp: Date.now() });
    return fallbackData;
  }
}

// Preloading critical exercise data for better UX
export function preloadPopularExercises() {
  const popularMuscles = ["chest", "shoulders", "biceps", "abs", "back"];

  // Using requestIdleCallback for non-blocking preloading
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => {
      popularMuscles.forEach((muscle) => {
        fetchExerciseVideos(muscle).catch(() => {
          // Silently failing for preloading
        });
      });
    });
  }
}

// Clearing cache when needed (e.g., on app startup)
export function clearExerciseCache() {
  cache.clear();
}
