import express from "express";
import { loginUser, registerAdmin } from "../controllers/authController.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerAdmin); // Use POSTMAN to create first admin

export default router;