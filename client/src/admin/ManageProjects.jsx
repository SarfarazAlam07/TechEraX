import React, { useState, useEffect } from "react";
import { 
  Plus, Edit, Trash2, X, Save, 
  Image as ImageIcon, ExternalLink, Github, Upload 
} from "lucide-react";
import { useData } from "../context/DataContext";
import axios from "axios"; 
import ConfirmationModal from "../components/ConfirmationModal";

const ManageProjects = () => {
  const { projects, refreshData, API_URL } = useData();
   
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Ordering State
  const [localItems, setLocalItems] = useState([]); 
  const [isChanged, setIsChanged] = useState(false);

  // ✅ New State for File
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "Web",
    // image: "", // Ab image URL directly set nahi karenge input se
    techStack: "",
    liveLink: "",
    repoLink: "",
    order: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // 1. SYNC & SORT DATA
  useEffect(() => {
    const sortedProjects = [...projects].sort((a, b) => (a.order || 0) - (b.order || 0));
    setLocalItems(sortedProjects);
    setIsChanged(false);
  }, [projects]);

  // 2. HANDLE ORDER CHANGE
  const handleOrderChange = (e, id) => {
    const newOrder = parseInt(e.target.value) || 0;
    const updatedList = localItems.map((item) => 
      item._id === id ? { ...item, order: newOrder } : item
    );
    setLocalItems(updatedList);
    setIsChanged(true);
  };

  // 3. SAVE ORDER
  const saveOrder = async () => {
    try {
      const payload = localItems.map(m => ({ _id: m._id, order: m.order }));
      await axios.put(`${API_URL}/projects/reorder`, { items: payload });
      alert("Order Updated Successfully! 🎉");
      refreshData();
      setIsChanged(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save order.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Preview show karne ke liye
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ title: "", category: "Web", techStack: "", liveLink: "", repoLink: "", order: "" });
    setSelectedFile(null);
    setImagePreview("");
    setIsFormOpen(true);
  };

  const openEditForm = (project) => {
    setEditingId(project._id);
    setFormData({
        title: project.title,
        category: project.category,
        techStack: project.techStack,
        liveLink: project.liveLink,
        repoLink: project.repoLink,
        order: project.order
    });
    // Agar edit kar rahe hain to purani image dikhao
    setImagePreview(project.image);
    setSelectedFile(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${API_URL}/projects/${deleteId}`);
      refreshData(); 
      setIsModalOpen(false); 
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project!");
    }
  };

  // ✅ Submit Logic Updated for FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // FormData object banayein kyuki file bhejni hai
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("techStack", formData.techStack);
    data.append("liveLink", formData.liveLink);
    data.append("repoLink", formData.repoLink);
    data.append("order", formData.order);

    // Agar nayi file select ki hai to append karo
    if (selectedFile) {
        data.append("image", selectedFile);
    }

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (editingId) {
        await axios.put(`${API_URL}/projects/${editingId}`, data, config);
      } else {
        await axios.post(`${API_URL}/projects`, data, config);
      }
      refreshData();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project.");
    }
  };

  return (
    <div className="relative pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Manage Projects</h2>
        
        <div className="flex gap-3">
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
            <Plus size={20} /> Add Project
            </button>
        </div>
      </div>

      {/* --- PROJECTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localItems.length === 0 ? <p className="text-gray-500">No projects found.</p> : localItems.map((project) => (
          <div key={project._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow relative">
            <div className="relative h-48 bg-gray-100">
                {/* Order Input */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-lg border border-gray-200 shadow-sm z-10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Ord</span>
                    <input 
                        type="number" 
                        value={project.order || 0}
                        onChange={(e) => handleOrderChange(e, project._id)}
                        className="w-8 text-center bg-white border border-gray-300 rounded text-xs font-bold text-slate-800 focus:outline-none"
                    />
                </div>
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide text-white">
                {project.category}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
              <p className="text-slate-500 text-sm mb-4">
                <span className="font-semibold text-slate-700">Tech:</span> {project.techStack}
              </p>
              <div className="flex gap-2 mb-6">
                {project.liveLink && <ExternalLink size={16} className="text-blue-500" />}
                {project.repoLink && <Github size={16} className="text-gray-700" />}
              </div>
              <div className="mt-auto grid grid-cols-2 gap-3">
                <button onClick={() => openEditForm(project)} className="py-2 px-4 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 flex items-center justify-center gap-2">
                  <Edit size={16} /> Edit
                </button>
                <button onClick={() => handleDeleteClick(project._id)} className="py-2 px-4 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 flex items-center justify-center gap-2">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
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
                {editingId ? "Edit Project" : "Add New Project"}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Project Title</label>
                  <input 
                    type="text" name="title" required
                    value={formData.title} onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                  <select 
                    name="category" value={formData.category} onChange={handleInputChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Web">Web Development</option>
                    <option value="App">App Development</option>
                    <option value="Design">UI/UX Design</option>
                  </select>
                </div>
              </div>

              {/* ✅ NEW FILE INPUT */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Project Image</label>
                
                {/* Preview Selected/Existing Image */}
                {imagePreview && (
                    <div className="mb-2">
                        <img src={imagePreview} alt="Preview" className="h-32 w-auto object-cover rounded-lg border border-gray-200" />
                    </div>
                )}

                <div className="relative border border-gray-300 rounded-lg bg-white p-2 flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-lg"><Upload size={20} className="text-gray-500"/></div>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tech Stack</label>
                <input 
                  type="text" name="techStack" required
                  value={formData.techStack} onChange={handleInputChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              
               <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Display Order</label>
                <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. 1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Live Demo Link</label>
                    <input type="text" name="liveLink" value={formData.liveLink} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="#" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">GitHub Repo Link</label>
                    <input type="text" name="repoLink" value={formData.repoLink} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="#" />
                 </div>
              </div>

              <div className="pt-6 flex gap-4 border-t border-gray-100 mt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-3 bg-gray-100 text-slate-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-colors">
                  <Save size={20} /> Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Project?"
        message="Are you sure you want to delete this project?"
      />
    </div>
  );
};

export default ManageProjects;
