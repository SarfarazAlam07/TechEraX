import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, X, Save, 
  Github, Linkedin, Twitter, Instagram, Globe, Image as ImageIcon 
} from 'lucide-react';
// ✅ Context Import
import { useData } from "../context/DataContext";

const ManageTeam = () => {
  // ✅ Context se Team Members le rahe hain
  const { members, setMembers } = useData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State (Based on TeamSection.jsx structure)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    image: "",
    portfolioLink: "",
    socials: {
      github: "",
      linkedin: "",
      instagram: "",
      twitter: ""
    }
  });

  // --- HANDLERS ---
  
  // Handle text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Check if it's a social link (nested object)
    if (['github', 'linkedin', 'instagram', 'twitter'].includes(name)) {
      setFormData({
        ...formData,
        socials: {
          ...formData.socials,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      description: "",
      image: "",
      portfolioLink: "",
      socials: { github: "", linkedin: "", instagram: "", twitter: "" }
    });
    setIsFormOpen(true);
  };

  const openEditForm = (member) => {
    setEditingId(member.id);
    // Ensure nested objects exist to prevent errors
    setFormData({
      ...member,
      socials: member.socials || { github: "", linkedin: "", instagram: "", twitter: "" }
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Remove this member?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setMembers(members.map(m => (m.id === editingId ? { ...formData, id: editingId } : m)));
    } else {
      setMembers([...members, { ...formData, id: Date.now() }]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="relative pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Team Members</h2>
        <button 
          onClick={openAddForm}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
        >
          <Plus size={20} /> Add Member
        </button>
      </div>

      {/* --- MEMBERS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <img 
                src={member.image} 
                alt={member.name} 
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-slate-50"
            />
            <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
            <p className="text-blue-600 font-medium text-sm mb-2">{member.role}</p>
            <p className="text-slate-500 text-sm mb-6 line-clamp-2">{member.description}</p>
            
            <div className="flex gap-3 w-full mt-auto">
                <button 
                  onClick={() => openEditForm(member)}
                  className="flex-1 py-2 rounded-lg border border-gray-200 text-slate-600 hover:bg-slate-50 flex justify-center items-center gap-2 font-medium text-sm"
                >
                    <Edit size={16} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(member.id)}
                  className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex justify-center items-center gap-2 font-medium text-sm"
                >
                    <Trash2 size={16} /> Delete
                </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL FORM --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-800">
                {editingId ? "Edit Member" : "Add New Member"}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                  <input 
                    type="text" name="name" required
                    value={formData.name} onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Sarfaraz Alam"
                  />
                </div>
                {/* Role */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Role / Designation</label>
                  <input 
                    type="text" name="role" required
                    value={formData.role} onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. CEO || MERN Developer"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Profile Image URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" name="image" required
                    value={formData.image} onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://... or /images/..."
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Bio / Description</label>
                <textarea 
                  name="description" required rows="3"
                  value={formData.description} onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Short bio regarding expertise..."
                ></textarea>
              </div>

              {/* Social Links Section */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <Globe size={16} className="text-blue-500" /> Social Links & Portfolio
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Portfolio */}
                    <div className="relative">
                        <Globe className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input type="text" name="portfolioLink" value={formData.portfolioLink} onChange={handleInputChange} 
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Portfolio URL" />
                    </div>
                    {/* GitHub */}
                    <div className="relative">
                        <Github className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input type="text" name="github" value={formData.socials.github} onChange={handleInputChange} 
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="GitHub URL" />
                    </div>
                    {/* LinkedIn */}
                    <div className="relative">
                        <Linkedin className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input type="text" name="linkedin" value={formData.socials.linkedin} onChange={handleInputChange} 
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="LinkedIn URL" />
                    </div>
                    {/* Instagram */}
                    <div className="relative">
                        <Instagram className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input type="text" name="instagram" value={formData.socials.instagram} onChange={handleInputChange} 
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Instagram URL" />
                    </div>
                     {/* Twitter */}
                     <div className="relative">
                        <Twitter className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input type="text" name="twitter" value={formData.socials.twitter} onChange={handleInputChange} 
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Twitter URL" />
                    </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4 border-t border-gray-100 mt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-3 bg-gray-100 text-slate-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all">
                  <Save size={20} /> Save Member
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTeam;
