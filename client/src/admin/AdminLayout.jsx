import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"; // ✅ useNavigate added
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  Layers,
  HelpCircle
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Navigate hook initialize kiya

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Inquiries", icon: <MessageSquare size={20} />, path: "/admin/inquiries" }, 
    { name: "Manage Team", icon: <Users size={20} />, path: "/admin/team" },
    { name: "Manage Services", icon: <Layers size={20} />, path: "/admin/services" },
    { name: "Portfolio / Projects", icon: <Briefcase size={20} />, path: "/admin/projects" },
    { name: "Blogs & News", icon: <FileText size={20} />, path: "/admin/blogs" },
    { name: "Manage About", icon: <HelpCircle size={20} />, path: "/admin/about" },
  ];

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    // 1. Confirm karein ki user sach me logout karna chahta hai
    if (window.confirm("Are you sure you want to logout?")) {
      
      // 2. LocalStorage se token ya admin flag clear karein
      // (Agar aapne login ke waqt koi key set ki thi, jaise 'isAdmin' ya 'token')
      localStorage.removeItem("isAdmin"); 
      localStorage.removeItem("token");
      
      // 3. Login page par redirect karein
      navigate("/admin/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full overflow-y-auto z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            TechEraX Admin
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
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
          {/* ✅ Button par onClick lagaya */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;