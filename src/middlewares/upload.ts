import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/"); // Specify the folder to store files
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop(); // Get the file extension
    const timestamp = Date.now(); // Get the current timestamp
    cb(null, `${timestamp}.${ext}`); // Create a unique filename with timestamp and extension
  },
});

const upload = multer({ storage });

export default upload;
