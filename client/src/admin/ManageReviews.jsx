import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save, Star, Upload, Loader2 } from "lucide-react";
import { useData } from "../context/DataContext";
import axios from "axios";
import ConfirmationModal from "../components/ConfirmationModal";

const ManageReviews = () => {
  const { API_URL } = useData();
  const [reviews, setReviews] = useState([]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Ordering logic
  const [localItems, setLocalItems] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  // ✅ Changed role -> lastName in form state
  const [formData, setFormData] = useState({
    name: "", lastName: "", content: "", stars: 5, image: "", order: ""
  });

  const [imageFile, setImageFile] = useState(null); // File state
  const [isUploading, setIsUploading] = useState(false); // Uploading state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // --- CLOUDINARY UPLOAD FUNCTION ---
  const uploadToCloudinary = async () => {
    if (!imageFile) return formData.image; // Agar nayi file nahi hai, to purani image hi rakho

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "techerax"); // ✅ Apna Preset Name Dalein
    const cloudName = "dvl2mf2dv"; // ✅ Apna Cloud Name Dalein

    try {
      setIsUploading(true);
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data);
      setIsUploading(false);
      return res.data.secure_url; 
    } catch (error) {
      console.error("Upload Error:", error);
      setIsUploading(false);
      alert("Image upload failed!");
      return null;
    }
  };

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/reviews`);
      const sortedData = res.data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setReviews(sortedData);
      setLocalItems(sortedData);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [API_URL]);

  // Order Change Handler
  const handleOrderChange = (e, id) => {
    const newOrder = parseInt(e.target.value) || 0;
    const updatedList = localItems.map((item) => 
      item._id === id ? { ...item, order: newOrder } : item
    );
    setLocalItems(updatedList);
    setIsChanged(true);
  };

  const saveOrder = async () => {
    try {
      const payload = localItems.map(m => ({ _id: m._id, order: m.order }));
      await axios.put(`${API_URL}/reviews/reorder`, { items: payload });
      alert("Order Updated Successfully! 🎉");
      fetchReviews();
      setIsChanged(false);
    } catch (error) {
      alert("Failed to save order");
    }
  };

  // CRUD Handlers
  const openAddForm = () => {
    setEditingId(null);
    setFormData({ name: "", lastName: "", content: "", stars: 5, image: "", order: "" });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const openEditForm = (review) => {
    setEditingId(review._id);
    // Backend se 'role' aata hai, usse hum form me 'lastName' ki tarah dikhayenge
    setFormData({ ...review, lastName: review.role });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => { setDeleteId(id); setIsModalOpen(true); };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`${API_URL}/reviews/${deleteId}`);
      fetchReviews();
      setIsModalOpen(false);
    } catch (error) {
      alert("Error deleting review");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Upload Image First
    const imageUrl = await uploadToCloudinary();
    if (imageFile && !imageUrl) return; // Upload fail hua to ruk jao

    // Prepare Payload
    const payload = {
        ...formData,
        image: imageUrl,
        role: formData.lastName // Role field me Last Name save kar rahe hain
    };

    try {
      if (editingId) await axios.put(`${API_URL}/reviews/${editingId}`, payload);
      else await axios.post(`${API_URL}/reviews`, payload);
      
      fetchReviews();
      setIsFormOpen(false);
    } catch (error) {
      alert("Error saving review");
    }
  };

  return (
    <div className="relative pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Manage Reviews</h2>
        <div className="flex gap-3">
          {isChanged && (
            <button onClick={saveOrder} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 animate-pulse shadow-lg">
              <Save size={20} /> Save Order
            </button>
          )}
          <button onClick={openAddForm} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
            <Plus size={20} /> Add Review
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localItems.map((review) => (
          <div key={review._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative hover:shadow-md transition-shadow">
            
            {/* Order Input */}
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Ord</span>
                <input type="number" value={review.order || 0} onChange={(e) => handleOrderChange(e, review._id)} className="w-8 text-center bg-white border border-gray-300 rounded text-xs font-bold text-slate-800 focus:outline-none" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <img 
                src={review.image || `https://ui-avatars.com/api/?name=${review.name}`} 
                alt={review.name} 
                className="w-12 h-12 rounded-full object-cover border border-gray-200" 
                onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${review.name}`}
              />
              <div>
                <h3 className="font-bold text-slate-900">{review.name} {review.role}</h3>
                {/* <p className="text-xs text-blue-500 font-medium">{review.role}</p> */}
              </div>
            </div>

            <div className="flex gap-1 mb-3">
               {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < review.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
               ))}
            </div>

            <p className="text-slate-500 text-sm mb-6 flex-grow italic line-clamp-3">"{review.content}"</p>

            <div className="flex gap-3 mt-auto pt-4 border-t border-gray-50">
              <button onClick={() => openEditForm(review)} className="flex-1 py-2 rounded-lg border border-gray-200 text-slate-600 hover:bg-slate-50 flex justify-center items-center gap-2 text-sm font-medium"><Edit size={16} /> Edit</button>
              <button onClick={() => handleDeleteClick(review._id)} className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex justify-center items-center gap-2 text-sm font-medium"><Trash2 size={16} /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-800">{editingId ? "Edit Review" : "Add Review"}</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} className="text-gray-500" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">First Name</label>
                    <input required className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Last Name</label>
                    <input required className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} 
                    />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Content</label>
                <textarea required rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                    value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} 
                />
              </div>

              {/* ✅ IMAGE UPLOAD IN ADMIN */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">User Photo</label>
                
                {/* Show Preview if exists */}
                {formData.image && !imageFile && (
                    <img src={formData.image} alt="Preview" className="w-16 h-16 rounded-full object-cover mb-2 border" />
                )}

                <div className="relative border border-gray-300 rounded-lg bg-white p-2 flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg"><Upload size={20} className="text-gray-500"/></div>
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Stars (0-5)</label>
                    <input type="number" min="0" max="5" required className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={formData.stars} onChange={e => setFormData({...formData, stars: e.target.value})} 
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Order</label>
                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} placeholder="e.g. 1"
                    />
                 </div>
              </div>

              <div className="pt-4 flex gap-4 border-t border-gray-100 mt-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-3 bg-gray-100 text-slate-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" disabled={isUploading} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors">
                    {isUploading ? <><Loader2 className="animate-spin" /> Uploading...</> : <><Save size={20} /> Save Review</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} title="Delete Review?" message="Are you sure?" />
    </div>
  );
};

export default ManageReviews;
