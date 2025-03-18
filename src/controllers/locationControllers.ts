import { Request, Response } from "express";
import Location from "../models/Location";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest";

export const getLocation = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find();
    res.status(200).json({ message: "Get Location Successfully", locations });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};

export const createLocation = async (
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
    const { city } = req.body;
    if (!city) {
      res.status(403).json({
        error: "City Name is required",
      });
      return;
    }
    const cityIcon = req.file ? `/uploads/${req.file.filename}` : null;
    const LocationData = await Location.create({ city, cityIcon });
    res.status(201).json({
      message: "Location Create Successfully",
      LocationData,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};

export const getLocationById = async (
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
    const location = await Location.findById(req.params.id);
    console.log(location, "location");
    if (!location) {
      res.status(403).json({
        error: "Location not Found.",
      });
      return;
    }
    res.status(200).json({ message: "Get Location Successfully", location });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};

export const deleteLocationById = async (
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
    const LocationData = await Location.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Delete Location Successfully", LocationData });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};
