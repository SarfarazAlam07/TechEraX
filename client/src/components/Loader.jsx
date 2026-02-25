import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing Engine...");

  useEffect(() => {
    const statuses = [
      "Initializing Engine...",
      "Assembling Bento Grid...",
      "Injecting Stylesheets...",
      "Rendering UI Components...",
      "Finalizing Build...",
    ];

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        const next = p + 1;
        if (next === 15) setStatus(statuses[1]);
        if (next === 40) setStatus(statuses[2]);
        if (next === 65) setStatus(statuses[3]);
        if (next === 90) setStatus(statuses[4]);
        return next;
      });
    }, 35);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-white overflow-hidden font-sans">
      {/* 1. Modern Aurora / Mesh Gradient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      {/* 2. Glassmorphic Canvas (The Workspace) */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-64 h-72 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl p-5 flex flex-col gap-3 mb-12 overflow-hidden"
      >
        {/* Shimmer sweep effect on glass */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-10 pointer-events-none"
        />

        {/* UI Component Assembly (Bento Grid Style) */}

        {/* Header Pill */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="w-full h-8 rounded-full bg-white/5 border border-white/5 flex items-center px-3 gap-2"
        >
          <div className="w-4 h-4 rounded-full bg-blue-500/50" />
          <div className="h-2 w-16 bg-white/10 rounded-full" />
        </motion.div>

        {/* Hero Banner Sceleton */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="w-full h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 relative overflow-hidden"
        >
          {/* Pulsing skeleton inside hero */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-3 left-3 w-1/2 h-3 bg-white/20 rounded-full"
          />
        </motion.div>

        {/* Two Column Grid */}
        <div className="flex gap-3 flex-1">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1, type: "spring" }}
            className="flex-1 rounded-2xl bg-white/5 border border-white/5 p-2 flex flex-col gap-2 justify-end"
          >
            <div className="w-full h-2 bg-white/10 rounded-full" />
            <div className="w-2/3 h-2 bg-white/10 rounded-full" />
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.3, type: "spring" }}
            className="flex-1 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-dashed border-blue-400/50 rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* 3. Sleek Typography & Branding */}
      <div className="absolute bottom-20 flex flex-col items-center">
        <h1 className="text-3xl font-bold tracking-tight text-white/90 flex items-center gap-1">
          TechEra
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            X
          </span>
          <span className="text-blue-500 text-sm ml-1 font-mono"></span>
        </h1>

        {/* Dynamic Island style progress container */}
        <motion.div
          layout
          className="mt-6 flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md"
        >
          {/* Circular Spinner */}
          <svg
            className="w-4 h-4 text-blue-500 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              strokeWidth="3"
              stroke="currentColor"
              className="opacity-20"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M12 2v4m0 12v4M2 12h4m12 0h4"
              className="opacity-80"
            />
          </svg>

          <span className="text-xs font-medium text-white/70 w-36">
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

          {/* Minimal Percentage */}
          <span className="text-xs font-mono font-semibold text-blue-400 w-8 text-right">
            {progress}%
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
