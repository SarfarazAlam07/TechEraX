import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const PortfolioGallery = () => {
  const [filter, setFilter] = useState('All');

  // Dummy Projects Data
  const projects = [
    {
      id: 1,
      title: "FinTech Dashboard",
      category: "Web",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tech: ["React", "Tailwind", "Chart.js"]
    },
    {
      id: 2,
      title: "E-Commerce App",
      category: "App",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      tech: ["React Native", "Firebase", "Stripe"]
    },
    {
      id: 3,
      title: "Corporate Branding",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
      tech: ["Figma", "Adobe XD"]
    },
    {
      id: 4,
      title: "Real Estate Platform",
      category: "Web",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      tech: ["Next.js", "MongoDB", "AWS"]
    },
    {
      id: 5,
      title: "Fitness Tracker",
      category: "App",
      image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80",
      tech: ["Flutter", "Node.js"]
    },
    {
      id: 6,
      title: "Travel Agency UI",
      category: "Design",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
      tech: ["Sketch", "Protopie"]
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* FILTER BUTTONS */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {['All', 'Web', 'App', 'Design'].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === item 
                  ? 'bg-slate-900 text-white shadow-lg scale-105' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* MASONRY GRID */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
              >
                {/* Image Overlay Effect */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-colors duration-300 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 gap-4">
                    <button className="p-3 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform">
                      <Github className="w-5 h-5" />
                    </button>
                  </div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default PortfolioGallery;