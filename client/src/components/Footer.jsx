import React from 'react';
import { 
  Facebook, Twitter, Instagram, Linkedin, 
  Mail, MapPin, Phone 
} from 'lucide-react';
import logo from '/logo.jpg'; 

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 px-6 md:px-12 border-t border-slate-800 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 mb-10">
          
          {/* BRAND & LOGO */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="TechEraX Logo" 
                className="h-12 w-12 rounded-full object-cover border-2 border-slate-700"
              />
              {/* 👇 YAHAN CHANGE KIYA HAI: 'text-shine-light' */}
              <span className="text-2xl font-bold text-shine-light">
                TechEraX
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Crafting digital experiences that merge creativity with technology.
            </p>
            
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="bg-slate-900 p-2 rounded-full text-slate-400 hover:bg-blue-600 hover:text-white transition-all border border-slate-800"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div className="col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              {['Web Dev', 'Mobile Apps', 'UI/UX Design', 'Cloud'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div className="col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              {['About Us', 'Our Team', 'Careers', 'Privacy'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <span>123 Innovation Dr,<br />Tech City, TC 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>hello@techerax.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} TechEraX. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Designed for the Future.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;