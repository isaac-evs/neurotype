import { Router } from "express";
import upload from "./../middlewares/upload";
import {
  signup,
  login,
  getProfile,
  getUsers,
} from "../controllers/userController";
import { auth, authorize } from "../middlewares/auth";

const router = Router();

/* User Routes*/
router.post("/signup", signup);
router.post("/login", login);
router.get("/home", auth, getProfile);
router.get("/", auth, authorize(["pro"]), getUsers);

/* Upload Image */
router.post("/upload", upload.single("image"), (req, res) => {
  // Log the uploaded filedetails
  if (req.file) {
    res.send("File uploaded succesfully");
  } else {
    res.send("File not supported");
  }
});

export default router;
