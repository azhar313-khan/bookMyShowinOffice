import mongoose, { Model, Schema } from "mongoose";

interface ILocation extends Document {
  city: string;
  cityIcon: string;
}

const LocationSchema = new Schema<ILocation>(
  {
    city: {
      type: String,
      required: true,
    },
    cityIcon: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Location: Model<ILocation> = mongoose.model<ILocation>(
  "Location",
  LocationSchema
);

export default Location;
