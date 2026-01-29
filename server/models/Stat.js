import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g., "Projects Delivered"
  value: { type: String, required: true }  // e.g., "100+"
}, { timestamps: true });

export default mongoose.model("Stat", statSchema);