import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

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
            image:
              "https://rankfame.com/wp-content/uploads/2022/07/Web-Development-Company-Names.webp",
            description:
              "Custom websites tailored to your brand needs using React and Tailwind.",
            url: "https://developer.ibm.com/technologies/web-development/articles/",
          },
          {
            id: 2,
            iconName: "Smartphone",
            title: "App Development",
            image:
              "https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg",
            description:
              "Native and cross-platform mobile apps for iOS and Android.",
            url: "https://developer.ibm.com/technologies/mobile/articles/",
          },
          {
            id: 3,
            iconName: "ShoppingCart",
            title: "E-Commerce",
            image:
              "https://okcredit-blog-images-prod.storage.googleapis.com/2021/04/ecommerce3-2.jpg",
            description: "Scalable online stores with secure payment gateways.",
            url: "https://www.forbes.com/sites/johnhall/2025/06/29/how-the-e-commerce-industry-is-changing-and-what-companies-are-doing-to-succeed/",
          },
          {
            id: 4,
            iconName: "Globe",
            title: "Digital Marketing",
            image:
              "https://static.vecteezy.com/system/resources/thumbnails/002/411/326/small_2x/online-digital-marketing-strategy-and-business-analysis-plan-business-concept-free-photo.jpg",
            description:
              "Boost your online presence with SEO and content strategy.",
            url: "https://www.forbes.com/advisor/business/what-is-digital-marketing/",
          },
          {
            id: 5,
            iconName: "Server",
            title: "Cloud Services",
            image:
              "https://www.pcrbusiness.com/wp-content/uploads/2020/10/Cloud-computing_October2.jpg",
            description:
              "Secure and reliable cloud hosting and infrastructure.",
            url: "https://www.techtarget.com/searchcloudcomputing/definition/cloud-server",
          },
          {
            id: 6,
            iconName: "ShieldCheck",
            title: "Cyber Security",
            image:
              "https://img.freepik.com/premium-photo/professional-cybersecurity-background-linkedin-page_1273271-14865.jpg?w=740",
            description:
              "Protect your digital assets with advanced security audits.",
            url: "https://thehackernews.com/",
          },
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
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (loading)
    return (
      <div className="py-20 text-center bg-gray-100">Loading services...</div>
    );

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

                  <a
                    href={service.url}
                    className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all mt-auto w-fit cursor-pointer"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </a>
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
