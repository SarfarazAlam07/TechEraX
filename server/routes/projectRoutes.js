import express from "express";
import { 
  createProject, 
  deleteProject, 
  getProjects, 
  updateProject,
  updateProjectOrder // ✅ Import New Controller
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);

// ✅ REORDER ROUTE (Isse /:id se PEHLE rakhna zaroori hai)
router.put("/reorder", updateProjectOrder);

router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
