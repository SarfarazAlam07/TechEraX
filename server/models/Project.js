import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // Web, App, Design
  image: { type: String, required: true }, // URL string
  techStack: { type: String }, // Storing as String to match frontend input (e.g. "React, Node")
  liveLink: { type: String },
  repoLink: { type: String }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);