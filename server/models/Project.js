import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  techStack: { type: String },
  liveLink: { type: String },
  repoLink: { type: String },
  // ✅ Added Order Field
  order: { type: Number, default: 100 }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
