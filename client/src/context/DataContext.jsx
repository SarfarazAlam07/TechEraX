import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

// Custom Hook to use Data
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Backend Base URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  
  // --- STATES ---
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [members, setMembers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [inquiries, setInquiries] = useState([]); 
  const [aboutStats, setAboutStats] = useState([]);
  const [aboutFaqs, setAboutFaqs] = useState([]);
  
  // ✅ 1. Added Reviews State
  const [reviews, setReviews] = useState([]); 

  // --- FETCH DATA FROM SERVER ---
  const refreshData = async () => {
    try {
      // Parallel requests for faster loading
      // ✅ 2. Added resReviews to destructuring
      const [resProjects, resServices, resTeam, resBlogs, resInquiries, resStats, resFaqs, resReviews] =
        await Promise.all([
          axios.get(`${API_URL}/projects`),
          axios.get(`${API_URL}/services`),
          axios.get(`${API_URL}/team`),
          axios.get(`${API_URL}/blogs`),
          axios.get(`${API_URL}/inquiries`),
          axios.get(`${API_URL}/stats`),       
          axios.get(`${API_URL}/faqs?section=about`), 
          axios.get(`${API_URL}/reviews`), // ✅ 3. Added Reviews API Call
        ]);

      // Set Data to State
      setProjects(resProjects.data);
      setServices(resServices.data);
      setMembers(resTeam.data);
      setBlogs(resBlogs.data);
      setInquiries(resInquiries.data);
      setAboutStats(resStats.data);
      setAboutFaqs(resFaqs.data);
      
      // ✅ 4. Set Reviews Data
      setReviews(resReviews.data);
      
    } catch (error) {
      console.error("Error connecting to Backend:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    refreshData();
  }, []);

  // --- VALUE OBJECT ---
  const value = {
    loading,
    API_URL,
    refreshData,

    projects,
    setProjects,
    services,
    setServices,
    members,
    setMembers,
    blogs,
    setBlogs,
    inquiries,
    setInquiries,

    aboutStats,
    setAboutStats,
    aboutFaqs,
    setAboutFaqs,

    // ✅ 5. Export Reviews
    reviews,
    setReviews,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;
