import React, { memo, useCallback, useMemo } from "react";
import FrontView from "./FrontView";
import BackView from "./BackView";

const BodyDiagram = memo(({ view, onMuscleClick }) => {
  const frontMuscles = useMemo(
    () => [
      { name: "chest", svgId: "chest" },
      { name: "shoulders", svgId: "front-shoulders" },
      { name: "biceps", svgId: "biceps" },
      { name: "abs", svgId: "abdominals" },
      { name: "forearms", svgId: "forearms" },
      { name: "quadriceps", svgId: "quads" },
      { name: "calves", svgId: "calves" },
      { name: "obliques", svgId: "obliques" },
      { name: "hands", svgId: "hands" },
      { name: "traps", svgId: "traps" },
    ],
    []
  );

  const backMuscles = useMemo(
    () => [
      { name: "traps", svgId: "traps" },
      { name: "shoulders", svgId: "rear-shoulders" },
      { name: "back", svgId: "lats" },
      { name: "triceps", svgId: "triceps" },
      { name: "forearms", svgId: "forearms" },
      { name: "lower back", svgId: "lowerback" },
      { name: "glutes", svgId: "glutes" },
      { name: "hamstrings", svgId: "hamstrings" },
      { name: "calves", svgId: "calves" },
      { name: "hands", svgId: "hands" },
    ],
    []
  );

  const muscles = view === "front" ? frontMuscles : backMuscles;

  const handleMuscleClick = useCallback(
    (muscleName) => {
      onMuscleClick(muscleName);
    },
    [onMuscleClick]
  );

  const muscleGuide = useMemo(
    () => (
      <div className="grid grid-cols-2 gap-2 text-sm">
        {muscles.slice(0, 6).map((muscle, index) => (
          <button
            key={`${muscle.name}-${index}`}
            onClick={() => handleMuscleClick(muscle.name)}
            className="glass-dark p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 text-left"
            aria-label={`Select ${muscle.name} exercises`}
          >
            <span className="font-medium capitalize">{muscle.name}</span>
          </button>
        ))}
      </div>
    ),
    [muscles, handleMuscleClick]
  );

  return (
    <div className="flex justify-center mb-16">
      <div className="body-container relative w-fit max-w-4xl">
        {/* Header */}
        <div className="text-center p-4 border-b border-white/20">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
            {view === "front" ? "🎯 Front Muscles" : "🔄 Back Muscles"}
          </h3>
          <p className="text-white/80 text-sm">
            Click on any muscle group to see exercises
          </p>
        </div>

        {/* Body Diagram */}
        <div className=" flex justify-center">
          <div className="relative ">
            {view === "front" ? (
              // Front view SVG
              <FrontView handleMuscleClick={handleMuscleClick} />
            ) : (
              // Back view SVG
              <BackView handleMuscleClick={handleMuscleClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

BodyDiagram.displayName = "BodyDiagram";

export default BodyDiagram;
