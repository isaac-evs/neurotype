import { Request } from "express";
import multer, { diskStorage, FileFilterCallback } from "multer";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/"); // Specicefy the folder to store files
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop()?.toLowerCase(); // Get the file extension
    const timestamp = new Date().getTime(); // Get the current timestamp
    cb(null, `${timestamp}.${ext}`); // Create a unique filename with timestamp and extension
  },
});

// Filter files to only allow images
const fileFilter = (
  req: Request,

  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const isValid = file.mimetype.startsWith("image/");
  cb(null, isValid);
};

const upload = multer({ storage, fileFilter: fileFilter });

export default upload;
