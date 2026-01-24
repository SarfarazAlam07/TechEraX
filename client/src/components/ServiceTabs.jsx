import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, PenTool, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceTabs = () => {
  const [activeTab, setActiveTab] = useState('fullstack');

  const services = {
    fullstack: {
      title: "Complete digital systems from ground up",
      desc: "We build robust, scalable web applications using the MERN stack and Next.js. From database architecture to the pixel-perfect frontend, we handle it all.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      color: "bg-blue-600",
      icon: <Code2 className="w-6 h-6" />
    },
    uiux: {
      title: "Design that users actually love to use",
      desc: "It's not just about looking good. We focus on user journeys, wireframing, and interactive prototypes to ensure high retention rates.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
      color: "bg-purple-600",
      icon: <PenTool className="w-6 h-6" />
    },
    maintenance: {
      title: "Ongoing support & performance optimization",
      desc: "We don't leave you after launch. Our maintenance packages ensure your site stays fast, secure, and updated with the latest tech.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      color: "bg-green-600",
      icon: <Settings className="w-6 h-6" />
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* TAB BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(services).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-8 py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 border flex items-center gap-2 ${
                activeTab === key 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105' 
                  : 'bg-white text-slate-600 border-gray-200 hover:border-blue-500 hover:text-blue-600'
              }`}
            >
              {services[key].icon}
              {key === 'fullstack' ? 'Full-Stack Dev' : key === 'uiux' ? 'UI/UX Design' : 'Maintenance'}
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-16 border border-gray-100 shadow-xl overflow-hidden min-h-[500px] flex items-center">
          <AnimatePresence mode='wait'>
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full"
            >
              {/* Text Side */}
              <div>
                <span className={`inline-block px-4 py-1 rounded-full text-white text-xs font-bold mb-6 ${services[activeTab].color}`}>
                  {activeTab.toUpperCase()}
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  {services[activeTab].title}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {services[activeTab].desc}
                </p>
                
                {/* Orange Button from Screenshot */}
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1">
                  <Link  to="/home#services">Explore Service</Link> <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Image Side */}
              <div className="relative">
                {/* Abstract Decoration */}
                <div className={`absolute -inset-4 rounded-full opacity-20 blur-3xl ${services[activeTab].color}`} />
                <img 
                  src={services[activeTab].image} 
                  alt={services[activeTab].title} 
                  className="relative rounded-2xl shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default ServiceTabs;