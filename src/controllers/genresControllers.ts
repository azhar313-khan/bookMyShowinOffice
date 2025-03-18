import { Response, Request } from "express";
import Genres from "../models/Genres";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest";

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genres.find();
    res.status(200).json({ message: "Get Location Successfully", genres });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};

export const createGenres = async (
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

    const { name } = req.body;
    if (!name) {
      res.status(403).json({
        error: "Genres Name is required",
      });
    }
    const genresData = await Genres.create({
      name,
    });

    res.status(201).json({
      message: "Genres Add Successfully",
      genresData,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};

export const getGenresById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({
        error: "Access denied, admin only",
      });
      return;
    }
    const genresId = req.params.id;
    const genres = await Genres.findById(genresId);
    res.status(201).json({
      message: "Get Genres by Id Successfully",
      genres,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};

export const deleteGenres = async (
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
    const genres = await Genres.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Delete Genres Successfully" });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};
