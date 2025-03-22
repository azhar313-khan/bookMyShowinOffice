import mongoose, { Model, Schema, Types } from "mongoose";

interface IReview extends Document {
  movieId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  reviewText: string;
}

const ReviewSchema = new Schema<IReview>(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Review: Model<IReview> = mongoose.model<IReview>("Review", ReviewSchema);

export default Review
