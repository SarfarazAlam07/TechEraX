import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useData } from "../context/DataContext"; // ✅ Backend Data

const PortfolioGallery = () => {
  const { projects } = useData();
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {["All", "Web", "App", "Design"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${filter === item ? "bg-slate-900 text-white shadow-lg scale-105" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects?.map((project) => (
              <motion.div
                layout
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-colors duration-300 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 gap-4">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        className="p-3 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        className="p-3 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.split(",").map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium"
                      >
                        {t.trim()}
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
