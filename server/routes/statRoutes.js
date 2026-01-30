import express from "express";
import { 
  getStats, 
  createStat, 
  updateStat, 
  deleteStat,
  updateStatOrder // ✅ Import New Controller
} from "../controllers/statController.js";

const router = express.Router();

router.get("/", getStats);
router.post("/", createStat);

// ✅ REORDER ROUTE (Isse /:id se PEHLE rakhna zaroori hai)
router.put("/reorder", updateStatOrder);

router.put("/:id", updateStat);
router.delete("/:id", deleteStat);

export default router;
