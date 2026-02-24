import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer"; // ✅ Direct library import
import { 
  createProject, 
  deleteProject, 
  getProjects, 
  updateProject, 
  updateProjectOrder 
} from "../controllers/projectController.js";

const router = express.Router();

// --- 1. MULTER CONFIGURATION (Hardcoded Here) ---
// Hum memory storage use karenge taaki file buffer me mile
const storage = multer.memoryStorage();

// File Filter: Sirf images allow karo
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
    fileFilter: fileFilter
});

// --- 2. DEBUGGING MIDDLEWARE ---
// Ye check karega ki frontend se header sahi aa raha hai ya nahi
const debugMiddleware = (req, res, next) => {
    console.log("---------------------------------------");
    console.log("📢 REQUEST HIT: ", req.method, req.originalUrl);
    console.log("📨 Content-Type Header:", req.headers['content-type']);
    next();
};

// --- ROUTES ---

router.get("/", getProjects);

// ✅ CREATE ROUTE
router.post(
    "/", 
    protect,
    debugMiddleware,          // Step 1: Check Headers
    upload.single('image'),   // Step 2: Parse File & Text (Field name 'image' hona chahiye)
    (req, res, next) => {     // Step 3: Check if parsing worked
        console.log("✅ Multer Parsed Data:");
        console.log("📝 Body (Text):", req.body);
        console.log("📂 File:", req.file ? "Found" : "Missing");
        next();
    },
    createProject             // Step 4: Final Controller
);

router.put("/reorder",protect, updateProjectOrder);

// ✅ UPDATE ROUTE
router.put(
    "/:id", 
    protect,
    debugMiddleware,
    upload.single('image'),
    updateProject
);

router.delete("/:id",protect, deleteProject);

export default router;