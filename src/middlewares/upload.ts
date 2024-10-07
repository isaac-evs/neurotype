import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the folder to store files
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop(); // Get the file extension
    const timestamp = Date.now(); // Get the current timestamp
    cb(null, `${timestamp}.${ext}`); // Create a unique filename with timestamp and extension
  },
});

export default storage;
