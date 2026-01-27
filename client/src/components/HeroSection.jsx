// import React, { useState, useEffect } from "react";
// import { Phone } from "lucide-react";
// import { Link } from "react-router-dom";

// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Routes } from "react-router-dom";
// import ContactUs from "../Pages/ContactUs";
// // import { useNavigate } from 'react-router-dom';

// // ==========================================
// // STYLES & CONFIGURATION
// // ==========================================
// const color = {
//   background:
//     "linear-gradient(90deg, rgba(235, 244, 245, 1) 0%, rgba(181, 198, 224, 1) 100%)",
// };

// const gridOverlayStyle = {
//   backgroundImage:
//     "linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)",
//   backgroundSize: "50px 50px",
// };

// const words = ["Custom Website", "Mobile App", "Online Store", "Software"];

// // ==========================================
// // ROTATING TEXT (Desktop Fix: Height Increased)
// // ==========================================
// const RotatingText = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % words.length);
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     // FIX: 'h-[1.5em]' kiya (pehle 1.2em tha) taaki 'g', 'y' jaise letters kate nahi
//     <span className="block relative h-[1.5em] w-full text-teal-600  overflow-hidden">
//       <AnimatePresence mode="popLayout">
//         <motion.span
//           key={words[index]}
//           className="absolute left-0 top-1 w-full grid text-start " // top-1 thoda centering ke liye
//           initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
//           animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
//           exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
//           transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
//         >
//           {words[index]}
//         </motion.span>
//       </AnimatePresence>
//     </span>
//   );
// };

// // ==========================================
// // 3D BUTTON COMPONENT
// // ==========================================
// const ThreeDButton = ({ children, colorClass, onClick, buttonAnimate }) => {
//   return (
//     <motion.button
//       whileTap={{ scale: 0.97, y: 2 }}
//       whileHover={{ y: -2 }}
//       animate={buttonAnimate}
//       className={`relative z-10 flex flex-1 py-3 sm:py-4 px-4 rounded-xl font-semibold  items-center justify-center gap-2 text-sm min-[400px]:text-base text-white transition-all ${colorClass}`}
//       onClick={onClick}
//     >
//       {children}
//     </motion.button>
//   );
// };

// // ==========================================
// // ANIMATIONS
// // ==========================================
// const gridAnimateProp = {
//   backgroundPosition: ["0px 0px", "50px 50px"],
//   opacity: [1, 0.7, 1],
// };
// const gridTransitionProp = {
//   backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" },
//   opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
// };

// const subtleFloat = {
//   y: [0, -4, 0],
//   transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
// };

// // ==========================================
// // 1. MOBILE HERO SECTION (Already Fixed)
// // ==========================================
// const HeroMobile = () => {
//   const navigate = useNavigate();
//   //     const navigate = useNavigate();

//   //   const handleContactClick = () => {
//   //     // 1. Pehle Contact page par navigate karein
//   //     navigate('/contactus');

//   //     // 2. Thoda wait karein (100ms) taaki naya page load ho jaye
//   //     setTimeout(() => {
//   //       const section = document.getElementById('#contact-section');
//   //       if (section) {
//   //         section.scrollIntoView({ behavior: 'smooth' });
//   //       }
//   //     }, 100);
//   //   };
//   return (
//     <div
//       className="relative w-full h-[calc(100vh-70px)] flex flex-col px-4 py-4 overflow-y-auto overflow-x-hidden"
//       style={color}
//     >
//       <motion.div
//         className="absolute inset-0 pointer-events-none z-0 min-h-full"
//         style={gridOverlayStyle}
//         animate={gridAnimateProp}
//         transition={gridTransitionProp}
//       ></motion.div>

//       {/* Top Section */}
//       <div className="relative z-10 flex-shrink-0 flex flex-col justify-center aling-center w-full  pt-2">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-3xl pl-10 min-[400px]:text-4xl sm:text-[2.5rem] font-extrabold text-gray-900 leading-tight  tracking-tight w-full flex flex-col items-center justify-center"
//         >
//           <span className="block start w-full mb-1">Building Your </span>
//           <div className="grid  w-full mb-1">
//             <RotatingText />
//           </div>
//           <span className="block w-full text-start mb-1">to Grow Your</span>
//           <span className="block w-full text-start">Success.</span>
//         </motion.div>
//         {/* //onClick={handleContactClick} style={{ cursor: 'pointer' }} */}
//       </div>

//       {/* Bottom Section */}
//       <div className="relative z-10 flex-1 min-h-[15rem] w-full flex flex-col justify-end pb-1">
//         <div className="flex-1 w-full flex items-center justify-center overflow-hidden mb-2">
//           <motion.div
//             className="w-full h-max max-h-[20rem] flex items-center justify-center"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             <motion.div
//               // CHANGE 1: 'overflow-hidden' add kiya taaki kuch bahar na nikle
//               className="bg-[#FFF8F0] p-4 rounded-[50%] border border-orange-100 w-max h-[100%] shadow-xl flex items-center justify-center overflow-hidden"
//               animate={{ y: [0, -8, 0] }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             >
//               <img
//                 src="h-img.jpg"
//                 alt="Digital Experience"
//                 // CHANGE 2: 'rounded-lg' hata kar 'rounded-3xl' kar diya.
//                 // Ab image ke corners bhi waise hi gol honge jaise card ke hain.
//                 className="w-full h-full object-contain mix-blend-multiply rounded-[50%]"
//               />
//             </motion.div>
//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="w-full px-1 flex-shrink-0"
//         >
//           <div className="flex flex-row gap-3 items-center justify-center w-[90%]  m-3">
//             <ThreeDButton
//               colorClass="bg-gradient-to-r from-green-400 to-green-600 shadow-[0_4px_0_rgb(22,163,74)]"
//               buttonAnimate={subtleFloat}
//               onClick={() => (window.location.href = "tel:+917277999901")}
//             >
//               <Phone className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
//               <Link to="/ContactUs/#contact-section">call me </Link>
//             </ThreeDButton>

//             <ThreeDButton
//               colorClass="bg-orange-500 shadow-[0_4px_0_rgb(234,88,12)]"
//               onClick={() => navigate("/ContactUs")}
//             >
//               Contact Us
//             </ThreeDButton>
//           </div>
//           <p className="text-gray-700 text-sm min-[400px]:text-base leading-relaxed font-medium text-center">
//             Whether it's a small business, a growing startup, or your personal
//             portfolio, TechEraX builds world-class digital solutions tailored
//             just for you.
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // 2. DESKTOP HERO SECTION (Fixes applied)
// // ==========================================
// const HeroDesktop = () => {
//   const navigate = useNavigate();
//   return (
//     // FIX 1: 'min-h-screen' use kiya taaki content overflow na ho (scroll aa jaye agar screen choti ho)
//     // FIX 2: 'py-20' padding di taaki top/bottom se chipke nahi
//     <div className="w-full h-[calc(100vh-70px)] flex items-center justify-center px-12 bg-blue-50/50 overflow-hidden relative py-20">
//       <motion.div
//         className="absolute inset-0 pointer-events-none z-0"
//         style={gridOverlayStyle}
//         animate={gridAnimateProp}
//         transition={gridTransitionProp}
//       ></motion.div>

//       <div className="max-w-7xl w-full grid grid-cols-2 gap-12 items-center relative z-10 ">
//         {/* Left Side */}
//         <div className="space-y-8 flex flex-col items-start text-left">
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             // FIX 3: 'text-6xl lg:text-7xl' responsive font size
//             className="text-6xl lg:text-6xl font-bold text-gray-900 leading-tight w-full"
//           >
//             <span className="block mb-2">Building Your</span>
//             <span className="block mb-2  w-full">
//               {/* Rotating Text Container height increased in component above */}
//               <RotatingText />
//             </span>
//             <span className="block mb-2">to Grow Your</span>
//             <span className="block">Success.</span>
//           </motion.h1>

//           <div className="flex gap-5 max-w-md w-full">
//             <ThreeDButton
//               colorClass="bg-gradient-to-r from-green-400 to-green-600 shadow-[0_4px_0_rgb(22,163,74)]"
//               buttonAnimate={subtleFloat}
//               onClick={() => (window.location.href = "tel:+917277999901")}
//             >
//               <Phone className="w-5 h-5 fill-current" /> Call Now
//             </ThreeDButton>
//             <ThreeDButton
//               colorClass="bg-orange-500 shadow-[0_4px_0_rgb(234,88,12)]"
//               onClick={() => navigate("/ContactUs")}
//             >
//               Contact Us
//             </ThreeDButton>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="relative flex flex-col items-center justify-center pt-10">
//           <motion.div
//             className="max-w-[30rem] z-10 w-full"
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             <motion.div
//               className="bg-[#FFF8F0] p-2 rounded-3xl shadow-2xl border border-orange-100"
//               animate={{ y: [0, -20, 0] }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             >
//               <img
//                 src="/h-img.jpg"
//                 alt="Digital Experience"
//                 className="w-full h-auto rounded-xl mix-blend-multiply"
//               />
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//             className="mt-2 max-w-[24rem] w-full"
//           >
//             <p className="text-gray-700 text-base leading-relaxed font-medium text-left">
//               Whether it's a small business, a growing startup, or your personal
//               portfolio, TechEraX builds world-class digital solutions tailored
//               just for you.
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const HeroSection = () => {
//   return (
//     <section>
//       <div className="block md:hidden">
//         <HeroMobile />
//       </div>
//       <div className="hidden md:block">
//         <HeroDesktop />
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

//Starting Here

import React, { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="relative h-[1.6em] w-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          // CHANGE 1: Alignment Logic Updated
          // Mobile: justify-start (Left)
          // Tablet (md): justify-center (Center)
          // Desktop (lg): justify-start (Left)
          className="absolute inset-0 flex items-center justify-start md:justify-center lg:justify-start w-full text-teal-600"
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
// 1. HERO MOBILE (Text Left Aligned)
// ==========================================
const HeroMobile = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative w-full min-h-[calc(100vh-70px)] flex flex-col px-4 py-6 overflow-y-auto overflow-x-hidden"
      style={color}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 min-h-full"
        style={gridOverlayStyle}
        animate={gridAnimateProp}
        transition={gridTransitionProp}
      ></motion.div>

      {/* Top Text Section */}
      <div className="relative z-10 flex-shrink-0 flex flex-col items-start justify-center w-full mb-6 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // CHANGE 2: 'items-center text-center' -> 'items-start text-left'
          className="text-3xl min-[400px]:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight w-full flex flex-col items-start text-left gap-1"
        >
          {/* Static Text */}
          <span className="block w-full">Building Your</span>
          
          {/* Rotating Text Wrapper */}
          {/* CHANGE 3: justify-center -> justify-start */}
          <div className="w-full flex justify-start">
            <RotatingText />
          </div>
          
          {/* Static Text */}
          <span className="block w-full">to Grow Your</span>
          <span className="block w-full">Success.</span>
        </motion.div>
      </div>

      {/* Bottom Image & Buttons Section (Kept Centered as requested) */}
      <div className="relative z-10 flex-1 w-full flex flex-col justify-end items-center gap-6">
        
        {/* Image Circle */}
        <motion.div
          className="w-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="bg-[#FFF8F0] p-4 rounded-full border border-orange-100 shadow-xl w-[280px] h-[280px] flex items-center justify-center overflow-hidden"
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

        {/* Buttons & Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-md"
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
    </div>
  );
};

// ==========================================
// 2. HERO DESKTOP (No Changes made here)
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
