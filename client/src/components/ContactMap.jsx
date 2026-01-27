import React from "react";

const ContactMap = () => {
  return (
    <section className="py-12 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-[400px] relative bg-slate-100">
        <iframe
          title="Office Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          // FIX: Maine yahan standard Google Maps Embed link (HTTPS) use kiya hai
          // Location: Paliganj, Patna
          src="https://maps.google.com/maps?q=Paliganj,%20Patna&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;
