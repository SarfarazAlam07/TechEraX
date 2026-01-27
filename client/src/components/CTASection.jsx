import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const Navigate = useNavigate();

  return (
    <section className="py-20 px-4 md:px-12 bg-white relative">
      {/* MAIN CONTAINER (Dark Card) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }} // Margin add kiya taaki thoda pehle load ho
        className="max-w-6xl mx-auto bg-[#0F172A] rounded-[2.5rem] relative overflow-hidden text-center py-20 px-6 md:px-20 shadow-2xl shadow-blue-900/20 transform-gpu" // transform-gpu add kiya
      >
        {/* --- ANIMATED BACKGROUND BLOBS --- */}
        
        {/* Blue Blob */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ backfaceVisibility: "hidden" }} // Hardware acceleration trick
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 transform-gpu will-change-transform"
        />

        {/* Purple Blob */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ backfaceVisibility: "hidden" }} // Hardware acceleration trick
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 transform-gpu will-change-transform"
        />

        {/* Grid Overlay - Opacity thodi kam ki taaki load kam ho */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>

        {/* --- CONTENT (Z-Index fix) --- */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-300 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Ready to transform your business?</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Let’s build something <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              extraordinary together.
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            From concept to launch, we help ambitious brands create digital
            experiences that matter.
          </p>

          {/* PRIMARY BUTTON */}
          <motion.button
            onClick={() => Navigate("/contactus")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-white text-slate-900 px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.6)] transition-all duration-300 transform-gpu"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
