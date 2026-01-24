import React from 'react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const ProcessFlow = () => {
  const steps = [
    { icon: Search, title: "Discovery", desc: "We analyze your goals and market." },
    { icon: PenTool, title: "Design", desc: "Creating the visual blueprint." },
    { icon: Code, title: "Development", desc: "Coding robust and scalable solutions." },
    { icon: Rocket, title: "Launch", desc: "Deploying to the world." }
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-slate-400">From concept to reality in 4 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-700 -z-10 transform scale-x-90" />

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center group"
            >
              <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-900 group-hover:border-blue-500 transition-colors duration-300 mb-6 relative z-10">
                <step.icon className="w-10 h-10 text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;