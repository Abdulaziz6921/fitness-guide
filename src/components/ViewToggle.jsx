function ViewToggle({ currentView, onViewChange }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="view-toggle">
        <div className="flex">
          <button
            onClick={() => onViewChange("back")}
            className={`view-toggle-btn px-2 sm:px-6 py-3 rounded-lg font-medium text-base flex items-center space-x-2 ${
              currentView === "back"
                ? "active"
                : "text-white/80 hover:text-white"
            }`}
          >
            <span className="text-md">🔄</span>
            <span>Back View</span>
          </button>

          <button
            onClick={() => onViewChange("front")}
            className={`view-toggle-btn px-2 sm:px-6 py-3 rounded-lg font-medium text-base flex items-center space-x-2 ${
              currentView === "front"
                ? "active"
                : "text-white/80 hover:text-white"
            }`}
          >
            <span className="text-md">👁️</span>
            <span>Front View</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewToggle;
