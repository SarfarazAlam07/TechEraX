import React, { useState } from "react";
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
import { useData } from "../context/DataContext";
import axios from "axios"; // ✅ Axios Import

const ContactForm = () => {
  const { API_URL } = useData(); // ✅ URL Context se lo
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // Local Loading

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return alert("Please fill in the required fields.");
    }

    try {
      setLoading(true);
      // ✅ Real POST Request
      await axios.post(`${API_URL}/inquiries`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.budget || "General Inquiry",
        message: formData.message,
      });

      alert("Message sent successfully! We will contact you shortly.");
      setFormData({ name: "", email: "", phone: "", budget: "", message: "" });
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-12 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Card (Same as before) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 text-white p-10 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden"
        >
          {/* ... (Decoration div same as old code) ... */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-20" />

          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-slate-400 mb-10">
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
                    Chiksi, Paliganj, Patna (Bihar)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="mt-12">
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

        {/* Right Side Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@gmail.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 62XXXXXXX2"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Budget
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                >
                  <option value="">Select Range</option>
                  <option value="Below $100">Below $100</option>
                  <option value="$100 - $350">$100 - $350</option>
                  <option value="$350 - $550">$350 - $550</option>
                  <option value="$550+">$550+</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-blue-500 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
