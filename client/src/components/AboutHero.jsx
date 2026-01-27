import React from 'react';
import { motion } from 'framer-motion';// eslint-disable-line no-unused-vars

const AboutHero = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 overflow-hidden bg-slate-50">
      {/* Background Blur */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/30 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4"
        >
          Who We Are
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6"
        >
          Bridging the gap between <br />
          <span className="text-shine">Imagination & Reality</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          TechEraX is a new-age digital agency committed to transforming businesses through innovation, design, and robust technology.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHero;
