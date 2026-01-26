import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom"; 
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [desktopDropdown, setDesktopDropdown] = useState(false); 

  const location = useLocation();

  const navLinkClasses = ({ isActive }) =>
    `transition ${isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600"}`;

  const isResourceActive = location.pathname.includes("/blog");

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
      <div className="hidden md:flex items-center gap-8 font-medium">
        {" "}
        {/* Parent se fixed color hataya */}
        <NavLink to="/home" className={navLinkClasses}>
          Home
        </NavLink>
        <NavLink to="/about" className={navLinkClasses}>
          About us
        </NavLink>
        <NavLink to="/services" className={navLinkClasses}>
          Services
        </NavLink>
        <NavLink to="/portfolio" className={navLinkClasses}>
          Portfolio
        </NavLink>
        {/* RESOURCE DROPDOWN (Desktop) */}
        <div
          className="relative group"
          onMouseEnter={() => setDesktopDropdown(true)}
          onMouseLeave={() => setDesktopDropdown(false)}
        >
          {/* Active logic: Agar resource active hai to blue, warna gray */}
          <div
            className={`flex items-center gap-1 cursor-pointer transition py-4 ${isResourceActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600"}`}
          >
            <span>Resources</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${desktopDropdown ? "rotate-180" : ""}`}
            />
          </div>

          {/* Dropdown Box */}
          <div
            className={`absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform origin-top ${desktopDropdown ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
          >
            <div className="flex flex-col py-2">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `px-5 py-3 transition text-sm font-medium ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 hover:text-blue-600 text-gray-600"}`
                }
              >
                Our Blog
              </NavLink>
              <NavLink
                to="/contactus"
                className={({ isActive }) =>
                  `px-5 py-3 transition text-sm font-medium ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 hover:text-blue-600 text-gray-600"}`
                }
              >
                Contact Support
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3D CONTACT BUTTON (Desktop CTA) --- */}
      <Link to="/contactus">
        <button
          className="hidden md:block px-6 py-2 bg-orange-500 text-white font-bold rounded-full transition-all duration-100 
          shadow-[0_4px_0_rgb(194,65,12)] 
          hover:shadow-[0_4px_0_rgb(154,52,18)] hover:bg-orange-600 
          active:shadow-none active:translate-y-[4px]"
        >
          Contact Us
        </button>
      </Link>

      {/* --- MOBILE HAMBURGER BUTTON --- */}
      <button
        className="md:hidden p-2 bg-transparent text-gray-800 hover:text-blue-600 transition-all duration-300 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </div>
      </button>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white shadow-xl flex flex-col items-center py-8 space-y-6 md:hidden border-t animate-in slide-in-from-top-5 h-screen">
          <NavLink
            to="/home"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? "text-blue-600" : "text-gray-800"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? "text-blue-600" : "text-gray-800"}`
            }
          >
            About us
          </NavLink>

          <NavLink
            to="/services"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? "text-blue-600" : "text-gray-800"}`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/portfolio"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? "text-blue-600" : "text-gray-800"}`
            }
          >
            Portfolio
          </NavLink>

          <NavLink
            to="/contactus"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? "text-blue-600" : "text-gray-800"}`
            }
          >
            ContactUs
          </NavLink>

          <NavLink
            to="/blog"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? "text-blue-600" : "text-gray-800"}`
            }
          >
            Our Blog
          </NavLink>

          {/* Mobile CTA Button */}
          <Link to="/contactus" onClick={() => setIsOpen(false)}>
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
