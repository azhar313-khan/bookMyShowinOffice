import mongoose, { Model, Schema } from "mongoose";

interface ILanguage extends Document {
  LanguageName: string;
}

const LanguageScheme = new Schema<ILanguage>(
  {
    LanguageName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Language: Model<ILanguage> = mongoose.model("Language", LanguageScheme);

export default Language;
