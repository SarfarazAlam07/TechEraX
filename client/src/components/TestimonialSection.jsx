import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Star, Quote, ChevronLeft, ChevronRight, X, PenTool } from 'lucide-react';
import axios from 'axios';
import { useData } from '../context/DataContext'; // Assuming you have this context for API_URL

const TestimonialSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  
  // Modal State for Submitting Review
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", role: "", content: "", stars: 5, image: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use API URL directly if context is not available inside this component
  const API_URL = "http://localhost:5000/api"; 

  // ✅ Fetch Reviews from API
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/reviews`);
      setReviews(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // --- SUBMIT REVIEW ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/reviews`, formData);
      alert("Thank you! Your review has been submitted.");
      setIsModalOpen(false);
      setFormData({ name: "", role: "", content: "", stars: 5, image: "" });
      fetchReviews(); // Refresh list
    } catch (error) {
      alert("Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SCROLL LOGIC ---
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
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
    <section className="py-20 bg-slate-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* HEADER */}
        <div className="text-center mb-16 relative">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2"
          >
            Testimonials
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6"
          >
            Trusted by Innovative Companies
          </motion.h2>
          
          {/* ✅ WRITE REVIEW BUTTON */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
          >
            <PenTool size={16} /> Write a Review
          </button>
        </div>

        {/* --- SCROLL CONTAINER --- */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-4 -mx-4 pb-12 pt-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {reviews.length === 0 ? (
            <p className="text-center w-full text-gray-500">No reviews yet. Be the first to review!</p>
          ) : reviews.map((review) => (
            <motion.div 
              key={review._id}
              className="relative min-w-[320px] md:min-w-[400px] snap-center"
            >
              <motion.div 
                className="bg-white rounded-2xl p-8 h-full flex flex-col justify-between shadow-sm border border-gray-100 relative overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
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
                    src={review.image || `https://ui-avatars.com/api/?name=${review.name}&background=random`} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                    onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${review.name}&background=random`}
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

        {/* --- ARROW BUTTONS --- */}
        {reviews.length > 2 && (
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => scroll('left')} className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => scroll('right')} className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* ✅ REVIEW MODAL FORM */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role / Company</label>
                  <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} placeholder="e.g. CEO, Google"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button type="button" key={star} onClick={() => setFormData({...formData, stars: star})}>
                        <Star className={`w-8 h-8 ${star <= formData.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                  <textarea required rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL (Optional)</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="https://..."
                  />
                </div>
                
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialSection;
