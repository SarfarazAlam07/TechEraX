import React from 'react';

// Importing all separated components
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import TeamSection from '../components/TeamSection';
import CTASection from '../components/CTASection'; 
import TestimonialSection from '../components/TestimonialSection';
import SEO from '../components/SEO';
// Reused CTA

const Home = () => {
  return (
    <div className="bg-white"> {/* pt for navbar */}
      <SEO 
        title="TechEraX || Best Software Development Company in Patna"
        description="TechEraX provides top-notch Web Development, Mobile Apps, and Digital Marketing services in Patna, Bihar. Transform your business with us."
        keywords="Web Development Patna, Software Company Bihar, App Developers Paliganj, TechEraX, MERN Stack Agency"
        url="/"
      />
      <HeroSection />
//     <ServicesSection />
//     <TeamSection />
//     <CTASection />
//     <TestimonialSection />

    </div>
  );
};

export default Home;