import { Router } from "express";
import {
  signup,
  login,
  getProfile,
  getUsers,
} from "../controllers/userController";
import { auth, authorize } from "../middlewares/auth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/home", auth, getProfile);
router.get("/", auth, authorize(["pro"]), getUsers);

export default router;
