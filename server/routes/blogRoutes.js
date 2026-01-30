import express from "express";
import { 
  getBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog,
  updateBlogOrder // ✅ Import New Controller
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);

// ✅ REORDER ROUTE (Isse /:id se PEHLE rakhna zaroori hai)
router.put("/reorder", updateBlogOrder);

router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
