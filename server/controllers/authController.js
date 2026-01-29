import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Login (Check DB)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secretKey", { expiresIn: "1d" });
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create Initial Admin (One time setup route)
export const registerAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ email: req.body.email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Admin created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};