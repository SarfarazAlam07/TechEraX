import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Clock,
  HelpCircle,
  Upload,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useData } from "../context/DataContext";
import ConfirmationModal from "../components/ConfirmationModal";
import axios from "axios";

const ManageBlogs = () => {
  const { blogs, refreshData, API_URL } = useData();

  const [activeTab, setActiveTab] = useState("posts");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How long does it take?",
      answer: "2-4 weeks usually.",
      order: 1,
    },
  ]);

  const [localItems, setLocalItems] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  const [postForm, setPostForm] = useState({
    title: "",
    category: "Development",
    time: "",
    image: "",
    url: "",
    order: "",
  });
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    order: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // --- IMAGEKIT UPLOAD ---
  const uploadToImageKit = async () => {
    if (!imageFile) return postForm.image;
    const data = new FormData();
    data.append("file", imageFile);
    try {
      setIsUploading(true);
      const res = await axios.post(`${API_URL}/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
    const data = activeTab === "posts" ? blogs : faqs;
    const sortedData = [...data].sort(
      (a, b) => (a.order || 0) - (b.order || 0),
    );
    setLocalItems(sortedData);
    setIsChanged(false);
  }, [blogs, faqs, activeTab]);

  const handleOrderChange = (e, id) => {
    const newOrder = parseInt(e.target.value) || 0;
    const updatedList = localItems.map((item) => {
      const itemId = item._id || item.id;
      return itemId === id ? { ...item, order: newOrder } : item;
    });
    setLocalItems(updatedList);
    setIsChanged(true);
  };

  const saveOrder = async () => {
    try {
      if (activeTab === "posts") {
        const payload = localItems.map((m) => ({ _id: m._id, order: m.order }));
        await axios.put(`${API_URL}/blogs/reorder`, { items: payload });
        refreshData();
      } else {
        setFaqs(localItems);
      }
      alert("Order Updated Successfully! 🎉");
      setIsChanged(false);
    } catch (error) {
      alert("Failed to save order.");
    }
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "post") setPostForm({ ...postForm, [name]: value });
    else setFaqForm({ ...faqForm, [name]: value });
  };

  const openAddForm = () => {
    setEditingId(null);
    setPostForm({
      title: "",
      category: "Development",
      time: "",
      image: "",
      url: "",
      order: "",
    });
    setFaqForm({ question: "", answer: "", order: "" });
    setImageFile(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const openEditForm = (item) => {
    setEditingId(item._id || item.id);
    if (activeTab === "posts") {
      setPostForm(item);
    } else {
      setFaqForm(item);
    }
    setImageFile(null);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (activeTab === "posts") {
      try {
        await axios.delete(`${API_URL}/blogs/${deleteId}`);
        refreshData();
      } catch (error) {
        alert("Failed to delete blog post.");
      }
    } else {
      setFaqs(faqs.filter((f) => f.id !== deleteId));
    }
    setIsModalOpen(false);
    setDeleteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === "posts") {
      const imageUrl = await uploadToImageKit();
      if (imageFile && !imageUrl) return;

      const payload = { ...postForm, image: imageUrl };

      try {
        if (editingId)
          await axios.put(`${API_URL}/blogs/${editingId}`, payload);
        else await axios.post(`${API_URL}/blogs`, payload);
        refreshData();
        setIsFormOpen(false);
      } catch (error) {
        alert("Error saving blog");
      }
    } else {
      if (editingId)
        setFaqs(
          faqs.map((f) =>
            f.id === editingId ? { ...faqForm, id: editingId } : f,
          ),
        );
      else setFaqs([...faqs, { ...faqForm, id: Date.now() }]);
      setIsFormOpen(false);
    }
  };

  return (
    <div className="relative pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-slate-800">Manage Blog Page</h2>

        <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === "posts" ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
          >
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab("faqs")}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === "faqs" ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
          >
            Blog FAQs
          </button>
        </div>

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
            <Plus size={20} /> Add {activeTab === "posts" ? "Post" : "FAQ"}
          </button>
        </div>
      </div>

      {activeTab === "posts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localItems.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow relative"
            >
              <div className="relative h-48 bg-gray-100">
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-lg border border-gray-200 shadow-sm z-10">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    Ord
                  </span>
                  <input
                    type="number"
                    value={post.order || 0}
                    onChange={(e) => handleOrderChange(e, post._id)}
                    className="w-8 text-center bg-white border border-gray-300 rounded text-xs font-bold text-slate-800 focus:outline-none"
                  />
                </div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-slate-800">
                  {post.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <Clock size={14} /> {post.time}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2">
                  {post.title}
                </h3>
                <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => openEditForm(post)}
                    className="py-2 px-4 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 flex items-center justify-center gap-2"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post._id)}
                    className="py-2 px-4 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "faqs" && (
        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          {localItems.map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex flex-col items-center justify-center bg-gray-50 px-1 py-1 rounded border border-gray-200 h-full">
                    <span className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-1">
                      Ord
                    </span>
                    <input
                      type="number"
                      value={faq.order || 0}
                      onChange={(e) => handleOrderChange(e, faq.id)}
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
                  onClick={() => handleDeleteClick(faq.id)}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="text-xl font-bold text-slate-800">
                {editingId ? "Edit" : "Add New"}{" "}
                {activeTab === "posts" ? "Blog Post" : "FAQ"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {activeTab === "posts" ? (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Blog Title
                    </label>
                    <input
                      name="title"
                      value={postForm.title}
                      onChange={(e) => handleInputChange(e, "post")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Category
                    </label>
                    <input
                      name="category"
                      value={postForm.category}
                      onChange={(e) => handleInputChange(e, "post")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Read Time
                    </label>
                    <input
                      name="time"
                      value={postForm.time}
                      onChange={(e) => handleInputChange(e, "post")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. 5 min read"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Display Order
                    </label>
                    <input
                      name="order"
                      type="number"
                      value={postForm.order}
                      onChange={(e) => handleInputChange(e, "post")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. 1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Cover Image
                    </label>
                    {postForm.image && !imageFile && (
                      <img
                        src={postForm.image}
                        alt="Preview"
                        className="h-20 w-32 object-cover rounded-lg mb-2 border"
                      />
                    )}
                    <div className="relative border border-gray-300 rounded-lg bg-white p-2 flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <Upload size={20} className="text-gray-500" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      External URL
                    </label>
                    <input
                      name="url"
                      value={postForm.url}
                      onChange={(e) => handleInputChange(e, "post")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
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
                      name="question"
                      value={faqForm.question}
                      onChange={(e) => handleInputChange(e, "faq")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Answer
                    </label>
                    <textarea
                      name="answer"
                      value={faqForm.answer}
                      onChange={(e) => handleInputChange(e, "faq")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      required
                      rows="4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Display Order
                    </label>
                    <input
                      name="order"
                      type="number"
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
                  className="flex-1 py-3 bg-gray-100 text-slate-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={20} /> Save
                    </>
                  )}
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
        title="Delete Item?"
        message={`Are you sure you want to delete this ${activeTab === "posts" ? "Post" : "FAQ"}?`}
      />
    </div>
  );
};

export default ManageBlogs;
