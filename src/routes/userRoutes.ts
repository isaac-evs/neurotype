import { Router } from "express";
import {
  signup,
  login,
  getProfile,
  getUsers,
} from "../controllers/userController";
import { auth, authorize } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to users
 */


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Users]
 *     description: Create a new user account, with the folowing fields name, email, password, and optional the role that can be lite, plus or pro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: "John Doe"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "Pass@123"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email
 *                 example: "john.doe@example.com"
 *               role:
 *                 type: string
 *                 description: The user's role (optional)
 *                 example: "lite"
 *             required:
 *               - name
 *               - password
 *               - email
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request, missing required fields
 */


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login into account
 *     tags: [Users]
 *     description: Log in into user account by providing the email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "Pass@123"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User logged successfully
 *       400:
 *         description: Invalid login credentials
 */


/**
 * @swagger
 * /home:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Users]  
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: User profile information, auth by token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's unique identifier
 *                   example: "60f71b9f1e8a4b00177628c7"
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user's email
 *                   example: "john.doe@example.com"
 *                 role:
 *                   type: string
 *                   description: The user's role
 *                   example: "admin"
 *       401:
 *         description: Not authenticated
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all user's profile
 *     tags: [Users]  
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Get all the user'a profile information is you have the role PRO and need to have a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user's email
 *                   example: "john.doe@example.com"
 *                 role:
 *                   type: string
 *                   description: The user's role
 *                   example: "admin"
 *       500:
 *         description: Error fetching users
 */

router.post("/signup", signup);
router.post("/login", login);
router.get("/home", auth, getProfile);
router.get("/", auth, authorize(["pro"]), getUsers);

export default router;
