import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";
const ContactForm = () => {
  return (
    <section id="contact-section" className="py-12 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT SIDE: Contact Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 text-white p-10 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-20" />

          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-slate-400 mb-10 leading-relaxed">
              Fill up the form and our Team will get back to you within 24
              hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="font-medium text-lg">+91 727799-9901</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="font-medium text-lg">TechEraX@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-slate-400">Address</p>
                  <p className="font-medium text-lg">
                    Chiksi, Paliganj patna (Bihar)
                    <br />
                    Near Himalaya University
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12">
            <p className="text-sm text-slate-400 mb-4">Follow us</p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="TechEraX@gmail.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone (Optional) */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Phone *
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              {/* Budget */}
              <div className="space-y-2">
                <label className="text-sm font-semibold t">
                  Project Budget
                </label>
                <select className="w-full px-4 py-3 rounded-lg border text-slate-200 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all">
                  <option>Select a Budget Range</option>
                  <option value="project-below-100">Project: Below $100</option>
                  <option value="project-100-350">Project: $100 - $350</option>
                  <option value="project-350-550">Project: $350 - $550</option>
                  <option value="project-550-1200">
                    Project: $550 - $1,200
                  </option>
                  <option value="project-1200-plus">Project: $1,200+</option>

                  {/* Visual Separator (Line) */}
                  <option disabled>────────────────</option>

                  {/* Maintenance/Monthly Budgets */}
                  <option value="maintenance-basic">
                    Maintenance: Basic ($50 - $100 / mo)
                  </option>
                  <option value="maintenance-standard">
                    Maintenance: Standard ($100 - $300 / mo)
                  </option>
                  <option value="maintenance-premium">
                    Maintenance: Premium ($300+ / mo)
                  </option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Tell us about your project
              </label>
              <textarea
                rows="5"
                placeholder="I need a website for my startup..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
