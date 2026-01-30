import Blog from "../models/Blog.js";

// ✅ 1. Get Blogs (Sorted by Order)
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ order: 1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 2. BULK REORDER FUNCTION
export const updateBlogOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const promises = items.map((item) =>
      Blog.findByIdAndUpdate(item._id, { order: item.order })
    );
    await Promise.all(promises);
    res.status(200).json({ message: "Blogs reordered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
