import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

// Custom Hook to use Data
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // --- 1. STATES (Data Store) ---

  // Inquiries (Contact Form Data)
  const [inquiries, setInquiries] = useState([]);

  // Projects (Portfolio Data)
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "FinTech Dashboard",
      category: "Web",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      techStack: "React, Tailwind, Chart.js",
      liveLink: "#",
      repoLink: "#",
    },
    {
      id: 2,
      title: "E-Commerce App",
      category: "App",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      techStack: "React Native, Firebase",
      liveLink: "#",
      repoLink: "#",
    },
  ]);

  // Services Data
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Web Development",
      description: "Custom websites tailored to your brand needs.",
      icon: "Monitor",
      category: "development",
      colorTheme: "bg-blue-600",
    },
    {
      id: 2,
      title: "App Development",
      description: "Native and cross-platform mobile apps.",
      icon: "Smartphone",
      category: "development",
      colorTheme: "bg-green-600",
    },
  ]);

  // Team Members Data
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Sarfaraz Alam",
      role: "Founder || CEO",
      description: "Passionate about creating seamless web experiences.",
      image: "/sarfaraz.jpeg",
      portfolioLink: "https://sarfarazalam.vercel.app/",
      socials: { twitter: "#", linkedin: "#", github: "#", instagram: "#" },
    },
  ]);

  // Blogs Data
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "React vs Vue: 2026 Guide",
      category: "Development",
      time: "4 min read",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
      url: "#",
    },
  ]);

  // About Page Stats
  const [aboutStats, setAboutStats] = useState([
    { id: 1, label: "Years Experience", value: "5+" },
    { id: 2, label: "Projects Delivered", value: "100+" },
  ]);

  // About Page FAQs
  const [aboutFaqs, setAboutFaqs] = useState([
    {
      id: 1,
      question: "What makes TechEraX different?",
      answer: "We build ecosystems, not just apps.",
    },
  ]);

  // --- 2. LOCAL STORAGE (Data Save karne ke liye) ---
  useEffect(() => {
    const savedInquiries = localStorage.getItem("inquiries");
    if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
  }, []);

  useEffect(() => {
    localStorage.setItem("inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  // --- 3. EXPORT VALUE ---
  const value = {
    inquiries,
    setInquiries,
    projects,
    setProjects,
    services,
    setServices,
    members,
    setMembers,
    blogs,
    setBlogs,
    aboutStats,
    setAboutStats,
    aboutFaqs,
    setAboutFaqs,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;
