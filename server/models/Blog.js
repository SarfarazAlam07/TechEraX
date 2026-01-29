import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  time: { type: String }, // e.g., "5 min read"
  image: { type: String, required: true },
  url: { type: String, required: true } // External link URL
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
