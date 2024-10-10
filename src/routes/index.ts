import { Router } from "express";
import upload from "./../middlewares/upload";

const router = Router();

router.get("", (req, res) => {
  res.send("api works");
});

router.post("/upload", upload.single("file"), (req, res) => {
  // Log the uploaded filedetails
  if (req.file) {
    res.send("File uploaded succesfully");
  } else {
    res.send("File not supported");
  }
});

export default router;
