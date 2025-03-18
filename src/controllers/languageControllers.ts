import { NextFunction, Request, Response } from "express";
import Language from "../models/Language";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest";

export const getLanguages = async (req: Request, res: Response) => {
  try {
    const languages = await Language.find();
    res.status(200).json({ message: "Get Location Successfully", languages });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};

export const createLanuage = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({
        error: "Access denied, admin only",
      });
      return;
    }
    const { LanguageName } = req.body;
    if (!LanguageName) {
      res.status(403).json({
        error: "Language Name is required",
      });
    }
    const languageData = await Language.create({
      LanguageName,
    });
    res.status(201).json({
      message: "language Add Successfully",
      languageData,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};

export const getLanguageById = async (
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
    const lanuage = await Language.findById(req.params.id);
    if (!lanuage) {
      res.status(403).json({
        message: "Lanuage not Found",
      });
      return;
    }
    res.status(201).json({
      message: "Get Lanuage by Id Successfully",
      lanuage,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};

export const deleteLanuage = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({
        error: "Access denied, admin only",
      });
      return;
    }
    const languageData = await Language.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "language Delete Successfully",
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};
