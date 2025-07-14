import React, { memo } from "react";

const LoadingSkeleton = memo(
  ({ className = "", variant = "rectangular", ...props }) => {
    const baseClasses = "animate-pulse bg-gray-200";

    const variants = {
      rectangular: "rounded-lg",
      circular: "rounded-full",
      text: "rounded h-4",
      card: "rounded-xl h-32",
    };

    return (
      <div
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

LoadingSkeleton.displayName = "LoadingSkeleton";

export const ExerciseCardSkeleton = memo(() => (
  <div className="exercise-card p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <LoadingSkeleton variant="circular" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton variant="text" className="w-40 h-5" />
          <LoadingSkeleton variant="rectangular" className="w-20 h-12" />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <LoadingSkeleton variant="rectangular" className="w-20 h-8" />
        <LoadingSkeleton variant="rectangular" className="w-20 h-8" />
      </div>
    </div>
  </div>
));

ExerciseCardSkeleton.displayName = "ExerciseCardSkeleton";

export default LoadingSkeleton;
