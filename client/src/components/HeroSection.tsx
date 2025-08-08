export default function HeroSection() {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Video background simulation with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-blue/20 via-turquoise/10 to-deep-blue/30"></div>
      
      {/* Hero background image - Primo Pools actual project */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ken-burns"
        style={{
          backgroundImage: "url('https://framerusercontent.com/images/QDv2QvgwIq6lwh2t2SmXUK0Q38.jpg')"
        }}
      />
      
      <div className="video-overlay absolute inset-0"></div>
      
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-cabinet font-bold text-white mb-6 drop-shadow-2xl leading-tight">
            Luxury Pool<br />
            <span className="text-turquoise animate-pulse-glow">Perfection</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light text-shadow animate-slideInLeft" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            Transform your backyard into a luxury oasis with Western Australia's premier pool builders
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideInRight" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <button 
              onClick={scrollToPortfolio}
              className="bg-turquoise text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 ripple-effect hover-lift transform hover:scale-105"
            >
              <i className="fas fa-images mr-2"></i>
              View Our Work
            </button>
            <button 
              onClick={scrollToContact}
              className="glass-morphism text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 transform hover:scale-105"
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <i className="fas fa-chevron-down text-2xl"></i>
      </div>
    </section>
  );
}
