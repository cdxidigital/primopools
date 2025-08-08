import logoImage from "@assets/primopoolslogo_1749710889060.png";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-deep-blue text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img 
              src={logoImage} 
              alt="Primo Pools Logo" 
              className="h-16 w-auto mb-4"
            />
            <p className="text-white/70 mb-4">
              Perth's premier pool construction specialists, crafting concrete elegance since 2018.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-turquoise rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-turquoise rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-turquoise rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-turquoise transition-colors duration-300">New Pool Construction</a></li>
              <li><a href="#" className="hover:text-turquoise transition-colors duration-300">Pool Renovations</a></li>
              <li><a href="#" className="hover:text-turquoise transition-colors duration-300">Water Features</a></li>
              <li><a href="#" className="hover:text-turquoise transition-colors duration-300">Pool Landscaping</a></li>
              <li><a href="#" className="hover:text-turquoise transition-colors duration-300">Maintenance Services</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-turquoise transition-colors duration-300">Portfolio</button></li>
              <li><button onClick={() => scrollToSection('process')} className="hover:text-turquoise transition-colors duration-300">Our Process</button></li>
              <li><button onClick={() => scrollToSection('story')} className="hover:text-turquoise transition-colors duration-300">About Us</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-turquoise transition-colors duration-300">Contact</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-turquoise transition-colors duration-300">Contact Us</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-white/70">
              <p>35 Mannion Way</p>
              <p>Kardinya WA 6163</p>
              <p>(08) 9331 8998</p>
              <p>hello@primopools.com.au</p>
              <p className="text-sm">ABN: 82 703 745 225</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p>&copy; 2024 Primo Pools. All rights reserved. | <a href="#" className="hover:text-turquoise transition-colors duration-300">Privacy Policy</a> | <a href="#" className="hover:text-turquoise transition-colors duration-300">Terms of Service</a></p>
        </div>
      </div>
    </footer>
  );
}
