import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Systems...");

  // Progress aur Status change karne ka logic
  useEffect(() => {
    const statuses = [
      "Initializing Systems...",
      "Establishing Secure Link...",
      "Compiling Modules...",
      "Optimizing Assets...",
      "Finalizing Build..."
    ];

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0; // 100 hone par wapas 0 (agar loop karna ho)
        const next = p + 1;
        
        if (next === 20) setStatus(statuses[1]);
        if (next === 40) setStatus(statuses[2]);
        if (next === 70) setStatus(statuses[3]);
        if (next === 90) setStatus(statuses[4]);
        
        return next;
      });
    }, 40); // Loader ki speed

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 font-sans">
      
      {/* 1. The Core X Animation (Jo tumhe pasand aaya) */}
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Outer Tech Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-full border-2 border-dashed border-cyan-500/30 rounded-full"
        />

        {/* Diagonal X Lines */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute w-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] rotate-45"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="absolute w-1 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)] -rotate-45"
          />
        </div>
      </div>

      {/* 2. Brand Name & Scanline (Same as before) */}
      <div className="mt-8 flex flex-col items-center">
        <motion.h1 
          animate={{ opacity: [1, 0.8, 1], scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl font-black tracking-[0.2em] text-white uppercase"
        >
          TECH<span className="text-cyan-500">ERA</span>X
        </motion.h1>
        
        {/* Scanning Line */}
        <div className="w-48 h-[2px] bg-slate-800 mt-3 overflow-hidden relative rounded-full">
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>
      </div>

      {/* 3. The Latest Dynamic Island Pill (Replacing old text) */}
      <motion.div 
        layout
        className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        {/* Latest Circular Spinner */}
        <motion.svg 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 text-blue-500" 
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="3" stroke="currentColor" className="opacity-20" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 2v4m0 12v4M2 12h4m12 0h4" className="opacity-80" />
        </motion.svg>
        
        {/* Changing Status Text */}
        <span className="text-sm font-medium text-white/80 w-44 text-left">
          <AnimatePresence mode="wait">
            <motion.span
              key={status}
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -5 }}
              className="inline-block"
            >
              {status}
            </motion.span>
          </AnimatePresence>
        </span>

        {/* Progress Percentage */}
        <span className="text-sm font-bold text-blue-400 w-10 text-right font-mono tracking-wider">
          {progress}%
        </span>
      </motion.div>

    </div>
  );
};

export default Loader;
