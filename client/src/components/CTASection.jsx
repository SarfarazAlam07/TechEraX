import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASectionMobileOptimized = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 md:px-12 bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 text-center px-6 py-16 md:px-20 md:py-20 shadow-xl overflow-hidden"
      >
        {/* Subtle Gradient Glow (STATIC – No animation) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb33,transparent_60%)] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Ready to get started?
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Build something
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              amazing with us
            </span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg max-w-xl mb-8">
            We help brands design and launch beautiful digital products that
            users love.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/contactus")}
            className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-base md:text-lg flex items-center gap-2 shadow-lg"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASectionMobileOptimized;
