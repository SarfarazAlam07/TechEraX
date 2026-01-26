import React from 'react';
import { motion } from 'framer-motion';

const IndustriesWeServe = () => {
  const industries = [
    "Startup","Schools & Coaching", "Kirana & Grocery Shops", "Doctors & Clinics", 
    "Restaurants & Cafes", "Gym & Fitness Centers", "Real Estate & Builders",
    "Jewellery & Fashion", "Salons & Parlours", "Lawyers & CAs",
    "News Portals", "NGOs", "Travel Agencies", "Hotels & Banquets",
    "Transporters", "Furniture Shops", "Repair Services"
  ];

  return (
    <section className="py-16 px-6 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">
          What businesses do we work for?
        </h2>
        <p className="text-gray-400 mb-10">
          Be it a small business or a big startup, we create digital solutions for everyone.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((item, index) => (
            <motion.span 
              key={index}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-slate-800 rounded-full text-sm md:text-base border border-slate-700 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-default"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;