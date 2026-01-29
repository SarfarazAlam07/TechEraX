import Stat from "../models/Stat.js";

export const getStats = async (req, res) => {
  try {
    const stats = await Stat.find();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStat = async (req, res) => {
  try {
    const newStat = new Stat(req.body);
    const savedStat = await newStat.save();
    res.status(201).json(savedStat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStat = async (req, res) => {
  try {
    const updatedStat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedStat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStat = async (req, res) => {
  try {
    await Stat.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Stat deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};