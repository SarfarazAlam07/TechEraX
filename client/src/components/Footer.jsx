import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link Import kiya
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/logo.jpg";

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // --- DATA LINKS (Yahan se links control honge) ---
  const serviceLinks = [
    { name: "Web Development", path: "/services" },
    { name: "App Development", path: "/services" },
    { name: "UI/UX Design", path: "/services" },
    { name: "Digital Marketing", path: "/services" },
    { name: "SEO Optimization", path: "/services" },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Team", path: "/home" }, // Team section About page me hai
    { name: "Our Portfolio", path: "/portfolio" },
    { name: "Careers", path: "/contactus" }, // Currently redirecting to contact
    { name: "Blog", path: "/blog" },
  ];

  // --- REUSABLE ACCORDION SECTION ---
  const FooterSection = ({ title, links, id }) => {
    const isOpen = openSection === id;

    return (
      <div className="border-b border-white/10 md:border-none last:border-none">
        {/* Mobile Header (Button) */}
        <button
          onClick={() => toggleSection(id)}
          className="md:hidden w-full flex justify-between items-center py-4 px-4 mb-2 text-white font-bold text-base bg-white/5 hover:bg-white/10 rounded-xl transition-all text-left"
        >
          {title}
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Desktop Header (Static) */}
        <h3 className="hidden md:block text-white font-bold text-lg mb-5 cursor-default">
          {title}
        </h3>

        {/* Content Wrapper */}
        <div className="hidden md:block">
          <LinkList links={links} />
        </div>

        {/* Mobile Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-transparent px-4 pb-4"
            >
              <div className="pb-4 text-left">
                <LinkList links={links} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // --- LINK LIST COMPONENT (DRY Code) ---
  const LinkList = ({ links }) => (
    <ul className="space-y-3 text-sm">
      {links.map((item, index) => (
        <li key={index}>
          <Link
            to={item.path}
            className="hover:text-blue-400 transition-colors block py-1"
            onClick={() => window.scrollTo(0, 0)} // Click karne pe page top pe khulega
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="bg-black text-gray-400 border-t border-white/10 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-12 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* 1. BRAND SECTION */}
          <div className="flex flex-col items-start space-y-5 mb-6 md:mb-0">
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src={logo}
                alt="TechEraX Logo"
                className="h-10 w-10 rounded-full object-cover border border-gray-700 group-hover:border-blue-500 transition-colors"
              />
              <span className="text-2xl font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors">
                TechEraX
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs text-left">
              Building digital products, brands, and experiences for the modern
              world.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 p-2.5 rounded-full text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. SERVICES SECTION */}
          <FooterSection title="Services" id="services" links={serviceLinks} />

          {/* 3. COMPANY SECTION */}
          <FooterSection title="Company" id="company" links={companyLinks} />

          {/* 4. CONTACT SECTION */}
          <div className="border-b border-white/10 md:border-none last:border-none">
            {/* Contact Mobile Header */}
            <h3 className="md:hidden w-full py-4 text-white font-bold text-base text-left">
              Contact Us
            </h3>
            {/* Contact Desktop Header */}
            <h3 className="hidden md:block text-white font-bold text-lg mb-5 cursor-default">
              Contact
            </h3>

            <ul className="space-y-4 text-sm pb-4 md:pb-0">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                <span className="leading-relaxed">
                  Near Himalaya University,
                  <br />
                  Chiksi, Paliganj, Patna (801110)
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-blue-500 shrink-0 group-hover:text-white transition-colors" />
                <a
                  href="tel:+917277999901"
                  className="hover:text-white transition-colors"
                >
                  +91 727799-9901
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-blue-500 shrink-0 group-hover:text-white transition-colors" />
                <a
                  href="mailto:TechEraX@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  TechEraX@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} TechEraX. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="#"
              className="text-xs text-gray-600 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="#"
              className="text-xs text-gray-600 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              to="#"
              className="text-xs text-gray-600 hover:text-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
