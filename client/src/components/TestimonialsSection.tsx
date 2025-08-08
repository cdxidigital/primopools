import { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Michael Thompson",
      location: "Cottesloe, WA",
      rating: 5,
      review: "Primo Pools transformed our backyard into a stunning oasis. The infinity pool design is absolutely breathtaking, and the quality of workmanship is exceptional. The team was professional throughout the entire process.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      location: "Subiaco, WA",
      rating: 5,
      review: "We couldn't be happier with our new family pool. The integrated spa and water features are perfect for entertaining. Primo Pools exceeded our expectations in every way possible.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 3,
      name: "David Chen",
      location: "Mount Lawley, WA",
      rating: 5,
      review: "The renovation of our old pool was handled with incredible attention to detail. The new lighting and tiling have completely transformed the space. Highly recommend Primo Pools!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-quartz-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-cabinet font-bold text-deep-blue mb-6">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients across Perth have to say about their Primo Pools experience.
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0">
                <div className="glass-morphism rounded-xl p-8 mx-4 hover-lift">
                  <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400 text-xl">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <span className="ml-4 text-gray-600 font-medium">Google Review</span>
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "{testimonial.review}"
                  </blockquote>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image}
                      alt={`${testimonial.name} testimonial`}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-semibold text-deep-blue">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Controls */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-turquoise text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-turquoise text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentTestimonial === index ? "bg-turquoise" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
