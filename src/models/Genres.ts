import mongoose, { Model, Schema } from "mongoose";

interface IGenres extends Document {
  name: string;
}

const GenresSchema = new Schema<IGenres>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Genres: Model<IGenres> = mongoose.model("Genres", GenresSchema);
export default Genres;
