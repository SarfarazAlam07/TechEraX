import React from "react";

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
          src="https://maps.google.com/maps?q=25.28,84.87+(TechEraX)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;
