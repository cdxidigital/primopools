export default function OurStorySection() {
  const stats = [
    { number: "200+", label: "Luxury Projects Completed" },
    { number: "6", label: "Years of Excellence" },
    { number: "100%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Support & Maintenance" }
  ];

  const values = [
    {
      title: "Quality Craftsmanship",
      description: "Every pool is built with precision and attention to detail, using only premium materials and proven construction techniques."
    },
    {
      title: "Innovation & Design",
      description: "We stay ahead of industry trends, incorporating the latest technology and design concepts into every project."
    },
    {
      title: "Customer-Centric Approach",
      description: "Your vision drives our process. We work closely with you from concept to completion to exceed your expectations."
    }
  ];

  return (
    <section id="story" className="py-24 bg-gradient-to-br from-quartz-white via-white to-turquoise/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-cabinet font-bold text-deep-blue mb-6">Our Story</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Since 2018, Primo Pools has been transforming backyards across Western Australia with luxury concrete pools 
            that combine innovative design, superior craftsmanship, and lasting quality.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center glass-morphism p-8 rounded-2xl hover-lift">
              <div className="text-4xl lg:text-5xl font-cabinet font-bold text-turquoise mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <div key={index} className="glass-morphism p-8 rounded-2xl hover-lift">
              <h3 className="text-2xl font-bold text-deep-blue mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="text-center glass-morphism p-12 rounded-3xl">
          <blockquote className="text-2xl lg:text-3xl font-light text-deep-blue leading-relaxed">
            "We don't just build pools - we create aquatic masterpieces that transform your outdoor living space 
            into a personal resort where memories are made and dreams come to life."
          </blockquote>
          <cite className="block mt-6 text-turquoise font-semibold">— The Primo Pools Team</cite>
        </div>
      </div>
    </section>
  );
}