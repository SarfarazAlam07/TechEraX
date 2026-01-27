import React from 'react';

// Components
import PortfolioHeader from '../components/PortfolioHeader';
import PortfolioGallery from '../components/PortfolioGallery';
import FeaturedCaseStudy from '../components/FeaturedCaseStudy';
// import CTASection from '../components/CTASection'; // Reuse CTA

const Portfolio = () => {
  return (
    <div className="bg-white">
      
      <PortfolioHeader />
      <PortfolioGallery />
      <FeaturedCaseStudy />
      
      {/* Final Call To Action */}
      {/* <CTASection /> */}

    </div>
  );
};

export default Portfolio;
