import React from 'react';

const ContactMap = () => {
  return (
    <section className="py-12 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-[400px] relative bg-slate-100">
        {/* Google Map Embed (Placeholder) */}
        <iframe 
          title="Office Location"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy" 
          allowFullScreen
          // Example: San Francisco Map
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017944111!3d37.757814996609724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1626375124400!5m2!1sen!2sus"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;