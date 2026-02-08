import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save, Star, User, MessageSquare } from "lucide-react";
import { useData } from "../context/DataContext";
import axios from "axios";
import ConfirmationModal from "../components/ConfirmationModal";

const ManageReviews = () => {
  const { API_URL } = useData();
  const [reviews, setReviews] = useState([]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Ordering logic same as other pages
  const [localItems, setLocalItems] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  const [formData, setFormData] = useState({
    name: "", role: "", content: "", stars: 5, image: "", order: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
      alert("Order Updated!");
      fetchReviews();
      setIsChanged(false);
    } catch (error) {
      alert("Failed to save order");
    }
  };

  // CRUD Handlers
  const openAddForm = () => {
    setEditingId(null);
    setFormData({ name: "", role: "", content: "", stars: 5, image: "", order: "" });
    setIsFormOpen(true);
  };

  const openEditForm = (review) => {
    setEditingId(review._id);
    setFormData(review);
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
    try {
      if (editingId) await axios.put(`${API_URL}/reviews/${editingId}`, formData);
      else await axios.post(`${API_URL}/reviews`, formData);
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
            <button onClick={saveOrder} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 animate-pulse">
              <Save size={20} /> Save Order
            </button>
          )}
          <button onClick={openAddForm} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700">
            <Plus size={20} /> Add Review
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localItems.map((review) => (
          <div key={review._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative">
            
            {/* Order Input */}
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Ord</span>
                <input type="number" value={review.order || 0} onChange={(e) => handleOrderChange(e, review._id)} className="w-8 text-center bg-white border border-gray-300 rounded text-xs font-bold focus:outline-none" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <img src={review.image || `https://ui-avatars.com/api/?name=${review.name}`} alt={review.name} className="w-12 h-12 rounded-full object-cover border" />
              <div>
                <h3 className="font-bold text-slate-900">{review.name}</h3>
                <p className="text-xs text-blue-500">{review.role}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-3">
               {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < review.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
               ))}
            </div>

            <p className="text-slate-500 text-sm mb-6 flex-grow italic">"{review.content}"</p>

            <div className="flex gap-3 mt-auto pt-4 border-t border-gray-50">
              <button onClick={() => openEditForm(review)} className="flex-1 py-2 rounded-lg border hover:bg-slate-50 flex justify-center items-center gap-2 text-sm"><Edit size={16} /> Edit</button>
              <button onClick={() => handleDeleteClick(review._id)} className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex justify-center items-center gap-2 text-sm"><Trash2 size={16} /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingId ? "Edit Review" : "Add Review"}</h3>
              <button onClick={() => setIsFormOpen(false)}><X size={24} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-bold block mb-1">Name</label><input required className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                <div><label className="text-sm font-bold block mb-1">Role</label><input required className="w-full border p-2 rounded" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} /></div>
              </div>
              <div><label className="text-sm font-bold block mb-1">Content</label><textarea required rows="3" className="w-full border p-2 rounded" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} /></div>
              <div><label className="text-sm font-bold block mb-1">Image URL</label><input className="w-full border p-2 rounded" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                 <div><label className="text-sm font-bold block mb-1">Stars (1-5)</label><input type="number" min="1" max="5" required className="w-full border p-2 rounded" value={formData.stars} onChange={e => setFormData({...formData, stars: e.target.value})} /></div>
                 <div><label className="text-sm font-bold block mb-1">Order</label><input type="number" className="w-full border p-2 rounded" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} /></div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">Save Review</button>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} title="Delete Review?" message="Are you sure?" />
    </div>
  );
};

export default ManageReviews;
