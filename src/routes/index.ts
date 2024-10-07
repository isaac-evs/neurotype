import { Router } from "express";
import upload from "./../middlewares/upload";

const router = Router();

router.get("", (req, res) => {
  res.send("api works");
});

router.post("/upload", upload.single("file"), (req, res) => {
  // Log the uploaded file details
  if (req.file) {
    console.log("File uploaded successfully: ", req.file);
    res.json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } else {
    console.log("No file uploaded.");
    res.status(400).json({
      message: "No file uploaded",
    });
  }
});

export default router;
