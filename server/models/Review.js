import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  // ✅ Change: min 0 kar diya
  stars: { type: Number, required: true, min: 0, max: 5 }, 
  image: { type: String, default: "" },
  order: { type: Number, default: 100 }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
