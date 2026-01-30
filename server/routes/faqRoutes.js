import express from "express";
import { 
  getFaqs, 
  createFaq, 
  updateFaq, 
  deleteFaq,
  updateFaqOrder // ✅ Import New Controller
} from "../controllers/faqController.js";

const router = express.Router();

router.get("/", getFaqs);
router.post("/", createFaq);

// ✅ REORDER ROUTE (Isse /:id se PEHLE rakhna zaroori hai)
router.put("/reorder", updateFaqOrder);

router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);

export default router;
