import { Router } from "express";
import userRoutes from "./userRoutes";
import uploadRoutes from "./uploadRoutes";
import noteRoutes from "./noteRoutes";

const router = Router();

/* Sub Routes */
router.use("/users", userRoutes);
router.use("/upload", uploadRoutes);
router.use("/notes", noteRoutes);

export default router;
