import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { DotEnvConfig } from "../config/config.js";

cloudinary.config({
  cloud_name: DotEnvConfig.cloudinary.cloudName,
  api_key: DotEnvConfig.cloudinary.apiKey,
  api_secret: DotEnvConfig.cloudinary.apiSecret,
});

const uploadOnCloudinary = async localFilePath => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
