import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
// upar jo eslint-disable wala likha Yeh comment ESLint ko batata hai ki yeh line pe no-unused-vars rule apply na kare, kyunki motion JSX mein use ho raha hai (jaise <motion.div>), par ESLint kabhi kabhi JSX ko recognize nahi karta.
// ==========================================
// STYLES & CONFIGURATION
// ==========================================
const color = {
  background:
    "linear-gradient(90deg, rgba(235, 244, 245, 1) 0%, rgba(181, 198, 224, 1) 100%)",
};

const gridOverlayStyle = {
  backgroundImage:
    "linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)",
  backgroundSize: "50px 50px",
};

const words = ["Custom Website", "Mobile App", "Online Store", "Software"];

// ==========================================
// ROTATING TEXT COMPONENT
// ==========================================
const RotatingText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    // Height updated to 1.2em so it scales with the huge mobile font
    <div className="relative h-[1.2em] w-full overflow-hidden translate-y-1">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          // Mobile: Left Align | Tablet: Center | Desktop: Left
          className="absolute inset-0 flex items-center justify-start md:justify-center lg:justify-start w-full text-teal-600 font-extrabold"
          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 3D BUTTON COMPONENT
// ==========================================
const ThreeDButton = ({ children, colorClass, onClick, buttonAnimate }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97, y: 2 }}
      whileHover={{ y: -2 }}
      animate={buttonAnimate}
      className={`relative z-10 flex flex-1 py-3 sm:py-4 px-4 rounded-xl font-semibold items-center justify-center gap-2 text-sm min-[400px]:text-base text-white transition-all ${colorClass}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// ==========================================
// ANIMATIONS
// ==========================================
const gridAnimateProp = {
  backgroundPosition: ["0px 0px", "50px 50px"],
  opacity: [1, 0.7, 1],
};
const gridTransitionProp = {
  backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" },
  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
};

const subtleFloat = {
  y: [0, -4, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
};

// ==========================================
// 1. HERO MOBILE (UPDATED: Bigger Text & Image)
// ==========================================
const HeroMobile = () => {
  const navigate = useNavigate();
  return (
    <div
      // Layout Fix: 'justify-between' spreads content vertically to fill space
      className="relative w-full h-[calc(100vh-70px)] flex flex-col justify-between px-5 py-6 overflow-hidden"
      style={color}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 min-h-full"
        style={gridOverlayStyle}
        animate={gridAnimateProp}
        transition={gridTransitionProp}
      ></motion.div>

      {/* --- TOP: TEXT SECTION --- */}
      <div className="relative z-10 w-full mt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // TEXT SIZE FIX: text-[10vw] makes it huge on mobile to fill width
          className="text-[10vw] sm:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight w-full flex flex-col items-start text-left"
        >
          <span className="block w-full">Building Your</span>
          
          {/* Rotating Text Wrapper */}
          <div className="w-full flex justify-start my-1">
            <RotatingText />
          </div>
          
          <span className="block w-full">to Grow Your</span>
          <span className="block w-full">Success.</span>
        </motion.div>
      </div>

      {/* --- MIDDLE: IMAGE SECTION --- */}
      {/* flex-grow pushes buttons down and keeps image in center of remaining space */}
      <div className="relative z-10 flex-grow flex items-center justify-center w-full py-2">
        <motion.div
          className="w-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            // IMAGE SIZE FIX: w-[85vw] ensures it covers 85% of screen width
            // aspect-square keeps it circular
            className="bg-[#FFF8F0] p-4 rounded-full border border-orange-100 shadow-xl w-[85vw] max-w-[380px] aspect-square flex items-center justify-center overflow-hidden"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="h-img.jpg"
              alt="Digital Experience"
              className="w-full h-full object-contain mix-blend-multiply rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* --- BOTTOM: BUTTONS --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 w-full flex-shrink-0 pb-2"
      >
        <div className="flex flex-row gap-4 mb-4">
          <ThreeDButton
            colorClass="bg-gradient-to-r from-green-400 to-green-600 shadow-[0_4px_0_rgb(22,163,74)]"
            buttonAnimate={subtleFloat}
            onClick={() => (window.location.href = "tel:+917277999901")}
          >
            <Phone className="w-5 h-5 fill-current" />
            Call Me
          </ThreeDButton>

          <ThreeDButton
            colorClass="bg-orange-500 shadow-[0_4px_0_rgb(234,88,12)]"
            onClick={() => navigate("/ContactUs")}
          >
            Contact Us
          </ThreeDButton>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed font-medium text-center px-2">
          Whether it's a small business, a growing startup, or your personal
          portfolio, TechEraX builds world-class digital solutions tailored
          just for you.
        </p>
      </motion.div>
    </div>
  );
};

// ==========================================
// 2. HERO DESKTOP (Unchanged - Tablet Optimized)
// ==========================================
const HeroDesktop = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[calc(100vh-70px)] flex items-center justify-center px-6 lg:px-12 bg-blue-50/50 overflow-hidden relative py-12 lg:py-20">
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={gridOverlayStyle}
        animate={gridAnimateProp}
        transition={gridTransitionProp}
      ></motion.div>

      <div className="max-w-7xl w-full flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
        
        {/* LEFT SIDE (TEXT) */}
        <div className="space-y-6 lg:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight w-full"
          >
            <span className="block mb-2">Building Your</span>
            
            {/* Rotating Text Wrapper */}
            <div className="w-full flex justify-center lg:justify-start mb-2">
               <RotatingText />
            </div>

            <span className="block mb-2">to Grow Your</span>
            <span className="block">Success.</span>
          </motion.h1>

          <div className="flex gap-5 max-w-md w-full justify-center lg:justify-start">
            <ThreeDButton
              colorClass="bg-gradient-to-r from-green-400 to-green-600 shadow-[0_4px_0_rgb(22,163,74)]"
              buttonAnimate={subtleFloat}
              onClick={() => (window.location.href = "tel:+917277999901")}
            >
              <Phone className="w-5 h-5 fill-current" /> Call Now
            </ThreeDButton>
            <ThreeDButton
              colorClass="bg-orange-500 shadow-[0_4px_0_rgb(234,88,12)]"
              onClick={() => navigate("/ContactUs")}
            >
              Contact Us
            </ThreeDButton>
          </div>
        </div>

        {/* RIGHT SIDE (IMAGE) */}
        <div className="relative flex flex-col items-center justify-center pt-6 lg:pt-10 w-full">
          <motion.div
            className="max-w-[24rem] lg:max-w-[30rem] z-10 w-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="bg-[#FFF8F0] p-2 rounded-3xl shadow-2xl border border-orange-100"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/h-img.jpg"
                alt="Digital Experience"
                className="w-full h-auto rounded-xl mix-blend-multiply"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 lg:mt-2 max-w-[28rem] lg:max-w-[24rem] w-full"
          >
            <p className="text-gray-700 text-base lg:text-base leading-relaxed font-medium text-center lg:text-left">
              Whether it's a small business, a growing startup, or your personal
              portfolio, TechEraX builds world-class digital solutions tailored
              just for you.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section>
      <div className="block md:hidden">
        <HeroMobile />
      </div>
      <div className="hidden md:block">
        <HeroDesktop />
      </div>
    </section>
  );
};

export default HeroSection;
