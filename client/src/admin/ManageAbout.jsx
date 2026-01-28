import React, { useState } from "react";
import { 
  Plus, Edit, Trash2, X, Save, 
  BarChart2, HelpCircle 
} from "lucide-react";
// ✅ Context Import
import { useData } from "../context/DataContext";

const ManageAbout = () => {
  const { aboutStats, setAboutStats, aboutFaqs, setAboutFaqs } = useData();

  const [activeTab, setActiveTab] = useState("stats"); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // --- FORM STATE ---
  const [statForm, setStatForm] = useState({ label: "", value: "" });
  const [faqForm, setFaqForm] = useState({ question: "", answer: "" });

  // --- HANDLERS ---
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "stat") setStatForm({ ...statForm, [name]: value });
    else setFaqForm({ ...faqForm, [name]: value });
  };

  const openAddForm = () => {
    setEditingId(null);
    setStatForm({ label: "", value: "" });
    setFaqForm({ question: "", answer: "" });
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setEditingId(item.id);
    if (activeTab === "stats") setStatForm(item);
    else setFaqForm(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      if (activeTab === "stats") setAboutStats(aboutStats.filter(s => s.id !== id));
      else setAboutFaqs(aboutFaqs.filter(f => f.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "stats") {
      if (editingId) {
        setAboutStats(aboutStats.map(s => (s.id === editingId ? { ...statForm, id: editingId } : s)));
      } else {
        setAboutStats([...aboutStats, { ...statForm, id: Date.now() }]);
      }
    } else {
      if (editingId) {
        setAboutFaqs(aboutFaqs.map(f => (f.id === editingId ? { ...faqForm, id: editingId } : f)));
      } else {
        setAboutFaqs([...aboutFaqs, { ...faqForm, id: Date.now() }]);
      }
    }
    setIsFormOpen(false);
  };

  return (
    <div className="relative pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-slate-800">Manage About Page</h2>
        
        {/* TAB SWITCHER - UPDATED COLORS */}
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          <button 
            onClick={() => setActiveTab("stats")} 
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === "stats" 
                ? "bg-blue-600 text-white shadow-md" // ✅ Black se Blue kiya
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <BarChart2 size={16} /> Company Stats
          </button>
          <button 
            onClick={() => setActiveTab("faqs")} 
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === "faqs" 
                ? "bg-blue-600 text-white shadow-md" // ✅ Black se Blue kiya
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <HelpCircle size={16} /> About FAQs
          </button>
        </div>

        <button onClick={openAddForm} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
          <Plus size={20} /> Add {activeTab === "stats" ? "Stat" : "FAQ"}
        </button>
      </div>

      {/* STATS VIEW */}
      {activeTab === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutStats.map((stat) => (
            <div key={stat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center flex flex-col items-center justify-center hover:shadow-md transition-all">
              <h3 className="text-4xl font-extrabold text-blue-600 mb-2">{stat.value}</h3>
              <p className="text-gray-500 font-medium mb-6">{stat.label}</p>
              
              <div className="flex gap-3 w-full border-t border-gray-50 pt-4">
                <button onClick={() => openEditForm(stat)} className="flex-1 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 flex items-center justify-center gap-2 text-sm"><Edit size={14} /> Edit</button>
                <button onClick={() => handleDelete(stat.id)} className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 flex items-center justify-center gap-2 text-sm"><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAQS VIEW */}
      {activeTab === "faqs" && (
        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          {aboutFaqs.map((faq) => (
            <div key={faq.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="text-blue-500 w-5 h-5 flex-shrink-0" />
                  <h3 className="font-bold text-slate-800 text-lg">{faq.question}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pl-7">{faq.answer}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => openEditForm(faq)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Edit size={18} /></button>
                <button onClick={() => handleDelete(faq.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-800">{editingId ? "Edit" : "Add New"} {activeTab === "stats" ? "Stat" : "FAQ"}</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} className="text-gray-500" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {activeTab === "stats" ? (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Value (Number)</label>
                    <input 
                      type="text" 
                      name="value" 
                      required 
                      value={statForm.value} 
                      onChange={(e) => handleInputChange(e, "stat")} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" // ✅ Added bg-white & text-color
                      placeholder="e.g. 100+" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Label (Title)</label>
                    <input 
                      type="text" 
                      name="label" 
                      required 
                      value={statForm.label} 
                      onChange={(e) => handleInputChange(e, "stat")} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" // ✅ Added bg-white & text-color
                      placeholder="e.g. Projects Delivered" 
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Question</label>
                    <input 
                      type="text" 
                      name="question" 
                      required 
                      value={faqForm.question} 
                      onChange={(e) => handleInputChange(e, "faq")} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" // ✅ Added bg-white & text-color
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Answer</label>
                    <textarea 
                      name="answer" 
                      required 
                      rows="4" 
                      value={faqForm.answer} 
                      onChange={(e) => handleInputChange(e, "faq")} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none" // ✅ Added bg-white & text-color
                    ></textarea>
                  </div>
                </>
              )}
              <div className="pt-4 flex gap-4 border-t border-gray-100 mt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-3 bg-gray-100 text-slate-700 hover:bg-gray-200 font-bold rounded-xl transition-colors">Cancel</button> {/* ✅ Fixed Cancel button visibility */}
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"><Save size={20} /> Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAbout;