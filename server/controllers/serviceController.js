import Service from "../models/Service.js";

// ✅ 1. Get Services (Sorted by Order)
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 2. BULK REORDER FUNCTION (New)
export const updateServiceOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const promises = items.map((item) =>
      Service.findByIdAndUpdate(item._id, { order: item.order })
    );
    await Promise.all(promises);
    res.status(200).json({ message: "Services reordered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
