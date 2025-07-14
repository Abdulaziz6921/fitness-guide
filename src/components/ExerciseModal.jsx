import React, { memo, useMemo } from "react";
import VideoCard from "./VideoCard";
import OptimizedModal from "./OptimizedModal";
import { ExerciseCardSkeleton } from "./LoadingSkeleton";

const ExerciseModal = memo(
  ({ isOpen, onClose, muscleName, exercises, loading }) => {
    const renderedExercises = useMemo(() => {
      if (loading) {
        return Array.from({ length: 3 }, (_, index) => (
          <ExerciseCardSkeleton key={`skeleton-${index}`} />
        ));
      }

      if (exercises.length === 0) {
        return (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500 text-lg mb-1">
              No exercises found for {muscleName}
            </p>
            <p className="text-gray-400 text-sm">
              Try selecting a different muscle group
            </p>
          </div>
        );
      }

      return exercises.map((exercise, index) => (
        <VideoCard key={`${exercise.name}-${index}`} exercise={exercise} />
      ));
    }, [exercises, loading, muscleName]);

    if (!isOpen) return null;

    return (
      <OptimizedModal
        isOpen={isOpen}
        onClose={onClose}
        className="modal-content rounded-xl shadow-xl w-full max-w-md  md:max-w-3xl lg:max-w-5xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 capitalize mb-1">
              {muscleName} Exercises
            </h2>
            <p className="text-gray-600 text-sm">
              Targeted workouts for maximum results
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            aria-label="Close exercise modal"
          >
            <span className="text-base md:text-lg">✕</span>
          </button>
        </div>

        {/* Exercise list */}
        <div className="px-4 py-4 sm:px-6 sm:py-6 overflow-y-auto max-h-[60vh] sm:max-h-[70vh] md:max-h-[75vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="loading-spinner mb-3"></div>
              <span className="text-gray-600 font-medium text-sm">
                Loading exercises...
              </span>
              <span className="text-gray-500 text-xs mt-1 text-center">
                Finding workouts for your {muscleName}
              </span>
            </div>
          ) : (
            <div className="space-y-4">{renderedExercises}</div>
          )}
        </div>

        {/* Footer */}
        {exercises.length > 0 && (
          <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-center text-gray-600 text-xs">
              💡 <span className="font-medium">Pro Tip:</span> Start with
              bodyweight exercises, then progress to weights
            </p>
          </div>
        )}
      </OptimizedModal>
    );
  }
);

ExerciseModal.displayName = "ExerciseModal";

export default ExerciseModal;
