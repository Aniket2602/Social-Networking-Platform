import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other"],
      message: "Choose the gender between Male, Female and Other.",
    },
    required: true,
  },
  avatar: { type: String, default: "Avatar is not provided by the user." },
  tokens: [String],
});

export default userSchema;
