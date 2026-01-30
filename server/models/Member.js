import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  portfolioLink: { type: String },
  socials: {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" }
  },
  // ✅ Added Order Field
  order: { type: Number, default: 100 }
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);
