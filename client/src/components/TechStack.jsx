import React from 'react';

const TechStack = () => {
  // Ordered by Importance & Category Mix
  const logos = [
    "React", "Next.js", "Node.js", "React Native", "AWS",
    "TypeScript", "Tailwind", "MongoDB", "PostgreSQL", "Docker",
    "Python", "Flutter", "Firebase", "Figma", "Google Cloud", 
    "Express.js", "Redux", "Vercel", "GraphQL", "MySQL" 
  ];

  return (
    <section className="py-16 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto text-center mb-10 px-4">
        <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">
            Our Technology Stack
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Powering your business with modern tech
        </h2>
      </div>

      {/* Infinite Scroll Wrapper */}
      <div className="relative flex overflow-x-hidden group py-6">
        
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* --- MARQUEE TRACK --- */}
        {/* Logic: Hum list ko 2 baar render karenge aur -50% tak move karenge */}
        <div className="animate-marquee whitespace-nowrap flex gap-12 md:gap-20 items-center w-max hover:[animation-play-state:paused]">
          
          {/* Loop 1 */}
          {logos.map((logo, index) => (
            <span key={index} className="text-2xl md:text-4xl font-bold text-slate-300 hover:text-blue-600 transition-colors cursor-default select-none">
              {logo}
            </span>
          ))}
          
          {/* Loop 2 */}
          {logos.map((logo, index) => (
            <span key={`dup-${index}`} className="text-2xl md:text-4xl font-bold text-slate-300 hover:text-blue-600 transition-colors cursor-default select-none">
              {logo}
            </span>
          ))}

        </div>
      </div>

      {/* Custom CSS for Seamless Animation */}
      <style>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* -50% pe reset hoga to seamless lagega */
        }

        /* Mobile par thoda fast rakh sakte hain */
        @media (max-width: 768px) {
            .animate-marquee {
                animation-duration: 25s;
                gap: 2rem; /* Mobile pe gap kam */
            }
        }
      `}</style>
    </section>
  );
};

export default TechStack;