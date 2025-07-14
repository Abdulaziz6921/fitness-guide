import React, { useState, useCallback, Suspense, lazy } from "react";
import Header from "./components/Header";
import ViewToggle from "./components/ViewToggle";
import BodyDiagram from "./components/BodyDiagram";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { fetchExerciseVideos } from "./services/youtubeService";

// Lazy load the modal for better performance
const ExerciseModal = lazy(() => import("./components/ExerciseModal"));

function App() {
  const [currentView, setCurrentView] = useState("front");
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMuscleClick = useCallback(async (muscleName) => {
    setSelectedMuscle(muscleName);
    setModalOpen(true);
    setLoading(true);
    setExercises([]);

    try {
      const exerciseData = await fetchExerciseVideos(muscleName);
      setExercises(exerciseData);
    } catch (error) {
      console.error("Error loading exercises:", error);
      setExercises([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedMuscle(null);
    setExercises([]);
  }, []);

  const handleViewChange = useCallback((view) => {
    setCurrentView(view);
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen animated-bg">
      <Header />

      <main className="max-w-6xl mx-auto px-4 ">
        <ViewToggle currentView={currentView} onViewChange={handleViewChange} />

        <BodyDiagram view={currentView} onMuscleClick={handleMuscleClick} />
      </main>

      {/* Lazy loaded modal with suspense fallback */}
      <Suspense fallback={<LoadingSkeleton className="fixed inset-0 z-50" />}>
        <ExerciseModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          muscleName={selectedMuscle}
          exercises={exercises}
          loading={loading}
        />
      </Suspense>
    </div>
  );
}

export default App;
