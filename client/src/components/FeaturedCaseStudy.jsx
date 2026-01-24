import React from "react";
import { ArrowRight, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedCaseStudy = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 transform origin-top-right" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-yellow-400 font-bold mb-4">
            <Trophy className="w-5 h-5" />
            <span>Featured Case Study</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Revolutionizing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Healthcare Management
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            We helped "MediCare+" scale their operations by 300% using a custom
            AI-driven dashboard. From discovery to deployment, see how we solved
            complex data challenges.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-white">300%</span>
              <span className="text-xs text-slate-400">Efficiency Boost</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="block text-2xl font-bold text-white">2M+</span>
              <span className="text-xs text-slate-400">Users Handled</span>
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-500 text-white  rounded-full font-bold flex items-center gap-2 transition-all group">
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11520245/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all group w-max cursor-pointer decoration-0"
            >
              ReadCaseStudy
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </button>
        </motion.div>

        {/* Image Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full" />
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
            alt="Case Study Mockup"
            className="relative rounded-xl shadow-2xl border border-slate-700"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudy;
