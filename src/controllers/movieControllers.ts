import { Response } from "express";
import Movie from "../models/Movie";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest";
import path from "path";
import fs from "fs";

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

    const movie_image = req.file ? `/uploads/${req.file.filename}` : null;
    const newMovie = new Movie({
      title,
      description,
      language,
      genres: JSON.parse(genres),
      duration: Number(duration),
      releaseDate: new Date(releaseDate),
      certificate,
      rating: Number(rating),
      total_review: Number(total_review),
      review: JSON.parse(review),
      status: status === "true",
      movie_image: movie_image,
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

export const getMovies = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const movies = await Movie.find().populate("language genres review");
    res.status(200).json({ mesage: "Get Movies Successfuly", movies });
  } catch (error) {
    console.log(error, "er-");
    res.status(500).json({ message: "Error fetching movies", error: error });
  }
};

export const getMovieById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id).populate(
      "language genres review"
    );
    res.status(200).json({ mesage: "Get Movies Successfuly", movie });
  } catch (error) {
    console.log(error, "error-");
    res.status(500).json({ message: "Error fetching movies", error: error });
  }
};
export const updateMovieById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const existingMovie = await Movie.findById(id);
    if (!existingMovie) {
      res.status(404).json({ message: "Movie Not Found." });
      return;
    }
    const updateMovie = { ...req.body };

    if (req.file) {
      if (existingMovie.movie_image) {
        const oldImagePath = path.join(
          __dirname,
          "../../uploads",
          existingMovie.movie_image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateMovie.movie_image = `/uploads/${req.file.filename}`;
    }
    const updatedMovie = await Movie.findByIdAndUpdate(id, updateMovie, {
      new: true,
    });

    res.status(200).json({ mesage: "Movie update Successfuly", updatedMovie });
  } catch (error) {
    console.log(error, "error-");
    res.status(500).json({ message: "Error updating movie", error: error });
  }
};

export const deleteMovie = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ message: "Movie Not Found." });
      return;
    }
    if (movie.movie_image) {
      const imagePath = path.join(
        __dirname,
        "../../uploads/",
        movie.movie_image
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.log(error, "error-");
    res.status(500).json({ message: "Error updating movie", error: error });
  }
};
