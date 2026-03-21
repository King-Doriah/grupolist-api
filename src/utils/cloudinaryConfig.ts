import { v2 as cloudinary } from "cloudinary";
import env from "./configs";

cloudinary.config({
  cloud_name: env.cloudName,
  api_key: env.cloudApiKey,
  api_secret: env.cloudApiSec,
});

export const uploadToCloudinary = (
  buffer: Buffer,
  filename: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "minhalista",
        public_id: `${Date.now()}-${filename.replace(/\.[^/.]+$/, "")}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
};

export default cloudinary;
