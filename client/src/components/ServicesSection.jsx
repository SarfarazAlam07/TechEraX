import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { 
  Smartphone, Monitor, Globe, ShoppingCart, 
  Server, ShieldCheck, ArrowRight, Code2, Database, Cloud 
} from 'lucide-react';

const iconMap = {
  Monitor: Monitor,
  Smartphone: Smartphone,
  ShoppingCart: ShoppingCart,
  Globe: Globe,
  Server: Server,
  ShieldCheck: ShieldCheck,
  Code2: Code2,
  Database: Database,
  Cloud: Cloud,
};

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const dummyDatabaseData = [
          {
            id: 1,
            iconName: "Monitor",
            title: "Web Development",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80", 
            description: "Custom websites tailored to your brand needs using React and Tailwind.",
          },
          {
            id: 2,
            iconName: "Smartphone",
            title: "App Development",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
            description: "Native and cross-platform mobile apps for iOS and Android.",
          },
          {
            id: 3,
            iconName: "ShoppingCart",
            title: "E-Commerce",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80",
            description: "Scalable online stores with secure payment gateways.",
          },
          {
            id: 4,
            iconName: "Globe",
            title: "Digital Marketing",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            description: "Boost your online presence with SEO and content strategy.",
          },
          {
            id: 5,
            iconName: "Server",
            title: "Cloud Services",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
            description: "Secure and reliable cloud hosting and infrastructure.",
          },
          {
            id: 6,
            iconName: "ShieldCheck",
            title: "Cyber Security",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
            description: "Protect your digital assets with advanced security audits.",
          }
        ];

        setTimeout(() => {
          setServices(dummyDatabaseData);
          setLoading(false);
        }, 1000);

      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  if (loading) return <div className="py-20 text-center bg-gray-100">Loading services...</div>;

  return (
    // Grid hata diya. Ab bas smooth gradient hai.
    <section 
      id="services" 
      className="py-20 px-6 md:px-12 relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50"
    >
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Expertise</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Services We Offer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Combining creativity and technology to deliver outstanding results.
          </p>
        </motion.div>

        {/* Card Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Code2;

            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                // yaha se card ka color change kar sakte hai
                className="bg-blue-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer flex flex-col overflow-hidden h-full"
                whileHover={{ y: -8 }}
              >
                
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Icon Top-Left */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg group-hover:bg-blue-600 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all mt-auto">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
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