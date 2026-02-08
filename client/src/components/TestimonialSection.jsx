import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Star, Quote, ChevronLeft, ChevronRight, X, PenTool, Upload, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useData } from '../context/DataContext';

const TestimonialSection = () => {
  const { API_URL, reviews, refreshData } = useData(); 
  
  const scrollRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "", lastName: "", content: "", stars: 0, image: ""
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- IMAGE UPLOAD FUNCTION ---
  const uploadToCloudinary = async () => {
    if (!imageFile) return ""; 

    const data = new FormData();
    data.append("file", imageFile);
    // ✅ Make sure this matches your Cloudinary settings exactly
    data.append("upload_preset", "techerax_reviews"); 
    const cloudName = "dvl2mf2dv"; 

    try {
      setIsUploading(true);
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data);
      setIsUploading(false);
      return res.data.secure_url; 
    } catch (error) {
      console.error("Cloudinary Error Detail:", error.response?.data);
      setIsUploading(false);
      alert(`Image upload failed: ${error.response?.data?.error?.message || "Check console"}`);
      return null;
    }
  };

  // --- SUBMIT REVIEW ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const wordCount = formData.content.trim().split(/\s+/).length;
    if (wordCount > 200) {
      alert(`Review is too long (${wordCount} words). Limit is 200.`);
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadToCloudinary();
        if (!imageUrl) {
            setIsSubmitting(false);
            return; 
        }
      }

      const payload = {
        ...formData,
        image: imageUrl, 
        role: formData.lastName 
      };

      await axios.post(`${API_URL}/reviews`, payload);
      alert("Thank you! Your review has been submitted.");
      setIsModalOpen(false);
      setFormData({ name: "", lastName: "", content: "", stars: 0, image: "" });
      setImageFile(null);
      refreshData(); 
      
    } catch (error) {
      console.error("Submit Error:", error);
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

  return (
    <section className="py-20 bg-slate-50 overflow-hidden relative">
      {/* ✅ CSS for Custom Scrollbar (Card ke andar wala scroll patla dikhega) */}
      <style>{`
        .thin-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* HEADER */}
        <div className="text-center mb-16 relative">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">
            Testimonials
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Trusted by Innovative Companies
          </motion.h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
            <PenTool size={16} /> Write a Review
          </button>
        </div>

        {/* --- SCROLL CONTAINER --- */}
        <div ref={scrollRef} className="flex overflow-x-auto gap-6 px-4 -mx-4 pb-12 pt-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
          {!reviews || reviews.length === 0 ? (
            <p className="text-center w-full text-gray-500">No reviews yet. Be the first to review!</p>
          ) : reviews.map((review) => (
            <motion.div key={review._id} className="relative min-w-[320px] md:min-w-[400px] snap-center">
              <motion.div 
                className="bg-white rounded-2xl p-6 h-[320px] flex flex-col shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <Quote className="absolute top-4 right-4 w-16 h-16 text-gray-50 opacity-20 rotate-12 pointer-events-none" />

                {/* HEADER: Image + Name + Stars */}
                <div className="flex items-center gap-4 mb-4 border-b border-gray-50 pb-4 flex-shrink-0">
                  <img 
                    src={review.image || `https://ui-avatars.com/api/?name=${review.name}&background=random`} 
                    alt={review.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${review.name}&background=random`}
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg leading-tight">
                        {review.name} {review.role} 
                    </h4>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ✅ CONTENT (SCROLLABLE NOW) */}
                <div className="flex-grow overflow-y-auto pr-2 thin-scrollbar">
                    {/* line-clamp hata diya taaki pura text dikhe */}
                    <p className="text-gray-600 text-base leading-relaxed italic">
                        "{review.content}"
                    </p>
                </div>

              </motion.div>
            </motion.div>
          ))}
          <div className="min-w-[20px]" />
        </div>

        {/* --- ARROW BUTTONS --- */}
        {reviews && reviews.length > 2 && (
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

      {/* MODAL (Same as before) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">First Name</label><input required className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label><input required className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} /></div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button type="button" key={star} onClick={() => setFormData({...formData, stars: star === formData.stars ? 0 : star})} className="hover:scale-110 focus:outline-none">
                        <Star className={`w-8 h-8 ${star <= formData.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Tap again to clear.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review (Max 200 words)</label>
                  <textarea required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 resize-none" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})}></textarea>
                  <p className="text-xs text-gray-400 mt-1 text-right">{formData.content.trim().split(/\s+/).filter(w => w).length}/200 words</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Photo (Optional)</label>
                  <div className="relative border border-gray-300 rounded-lg bg-white p-2 flex items-center gap-3">
                     <div className="bg-gray-100 p-2 rounded-lg"><Upload size={20} className="text-gray-500"/></div>
                     <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  </div>
                </div>
                
                <button type="submit" disabled={isSubmitting || isUploading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  {(isSubmitting || isUploading) ? <><Loader2 className="animate-spin" /> Processing...</> : "Submit Review"}
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
