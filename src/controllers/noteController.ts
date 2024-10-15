/* Import Neccesary modules */
import { Response } from "express";
import Note, { INote } from "../models/noteModel";
import { AuthRequest } from "../middlewares/auth";

/* Create a New Note */
export const createNote = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { content, tags } = req.body;
    const note = new Note({
      user: req.user!._id,
      content,
      tags,
    });

    await note.save();

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: "Error Creaing Note", error });
  }
};

/* Get all notes */
export const getNotes = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const notes = await Note.find({ user: req.user!._id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

/* Get note */
export const getNote = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user!._id,
    });

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fecthing note", error });
  }
};

/* Update note */
export const updateNote = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { content, tags } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user!._id },
      { content, tags, updatedAt: new Date() },
      { new: true },
    );
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: "Error updating Note", error });
  }
};

/* Delete note */
export const deleteNote = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user!._id,
    });

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: "Error deleting Note", error });
  }
};

/* Delete all notes */
export const deleteAllNotes = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const result = await Note.deleteMany({ user: req.user!._id });
    if (result.deletedCount > 0) {
      res.status(200).json({
        message: `${result.deletedCount} notes deleted successfully.`,
      });
    } else {
      res.status(404).json({ message: "No notes found for this user." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting notes", error });
  }
};
