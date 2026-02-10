import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer, fileName) {
    try {
        console.log("🟡 Uploading to ImageKit...");
        const result = await imagekit.upload({
            file: buffer.toString("base64"), // ✅ Base64 wala working logic
            fileName: fileName || "image.jpg",
            folder: "/techerax_uploads"
        });
        console.log("🟢 Upload Success:", result.url);
        return result.url;
    } catch (error) {
        console.error("🔴 Upload Error:", error);
        throw error;
    }
}

export default uploadFile;