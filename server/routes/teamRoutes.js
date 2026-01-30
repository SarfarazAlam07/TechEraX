import express from "express";
import { 
  getMembers, 
  createMember, 
  updateMember, 
  deleteMember,
  updateMemberOrder // ✅ Import New Controller
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getMembers);
router.post("/", createMember);

// ✅ REORDER ROUTE (Isse /:id se PEHLE rakhna zaroori hai)
router.put("/reorder", updateMemberOrder);

router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;
