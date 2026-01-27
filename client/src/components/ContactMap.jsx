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
          // Our Address
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14407.77252670731!2d84.8365287!3d25.4664468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d509c2a685955%3A0x26421d0141662998!2sPaliganj%2C%20Bihar!5e0!3m2!1sen!2sin!4v1706429944116!5m2!1sen!2sin"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;
