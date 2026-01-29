import express from "express";
import { 
  createInquiry, 
  getInquiries, 
  deleteInquiry 
} from "../controllers/inquiryController.js";

const router = express.Router();

router.post("/", createInquiry); // Public (Contact Form)
router.get("/", getInquiries);   // Admin Dashboard
router.delete("/:id", deleteInquiry); // Admin Dashboard

export default router;