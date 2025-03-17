import express from "express";
import {
  getAPi,
  login,
  signUp,
  updateProfile,
} from "../controllers/userController";
import upload from "../utils/upload";
const router = express.Router();

router.get("/", getAPi);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request (Validation error).
 */
router.post("/signup", signUp);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Unauthorized (Invalid credentials).
 */
router.post("/login", login);

/**
 * @swagger
 * /updateProfile/{id}:
 *   put:
 *     summary: Update user profile (with profile picture)
 *     description: Updates user profile details including optional profile picture upload.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Bad request (Validation error).
 *       404:
 *         description: User not found.
 */
router.put(
  "/updateProfile/:id",
  upload.single("profilePicture"),
  updateProfile
);

export default router;
