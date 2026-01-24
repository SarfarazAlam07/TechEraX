import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AboutFAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "What makes TechEraX different?",
      answer: "We don't just write code; we build digital ecosystems. Our approach combines data-driven strategy with high-end aesthetics."
    },
    {
      question: "How do you handle project timelines?",
      answer: "We use Agile methodology with weekly sprints, ensuring you are always updated and we hit every milestone on time."
    },
    {
      question: "Do you provide post-launch support?",
      answer: "Absolutely! We offer 30 days of free support after launch and have dedicated maintenance packages for long-term peace of mind."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto bg-white">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
            <button 
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <span className="font-semibold text-slate-900 text-lg">{faq.question}</span>
              {activeAccordion === index ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                activeAccordion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 text-slate-600 leading-relaxed bg-white">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutFAQ;