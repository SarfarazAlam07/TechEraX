import express from "express";
import { 
  getServices, 
  createService, 
  updateService, 
  deleteService,
  updateServiceOrder // ✅ Import New Controller
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", createService);

// ✅ REORDER ROUTE (Isse /:id se PEHLE rakhna zaroori hai)
router.put("/reorder", updateServiceOrder);

router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
