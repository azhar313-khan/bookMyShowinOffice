import mongoose, { Model, Schema, Types } from "mongoose";

export interface IMovie extends Document {
  title: string;
  decription?: string;
  language?: Types.ObjectId;
  genres?: Types.ObjectId[];
  duration: number;
  releaseDate: Date;
  certificate?: string;
  rating?: number;
  review?: Types.ObjectId[];
  total_review?: number;
  movie_image: string;
  status?: boolean;
}

const MovieSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    language: { type: mongoose.Schema.Types.ObjectId, ref: "Language" },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genres" }], // Ensure array of ObjectIds
    duration: { type: Number, required: true }, // Duration in minutes
    releaseDate: { type: Date, required: true },
    certificate: { type: String }, // Example: "U", "PG-13", "R"
    rating: { type: Number, default: 0 }, // Average rating
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Ensure array of ObjectIds
    total_review: { type: Number, default: 0 },
    status: { type: Boolean, default: true }, // Ensure Boolean field
    movie_image: { type: String, defult: null },
  },
  { timestamps: true }
);

const Movie: Model<IMovie> = mongoose.model<IMovie>("movie", MovieSchema);
export default Movie;
