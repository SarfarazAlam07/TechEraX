import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import Routes
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import statRoutes from './routes/statRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import authRoutes from './routes/authRoutes.js'
import reviewRoutes from "./routes/reviewRoutes.js";

// Config
dotenv.config();
connectDB(); // Database se connect karo

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*" 
}));
app.use(express.json()); // JSON data padhne ke liye

// --- API ROUTES ---
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/reviews", reviewRoutes);
// Test Route
app.get('/', (req, res) => {
  res.send('TechEraX Server & API is Running! 🚀');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
