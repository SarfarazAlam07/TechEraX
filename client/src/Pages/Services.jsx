import React from 'react';

// Components Import
import ServiceHeader from '../components/ServiceHeader';
import ServiceTabs from '../components/ServiceTabs'; // Features List
import TechStack from '../components/TechStack'; // Logo List
import ProcessFlow from '../components/ProcessFlow'; // How It Works
import CTASection from '../components/CTASection'; // Reuse CTA

const Services = () => {
  return (
    <div className="bg-white pt-[70px]">
      
      <ServiceHeader />
      <ServiceTabs />
      <TechStack />
      <ProcessFlow />
      
      {/* Services page ke end mein bhi CTA hona chahiye */}
      <CTASection />

    </div>
  );
};

export default Services;