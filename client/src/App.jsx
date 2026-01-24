import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Sections (Home Page ke liye)
// import HeroSection from './components/HeroSection';
// import ServicesSection from './components/ServicesSection';
// import TeamSection from './components/TeamSection';
// import CTASection from './components/CTASection';
// import TestimonialSection from './components/TestimonialSection';


// Pages
import Home from './Pages/Home';
import About from './Pages/About'; 
import Services from './Pages/Services'
import Portfolio from './Pages/Portfolio'
import ContactUs from './Pages/ContactUs';
import Blog from './Pages/Blog';
import ScrollToTop from './components/ScrollToTop';


function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen font-sans">
        <ScrollToTop/>
        
        {/* Navbar Hamesha dikhega */}
        <Navbar />

        {/* Routes Decide karenge ki beech mein kya dikhana hai */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="/blog" element={<Blog />} />
          
        </Routes>

        {/* Footer Hamesha dikhega */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;