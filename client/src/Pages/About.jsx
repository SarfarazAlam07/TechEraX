import React from 'react';

// Importing all separated components
import AboutHero from '../components/AboutHero';
import AboutStats from '../components/AboutStats';
import AboutStory from '../components/AboutStory';
import AboutValues from '../components/AboutValues';
import AboutFAQ from '../components/AboutFAQ';
import CTASection from '../components/CTASection'; // Reused CTA

const About = () => {
  return (
    <div className="bg-white"> {/* pt for navbar */}
      
      <AboutHero />
      <AboutStats />
      <AboutStory />
      <AboutValues />
      <AboutFAQ />
      <CTASection />

    </div>
  );
};

export default About;