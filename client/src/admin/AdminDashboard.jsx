import React from 'react';
import { Users, MessageSquare, Briefcase, Eye, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// ✅ Context Import
import { useData } from '../context/DataContext';

const AdminDashboard = () => {
  // ✅ Context se sara data nikaal rahe hain
  const { projects, members, blogs, services, inquiries } = useData();

  const stats = [
    { 
      title: "Total Inquiries", 
      value: inquiries ? inquiries.length : 0, 
      icon: <MessageSquare />, 
      color: "bg-blue-500" 
    },
    { 
      title: "Active Projects", 
      value: projects ? projects.length : 0, 
      icon: <Briefcase />, 
      color: "bg-purple-500" 
    },
    { 
      title: "Active Services", 
      value: services ? services.length : 0, 
      icon: <Layers />, 
      color: "bg-indigo-500" 
    },
    { 
      title: "Team Members", 
      value: members ? members.length : 0, 
      icon: <Users />, 
      color: "bg-green-500" 
    },
    { 
      title: "Total Blogs", 
      value: blogs ? blogs.length : 0, 
      icon: <Eye />, 
      color: "bg-orange-500" 
    },
  ];

  return (
    <div className="pb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-8">
        Dashboard Overview
      </h2>
      
      {/* --- STATS CARDS (Responsive Grid) --- */}
      {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols, Large: 5 cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-3 md:p-4 rounded-xl text-white ${stat.color} shadow-lg shadow-gray-200`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-xs md:text-sm font-medium">{stat.title}</p>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* --- RECENT INQUIRIES SECTION --- */}
      <div className="mt-8 md:mt-10 bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-row justify-between items-center mb-6">
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Recent Inquiries</h3>
            <Link to="/admin/inquiries" className="text-blue-600 font-bold text-xs md:text-sm flex items-center gap-1 hover:underline">
                View All <ArrowRight size={16} />
            </Link>
        </div>

        <div className="space-y-4">
            {/* Agar koi inquiry nahi hai */}
            {(!inquiries || inquiries.length === 0) ? (
                <p className="text-gray-400 text-center py-4 text-sm">No new inquiries yet.</p>
            ) : (
                // ✅ Safety Check added: (inquiries || [])
                (inquiries || []).slice(0, 5).map((inq) => (
                    <div key={inq.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors gap-3 sm:gap-0">
                        
                        {/* User Info */}
                        <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center font-bold">
                                {inq.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-bold text-slate-800 text-sm md:text-base truncate">{inq.name}</h4>
                                <p className="text-xs text-slate-500 truncate max-w-[150px] sm:max-w-xs">
                                  {inq.subject} • {inq.email}
                                </p>
                            </div>
                        </div>
                        
                        {/* Message Preview & Date */}
                        <div className="flex flex-col items-start sm:items-end gap-1 w-full sm:w-auto pl-14 sm:pl-0">
                             <p className="text-xs md:text-sm text-slate-600 max-w-full sm:max-w-xs md:max-w-md truncate">
                                {inq.message.length > 50 ? inq.message.substring(0, 50) + "..." : inq.message}
                             </p>
                             <span className="text-[10px] md:text-xs text-slate-400 font-medium bg-white px-2 py-1 rounded border border-slate-200">
                                {inq.date}
                             </span>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
