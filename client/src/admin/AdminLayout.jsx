import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  LogOut,
  Layers,
  HelpCircle,
  Menu, // ✅ Mobile Menu Icon
  X     // ✅ Close Icon
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
   
  // ✅ State for Mobile Sidebar Toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Inquiries", icon: <MessageSquare size={20} />, path: "/admin/inquiries" }, 
    { name: "Manage Team", icon: <Users size={20} />, path: "/admin/team" },
    { name: "Manage Services", icon: <Layers size={20} />, path: "/admin/services" },
    { name: "Portfolio / Projects", icon: <Briefcase size={20} />, path: "/admin/projects" },
    { name: "Blogs & News", icon: <FileText size={20} />, path: "/admin/blogs" },
    { name: "Manage About", icon: <HelpCircle size={20} />, path: "/admin/about" },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("isAdmin"); 
      localStorage.removeItem("token");
      navigate("/admin/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 flex-col lg:flex-row">
      
      {/* ======================================= */}
      {/* 📱 MOBILE HEADER (Visible only on small screens) */}
      {/* ======================================= */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-20 shadow-md">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          TechEraX Admin
        </h1>
        
        {/* ✅ FIX: bg-transparent add kiya aur border hataya */}
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="p-2 bg-transparent text-white hover:bg-slate-800 rounded-lg transition-colors border-none outline-none focus:ring-0"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* ======================================= */}
      {/* 🌑 MOBILE OVERLAY (Backdrop) */}
      {/* ======================================= */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)} // Click outside to close
        />
      )}

      {/* ======================================= */}
      {/* 📂 SIDEBAR (Responsive) */}
      {/* ======================================= */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-900 text-white flex flex-col z-40
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:h-screen
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            TechEraX
          </h1>
          {/* Close Button for Mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden p-2 bg-transparent text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-600 !text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-800 hover:!text-white"
                }`}
              >
                <span className={isActive ? "!text-white" : "group-hover:!text-white"}>
                    {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg transition-all bg-transparent"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ======================================= */}
      {/* 📄 MAIN CONTENT AREA */}
      {/* ======================================= */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-50 w-full">
        <div className="max-w-7xl mx-auto">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
