import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  section: { 
    type: String, 
    enum: ['about', 'blog', 'contact'], 
    default: 'about' 
  }
}, { timestamps: true });

export default mongoose.model("Faq", faqSchema);
