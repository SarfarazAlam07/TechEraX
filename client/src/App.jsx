import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './Pages/Home';
import About from './Pages/About'; 
import Services from './Pages/Services';
import Portfolio from './Pages/Portfolio';
import ContactUs from './Pages/ContactUs';
import Blog from './Pages/Blog';

// Admin Components
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";
import ManageBlogs from './admin/ManageBlogs';
import ManageServices from "./admin/ManageServices";
import ManageProjects from "./admin/ManageProjects";
import ManageTeam from "./admin/ManageTeam";
import ManageAbout from './admin/ManageAbout';
import ManageInquiries from "./admin/ManageInquiries";
import ManageReviews from "./admin/ManageReviews"; // ✅ 1. NEW IMPORT

// Context Import
import { DataProvider } from './context/DataContext';

// --- LAYOUT FOR PUBLIC PAGES (Navbar + Footer) ---
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet /> 
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="bg-white min-h-screen font-sans">
          <ScrollToTop />
          
          <Routes>
            {/* ============================== */}
            {/* 🟢 PUBLIC ROUTES */}
            {/* ============================== */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<Home />} />
            </Route>

            {/* ============================== */}
            {/* 🔴 ADMIN ROUTES */}
            {/* ============================== */}
            
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route element={<ProtectedRoute />}> 
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="services" element={<ManageServices />} />
                <Route path="projects" element={<ManageProjects />} />
                <Route path="team" element={<ManageTeam />} />
                <Route path="blogs" element={<ManageBlogs />} />
                <Route path="about" element={<ManageAbout />} />
                <Route path="inquiries" element={<ManageInquiries />} />
                
                {/* ✅ 2. NEW ROUTE FOR REVIEWS */}
                <Route path="reviews" element={<ManageReviews />} /> 
                
              </Route>
            </Route>
            
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
