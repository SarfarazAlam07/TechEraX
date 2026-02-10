import Project from "../models/Project.js";
import uploadFile from "../services/imageurl.js";

// ✅ 1. Get Projects (Sorted by Order)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
try {
    let imageUrl = req.body.image || ""; 

    // ✅ Agar File aayi hai to Upload karo
    if (req.file) {
        imageUrl = await uploadFile(req.file.buffer, req.file.originalname);
    }

    const newProject = new Project({
        ...req.body,
        image: imageUrl // Final URL save karo
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Create Error:", error);
    res.status(400).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 2. BULK REORDER FUNCTION
export const updateProjectOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const promises = items.map((item) =>
      Project.findByIdAndUpdate(item._id, { order: item.order })
    );
    await Promise.all(promises);
    res.status(200).json({ message: "Projects reordered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
