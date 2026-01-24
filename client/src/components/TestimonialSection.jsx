import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; 
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const dummyReviews = [
          {
            id: 1,
            name: "Sarah Jenkins",
            role: "CEO at BrightWave",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
            content: "TechEraX completely transformed our digital presence. Their team didn't just build a website; they built a brand experience that converted visitors into customers immediately.",
            stars: 5
          },
          {
            id: 2,
            name: "Michael Ross",
            role: "Founder, StartScale",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
            content: "The speed and attention to detail were unmatched. We launched our MVP two weeks ahead of schedule, thanks to their agile development process.",
            stars: 5
          },
          {
            id: 3,
            name: "Emily Tao",
            role: "Marketing Director",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
            content: "I've worked with many agencies, but none have understood our vision like this team. The design is sleek, modern, and exactly what we needed.",
            stars: 5
          },
          {
            id: 4,
            name: "David Chen",
            role: "CTO, FinTech Solutions",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
            content: "Technical expertise is top-notch. They handled complex backend integrations seamlessly while keeping the frontend buttery smooth.",
            stars: 4
          }
        ];

        setTimeout(() => {
          setReviews(dummyReviews);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // --- ARROW SCROLL LOGIC ---
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // 420px approx card width + gap
      const scrollAmount = 420; 

      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-500">Loading reviews...</div>;

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2"
          >
            Testimonials
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
          >
            Trusted by Innovative Companies
          </motion.h2>
        </div>

        {/* --- SCROLL CONTAINER --- */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-4 -mx-4 pb-12 pt-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {reviews.map((review) => (
            <motion.div 
              key={review.id}
              className="relative min-w-[320px] md:min-w-[400px] snap-center"
            >
              {/* CARD */}
              <motion.div 
                className="bg-white rounded-2xl p-8 h-full flex flex-col justify-between shadow-sm border border-gray-100 relative overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                
                <Quote className="absolute top-4 right-6 w-24 h-24 text-gray-50 opacity-[0.06] rotate-12 pointer-events-none" />

                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < review.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed italic mb-8 relative z-10">
                    "{review.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                    <p className="text-gray-500 text-sm">{review.role}</p>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          ))}
          
          <div className="min-w-[20px]" />
        </div>

        {/* --- ARROW BUTTONS (REPLACED DOTS) --- */}
        <div className="flex justify-center gap-4 mt-4">
          
          {/* LEFT ARROW */}
          <button
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;