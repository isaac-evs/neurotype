import { Router } from "express";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  deleteAllNotes,
} from "../controllers/noteController";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/", auth, createNote);
router.get("/", auth, getNotes);
router.get("/:id", auth, getNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);
router.delete("/", auth, deleteAllNotes);

export default router;
