export default function MobileBottomNav() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center py-2">
        <a href="https://wa.me/61488040150" className="flex flex-col items-center py-2 px-4 text-turquoise">
          <i className="fab fa-whatsapp text-2xl mb-1"></i>
          <span className="text-xs font-medium">WhatsApp</span>
        </a>
        <a href="tel:0893318998" className="flex flex-col items-center py-2 px-4 text-deep-blue">
          <i className="fas fa-phone text-xl mb-1"></i>
          <span className="text-xs font-medium">Call Now</span>
        </a>
        <button 
          onClick={scrollToContact}
          className="flex flex-col items-center py-2 px-4 bg-turquoise text-white rounded-lg mx-2"
        >
          <i className="fas fa-calculator text-xl mb-1"></i>
          <span className="text-xs font-medium">Get Quote</span>
        </button>
      </div>
    </div>
  );
}
