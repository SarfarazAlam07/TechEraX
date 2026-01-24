import React from 'react';
import { motion } from 'framer-motion';

const BlogHero = () => {
  return (
    <section className="bg-slate-50 py-20 px-6 md:px-12 text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200/40 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200/40 rounded-full blur-[80px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3"
        >
          Our Blog
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6"
        >
          Insights & <br />
          <span className="text-shine">Answers.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Latest tech trends, development tips, and answers to your burning questions.
        </motion.p>
      </div>
    </section>
  );
};

export default BlogHero;