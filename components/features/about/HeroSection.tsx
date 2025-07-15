export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')"
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          About <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Travelis</span>
        </h1>
        <p className="text-lg md:text-xl text-white mb-4 leading-relaxed">
          We make adventure accessible to everyone
        </p>
        <p className="text-white/90 leading-relaxed max-w-3xl mx-auto">
          Your trusted companion for discovering, booking, and sharing the world's best travel destinations. 
          We believe every journey should be as unique as the traveler taking it.
        </p>
      </div>
    </section>
  );
} 