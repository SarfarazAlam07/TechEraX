import React from 'react';
import { motion } from 'framer-motion';// eslint-disable-line no-unused-vars
import { useData } from "../context/DataContext";
const AboutStats = () => {
  const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Delivered", value: "100+" },
    { label: "Client Retention", value: "98%" },
    { label: "Team Members", value: "25+" }
  ];

  return (
    <section className="py-12 border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-4xl font-bold text-blue-600 mb-1">{stat.value}</h3>
            <p className="text-gray-500 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutStats;
