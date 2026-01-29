import React from "react";
import { 
  Trash2, Mail, Calendar, MessageSquare, Phone, 
  CheckCircle, XCircle, Clock 
} from "lucide-react";
import axios from "axios";
import { useData } from "../context/DataContext"; 

const ManageInquiries = () => {
  const { inquiries, refreshData, API_URL } = useData();

  // --- DELETE FUNCTION ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`${API_URL}/inquiries/${id}`);
        refreshData();
      } catch (error) {
        console.error("Error deleting inquiry:", error);
        alert("Failed to delete message.");
      }
    }
  };

  // --- NEW FEATURE: UPDATE STATUS (Accept/Reject) ---
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      // Backend par status update bhej rahe hain
      // Note: Aapke backend me PUT route aur 'status' field hona chahiye
      await axios.put(`${API_URL}/inquiries/${id}`, { status: newStatus });
      refreshData(); // List refresh karega taaki naya status dikhe
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Make sure backend supports this.");
    }
  };

  // Helper function to get badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <div className="relative pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Customer Inquiries
        </h2>
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <MessageSquare size={20} />
          Total: {inquiries ? inquiries.length : 0}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {!inquiries || inquiries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <MessageSquare className="mx-auto text-gray-300 w-16 h-16 mb-4" />
            <p className="text-gray-500 text-lg">No new inquiries yet.</p>
          </div>
        ) : (
          inquiries.map((inq) => (
            <div
              key={inq._id}
              className={`bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow relative ${
                inq.status === "Accepted" ? "border-green-200" : 
                inq.status === "Rejected" ? "border-red-200" : "border-gray-100"
              }`}
            >
              {/* HEADER SECTION */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xl border border-slate-200">
                    {inq.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      {inq.name}
                      {/* Status Badge */}
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${getStatusBadge(inq.status || "Pending")}`}>
                        {inq.status || "Pending"}
                      </span>
                    </h3>
                    
                    {/* Contact Details (Email & Phone) */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mt-1">
                      <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        <Mail size={12} /> {inq.email}
                      </span>
                      
                      {/* ✅ PHONE NUMBER ADDED HERE */}
                      <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        <Phone size={12} /> {inq.phone}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(inq.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(inq._id)}
                  className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold"
                  title="Delete Message"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* MESSAGE BOX */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-4">
                {/* ✅ Changed Subject to Budget */}
                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Budget: <span className="text-blue-600">{inq.subject}</span>
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {inq.message}
                </p>
              </div>

              {/* ✅ ADMIN ACTIONS (Accept / Reject) */}
              <div className="flex gap-3 border-t border-gray-100 pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider self-center mr-auto">
                  Action:
                </p>
                
                <button 
                  onClick={() => handleStatusUpdate(inq._id, "Pending")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !inq.status || inq.status === "Pending" ? "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-400" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  <Clock size={14} /> Pending
                </button>

                <button 
                  onClick={() => handleStatusUpdate(inq._id, "Accepted")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    inq.status === "Accepted" ? "bg-green-100 text-green-700 ring-1 ring-green-400" : "bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600"
                  }`}
                >
                  <CheckCircle size={14} /> Accept
                </button>

                <button 
                  onClick={() => handleStatusUpdate(inq._id, "Rejected")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    inq.status === "Rejected" ? "bg-red-100 text-red-700 ring-1 ring-red-400" : "bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  <XCircle size={14} /> Reject
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageInquiries;
