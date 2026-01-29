import express from "express";
import { 
  createInquiry, 
  getInquiries, 
  deleteInquiry,
  updateInquiry
} from "../controllers/inquiryController.js";

const router = express.Router();

router.post("/", createInquiry); // Public (Contact Form)
router.get("/", getInquiries);   // Admin Dashboard
router.delete("/:id", deleteInquiry); // Admin Dashboard
router.put("/:id", updateInquiry); // Admin Dashboard - Update Inquiry Status

export default router;