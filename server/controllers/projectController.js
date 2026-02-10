import Project from "../models/Project.js";
import uploadFile from "../services/imageurl.js"; // ✅ ImageKit Service Import

// ✅ 1. Get Projects (Sorted by Order)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 2. Create Project (With Image Upload)
export const createProject = async (req, res) => {
  try {
    let imageUrl = req.body.image || ""; // Agar frontend se koi text URL aaya ho (backup)

    // ✅ Agar Multer se File aayi hai to ImageKit par upload karo
    if (req.file) {
        console.log("🟡 Uploading new file for Create...");
        imageUrl = await uploadFile(req.file.buffer, req.file.originalname);
    }

    const newProject = new Project({
        ...req.body,
        image: imageUrl // Final URL save karo
    });

    const savedProject = await newProject.save();
    console.log("🟢 Project Created:", savedProject.title);
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("🔴 Create Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// ✅ 3. Update Project (With Image Replacement Logic)
export const updateProject = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // ✅ Agar Edit karte waqt nayi file select ki gayi hai
    if (req.file) {
      console.log("🟡 Uploading replacement file for Update...");
      const imageUrl = await uploadFile(req.file.buffer, req.file.originalname);
      updateData.image = imageUrl; // Purani image URL ko nayi wali se replace karo
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Updated data wapas bhejo
    );

    console.log("🟢 Project Updated:", updatedProject.title);
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("🔴 Update Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// ✅ 4. Delete Project
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 5. Bulk Reorder Function
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
