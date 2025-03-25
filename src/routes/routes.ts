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
import {
  createReview,
  deleteReview,
  getReviewByMovieId,
} from "../controllers/reviewControllers";
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovieById,
} from "../controllers/movieControllers";
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
 *               city:
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
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LanguageName:
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
 *       - BearerAuth: []
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
 *       - BearerAuth: []
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
 *       - BearerAuth: []
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
 *       - BearerAuth: []
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
 *       - BearerAuth: []
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

//Review API

/**
 * @swagger
 * tags:
 *   - name: Language
 *     description: Language management APIs
 *   - name: Genre
 *     description: Genre management APIs
 *   - name: Review
 *     description: Review management APIs
 */
/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a movie review
 *     description: Adds a review for a movie by an authenticated user.
 *     security:
 *       - BearerAuth: []
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               reviewText:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /reviews/{movieId}:
 *   get:
 *     summary: Get all reviews for a movie
 *     description: Retrieves all reviews for a given movie.
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully
 */

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     description: Allows a user to delete their own review.
 *     security:
 *       - BearerAuth: []
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       403:
 *         description: Unauthorized
 */
router.post("/createReview", verifyAdmin, createReview);
router.get("/getReviewByMovieId/:movieId", getReviewByMovieId);
router.delete("/deleteReview/:id", deleteReview);

//Movie
/**
 * @swagger
 * /createMovie:
 *   post:
 *     summary: Create a new movie
 *     description: Adds a new movie with title, description, language, genre, and an image file.
 *     tags:
 *       - Movies
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - language
 *               - genres
 *               - duration
 *               - releaseDate
 *               - certificate
 *               - rating
 *               - total_review
 *               - review
 *               - status
 *               - movie_image
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Inception"
 *               description:
 *                 type: string
 *                 example: "A thief enters the subconscious to steal secrets."
 *               language:
 *                 type: string
 *                 example: "67d941b7ddbe19c5c095c26c"
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["67d95469d15a53ef0010c508", "67d95486d15a53ef0010c50c"]
 *               duration:
 *                 type: integer
 *                 example: 148
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 example: "2010-07-16T00:00:00.000Z"
 *               certificate:
 *                 type: string
 *                 example: "PG-13"
 *               rating:
 *                 type: number
 *                 format: float
 *                 example: 4.8
 *               total_review:
 *                 type: integer
 *                 example: 2000
 *               review:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *               status:
 *                 type: boolean
 *                 example: true
 *               movie_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "201":
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie created successfully"
 *                 movie:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60d5ec49b4d3f0298c123456"
 *                     title:
 *                       type: string
 *                       example: "Inception"
 *                     movie_image:
 *                       type: string
 *                       example: "/uploads/1712637471461-image.jpeg"
 *       "400":
 *         description: Bad request (validation errors)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Movie image is required."
 *       "401":
 *         description: Unauthorized (Admin token required)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized. Admin access required."
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error"
 */
router.post(
  "/createMovie",
  verifyAdmin,
  upload.single("movie_image"),
  createMovie
);
/**
 * @swagger
 * /getMovie:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Successfully retrieved movies
 *       500:
 *         description: Internal server error
 */
router.get("/getMovie", getMovies);

/**
 * @swagger
 * /getMovieById/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Successfully retrieved movie
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
router.get("/getMovieById/:id", getMovieById);

// /**
//  * @swagger
//  * /updateMovieById/{id}:
//  *   put:
//  *     summary: Update a movie by ID
//  *     tags: [Movies]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The movie ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               language:
//  *                 type: string
//  *               genres:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *               duration:
//  *                 type: integer
//  *               releaseDate:
//  *                 type: string
//  *                 format: date
//  *               certificate:
//  *                 type: string
//  *               rating:
//  *                 type: number
//  *               total_review:
//  *                 type: integer
//  *               status:
//  *                 type: boolean
//  *               movie_image:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       200:
//  *         description: Movie updated successfully
//  *       400:
//  *         description: Bad request
//  *       404:
//  *         description: Movie not found
//  *       500:
//  *         description: Internal server error
//  */
// router.put(
//   "/updateMovieById/:id",
//   upload.single("movie_image"),
//   updateMovieById
// );

// /**
//  * @swagger
//  * /deleteMovie/{id}:
//  *   delete:
//  *     summary: Delete a movie by ID
//  *     tags: [Movies]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The movie ID
//  *     responses:
//  *       200:
//  *         description: Movie deleted successfully
//  *       404:
//  *         description: Movie not found
//  *       500:
//  *         description: Internal server error
//  */
// router.delete("/deleteMovie/:id", deleteMovie);

export default router;
