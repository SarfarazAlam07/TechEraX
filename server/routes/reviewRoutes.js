import express from "express";
import { getReviews, createReview, updateReview, deleteReview, updateReviewOrder } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", createReview);
router.put("/reorder", updateReviewOrder); // Bulk Order
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
