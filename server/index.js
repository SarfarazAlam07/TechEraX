// server/index.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Config Environment Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// Middleware
app.use(cors()); // Allows frontend to access backend
app.use(express.json()); // Parses incoming JSON requests

// Test Route
app.get('/', (req, res) => {
  res.send('TechEraX Server is Running with ES Modules! 🚀');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});