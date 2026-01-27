import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile ke liye simple animations
  const blobAnimation = isMobile || prefersReducedMotion
    ? {} // No animation on mobile
    : {
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, -30, 0],
      };

  const blobAnimation2 = isMobile || prefersReducedMotion
    ? {}
    : {
        scale: [1, 1.3, 1],
        x: [0, -50, 0],
        y: [0, 40, 0],
      };

  return (
    <section className="py-20 px-4 md:px-12 bg-white relative">
      {/* MAIN CONTAINER (Dark Card) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Reduced initial animation
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }} // Faster transition
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-6xl mx-auto bg-[#0F172A] rounded-3xl md:rounded-[2.5rem] relative overflow-hidden text-center py-16 md:py-20 px-6 md:px-20 shadow-2xl shadow-blue-900/20"
      >
        {/* --- SIMPLIFIED BACKGROUND BLOBS --- */}
        
        {/* Blue Blob - Mobile pe static ya minimal animation */}
        <motion.div
          animate={blobAnimation}
          transition={
            isMobile
              ? {}
              : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
          className={`absolute top-0 left-0 w-64 md:w-[500px] h-64 md:h-[500px] bg-blue-600/30 rounded-full -translate-x-1/2 -translate-y-1/2 ${
            isMobile ? "blur-[40px]" : "blur-[80px]"
          }`}
        />
        
        {/* Purple Blob */}
        <motion.div
          animate={blobAnimation2}
          transition={
            isMobile
              ? {}
              : { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }
          className={`absolute bottom-0 right-0 w-64 md:w-[500px] h-64 md:h-[500px] bg-purple-600/20 rounded-full translate-x-1/2 translate-y-1/2 ${
            isMobile ? "blur-[40px]" : "blur-[80px]"
          }`}
        />

        {/* Grid Overlay - Sirf desktop pe */}
        {!isMobile && (
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
        )}

        {/* --- CONTENT --- */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-300 text-sm font-medium mb-6 md:mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Ready to transform your business?</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
            Let's build something <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              extraordinary together.
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-slate-400 text-base md:text-xl max-w-2xl mb-8 md:mb-10 leading-relaxed px-4">
            From concept to launch, we help ambitious brands create digital
            experiences that matter.
          </p>

          {/* PRIMARY BUTTON */}
          <motion.button
            onClick={() => navigate("/contactus")}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="group relative bg-white text-slate-900 px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg flex items-center gap-3 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.6)] transition-shadow duration-300 active:scale-95"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
