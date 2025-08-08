export default function FeaturedPoolsMarquee() {
  const featuredPools = [
    {
      image: "https://framerusercontent.com/images/QDv2QvgwIq6lwh2t2SmXUK0Q38.jpg",
      alt: "Primo Pools luxury infinity pool project"
    },
    {
      image: "https://framerusercontent.com/images/hJCtYbi5cKh3R2PDg4lEH8U0Gz8.jpg",
      alt: "Primo Pools custom family pool design"
    },
    {
      image: "https://framerusercontent.com/images/Ot58WJ0rtt12iGsj1VyZ9VMA2LY.jpeg",
      alt: "Primo Pools contemporary pool installation"
    },
    {
      image: "https://framerusercontent.com/images/u2y8Rvxvn9EIqYZ7AP2lmCdOc.png",
      alt: "Primo Pools portfolio showcase"
    },
    {
      image: "https://framerusercontent.com/images/dXYW7ghkOhRbXF6cX4NK0CJrI.png",
      alt: "Primo Pools professional construction"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-turquoise/5 to-deep-blue/5">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-cabinet font-bold text-center text-deep-blue mb-12">
          Featured Projects
        </h2>
        <div className="overflow-hidden">
          <div className="flex space-x-6 animate-marquee">
            {[...featuredPools, ...featuredPools].map((pool, index) => (
              <div key={index} className="ken-burns-hover flex-shrink-0 w-80 h-60 rounded-xl overflow-hidden hover-lift shadow-lg">
                <img 
                  src={pool.image}
                  alt={pool.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <p className="text-sm font-medium">{pool.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
