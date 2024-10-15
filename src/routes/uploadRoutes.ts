import { Router } from "express";
import upload from "../middlewares/upload";

const router = Router();

router.post("/", upload.single("image"), (req, res) => {
  if (req.file) {
    res.send("File uploaded successfully");
  } else {
    res.send("File not supported");
  }
});

export default router;
