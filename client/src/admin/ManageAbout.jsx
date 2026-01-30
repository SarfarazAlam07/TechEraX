import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  BarChart2,
  HelpCircle,
} from "lucide-react";
import { useData } from "../context/DataContext";
import axios from "axios"; 
import ConfirmationModal from "../components/ConfirmationModal";

const ManageAbout = () => {
  const { aboutStats, aboutFaqs, refreshData, API_URL } = useData();

  const [activeTab, setActiveTab] = useState("stats");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // --- ORDERING STATE ---
  const [localItems, setLocalItems] = useState([]); // Store current list (stats or faqs) locally
  const [isChanged, setIsChanged] = useState(false);

  // --- FORM STATE ---
  const [statForm, setStatForm] = useState({ label: "", value: "", order: "" });
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    section: "about",
    order: ""
  });

  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ✅ 1. SYNC DATA & SORT (Jab Tab change ho ya Data aaye)
  useEffect(() => {
    const data = activeTab === "stats" ? aboutStats : aboutFaqs;
    // Order ke hisaab se sort karo
    const sortedData = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));
    setLocalItems(sortedData);
    setIsChanged(false); // Tab change hone par save button hata do
  }, [aboutStats, aboutFaqs, activeTab]);

  // ✅ 2. HANDLE ORDER CHANGE (Input Box)
  const handleOrderChange = (e, id) => {
    const newOrder = parseInt(e.target.value) || 0;
    
    // Local list update karo
    const updatedList = localItems.map((item) => 
      item._id === id ? { ...item, order: newOrder } : item
    );

    setLocalItems(updatedList);
    setIsChanged(true); // Save Button dikhao
  };

  // ✅ 3. SAVE ORDER (Bulk Update)
  const saveOrder = async () => {
    try {
      const endpoint = activeTab === "stats" ? "stats" : "faqs";
      const payload = localItems.map(m => ({ _id: m._id, order: m.order }));
      
      await axios.put(`${API_URL}/${endpoint}/reorder`, { items: payload });
      
      alert("Order Updated Successfully! 🎉");
      refreshData(); 
      setIsChanged(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save order.");
    }
  };

  // --- HANDLERS ---
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "stat") setStatForm({ ...statForm, [name]: value });
    else setFaqForm({ ...faqForm, [name]: value });
  };

  const openAddForm = () => {
    setEditingId(null);
    setStatForm({ label: "", value: "", order: "" });
    setFaqForm({ question: "", answer: "", section: "about", order: "" });
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setEditingId(item._id);
    if (activeTab === "stats") setStatForm(item);
    else setFaqForm(item);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      const endpoint = activeTab === "stats" ? "stats" : "faqs";
      await axios.delete(`${API_URL}/${endpoint}/${deleteId}`);
      refreshData(); 
      setIsModalOpen(false); 
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting item", error);
      alert("Error deleting item");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = activeTab === "stats" ? "stats" : "faqs";
    const data = activeTab === "stats" ? statForm : faqForm;

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${endpoint}/${editingId}`, data);
      } else {
        await axios.post(`${API_URL}/${endpoint}`, data);
      }
      refreshData();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving data", error);
      alert("Failed to save data");
    }
  };

  return (
    <div className="relative pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-slate-800">Manage About Page</h2>

        {/* TAB SWITCHER */}
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === "stats"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <BarChart2 size={16} /> Company Stats
          </button>
          <button
            onClick={() => setActiveTab("faqs")}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === "faqs"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <HelpCircle size={16} /> About FAQs
          </button>
        </div>

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
            <Plus size={20} /> Add {activeTab === "stats" ? "Stat" : "FAQ"}
            </button>
        </div>
      </div>

      {/* STATS VIEW */}
      {activeTab === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* ✅ Use localItems instead of aboutStats */}
          {localItems.map((stat) => (
            <div
              key={stat._id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center flex flex-col items-center justify-center hover:shadow-md transition-all relative"
            >
              {/* ✅ ORDER INPUT BOX */}
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Ord</span>
                <input 
                    type="number" 
                    value={stat.order || 0}
                    onChange={(e) => handleOrderChange(e, stat._id)}
                    className="w-8 text-center bg-white border border-gray-300 rounded text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>

              <h3 className="text-4xl font-extrabold text-blue-600 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-500 font-medium mb-6">{stat.label}</p>
              <div className="flex gap-3 w-full border-t border-gray-50 pt-4">
                <button
                  onClick={() => openEditForm(stat)}
                  className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 flex items-center justify-center gap-2 text-sm"
                >
                  <Edit size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(stat._id)}
                  className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 flex items-center justify-center gap-2 text-sm"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAQS VIEW */}
      {activeTab === "faqs" && (
        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          {/* ✅ Use localItems instead of aboutFaqs */}
          {localItems.map((faq) => (
            <div
              key={faq._id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-start gap-4 relative"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {/* ✅ ORDER INPUT BOX (Inline for FAQ) */}
                  <div className="flex flex-col items-center justify-center bg-gray-50 px-1 py-1 rounded border border-gray-200 h-full">
                    <span className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-1">Order</span>
                    <input 
                        type="number" 
                        value={faq.order || 0}
                        onChange={(e) => handleOrderChange(e, faq._id)}
                        className="w-8 text-center bg-white border border-gray-300 rounded text-xs font-bold text-slate-800 focus:outline-none"
                    />
                  </div>

                  <HelpCircle className="text-blue-500 w-5 h-5 flex-shrink-0" />
                  <h3 className="font-bold text-slate-800 text-lg">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pl-14">
                  {faq.answer}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openEditForm(faq)}
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteClick(faq._id)}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM (Add/Edit) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-800">
                {editingId ? "Edit" : "Add New"}{" "}
                {activeTab === "stats" ? "Stat" : "FAQ"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {activeTab === "stats" ? (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Value (Number)
                    </label>
                    <input
                      type="text"
                      name="value"
                      required
                      value={statForm.value}
                      onChange={(e) => handleInputChange(e, "stat")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. 100+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Label (Title)
                    </label>
                    <input
                      type="text"
                      name="label"
                      required
                      value={statForm.label}
                      onChange={(e) => handleInputChange(e, "stat")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. Projects Delivered"
                    />
                  </div>
                  {/* ✅ Order Input for Stat */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={statForm.order}
                      onChange={(e) => handleInputChange(e, "stat")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. 1"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      name="question"
                      required
                      value={faqForm.question}
                      onChange={(e) => handleInputChange(e, "faq")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Answer
                    </label>
                    <textarea
                      name="answer"
                      required
                      rows="4"
                      value={faqForm.answer}
                      onChange={(e) => handleInputChange(e, "faq")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    ></textarea>
                  </div>
                   {/* ✅ Order Input for FAQ */}
                   <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={faqForm.order}
                      onChange={(e) => handleInputChange(e, "faq")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. 1"
                    />
                  </div>
                </>
              )}
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
                  <Save size={20} /> Save Changes
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
        title="Delete Item?"
        message={`Are you sure you want to delete this ${
          activeTab === "stats" ? "Statistic" : "FAQ"
        }?`}
      />
    </div>
  );
};

export default ManageAbout;
