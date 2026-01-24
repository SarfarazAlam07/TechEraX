import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users } from 'lucide-react';

const AboutValues = () => {
  return (
    <section className="py-20 bg-slate-900 text-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            The principles that guide every decision we make.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Lightbulb, title: "Innovation", desc: "We constantly push boundaries to find new solutions." },
            { icon: Target, title: "Precision", desc: "Attention to detail is not optional, it's our standard." },
            { icon: Users, title: "Collaboration", desc: "We work with you, not just for you." }
          ].map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors"
            >
              <div className="bg-slate-900 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <card.icon className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;