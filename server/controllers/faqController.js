import Faq from "../models/Faq.js";

// ✅ 1. Get FAQs (Sorted by Order)
export const getFaqs = async (req, res) => {
  try {
    const { section } = req.query;
    const query = section ? { section } : {}; 
    const faqs = await Faq.find(query).sort({ order: 1 });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFaq = async (req, res) => {
  try {
    const newFaq = new Faq(req.body);
    const savedFaq = await newFaq.save();
    res.status(201).json(savedFaq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFaq = async (req, res) => {
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedFaq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Faq deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 2. BULK REORDER FUNCTION (New)
export const updateFaqOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const promises = items.map((item) =>
      Faq.findByIdAndUpdate(item._id, { order: item.order })
    );
    await Promise.all(promises);
    res.status(200).json({ message: "FAQs reordered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
