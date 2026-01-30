import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['development', 'design', 'marketing'], 
    default: 'development' 
  },
  colorTheme: { type: String, default: 'bg-blue-600' },
  // ✅ Added Order Field
  order: { type: Number, default: 100 }
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
