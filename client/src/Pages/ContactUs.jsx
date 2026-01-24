
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import ContactHero from '../components/ContactHero';
import ContactForm from '../components/ContactForm';
import ContactMap from '../components/ContactMap';
import ContactFAQ from '../components/ContactFAQ';

const ContactUs = () => {
  const { hash } = useLocation(); // URL se hash (#) read karega

  useEffect(() => {
    // Agar URL me hash hai (jaise #contact-section)
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        // Thoda wait karke scroll karega taki page load ho jaye
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Agar koi hash nahi hai, to page ke top par rahe
      window.scrollTo(0, 0);
    }
  }, [hash]);
  return (
    <div className="bg-white">
      
      <ContactHero />
      <ContactForm />
      <ContactMap />
      <ContactFAQ />

    </div>
  );
};

export default ContactUs;