import express from "express";
import { 
  createProject, 
  deleteProject, 
  getProjects, 
  updateProject 
} from "../controllers/projectController.js";

const router = express.Router();

// http://localhost:5000/api/projects
router.get("/", getProjects);
router.post("/", createProject);

// http://localhost:5000/api/projects/:id
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;