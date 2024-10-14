import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { DotEnvConfig } from "../config/config";

cloudinary.config({
  cloud_name: DotEnvConfig.cloudinary.cloudName,
  api_key: DotEnvConfig.cloudinary.apiKey,
  api_secret: DotEnvConfig.cloudinary.apiSecret, // Click 'View API Keys' above to copy your API secret
});

export const uploadOnCloudinary = async LocalFilePath => {
  try {
    if (!LocalFilePath) return null;

    const uploadResult = await cloudinary.uploader
      .upload(LocalFilePath, {
        public_id: "image",
        resource_type: "image",
      })
      .catch(error => {
        console.log(error);
      });

    console.log(uploadResult);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url("image", {
      fetch_format: "auto",
      quality: "auto",
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url("image", {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    console.log(autoCropUrl);

    fs.unlinkSync(LocalFilePath);
    return optimizeUrl;
  } catch (error) {
    fs.unlinkSync(LocalFilePath);
    return null;
  }
};
