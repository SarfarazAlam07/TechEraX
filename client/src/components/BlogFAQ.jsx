import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const BlogFAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer: "A standard corporate website typically takes 2-4 weeks. More complex platforms with custom backend logic can take 8-12 weeks depending on features."
    },
    {
      question: "Do you offer website maintenance?",
      answer: "Yes, we have monthly maintenance packages that cover security updates, content changes, and performance optimization."
    },
    {
      question: "What technologies do you use?",
      answer: "We primarily use the MERN stack (MongoDB, Express, React, Node.js) and Next.js for high-performance web applications."
    },
    {
      question: "Will my website be mobile-friendly?",
      answer: "Absolutely. All our designs are 'Mobile-First', ensuring they look and function perfectly on phones, tablets, and desktops."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Common Questions</h2>
          <p className="text-slate-500 mt-2">Everything you need to know before starting.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-400 rounded-xl overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 hover:text-black transition-colors"
              >
                <span className="font-semibold  text-lg">{faq.question}</span>
                {activeAccordion === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  activeAccordion === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-gray-50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogFAQ;