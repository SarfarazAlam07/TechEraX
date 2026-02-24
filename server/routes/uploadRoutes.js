import express from 'express';
import multer from 'multer';
import ImageKit from 'imagekit';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Multer ko memory me file rakhne ke liye set karein
const upload = multer({ storage: multer.memoryStorage() });

// ImageKit configuration
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// POST /api/upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ImageKit par upload kar rahe hain
    const response = await imagekit.upload({
      file: req.file.buffer, // Multer se buffer array
      fileName: req.file.originalname,
      folder: "/techerax_uploads" // Is folder me images jayengi
    });

    // Frontend ko URL bhej do
    res.status(200).json({ url: response.url });
  } catch (error) {
    console.error("ImageKit Upload Error:", error);
    res.status(500).json({ message: "Image upload failed", error });
  }
});

export default router;