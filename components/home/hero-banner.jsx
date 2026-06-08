export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden min-h-[70vh]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/images/hero-1.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-32 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Welcome to CineScope
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow">
            Discover and book the best movies in town. Experience cinema like never before with our premium selection of films.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/movies" 
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              Browse Movies
            </a>
            <a 
              href="#featured" 
              className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30 shadow-lg"
            >
              Featured Films
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
