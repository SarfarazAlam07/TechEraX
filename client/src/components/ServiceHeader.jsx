import React from 'react';
import { motion } from 'framer-motion';

const ServiceHeader = () => {
  return (
    <section className="bg-slate-50 py-20 px-6 md:px-12 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3"
        >
          Our Expertise
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6"
        >
          Digital solutions that <br />
          <span className="text-shine">drive actual growth.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Frontend, backend, databases, and deployment—we handle the chaos so you can focus on the business.
        </motion.p>
      </div>
    </section>
  );
};

export default ServiceHeader;