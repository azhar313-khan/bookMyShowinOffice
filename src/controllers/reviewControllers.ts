import { Response, Request } from "express";
import { AuthenticatedRequest } from "../utils/AuthenticatedRequest";
import Review from "../models/Review";

export const createReview = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { movieId, rating, reviewText }: any = req.body;
    const userId = req?.user?.id;
    const reviewData = await Review.create({
      movieId,
      rating,
      reviewText,
      userId,
    });
    res.status(201).json({
      message: "Review Add Successfully",
      reviewData,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};

export const getReviewByMovieId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { movieId } = req.params;
    const review = await Review.find({ movieId }).populate("userId", "name");
    res.status(201).json({
      message: "Get Movie Review Successfully.",
      review,
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};

export const deleteReview = async (
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
    const findReview = await Review.findById(req.params.id);
    if (!findReview) {
      res.status(403).json({
        error: "Review Not Found",
      });
    }
    await Review.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: "Review Delete Successfully.",
    });
  } catch (err) {
    console.log(err, "error");
    res.status(404).json({ message: "server error", err });
  }
};
