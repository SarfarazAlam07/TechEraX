import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Wireframing UI...");

  useEffect(() => {
    const statuses = [
      "Wireframing UI...",
      "Writing Backend Logic...",
      "Compiling React Components...",
      "Running Security Checks...",
      "Deploying TechEraX App..."
    ];

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0; // Loader restart for demo (100 pe rokna ho toh 'return 100' kar dena)
        const next = p + 1;
        
        if (next === 20) setStatus(statuses[1]);
        if (next === 40) setStatus(statuses[2]);
        if (next === 65) setStatus(statuses[3]);
        if (next === 85) setStatus(statuses[4]);
        
        return next;
      });
    }, 50); // Speed of the loader

    return () => clearInterval(timer);
  }, []);

  // Determine which phase of development to show based on progress
  const getPhase = () => {
    if (progress < 35) return 'wireframe';
    if (progress < 70) return 'code';
    return 'final';
  };

  const phase = getPhase();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-white overflow-hidden font-sans">
      
      {/* Aurora Glow Background */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      {/* Main Mac-style Display Window */}
      <div className="relative w-80 h-52 rounded-2xl border border-white/20 bg-black/40 shadow-2xl overflow-hidden backdrop-blur-xl mb-10">
        
        {/* Window Header Dots */}
        <div className="absolute top-0 w-full h-7 bg-white/5 border-b border-white/10 flex items-center px-3 gap-1.5 z-20">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>

        {/* Dynamic Content Area */}
        <div className="mt-7 relative w-full h-[calc(100%-1.75rem)] overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* Phase 1: Wireframe Mode */}
            {phase === 'wireframe' && (
              <motion.div
                key="wireframe"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 p-4 flex flex-col gap-3"
              >
                <div className="w-full h-10 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
                  <span className="text-white/30 text-[10px] font-mono tracking-widest">HEADER_COMPONENT</span>
                </div>
                <div className="flex gap-3 flex-1">
                  <div className="w-1/3 h-full border-2 border-dashed border-white/30 rounded-lg" />
                  <div className="w-2/3 h-full border-2 border-dashed border-white/30 rounded-lg flex flex-col gap-3 p-3">
                    <div className="w-full h-2 border-b-2 border-dashed border-white/30" />
                    <div className="w-3/4 h-2 border-b-2 border-dashed border-white/30" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Phase 2: Terminal / Code Mode */}
            {phase === 'code' && (
              <motion.div
                key="code"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#0d1117] p-4 font-mono text-[11px] flex flex-col gap-2"
              >
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1 }} className="overflow-hidden whitespace-nowrap text-green-400">
                  $ npx techerax-build-engine
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-slate-400">
                  > Fetching dependencies...
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-cyan-400">
                  > Injecting backend APIs...
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="text-blue-400">
                  > Build successful. Compiling UI...
                </motion.div>
              </motion.div>
            )}

            {/* Phase 3: Final Polished App Mode */}
            {phase === 'final' && (
              <motion.div
                key="final"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="absolute inset-0 bg-slate-50 p-4 flex flex-col gap-3"
              >
                <div className="w-full h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg shadow-md flex items-center px-4 justify-between">
                  <div className="w-20 h-2.5 bg-white/50 rounded-full" />
                  <div className="w-5 h-5 bg-white/30 rounded-full" />
                </div>
                <div className="flex gap-3 flex-1">
                  <div className="w-1/3 h-full bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col gap-2 p-3">
                    <div className="w-full h-8 bg-slate-100 rounded-md" />
                    <div className="w-full h-8 bg-slate-100 rounded-md" />
                  </div>
                  <div className="w-2/3 h-full bg-white rounded-lg shadow-sm border border-slate-200 p-3 relative overflow-hidden">
                    <div className="w-1/2 h-3 bg-slate-800 rounded-full mb-3" />
                    <div className="w-3/4 h-2 bg-slate-300 rounded-full mb-1.5" />
                    <div className="w-2/4 h-2 bg-slate-300 rounded-full" />
                    <div className="mt-4 w-20 h-7 bg-blue-500 rounded-md shadow-lg shadow-blue-500/30 flex items-center justify-center">
                       <span className="text-[8px] text-white font-bold">GET STARTED</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold tracking-tight text-white/90 flex items-center gap-1">
          TechEra<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">X</span>
          <span className="text-blue-500 text-sm ml-1 font-mono"></span>
        </h1>
      </div>

      {/* The Dynamic Island Progress Pill (Exactly as you liked) */}
      <motion.div
        layout
        className="mt-6 flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 text-blue-500"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="3" stroke="currentColor" className="opacity-20" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 2v4m0 12v4M2 12h4m12 0h4" className="opacity-80" />
        </motion.svg>

        <span className="text-sm font-medium text-white/80 w-52 text-left">
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

        <span className="text-sm font-bold text-blue-400 w-10 text-right font-mono tracking-wider">
          {progress}%
        </span>
      </motion.div>

    </div>
  );
};

export default Loader;
