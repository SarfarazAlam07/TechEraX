import React from "react";
import { Trash2, Mail, User, Calendar, MessageSquare } from "lucide-react";
import axios from "axios"; // ✅ Import Axios
import { useData } from "../context/DataContext"; // ✅ Context Import

const ManageInquiries = () => {
  // ✅ refreshData aur API_URL nikalo
  const { inquiries, refreshData, API_URL } = useData();

  // --- DELETE FUNCTION (Backend API) ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        // ✅ Server request
        await axios.delete(`${API_URL}/inquiries/${id}`);
        // ✅ List refresh
        refreshData();
      } catch (error) {
        console.error("Error deleting inquiry:", error);
        alert("Failed to delete message. Try again.");
      }
    }
  };

  return (
    <div className="relative pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Customer Inquiries</h2>
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
           <MessageSquare size={20} />
           Total: {inquiries ? inquiries.length : 0}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Agar koi inquiry nahi hai */}
        {!inquiries || inquiries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
             <MessageSquare className="mx-auto text-gray-300 w-16 h-16 mb-4" />
             <p className="text-gray-500 text-lg">No new inquiries yet.</p>
          </div>
        ) : (
          // Inquiries Loop
          inquiries.map((inq) => (
            // ✅ MongoDB me id nahi _id hoti hai
            <div key={inq._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div className="flex items-center gap-4">
                    {/* User Avatar (Initial) */}
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xl border border-slate-200">
                        {inq.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div>
                        <h3 className="font-bold text-slate-800 text-lg">{inq.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                <Mail size={12} /> {inq.email}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={12} /> 
                                {/* Date formatting */}
                                {new Date(inq.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                <button 
                  onClick={() => handleDelete(inq._id)} // ✅ Pass _id
                  className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold"
                  title="Delete Message"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>

              {/* Message Box */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                 <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Subject: {inq.subject}
                 </h4>
                 <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {inq.message}
                 </p>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageInquiries;
