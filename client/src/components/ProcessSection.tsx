import { motion } from "framer-motion";

export default function ProcessSection() {
  const processSteps = [
    {
      step: 1,
      icon: "fas fa-comments",
      title: "Consult",
      description: "Free consultation to understand your vision and requirements"
    },
    {
      step: 2,
      icon: "fas fa-drafting-compass",
      title: "Design",
      description: "Custom 3D design and technical drawings tailored to your space"
    },
    {
      step: 3,
      icon: "fas fa-cogs",
      title: "Engineering",
      description: "Detailed engineering and council approvals for safe construction"
    },
    {
      step: 4,
      icon: "fas fa-hammer",
      title: "Build",
      description: "Expert construction using premium materials and techniques"
    },
    {
      step: 5,
      icon: "fas fa-key",
      title: "Handover",
      description: "Complete handover with training and ongoing support"
    }
  ];

  return (
    <section id="process" className="py-20 bg-quartz-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-cabinet font-bold text-deep-blue mb-6">Our Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From initial consultation to final handover, we ensure every step of your pool construction journey is seamless and stress-free.
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          {processSteps.map((step, index) => (
            <div key={step.step}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center hover-lift glass-morphism p-6 rounded-xl"
              >
                <div 
                  className="w-20 h-20 bg-turquoise rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 animate-float"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <i className={step.icon}></i>
                </div>
                <h3 className="text-xl font-cabinet font-bold text-deep-blue mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
              
              {/* Process connector */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:flex items-center justify-center mt-8">
                  <div className="w-full h-px bg-gradient-to-r from-turquoise to-deep-blue"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Process Details */}
        <div className="mt-16 text-center">
          <div className="glass-morphism rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-cabinet font-bold text-deep-blue mb-4">Quality Assured Process</h3>
            <p className="text-gray-600 leading-relaxed">
              Our proven 5-step process ensures every project meets our exacting standards. With over 200 completed pools across Western Australia, 
              we've refined our approach to deliver exceptional results on time and on budget. Each step includes quality checkpoints and client communication 
              to ensure your complete satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
