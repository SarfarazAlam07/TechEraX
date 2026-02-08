import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g. CEO, Customer
  content: { type: String, required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
  image: { type: String, default: "" }, // Optional image URL
  order: { type: Number, default: 100 } // Sorting ke liye
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
