import React from 'react';

// Importing all separated components
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import TeamSection from '../components/TeamSection';
import CTASection from '../components/CTASection'; 
import TestimonialSection from '../components/TestimonialSection';
// Reused CTA

const Home = () => {
  return (
    <div className="bg-white"> {/* pt for navbar */}
      
      <HeroSection />
//     <ServicesSection />
//     <TeamSection />
//     <CTASection />
//     <TestimonialSection />

    </div>
  );
};

export default Home;