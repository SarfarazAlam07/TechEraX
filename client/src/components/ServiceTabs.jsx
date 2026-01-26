import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, PenTool, Settings, ArrowRight, Smartphone, Megaphone} from "lucide-react";
import { Link } from "react-router-dom";

const ServiceTabs = () => {
  const [activeTab, setActiveTab] = useState("fullstack");

  const services = {
    fullstack: {
      title: "Complete digital systems from ground up",
      desc: "We build robust, scalable web applications using the MERN stack and Next.js. From database architecture to the pixel-perfect frontend, we handle it all.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      color: "bg-blue-600",
      icon: <Code2 className="w-6 h-6" />,
    },
    uiux: {
      title: "Design that users actually love to use",
      desc: "It's not just about looking good. We focus on user journeys, wireframing, and interactive prototypes to ensure high retention rates.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
      color: "bg-purple-600",
      icon: <PenTool className="w-6 h-6" />,
    },
    maintenance: {
      title: "Ongoing support & performance optimization",
      desc: "We don't leave you after launch. Our maintenance packages ensure your site stays fast, secure, and updated with the latest tech.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      color: "bg-green-600",
      icon: <Settings className="w-6 h-6" />,
    }, // <--- YAHAN COMMA (,) LAGANA ZARURI HAI

    // --- NAYA SERVICE 1: APP DEV ---
    appdev: {
      title: "Mobile Apps for iOS & Android",
      desc: "Expand your business to mobile. We build cross-platform apps using React Native and Flutter that perform seamlessly on all devices.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      color: "bg-orange-600",
      icon: <Smartphone className="w-6 h-6" />,
    }, // <--- YAHAN BHI COMMA

    // --- NAYA SERVICE 2: MARKETING ---
    marketing: {
      title: "SEO & Digital Growth Strategies",
      desc: "Building a site is half the battle. We help you rank on Google and run targeted ad campaigns to bring real customers to your platform.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      color: "bg-red-600",
      icon: <Megaphone className="w-6 h-6" />,
    },
  };

  return (
<section className="py-12 md:py-20 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* TAB BUTTONS (Scrollable on very small screens if needed) */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
          {Object.keys(services).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 border flex items-center gap-2 ${
                activeTab === key
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105"
                  : "bg-white text-slate-600 border-gray-200 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {services[key].icon}
              {/* Labels Logic */}
              <span className="hidden sm:inline">
                {key === "fullstack" ? "Full-Stack" : key === "uiux" ? "UI/UX" : "Support"}
              </span>
              <span className="sm:hidden capitalize">{key}</span>
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="bg-slate-50 rounded-3xl md:rounded-[2.5rem] p-6 md:p-16 border border-gray-100 shadow-xl overflow-hidden min-h-[auto] md:min-h-[500px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full"
            >
              
              {/* Text Side */}
              <div className="order-2 md:order-1 text-center md:text-left">
                <span className={`inline-block px-4 py-1 rounded-full text-white text-xs font-bold mb-4 md:mb-6 ${services[activeTab].color}`}>
                  {activeTab.toUpperCase()}
                </span>
                
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 md:mb-6 leading-tight">
                  {services[activeTab].title}
                </h2>
                
                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                  {services[activeTab].desc}
                </p>

                {/* Button Fix: Using Link directly as the button */}
                <Link 
                  to="/home#services" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-3 rounded-lg font-bold inline-flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 justify-center md:justify-start mx-auto md:mx-0"
                >
                  Explore Service <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Image Side */}
              <div className="relative order-1 md:order-2 flex justify-center">
                {/* Abstract Decoration */}
                <div className={`absolute -inset-4 rounded-full opacity-20 blur-2xl md:blur-3xl ${services[activeTab].color}`} />
                
                <img
                  src={services[activeTab].image}
                  alt={services[activeTab].title}
                  className="relative w-full max-w-[400px] md:max-w-full rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border-4 border-white transform rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-500 object-cover aspect-video md:aspect-auto"
                />
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServiceTabs;
