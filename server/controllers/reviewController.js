import Review from "../models/Review.js";

// Get All Reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Review (Public)
export const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Review (Admin)
export const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Review (Admin)
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bulk Reorder
export const updateReviewOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const promises = items.map((item) =>
      Review.findByIdAndUpdate(item._id, { order: item.order })
    );
    await Promise.all(promises);
    res.status(200).json({ message: "Reviews reordered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
