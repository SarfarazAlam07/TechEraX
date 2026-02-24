import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save, Upload, Loader2, ExternalLink, Github } from "lucide-react";
import { useData } from "../context/DataContext";
import axios from "axios"; 
import ConfirmationModal from "../components/ConfirmationModal";

const ManageProjects = () => {
  const { projects, refreshData, API_URL } = useData();
   
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [localItems, setLocalItems] = useState([]); 
  const [isChanged, setIsChanged] = useState(false);

  const [formData, setFormData] = useState({
    title: "", category: "Web", image: "", techStack: "", liveLink: "", repoLink: "", order: ""
  });

  // Image states
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // --- IMAGEKIT UPLOAD ---
  const uploadToImageKit = async () => {
    if (!imageFile) return formData.image; 
    const data = new FormData();
    data.append("file", imageFile);
    try {
      setIsUploading(true);
      const res = await axios.post(`${API_URL}/upload`, data, { headers: { "Content-Type": "multipart/form-data" } });
      setIsUploading(false);
      return res.data.url;
    } catch (error) {
      console.error("Upload Error:", error);
      setIsUploading(false);
      alert("Image upload failed!");
      return null;
    }
  };

  useEffect(() => {
    const sortedProjects = [...projects].sort((a, b) => (a.order || 0) - (b.order || 0));
    setLocalItems(sortedProjects);
    setIsChanged(false);
  }, [projects]);

  const handleOrderChange = (e, id) => {
    const newOrder = parseInt(e.target.value) || 0;
    const updatedList = localItems.map((item) => item._id === id ? { ...item, order: newOrder } : item);
    setLocalItems(updatedList);
    setIsChanged(true);
  };

  const saveOrder = async () => {
    try {
      const payload = localItems.map(m => ({ _id: m._id, order: m.order }));
      await axios.put(`${API_URL}/projects/reorder`, { items: payload });
      alert("Order Updated Successfully! 🎉");
      refreshData();
      setIsChanged(false);
    } catch (error) {
      alert("Failed to save order.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ title: "", category: "Web", image: "", techStack: "", liveLink: "", repoLink: "", order: "" });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const openEditForm = (project) => {
    setEditingId(project._id);
    setFormData(project);
    setImageFile(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => { setDeleteId(id); setIsModalOpen(true); };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${API_URL}/projects/${deleteId}`);
      refreshData(); 
      setIsModalOpen(false); 
      setDeleteId(null);
    } catch (error) {
      alert("Error deleting project!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadToImageKit();
    if (imageFile && !imageUrl) return;

    const payload = { ...formData, image: imageUrl };

    try {
      if (editingId) await axios.put(`${API_URL}/projects/${editingId}`, payload);
      else await axios.post(`${API_URL}/projects`, payload);
      refreshData();
      setIsFormOpen(false);
    } catch (error) {
      alert("Failed to save project.");
    }
  };

  return (
    <div className="relative pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Manage Projects</h2>
        <div className="flex gap-3">
             {isChanged && (
                <button onClick={saveOrder} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 animate-pulse shadow-lg">
                <Save size={20} /> Save Order
                </button>
            )}
            <button onClick={openAddForm} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
            <Plus size={20} /> Add Project
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localItems.length === 0 ? <p className="text-gray-500">No projects found.</p> : localItems.map((project) => (
          <div key={project._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow relative">
            <div className="relative h-48 bg-gray-100">
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-lg border border-gray-200 shadow-sm z-10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Ord</span>
                    <input type="number" value={project.order || 0} onChange={(e) => handleOrderChange(e, project._id)} className="w-8 text-center bg-white border border-gray-300 rounded text-xs font-bold text-slate-800 focus:outline-none" />
                </div>
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide text-white">
                {project.category}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
              <p className="text-slate-500 text-sm mb-4"><span className="font-semibold text-slate-700">Tech:</span> {project.techStack}</p>
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

      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-800">{editingId ? "Edit Project" : "Add New Project"}</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} className="text-gray-500" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Project Title</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="Web">Web Development</option>
                    <option value="App">App Development</option>
                    <option value="Design">UI/UX Design</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Project Image</label>
                {formData.image && !imageFile && (
                    <img src={formData.image} alt="Preview" className="h-20 w-32 object-cover rounded-lg mb-2 border" />
                )}
                <div className="relative border border-gray-300 rounded-lg bg-white p-2 flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg"><Upload size={20} className="text-gray-500"/></div>
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tech Stack</label>
                  <input type="text" name="techStack" required value={formData.techStack} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Display Order</label>
                  <input type="number" name="order" value={formData.order} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 1" />
                </div>
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
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-3 bg-gray-100 text-slate-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" disabled={isUploading} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors">
                  {isUploading ? <><Loader2 className="animate-spin" /> Uploading...</> : <><Save size={20} /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} title="Delete Project?" message="Are you sure?" />
    </div>
  );
};

export default ManageProjects;