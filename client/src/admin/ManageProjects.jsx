import React, { useState } from "react";
import { 
  Plus, Edit, Trash2, X, Save, 
  Image as ImageIcon, ExternalLink, Github 
} from "lucide-react";
import { useData } from "../context/DataContext";
import axios from "axios"; 
// ✅ Import Modal
import ConfirmationModal from "../components/ConfirmationModal";

const ManageProjects = () => {
  // Global Data se projects aur refreshData nikala
  const { projects, refreshData, API_URL } = useData();
   
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "Web",
    image: "",
    techStack: "",
    liveLink: "",
    repoLink: ""
  });

  // --- MODAL STATE (Naya Code) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Handle Input
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open Form for Add
  const openAddForm = () => {
    setEditingId(null);
    setFormData({ title: "", category: "Web", image: "", techStack: "", liveLink: "", repoLink: "" });
    setIsFormOpen(true);
  };

  // Open Form for Edit
  const openEditForm = (project) => {
    setEditingId(project._id); // MongoDB _id use karta hai
    setFormData(project);
    setIsFormOpen(true);
  };

  // ✅ 1. Trigger Modal (Jab Delete button dabega)
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  // ✅ 2. Actual Delete Logic (Jab user "Yes" bolega)
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`${API_URL}/projects/${deleteId}`);
      refreshData(); // List Refresh karo
      setIsModalOpen(false); // Close Modal
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project!");
    }
  };

  // --- API SUBMIT (Create & Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update Existing Project
        await axios.put(`${API_URL}/projects/${editingId}`, formData);
      } else {
        // Create New Project
        await axios.post(`${API_URL}/projects`, formData);
      }
      refreshData(); // Server se naya data lao
      setIsFormOpen(false); // Modal band karo
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project.");
    }
  };

  return (
    <div className="relative pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Manage Projects</h2>
        <button 
          onClick={openAddForm} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
        >
          <Plus size={20} /> Add Project
        </button>
      </div>

      {/* --- PROJECTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? <p className="text-gray-500">No projects found.</p> : projects.map((project) => (
          <div key={project._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="relative h-48 bg-gray-100">
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
                {/* ✅ Delete Button Ab Modal Trigger Karega */}
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

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Image URL</label>
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

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tech Stack</label>
                <input 
                  type="text" name="techStack" required
                  value={formData.techStack} onChange={handleInputChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
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

      {/* ✅ CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Project?"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );
};

export default ManageProjects;
