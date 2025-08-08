import { useState } from "react";

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "New Builds", "Renovations", "Water Features"];

  const portfolioItems = [
    {
      id: 1,
      title: "Luxury Infinity Pool",
      description: "Stunning infinity edge design with premium finishes",
      category: "New Builds",
      image: "https://framerusercontent.com/images/QDv2QvgwIq6lwh2t2SmXUK0Q38.jpg"
    },
    {
      id: 2,
      title: "Contemporary Family Pool",
      description: "Modern family pool with integrated entertainment area",
      category: "New Builds",
      image: "https://framerusercontent.com/images/hJCtYbi5cKh3R2PDg4lEH8U0Gz8.jpg"
    },
    {
      id: 3,
      title: "Resort-Style Design",
      description: "Tropical oasis with natural stone features",
      category: "New Builds",
      image: "https://framerusercontent.com/images/Ot58WJ0rtt12iGsj1VyZ9VMA2LY.jpeg"
    },
    {
      id: 4,
      title: "Premium Pool Construction",
      description: "High-end concrete pool with water features",
      category: "Water Features",
      image: "https://framerusercontent.com/images/u2y8Rvxvn9EIqYZ7AP2lmCdOc.png"
    },
    {
      id: 5,
      title: "Pool Renovation Project",
      description: "Complete makeover with modern finishes",
      category: "Renovations",
      image: "https://framerusercontent.com/images/dXYW7ghkOhRbXF6cX4NK0CJrI.png"
    },
    {
      id: 6,
      title: "Custom Pool Design",
      description: "Bespoke pool tailored to client specifications",
      category: "Renovations",
      image: "https://framerusercontent.com/images/QDv2QvgwIq6lwh2t2SmXUK0Q38.jpg"
    }
  ];

  const filteredItems = activeFilter === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-turquoise/5 to-deep-blue/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-cabinet font-bold text-deep-blue mb-6">Our Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our collection of luxury pools, each uniquely designed and crafted to transform ordinary backyards into extraordinary oases.
          </p>
        </div>
        
        {/* Portfolio Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass-morphism rounded-full p-2">
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-turquoise text-white"
                      : "text-deep-blue hover:bg-white/20"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Masonry Gallery */}
        <div className="masonry">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="masonry-item ken-burns-hover glass-morphism rounded-xl overflow-hidden hover-lift cursor-pointer animate-fadeInUp group"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-turquoise/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <i className="fas fa-eye text-3xl mb-2"></i>
                    <p className="font-medium">View Details</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-deep-blue mb-2 group-hover:text-turquoise transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
                <div className="mt-4 flex items-center text-turquoise opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Learn More</span>
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-turquoise text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 ripple-effect hover-lift">
            View Complete Gallery
          </button>
        </div>
      </div>
    </section>
  );
}
