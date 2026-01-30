import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ Import Link
import {
  Smartphone,
  Monitor,
  Globe,
  ShoppingCart,
  Server,
  ShieldCheck,
  ArrowRight,
  Code2,
  Database,
  Cloud,
  PenTool,
  Megaphone,
} from "lucide-react";
import { useData } from "../context/DataContext";
import Loader from "./Loader";

const iconMap = {
  Monitor, Smartphone, ShoppingCart, Globe, Server, ShieldCheck,
  Code2, Database, Cloud, PenTool, Megaphone,
};

const ServicesSection = () => {
  const { services, loading } = useData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (loading) return <Loader />;

  return (
    <section
      id="services"
      className="py-20 px-6 md:px-12 relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Our Expertise
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
            Services We Offer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Combining creativity and technology to deliver outstanding results.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services?.map((service) => {
            const IconComponent = iconMap[service.icon] || Code2;
            return (
              <motion.div
                key={service._id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer flex flex-col overflow-hidden h-full"
                whileHover={{ y: -8 }}
              >
                {/* IMAGE SECTION */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                  
                  {/* ✅ Image Fix: Using <img> tag correctly */}
                  <img 
                    src={service.image || "https://via.placeholder.com/400x300?text=Service"}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => e.target.src = "https://via.placeholder.com/400x300?text=Error"}
                  />

                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg group-hover:bg-blue-600 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>
                  
                  {/* ✅ Change: 'div' changed to 'Link' so it's clickable */}
                  <Link 
                    to={service.link || "#"} 
                    className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all mt-auto w-fit cursor-pointer"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
