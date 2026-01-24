import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ContactFAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "What is your typical response time?",
      answer: "We usually reply within 2 hours during business hours (Mon-Fri). For weekends, expect a reply by Monday morning."
    },
    {
      question: "Can we sign a NDA before sharing details?",
      answer: "Absolutely. We respect your intellectual property and are happy to sign a Non-Disclosure Agreement before discussing sensitive details."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes! The first 30-minute discovery call is completely free. It helps us understand if we are the right fit for your project."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-slate-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-700 mb-8">Before you reach out...</h2>
        
        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200  rounded-xl overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center py-4 hover:text-black hover:bg-gray-200  transition-colors "
              >
                <span className="font-semibold ">{faq.question}</span>
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
                <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed">
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

export default ContactFAQ;