import React from 'react';

// Importing all separated components
import AboutHero from '../components/AboutHero';
import AboutStats from '../components/AboutStats';
import AboutStory from '../components/AboutStory';
import AboutValues from '../components/AboutValues';
import AboutFAQ from '../components/AboutFAQ';
// import CTASection from '../components/CTASection'; // Reused CTA
import SEO from '../components/SEO';
import TeamSection from '../components/TeamSection';

const About = () => {
  return (
    <div className="bg-white"> {/* pt for navbar */}
      <SEO 
        title="About Us - Leading Tech Agency"
        description="Learn about TechEraX, a team of passionate developers in Paliganj, Patna dedicated to building the future of technology."
        url="/about"
      />
      <AboutHero />
      <AboutStats />
      <TeamSection/>
      <AboutStory />
      <AboutValues />
      <AboutFAQ />
      {/* <CTASection /> */}

    </div>
  );
};

export default About;
