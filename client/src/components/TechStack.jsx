import React from 'react';

const TechStack = () => {
  const logos = [
    "React", "Node.js", "Python", "AWS", "Docker", "Next.js", 
    "Tailwind", "Firebase", "MongoDB", "TypeScript"
  ];

  return (
    <section className="py-16 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <p className="text-gray-500 font-medium">Powering businesses with modern technology</p>
      </div>

      {/* Infinite Scroll Wrapper */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
          {/* Loop 1 */}
          {logos.map((logo, index) => (
            <span key={index} className="text-3xl font-bold text-slate-300 hover:text-blue-600 transition-colors cursor-default">
              {logo}
            </span>
          ))}
          {/* Loop 2 (Seamless ke liye duplicate) */}
          {logos.map((logo, index) => (
            <span key={`dup-${index}`} className="text-3xl font-bold text-slate-300 hover:text-blue-600 transition-colors cursor-default">
              {logo}
            </span>
          ))}
          {/* Loop 3 (Extra safety) */}
          {logos.map((logo, index) => (
            <span key={`dup2-${index}`} className="text-3xl font-bold text-slate-300 hover:text-blue-600 transition-colors cursor-default">
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* Tailwind config mein animation add karna padega, ya inline style use karein */}
      <style>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
};

export default TechStack;