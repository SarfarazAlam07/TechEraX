import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

const AboutStory = () => {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Image Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-2xl transform translate-x-4 translate-y-4 -z-10" />
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
            alt="Team Collaboration" 
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </motion.div>

        {/* Text Side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Not just an agency, <br />
            <span className="text-blue-600">we are your partners.</span>
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Founded in 2020, TechEraX started with a simple mission: to make high-quality technology accessible to ambitious brands. We believe that every pixel matters and every line of code should serve a purpose.
          </p>
          
          <div className="space-y-4">
            {[
              "Client-Centric Approach",
              "Transparent Communication",
              "Future-Ready Tech Stack"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <button className="mt-8 flex items-center gap-2 bg-white  border-2 border-gray-500 text-blue-600 font-bold hover:gap-3 transition-all">
            Read our full story <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStory;