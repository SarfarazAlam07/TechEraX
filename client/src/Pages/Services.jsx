import React from 'react';

// Components Import
import ServiceHeader from '../components/ServiceHeader';
import ServiceTabs from '../components/ServiceTabs'; // Features List
import TechStack from '../components/TechStack'; // Logo List
import ProcessFlow from '../components/ProcessFlow'; // How It Works
// import CTASection from '../components/CTASection'; // Reuse CTA
import SEO from '../components/SEO';
import IndustriesWeServe from '../components/IndustriesWeServe';
const Services = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="Web & App Development Services"
        description="We offer Full Stack Development, UI/UX Design, and Cloud Solutions. Best IT services in Bihar at affordable rates."
        keywords="Website Design Service, Android App Development, UI/UX Design Patna, Custom Software, TechEraX Services"
        url="/services"
      />
      <ServiceHeader />
      <ServiceTabs />
      <TechStack />
      <IndustriesWeServe/>
      <ProcessFlow />
      
      {/* Services page ke end mein bhi CTA hona chahiye */}
      {/* <CTASection /> */}

    </div>
  );
};

export default Services;
