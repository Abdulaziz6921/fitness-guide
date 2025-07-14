function Header() {
  return (
    <header className=" relative z-10 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Simple Subtitle */}
        <p className="text-white/90 text-md md:text-xl font-medium mb-4">
          Discover Your Perfect Workout Journey
        </p>

        {/* Simple Call to Action */}
        <div className="text-white/80 text-sm">
          👇 Start by selecting a body view below 👇
        </div>
      </div>
    </header>
  );
}

export default Header;
