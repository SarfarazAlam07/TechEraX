import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Monitor,
  Smartphone,
  ShoppingCart,
  Globe,
  Server,
  ShieldCheck,
  Code2,
  Database,
  Cloud,
  PenTool,
  Megaphone,
  Image as ImageIcon, // ✅ Image Icon Import
} from "lucide-react";
import { useData } from "../context/DataContext";
import axios from "axios";
import ConfirmationModal from "../components/ConfirmationModal";

const ManageServices = () => {
  const { services, refreshData, API_URL } = useData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // --- ORDERING STATE ---
  const [localItems, setLocalItems] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Monitor",
    category: "development",
    image: "", // ✅ Changed colorTheme to image
    order: "", 
  });

  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Icon Options
  const iconOptions = [
    { name: "Monitor", component: <Monitor size={20} /> },
    { name: "Smartphone", component: <Smartphone size={20} /> },
    { name: "ShoppingCart", component: <ShoppingCart size={20} /> },
    { name: "Globe", component: <Globe size={20} /> },
    { name: "Server", component: <Server size={20} /> },
    { name: "ShieldCheck", component: <ShieldCheck size={20} /> },
    { name: "Code2", component: <Code2 size={20} /> },
    { name: "Database", component: <Database size={20} /> },
    { name: "Cloud", component: <Cloud size={20} /> },
    { name: "PenTool", component: <PenTool size={20} /> },
    { name: "Megaphone", component: <Megaphone size={20} /> },
  ];

  // ✅ 1. SYNC & SORT DATA
  useEffect(() => {
    const sortedServices = [...services].sort((a, b) => (a.order || 0) - (b.order || 0));
    setLocalItems(sortedServices);
    setIsChanged(false);
  }, [services]);

  // ✅ 2. HANDLE ORDER CHANGE
  const handleOrderChange = (e, id) => {
    const newOrder = parseInt(e.target.value) || 0;
    const updatedList = localItems.map((item) => 
      item._id === id ? { ...item, order: newOrder } : item
    );
    setLocalItems(updatedList);
    setIsChanged(true);
  };

  // ✅ 3. SAVE ORDER
  const saveOrder = async () => {
    try {
      const payload = localItems.map(m => ({ _id: m._id, order: m.order }));
      await axios.put(`${API_URL}/services/reorder`, { items: payload });
      alert("Order Updated Successfully! 🎉");
      refreshData();
      setIsChanged(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save order.");
    }
  };

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      icon: "Monitor",
      category: "development",
      image: "", // ✅ Reset image
      order: "",
    });
    setIsFormOpen(true);
  };

  const openEditForm = (service) => {
    setEditingId(service._id);
    setFormData(service);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${API_URL}/services/${deleteId}`);
      refreshData();
      setIsModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting service", error);
      alert("Error deleting service");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/services/${editingId}`, formData);
      } else {
        await axios.post(`${API_URL}/services`, formData);
      }
      refreshData();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving service", error);
      alert("Failed to save service");
    }
  };

  const renderIcon = (iconName) => {
    const iconObj = iconOptions.find((i) => i.name === iconName);
    return iconObj ? iconObj.component : <Monitor size={20} />;
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Manage Services</h2>
        
        <div className="flex gap-3">
             {/* SAVE ORDER BUTTON */}
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
            <Plus size={20} /> Add Service
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localItems.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow relative"
          >
            {/* ✅ NEW IMAGE HEADER */}
            <div className="relative h-40 bg-gray-100">
               {/* Order Input (Top Left) */}
               <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-lg border border-gray-200 shadow-sm z-10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Ord</span>
                    <input 
                        type="number" 
                        value={service.order || 0}
                        onChange={(e) => handleOrderChange(e, service._id)}
                        className="w-8 text-center bg-white border border-gray-300 rounded text-xs font-bold text-slate-800 focus:outline-none"
                    />
               </div>

               {/* Category Badge (Top Right) */}
               <div className="absolute top-2 right-2 bg-blue-600 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide text-white z-10">
                 {service.category}
               </div>

               {/* Image */}
               <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
               <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-blue-50 text-blue-600`}>
                    {renderIcon(service.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {service.title}
                  </h3>
               </div>
              
              <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">
                {service.description}
              </p>

              <div className="flex gap-3 mt-auto pt-4 border-t border-gray-50">
                <button
                  onClick={() => openEditForm(service)}
                  className="flex-1 py-2 rounded-lg border border-gray-200 text-slate-600 hover:bg-slate-50 flex justify-center items-center gap-2 text-sm font-medium"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(service._id)}
                  className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex justify-center items-center gap-2 text-sm font-medium"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-800">
                {editingId ? "Edit Service" : "Add New Service"}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Title</label>
                <input
                  type="text" name="title" required
                  value={formData.title} onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  name="description" required rows="3"
                  value={formData.description} onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </div>

              {/* ✅ Image URL Input (Replaced Color Theme) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text" name="image" required
                    value={formData.image} onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Order Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                <input
                  type="number" name="order"
                  value={formData.order} onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. 1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    name="category" value={formData.category} onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                  <select
                    name="icon" value={formData.icon} onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.name} value={opt.name}>{opt.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3 border-t border-gray-100 mt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-3 bg-gray-100 text-slate-700 font-bold rounded-lg hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors">
                  <Save size={18} /> Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete}
        title="Delete Service?" message="Are you sure?"
      />
    </div>
  );
};

export default ManageServices;
