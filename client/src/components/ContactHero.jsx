import React from 'react';
import { motion } from 'framer-motion';

const ContactHero = () => {
  return (
    <section className="pt-20 pb-12 px-6 md:px-12 text-center bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3"
        >
          Contact Us
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6"
        >
          Let’s build something <br />
          <span className="text-shine">great together.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Have a project in mind? We'd love to hear about it. We typically reply within 2 hours during business days.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactHero;