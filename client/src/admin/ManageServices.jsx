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
} from "lucide-react";
import { useData } from "../context/DataContext";
import axios from "axios";
// ✅ Import Modal
import ConfirmationModal from "../components/ConfirmationModal";

const ManageServices = () => {
  const { services, refreshData, API_URL } = useData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // --- ORDERING STATE ---
  const [localItems, setLocalItems] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Monitor",
    category: "development",
    colorTheme: "bg-blue-600",
    order: "", // ✅ Added Order
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
    // Sort services by order
    const sortedServices = [...services].sort((a, b) => (a.order || 0) - (b.order || 0));
    setLocalItems(sortedServices);
    setIsChanged(false);
  }, [services]);

  // ✅ 2. HANDLE ORDER CHANGE (Input Box)
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
      colorTheme: "bg-blue-600",
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

  // Helper to render icon
  const renderIcon = (iconName) => {
    const iconObj = iconOptions.find((i) => i.name === iconName);
    return iconObj ? iconObj.component : <Monitor size={20} />;
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Manage Services</h2>
        
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
            <Plus size={20} /> Add Service
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localItems.map((service) => (
          <div
            key={service._id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div
              className={`absolute top-0 left-0 w-full h-1 ${service.colorTheme}`}
            />

            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg bg-slate-50 text-blue-600`}>
                {renderIcon(service.icon)}
              </div>

               {/* ✅ ORDER INPUT & CATEGORY STACK */}
               <div className="flex flex-col items-end gap-2">
                 <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Ord</span>
                    <input 
                        type="number" 
                        value={service.order || 0}
                        onChange={(e) => handleOrderChange(e, service._id)}
                        className="w-8 text-center bg-white border border-gray-300 rounded text-xs font-bold text-slate-800 focus:outline-none"
                    />
                 </div>
                 
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {service.category}
                  </span>
               </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {service.title}
            </h3>
            <p className="text-slate-500 text-sm mb-6 flex-grow">
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
        ))}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-800">
                {editingId ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
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

              {/* ✅ Order Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Icon
                  </label>
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.name} value={opt.name}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Color Theme
                </label>
                <input
                  type="text"
                  name="colorTheme"
                  value={formData.colorTheme}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. bg-blue-600"
                />
              </div>
              <div className="pt-4 flex gap-3 border-t border-gray-100 mt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-slate-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Save size={18} /> Save Service
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
        title="Delete Service?"
        message="Are you sure you want to delete this service? This action cannot be undone."
      />
    </div>
  );
};

export default ManageServices;
