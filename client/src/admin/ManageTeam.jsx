import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Globe,
  // Icons for social input placeholders if needed, otherwise removed unused imports
} from "lucide-react";
import { useData } from "../context/DataContext";
import axios from "axios";
// ✅ Import Modal
import ConfirmationModal from "../components/ConfirmationModal";

const ManageTeam = () => {
  const { members, refreshData, API_URL } = useData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // --- ORDERING STATE ---
  const [localItems, setLocalItems] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    image: "",
    portfolioLink: "",
    order: "", // ✅ Added Order field
    socials: { github: "", linkedin: "", instagram: "", twitter: "" },
  });

  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ✅ 1. SYNC & SORT DATA
  useEffect(() => {
    // Sort members by order
    const sortedMembers = [...members].sort((a, b) => (a.order || 0) - (b.order || 0));
    setLocalItems(sortedMembers);
    setIsChanged(false);
  }, [members]);

  // ✅ 2. HANDLE ORDER CHANGE (Input Box on Card)
  const handleOrderChange = (e, id) => {
    const newOrder = parseInt(e.target.value) || 0;

    const updatedList = localItems.map((item) =>
      item._id === id ? { ...item, order: newOrder } : item
    );

    setLocalItems(updatedList);
    setIsChanged(true);
  };

  // ✅ 3. SAVE ORDER (Bulk Update)
  const saveOrder = async () => {
    try {
      const payload = localItems.map((m) => ({ _id: m._id, order: m.order }));
      await axios.put(`${API_URL}/team/reorder`, { items: payload });

      alert("Team Order Updated Successfully! 🎉");
      refreshData();
      setIsChanged(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save order.");
    }
  };

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["github", "linkedin", "instagram", "twitter"].includes(name)) {
      setFormData({
        ...formData,
        socials: { ...formData.socials, [name]: value },
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
      order: "",
      socials: { github: "", linkedin: "", instagram: "", twitter: "" },
    });
    setIsFormOpen(true);
  };

  const openEditForm = (member) => {
    setEditingId(member._id);
    setFormData({
      ...member,
      socials: member.socials || {
        github: "",
        linkedin: "",
        instagram: "",
        twitter: "",
      },
    });
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`${API_URL}/team/${deleteId}`);
      refreshData();
      setIsModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error removing member", error);
      alert("Error removing member");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/team/${editingId}`, formData);
      } else {
        await axios.post(`${API_URL}/team`, formData);
      }
      refreshData();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving member", error);
      alert("Failed to save member");
    }
  };

  return (
    <div className="relative pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Team Members</h2>

        <div className="flex gap-3">
          {/* ✅ SAVE ORDER BUTTON */}
          {isChanged && (
            <button
              onClick={saveOrder}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 animate-pulse shadow-lg"
            >
              <Save size={20} /> Save Order
            </button>
          )}

          <button
            onClick={openAddForm}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
          >
            <Plus size={20} /> Add Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ✅ Use localItems (Sorted) instead of members */}
        {localItems.map((member) => (
          <div
            key={member._id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow relative"
          >
            {/* ✅ ORDER INPUT BOX (Top Left) */}
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 shadow-sm z-10">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Ord</span>
              <input
                type="number"
                value={member.order || 0}
                onChange={(e) => handleOrderChange(e, member._id)}
                className="w-8 text-center bg-white border border-gray-300 rounded text-xs font-bold text-slate-800 focus:outline-none"
              />
            </div>

            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-slate-50"
            />
            <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
            <p className="text-blue-600 font-medium text-sm mb-2">
              {member.role}
            </p>
            <p className="text-slate-500 text-sm mb-6 line-clamp-2">
              {member.description}
            </p>

            <div className="flex gap-3 w-full mt-auto">
              <button
                onClick={() => openEditForm(member)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-slate-600 hover:bg-slate-50 flex justify-center items-center gap-2 font-medium text-sm"
              >
                <Edit size={16} /> Edit
              </button>
              
              <button
                onClick={() => handleDeleteClick(member._id)}
                className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex justify-center items-center gap-2 font-medium text-sm"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-800">
                {editingId ? "Edit Member" : "Add New Member"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              
              {/* ✅ Order Input in Form */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                    Display Order
                </label>
                <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. 1"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Globe size={16} className="text-blue-500" /> Social Links
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="portfolioLink"
                    value={formData.portfolioLink}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-800"
                    placeholder="Portfolio URL"
                  />
                  <input
                    type="text"
                    name="github"
                    value={formData.socials.github}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-800"
                    placeholder="GitHub URL"
                  />
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.socials.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-800"
                    placeholder="LinkedIn URL"
                  />
                  <input
                    type="text"
                    name="instagram"
                    value={formData.socials.instagram}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-800"
                    placeholder="Instagram URL"
                  />
                  <input
                    type="text"
                    name="twitter"
                    value={formData.socials.twitter}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-800"
                    placeholder="Twitter URL"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4 border-t border-gray-100 mt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-slate-700 font-bold rounded-xl hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Save size={20} /> Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Remove Member?"
        message="Are you sure you want to remove this member? This action cannot be undone."
      />
    </div>
  );
};

export default ManageTeam;
