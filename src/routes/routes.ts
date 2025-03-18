import express from "express";
import {
  getAPi,
  login,
  signUp,
  updateProfile,
} from "../controllers/userController";
import upload from "../utils/upload";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest";
import { verifyAdmin } from "../utils/verifyAdmin";
import {
  createLocation,
  deleteLocationById,
  getLocation,
  getLocationById,
} from "../controllers/locationControllers";
import {
  createLanuage,
  deleteLanuage,
  getLanguageById,
  getLanguages,
} from "../controllers/languageControllers";
import {
  createGenres,
  deleteGenres,
  getGenres,
  getGenresById,
} from "../controllers/genresControllers";
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

router.get("/admin-dashboard", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

//location API

/**
 * @swagger
 * /getLocation:
 *   get:
 *     summary: Retrieve all locations
 *     description: Fetches a list of all locations
 *     responses:
 *       200:
 *         description: List of locations retrieved successfully
 */

/**
 * @swagger
 * /createLocation:
 *   post:
 *     summary: Create a new location
 *     description: Creates a location with an optional city icon upload
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New York"
 *               cityIcon:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Location created successfully
 */

/**
 * @swagger
 * /getLocationById/{id}:
 *   get:
 *     summary: Get location by ID
 *     description: Retrieves details of a specific location by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location details retrieved successfully
 *       404:
 *         description: Location not found
 */

/**
 * @swagger
 * /deleteLocationById/{id}:
 *   delete:
 *     summary: Delete a location
 *     description: Deletes a specific location by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 */

/**
 * @swagger
 * tags:
 *   - name: Language
 *     description: Language management APIs
 *   - name: Genre
 *     description: Genre management APIs
 */

/**
 * @swagger
 * /getLanguages:
 *   get:
 *     summary: Get all languages
 *     tags: [Language]
 *     responses:
 *       200:
 *         description: List of languages retrieved successfully
 */

/**
 * @swagger
 * /createLanuage:
 *   post:
 *     summary: Create a new language
 *     tags: [Language]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "English"
 *     responses:
 *       201:
 *         description: Language created successfully
 *       403:
 *         description: Access denied
 */

/**
 * @swagger
 * /getLanguageById/{id}:
 *   get:
 *     summary: Get language by ID
 *     tags: [Language]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Language found
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Language not found
 */

/**
 * @swagger
 * /deleteLanuage/{id}:
 *   delete:
 *     summary: Delete language by ID
 *     tags: [Language]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Language deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Language not found
 */

/**
 * @swagger
 * /getGenres:
 *   get:
 *     summary: Get all genres
 *     tags: [Genre]
 *     responses:
 *       200:
 *         description: List of genres retrieved successfully
 */

/**
 * @swagger
 * /createGenres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genre]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Action"
 *     responses:
 *       201:
 *         description: Genre created successfully
 *       403:
 *         description: Access denied
 */

/**
 * @swagger
 * /getGenresById/{id}:
 *   get:
 *     summary: Get genre by ID
 *     tags: [Genre]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Genre found
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Genre not found
 */

/**
 * @swagger
 * /deleteGenres/{id}:
 *   delete:
 *     summary: Delete genre by ID
 *     tags: [Genre]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Genre deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Genre not found
 */
router.get("/getLocation", getLocation);
router.post(
  "/createLocation",
  verifyAdmin,
  upload.single("cityIcon"),
  createLocation
);
router.get("/getLocationById/:id", verifyAdmin, getLocationById);
router.delete("/deleteLocationById/:id", verifyAdmin, deleteLocationById);

//Language API
router.get("/getLanguages", getLanguages);
router.post("/createLanuage", verifyAdmin, createLanuage);
router.get("/getLanguageById/:id", verifyAdmin, getLanguageById);
router.delete("/deleteLanuage/:id", verifyAdmin, deleteLanuage);

//Genres API
router.get("/getGenres", getGenres);
router.post("/createGenres", verifyAdmin, createGenres);
router.get("/getGenresById/:id", verifyAdmin, getGenresById);
router.delete("/deleteGenres/:id", verifyAdmin, deleteGenres);

export default router;
