import React, { useState } from "react";
import { Plus, Edit, Trash2, X, Save, Clock, HelpCircle } from "lucide-react";
import { useData } from "../context/DataContext";
import ConfirmationModal from "../components/ConfirmationModal";
import axios from "axios"; // ✅ Import Axios

const ManageBlogs = () => {
  // ❌ setBlogs ki zaroorat nahi kyunki hum API call karke refreshData karenge
  const { blogs, refreshData, API_URL } = useData();
  
  const [activeTab, setActiveTab] = useState("posts");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Local FAQs (Backend se connected nahi hain abhi)
  const [faqs, setFaqs] = useState([
    { id: 1, question: "How long does it take?", answer: "2-4 weeks usually." },
  ]);

  const [postForm, setPostForm] = useState({
    title: "",
    category: "Development",
    time: "",
    image: "",
    url: "",
  });
  const [faqForm, setFaqForm] = useState({ question: "", answer: "" });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
    });
    setFaqForm({ question: "", answer: "" });
    setIsFormOpen(true);
  };

  // ✅ Trigger Modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const openEditForm = (item) => {
    setEditingId(item._id || item.id);
    if (activeTab === "posts") setPostForm(item);
    else setFaqForm(item);
    setIsFormOpen(true);
  };

  // ✅ Confirm Logic (Backend API Call Fix)
  const confirmDelete = async () => {
    if (activeTab === "posts") {
      try {
        // 🛠️ FIX: Local state update karne ki jagah Server se delete karo
        await axios.delete(`${API_URL}/blogs/${deleteId}`);
        refreshData(); // List refresh
      } catch (error) {
        console.error("Delete failed", error);
        alert("Failed to delete blog post.");
      }
    } else {
      // FAQs abhi local hain, to local state update sahi hai
      setFaqs(faqs.filter(f => f.id !== deleteId));
    }
    setIsModalOpen(false);
    setDeleteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === "posts") {
      try {
        if (editingId) {
          // ✅ UPDATE BLOG (API)
          await axios.put(`${API_URL}/blogs/${editingId}`, postForm);
        } else {
          // ✅ CREATE BLOG (API)
          await axios.post(`${API_URL}/blogs`, postForm);
        }
        refreshData();
        setIsFormOpen(false);
      } catch (error) {
        alert("Error saving blog");
      }
    } else {
      // Local FAQ logic
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
        <button
          onClick={openAddForm}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
        >
          <Plus size={20} /> Add {activeTab === "posts" ? "Post" : "FAQ"}
        </button>
      </div>

      {activeTab === "posts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
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
                  {/* 🛠️ FIX: Function name corrected (handleDelete -> handleDeleteClick) */}
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
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="text-blue-500 w-5 h-5 flex-shrink-0" />
                  <h3 className="font-bold text-slate-800 text-lg">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pl-7">
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
                {/* 🛠️ FIX: Function name corrected here too */}
                <button
                  onClick={() => handleDeleteClick(faq.id)}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 size={18}/>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g. 5 min read"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      Image URL
                    </label>
                    <input
                      name="image"
                      value={postForm.image}
                      onChange={(e) => handleInputChange(e, "post")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      External URL
                    </label>
                    <input
                      name="url"
                      value={postForm.url}
                      onChange={(e) => handleInputChange(e, "post")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                      rows="4"
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
                  <Save size={20} /> Save
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
        message={`Are you sure you want to delete this ${activeTab === 'posts' ? 'Post' : 'FAQ'}?`}
      />
    </div>
  );
};

export default ManageBlogs;

