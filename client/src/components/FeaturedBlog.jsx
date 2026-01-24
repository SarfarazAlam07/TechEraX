import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const FeaturedBlog = () => {
  return (
    <section className="py-12 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Image Side */}
            <div className="h-64 md:h-auto overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" 
                alt="Featured Blog" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* Content Side */}
            <div className="bg-slate-900 text-white p-8 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-blue-400 font-bold mb-4">
                <span className="bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">LATEST</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min read</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                The Future of Web Development: AI & No-Code in 2026
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                Explore how artificial intelligence is reshaping the way we build websites, from automated code generation to hyper-personalized user experiences.
              </p>
              
              <div className="flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all">
                Read Article <ArrowRight className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBlog;