import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'; 
import logo from '/logo.jpg'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu State
  const [desktopDropdown, setDesktopDropdown] = useState(false); // Desktop Hover State

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md py-3 px-6 md:px-12 flex justify-between items-center shadow-sm sticky top-0 z-50 h-[70px]">
      
      {/* --- LOGO SECTION --- */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <img 
            src={logo} 
            alt="TechEraX Logo" 
            className="h-10 w-10 md:h-14 md:w-14 rounded-full object-cover border border-gray-200" 
        />
        <span className="text-xl md:text-3xl font-bold text-shine">
          TechEraX
        </span>
      </Link>

      {/* --- DESKTOP MENU --- */}
      <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
        <Link to="/home" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/about" className="hover:text-blue-600 transition">About us</Link>        
        <Link to="/services" className="hover:text-blue-600 transition">Services</Link>
        <Link to="/portfolio" className="hover:text-blue-600 transition">Portfolio</Link>
        
        
        {/* RESOURCE DROPDOWN (Desktop) */}
        <div 
          className="relative group"
          onMouseEnter={() => setDesktopDropdown(true)}
          onMouseLeave={() => setDesktopDropdown(false)}
        >
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition py-4">
            <span>Resources</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${desktopDropdown ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Box */}
          <div className={`absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform origin-top ${desktopDropdown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
            <div className="flex flex-col py-2">
              <Link to="/blog" className="px-5 py-3 hover:bg-gray-50 hover:text-blue-600 transition text-sm font-medium">
                Our Blog
              </Link>
              <Link to="/contactus" className="px-5 py-3 hover:bg-gray-50 hover:text-blue-600 transition text-sm font-medium">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3D CONTACT BUTTON (Desktop CTA) --- */}
      <Link to="/contactus">
        <button className="hidden md:block px-6 py-2 bg-orange-500 text-white font-bold rounded-full transition-all duration-100 
          shadow-[0_4px_0_rgb(194,65,12)] 
          hover:shadow-[0_4px_0_rgb(154,52,18)] hover:bg-orange-600 
          active:shadow-none active:translate-y-[4px]">
          Contact Us
        </button>
      </Link>

      {/* --- MOBILE HAMBURGER BUTTON --- */}
      <button 
        className="md:hidden p-2 bg-transparent text-gray-800 hover:text-blue-600 transition-all duration-300 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </div>
      </button>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-xl flex flex-col items-center py-8 space-y-6 md:hidden border-t animate-in slide-in-from-top-5 h-screen">
          <Link to="/home" className="text-lg font-medium text-gray-800" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="text-lg font-medium text-gray-800" onClick={() => setIsOpen(false)}>About us</Link>
          <Link to="/services" className="text-lg font-medium text-gray-800" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/portfolio" className="text-lg font-medium text-gray-800" onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link to="/contactus" className="text-lg font-medium text-gray-800" onClick={() => setIsOpen(false)}>ContactUs</Link>
          <Link to="/blog" className="text-lg font-medium text-gray-800" onClick={() => setIsOpen(false)}>Our Blog</Link>


          {/* Mobile Resources Accordion */}
          

          {/* Mobile CTA Button */}
          <Link to="/contact" onClick={() => setIsOpen(false)}>
             <button className="mt-4 px-8 py-3 bg-orange-500 text-white font-bold rounded-full shadow-md">
                Contact Us
             </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;