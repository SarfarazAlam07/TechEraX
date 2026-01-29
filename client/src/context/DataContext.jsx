import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

// Custom Hook to use Data
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Backend Base URL (Localhost ke liye)
  const API_URL = "http://localhost:5000/api";

  // --- STATES ---
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [members, setMembers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [inquiries, setInquiries,inquiriesCount] = useState([]);
  const [aboutStats, setAboutStats] = useState([]);
  const [aboutFaqs, setAboutFaqs] = useState([]);
  


  // --- FETCH DATA FROM SERVER ---
  const refreshData = async () => {
    try {
      // Parallel requests for faster loading
      const [resProjects, resServices, resTeam, resBlogs, resInquiries] = await Promise.all([
        axios.get(`${API_URL}/projects`),
        axios.get(`${API_URL}/services`),
        axios.get(`${API_URL}/team`),
        axios.get(`${API_URL}/blogs`),
        axios.get(`${API_URL}/inquiries`),
        axios.get(`${API_URL}/stats`), 
        axios.get(`${API_URL}/faqs?section=about`)
      ]);

      // Set Data to State
      setProjects(resProjects.data);
      setServices(resServices.data);
      setMembers(resTeam.data);
      setBlogs(resBlogs.data);
      setInquiries(resInquiries.data);
      setAboutStats(resStats.data);
      setAboutFaqs(resFaqs.data);

    } catch (error) {
      console.error("Error connecting to Backend:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load (App start hone par)
  useEffect(() => {
    refreshData();
  }, []);

  // --- VALUE OBJECT ---
  const value = {
    loading,
    API_URL,
    refreshData, // Is function ko Admin pages me call karenge update ke baad
    
    projects, setProjects,
    services, setServices,
    members, setMembers,
    blogs, setBlogs,
    inquiries, setInquiries,inquiriesCount,
    
    aboutStats, setAboutStats,
    aboutFaqs, setAboutFaqs,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
