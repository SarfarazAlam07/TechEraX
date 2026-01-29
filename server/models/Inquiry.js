import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }, // Included in message in frontend, but better to keep separate if possible
  subject: { type: String }, // Mapped from 'Budget' in frontend
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Accepted", "Rejected"], 
    default: "Pending" 
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Inquiry", inquirySchema);