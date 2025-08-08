import { useState } from "react";
import logoImage from "@assets/primopoolslogo_1749710889060.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/95 border-b border-white/10 backdrop-blur-xl shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <img 
              src={logoImage} 
              alt="Primo Pools Logo" 
              className="h-14 w-auto"
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-white hover:text-turquoise transition-colors duration-300 font-medium">Home</button>
              <button onClick={() => scrollToSection('story')} className="text-white hover:text-turquoise transition-colors duration-300 font-medium">Our Story</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-white hover:text-turquoise transition-colors duration-300 font-medium">Portfolio</button>
              <button onClick={() => scrollToSection('process')} className="text-white hover:text-turquoise transition-colors duration-300 font-medium">Process</button>
              <button onClick={() => scrollToSection('services')} className="text-white hover:text-turquoise transition-colors duration-300 font-medium">Services</button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-turquoise transition-colors duration-300 font-medium">Contact</button>
              <a href="/customer/login" className="text-white hover:text-turquoise transition-colors duration-300 font-medium">Portal</a>
            </div>
          </div>
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-turquoise text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 ripple-effect font-medium"
            >
              Get Quote
            </button>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-turquoise"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => scrollToSection('home')} className="block px-3 py-2 text-white hover:text-turquoise font-medium w-full text-left">Home</button>
            <button onClick={() => scrollToSection('story')} className="block px-3 py-2 text-white hover:text-turquoise font-medium w-full text-left">Our Story</button>
            <button onClick={() => scrollToSection('portfolio')} className="block px-3 py-2 text-white hover:text-turquoise font-medium w-full text-left">Portfolio</button>
            <button onClick={() => scrollToSection('process')} className="block px-3 py-2 text-white hover:text-turquoise font-medium w-full text-left">Process</button>
            <button onClick={() => scrollToSection('services')} className="block px-3 py-2 text-white hover:text-turquoise font-medium w-full text-left">Services</button>
            <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 text-white hover:text-turquoise font-medium w-full text-left">Contact</button>
            <a href="/customer/login" className="block px-3 py-2 text-white hover:text-turquoise font-medium w-full text-left">Portal</a>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 bg-turquoise text-white rounded-lg font-medium"
            >
              Get Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
