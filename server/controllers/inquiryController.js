import Inquiry from "../models/Inquiry.js";

// 1. Create Inquiry (For Contact Form)
export const createInquiry = async (req, res) => {
  try {
    const newInquiry = new Inquiry(req.body);
    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Get All Inquiries (For Admin Dashboard)
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ date: -1 }); // Latest pehle
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Delete Inquiry
export const deleteInquiry = async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Inquiry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};