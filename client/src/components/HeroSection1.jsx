import React from 'react';
import { ArrowRight, Play } from 'lucide-react'; 

const HeroSection = () => {
  return (
    <div className="relative w-full bg-black text-white 
      
      
      
      overflow-hidden">
      
      {/* 1. Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/h.jpg" 
          alt="Tech City Background" 
          className="w-full h-full object-cover opacity-60 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-blue-900/20"></div>
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center max-w-7xl
        
        
        pt-31 md:pt-0 md:h-full">
        
        <div className="max-w-5xl space-y-7 md:space-y-10"> 
          
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold leading-tight animate-fade-in-up text-left mt-10" style={{ animationDelay: '0.1s' }}>
            From Websites to Apps:
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 block mt-2 md:mt-6 pb-2">
              Your Identity in the Digital Era,
            </span>
            Our Responsibility.
          </h1>

          {/* Paragraph */}
          <p className="text-gray-300 text-sm sm:text-lg md:text-xl max-w-2xl animate-fade-in-up text-left" style={{ animationDelay: '0.3s' }}>
            We don't just write code, we craft digital experiences. Transform your ideas into 
            stunning, operating platforms that drive business value.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-start gap-3 md:gap-4 pt-2 md:pt-6 animate-fade-in-up w-full" style={{ animationDelay: '0.5s' }}>
            
            {/* Mobile Button Size: px-5 py-3 (Thoda chota) | Desktop: px-8 py-4 */}
            <button className="group flex items-center gap-2 px-5 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.5)] text-sm md:text-base">
              Start Your Project
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="flex items-center gap-2 px-5 py-3 md:px-8 md:py-4 bg-transparent border border-white/30 hover:border-white hover:bg-white/10 text-white rounded-md font-semibold transition-all duration-300 backdrop-blur-sm text-sm md:text-base">
              <Play className="w-3 h-3 md:w-4 md:h-4 fill-current" />
              Learn More
            </button>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }
        .animate-fade-in-up {
          opacity: 0; /* Start hidden */
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;