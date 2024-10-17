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


/**
 * @swagger
 * tags:
 *   - name: Notes
 *     description: Operations related to notes
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized, user must be logged in
 *       400:
 *         description: Error Creating Note
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized, user must be logged in
 *       500:
 *         description: Error fetching notes
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       200:
 *         description: The note data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized, user must be logged in
 *       404:
 *         description: Note not found
 *       500:
 *         description: Error fetching notes
 */

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: UserId
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *       - in: path
 *         name: Note Content
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Note'
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized, user must be logged in
 *       404:
 *         description: Note not found
 *       400:
 *         description: Error updating note
 */

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: Note id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       401:
 *         description: Unauthorized, user must be logged in
 *       404:
 *         description: Note not found
 *       400:
 *         description: Error Deleting Note
 */

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete all notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notes deleted successfully
 *       401:
 *         description: Unauthorized, user must be logged in
 *       500:
 *         description: Error deleting notes
 */