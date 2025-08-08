import { useState } from "react";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState("new-builds");

  const services = {
    "new-builds": {
      title: "New Pool Construction",
      features: [
        {
          title: "Concrete Pool Specialists",
          description: "Custom-designed concrete pools built to last a lifetime with premium finishes"
        },
        {
          title: "Infinity Edge Design",
          description: "Stunning infinity pools that create seamless visual connections with your landscape"
        },
        {
          title: "Smart Pool Technology",
          description: "Automated systems for heating, lighting, and chemical management"
        }
      ],
      images: [
        {
          main: "https://framerusercontent.com/images/QDv2QvgwIq6lwh2t2SmXUK0Q38.jpg",
          alt: "Primo Pools new construction project"
        },
        {
          small1: "https://framerusercontent.com/images/hJCtYbi5cKh3R2PDg4lEH8U0Gz8.jpg",
          alt: "Primo Pools concrete construction process"
        },
        {
          small2: "https://framerusercontent.com/images/Ot58WJ0rtt12iGsj1VyZ9VMA2LY.jpeg",
          alt: "Primo Pools finished construction"
        }
      ]
    },
    "renovations": {
      title: "Pool Renovations",
      features: [
        {
          title: "Complete Pool Makeovers",
          description: "Transform aging pools with modern finishes and updated technology"
        },
        {
          title: "Surface Refinishing",
          description: "Premium tiling, pebble, and plaster finishes for lasting beauty"
        },
        {
          title: "Equipment Upgrades",
          description: "Energy-efficient pumps, heaters, and automation systems"
        }
      ],
      images: [
        {
          main: "https://framerusercontent.com/images/u2y8Rvxvn9EIqYZ7AP2lmCdOc.png",
          alt: "Primo Pools renovation project"
        },
        {
          small1: "https://framerusercontent.com/images/dXYW7ghkOhRbXF6cX4NK0CJrI.png",
          alt: "Primo Pools tile renovation"
        },
        {
          small2: "https://framerusercontent.com/images/hJCtYbi5cKh3R2PDg4lEH8U0Gz8.jpg",
          alt: "Primo Pools renovated pool"
        }
      ]
    },
    "water-features": {
      title: "Water Features",
      features: [
        {
          title: "Natural Rock Waterfalls",
          description: "Custom waterfalls designed to blend seamlessly with your landscape"
        },
        {
          title: "Fountain Systems",
          description: "Elegant fountains and water jets for visual appeal and relaxation"
        },
        {
          title: "Stream Integration",
          description: "Natural streams and water channels connecting features"
        }
      ],
      images: [
        {
          main: "https://framerusercontent.com/images/Ot58WJ0rtt12iGsj1VyZ9VMA2LY.jpeg",
          alt: "Primo Pools water features"
        },
        {
          small1: "https://framerusercontent.com/images/QDv2QvgwIq6lwh2t2SmXUK0Q38.jpg",
          alt: "Primo Pools natural waterfall feature"
        },
        {
          small2: "https://framerusercontent.com/images/u2y8Rvxvn9EIqYZ7AP2lmCdOc.png",
          alt: "Primo Pools fountain water feature"
        }
      ]
    },
    "landscaping": {
      title: "Pool Landscaping",
      features: [
        {
          title: "Tropical Design",
          description: "Lush plantings that create a resort-style atmosphere"
        },
        {
          title: "Hardscape Integration",
          description: "Decking, patios, and walkways that complement your pool"
        },
        {
          title: "Outdoor Living Spaces",
          description: "Complete entertainment areas with kitchens and seating"
        }
      ],
      images: [
        {
          main: "https://framerusercontent.com/images/dXYW7ghkOhRbXF6cX4NK0CJrI.png",
          alt: "Primo Pools landscaping project"
        },
        {
          small1: "https://framerusercontent.com/images/Ot58WJ0rtt12iGsj1VyZ9VMA2LY.jpeg",
          alt: "Primo Pools tropical landscaping"
        },
        {
          small2: "https://framerusercontent.com/images/hJCtYbi5cKh3R2PDg4lEH8U0Gz8.jpg",
          alt: "Primo Pools deck and patio"
        }
      ]
    },
    "maintenance": {
      title: "Maintenance Services",
      features: [
        {
          title: "Regular Cleaning",
          description: "Professional cleaning services to keep your pool pristine"
        },
        {
          title: "Chemical Balancing",
          description: "Expert water chemistry management for safe swimming"
        },
        {
          title: "Equipment Service",
          description: "Preventive maintenance and repairs for all pool equipment"
        }
      ],
      images: [
        {
          main: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          alt: "Pool maintenance service"
        },
        {
          small1: "https://images.unsplash.com/photo-1562113530-57ba4cea6b80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
          alt: "Pool cleaning equipment"
        },
        {
          small2: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
          alt: "Pool maintenance tools"
        }
      ]
    }
  };

  const tabs = [
    { id: "new-builds", label: "New Builds" },
    { id: "renovations", label: "Renovations" },
    { id: "water-features", label: "Water Features" },
    { id: "landscaping", label: "Landscaping" },
    { id: "maintenance", label: "Maintenance" }
  ];

  const currentService = services[activeTab as keyof typeof services];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-deep-blue/5 to-turquoise/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-cabinet font-bold text-deep-blue mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From new pool construction to complete renovations, we offer comprehensive services to bring your aquatic dreams to life.
          </p>
        </div>
        
        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className="glass-morphism rounded-full p-2 shadow-lg">
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? "bg-turquoise text-white shadow-lg animate-pulse-glow"
                      : "text-deep-blue hover:bg-white/20 hover:shadow-md"
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Service Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-cabinet font-bold text-deep-blue mb-6">{currentService.title}</h3>
            <div className="space-y-4">
              {currentService.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-turquoise rounded-full flex items-center justify-center mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-blue">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button 
                onClick={scrollToContact}
                className="bg-turquoise text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 ripple-effect hover-lift"
              >
                Learn More About {currentService.title}
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="ken-burns-hover rounded-xl overflow-hidden hover-lift">
              <img 
                src={currentService.images[0].main}
                alt={currentService.images[0].alt}
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="ken-burns-hover rounded-xl overflow-hidden hover-lift">
                <img 
                  src={currentService.images[1].small1}
                  alt={currentService.images[1].alt}
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="ken-burns-hover rounded-xl overflow-hidden hover-lift">
                <img 
                  src={currentService.images[2].small2}
                  alt={currentService.images[2].alt}
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
