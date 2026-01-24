import React from 'react';
import { motion } from 'framer-motion';

const PortfolioHeader = () => {
  return (
    <section className="bg-slate-50 py-20 px-6 md:px-12 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3"
        >
          Our Portfolio
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6"
        >
          Building Digital <br />
          <span className="text-shine">Excellence.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Explore our latest projects. From stunning websites to complex mobile applications, we deliver results.
        </motion.p>
      </div>
    </section>
  );
};

export default PortfolioHeader;