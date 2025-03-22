import { Response } from "express";
import Movie from "../models/Movie";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest";

export const createMovie = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({
        error: "Access denied, admin only",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "Movie image is required." });
      return;
    }

    const {
      title,
      description,
      language,
      genres,
      duration,
      releaseDate,
      certificate,
      rating,
      total_review,
      review,
      status,
    } = req.body;

    // Save movie details
    const newMovie = new Movie({
      title,
      description,
      language,
      genres: JSON.parse(genres), // Parse array if sent as string
      duration: Number(duration),
      releaseDate: new Date(releaseDate),
      certificate,
      rating: Number(rating),
      total_review: Number(total_review),
      review: JSON.parse(review), // Parse array if sent as string
      status: status === "true", // Convert string to boolean
      movie_image: req.file ? `/uploads/${req.file.filename}` : null, // Save file path
    });

    await newMovie.save();
    res
      .status(201)
      .json({ message: "Movie created successfully", movie: newMovie });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// export const getMovies = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const movies = await Movie.find().populate("language genres review");
//     res.status(200).json(movies);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching movies", error: error });
//   }
// };

// export const getMovie = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const locations = await Movie.find();
//     res.status(200).json({ message: "Get Location Successfully", locations });
//   } catch (err) {
//     console.log(err, "error");
//     res.status(404).json({ message: "server error", err });
//   }
// };
