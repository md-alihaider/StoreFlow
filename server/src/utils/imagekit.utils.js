import imagekit from "../config/imagekit.js";

export const uploadToImageKit = async (file) => {
  const response = await imagekit.files.upload({
    file: file.buffer,
    fileName: file.originalname,
  });

  return response;
};
