export default function StickyQuoteCTA() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-6 bottom-24 z-40 hidden md:block">
      <div className="relative group">
        <button 
          onClick={scrollToContact}
          className="bg-turquoise text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 hover-lift ripple-effect shadow-lg animate-float animate-pulse-glow transform group-hover:scale-110"
        >
          <i className="fas fa-phone mr-2"></i>
          Contact Us
        </button>
        <div className="absolute -top-12 right-0 bg-deep-blue text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Start your pool journey
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-deep-blue"></div>
        </div>
      </div>
    </div>
  );
}
